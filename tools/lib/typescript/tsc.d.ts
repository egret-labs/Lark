/// <reference path="../types.d.ts" />


export declare function executeCommandLine(args: string[]): void;
export declare function executeWithOption(options: lark.ICompileOptions, files: string[], out?: string, outDir?: string, def?: boolean): { exitCode: number; files: string[] };
export declare var exit: Function;
export declare var write: (msg:string)=>void;

