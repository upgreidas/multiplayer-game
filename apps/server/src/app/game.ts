import PlayerManager from './player-manager';
import Physics from './physics';

let updateTimer;
let lastTime;

const run = (updateInterval: number) => {
  updateTimer = setInterval(() => {
    let dt = 0;
  
    if(lastTime) {
      dt = (Date.now() - lastTime) / 1000;
    }
  
    PlayerManager.beforePhysics(dt);
    Physics.step(dt);
    PlayerManager.afterPhysics(dt);
    
    lastTime = Date.now();
  }, updateInterval);
};

export default {
  run,
}