import { Body } from './body';

let bodies: Body[] = [];
let updateInterval;
let lastTime;

const addBody = (x: number, y: number, radius: number) => {
  return new Body(x, y, radius);
};

const removeBody = (body: Body) => {
  bodies = bodies.filter(b => b !== body);
};

const step = (dt: number) => {
  bodies.forEach(body => body.update(dt));
};

export default {
  step,
  addBody,
  removeBody,
}