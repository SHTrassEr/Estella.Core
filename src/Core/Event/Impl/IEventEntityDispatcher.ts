namespace Estella.Core {

    export class EventEntityDispatcher<T extends IEntity, H extends IEntityHandler<T>> implements IEventEntityDispatcher<T, H> {

        protected source: IEntityDispatcher<T, H>;
        protected entity: T;
        protected handler: H;


        constructor(source: IEntityDispatcher<T, H>, entity: T, handler: H) {
            this.source = source;
            this.entity = entity;
            this.handler = handler;
        }
        
        public getSource(): IEntityDispatcher<T, H> {
            return this.source;
        }

        public getEntity(): T {
            return this.entity;
        }

        public getEntityHandler(): H {
            return this.handler;
        }
    }
}