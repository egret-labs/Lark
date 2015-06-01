//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module lark.sys {
    export const enum TextFieldValues {
        fontSize,           //30
        lineSpacing,        //0
        textColor,          //0x000000
        textFieldWidth,     //NONE
        textFieldHeight,    //NONE
        textWidth,          //0
        textHeight,         //0
        textDrawWidth       //0
    }
}

module lark {

    /**
     * TextField 类用于创建显示对象以显示文本。可以使用 TextField 类的方法和属性对文本字段进行操作。
     * 注意:TextField.width和TextField.height与其他显示对象的定义不同。
     * 其他显示对象的width，height属性始终等于getBounds(parent)方法返回的尺寸，即包含旋转和缩放值，若设置width或height也将会直接修改scaleX和scaleY的值。
     * 而 TextField 返回的宽高值并不包含旋转和缩放值，设置TextField.width和TextField.height也不会影响scaleX或scaleY的值。
     * 设置TextField.width可以强制让文本换行，若文本显示宽度超过您显式设置的值，将会自动换行。
     * 设置TextField.height可以截断文本，若文本显示高度超过您显式设置的值，将会截断不显示。
     * 若您需要重置文本宽高为未设置状态，请将宽高属性赋值为 lark.NONE 即可。
     */
    export class TextField extends DisplayObject {
        /**
         * 创建一个TextField对象
         */
        public constructor(text?:string) {
            super();
            this.$renderRegion = new sys.Region();
            this.$textFieldValues = new Float64Array([
                30,             //fontSize
                0,              //lineSpacing
                0x000000,       //textColor
                NONE,           //textFieldWidth
                NONE,           //textFieldHeight
                0,              //textWidth
                0,              //textHeight
                0               //textDrawWidth
            ]);
            this.$displayObjectFlags |= sys.TextFieldFlags.wordWrap |
                sys.TextFieldFlags.FontStringChanged;
            this.text = text;
        }

        $textFieldValues:Float64Array;

        private _fontFamily:string = "sans-serif";
        /**
         * 字体名称 。默认值：sans-serif
         */
        public get fontFamily():string {
            return this._fontFamily;
        }

        public set fontFamily(value:string) {
            if (this._fontFamily == value) {
                return;
            }
            this._fontFamily = value;
            this.invalidateFontString();
        }

        /**
         * 字号大小,默认值30 。
         */
        public get fontSize():number {
            return this.$textFieldValues[sys.TextFieldValues.fontSize];
        }

        public set fontSize(value:number) {
            value = +value || 0;
            var values = this.$textFieldValues;
            if (values[sys.TextFieldValues.fontSize] === value) {
                return;
            }
            values[sys.TextFieldValues.fontSize] = value;
            this.invalidateFontString();
        }

        /**
         * 是否显示为粗体，默认false。
         */
        public get bold():boolean {
            return this.$hasFlags(sys.TextFieldFlags.Bold);
        }

        public set bold(value:boolean) {
            value = !!value;
            if (value === this.$hasFlags(sys.TextFieldFlags.Bold)) {
                return;
            }
            this.$toggleFlags(sys.TextFieldFlags.Bold, value);
            this.invalidateFontString();
        }

        /**
         * 是否显示为斜体，默认false。
         */
        public get italic():boolean {
            return this.$hasFlags(sys.TextFieldFlags.Italic);
        }

        public set italic(value:boolean) {
            value = !!value;
            if (value === this.$hasFlags(sys.TextFieldFlags.Italic)) {
                return;
            }
            this.$toggleFlags(sys.TextFieldFlags.Italic, value);
            this.invalidateFontString();
        }

        private invalidateFontString():void {
            this.$setFlags(sys.TextFieldFlags.FontStringChanged);
            this.$invalidateContentBounds();
        }

        private fontString:string = "";

        /**
         * 获取字体信息的字符串形式。
         */
        private getFontString():string {
            if (this.$hasFlags(sys.TextFieldFlags.FontStringChanged)) {
                this.$removeFlags(sys.TextFieldFlags.FontStringChanged);
                this.fontString = sys.toFontString(this);
            }
            return this.fontString;
        }

