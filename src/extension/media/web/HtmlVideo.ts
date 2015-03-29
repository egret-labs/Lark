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

            video.addEventListener("loadedmetadata", this.onLoadedMeta);
            video.load();

            
            this.domElement = video;
            //document.body.appendChild(video);
        }

        protected onLoadedMeta = (e) => {
            var video = this.domElement;
            video.height = video.videoHeight;
            video.width = video.videoWidth;
            if (this.texture == null && this._poster == null)
                this.$setDefaultTexture(new Texture(video));
        }

    }
}