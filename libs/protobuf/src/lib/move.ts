import { Message, Field } from 'protobufjs/light';

export enum MoveDirection {
  NONE = 0,
  N = 1,
  NE = 2,
  E = 3,
  SE = 4,
  S = 5,
  SW = 6,
  W = 7,
  NW = 8,
}

export class MoveAction extends Message {
  @Field.d(1, MoveDirection)
  public direction: MoveDirection;
}