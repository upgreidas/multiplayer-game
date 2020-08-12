import * as WebSocket from 'ws';

export interface Socket extends WebSocket {
  playerId?: string;
}