import { createEvent, createStore, createApi, restore, guard } from 'effector';
import { reset } from './reset';
import { clock } from './clock';

export enum Vector {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

const updateVector = createEvent<Vector>();
const vectors = createStore<Vector[]>([])
  .on(updateVector, (s) => s.slice(1))
  .reset(reset);

const vectorsApi = createApi(vectors, {
  left: (s) => s.concat(Vector.LEFT),
  right: (s) => s.concat(Vector.RIGHT),
  down: (s) => s.concat(Vector.DOWN),
  up: (s) => s.concat(Vector.UP),
});

const vector = createStore(Vector.RIGHT)
  .on(updateVector, (_, v) => v)
  .reset(reset);

guard({
  clock: clock,
  source: vectors.map((v) => (v[0] === undefined ? null : v[0])),
  filter: (v) => {
    return v !== null;
  },
  target: updateVector,
});

export { vector, vectors, vectorsApi };
