/// <reference path="ClientServerMessage.ts" />

namespace Estella.Core {

    export class ClientServerMessageConnect extends ClientServerMessage {

        private _moduleName: number = ++this.lastAttributeId;
        private _moduleVersion: number = ++this.lastAttributeId;

        public setModuleName(moduleName: string): void {
            this.attributeList.set(this._moduleName, moduleName);
        }

        public getModuleName(moduleName: string): string {
            return this.attributeList.get(this._moduleName);
        }

        public setModuleVersion(moduleVersion: string): void {
            this.attributeList.set(this._moduleVersion, moduleVersion);
        }

        public getModuleVersion(moduleName: string): string {
            return this.attributeList.get(this._moduleVersion);
        }
    }

    export module ClientServerMessageConnect {
        export const type = ModuleInfo.name + '.' + ClientServerMessageConnect.name;
    }
}