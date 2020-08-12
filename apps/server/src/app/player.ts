import { Color, MoveDirection } from '@multiplayer-game/protobuf';
import Physics from './physics';
import { Body, Vector } from 'matter-js';

export interface PlayerData {
  id: string;
  name: string;
  color: Color;
  x: number;
  y: number;
  aimDirection?: number;
  moveDirection?: MoveDirection;
  fire?: boolean;
  die?: boolean;
  disconnect?: boolean;
}

export class Player {

  speed = 5;
  
  private body: Body;

  private velocity: Vector = Vector.create(0, 0);

  private availableDirections = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private data: PlayerData) {
    this.body = Physics.addCircle(this.data.x, this.data.y, 0.5);
  }

  beforePhysics(dt: number) {
    const velocity = Vector.create(this.velocity.x * dt, this.velocity.y * dt);

    Body.translate(this.body, velocity);
  }

  afterPhysics(dt: number) {
    this.data.x = this.body.position.x;
    this.data.y = this.body.position.y;
  }

  destroy() {
    Physics.removeBody(this.body);

    this.body = undefined;
  }

  setMoveDirection(direction: number) {
    if(!this.availableDirections.includes(direction)) {
      return;
    }

    const angle = (direction - 1) * (Math.PI / 4);

    if(direction === 0) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    } else {
      this.velocity.x = this.speed * Math.sin(angle);
      this.velocity.y = this.speed * Math.cos(angle);
    }
  }

  getData() {
    return this.data;
  }

  get id() {
    return this.data.id;
  }

}