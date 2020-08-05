import { Duplex } from 'stream';

export interface Socket extends Duplex {
  playerId?: string;
}