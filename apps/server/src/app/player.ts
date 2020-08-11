import { Color, MoveDirection } from '@multiplayer-game/protobuf';
import Physics from './physics';
import { Body } from 'matter-js';

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
  
  private body: Body;

  constructor(private data: PlayerData) {
    this.body = Physics.addCircle(this.data.x, this.data.y, 0.5);
  }

  beforePhysics(dt: number) {

  }

  afterPhysics(dt: number) {
    
  }

  destroy() {
    Physics.removeBody(this.body);

    this.body = undefined;
  }

  get id() {
    return this.data.id;
  }

}