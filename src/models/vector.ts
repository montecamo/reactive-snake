import { createStore, createApi } from 'effector';

export enum Vector {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

const vector = createStore<Vector>(Vector.RIGHT);

const vectorApi = createApi(vector, {
  left: () => Vector.LEFT,
  right: () => Vector.RIGHT,
  down: () => Vector.DOWN,
  up: () => Vector.UP,
});

export { vector, vectorApi };
