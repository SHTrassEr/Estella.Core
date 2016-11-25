namespace Estella.Core.Server {

    export interface IWebSocketClientListService  {
        remove(client: IWebSocketClient): void;
        add(client: any): IWebSocketClient;
        getIterator(): IterableIterator<IWebSocketClient>;

    }
}