module lark.web {
    export class Video extends WebMedia implements lark.Video {
        /**
        * 创建一个Video对象
        */
        public constructor(option: IVideoOption) {
            super(option);
        }

        public get bitmapData(): BitmapData {
            return <HTMLVideoElement>this.domElement;
        }

        public set bitmapData(video) {
            // Read only
            error(tr(1010, 'Video.bitmapData'));
        }

        protected createDomElement(): HTMLMediaElement {
            var video = document.createElement('video');
            video.height = this.$option.height;
            video.width = this.$option.width;
            video.addEventListener("loadedmetadata", e=> this.onLoadedMeta(e));
            this.domElement = video;
            return video;
        }

        protected onLoadedMeta(e:SystemEvent) {
            var video = <HTMLVideoElement>this.domElement;
            video.height = video.videoHeight;
            video.width = video.videoWidth;
            this.emitWith(MediaEvent.RESIZE);
        }
    }
}

lark.Video = lark.web.Video;