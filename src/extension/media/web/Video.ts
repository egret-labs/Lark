module lark.web {
    export class Video extends WebMedia implements lark.Video {
        /**
        * 创建一个Video对象
        */
        public constructor(option: IVideoOption) {
            super(option);
        }

        private _bitmapData:BitmapData;
        public get bitmapData(): BitmapData {
            return this._bitmapData;
        }

        protected createDomElement(): HTMLMediaElement {
            var video = document.createElement('video');
            video.height = this.$option.height;
            video.width = this.$option.width;
            video.addEventListener("loadedmetadata", e=> this.onLoadedMeta(e));
            this.domElement = video;
            this._bitmapData = toBitmapData(video);
            return video;
        }

        protected onLoadedMeta(e:SystemEvent) {
            var video = <HTMLVideoElement>this.domElement;
            video.height = video.videoHeight;
            video.width = video.videoWidth;
            this.emitWith(MediaEvent.RESIZE);
        }
    }

    if(DEBUG){
        lark.$markReadOnly(Video.prototype,"bitmapData");
    }
}

lark.Video = lark.web.Video;