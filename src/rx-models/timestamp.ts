import { BehaviorSubject } from 'rxjs';

const timestamp$ = new BehaviorSubject(0);

const loop = (timestamp: number) => {
  timestamp$.next(timestamp);

  window.requestAnimationFrame(loop);
};

const start = () => {
  window.requestAnimationFrame(loop);
};

export { timestamp$, start };
