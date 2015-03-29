module lark {
    export class HtmlAudio extends LarkAudioBase {
        protected domElement: HTMLAudioElement;
        public load() {
            if (this.loadStart)
                return;
            var audio = new Audio();
            audio.autoplay = false;
            audio.volume = this._volume;
            this.sources.forEach(source=> {
                var sourceElement = document.createElement("SOURCE");
                sourceElement.src = source.src;
                sourceElement.type = source.mimeType||"";
                audio.appendChild(sourceElement);
            })

            audio.load();
            this.loadStart = true;
            this.$addDomListeners(audio);
            this.domElement = audio;
            document.body.appendChild(audio);
        }

        public play(loop: boolean = false) {
            if (this.canPlay)
                this.domElement.play();
            else
                this.playAfterLoad(loop);
        }

        public pause() {
            this.domElement.pause();
        }

        protected getVolume(): number {
            if (this.domElement)
                return this.domElement.volume;
            return super.getVolume();
        }

        protected setVolume(value: number) {
            super.setVolume(value);
            this.domElement.volume = value;
        }
    }
}