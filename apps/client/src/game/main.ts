import SceneManager from './scene-manager';
import AssetManager from './asset-manager';
import EntityManager from './entity-manager';
import ConnectionManager from './connection-manager';
import Controls from './controls';

let playerId: string;

const init = async (container: HTMLElement) => {
  const scene = SceneManager.init(container);

  // Load assets
  AssetManager.init(scene, '/assets/');
  await AssetManager.load({
    assets: 'assets.babylon',
  });

  // Setup camera
  const camera = SceneManager.getCamera();
  camera.position.set(0, 22, -19);
  camera.rotation.set(Math.PI / 4, 0, 0);

  // Setup controls
  Controls.init();
  Controls.onMove(onMove);

  SceneManager.render();

  scene.registerBeforeRender(() => {
    const dt = SceneManager.getDeltaTime();

    EntityManager.updateEntities(dt);
  });

  // Setup connection
  ConnectionManager.connect('ws://localhost:8000');
  ConnectionManager.onConnect(onConnect);
  ConnectionManager.onMessage(onMessage);
};

const onMove = ({x, y}) => {
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
  });
};

const onConnect = () => {
  ConnectionManager.send({
    login: {
      name: 'test',
    }
  });
};

const onMessage = (data: any) => {
  if(data.players) {
    data.players.forEach(state => {
      let player = EntityManager.getEntity(state.id);

      if(player) {
        player.applyState(state);
      } else {
        state.model = 'character';

        player = EntityManager.addEntity(state);

        if(state.id === playerId) {
          const camera = SceneManager.getCamera();
          
          player.attachCamera(camera);
        }
      }
    });
  }

  if(data.id) {
    playerId = data.id;
  }
};

export default {
  init,
}