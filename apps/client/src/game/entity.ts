import SceneManager from './scene-manager';
import AssetManager from './asset-manager';

import { EntityData } from './interfaces/entity-data';
import { Mesh, TransformNode } from '@babylonjs/core';

export class Entity {

  private origin: TransformNode;

  private mesh: Mesh;

  constructor(private data: EntityData) {
    this.data.x = this.data.x || 0;
    this.data.y = this.data.y || 0;
    this.data.z = this.data.z || 0;
    this.data.faceDirection = this.data.faceDirection || 0;
    this.data.moveDirection = this.data.moveDirection || 0;
  }

  build() {
    this.origin = new TransformNode('origin');

    this.mesh = AssetManager.cloneMesh(this.data.model);
    this.mesh.rotation.set(0, Math.PI, 0);

    this.mesh.parent = this.origin;
  }

  update(dt: number) {
    
  }

}