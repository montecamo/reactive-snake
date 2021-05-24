import { createStore, createApi } from 'effector';
import { reset } from './reset';

export enum Vector {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

const vector = createStore<Vector>(Vector.RIGHT).reset(reset);

const vectorApi = createApi(vector, {
  left: () => Vector.LEFT,
  right: () => Vector.RIGHT,
  down: () => Vector.DOWN,
  up: () => Vector.UP,
});

export { vector, vectorApi };
