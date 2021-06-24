import { restore, createEvent } from 'effector';

const updateTimestamp = createEvent<number>();
const timestamp = restore(updateTimestamp, 0);

const start = () => {
  setInterval(() => updateTimestamp(performance.now()));
};

export { timestamp, start };