        private _textAlign:string = HorizontalAlign.LEFT;
        /**
         * 文字的水平对齐方式 ,请使用HorizontalAlign中定义的常量。
         * 默认值：HorizontalAlign.LEFT。
         */
        public get textAlign():string {
            return this._textAlign;
        }

        public set textAlign(value:string) {
            if (this._textAlign == value) {
                return;
            }
            this._textAlign = value;
            this.$invalidateContentBounds();
        }

        private _verticalAlign:string = VerticalAlign.TOP;
        /**
         * 文字的垂直对齐方式 ,请使用VerticalAlign中定义的常量。
         * 默认值：VerticalAlign.TOP。
         */
        public get verticalAlign():string {
            return this._verticalAlign;
        }

        public set verticalAlign(value:string) {
            if (this._verticalAlign == value) {
                return;
            }
            this._verticalAlign = value;
            this.$invalidateContentBounds();
        }

        /**
         * 行间距。标准行高通常等于fontSize的值，设置此属性，将会在标准行高之间添加指定像素的空白间隔。可以设置为负值。默认值0.
         */
        public get lineSpacing():number {
            return this.$textFieldValues[sys.TextFieldValues.lineSpacing];
        }

        public set lineSpacing(value:number) {
            value = +value || 0;
            var values = this.$textFieldValues;
            if (values[sys.TextFieldValues.lineSpacing] === value)
                return;
            values[sys.TextFieldValues.lineSpacing] = value;
            this.$invalidateContentBounds();
        }

        private _colorString:string = "#000000";

        /**
         * 文本颜色，默认值0x000000
         */
        public get textColor():number {
            return this.$textFieldValues[sys.TextFieldValues.textColor];
        }

        public set textColor(value:number) {
            value = +value | 0;
            var values = this.$textFieldValues;
            if (values[sys.TextFieldValues.textColor] === value) {
                return;
            }
            values[sys.TextFieldValues.textColor] = value;
            this._colorString = sys.toColorString(value);
            this.$invalidate();
        }

        /**
         * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
         * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。默认值为 true。
         */
        public get wordWrap():boolean {
            return this.$hasFlags(sys.TextFieldFlags.wordWrap);
        }

        public set wordWrap(value:boolean) {
            value = !!value;
            if (value === this.$hasFlags(sys.TextFieldFlags.wordWrap)) {
                return;
            }
            this.$toggleFlags(sys.TextFieldFlags.wordWrap, value);
            this.$invalidateContentBounds();
        }

        private _text:string = "";
        /**
         * 要显示的文本内容
         */
        public get text():string {
            return this._text;
        }

        public set text(value:string) {
            value = (value || "") + "";
            if (value == this._text)
                return;
            this._text = value;
            this.$invalidateContentBounds();
        }

        /**
         * 文本行数。
         */
        public get numLines():number {
            return this.textLines.length;
        }

        /**
         * 文本内容宽度
         */
        public get textWidth():number {
            this.updateTextLines();
            return this.$textFieldValues[sys.TextFieldValues.textWidth];
        }

        /**
         * 文本内容高度
         */
        public get textHeight():number {
            this.updateTextLines();
            return this.$textFieldValues[sys.TextFieldValues.textHeight];
        }

        $getWidth():number {
            var w = this.$textFieldValues[sys.TextFieldValues.textFieldWidth];
            return isNone(w) ? this.$getContentBounds().width : w;
        }

        $setWidth(value:number) {
            value = +value || 0;
            var values = this.$textFieldValues;
            if (value < 0 || value === values[sys.TextFieldValues.textFieldWidth]) {
                return;
            }
            values[sys.TextFieldValues.textFieldWidth] = value;
            this.$invalidateContentBounds();
        }

        $getHeight():number {
            var h = this.$textFieldValues[sys.TextFieldValues.textFieldHeight];
            return isNone(h) ? this.$getContentBounds().height : h;
        }

        $setHeight(value:number) {
            value = +value || 0;
            var values = this.$textFieldValues;
            if (value < 0 || value === values[sys.TextFieldValues.textFieldHeight]) {
                return;
            }
            values[sys.TextFieldValues.textFieldHeight] = value;
            this.$invalidateContentBounds();
        }

        $invalidateContentBounds():void {
            super.$invalidateContentBounds();
            this.$setFlags(sys.TextFieldFlags.TextLinesChanged);
        }

