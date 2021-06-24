import { restore, createEvent } from 'effector';

const updateTimestamp = createEvent<number>();
const timestamp = restore(updateTimestamp, 0);

const loop = (timestamp: number) => {
  updateTimestamp(timestamp);

  window.requestAnimationFrame(loop);
};

const start = () => {
  window.requestAnimationFrame(loop);
};

export { timestamp, start };
