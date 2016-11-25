namespace Estella.Core.Server {

    export abstract class EstellaServer implements IEstellaServer {

        protected webSocketServer: IWebSocketServer;
        protected entityFactory: IEntityFactory;
        protected webSocketGameServerLobby: IWebSocketGameServerLobby;

        constructor(webSocketServer: IWebSocketServer) {
            this.webSocketServer = webSocketServer;
            this.webSocketGameServerLobby = this.createLobby();

            this.initWebSocketServer(webSocketServer);
        }

        protected abstract createLobby(): IWebSocketGameServerLobby;

        protected initWebSocketServer(webSocketServer: IWebSocketServer) {
            webSocketServer.clientConnected().on(this.clientConnectedHandler.bind(this));
        }

        protected clientConnectedHandler(ev: IEventWebSocketServer<IWebSocketClient>): void {
            let client = ev.getData();
            this.webSocketGameServerLobby.addClient(client);
        }
    }
}