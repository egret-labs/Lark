

module lark.text {
    
    export class TextBlock extends HashObject {
        constructor() {
            super();
        }

        protected _content: ContentElement = null;
        public get content(): ContentElement {
            return this._content;
        }
        public set content(value: ContentElement) {
            if (this._content == value)
                return;
            this._content = value;
        }

        createTextLine(previousLine: TextLine = null, width = 1000000, lineOffset = 0.0, fitSomething: boolean = false): TextLine {


            var start = previousLine == null ? 0 : previousLine.atomCount + previousLine.textBlockBeginIndex;
            var content = this._content;


            var textLine:TextLine = null;
            var currentWidth = lineOffset;
            var currentLength = 0;


            while (currentWidth < width) {
                var result = content.$createSpan(width - currentWidth, previousLine == null, start + currentLength);

                if (result.span == null)
                    break;
                if (textLine == null)
                    textLine = new TextLine();
                var span = result.span;
                span.x = currentWidth;
                currentWidth += span.width;
                textLine.addChild(span);
                currentLength += result.length;

                if (result.ended || result.full)
                    break;
            }
            if (textLine)
            {
                textLine.$setAtomCount(currentLength);
                textLine.$setTextBlockBeginIndex(start);
            }
            return textLine;
        }
    }
}