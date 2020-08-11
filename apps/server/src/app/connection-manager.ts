import { Socket } from './socket';

let connections: Socket[] = [];

const addConnection = (socket: Socket) => {
  connections.push(socket);
};

const removeConnection = (socket: Socket) => {
  connections = connections.filter(connection => connection !== socket);
};

const eachConnection = (handler: () => void) => {
  connections.forEach(connection => handler);
};

export default {
  addConnection,
  removeConnection,
  eachConnection,
}