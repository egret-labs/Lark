

module lark {
    export class Media extends DisplayObjectContainer {
        constructor() {
            super();

            var audio = LarkAudio.create("sound/mp3.mp3");
            var sources = ["sound/ogg.ogg", "sound/wav.wav", "sound/weba.weba", "sound/opus.upus", "sound/flac.flac", "sound/mp3.mp3"]
            audio.sources = sources.map(s=> { return { src: s } });
            audio.load();
            audio.play();
        }
    }
}