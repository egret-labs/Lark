module lark.text {
    export class GraphicElement extends ContentElement {
        public constructor(graphic: DisplayObject = null, elementWidth: number = 15.0, elementHeight: number = 15.0, elementFormat: ElementFormat = null) {
            super();
            this._graphic = graphic;
            this._elementHeight = elementHeight;
            this._elementWidth = elementWidth;
            this._elementFormat = elementFormat;
        }


        public get rawText(): string {
            return " ";
        }


        public get text(): string {
            return "";
        }

        public get length(): number {
            return 1;
        }

        protected _graphic: DisplayObject = null;
        public get graphic(): DisplayObject {
            return this._graphic;
        }

        public set graphic(value: DisplayObject) {
            if (value == this._graphic)
                return;
            this._graphic = value;
        }

        protected _elementWidth: number = NaN;
        
        public get elementWidth(): number {
            return this._elementWidth;
        }

        public set elementWidth(value: number) {
            if (this._elementWidth == value)
                return;
            this._elementWidth = value;
        }

        protected _elementHeight: number = NaN;
        public get elementHeight(): number {
            return this._elementHeight;
        }

        public set elementHeight(value: number) {
            if (this._elementHeight == value)
                return;
            this._elementHeight = value;
        }

        public $createSpan(width: number,isFirstSpan:boolean =false, startIndex: number = 0): CreateSpanResult {
            if (startIndex > 0)
                return {
                    ended: true,
                    full:false
                };


            var span: DisplayObject = null;
            var end = true;
            if (isFirstSpan)
                span = this._graphic;
            else if (width < this._graphic.width)
                span = this._graphic;
            else
                end = false;
            
            var full = span != null && span.width >= width;

            return {
                span: span,
                length: span == null ? 0 : 1,
                ended: end,
                full: full
            };
        }
    }
}