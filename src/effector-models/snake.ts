import last from 'lodash-es/last';
import uniqBy from 'lodash-es/uniqBy';

import { createStore, createEvent, forward } from 'effector';
import type { Store } from 'effector';
import { FIELD_SIZE } from '../constants';
import { Vector } from './vector';
import { reset } from './reset';

const enhance = <T>(fn: (store: T) => T) => (store: Store<T>) => store.map(fn);

type SnakePart = { x: number; y: number };
type Snake = SnakePart[];

export const INITIAL = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];

function applyVector({ x, y }: SnakePart, vector: Vector): SnakePart {
  switch (vector) {
    case Vector.UP:
      return { x, y: y - 1 };
    case Vector.DOWN:
      return { x, y: y + 1 };
    case Vector.RIGHT:
      return { x: x + 1, y };
    case Vector.LEFT:
      return { x: x - 1, y };
  }
}

function calcVector(first: SnakePart, second: SnakePart): Vector {
  if (first.x - second.x < 0) {
    return Vector.LEFT;
  }
  if (first.x - second.x > 0) {
    return Vector.RIGHT;
  }

  if (first.y - second.y < 0) {
    return Vector.UP;
  }
  if (first.y - second.y > 0) {
    return Vector.DOWN;
  }
}

const move = createEvent<Vector>();
const feed = createEvent<Vector>();
const snake = createStore<Snake>(INITIAL)
  .on(feed, (state) => {
    return [applyVector(state[0], calcVector(state[0], state[1]))].concat(
      state
    );
  })
  .on(move, (state, vector) => {
    return state.slice(1).concat(applyVector(last(state), vector));
  })
  .reset(reset);

const fail = snake.map(
  (s) => uniqBy(s, (p) => '' + p.x + p.y).length !== s.length
);

const normalize = (x: number, boundary: number) =>
  ((x % boundary) + boundary) % boundary;

const normalized = snake.thru(
  enhance((snake) =>
    snake.map((s) => ({
      x: normalize(s.x, FIELD_SIZE),
      y: normalize(s.y, FIELD_SIZE),
    }))
  )
);

export { normalized as snake, move, feed, fail };
