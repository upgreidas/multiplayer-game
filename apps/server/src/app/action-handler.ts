import { Action, LoginAction, MoveAction } from '@multiplayer-game/protobuf';

import { Socket } from './socket';
import Helpers from './helpers';
import PlayerManager from './player-manager';
import ConnectionManager from './connection-manager';

const handle = (ws: Socket, data: Action) => {
  if(data.login) {
    handleLogin(ws, data.login);
  }

  if(data.move) {
    handleMove(ws, data.move);
  }
};

const handleLogin = (ws: Socket, data: LoginAction) => {
  if(ws.playerId) {
    throw new Error('Already logged in.');
  }

  const name = data.name.trim();

  if(!name) {
    throw new Error('Empty name.');
  }
  
  ws.playerId = Helpers.generateId();

  PlayerManager.addPlayer(ws.playerId, name);

  ConnectionManager.addConnection(ws);
  ConnectionManager.sendPacket(ws, { id: ws.playerId });
};

const handleDisconnect = (ws: Socket) => {
  if(!ws.playerId) {
    return;
  }

  PlayerManager.removePlayer(ws.playerId);
  
  ConnectionManager.removeConnection(ws);
};

const handleMove = (ws: Socket, data: MoveAction) => {
  const player = PlayerManager.getPlayer(ws.playerId);

  if(!player) {
    return;
  }

  player.setMoveDirection(data.direction);
};

export default {
  handle,
  handleDisconnect,
}