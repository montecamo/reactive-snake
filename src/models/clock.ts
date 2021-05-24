import { createStore, createEvent } from 'effector';

const increaseClock = createEvent();

const clock = createStore(0).on(increaseClock, (state) => state + 1);

export { clock, increaseClock };
