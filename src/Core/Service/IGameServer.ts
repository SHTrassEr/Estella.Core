﻿namespace Estella.Core {

    export interface IGameServer {
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][];

        setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void;
    }
}

