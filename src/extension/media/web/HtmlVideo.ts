module lark {
    export class HtmlVideo extends LarkVideoBase {
        protected domElement: HTMLVideoElement;

        public play(loop: boolean = false) {
            var video = this.domElement;
            this.texture.$setBitmapData(video);
            this.$setDefaultTexture(this.texture, true);
            video.loop = loop;
            video.play();
        }

        public pause() {
            this.domElement.pause();
        }

        public load() {
            var video = document.createElement("video");
            video.width = this._width;
            video.height = this._height;
            video.autoplay = false;
            video.setAttribute("webkit-playsinline", "");
            if (this._poster)
                video.poster = this._poster;
            this.sources.forEach(source=> {
                var sourceElement = document.createElement("SOURCE");
                sourceElement.src = source.src;
                sourceElement.type = source.mimeType || "";
                video.appendChild(sourceElement);
            })

            video.load();

            
            this.domElement = video;
        }

        protected addListeners() {
            var video = this.domElement;
            video.addEventListener("loadstart", e=>this.onEvent("loadstart"));
            video.addEventListener("loadedmetadata", e=> this.onLoadedMeta(e));
            video.addEventListener("play", e=> this.onPlay(e));
            video.addEventListener("playing", e=> this.onPlaying(e));
            video.addEventListener("canplay", e=> this.onCanPlay(e));
            video.addEventListener("pause", e=> this.onPause(e));
            video.addEventListener("ended", e=> this.onEnded(e));
            video.addEventListener("timeupdate", e=> this.onTimeupdate(e));
            video.addEventListener("volumechange", e=> this.onVolumeChange(e));
            video.addEventListener("error", e=> this.onError(e));
        }

        protected onLoadedMeta(e:SystemEvent) {
            var video = this.domElement;
            video.height = video.videoHeight;
            video.width = video.videoWidth;
            if (this.texture == null && this._poster == null)
                this.$setDefaultTexture(new Texture(video));
        }

    }
}