import { Field, Message } from 'protobufjs/light';
import { PlayerData } from './player';

export class UpdatePackage extends Message {
  @Field.d(1, PlayerData, 'repeated')
  public players: PlayerData[];
}