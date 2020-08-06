import { Engine, Runner, Bodies, IBodyDefinition, World } from 'matter-js';

let engine: Engine;
let runner: Runner;

const init = () => {
  engine = Engine.create();
  runner = Runner.create();

  engine.world.gravity.y = 0;
};

const tick = (dt: number) => {
  Runner.tick(runner, engine, dt);
};

const addCircle = (x: number, y: number, radius: number, options?: IBodyDefinition) => {
  const circle = Bodies.circle(x, y, radius, options);

  World.addBody(engine.world, circle);

  return circle;
};

export default {
  init,
  tick,
  addCircle,
}