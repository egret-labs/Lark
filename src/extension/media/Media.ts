module lark {

    export interface Media extends EventEmitter {
        sources: IMediaSource;
        isPlaying: boolean;
        canPlay: boolean;
        loadStart: boolean;
        volume: number;
        position: number;

        load(): void;
        play(loop?: boolean): void;
        pause(): void;
        stop(): void;

        on(type: "loadstart", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "canplay", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "play", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "playing", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "pause", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "end", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "timeupdate", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "volumechange", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "error", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }

    export interface IMediaSource {
        [type: string]: string;
        default?: string;
    }

    export interface IMediaOption {
        src?: string;
        mimeType?: string;
        sources?: IMediaSource;
        poster?: string|BitmapData;
        width?: number;
        height?: number;
        volume?: number;
    }


    export class MediaEvent extends Event {
        public static VOLUME_CHANGE = 'volumechange';
        public static LOAD_START = 'loadstart';
        public static CAN_PLAY = 'canplay';
        public static PLAY = 'play';
        public static PLAYING = 'playing';
        public static PAUSE = 'pause';
        public static ENDED = 'ended';
        public static TIME_UPDATE = 'timeupdate';
        public static ERROR = 'error';
        public static RESIZE = 'resize';
    }

}