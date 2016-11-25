namespace Estella.Core.Server {

    export class EventWebSocketClient<T> implements IEventWebSocketClient<T> {

        protected webSocketClient: IWebSocketClient;
        protected data: T;

        constructor(webSocketClient: IWebSocketClient, data: T) {
            this.webSocketClient = webSocketClient;
            this.data = data;
        }

        public getSource(): IWebSocketClient {
            return this.webSocketClient;
        }

        public getData(): T {
            return this.data;
        }
    }
}