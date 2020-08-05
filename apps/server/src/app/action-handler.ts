import { Action, LoginAction } from '@multiplayer-game/protobuf';

import { Socket } from './socket';
import Helpers from './helpers';

const handle = (ws: Socket, data: Action) => {
  if(data.login) {
    handleLogin(ws, data.login);
  }
};

const handleLogin = (ws: Socket, data: LoginAction) => {
  if(ws.playerId) {
    throw new Error('Already logged in.');
  }

  ws.playerId = Helpers.generateId();
};

export default {
  handle,
}