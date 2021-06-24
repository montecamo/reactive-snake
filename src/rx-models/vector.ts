import isEqual from 'lodash-es/isEqual';
import { reset$ } from './reset';
import { clock$ } from './clock';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  filter,
  bufferWhen,
  withLatestFrom,
  map,
  distinctUntilChanged,
  skip,
} from 'rxjs/operators';

export enum Vector {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

const vectorUpdate$ = new Subject();
const updateVector = (v) => vectorUpdate$.next(v);
vectorUpdate$.subscribe(() => vectors$.next(vectors$.getValue().slice(1)));

const vector$ = new BehaviorSubject(Vector.RIGHT);

const left = () => vector$.next(Vector.LEFT);
const right = () => vector$.next(Vector.RIGHT);
const down = () => vector$.next(Vector.DOWN);
const up = () => vector$.next(Vector.UP);

reset$.subscribe(() => vector$.next(Vector.RIGHT));
reset$.subscribe(() => vectors$.next([]));

const vectors$ = new BehaviorSubject([]);
vector$.pipe(bufferWhen(() => clock$.pipe(skip(1)))).subscribe(vectors$);

vectorUpdate$.subscribe(() => vectors$.next(vectors$.getValue().slice(1)));

clock$
  .pipe(
    withLatestFrom(vectors$),
    map(([_, vectors]) => vectors[0]),
    filter((v) => v !== undefined)
  )
  .subscribe(updateVector);

export const vectorsApi = {
  right,
  left,
  up,
  down,
};

export { vector$, vectors$ };
