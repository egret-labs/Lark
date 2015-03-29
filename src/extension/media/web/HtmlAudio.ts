module lark {
    export class HtmlAudio extends LarkAudioBase {
        protected audioElement: HTMLAudioElement;
        public load() {
            var audio = new Audio();
            audio.autoplay = false;

            this.sources.forEach(source=> {
                var sourceElement = document.createElement("SOURCE");
                sourceElement.src = source.src;
                sourceElement.type = source.mimeType||"";
                audio.appendChild(sourceElement);
            })

            audio.load();
            this.audioElement = audio;
            document.body.appendChild(audio);
        }

        public play() {
            this.audioElement.play();
        }
    }
}