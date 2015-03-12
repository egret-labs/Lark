

module lark.text {

    export class TextLine extends DisplayObjectContainer {
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
    }
}