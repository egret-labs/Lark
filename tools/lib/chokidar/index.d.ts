/// <reference path="../types.d.ts" />

export interface FSWatcher extends NodeJS.EventEmitter {
    add(fileDirOrGlob: string): void;
    add(filesDirsOrGlobs: Array<string>): void;
    unwatch(fileDirOrGlob: string): void;
    unwatch(filesDirsOrGlobs: Array<string>): void;
}

export interface WatchOptions {
    persistent?: boolean;
    ignored?: any;
    ignoreInitial?: boolean;
    followSymlinks?: boolean;
    cwd?: string;
    usePolling?: boolean;
    useFsEvents?: boolean;
    alwaysStat?: boolean;
    depth?: number;
    interval?: number;
    binaryInterval?: number;
    ignorePermissionErrors?: boolean;
    atomic?: boolean;
}

export declare function watch(fileDirOrGlob: string, options?: WatchOptions): FSWatcher;
export declare function watch(filesDirsOrGlobs: Array<string>, options?: WatchOptions): FSWatcher;
