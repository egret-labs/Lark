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

module lark {

    /**
     * TextField 类用于创建显示对象以显示和输入文本。 
     * 可以使用 TextField 类的方法和属性对文本字段进行操作。
     * Lark 提供了多种在运行时设置文本格式的方法。TextFormat 类允许您设置 TextField 对象的字符和段落格式。
     */
    export class TextField extends DisplayObject {
        /**
         * 创建一个TextField对象
         */
        public constructor(text:string,style?:ITextStyle) {
            super();
            this.$typeFlags = Types.TextField;
            this._text = text;
            this._style = TextField.$normalizeStyle(style, BaseStyle);
            this.$renderRegion = new player.Region();
            this.$setFlags(player.TextFieldFlags.LineDirty);
        }

        protected _text: string;
        public get text(): string {
            return this._text;
        }
        public set text(value: string) {
            if (value == this._text)
                return;
            this._text = value;
            this.$setFlags(player.TextFieldFlags.LineDirty);
            this.$invalidateContentBounds();
        }

        protected _style: ITextFieldStyle;
        public get style(): ITextFieldStyle {
            return this._style;
        }
        public set style(value: ITextFieldStyle) {
            value = TextField.$normalizeStyle(value, BaseStyle);
            this._style = value;
            this.$setFlags(player.TextFieldFlags.LineDirty);
            this.$invalidateContentBounds();
        }

        protected _multiline = true;

        /**
        * 设置或获取是否允许多行显示
        */
        public get multiline(): boolean {
            return this._multiline;
        }
        public set multiline(value: boolean) {
            if (value == this._multiline)
                return;
            this._multiline = value;
            this.$setFlags(player.TextFieldFlags.LineDirty);
            this.$invalidateContentBounds();
        }

        protected _explicitWidth: number = NaN;
        public get width(): number {
            return this.$hasFlags(player.TextFieldFlags.IsWidthSet) ? this._explicitWidth : super.$getWidth();
        }
        public set width(value: number) {
            if (value == this._explicitWidth)
                return;
            this._explicitWidth = +value || 0;
            this.$setFlags(player.TextFieldFlags.IsWidthSet | player.TextFieldFlags.LineDirty);
            this.$invalidateContentBounds();
        }

        protected _explicitHeight: number = NaN;
        public get height(): number {
            return this.$hasFlags(player.TextFieldFlags.IsHeightSet) ? this._explicitHeight : super.$getHeight();
        }
        public set height(value: number) {
            if (value == this._explicitHeight)
                return;
            this._explicitHeight = +value || 0;
            this.$setFlags(player.TextFieldFlags.IsHeightSet | player.TextFieldFlags.LineDirty);
            this.$invalidateContentBounds();
        }

        $setRenderLines(lines: TextSpan[]) {
            this.renderLines = lines;
            this.$removeFlags(player.TextFieldFlags.LineDirty);
            this.$invalidateContentBounds();
        }

        $measureContentBounds(bounds: Rectangle): void {
            if (this.$hasFlags(player.TextFieldFlags.LineDirty))
            {
                this.$updateLines();
                this.$removeFlags(player.TextFieldFlags.LineDirty)
            }
            var height = 0;
            var width = 0;
            var renderLines = this.renderLines;
            var length = renderLines.length;
            for (var i = 0; i < length; i++)
            {
                var line = renderLines[i];
                width = Math.max(width, line.width);
                if (i == length - 1)
                    height = line.y + line.height;
            }
            bounds.setTo(0, 0, width, height);
        }

        $render(context: player.RenderContext): void {
            var spans = this.renderLines;
            var length = spans.length;
            context.textAlign = "left";
            context.textBaseline = "middle";
            for (var i = 0; i < length; i++) {
                var span = spans[i];
                context.font = span.$toFontString(true);
                context.fillStyle = span.$toColorString();
                context.fillText(span.text, span.x, span.height / 2 + span.y, span.width);
            }
        }

        private textLines: Array<TextSpan> = [];
        private renderLines: Array<TextSpan> = [];

        $updateLines() {


            var width = this.$hasFlags(player.TextFieldFlags.IsWidthSet) ? this._explicitWidth : 10000;
            var height = this.$hasFlags(player.TextFieldFlags.IsHeightSet) ? this._explicitHeight : 10000;


            this.createLines(width);
            this.renderLines.length = 0;
            var lines = this.textLines, format = this._style;
            var lineHeight = Math.max(format.lineHeight, format.fontSize);



            var xRate: number = 0;
            if (format.align == "center") 
                xRate = 0.5;
            else if (format.align == "right") 
                xRate = 1;



            var y = 0;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line.y = y;
                line.x = (width - line.width) * xRate;
                y += lineHeight
                this.renderLines.push(line);
                if (this._multiline == false || y > height)
                    break;
            }
        }


        protected createLines(width: number) {
            var lines = this._text.split(LineBreaks);

            if (!this._multiline)
                lines = [lines.join(' ')];

            var spanArrays = lines.map(t=> this.createLineSpan(t, width));
            this.textLines = Array.prototype.concat.apply([], spanArrays);
        }

        protected createLineSpan(lineString: string,width:number): TextSpan[]{
            var textAtoms = lineString.split(SplitRegex);
            var currentWidth = 0;
            var style = this._style;
            var lines: TextSpan[] = [];
            var line = "";
            var lineHeight = Math.max(style.lineHeight, style.fontSize);
            for (var i = 0; i < textAtoms.length; i++) {
                var atom = textAtoms[i];
                var w = TextMeasurer.measureText(atom, this._style);
                var testW = currentWidth + w;
                if (testW < width) {
                    line += (line == "" ? trimLeft(atom) : atom);
                    currentWidth = testW;
                }
                else {
                    lines.push(new TextSpan(line, style, currentWidth, line.length,0,0));
                    line = trimLeft(atom);
                    currentWidth = w;
                }
            }
            lines.push(new TextSpan(line, style, currentWidth, line.length, 0, 0));
            return lines;
        }

        static $normalizeStyle(change: ITextFieldStyle,base:ITextFieldStyle = BaseStyle): ITextFieldStyle {
            var style: ITextStyle = {};
            for (var p in base) {
                if (base[p] !== undefined)
                    style[p] = base[p];
            }

            for (var p in change) {
                if (change[p] !== undefined)
                    style[p] = change[p];
            }

            return style;
        }
    }

    var BaseStyle: ITextStyle = {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: 14,
        color: 0x000000,
        bold: false,
        italic: false,
        float: "",
        align: Align.LEFT,
        lineHeight: 18,
        verticalAlign: Align.BOTTOM
    }

    var SplitRegex = /(?=[\u00BF-\u1FFF\u2C00-\uD7FF]|\b|\s)(?![。，！、》…）)}”】\.\,\!\?\]\:])/;
    var LineBreaks = /\r|\n/;

    function trimLeft(text: string) {
        for (var i = 0; i < text.length; i++)
            if (text.charAt(i) != " ")
                break;
        return text.substr(i);
    }
}