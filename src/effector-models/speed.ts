import { createStore, createEvent } from 'effector';
import { reset } from './reset';

const STEP = -5;
const increaseSpeed = createEvent();

const speed = createStore(100)
  .on(increaseSpeed, (state) => state + STEP)
  .reset(reset);

export { speed, increaseSpeed };
