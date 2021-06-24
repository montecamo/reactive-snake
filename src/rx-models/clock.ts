import { speed$ } from './speed';
import { timestamp$ } from './timestamp';
import { reset$ } from './reset';
import { BehaviorSubject } from 'rxjs';
import { withLatestFrom, filter, map, share } from 'rxjs/operators';

const prevTime$ = new BehaviorSubject(0);
const updatePrevTime = (t) => {
  prevTime$.next(t);
};

const clock$ = new BehaviorSubject(0);
reset$.subscribe(() => clock$.next(0));

const increaseClock = () => {
  clock$.next(clock$.getValue() + 1);
};

const trigger$ = timestamp$.pipe(
  withLatestFrom(prevTime$, speed$),
  filter(([timestamp, prevTime, speed]) => {
    return timestamp - prevTime >= speed;
  }),
  map(([timestamp]) => timestamp),
  share()
);

trigger$.subscribe(updatePrevTime);
trigger$.subscribe(increaseClock);

export { clock$, increaseClock };
