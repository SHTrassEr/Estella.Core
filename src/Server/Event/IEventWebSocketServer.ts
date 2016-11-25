namespace Estella.Core.Server {

    export interface IEventWebSocketServer<T> {
        getSource(): IWebSocketServer;
        getData(): T;
    }
}