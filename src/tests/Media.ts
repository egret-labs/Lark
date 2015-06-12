

module lark {
    /**
     * @language en_US
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class MediaMain extends Sprite {
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        play: TextField;
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        stop: TextField;
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        progress: TextField;
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        audio: Sound;
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor() {
            super();

            var play = new TextField("play");
            var stop = new TextField("stop");
            var progress = new TextField("0");

            var channel:lark.SoundChannel;

            var onProgressTimer = ()=>{
                if(!channel)
                    return;
                progress.text = channel.position.toString();
            };

            play.on(TouchEvent.TOUCH_BEGIN, e => {
                channel =this.audio.play(0,true);

                var timer = new Timer(200);
                timer.on("timer",onProgressTimer,this);
                timer.start();

            }, this);

            stop.on(TouchEvent.TOUCH_END, e=> channel.stop(), this);



            stop.y = 60;
            progress.y = 90;
            this.addChild(play);
            this.addChild(stop);
            this.addChild(progress);

            this.start();
        }

        /**
         * @language en_US
         * 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        start() {

            var sound = new Sound('sound/sound_go.mp3');
            sound.load();
            this.audio = sound;
        }
    }

}