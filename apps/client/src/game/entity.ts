import { Mesh, TransformNode, MeshBuilder } from '@babylonjs/core';
import { Body, Vector } from 'matter-js';

import Physics from './physics';
import AssetManager from './asset-manager';

import { EntityData } from './interfaces/entity-data';

export class Entity {

  private origin: TransformNode;

  private mesh: Mesh;

  private body: Body;

  private velocity: Vector = Vector.create(0, 0);

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
    
    if(this.mesh) {
      this.mesh.parent = this.origin;
    }

    this.body = Physics.addCircle(this.data.x, this.data.y, 0.5);
  }

  setVelocity(x: number, y: number) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  setMass(value: number) {
    Body.setMass(this.body, value);
  }

  setFriction(value: number) {
    this.body.friction = value;
  }

  update(dt: number) {
    this.origin.position.x = this.data.x;
    this.origin.position.z = this.data.y;
  }

  applyState(data: any) {
    Object.assign(this.data, data);
  }

  get id() {
    return this.data.id;
  }

}