        $measureContentBounds(bounds:Rectangle):void {
            this.updateTextLines();
            var values = this.$textFieldValues;
            var height:number;
            if (isNone(values[sys.TextFieldValues.textFieldHeight])) {
                height = values[sys.TextFieldValues.textHeight];
            }
            else {
                height = values[sys.TextFieldValues.textFieldHeight];
                var lineHeight = values[sys.TextFieldValues.fontSize] + 4;
                if (height < lineHeight) {
                    height = lineHeight;
                }
            }
            var width = isNone(values[sys.TextFieldValues.textFieldWidth]) ?
                values[sys.TextFieldValues.textWidth] : values[sys.TextFieldValues.textFieldWidth];
            if (width < values[sys.TextFieldValues.textDrawWidth]) {
                width = values[sys.TextFieldValues.textDrawWidth];
            }
            bounds.setTo(0, 0, width, height);
        }

        $render(context:sys.RenderContext):void {
            var lines = this.updateTextLines();
            if (!lines) {
                return;
            }
            var values = this.$textFieldValues;
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.font = this.getFontString();
            context.fillStyle = this._colorString;
            var length = lines.length;
            var lineHeight = values[sys.TextFieldValues.fontSize];
            var halfLineHeight = lineHeight * 0.5;
            var drawY = halfLineHeight + 2;
            var vGap = lineHeight + values[sys.TextFieldValues.lineSpacing];

            var textHeight = values[sys.TextFieldValues.textHeight];
            var hasHeightSet = !isNone(values[sys.TextFieldValues.textFieldHeight]);
            var explicitHeight = hasHeightSet ? values[sys.TextFieldValues.textFieldHeight] : Number.POSITIVE_INFINITY;
            if (hasHeightSet && textHeight < explicitHeight) {
                var vAlign = 0;
                if (this._verticalAlign == VerticalAlign.MIDDLE)
                    vAlign = 0.5;
                else if (this._verticalAlign == VerticalAlign.BOTTOM)
                    vAlign = 1;
                drawY += vAlign * (explicitHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var hAlign = 0;
            if (this._textAlign == HorizontalAlign.CENTER) {
                hAlign = 0.5;
            }
            else if (this._textAlign == HorizontalAlign.RIGHT) {
                hAlign = 1;
            }
            var measuredWidths = this.measuredWidths;
            var maxWidth:number;
            if (isNone(values[sys.TextFieldValues.textFieldWidth])) {
                maxWidth = values[sys.TextFieldValues.textWidth];
            }
            else {
                maxWidth = values[sys.TextFieldValues.textFieldWidth];
            }
            var maxYPos = explicitHeight - 2;
            for (var i = 0; i < length; i++) {
                var line = lines[i];
                var measureW = measuredWidths[i];
                var drawX = Math.round((maxWidth - measureW) * hAlign);
                if (drawX < 0) {
                    drawX = 0;
                }
                if (drawY + halfLineHeight <= maxYPos || i === 0) {
                    context.fillText(line, drawX, drawY);
                }
                drawY += vGap;
            }
        }

        private textLines:string[] = [];

        private measuredWidths:number[] = [];


        private updateTextLines():string[] {

            if (!this.$hasFlags(sys.TextFieldFlags.TextLinesChanged)) {
                return this.textLines;
            }

            this.$removeFlags(sys.TextFieldFlags.TextLinesChanged);
            this.textLines.length = 0;
            var values = this.$textFieldValues;
            var measuredWidths = this.measuredWidths;
            measuredWidths.length = 0;
            values[sys.TextFieldValues.textWidth] = 0;
            values[sys.TextFieldValues.textHeight] = 0;
            var textFieldWidth = values[sys.TextFieldValues.textFieldWidth];

            var text:string = this._text;
            if (!text || textFieldWidth === 0) {
                return null;
            }

            var hasWidthSet = !isNone(textFieldWidth);
            var font = this.getFontString();
            var lines = text.split(/(?:\r\n|\r|\n)/);
            var length = lines.length;
            var maxWidth = 0;
            var drawWidth = 0;
            var index:number;
            if (hasWidthSet && this.$hasFlags(sys.TextFieldFlags.wordWrap)) {
                for (var i = 0; i < length; i++) {
                    var line = lines[i];
                    var measureW = TextMeasurer.measureText(line, font);
                    if (measureW > textFieldWidth) {
                        var newLine = "";
                        var lineWidth = 0;
                        var words = line.split(/\b/);
                        var len = words.length;
                        for (var j = 0; j < len; j++) {
                            var word = words[j];
                            measureW = TextMeasurer.measureText(word, font);
                            if (lineWidth + measureW > textFieldWidth) {

                                if (lineWidth === 0) {
                                    index = getMaxIndex(word, textFieldWidth, font);
                                    words.splice(j + 1, 0, word.substring(index));
                                    word = word.substring(0, index);
                                    measureW = TextMeasurer.measureText(word, font);
                                    lines.splice(i, 0, word);
                                    measuredWidths[i] = measureW;
                                    len++;
                                    if (maxWidth < measureW) {
                                        maxWidth = measureW;
                                    }
                                    measureW = 0;
                                    word = "";
                                }
                                else {
                                    lines.splice(i, 0, newLine);
                                    measuredWidths[i] = lineWidth;
                                    if (maxWidth < lineWidth) {
                                        maxWidth = lineWidth;
                                    }
                                    newLine = "";
                                    lineWidth = 0;
                                    if (measureW > textFieldWidth) {
                                        measureW = 0;
                                        word = "";
                                        j--;
                                    }
                                }
                                i++;
                                length++;
                            }
                            lineWidth += measureW;
                            newLine += word;
                        }
                        lines[i] = newLine;
                        measuredWidths[i] = lineWidth;
                    }
                    else {
                        measuredWidths[i] = measureW;
                        if (maxWidth < measureW) {
                            maxWidth = measureW;
                        }
                    }
                }
                drawWidth = Math.max(drawWidth, maxWidth);
            }
            else {
                for (i = 0; i < length; i++) {
                    line = lines[i];
                    measureW = TextMeasurer.measureText(line, font);
                    if (hasWidthSet && measureW > textFieldWidth) {
                        index = getMaxIndex(line, textFieldWidth, font);
                        line = lines[i] = line.substring(0, index);
                        drawWidth = Math.max(drawWidth, TextMeasurer.measureText(line, font));
                    }
                    measuredWidths[i] = measureW;
                    if (maxWidth < measureW) {
                        maxWidth = measureW;
                    }
                }
            }
            values[sys.TextFieldValues.textDrawWidth] = drawWidth;
            values[sys.TextFieldValues.textWidth] = Math.ceil(maxWidth);
            //由于Canvas不提供文本行高测量功能，这里以字号为默认行高测量，并在顶部和底部各留2像素边距防止文本截断。
            values[sys.TextFieldValues.textHeight] = Math.ceil(lines.length * (values[sys.TextFieldValues.fontSize] +
                values[sys.TextFieldValues.lineSpacing]) - values[sys.TextFieldValues.lineSpacing] + 4);
            this.textLines = lines;
            return lines;
        }

    }

    /**
     * 返回不超过最大宽度的字符结束索引(不包括)。
     */
    function getMaxIndex(text:string, maxWidth:number, font:string):number {
        var lineWidth = 0;
        var length = text.length;
        var index:number;
        for (var i = 0; i < length; i++) {
            var word = text.charAt(i);
            var measureW = TextMeasurer.measureText(word, font);
            if (lineWidth + measureW > maxWidth) {
                index = i;
                break;
            }
            lineWidth += measureW;
        }
        return index == 0 ? 1 : index;
    }

    registerClass(TextField, Types.TextField);
}


module lark.sys {

    export function toFontString(style:{fontFamily?:string;fontSize?:number;bold?:boolean;italic?:boolean}):string {
        var font = "";
        if (style.italic)
            font += "italic ";
        if (style.bold)
            font += "bold ";
        font += (style.fontSize || 12) + "px ";
        font += (style.fontFamily || "sans-serif");
        return font;
    }

    export function toColorString(value:number):string {
        if (value < 0)
            value = 0;
        if (value > 16777215)
            value = 16777215;
        var color = value.toString(16).toUpperCase();
        while (color.length < 6) {
            color = "0" + color;
        }
        return "#" + color;
    }
}