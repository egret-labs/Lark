module lark.web {
    export class WebMedia extends EventEmitter implements Media {

        public $option:IMediaOption;
        public sources:IMediaSource;
        public isPlaying:boolean = false;
        public canPlay:boolean = false;
        public loadStart = false;


        public constructor(option:IMediaOption) {
            super();
            this.$option = option;
            this.sources = option.sources;
            this.sources.default = option.sources.default || option.src;
        }


        protected _domElement:HTMLMediaElement;
        public get domElement():HTMLMediaElement {
            return this._domElement;
        }

        public set domElement(value:HTMLMediaElement) {
            if (value == this._domElement)
                return;
            this._domElement = value;
            this.$addDomListeners(value);
        }

        public load() {

            var dom = this.createDomElement();
            dom.autoplay = false;
            dom.setAttribute("webkit-playsinline", "");
            dom.volume = this._volume;
            dom.loop = false;
            for (var type in this.sources) {
                var source = this.sources[type];
                var sourceElement = document.createElement("SOURCE");
                sourceElement.src = source;
                dom.appendChild(sourceElement);
            }
            this.$addDomListeners(dom);
            this.loadStart = true;
            dom.load();
            this.domElement = dom;
        }

        protected createDomElement():HTMLMediaElement {
            return null;
        }

        public play(loop:boolean = false) {
            if (this.canPlay) {
                this.domElement.loop = loop;
                this.domElement.play();
            }
            else
                this.playAfterLoad(loop);
        }

        public pause() {
            this.domElement.pause();
        }

        public stop() {
            this.domElement.pause();
            this.domElement.currentTime = 0;
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
            if (this.domElement)
                return this.domElement.currentTime;
            return this._position;
        }

        protected setPosition(value:number) {
            this._position = value;
            if (this.domElement)
                this.domElement.currentTime = value;
        }

        protected _volume:number = 1;
        public get volume():number {
            return this.getVolume();
        }

        public set volume(value:number) {
            this.setVolume(value);
        }

        protected getVolume():number {
            if (this.domElement)
                return this.domElement.volume;
            return this._volume;
        }

        protected setVolume(value:number) {
            this._volume = value;
            if (this.domElement)
                this.domElement.volume = value;
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