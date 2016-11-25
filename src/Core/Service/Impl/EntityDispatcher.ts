namespace Estella.Core {

    export class EntityDispatcher<T extends IEntity, H extends IEntityHandler<T>> implements IEntityDispatcher<T, H> {

        protected handlerList: Map<string, H> = new Map<string, H>();

        constructor() {
            this.handlerList = new Map<string, H>();
        }

        public set(t: typeof Entity, handler: H): void {
            this.handlerList.set(t.type, handler);
        }

        public has(t: typeof Entity): boolean {
            return this.handlerList.has(t.type);
        }

        public delete(t: typeof Entity): void {
            this.handlerList.delete(t.type);
        }

        public process(entity: T, ...args): void {
            let handler = this.getHandler(entity);
            if (!handler) {
                if (handler.isValid(entity)) {
                    this.triggerEvent(this.onBeforeProcess, entity, handler);
                    handler.process(entity);
                    this.triggerEvent(this.onAfterProcess, entity, handler);
                    return;
                }
            }

            throw new Error();
        }

        protected getHandler(entity: T): H {
            let handler = this.handlerList.get(entity.getType());
            if (handler) {
                return handler;
            }

            throw new Error();
        }


        private onBeforeProcess = new LiteEvent<IEventEntityDispatcher<T, H>>();
        private onAfterProcess = new LiteEvent<IEventEntityDispatcher<T, H>>();


        protected triggerEvent(event: LiteEvent<IEventEntityDispatcher<T, H>>, entity: T, handler: H) {
            if (event.getCount() > 0) {
                let e = new EventEntityDispatcher<T, H>(this, entity, handler);
                event.trigger(e);
            }
        }

        public beforeProcess(): ILiteEvent<IEventEntityDispatcher<T, H>> {
            return this.onBeforeProcess;
        }

        public afterProcess(): ILiteEvent<IEventEntityDispatcher<T, H>> {
            return this.onAfterProcess;
        }
    }
}