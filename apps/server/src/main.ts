import { Server } from 'ws';
import { Duplex } from 'stream';

const port = parseInt(process.env.SERVER_PORT) || 8000;

const wss = new Server({ port });

wss.on('connection', (ws: Duplex) => {
  ws.on('message', (message: MessageEvent) => {
    console.log('received: %s', message);
  });
});

console.log(`Server is listening on ${port} port.`);