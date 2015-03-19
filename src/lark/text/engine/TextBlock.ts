

module lark.text {
    
    export class TextBlock extends HashObject {
        constructor(content:ContentElement = null) {
            super();
            this._content = content;
        }

        protected _content: ContentElement;
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
            var results: [CreateSpanResult[], CreateSpanResult[], CreateSpanResult[]] = [[], [], []];
            var firstSpan = true;
            var hasGraphic = false;
            while (currentWidth < width) {
                var result = content.$createSpan(width - currentWidth, firstSpan, start + currentLength);
                if (result.span == null)
                    break;
                if (textLine == null)
                    textLine = new TextLine();
                firstSpan = false;
                var span = result.span;

                currentWidth += span.width;
                currentLength += result.length;

                var h = span.height;
                maxHeight = Math.max(maxHeight, h);
                minHeight = Math.min(minHeight, h);

                var isGraphic = span instanceof GraphicElement;
                hasGraphic = hasGraphic || isGraphic;

                var arrayToInsert = results[1];
                if (isGraphic) {
                    if (result.format.float == TextFloat.LEFT)
                        arrayToInsert = results[0];
                    else if (result.format.float == TextFloat.LEFT)
                        arrayToInsert = results[2];
                }

                arrayToInsert.push(result);

                if (result.ended || result.full)
                    break;
            }

            if (textLine)
            {
                textLine.$setAtomCount(currentLength);
                textLine.$setTextBlockBeginIndex(start);

                var lefts = this.layoutLeftSpans(results[0], lineOffset, maxHeight);
                lineOffset = lefts.offset;
                var spans = lefts.spans;
                var middles = this.layoutMiddleSpans(results[1], lineOffset, maxHeight);
                lineOffset = middles.offset;
                spans = spans.concat(middles.spans);
                var rights = this.layoutRightSpans(results[2], lineOffset, maxHeight);
                spans = spans.concat(rights.spans);
                
                spans.forEach(span=> textLine.addChild(span));
            }
            return textLine;
        }

        protected layoutMiddleSpans(middles: CreateSpanResult[], offset: number, maxHeight: number): { spans: DisplayObject[]; offset: number }{
            var spans: DisplayObject[] = [];
            for (var i = 0; i < middles.length; i++) {
                var result = middles[i];
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
                span.x = offset;
                offset += span.width;
                spans.push(span);
            }
            return {
                spans: spans,
                offset: offset
            };
        }


        protected layoutLeftSpans(lefts: CreateSpanResult[], offset: number, maxHeight: number): { spans: DisplayObject[];offset:number} {
            var spans: DisplayObject[] = [];
            for (var i = 0; i < lefts.length; i++) {
                var result = lefts[i];
                var span = result.span;
                span.y = 0;
                span.x = offset;
                offset += span.width;
                spans.push(span);
            }
            return {
                spans: spans,
                offset:offset
            };
        }


        protected layoutRightSpans(rights: CreateSpanResult[], offset: number, maxHeight: number): { spans: DisplayObject[]; offset: number } {
            var spans: DisplayObject[] = [];
            for (var i = rights.length-1; i >=0; i--) {
                var result = rights[i];
                var span = result.span;
                span.y = 0;
                span.x = offset;
                offset += span.width;
                spans.push(span);
            }
            return {
                spans: spans,
                offset: offset
            };
        }


        createAllTextLines(width = 1000000, lineOffset = 0.0): text.TextLine[]{
            var line: text.TextLine = null;
            var lines: text.TextLine[] = []; 
            while (line = this.createTextLine(line, width, line == null ? lineOffset : 0)) {
                lines.push(line);
            }
            return lines;
        }
    }
}