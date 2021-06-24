import { createStore, createEvent } from 'effector';
import { FIELD_SIZE } from '../constants';

type Apple = {
  x: number;
  y: number;
};

const generateApple = createEvent();

const createApple = (field) => ({
  x: Math.round(Math.random() * (field - 1)),
  y: Math.round(Math.random() * (field - 1)),
});

const apple = createStore<Apple>(createApple(FIELD_SIZE)).on(
  generateApple,
  () => {
    return createApple(FIELD_SIZE);
  }
);

export { apple, generateApple };
