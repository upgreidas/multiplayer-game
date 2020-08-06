import { MeshBuilder, Camera, UniversalCamera, Scene } from '@babylonjs/core';

import SceneManager from './scene-manager';
import AssetManager from './asset-manager';
import Physics from './physics';

import { Entity } from './entity';
import { EntityData } from './interfaces/entity-data';

const entities = [];

const addEntity = (data: EntityData) => {
  const entity = new Entity(data);

  entity.build();

  entities.push(entity);

  return entity;
};

const updateEntities = () => {
  const dt = SceneManager.getDeltaTime();

  Physics.tick(dt);
  
  entities.forEach(entity => entity.update(dt));
};

const init = async (container: HTMLElement) => {
  SceneManager.init(container);
  Physics.init();

  const scene = SceneManager.getScene();
  const camera = SceneManager.getCamera();
  const canvas = SceneManager.getCanvas();

  camera.position.set(0, 20, -15);
  camera.rotation.set(Math.PI / 4, 0, 0);

  SceneManager.render();

  const p1 = addEntity({model: ''});
  const p2 = addEntity({model: '', x: 0, y: 5});
  
  scene.registerBeforeRender(() => {
    const dt = SceneManager.getDeltaTime();
    p1.setVelocity(0.5 * dt, 5 * dt);
    updateEntities();
  });

};

export default {
  init,
}