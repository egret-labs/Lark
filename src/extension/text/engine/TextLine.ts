

module lark.text {

    export class TextLine extends HashObject {
        constructor() {
            super();
        }

        protected _atomCount: number = 0;
        public get atomCount(): number {
            return this._atomCount;
        }

        public $setAtomCount(value: number) {
            this._atomCount = value;
        }

        protected _textBlockBeginIndex: number = 0;
        public get textBlockBeginIndex(): number {
            return this._textBlockBeginIndex;
        }
        public $setTextBlockBeginIndex(value: number) {
            this._textBlockBeginIndex = value;
        }

        public textHeight: number = 0;

        public leftOverflowAreas: Rectangle[] = null;
        public rightOverflowAreas: Rectangle[] = null;



        protected _x: number = 0;
        public get x() {
            return this._x;
        }
        public set x(value: number) {
            if (value == this._x)
                return;
            var offset = value - this._x;
            this.spans.forEach(span=> span.x += offset);
            this._x = value;
        }


        protected _y: number = 0;
        public get y() {
            return this._y;
        }
        public set y(value: number) {
            if (value == this._y)
                return;
            var offset = value - this._y;
            this.spans.forEach(span=> span.y += offset);
            this._y = value;
        }


        protected _width = 0;
        public set width(value: number) {
            if (value == this._width)
                return;
            this._width = value;
        }

        protected _height = 0;
        public set height(value: number) {
            if (value == this._height)
                return;
            this._height = value;
        }

        public spans: ISpan[] = [];
        public addChild(span: ISpan) {
            this.spans.push(span);
        }

        public removeChildren() {
            this.spans.length = 0;
        }
    }
}