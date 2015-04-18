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
                if (poster instanceof Texture)
                    this.$setDefaultTexture(poster);
                else
                    this.poster = poster;
            }

            this.on(Event.ENTER_FRAME, e=> this.$invalidate(), this);
        }


        protected texture:Texture;
        protected _poster:string;
        public get poster():string {
            return this._poster;
        }

        public set poster(value:string) {
            if (value == this._poster)
                return;
            this._poster = value;
            loadImage(value, t=> this.$setDefaultTexture(t));
        }


        protected _width:number = NaN;

        $getWidth():number {
            if (this.texture)
                return super.$getWidth();
            return this._width || 0;
        }

        $setWidth(value:number) {
            if (value == this._width)
                return;
            this._width = +value || 0;

            if (this.texture)
                super.$setWidth(value);
            else
                this.$invalidateContentBounds();
        }

        protected _height:number = NaN;

        $getHeight():number {
            if (this.texture)
                return super.$getHeight();
            return this._height || 0;
        }

        $setHeight(value:number) {
            if (value == this._height)
                return;
            this._height = value;
            if (this.texture)
                super.$setHeight(value);
            else
                this.$invalidateContentBounds();
        }

        $setDefaultTexture(texture:Texture, force:boolean = false) {
            if (this.texture != null && force == false)
                return;
            this.texture = texture;
            if (!this._height)
                this.height = texture.height;
            if (!this._width)
                this.width = texture.width;
            this.scaleX = this._width / texture.width;
            this.scaleY = this._height / texture.height;
            this.$invalidateContentBounds();
        }

        $measureContentBounds(bounds:Rectangle):void {
            if (this.texture)
                bounds.setTo(0, 0, this.texture.$bitmapWidth, this.texture.$bitmapHeight);
            else
                bounds.setTo(0, 0, this.width, this.height);

        }

        $render(renderer:player.IRenderer):void {
            var texture = this.texture;
            if (texture) {
                renderer.drawImage(texture, this.$stageMatrix, this.$stageAlpha);
            }
        }
    }
}