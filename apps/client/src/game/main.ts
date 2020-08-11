import { MeshBuilder, Camera, UniversalCamera, Scene } from '@babylonjs/core';

import SceneManager from './scene-manager';
import AssetManager from './asset-manager';
import Physics from './physics';
import Controls from './controls';

import { Entity } from './entity';
import { EntityData } from './interfaces/entity-data';
import { Vector } from 'matter-js';

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
  
  Controls.init(p1);

  const speed = 5;

  scene.registerBeforeRender(() => {
    const dt = SceneManager.getDeltaTime();
    const direction = Controls.getMoveDirection();
    let velocity =Vector.create(direction.x, direction.y);
    velocity = Vector.normalise(velocity);
    velocity = Vector.mult(velocity, speed);
    let magnitude = Vector.magnitude(velocity);
    
    p1.setVelocity(velocity.x * dt, velocity.y * dt);
    updateEntities();
  });

};

export default {
  init,
}