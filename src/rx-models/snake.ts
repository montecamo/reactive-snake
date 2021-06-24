import last from 'lodash-es/last';
import uniqBy from 'lodash-es/uniqBy';

import { FIELD_SIZE } from '../constants';
import { Vector } from './vector';
import { reset$ } from './reset';
import { BehaviorSubject } from 'rxjs';
import { filter, mapTo, map } from 'rxjs/operators';

type SnakePart = { x: number; y: number };
type Snake = SnakePart[];

const INITIAL = [
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

const snake$ = new BehaviorSubject(INITIAL);

const move = (vector) => {
  const snake = snake$.getValue();

  snake$.next(snake.slice(1).concat(applyVector(last(snake), vector)));
};

const feed = () => {
  const snake = snake$.getValue();

  return snake$.next(
    [applyVector(snake[0], calcVector(snake[0], snake[1]))].concat(snake)
  );
};

reset$.subscribe(() => snake$.next(INITIAL));

const fail$ = snake$.pipe(
  filter((s) => uniqBy(s, (p) => '' + p.x + p.y).length !== s.length),
  mapTo(true)
);

const normalize = (x: number, boundary: number) =>
  ((x % boundary) + boundary) % boundary;

const normalized$ = snake$.pipe(
  map((snake) =>
    snake.map((s) => ({
      x: normalize(s.x, FIELD_SIZE),
      y: normalize(s.y, FIELD_SIZE),
    }))
  )
);

export { normalized$ as snake$, move, feed, fail$ };
