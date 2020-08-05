import { Color, MoveDirection } from '@multiplayer-game/protobuf';

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
  
  constructor(private data: PlayerData) {

  }

  get id() {
    return this.data.id;
  }

}