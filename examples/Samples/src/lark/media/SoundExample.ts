

/**
 * @language en_US
 * The following example uses the lark.Sound class to play a mp3 file.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.Sound 来播放一个MP3文件。
 */
class SoundExample extends lark.Sprite {
    sound: lark.Sound;
    channel: lark.SoundChannel;
    loading: lark.TextField;
    constructor() {
        super();
        var loading = new lark.TextField("Loading");
        loading.y = 50;
        loading.x = 50;
        loading.textColor = 0xFFFFFF;
        this.addChild(loading);
        this.loading = loading;

        var sound = new lark.Sound("resources/sound_go.mp3");
        sound.on(lark.Event.COMPLETE, this.onLoaded, this);
        sound.load();
        this.sound = sound;
    }

    private onLoaded() {
        this.loading.visible = false;

        var play = new lark.TextField("Play");
        play.x = 30;
        play.y = 100;
        play.textColor = 0xFFFFFF;
        play.on(lark.TouchEvent.TOUCH_END, this.play, this);
        this.addChild(play);

        var stop = new lark.TextField("Stop");
        stop.x = 200;
        stop.y = 100;
        stop.textColor = 0xFFFFFF;
        stop.on(lark.TouchEvent.TOUCH_END, this.stop, this);
        this.addChild(stop);

    }

    private play() {
        this.stop();

        this.channel = this.sound.play(0, true);
        this.channel.volume = 0.5;
        this.channel.position = 0.05;
    }

    private stop() {
        if (this.channel) {
            this.channel.stop();
            this.channel = null;
        }
    }
}