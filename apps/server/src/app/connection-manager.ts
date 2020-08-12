import { Socket } from './socket';

let connections: Socket[] = [];

const addConnection = (socket: Socket) => {
  connections.push(socket);
  console.log(connections.length, socket.playerId);
};

const removeConnection = (socket: Socket) => {
  connections = connections.filter(connection => connection !== socket);
};

const eachConnection = (handler: (connection: Socket) => void) => {
  connections.forEach(connection => {
    handler(connection);
  });
};

export default {
  addConnection,
  removeConnection,
  eachConnection,
}