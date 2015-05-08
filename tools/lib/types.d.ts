/// <reference path="node.d.ts" />
/// <reference path="es6-promise.d.ts" />
/// <reference path="totaljs/totaljs.d.ts" />




declare module lark {

    export interface Map<T> {
        [index: string]: T;
    }

    export interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
        isEarly?: boolean;
    }

    export enum DiagnosticCategory {
        Warning,
        Error,
        Message,
    }
    export interface ICompileOptions {
        action: string;
        projectDir: string;
        srcDir: string;
        srcLarkFile: string;
        debugDir: string;
        debugLarkFile: string;
        releaseDir: string;
        releaseLarkFile: string;
        templateDir: string;
        out: string;
        outDir: string;
        outLarkFile: string;
        larkRoot?: string;
        port: number;
        ip: string;

        publish?: boolean;
        includeLark?: boolean;
        runtime?: string;
        watch?: boolean;
        minify?: boolean;
        sourceMap?: boolean;
        removeComments?: boolean;
        esTarget?: string;
        showUI?: boolean;
        declaration?: boolean;

        //modules
        modules?: string;



        //工具用
    }

    export interface CommandLineOption {
        name: string;
        type: string | Map<number>;         // "string", "number", "boolean", or an object literal mapping named values to actual values
        shortName?: string;                 // A short mnemonic for convenience - for instance, 'h' can be used in place of 'help'.
        description?: DiagnosticMessage;    // The message describing what the command line switch does
        paramType?: DiagnosticMessage;      // The name to be used for a non-boolean option's parameter.
        error?: DiagnosticMessage;          // The error given when the argument does not fit a customized 'type'.
    }

    export interface CommandResult {
        exitCode?: number;
        message?: string;
        data?: any;
        type: string;
    }
}

