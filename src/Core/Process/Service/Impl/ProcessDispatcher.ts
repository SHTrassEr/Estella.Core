/// <reference path="../../../Service/Impl/EntityDispatcher.ts" />

namespace Estella.Core {

    export class ProcessDispatcher extends EntityDispatcher<IProcess, IProcessHandler> implements IProcessDispatcher {

        public process(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus === ProcessStatus.Executing) {
                let handler = this.getHandler(process);
                handler.process(process);
            }
        }

        public init(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus === ProcessStatus.Init) {
                let handler = this.getHandler(process);
                handler.init(process);
            }
        }

        public finish(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus !== ProcessStatus.Finished) {
                let handler = this.getHandler(process);
                handler.finish(process);
            }
        }
    }
}