import { Message, Field, OneOf } from 'protobufjs/light';
import { MoveAction } from './move';
import { AimAction } from './aim';
import { FireAction } from './fire';
import { LoginAction } from './login';

export class Action extends Message {
  @Field.d(1, MoveAction)
  public move: MoveAction;

  @Field.d(2, AimAction)
  public aim: AimAction;

  @Field.d(3, FireAction)
  public fire: FireAction;

  @Field.d(4, LoginAction)
  public login: LoginAction;

  @OneOf.d('move', 'aim', 'fire', 'login')
  public action: string;
}