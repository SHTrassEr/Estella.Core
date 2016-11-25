namespace Estella.Core.Server {

    export class EventWebSocketServer<T> implements IEventWebSocketServer<T> {

        protected webSocketClient: IWebSocketServer;
        protected data: T;

        constructor(webSocketClient: IWebSocketServer, data: T) {
            this.webSocketClient = webSocketClient;
            this.data = data;
        }

        public getSource(): IWebSocketServer {
            return this.webSocketClient;
        }

        public getData(): T {
            return this.data;
        }
    }
}