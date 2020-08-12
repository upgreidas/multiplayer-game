import { PlayerData, Player } from './player';
import { Color } from '@multiplayer-game/protobuf';

let players: Player[] = [];

const addPlayer = (id: string, name: string) => {
  const player = new Player({
    id,
    name,
    color: Color.RED,
    x: 0,
    y: 0,
  });

  players.push(player);

  return player;
};

const getPlayer = (id: string) => {
  return players.find(player => player.id === id);
};

const eachPlayer = (handler: (player: Player) => void) => {
  players.forEach(player => {
    handler(player);
  });
};

const removePlayer = (id: string) => {
  const player = players.find(p => p.id === id);

  if(!player) {
    throw new Error(`Player ${id} does not exist.`);
  }

  player.destroy();

  players = players.filter(p => p.id !== id);
};

const beforePhysics = (dt: number) => {
  players.forEach(player => player.beforePhysics(dt));
};

const afterPhysics = (dt: number) => {
  players.forEach(player => player.afterPhysics(dt));
};

export default {
  addPlayer,
  getPlayer,
  eachPlayer,
  removePlayer,
  beforePhysics,
  afterPhysics,
}