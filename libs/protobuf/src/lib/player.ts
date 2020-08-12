import { Message, Field } from 'protobufjs/light';
import { MoveDirection } from './move';

export enum Color {
  RED,
  BLUE,
}

export class PlayerData extends Message {
  @Field.d(1, 'string')
  public id: string;

  @Field.d(2, 'string', 'optional')
  public name: string;

  @Field.d(3, Color, 'optional')
  public color: Color;

  @Field.d(4, 'float', 'optional')
  public x: number;

  @Field.d(5, 'float', 'optional')
  public y: number;

  @Field.d(6, MoveDirection, 'optional')
  public moveDirection: MoveDirection;

  @Field.d(7, 'float', 'optional')
  public aimDirection: number;

  @Field.d(8, 'bool', 'optional')
  public fire: number;

  @Field.d(9, 'bool', 'optional')
  public die: number;

  @Field.d(10, 'bool', 'optional')
  public disconnect: number;
}