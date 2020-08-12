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

let moveDirection = {
  x: [],
  y: [],
};

let moveHandler: (direction: {x: number, y: number}) => void;

const init = () => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.key.toLowerCase() === keyBindings.up && !keyStates.up) {
      keyStates.up = true;
      moveDirection.y.unshift(1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
    
    if(e.key.toLowerCase() === keyBindings.down && !keyStates.down) {
      keyStates.down = true;
      moveDirection.y.unshift(-1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
    
    if(e.key.toLowerCase() === keyBindings.left && !keyStates.left) {
      keyStates.left = true;
      moveDirection.x.unshift(-1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
    
    if(e.key.toLowerCase() === keyBindings.right && !keyStates.right) {
      keyStates.right = true;
      moveDirection.x.unshift(1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
  });

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if(e.key.toLowerCase() === keyBindings.up) {
      keyStates.up = false;
      moveDirection.y = moveDirection.y.filter(k => k !== 1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
    
    if(e.key.toLowerCase() === keyBindings.down) {
      keyStates.down = false;
      moveDirection.y = moveDirection.y.filter(k => k !== -1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
    
    if(e.key.toLowerCase() === keyBindings.left) {
      keyStates.left = false;
      moveDirection.x = moveDirection.x.filter(k => k !== -1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
    
    if(e.key.toLowerCase() === keyBindings.right) {
      keyStates.right = false;
      moveDirection.x = moveDirection.x.filter(k => k !== 1);

      if(moveHandler) {
        moveHandler(getMoveDirection());
      }
    }
  });
}

const onMove = (handler: (direction: {x: number, y: number}) => void) => {
  moveHandler = handler;
};

const getMoveDirection = () => {
  const x = moveDirection.x[0] || 0;
  const y = moveDirection.y[0] || 0;

  return {x, y};
};

export default {
  init,
  onMove,
  getMoveDirection,
}