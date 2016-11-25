namespace Estella.Core.Server {

    export interface IClientServerMessageDispatcher extends EntityDispatcher<IClientServerMessage, IClientServerMessageHandler> {
        process(entity: IClientServerMessage, client: IWebSocketClient, server: IWebSocketServer): void;
    }
}