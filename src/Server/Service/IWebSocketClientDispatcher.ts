namespace Estella.Core.Server {

    export interface IWebSocketClientDispatcher {

        addServerType(t: typeof WebSocketGameServer);

        addClient(client: IWebSocketClient);

        getMaxClientCount(): number;
        getClientCount(): number;

    }
}