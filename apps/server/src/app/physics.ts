import { Body } from './body';

let bodies: Body[] = [];

const addBody = (x: number, y: number, radius: number) => {
  return new Body(x, y, radius);
};

const removeBody = (body: Body) => {
  bodies = bodies.filter(b => b !== body);
};

export default {
  addBody,
  removeBody,
}