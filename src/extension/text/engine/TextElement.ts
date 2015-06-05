module lark.text {
    export class TextElement extends ContentElement {
        constructor(text: string = null, elementFormat: ITextStyle = {}) {
            super();
            this._text = text;
            this._elementFormat = elementFormat;
        }


        protected _text: string = null;
        public get text(): string {
            return this._text;
        }
        public set text(value: string) {
            if (this._text == value)
                return;
            this._text = value;
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

        public $createSpan(width: number, isFirstSpan: boolean = false, startIndex: number = 0, superformat?: ITextStyle): CreateSpanResult {
            if (width <= 0 || startIndex < 0 || startIndex > this._text.length)
                throw new Error("TextElement:$createSpan arguments error");


            var format = this._elementFormat;
            

            var textAtoms = this.split(this._text.substr(startIndex));
            var textLength = 0;
            var currentWidth = 0;
            var full = false;
            for (var i = 0; i < textAtoms.length; i++) {
                var atom = textAtoms[i];
                var w = TextMeasurer.measureText(atom, TextElement.toFontString(format));
                var testW = currentWidth + w;
                if (testW <= width || isFirstSpan) {
                    currentWidth = testW;
                    textLength += atom.length;
                    if (testW >= width)
                        break;
                    if (atom.indexOf("\n") >= 0)
                    {
                        full = true;
                        break;
                    }
                }
                else {
                    break;
                }
                isFirstSpan = false;
            }

            full = full || currentWidth >= width;


            var span: TextSpan = null;
            if (currentWidth > 0) {
                span = new TextSpan(this._text.substr(startIndex, textLength), format, currentWidth,textLength,0,0);
            } 
            return {
                span: span,
                length: textLength,
                ended: startIndex + textLength == this._text.length,
                full: full,
                format:format
            };
        }
        static splitRegex = /(?=[\u00BF-\u1FFF\u2C00-\uD7FF]|\b)(?![。，！、》…）)}”】\.\,\!\?\]])/;
        protected split(text:string) {
            return text.split(TextElement.splitRegex);
        }


        static toFontString(style: ITextStyle) {
            var font = "";
            if (style.italic)
                font += "italic ";
            if (style.bold)
                font += "bold ";
            font += style.fontSize + "px ";
            font += style.fontFamily;
            return font;
        }
    }

}