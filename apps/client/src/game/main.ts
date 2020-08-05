import { MeshBuilder, Camera, UniversalCamera } from '@babylonjs/core';

import SceneManager from '../game/scene-manager';
import AssetManager from '../game/asset-manager';

import { Entity } from './entity';
import { EntityData } from './interfaces/entity-data';

const entities = [];

const addEntity = (data: EntityData) => {
  const entity = new Entity({
    model: 'character',
  });

  entity.build();

  entities.push(entity);

  return entity;
};

const updateEntities = () => {
  const dt = SceneManager.getDeltaTime();

  entities.forEach(entity => entity.update(dt));
};

const init = async (container: HTMLElement) => {
  SceneManager.init(container);

  const scene = SceneManager.getScene();
  const camera = SceneManager.getCamera();
  const canvas = SceneManager.getCanvas();

  camera.position.set(0, 20, -15);
  camera.rotation.set(Math.PI / 4, 0, 0);
  
  scene.registerBeforeRender(() => {
    updateEntities();
  });

  SceneManager.render();
};

export default {
  init,
}