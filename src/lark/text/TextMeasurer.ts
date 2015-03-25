

module lark {
    var $TextMeasurerInstance: TextMeasurer = null,
        $TextWidthCache = {}
    export class TextMeasurer {
        public static getInstance(): TextMeasurer {
            if ($TextMeasurerInstance)
                return $TextMeasurerInstance;
            throw new Error("TextMeasurer.GetInstance:TextMeasurer has not been initialised");
        }

        public static setInstance(it: TextMeasurer) {
            $TextMeasurerInstance = it;
        }
        public static measureText(text: string, style: ITextStyle): number {
            var width = 0.0;
            var fontCache = $TextWidthCache;
            var font = style.toFontString(true);
            var cache: { [char: string]: number } = fontCache[font] || (fontCache[font] = {});
            
            $TextMeasurerInstance.setupFont(style);

            var length = text.length;
            for (var i = 0; i < length; i++) {
                var letter = text.charCodeAt(i);
                var w = cache[letter] || (cache[letter] = $TextMeasurerInstance.measureText(text.charAt(i)));
                width += w;
            }
            return width;
        }


        public setupFont(style: ITextStyle): void {

        }
        public measureText(text: string): number {
            return 0;
        }
    }

    export class CanvasTextMeasurer extends TextMeasurer {
        protected renderContext: player.CanvasContext;
        protected ctx: CanvasRenderingContext2D;
        public constructor(renderContext: player.CanvasContext,ctx:CanvasRenderingContext2D) {
            super();
            this.renderContext = renderContext;
            this.ctx = ctx;
        }

        public setupFont(style: ITextStyle): void {
            this.renderContext.setupFont(style);
        }
        public measureText(text: string): number {
            return this.ctx.measureText(text).width;
        }
    }
}