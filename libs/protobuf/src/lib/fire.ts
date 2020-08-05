import { Message, Field } from 'protobufjs/light';

export class FireAction extends Message {
  @Field.d(1, 'bool')
  public fire: boolean;
}