import { Server } from 'ws';

import { Action } from '@multiplayer-game/protobuf';
import { Socket } from './app/socket';
import ActionHandler from './app/action-handler';

const port = parseInt(process.env.SERVER_PORT) || 8000;

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

console.log(`Server is listening on ${port} port.`);