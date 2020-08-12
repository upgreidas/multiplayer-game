import { UpdatePacket } from '@multiplayer-game/protobuf';
import { Socket } from './socket';

let connections: Socket[] = [];

const addConnection = (socket: Socket) => {
  connections.push(socket);
};

const removeConnection = (socket: Socket) => {
  connections = connections.filter(connection => connection !== socket);
};

const eachConnection = (handler: (connection: Socket) => void) => {
  connections.forEach(connection => {
    handler(connection);
  });
};

const sendPacket = (ws: Socket, data: any) => {
  const packet = UpdatePacket.create(data);

  const buffer = UpdatePacket.encode(packet).finish();

  ws.send(buffer);
};

export default {
  addConnection,
  removeConnection,
  eachConnection,
  sendPacket,
}