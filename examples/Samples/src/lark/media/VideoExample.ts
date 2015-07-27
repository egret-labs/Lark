
/**
 * @language en_US
 * The following example uses the lark.Video class to play a mp4 file.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.Video 来播放一个MP4文件。
 */
class VideoExample extends lark.Sprite {
    constructor() {
        super();
        
        var video = new lark.Video("http://media.w3.org/2010/05/sintel/trailer.mp4")
        video.x = 50;
        video.y = 20;
        video.width = 427;
        video.height = 240;
        video.fullscreen = true;

        //The URL of an image you want to display before the video is loaded or video cannot been draw on the canvas on some mobile device.
        //视频加载前，或者在不支持将 video 画在 canvas 的设备上，想要显示的视频截图地址。
        video.poster = "resources/posterfullscreen.jpg";

        video.once(lark.TouchEvent.TOUCH_TAP, this.playVideo, this);
        video.load();
        this.addChild(video);

        var text = new lark.TextField('Loading');
        text.x = 50;
        text.y = 260;
        text.textColor = 0xFFFFFF;
        video.on(lark.Event.COMPLETE, e=> text.text = "Loaded, click video to play", this);
        this.addChild(text);
    }

    private playVideo(e: lark.TouchEvent) {
        var video = <lark.Video>e.target;
        video.play();
        video.once(lark.TouchEvent.TOUCH_TAP, this.stopVideo, this);
        video.once(lark.Event.ENDED, this.stopVideo, this);
    }

    private stopVideo(e: lark.TouchEvent) {
        var video = <lark.Video>e.target;
        video.removeListener(lark.Event.ENDED, this.stopVideo, this);
        video.removeListener(lark.TouchEvent.TOUCH_TAP, this.stopVideo, this);
        video.pause();
        video.once(lark.TouchEvent.TOUCH_TAP, this.playVideo, this);
    }
}