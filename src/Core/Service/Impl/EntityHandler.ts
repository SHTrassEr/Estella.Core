namespace Estella.Core {

    export class EntityHandler<T extends IEntity> implements IEntityHandler<T> {

        public process(entity: T, ...args): void {
            if (this.isValid(entity, ...args)) {
                this.processEntity(entity, ...args);
            }
        }

        public isValid(entity: T, ...args): boolean {
            if (this.isValidEntityType(entity)) {
                return this.isValidEntity(entity, ...args);
            }

            return false;
        }

        protected processEntity(entity: IEntity, ...args) {

        }

        protected isValidEntity(entity: T, ...args): boolean {
            return true;
        }


        protected isValidEntityType(entity: T): boolean {
            let t = this.getEntityType();
            return entity instanceof t;
        }

        protected getEntityType(): typeof Entity {
            return Entity;
        }
    }
}