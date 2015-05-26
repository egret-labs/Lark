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
        projManifest: string;
        debugDir: string;
        releaseDir: string;
        templateDir: string;
        out: string;
        outDir: string;
        larkRoot?: string;
        port: number;
        host: string;
        websocketUrl: string;
        manageUrl: string;

        publish?: boolean;
        includeLark?: boolean;
        minify?: boolean;
        sourceMap?: boolean;
        removeComments?: boolean;
        esTarget?: string;
        serverOnly?: boolean;
        declaration?: boolean;
        autoCompile?: boolean;
        fileName?:string;
        project: ILarkProject;

        toJSON: () => any;

        //工具用
    }

    export interface ILarkProject {
        name: string;
        version: string;
        modules: LarkModule[];
        platforms: LarkPlatform[];
        port: number;
        ip: string;
        host: string;
        keepLarkInSeparatedFiles: boolean;
        larkVersion: string;
        entry: string;
        startupHtml: string;
        scaleMode: string;
        contentWidth: number;
        contentHeight: number;
        showPaintRects: boolean;
        template: string;
        toJSON?(): ILarkProject;
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

    export var options: ICompileOptions;

    module server {
        export var options: ICompileOptions;
        export interface ViewModel {
            options: ICompileOptions;
        }
        export var console: {
            on(event: string, listener: Function): any;
            removeListener(event: string, listener: Function): any;
        };
        export var IPs: string[];
    }

    export var manifest: lark.LarkManifest;
    export interface LarkManifest {
        version: string;
        modules: LarkModule[];
        platforms: LarkPlatform[];
    }

    
    
    export interface LarkModule {
        name: string;
        description?: string;
        files?: Array<string|{ dir: string;filter:string }>;
        dependencies?: string[];
        root?: string;
    }

    export interface LarkPlatform {
        name: string;
        description?: string;
    }
}

