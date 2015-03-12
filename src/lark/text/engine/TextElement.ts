module lark.text {
    export class TextElement extends ContentElement {
        constructor(text: string = null, elementFormat: ElementFormat = null) {
            super();
            this._text = text;
            this._elementFormat = elementFormat;
        }


        static $bufferCanvas = (function () {
            var canvas = document.createElement("canvas");
            canvas.width = 200;
            canvas.height = 200;
            return canvas;
        })();

        static $bufferContext = TextElement.$bufferCanvas.getContext("2d");

        public get rawText(): string {
            return this._text;
        }


        protected _text: string = null;
        public get text(): string {
            return this._text;
        }


        public get length(): number {
            return this._text.length;
        }


        public replaceText(beginIndex: number, endIndex: number, newText: String): void {
            if (endIndex < beginIndex || beginIndex < 0 || beginIndex > this._text.length || endIndex < 0 || endIndex > this._text.length)
                throw new Error("TextElement.replaceText: beginIndex or endIndex is out of range");
            var left = this._text.substr(0, beginIndex),
                right = this._text.substr(endIndex);
            this._text = left + newText + right;
        }

        public $createSpan(width: number, isFirstSpan: boolean = false, startIndex: number = 0): CreateSpanResult {
            if (width <= 0 || startIndex < 0 || startIndex > this._text.length)
                throw new Error("TextElement:$createSpan arguments error");


            var format = this._elementFormat;
            var font = format.fontDescription;
            var fontString = format.toFontString();
            var ctx = TextElement.$bufferContext;
            ctx.font = fontString;


            var textLength = this._text.length;
            var currentWidth = 0;
            for (var i = startIndex; i < textLength && currentWidth < width; i++) {
                var char = this._text.charAt(i);
                var w = ctx.measureText(char).width;
                currentWidth += w;
            }

            var full = currentWidth >= width;

            //减去最后一个超出宽度的字符
            if (currentWidth > width) {
                currentWidth -= w;
                i--;
            }


            var span: TextSpan = null;
            if (currentWidth > 0) {
                span = new TextSpan(this._text.substring(startIndex, i), font.fontName, currentWidth, font.bold, font.italic, format.fontSize, format.color);
                span.width = currentWidth;
            } 
            return {
                span: span,
                length: i - startIndex,
                ended: i == textLength,
                full: full
            };
        }
    }
}