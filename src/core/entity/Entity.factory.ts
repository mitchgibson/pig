import { Entity } from "./Entity.abstract";
import { EntityStruct } from "./Entity.struct";

export abstract class EntityFactory<T extends EntityStruct, U extends Entity<T>> {
  public abstract create(struct?: Partial<T>): U;
}
