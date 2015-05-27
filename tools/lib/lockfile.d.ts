export interface Options {
    wait?: number;
    stale?: number;
    retries?: number;
    retryWait?: number;
}

export declare function lock(path: string, opts: Options, callback: (err: Error) => void): void;
export declare function lock(path: string, callback: (err: Error) => void): void;
export declare function lockSync(path: string, opts: Options): void;
export declare function unlock(path: string, callback: (err: Error) => void): void;
export declare function unlockSync(path: string): void;
export declare function check(path: string, opts: Options, callback: (err: Error) => void): void;
export declare function check(path: string, callback: (err: Error) => void): void;
export declare function checkSync(path: string, opts: Options): boolean;