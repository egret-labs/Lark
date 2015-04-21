/// <reference path="../types.d.ts" />


interface IConnection extends NodeJS.EventEmitter {
    sendText(str: string);
}

export declare var connect: (URL: string, options?, callback?) => IConnection;