namespace Estella.Core.Server {

    export class WebSocketGameServerLobby implements IWebSocketGameServerLobby  {

        protected webSocketGameServerFactory: IWebSocketGameServerFactory;
        protected gameServerList: IWebSocketGameServer[];

        constructor(webSocketGameServerFactory: IWebSocketGameServerFactory) {
            this.webSocketGameServerFactory = webSocketGameServerFactory;
            this.gameServerList = [];
        }

        public addClient(client: IWebSocketClient) {
            let gameServer = this.getGameServer();
            gameServer.addClient(client);
        }

        protected getGameServer(): IWebSocketGameServer {
            for (let gameServer of this.gameServerList) {
                if (!gameServer.isFull()) {
                    return gameServer;
                }
            }

            let gameServer = this.webSocketGameServerFactory.create();
            this.gameServerList.push(gameServer);
            return gameServer;
        }

    }
}