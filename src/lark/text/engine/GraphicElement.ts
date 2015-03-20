module lark.text {
    export class GraphicElement extends ContentElement {
        public constructor(graphic: DisplayObject = null, public elementWidth: number = 15.0, public elementHeight: number = 15.0, elementFormat: ElementFormat = TextFormat.$defaultTextFormat) {
            super();
            this._graphic = graphic;
            this._graphic.width = elementWidth;
            this._graphic.height = elementHeight;
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

        public $createSpan(width: number,isFirstSpan:boolean =false, startIndex: number = 0): CreateSpanResult {
            if (startIndex > 0)
                return {
                    ended: true,
                    full:false
                };

            var graphic = this._graphic;
            var span: DisplayObject = null;
            var end = true;
            if (isFirstSpan)
                span = graphic;
            else if (width >= this.elementWidth)
                span = graphic;
            else
                end = false;
            if (span) {
                span.width = this.elementWidth;
                span.height = this.elementHeight;
            }
            var full = span != null && this.elementWidth >= width;

            return {
                span: span,
                length: span == null ? 0 : 1,
                ended: end,
                full: full,
                format:this._elementFormat
            };
        }
    }
}