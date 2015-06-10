

module lark {
    export class MediaMain extends Sprite {
        play: TextField;
        stop: TextField;
        progress: TextField;
        audio: Sound;
        constructor() {
            super();

            var play = new TextField("play");
            var stop = new TextField("stop");
            stop.y = 60;
            var progress = new TextField("0");
            progress.y = 90;

            var channel:lark.SoundChannel;

            var onChannelTimer = ()=>{
                if(!channel)
                    return;
                progress.text = channel.position;
            };

            play.on(TouchEvent.TOUCH_BEGIN, e => {
                channel =this.audio.play(0,true);

                var timer = new Timer(200);
                timer.on("timer",onChannelTimer,this);
                timer.start();

            }, this);
            stop.on(TouchEvent.TOUCH_END, e=> channel.stop(), this);

            this.addChild(play);
            this.addChild(stop);
            this.addChild(progress);

            this.play = play;
            this.stop = stop;
            this.progress = progress;

            this.start();
        }

        start() {

            var sound = new Sound('sound/sound_go.mp3');
            sound.load();
            this.audio = sound;
        }


        showOrg(e: Event) {

        }
    }

}