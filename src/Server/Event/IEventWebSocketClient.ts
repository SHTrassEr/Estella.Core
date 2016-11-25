namespace Estella.Core.Server {

    export interface IEventWebSocketClient<T> {
        getSource(): IWebSocketClient;
        getData(): T;
    }
}