import { Field, Message } from 'protobufjs/light';
import { PlayerData } from './player';

export class UpdatePacket extends Message {
  @Field.d(1, PlayerData, 'repeated')
  public players: PlayerData[];
}