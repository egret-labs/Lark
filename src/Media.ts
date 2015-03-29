

module lark {
    export class Media extends DisplayObjectContainer {
        textfield: TextField;
        constructor() {
            super();
            var textfield = new TextField("Hi Audio", { fontSize: 50 });
            this.textfield = textfield;
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
            audio.load();

            

            var video = new LarkVideo({ src: "sound/mov_bbb.mp4", width: 500 });

            this.stage.on(TouchEvent.TOUCH_BEGIN, e=> audio.play(false), this);

            window.addEventListener("mousewheel", e=> {
                var volume = audio.volume;
                if (e.wheelDelta > 0)
                    volume += 0.01;
                else
                    volume -= 0.01;
                if (volume > 1)
                    volume = 1;
                else if (volume < 0)
                    volume = 0;
                audio.volume = volume;
                this.textfield.text = volume.toString();
            });
        }
    }

}