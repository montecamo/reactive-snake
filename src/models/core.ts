import { sample, combine, guard, forward } from 'effector';
import { clock, increaseClock } from './clock';
import { vector, vectorApi } from './vector';
import { move, snake, feed, fail } from './snake';
import { apple, generateApple } from './apple';
import { reset } from './reset';

const SPEED = 50;

const start = () => {
  let prev = 0;

  const loop = (timestamp) => {
    if (!prev || timestamp - prev > SPEED) {
      prev = timestamp;

      increaseClock();
    }

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
};

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      vectorApi.right();
      increaseClock();
      break;
    case 'ArrowLeft':
      vectorApi.left();
      increaseClock();
      break;
    case 'ArrowDown':
      vectorApi.down();
      increaseClock();
      break;
    case 'ArrowUp':
      vectorApi.up();
      increaseClock();
      break;
  }
});

sample({
  clock,
  source: vector,
  target: move,
});

const appleEaten = combine(apple, snake, (apple, snake) =>
  Boolean(snake.find(({ x, y }) => apple.x === x && apple.y === y))
);

guard({
  clock: clock.updates,
  source: vector,
  filter: appleEaten,
  target: feed,
});

guard({
  clock: clock.updates,
  filter: appleEaten,
  target: generateApple,
});

forward({
  from: fail,
  to: reset,
});

export { start };
