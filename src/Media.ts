

module lark {
    export class Media extends DisplayObjectContainer {
        constructor() {
            super();
            var textfield = new TextField("Hi Audio", { fontSize: 50 });
            this.addChild(textfield);
            var poster = new Image();
            poster.src = "image/test.png";
            poster.onload = () => {
                var texture = new Texture(poster);
                this.start(texture);
            }
        }

        start(texture:Texture) {


            var audio = new LarkAudio({
                src: "sound/mp3.mp3"
            });
            var sources = ["sound/ogg.ogg", "sound/wav.wav", "sound/weba.weba", "sound/opus.upus", "sound/flac.flac", "sound/mp3.mp3"]
            audio.sources = sources.map(s=> { return { src: s } });
            audio.load();


            var video = new LarkVideo({ src: "sound/mov_bbb.mp4",width:500});
            this.addChild(video);
            video.load();
            window["video"] = video;

            this.stage.addEventListener(TouchEvent.TOUCH_BEGIN, e=>video.play(true), this);
        }
    }

}