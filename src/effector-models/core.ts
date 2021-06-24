import { sample, combine, guard, forward } from 'effector';
import { vector, vectorsApi } from './vector';
import { move, snake, feed, fail } from './snake';
import { apple, generateApple } from './apple';
import { reset } from './reset';
import { increaseSpeed } from './speed';
import { clock, increaseClock } from './clock';
import { start } from './timestamp';

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      vectorsApi.right();
      increaseClock();
      break;
    case 'ArrowLeft':
      vectorsApi.left();
      increaseClock();
      break;
    case 'ArrowDown':
      vectorsApi.down();
      increaseClock();
      break;
    case 'ArrowUp':
      vectorsApi.up();
      increaseClock();
      break;
  }
});

sample({
  clock: [clock],
  source: vector,
  target: move,
});

sample({
  clock: [snake.map((s) => s.length)],
  target: increaseSpeed,
});

const appleEaten = combine(apple, snake, (apple, snake) =>
  Boolean(snake.find(({ x, y }) => apple.x === x && apple.y === y))
);

guard({
  clock: [clock],
  source: vector,
  filter: appleEaten,
  target: feed,
});

guard({
  clock: [clock],
  filter: appleEaten,
  target: generateApple,
});

forward({
  from: fail,
  to: reset,
});

export { start, clock };
