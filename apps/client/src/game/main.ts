import { Vector } from 'matter-js';

import SceneManager from './scene-manager';
import AssetManager from './asset-manager';
import EntityManager from './entity-manager';
import ConnectionManager from './connection-manager';
import Physics from './physics';
import Controls from './controls';
import { Entity } from './entity';
import { EntityData } from './interfaces/entity-data';

const entities = [];

const addEntity = (data: EntityData) => {
  const entity = new Entity(data);

  entity.build();

  entities.push(entity);

  return entity;
};

const init = async (container: HTMLElement) => {
  SceneManager.init(container);
  Physics.init();

  const scene = SceneManager.getScene();
  const camera = SceneManager.getCamera();

  AssetManager.init(scene, '/assets/');
  await AssetManager.load({
    assets: 'assets.babylon',
  });

  camera.position.set(0, 20, -15);
  camera.rotation.set(Math.PI / 4, 0, 0);

  SceneManager.render();

  Controls.init();
  Controls.onMove(({x, y}) => {
    let direction = 0;

    if(x === 0 && y === 1) {
      direction = 1;
    } else if(x === 1 && y === 1) {
      direction = 2;
    } else if(x === 1 && y === 0) {
      direction = 3;
    } else if(x === 1 && y === -1) {
      direction = 4;
    } else if(x === 0 && y === -1) {
      direction = 5;
    } else if(x === -1 && y === -1) {
      direction = 6;
    } else if(x === -1 && y === 0) {
      direction = 7;
    } else if(x === -1 && y === 1) {
      direction = 8;
    }
    
    ConnectionManager.send({
      move: { direction },
    })
  });

  scene.registerBeforeRender(() => {
    const dt = SceneManager.getDeltaTime();
    // const direction = Controls.getMoveDirection();
    // let velocity =Vector.create(direction.x, direction.y);
    // velocity = Vector.normalise(velocity);
    // velocity = Vector.mult(velocity, speed);
    // let magnitude = Vector.magnitude(velocity);
    
    // p1.setVelocity(velocity.x * dt, velocity.y * dt);

    // Physics.tick(dt);
  
    EntityManager.updateEntities(dt);
  });

  ConnectionManager.connect('ws://localhost:8000');

  ConnectionManager.onConnect(() => {
    ConnectionManager.send({
      login: {
        name: 'test',
      }
    });
  });

  ConnectionManager.onMessage((data: any) => {
    data.players.forEach(state => {
      const player = EntityManager.getEntity(state.id);

      if(player) {
        player.applyState(state);
      } else {
        state.model = 'character';

        EntityManager.addEntity(state);
      }
    });
  });

};

export default {
  init,
}