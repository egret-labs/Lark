/// <reference path="types.d.ts" />



export interface WatchOption {
    ignoreDotFiles?: boolean;
    filter?: (filename: string) => boolean;
    ignoreUnreadableDir?: boolean;
    ignoreNotPermitted?: boolean;
    ignoreDirectoryPattern?: RegExp;
}

export interface FileStat {

}

export interface FileMonitor extends NodeJS.EventEmitter {
    files: FileStat[];
    stop();
}

export declare var watchTree: (root: string, options: WatchOption, callback) => void;
export declare var createMonitor: (root: string, options: WatchOption, callback: (monitor: FileMonitor)=>void) => void;
export declare var unwatchTree: (root:string) => void;



