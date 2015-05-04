

module lark.text {
    
    export class TextBlock extends LarkObject {
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

        createTextLine(previousLine: TextLine = null, width = 1000000, lineOffset = 0.0, format?: RichTextFieldStyle): TextLine {


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
                var result = content.$createSpan(width - currentWidth, firstSpan, start + currentLength,format);
                if (result.span == null)
                    break;
                if (textLine == null)
                    textLine = new TextLine();
                firstSpan = false;
                var span = result.span;

                currentWidth += span.width;
                currentLength += result.length;


                var isGraphic = !(span instanceof TextSpan);
                hasGraphic = hasGraphic || isGraphic;

                var arrayToInsert = results[1];
                if (isGraphic) {
                    if (result.format.float == HorizontalAlign.LEFT)
                        arrayToInsert = results[0];
                    else if (result.format.float == HorizontalAlign.NONE)
                        arrayToInsert = results[2];
                }

                arrayToInsert.push(result);

                if (!isGraphic || !result.format.float) {
                    var h = span.height;
                    maxHeight = Math.max(maxHeight, h);
                    minHeight = Math.min(minHeight, h);
                }

                if (result.ended || result.full)
                    break;
            }

            if (textLine)
            {
                textLine.$setAtomCount(currentLength);
                textLine.$setTextBlockBeginIndex(start);
                var offset = lineOffset;
                var lefts = this.layoutLeftSpans(results[0], offset, maxHeight);
                offset = lefts.offset;
                var spans = lefts.spans;

                var rights = this.layoutRightSpans(results[2], width, maxHeight);
                spans = spans.concat(rights.spans);
                var endxForMiddle = rights.offset;

                var middles = this.layoutMiddleSpans(results[1], format.textAlignH, offset, endxForMiddle, maxHeight);
                offset = middles.offset;
                spans = spans.concat(middles.spans);
                
                spans.forEach(span=> textLine.addChild(span));
                

                if (lefts.spans.length) {
                    textLine.leftOverflowAreas = lefts.spans.map(s=> new Rectangle(s.x, 0, s.width, s.height));
                }
                if (rights.spans.length) {
                    textLine.rightOverflowAreas = rights.spans.map(s=> new Rectangle(s.x, 0, s.width, s.height));
                }
                textLine.textHeight = maxHeight;
            }
            return textLine;
        }

        protected layoutMiddleSpans(middles: CreateSpanResult[], align: string, startx: number, endx: number, maxHeight: number): { spans: ISpan[]; offset: number }{
            var spans: ISpan[] = [];
            var offset = startx;
            var xRate: number = 0;
            if (align == "center")
                xRate = 0.5;
            else if (align == "right")
                xRate = 1;


            for (var i = 0; i < middles.length; i++) {
                var result = middles[i];
                var span = result.span;
                switch (result.format.textAlignV) {
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

            var offsetx = (endx - offset) * xRate;
            offsetx && spans.forEach(s=> s.x += offsetx);

            return {
                spans: spans,
                offset: offset
            };
        }


        protected layoutLeftSpans(lefts: CreateSpanResult[], offset: number, maxHeight: number): { spans: ISpan[];offset:number} {
            var spans: ISpan[] = [];
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


        protected layoutRightSpans(rights: CreateSpanResult[], width: number, maxHeight: number): { spans: ISpan[]; offset: number } {
            var spans: ISpan[] = [];
            for (var i = 0; i < rights.length; i++) {
                var result = rights[i];
                var span = result.span;
                span.y = 0;
                span.x = width - span.width;
                width -= span.width;
                spans.push(span);
            }
            return {
                spans: spans,
                offset: width
            };
        }


        createAllTextLines(width = 1000000, format?:RichTextFieldStyle): text.TextLine[]{
            var line: text.TextLine = null;
            var lines: text.TextLine[] = [];
            var leftBlockAreas: Rectangle[] = [];
            var rightBlockAreas: Rectangle[] = [];
            var offset = format.indent || 0;
            var rightOffset = width
            var leading = format.lineSpacing || 0;
            var y = leading;



            while (true) {
                line = this.createTextLine(line, rightOffset, offset,format);
                if (!line)
                    break;
                line.y = y;
                if (line.leftOverflowAreas) {
                    line.leftOverflowAreas.forEach(a=>a.y = y);
                    leftBlockAreas = leftBlockAreas.concat(line.leftOverflowAreas);
                }
                if (line.rightOverflowAreas) {
                    line.rightOverflowAreas.forEach(a=> a.y = y);
                    rightBlockAreas = rightBlockAreas.concat(line.rightOverflowAreas);
                }
                y += line.textHeight + leading;
                lines.push(line);
                offset = this.getLineOffset(leftBlockAreas, y, leading + format.fontSize);
                rightOffset = this.getRightLineOffset(rightBlockAreas, width, y, leading + format.fontSize);
            }
            return lines;
        }

        getLineOffset(areas: Rectangle[], y:number,height:number):number {
            var maxX = 0;
            for (var i = 0; i < areas.length; i++) {
                var area = areas[i];
                if (area.y >= y + height || area.bottom <= y)
                    continue;
                maxX = Math.max(maxX, area.right);
            }
            return maxX;
        }
        getRightLineOffset(areas: Rectangle[], width:number,y: number, height: number): number {
            var minX = width;
            for (var i = 0; i < areas.length; i++) {
                var area = areas[i];
                if (area.y >= y + height || area.bottom <= y)
                    continue;
                minX = Math.min(minX, area.left);
            }
            return minX;
        }
    }
}