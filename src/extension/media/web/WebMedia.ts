module lark.web {

    export class WebMedia extends EventEmitter implements Media {

        public sources: IMediaSource[];
        public isPlaying:boolean = false;
        public canPlay:boolean = false;
        public loadStart = false;


        public constructor(option:IMediaOption) {
            super();
            this.sources = option.sources;
        }


        protected _domElement:HTMLMediaElement;

        public load() {

            var dom = this.createDomElement();
            dom.autoplay = false;
            dom.setAttribute("webkit-playsinline", "");
            dom.volume = this._volume;
            dom.loop = false;

            this.sources.forEach(source=> {
                var sourceElement = <HTMLSourceElement>document.createElement("source");
                sourceElement.src = source.src;
                if (source.type)
                    sourceElement.type = source.type;
                dom.appendChild(sourceElement);
            });
            this.$addDomListeners(dom);
            this.loadStart = true;
            dom.load();
        }

        protected createDomElement():HTMLMediaElement {
            return null;
        } 

        public play(loop:boolean = false) {
            if (this.canPlay) {
                this._domElement.loop = loop;
                this._domElement.play();
            }
            else
                this.playAfterLoad(loop);
        }

        public pause() {
            this._domElement.pause();
        }

        public stop() {
            this._domElement.pause();
            this._domElement.currentTime = 0;
            this.isPlaying = false;
            this.emitWith("ended");
        }


        protected _position:number = 0;
        public get position():number {
            return this.getPosition();
        }

        public set position(value:number) {
            this.setPosition(value);
        }

        protected getPosition():number {
            if (this._domElement)
                return this._domElement.currentTime;
            return this._position;
        }

        protected setPosition(value:number) {
            this._position = value;
            if (this._domElement)
                this._domElement.currentTime = value;
        }

        protected _volume:number = 1;
        public get volume():number {
            return this.getVolume();
        }

        public set volume(value:number) {
            this.setVolume(value);
        }

        protected getVolume():number {
            if (this._domElement)
                return this._domElement.volume;
            return this._volume;
        }

        protected setVolume(value:number) {
            this._volume = value;
            if (this._domElement)
                this._domElement.volume = value;
        }

        protected playAfterLoad(loop:boolean = false) {
            this.on("canplay", e=> this.play(loop), this);
            this.load();
        }

        protected $addDomListeners(media:HTMLMediaElement) {
            media.addEventListener("loadstart", e=> this.emitWith("loadstart"));
            media.addEventListener("play", e=> this.emitWith("play"));
            media.addEventListener("playing", e => {
                this.isPlaying = true;
                this.emitWith("playing");
            });
            media.addEventListener("canplay", e => {
                this.canPlay = true;
                this.emitWith("canplay");
            });
            media.addEventListener("pause", e => {
                this.isPlaying = false;
                this.emitWith("pause");
            });
            media.addEventListener("ended", e => {
                this.isPlaying = false;
                this.emitWith("ended");
            });
            media.addEventListener("timeupdate", e => {
                this.isPlaying = true;
                this.emitWith("timeupdate");
            });
            media.addEventListener("volumechange", e=> this.emitWith("volumechange"));
            media.addEventListener("error", e=> this.emitWith("error", false, false, error));
        }


    }

}