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

    const enum Values {
        fontSize,           //30
        lineSpacing,        //0
        textColor,          //0x000000
        textFieldWidth,     //NONE
        textFieldHeight,    //NONE
        textWidth,          //0
        textHeight          //0
    }


    export type RichTextNode = string | DisplayObject | IRTFStringNode | IRTFDisplayObjectNode;

    export interface IRTFNode {
        style?: ITextStyle;
    }


    export interface IRTFStringNode extends IRTFNode {
        text?: string;
    }

    export interface IRTFDisplayObjectNode extends IRTFNode {
        object?: DisplayObject;
    }


    /**
     * RichTextField 类用于显示带有复杂格式的文本和显示对象。
     * Lark 提供了多种在运行时设置文本格式的方法。ITextFieldStyle 允许您设置 RichTextField 对象的字符和段落格式。
     *
     */
    export class RichTextField extends Sprite {

        /**
         * 创建一个RichTextField对象
         */
        public constructor(style?:ITextStyle) {
            super();
            this.$renderRegion = new sys.Region();
            var styleWrapper = new RichTextFieldStyleWarpper();
            styleWrapper.currentStyle = {};
            this._styleWrapper = styleWrapper;
            this.style = style;
            this.$textFieldValues = {
                0: 30,             //fontSize
                1: 0,              //lineSpacing
                2: 0x000000,       //textColor
                3: NONE,           //textFieldWidth
                4: NONE,           //textFieldHeight
                5: 0,              //textWidth
                6: 0               //textHeight
            };
            this.$invalidateContentBounds();
        }

        $textFieldValues:Object;

        protected _lineDirty = true;


        protected _style:RichTextFieldStyle;
        protected _styleWrapper:RichTextFieldStyleWarpper;

        /**
         *  设置或获取 RichTextField 默认的文本格式
         */
        public get style():ITextStyle {
            return this._style;
        }

        public set style(value:ITextStyle) {
            this._style = value || {};
            this._styleWrapper.baseStyle = this._style;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }


        protected _nodes:RichTextNode[];

        /**
         *  设置或获取要在 RichTextField 中显示的多样式文本或显示对象
         */
        public get nodes():RichTextNode[] {
            return this._nodes;
        }

        public set nodes(value:RichTextNode[]) {
            this._nodes = value;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }


        /**
         * 字体名称 。默认值：sans-serif
         */
        public get fontFamily():string {
            return this._styleWrapper.fontFamily;
        }

        public set fontFamily(value:string) {
            if (this._styleWrapper.fontFamily == value) {
                return;
            }
            this._style.fontFamily = value;
            this.fontStringChanged = true;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }

        /**
         * 字号大小,默认值30 。
         */
        public get fontSize():number {
            return this._styleWrapper.fontSize;
        }

        public set fontSize(value:number) {
            value = +value || 0;
            if (this._styleWrapper.fontSize == value) {
                return;
            }
            this._style.fontSize = value;
            this.fontStringChanged = true;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }


        /**
         * 是否显示为粗体，默认false。
         */
        public get bold():boolean {
            return this._styleWrapper.bold;
        }

        public set bold(value:boolean) {
            value = !!value;
            if (this._styleWrapper.bold == value) {
                return;
            }
            this._style.bold = value;
            this.fontStringChanged = true;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }

        /**
         * 是否显示为斜体，默认false。
         */
        public get italic():boolean {
            return this._styleWrapper.italic;
        }

        public set italic(value:boolean) {
            value = !!value;
            if (this._styleWrapper.italic == value) {
                return;
            }
            this._style.italic = value;
            this.fontStringChanged = true;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }

        private fontString:string = "";
        private fontStringChanged:boolean = true;

        /**
         * 获取字体信息的字符串形式。
         */
        private getFontString():string {
            if (this.fontStringChanged) {
                this.fontStringChanged = false;
                this.fontString = sys.toFontString(this);
            }
            return this.fontString;
        }

        private _textAlignH:string = HorizontalAlign.LEFT;
        /**
         * 文字的水平对齐方式 ,请使用HorizontalAlign中定义的常量。
         * 默认值：HorizontalAlign.LEFT。
         */
        public get textAlignH():string {
            return this._styleWrapper.textAlignH;
        }

        public set textAlignH(value:string) {
            if (this._styleWrapper.textAlignH == value) {
                return;
            }
            this._style.textAlignH = value;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }

        /**
         * 文字的垂直对齐方式 ,请使用VerticalAlign中定义的常量。
         * 默认值：VerticalAlign.TOP。
         */
        public get textAlignV():string {
            return this._styleWrapper.textAlignV;
        }

        public set textAlignV(value:string) {
            if (this._styleWrapper.textAlignV == value) {
                return;
            }
            this._style.textAlignV = value;
            this._lineDirty = true;
            this.$invalidateContentBounds();
        }

        /**
         * 行间距
         */
        public get lineSpacing():number {
            return this._styleWrapper.lineSpacing;
        }

        public set lineSpacing(value:number) {
            value = +value || 0;
            if (this._styleWrapper.lineSpacing === value)
                return;
            this._style.lineSpacing = value;
            this.$invalidateContentBounds();
        }

        private _colorString:string = "#000000";

        /**
         * 文本颜色，默认值0x000000
         */
        public get textColor():number {
            return this._styleWrapper.textColor;
        }

        public set textColor(value:number) {
            value = +value | 0;
            if (this._styleWrapper.textColor === value) {
                return;
            }
            this._style.textColor = value;
            this._colorString = sys.toColorString(value);
            this.$invalidate();
        }


        protected _scrollV:number = 0;
        protected _scrollVDirty:boolean = true;

        /**
         *  设置或获取 RichTextField 的垂直滚动位置，以行为单位
         */
        public get scrollV():number {
            return this._scrollV;
        }

        public set scrollV(value:number) {
            if (this._scrollV == value)
                return;
            this._scrollV = value;
            this._scrollVDirty = true;
            this.$invalidateContentBounds();
        }


        $getWidth():number {
            return this.$getContentBounds().width;
        }

        $setWidth(value:number) {
            value = +value || 0;
            var values = this.$textFieldValues;
            if (value < 0 || value === values[Values.textFieldWidth]) {
                return;
            }
            values[Values.textFieldWidth] = value;
            this.$invalidateContentBounds();
        }

        $getHeight():number {
            return this.$getContentBounds().height;
        }

        $setHeight(value:number) {
            value = +value || 0;
            var values = this.$textFieldValues;
            if (value < 0 || value === values[Values.textFieldHeight]) {
                return;
            }
            values[Values.textFieldHeight] = value;
            this.$invalidateContentBounds();
        }

        $invalidateContentBounds():void {
            super.$invalidateContentBounds();
            this._lineDirty = true;
        }

        $measureContentBounds(bounds:Rectangle):void {

            if (this._lineDirty) {
                this.$generateTextLines();
                this._lineDirty = false;
            }
            if (this._scrollVDirty) {
                this.$updateChildren();
                this._scrollVDirty = false;
            }

            var values = this.$textFieldValues;
            bounds.setTo(0, 0, values[Values.textWidth], values[Values.textHeight]);
        }


        protected _contents:text.ContentElement[];
        protected _textLines:Array<text.TextLine> = [];
        protected _stringLines:Array<TextSpan> = [];

        $render(context:sys.RenderContext):void {

            if (this._lineDirty) {
                this.$generateTextLines();
                this._lineDirty = false;
            }
            if (this._scrollVDirty) {
                this.$updateChildren();
                this._scrollVDirty = false;
            }

            var lines = this._stringLines;
            if (!lines) {
                return;
            }


            context.textAlign = "left";
            context.textBaseline = "middle";

            for (var i = 0; i < lines.length; i++) {
                var span = lines[i];
                var fontString = span.style.fontString || (span.style.fontString = sys.toFontString(span.style));
                var colorString = span.style.colorString || (span.style.colorString = sys.toColorString(span.style.textColor));
                context.font = fontString;
                context.fillStyle = this._colorString;
                context.fillText(span.text, span.x, span.y - span.height / 2, span.width);
            }
        }

        protected $generateTextLines() {
            this._textLines.length = 0;
            this.parseContents();
            var contents = this._contents;
            var values = this.$textFieldValues;

            var format = this._styleWrapper;
            var textBlock = new text.TextBlock();


            var y = format.lineSpacing;
            var x = format.leftMargin || 0;
            var lm = format.leftMargin || 0,
                rm = format.rightMargin || 0,
                bidt = format.blockIndent || 0;

            var maxWidth:number;
            if (isNone(values[Values.textFieldWidth])) {
                maxWidth = this.stage ? this.stage.stageWidth : 500;
            }
            else {
                maxWidth = values[Values.textFieldWidth];
            }

            var width = maxWidth - lm - rm - bidt;


            for (var i = 0; i < contents.length; i++) {
                var content = contents[i];
                x = lm + bidt;
                textBlock.content = content;
                var lines = textBlock.createAllTextLines(width, format);
                this._textLines = this._textLines.concat(lines);
            }

            this.$updateChildren();
        }

        protected $updateChildren() {

            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                child.visible = false;
            }

            var stringLines = this._stringLines;
            var lines = this._textLines;
            lines.length = 0;
            var y = 0;
            var values = this.$textFieldValues;

            var maxHeight = isNone(values[Values.textFieldHeight]) ? Number.POSITIVE_INFINITY : values[Values.textFieldHeight];

            for (var i = this._scrollV; i < lines.length; i++) {
                var line = lines[i];
                line.y = y;
                line.spans.forEach(span=> {
                    if (span instanceof TextSpan)
                        stringLines.push(span)
                    else if (span instanceof DisplayObject)
                        span.visible = true;
                });

                y += lines[i].textHeight + this._style.lineSpacing;
                if (y > maxHeight)
                    break;
            }
        }


        protected parseContents() {
            if (!this._lineDirty)
                return;
            var contents:text.ContentElement[] = [];
            var nodes = this._nodes, length = this._nodes.length;
            for (var i = 0; i < length; i++) {
                var node:any = nodes[i];
                var element:text.ContentElement = null;
                if ((<string>node).charAt) {
                    element = this.parseString(node);
                }
                else if (node instanceof DisplayObject) {
                    element = this.parseGraphic(node);
                }
                else if ((<IRTFDisplayObjectNode>node).object) {
                    element = this.parseGraphic((<IRTFDisplayObjectNode>node).object, (<IRTFDisplayObjectNode>node).style);
                }
                else if ((<IRTFStringNode>node).text) {
                    element = this.parseTextNode(node);
                }
                if (element)
                    contents.push(element);
            }
            this._contents = [new text.GroupElement(contents)];
        }

        protected parseGraphic(node:DisplayObject, style?:ITextStyle) {

            node.visible = false;
            this.addChild(node);

            var styleWrapper = this._styleWrapper;
            styleWrapper.currentStyle = style || {};
            var graphicElement = new text.GraphicElement(node, node.width, node.height, styleWrapper);
            return graphicElement;

        }

        protected parseString(node:string) {
            return this.parseTextNode({text: node});
        }

        protected parseTextNode(node:IRTFStringNode) {
            var styleWrapper = this._styleWrapper;
            styleWrapper.currentStyle = node.style || {};
            var textElement = new text.TextElement(node.text, styleWrapper);
            return textElement;
        }
    }
    /**
     * 定义多样式文本的样式
     */
    export interface RichTextFieldStyle extends ITextStyle {

        /**
         * 设置段落中文本的水平对齐方式
         */
        textAlignH?: string;

        /**
         * 表示块缩进，以像素为单位。
         */
        blockIndent?: number;

        /**
         * 表示从左边距到段落中第一个字符的缩进。
         */
        indent?: number;

        /**
         * 段落的左边距，以像素为单位。
         */
        leftMargin?: number;

        /**
         * 段落的右边距，以像素为单位。
         */
        rightMargin?: number;

        /**
         * 行的前间距
         */
        lineSpacing?: number;

    }


    function hasFlag(prop:number, flag:number):boolean {
        return (prop & flag) == flag;
    }

    class RichTextFieldStyleWarpper extends TextStyleWarpper<RichTextFieldStyle> implements RichTextFieldStyle {

        /**
         * 设置段落中文本的水平对齐方式
         */

        get textAlignH() {
            return this.currentStyle.textAlignH || this.baseStyle.textAlignH || HorizontalAlign.LEFT;
        }

        /**
         * 表示块缩进，以像素为单位。
         */
        get blockIndent() {
            return this.currentStyle.blockIndent || this.baseStyle.blockIndent || 0;
        }

        /**
         * 表示从左边距到段落中第一个字符的缩进。
         */
        get indent() {
            return this.currentStyle.indent || this.baseStyle.indent || 0;
        }

        /**
         * 段落的左边距，以像素为单位。
         */
        get leftMargin() {
            return this.currentStyle.leftMargin || this.baseStyle.leftMargin || 0;
        }

        /**
         * 段落的右边距，以像素为单位。
         */
        get rightMargin() {
            return this.currentStyle.rightMargin || this.baseStyle.rightMargin || 0;
        }

        /**
         * 行的前间距
         */
        get lineSpacing() {
            return this.currentStyle.lineSpacing || this.baseStyle.lineSpacing || 10;
        }
    }
}