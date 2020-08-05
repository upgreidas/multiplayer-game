import { Message, Field } from 'protobufjs/light';

export class AimAction extends Message {
  @Field.d(1, 'float')
  public direction: number;
}