module lark {

    export interface IMediaSource {
        src: string;
        mimeType?: string;
    }

    export interface IMediaOption {
        src: string;
        mimeType?: string;
        sources?: IMediaSource[];
        poster?: string|Texture;
        width?: number;
        height?: number;
        volume?: number;
    }

    export class LarkMedia extends DisplayObject {
        public constructor(option?: IMediaOption) {
            super();
            if (!option)
                return;
            this.$option = option;
            this.sources = option.sources || [{ src: option.src }];
            this._volume = option.volume == undefined ? this._volume : option.volume;
        }


        public $option: IMediaOption;
        public sources: IMediaSource[];
        public isPlaying: boolean = false;
        
        protected _volume: number = 1;
        public get volume(): number {
            return this.getVolume();
        }
        public set volume(value: number) {
            this.setVolume(value);
        }
        protected getVolume(): number {
            return this._volume;
        }
        protected setVolume(value: number) {
            this._volume = value;
        }



        public load() {

        }

        public play(loop: boolean = false) {

        }

        public pause() {

        }

        protected onLoaded(e: SystemEvent): void {
            this.onEvent("loaded");
        }

        protected onCanPlay(e: SystemEvent): void {
            this.onEvent("canplay");
        }

        protected onPlay(e: SystemEvent): void {
            this.onEvent("play");
        }

        protected onPlaying(e: SystemEvent): void {
            this.isPlaying = true;
            this.onEvent("playing");
        }

        protected onPause(e: SystemEvent): void {
            this.isPlaying = false;
            this.onEvent("pause");
        }

        protected onEnded(e: SystemEvent): void {
            this.isPlaying = false;
            this.onEvent("ended");
        }

        protected onTimeupdate(e: SystemEvent): void {
            this.isPlaying = true;
            this.onEvent("timeupdate");
        }

        protected onVolumeChange(e: SystemEvent): void {
            this.onEvent("volumechange");
        }
        protected onError(e: SystemEvent): void {
            this.onEvent("error");
        }

        protected onEvent(eventType: string):void {
            this.dispatchEventWith(eventType);
        }

        public addEventListener(type: "loadstart", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "canplay", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "play", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "playing", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "pause", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "end", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "timeupdate", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "volumechange", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: "error", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public addEventListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number) {
            super.addEventListener(type, listener, thisObject, useCapture, priority);
        }

    }
}