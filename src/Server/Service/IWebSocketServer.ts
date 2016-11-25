namespace Estella.Core.Server {

    export interface IWebSocketServer  {
        clientConnected(): ILiteEvent<IEventWebSocketServer<IWebSocketClient>>;
        clientMessage(): ILiteEvent<IEventWebSocketServer<IEventWebSocketClient<IClientServerMessage>>>;
        clientClose(): ILiteEvent<IEventWebSocketServer<IEventWebSocketClient<any>>>;
    }
}