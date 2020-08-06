import { Mesh, TransformNode, MeshBuilder } from '@babylonjs/core';
import { Body, Vector } from 'matter-js';

import Physics from './physics';

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

    this.mesh = MeshBuilder.CreateSphere('entity', {diameter: 1});

    this.mesh.parent = this.origin;

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
    Body.translate(this.body, this.velocity);
    this.origin.position.x = this.body.position.x;
    this.origin.position.z = this.body.position.y;
  }

}