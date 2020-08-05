import { Message, Field } from 'protobufjs/light';

export class LoginAction extends Message {
  @Field.d(1, 'string')
  public name: string;
}