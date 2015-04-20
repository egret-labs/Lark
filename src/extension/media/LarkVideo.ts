module lark {

    export interface IVideoSource extends IMediaSource {
        ogg?: string;
        h264?: string;
        webm?: string;
        vp9?: string;
        hls?: string;
    }

    export interface IVideoOption extends IMediaOption {
        sources?: IVideoSource;
    }

    export interface Video extends IMedia {
        poster: string;
    }
    export var Video:{ new (option:IVideoOption): Video };
    export class LarkVideoBase extends LarkMedia implements Video {
        constructor(option:IMediaOption) {
            super(option);
            this.$stageRegion = new player.Region();
            this._height = option.height || NaN;
            this._width = option.width || NaN;

            if (option.poster) {
                var poster:any = option.poster;
                if (typeof poster === "string")
                    this.poster = poster;
                else
                    this.$setDefaultBitmapData(poster);
            }

            this.on(Event.ENTER_FRAME, e=> this.$invalidate(), this);
        }


        protected bitmapData:BitmapData;
        protected _poster:string;
        public get poster():string {
            return this._poster;
        }

        public set poster(value:string) {
            if (value == this._poster)
                return;
            this._poster = value;
            loadImage(value, t=> this.$setDefaultBitmapData(t));
        }


        protected _width:number = NaN;

        $getWidth():number {
            if (this.bitmapData)
                return super.$getWidth();
            return this._width || 0;
        }

        $setWidth(value:number) {
            if (value == this._width)
                return;
            this._width = +value || 0;

            if (this.bitmapData)
                super.$setWidth(value);
            else
                this.$invalidateContentBounds();
        }

        protected _height:number = NaN;

        $getHeight():number {
            if (this.bitmapData)
                return super.$getHeight();
            return this._height || 0;
        }

        $setHeight(value:number) {
            if (value == this._height)
                return;
            this._height = value;
            if (this.bitmapData)
                super.$setHeight(value);
            else
                this.$invalidateContentBounds();
        }

        $setDefaultBitmapData(bitmapData:BitmapData, force:boolean = false) {
            if (this.bitmapData != null && force == false)
                return;
            this.bitmapData = bitmapData;
            if (!this._height)
                this.height = bitmapData.height;
            if (!this._width)
                this.width = bitmapData.width;
            this.scaleX = this._width / bitmapData.width;
            this.scaleY = this._height / bitmapData.height;
            this.$invalidateContentBounds();
        }

        $measureContentBounds(bounds:Rectangle):void {
            if (this.bitmapData)
                bounds.setTo(0, 0, this.bitmapData.width, this.bitmapData.height);
            else
                bounds.setTo(0, 0, this.width, this.height);

        }

        $render(context:player.RenderContext):void {
            var bitmapData = this.bitmapData;
            if (bitmapData) {
                context.drawImage(bitmapData,0,0);
            }
        }
    }
}