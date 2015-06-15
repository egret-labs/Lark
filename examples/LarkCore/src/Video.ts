class Video extends lark.Sprite {

    poster:lark.Bitmap;
    video:lark.Video;
    videoBitmap:lark.Video;
    constructor() {
        super();

        var imageLoader = new lark.ImageLoader();
        imageLoader.once(lark.Event.COMPLETE,this.onLoaded,this);
        imageLoader.load("resources/poster.png");
        
        var video = new lark.Video("resources/trailer.mp4")
        video.load();
        this.video = video;
    }

    private onLoaded(e:lark.Event){
        var loader:lark.ImageLoader = e.target;
        var bitmapData = loader.data;

        var bitmap = new lark.Bitmap(bitmapData);
        bitmap.x = 50;
        bitmap.y = 50;
        this.addChild(bitmap);
        this.poster = bitmap;
        bitmap.once(lark.TouchEvent.TOUCH_TAP,this.playVideo,this);
    }

    private playVideo(e:lark.TouchEvent){
        this.video.play();
        e.stopImmediatePropagation();
        this.poster.bitmapData = this.video.bitmapData;
        if(!lark.Capabilities.isMobile){
            this.on(lark.Event.ENTER_FRAME,this.drawVideo,this);
        }
        this.poster.once(lark.TouchEvent.TOUCH_TAP,this.stopVideo,this);
        this.video.once(lark.Event.ENDED,this.stopVideo,this);
    }
    
    private stopVideo(e:lark.TouchEvent){
        e.stopImmediatePropagation();
        if(!lark.Capabilities.isMobile){
            this.removeListener(lark.Event.ENTER_FRAME,this.drawVideo,this);
        }
        this.poster.once(lark.TouchEvent.TOUCH_TAP,this.playVideo,this);
    }
    
    private drawVideo(){
        this.poster.bitmapData = null;
        this.poster.bitmapData = this.video.bitmapData;
    }
}