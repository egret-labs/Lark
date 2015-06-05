module lark.text {
    export class ContentElement extends LarkObject {
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

        public get text(): string {
            return null;
        }

        public get length(): number {
            return 0;
        }

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