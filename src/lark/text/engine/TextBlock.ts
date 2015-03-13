

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
            var maxHeight = 0;
            var minHeight = 10000;
            var results:CreateSpanResult[] = []
            while (currentWidth < width) {
                var result = content.$createSpan(width - currentWidth, previousLine == null, start + currentLength);

                if (result.span == null)
                    break;
                if (textLine == null)
                    textLine = new TextLine();
                var span = result.span;
                span.x = currentWidth;
                currentWidth += span.width;
                results.push(result);
                currentLength += result.length;
                var h = span.height;
                maxHeight = Math.max(maxHeight, h);
                minHeight = Math.min(minHeight, h);
                if (result.ended || result.full)
                    break;
            }
            if (textLine)
            {
                textLine.$setAtomCount(currentLength);
                textLine.$setTextBlockBeginIndex(start);

                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var span = result.span;
                    switch (result.format.verticalAlign) {
                        case VerticalAlign.BOTTOM: {
                            span.y = maxHeight - span.height;
                            break;
                        }
                        case VerticalAlign.MIDDLE: {
                            span.y = (maxHeight - span.height) / 2;
                            break;
                        }
                        case VerticalAlign.TOP: {
                            span.y = 0;
                            break;
                        }
                    }
                    textLine.addChild(span);
                }
            }
            return textLine;
        }
    }
}