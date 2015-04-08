module lark {
    export class HtmlVideo extends LarkVideoBase {
        protected domElement: HTMLVideoElement;

        public play(loop: boolean = false) {
            if (!this.canPlay) {
                this.playAfterLoad(loop);
                return;
            }
                
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
            if (this.loadStart)
                return;
            var video = document.createElement("video");
            video.width = this._width;
            video.height = this._height;
            video.autoplay = false;
            video.setAttribute("webkit-playsinline", "");
            video.volume = this._volume;
            if (this._poster)
                video.poster = this._poster;
            for (var type in this.sources) {
                var source = this.sources[type];
                var sourceElement = document.createElement("SOURCE");
                sourceElement.src = source;
                video.appendChild(sourceElement);
            }
            video.addEventListener("loadedmetadata", e=> this.onLoadedMeta(e));
            this.$addDomListeners(video);
            this.loadStart = true;
            video.load();

            
            this.domElement = video;
        }

        public stop() {
            this.domElement.pause();
            this.domElement.currentTime = 0;
            this.onStop();
        }


        protected getPosition(): number {
            if (this.domElement)
                return this.domElement.currentTime;
            return super.getPosition();
        }
        protected setPosition(value: number) {
            super.setPosition(value);
            if (this.domElement)
                this.domElement.currentTime = value;
        }

        protected onLoadedMeta(e:SystemEvent) {
            var video = this.domElement;
            video.height = video.videoHeight;
            video.width = video.videoWidth;
            if (this.texture == null && this._poster == null){
                var texture = new Texture();
                texture.$setBitmapData(video);
                this.$setDefaultTexture(texture);
            }
        }

    }
}

lark.Video = lark.HtmlVideo;