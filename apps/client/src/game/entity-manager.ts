import { EntityData } from './interfaces/entity-data';
import { Entity } from './entity';

let entities: Entity[] = [];

const addEntity = (data: EntityData) => {
  const entity = new Entity(data);

  entities.push(entity);

  entity.build();

  return entity;
};

const getEntity = (id: string) => {
  return entities.find(entity => entity.id === id);
};

const removeEntity = (id: string) => {
  entities = entities.filter(entity => entity.id !== id);
};

const updateEntities = (dt: number) => {
  entities.forEach(entity => entity.update(dt));
};

export default {
  addEntity,
  getEntity,
  removeEntity,
  updateEntities,
}