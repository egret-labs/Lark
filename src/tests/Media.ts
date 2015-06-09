

module lark {
    export class MediaMain extends Sprite {
        play: TextField;
        pause: TextField;
        stop: TextField;
        progress: TextField;
        audio: Sound;
        constructor() {
            super();

            var play = new TextField("play");
            var pause = new TextField("pause");
            pause.y = 30;
            var stop = new TextField("stop");
            stop.y = 60;
            var progress = new TextField("0");
            progress.y = 90;

            play.on(TouchEvent.TOUCH_BEGIN, e=> this.audio.play(), this);

            this.addChild(play);
            this.addChild(pause);
            this.addChild(stop);
            this.addChild(progress);

            this.play = play;
            this.pause = pause;
            this.stop = stop;
            this.progress = progress;

            this.start();
        }

        start() {

            var sound = new Sound('sound/br-jam-loop.wav');
            sound.load();
            this.audio = sound;
        }

        showOrg(e: Event) {

        }
    }

}