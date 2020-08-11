import { Entity } from './entity';

const keyBindings = {
  up: 'w',
  down: 's',
  left: 'a',
  right: 'd',
};

const keyStates = {
  up: false,
  down: false,
  left: false,
  right: false,
};

let target: Entity;

let moveDirection = {
  x: [],
  y: [],
};

const init = (t: Entity) => {
  target = t;

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.key.toLowerCase() === keyBindings.up) {
      keyStates.up = true;
      moveDirection.y.unshift(1);
    }
    
    if(e.key.toLowerCase() === keyBindings.down) {
      keyStates.down = true;
      moveDirection.y.unshift(-1);
    }
    
    if(e.key.toLowerCase() === keyBindings.left) {
      keyStates.left = true;
      moveDirection.x.unshift(-1);
    }
    
    if(e.key.toLowerCase() === keyBindings.right) {
      keyStates.right = true;
      moveDirection.x.unshift(1);
    }
  });

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if(e.key.toLowerCase() === keyBindings.up) {
      keyStates.up = true;
      moveDirection.y = moveDirection.y.filter(k => k !== 1);
    }
    
    if(e.key.toLowerCase() === keyBindings.down) {
      keyStates.down = true;
      moveDirection.y = moveDirection.y.filter(k => k !== -1);
    }
    
    if(e.key.toLowerCase() === keyBindings.left) {
      keyStates.left = true;
      moveDirection.x = moveDirection.x.filter(k => k !== -1);
    }
    
    if(e.key.toLowerCase() === keyBindings.right) {
      keyStates.right = true;
      moveDirection.x = moveDirection.x.filter(k => k !== 1);
    }
  });
}

const getMoveDirection = () => {
  const x = moveDirection.x[0] || 0;
  const y = moveDirection.y[0] || 0;

  return {x, y};
};

export default {
  init,
  getMoveDirection,
}