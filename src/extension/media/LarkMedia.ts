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
        public canPlay: boolean = false;
        public loadStart = false;
        
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

        protected onLoaded(e?: SystemEvent): void {
            this.onEvent("loaded");
        }

        protected onCanPlay(e?: SystemEvent): void {
            this.canPlay = true;
            this.onEvent("canplay");
        }

        protected onPlay(e?: SystemEvent): void {
            this.onEvent("play");
        }

        protected onPlaying(e?: SystemEvent): void {
            this.isPlaying = true;
            this.onEvent("playing");
        }

        protected onPause(e?: SystemEvent): void {
            this.isPlaying = false;
            this.onEvent("pause");
        }

        protected onEnded(e?: SystemEvent): void {
            this.isPlaying = false;
            this.onEvent("ended");
        }

        protected onTimeupdate(e?: SystemEvent): void {
            this.isPlaying = true;
            this.onEvent("timeupdate");
        }

        protected onVolumeChange(e?: SystemEvent): void {
            this.onEvent("volumechange");
        }
        protected onError(error?:any): void {
            this.onEvent("error", error);
        }

        protected onEvent(eventType: string,data?:any):void {
            console.log(eventType, data);
            this.emitWith(eventType, false, data);
        }

        protected playAfterLoad(loop: boolean = false) {
            this.on("canplay", e=> this.play(loop), this);
            this.load();
        }

        protected $addDomListeners(media:HTMLMediaElement) {
            media.addEventListener("loadstart", e=> this.onEvent("loadstart"));
            media.addEventListener("play", e=> this.onPlay(e));
            media.addEventListener("playing", e=> this.onPlaying(e));
            media.addEventListener("canplay", e=> this.onCanPlay(e));
            media.addEventListener("pause", e=> this.onPause(e));
            media.addEventListener("ended", e=> this.onEnded(e));
            media.addEventListener("timeupdate", e=> this.onTimeupdate(e));
            media.addEventListener("volumechange", e=> this.onVolumeChange(e));
            media.addEventListener("error", e=> this.onError(e));
        }

        public on(type: "loadstart", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "canplay", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "play", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "playing", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "pause", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "end", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "timeupdate", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "volumechange", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: "error", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number) {
            super.on(type, listener, thisObject, useCapture, priority);
        }

    }
}