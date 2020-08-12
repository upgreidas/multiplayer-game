import { UpdatePacket } from '@multiplayer-game/protobuf';

import ConnectionManager from './connection-manager';
import PlayerManager from './player-manager';

let updateTimer;

const constructPacket = () => {
  const packetData = {
    players: [],
  }

  PlayerManager.eachPlayer((player) => {
    packetData.players.push(player.getData());
  });

  const packet = UpdatePacket.create(packetData);

  const buffer = UpdatePacket.encode(packet).finish();

  return buffer;
};

const run = (updateInterval: number) => {
  updateTimer = setInterval(() => {
    const packet = constructPacket();

    ConnectionManager.eachConnection(connection => {
      connection.send(packet);
    });
  }, updateInterval);
};

export default {
  run,
}