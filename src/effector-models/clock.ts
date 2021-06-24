import { createStore, createEvent, guard, restore } from 'effector';
import { speed } from './speed';
import { timestamp } from './timestamp';
import { reset } from './reset';

const updatePrevTime = createEvent<number>();
const increaseClock = createEvent();

const prevTime = restore(updatePrevTime, 0);

const clock = createStore(0)
  .on(increaseClock, (state) => state + 1)
  .reset(reset);

guard({
  source: timestamp,
  filter: (t) => t - prevTime.getState() >= speed.getState(),
  target: [increaseClock, updatePrevTime],
});

export { clock, increaseClock };
