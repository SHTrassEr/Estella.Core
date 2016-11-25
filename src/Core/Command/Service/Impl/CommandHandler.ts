/// <reference path="../../../Service/Impl/EntityHandler.ts" />

namespace Estella.Core {

    export class CommandHandler extends EntityHandler<ICommand> implements ICommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super()
            this.world = world;
        }

        public process(command: ICommand): void {
            if (this.isValid(command)) {
                this.processEntity(command);
            }
        }

        protected startProcess(process: IProcess): void {
            this.world.getProcessListService().add(process);
            this.world.getProcessDispatcher().init(process);
        }

        protected finishProcess(process: IProcess): void {
            this.world.getProcessDispatcher().finish(process);
        }
    }
}