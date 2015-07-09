class Video extends lark.Sprite {
    constructor() {
            super();
            
            [0,1].forEach(i=>{
                var video = new lark.Video("http://media.w3.org/2010/05/sintel/trailer.mp4")
                video.x = 50;
                video.y = i * 280 + 20;
                video.width = 427;
                video.height = 240;
                video.fullscreen = i == 0;
                video.poster = video.fullscreen ? "resources/posterfullscreen.jpg" : "resources/posterinline.jpg";
                video.once(lark.TouchEvent.TOUCH_TAP, this.playVideo, this);
                video.load();
                this.addChild(video);
                
                var text = new lark.TextField('Loading');
                text.x = 50;
                text.y = (i+1)*280-20;
                video.on(lark.Event.COMPLETE,e=>text.text="Loaded, click video to play",this);
                this.addChild(text);
            });

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