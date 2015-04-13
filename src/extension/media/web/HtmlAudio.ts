var $HtmlAudio = Audio;
module lark {
    export class HtmlAudio extends LarkMedia implements Audio {
        protected domElement: HTMLAudioElement;
        public static Video:Video = new HtmlVideo({});
        public load() {
            if (this.loadStart)
                return;
            var audio = new $HtmlAudio();
            audio.autoplay = false;
            audio.volume = this._volume;
            for (var type in this.sources) {
                var source = this.sources[type];
                var sourceElement = document.createElement("SOURCE");
                sourceElement.src = source;
                audio.appendChild(sourceElement);
            }

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
            if(this.domElement)
                this.domElement.currentTime = value;
        }

        protected getVolume(): number {
            if (this.domElement)
                return this.domElement.volume;
            return super.getVolume();
        }

        protected setVolume(value: number) {
            super.setVolume(value);
            if(this.domElement)
                this.domElement.volume = value;
        }
    }
}
if ( !lark.Audio)
    lark.Audio = lark.HtmlAudio;