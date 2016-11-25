namespace Estella.Core {

    export interface IEventEngine {
        getSource(): IEngine;
        getStep(): number;
    }
}