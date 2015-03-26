module lark.text {
    export class ContentElement extends HashObject {
        public constructor() {
            super();
        }

        protected _elementFormat: ITextStyle = null;

        public get elementFormat(): ITextStyle {
            return this._elementFormat;
        }

        public set elementFormat(value: ITextStyle) {
            if (this._elementFormat === value)
                return;
            this._elementFormat = value;
        }


        protected _groupElement: GroupElement = null;
        public get groupElement(): GroupElement {
            return this._groupElement;
        }

        public $setGroupElement(group: GroupElement) {
            if (group == this._groupElement)
                return;
            this._groupElement = group;
        }


        public get rawText(): string {
            return null;
        }


        public get text(): string {
            return null;
        }

        public get length(): number {
            return 0;
        }

        protected _textBlock: TextBlock = null;
        public get textBlock(): TextBlock {
            return null;
        }
        public $setTextBlock(value: TextBlock) {
            if (this._textBlock == value)
                return;
            this._textBlock = value;
        }

        public get textBlockBeginIndex(): number {
            return -1;
        }


        public userData: any = null;

        public $createSpan(width: number, isFirstSpan: boolean = false, startIndex: number = 0, format?:ITextStyle): CreateSpanResult {
            return null;
        }
    }

    export interface ISpan { width: number; height: number; x: number; y: number }

    export interface CreateSpanResult {
        span?: ISpan;
        length?: number;
        ended?: boolean;
        full?: boolean;
        format?: ITextStyle;
    }
}