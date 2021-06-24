import { vector$, vectorsApi } from './vector';
import { move, snake$, feed, fail$ } from './snake';
import { apple$, generateApple } from './apple';
import { reset$ } from './reset';
import { increaseSpeed } from './speed';
import { clock$, increaseClock } from './clock';
import { start } from './timestamp';
import { map, withLatestFrom, filter, mapTo, pairwise } from 'rxjs/operators';

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

clock$
  .pipe(
    withLatestFrom(vector$),
    map(([_, v]) => v)
  )
  .subscribe(move);

snake$
  .pipe(
    map((s) => s.length),
    pairwise(),
    filter(([prev, next]) => prev < next)
  )
  .subscribe(increaseSpeed);

const appleEaten$ = clock$.pipe(
  withLatestFrom(apple$, snake$),
  filter(([_, apple, snake]) => {
    return Boolean(snake.find(({ x, y }) => apple.x === x && apple.y === y));
  }),
  mapTo(true)
);

appleEaten$.subscribe(feed);
appleEaten$.subscribe(generateApple);

fail$.subscribe(reset$);

export { start, clock$ };
