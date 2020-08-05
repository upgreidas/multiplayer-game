import { Action, LoginAction } from '@multiplayer-game/protobuf';

import { Socket } from './socket';
import Helpers from './helpers';
import PlayerManager from './player-manager';

const handle = (ws: Socket, data: Action) => {
  if(data.login) {
    handleLogin(ws, data.login);
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
};

const handleDisconnect = (ws: Socket) => {
  PlayerManager.removePlayer(ws.playerId);
};

export default {
  handle,
  handleDisconnect,
}