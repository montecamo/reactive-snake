import { BehaviorSubject, Subject } from 'rxjs';
import { FIELD_SIZE } from '../constants';

type Apple = {
  x: number;
  y: number;
};
const createApple = (field) => ({
  x: Math.round(Math.random() * (field - 1)),
  y: Math.round(Math.random() * (field - 1)),
});

const apple$ = new BehaviorSubject<Apple>(createApple(FIELD_SIZE));

const generateApple = () => apple$.next(createApple(FIELD_SIZE));

export { apple$, generateApple };
