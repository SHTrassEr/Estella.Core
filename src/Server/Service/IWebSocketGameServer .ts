namespace Estella.Core.Server {

    export interface IWebSocketGameServer {

        addClient(client: IWebSocketClient);

        isFull(): boolean;
        getMaxClientCount(): number;
        getClientCount(): number;

        getModuleName(): string;
    }
}