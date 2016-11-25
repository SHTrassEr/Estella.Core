namespace Estella.Core.Server {

    export interface IWebSocketGameServerFactory {

        create(): IWebSocketGameServer;

        getMaxClientCount(): number;
        getClientCount(): number;
        getModuleName(): string;
    }
}