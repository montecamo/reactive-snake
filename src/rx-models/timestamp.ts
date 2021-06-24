import { BehaviorSubject } from 'rxjs';

const timestamp$ = new BehaviorSubject(0);

const start = () => {
  setInterval(() => timestamp$.next(performance.now()), 0);
};

export { timestamp$, start };
