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

        public $createSpan(width: number, isFirstSpan: boolean = false, startIndex: number = 0): CreateSpanResult {
            if (width <= 0 || startIndex < 0 || startIndex > this._text.length)
                throw new Error("TextElement:$createSpan arguments error");


            var format = this._elementFormat;
            var font = format.fontDescription;
            var fontString = format.toFontString();

            var textAtoms = this.split(this._text.substr(startIndex));
            var textLength = 0;
            var currentWidth = 0;
            for (var i = 0; i < textAtoms.length; i++) {
                var atom = textAtoms[i];
                var w = TextElement.measureText(atom, fontString);
                var testW = currentWidth + w;
                if (testW <= width || isFirstSpan) {
                    currentWidth = testW;
                    textLength += atom.length;
                    if (testW >= width)
                        break;
                }
                else {
                    break;
                }
            }

            var full = currentWidth >= width;


            var span: TextSpan = null;
            if (currentWidth > 0) {
                span = new TextSpan(this._text.substr(startIndex, textLength), font.toString(), Math.min(currentWidth, width), format.fontSize, format.color);
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

        static fontDic: IStringDic = {
            "Init": {}
        }
        static cache = {
            font:""
        }
        static measureText(text: string,font:string) {
            var width = 0.0;
            var ctx = TextElement.$bufferContext;
            if (font != TextElement.cache.font) {
                ctx.font = font;
                TextElement.cache.font = font;
            }
            var letterdic = TextElement.fontDic[font];
            if (letterdic == undefined) {
                letterdic = {};
                TextElement.fontDic[font] = letterdic
            }
            var length = text.length;
            for (var i = 0; i < length; i++) {
                var letter = text.charCodeAt(i);
                var w = letterdic[letter];
                if (w >= 0) {
                    width += w;
                    continue;
                }
                w = ctx.measureText(text.charAt(i)).width;
                letterdic[letter] = w;
                width += w;
            }
            return width;
        }
    }

    interface ILetterToWidth {
        [letter: number]: number
    }

    interface IStringDic {
        [key: string]: ILetterToWidth
    }
}