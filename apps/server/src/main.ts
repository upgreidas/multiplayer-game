import { Server } from 'ws';

import { Action } from '@multiplayer-game/protobuf';
import { Socket } from './app/socket';
import ActionHandler from './app/action-handler';
import Game from './app/game';

const port = parseInt(process.env.SERVER_PORT) || 8000;
const updateInterval = parseInt(process.env.PHYSICS_INTERVAL) || 50;

const wss = new Server({ port });

wss.on('connection', (ws: Socket) => {
  ws.on('message', (message: Uint8Array) => {
    try {
      const data = Action.decode(message);

      ActionHandler.handle(ws, data);
    } catch(e) {
      console.log(e.message);
    }
  });

  ws.on('close', () => {
    ActionHandler.handleDisconnect(ws);
  });
});

Game.run(updateInterval);

console.log(`Server is listening on ${port} port.`);