import { Action, UpdatePacket } from '@multiplayer-game/protobuf';

let socket: WebSocket;
let messageHandler: (data: any) => void;
let connectHandler: () => void;

const connect = (url: string) => {
  socket = new WebSocket(url);
  socket.binaryType = 'arraybuffer';

  socket.onopen = () => {
    if(connectHandler) {
      connectHandler();
    }
  };

  socket.onmessage = (event: MessageEvent) => {
    const buffer = new Uint8Array(event.data);
    const packet = UpdatePacket.decode(buffer);

    if(messageHandler) {
      messageHandler(packet);
    }
  };
};

const onConnect = (handler: () => void) => {
  connectHandler = handler;
};

const onMessage = (handler: (data: any) => void) => {
  messageHandler = handler;
};

const send = (data: any) => {
  if(!socket || socket.readyState !== WebSocket.OPEN) {
    return console.warn('Connection is not ready yet.');
  }
  
  const packet = Action.create(data);

  const buffer = Action.encode(packet).finish();

  socket.send(buffer);
};

export default {
  connect,
  onConnect,
  onMessage,
  send,
}