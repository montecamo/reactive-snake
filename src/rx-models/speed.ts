import { BehaviorSubject } from 'rxjs';
import { reset$ } from './reset';

const STEP = -5;

const speed$ = new BehaviorSubject(100);

const increaseSpeed = () => speed$.next(speed$.getValue() + STEP);
reset$.subscribe(() => speed$.next(100));

export { speed$, increaseSpeed };
