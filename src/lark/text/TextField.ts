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

    import TextBlock = text.TextBlock;

    export enum TextFieldFlags {
        None = 0x000000,
        TextDirty = 0x000001,
        FormatDirty = 0x000002,
        MultilineDirty = 0x000004,
        WordWrapDirty = 0x000008,
        ScrollVDirty = 0x000010,
        RichNodeDirty = 0x000010,
        LineDirty = TextDirty | FormatDirty | MultilineDirty | WordWrapDirty | RichNodeDirty,
        Dirty = LineDirty | ScrollVDirty
    }


    /**
     * TextFormat 类描述字符格式设置信息。使用 TextFormat 类可以为文本字段创建特定的文本格式。
     * 您可以将文本格式应用于静态文本字段和动态文本字段。
     * 
     */
    export interface ITextFieldStyle extends ITextStyle {

        /**
         * 表示段落的对齐方式。
         */
        align?: string;


        /**
         * 表示块缩进，以像素为单位。
         */
        blockIndent?: number;


        /**
         * 表示从左边距到段落中第一个字符的缩进。
         */
        indent?: number;



        /**
         * 一个整数，表示行与行之间的垂直间距（称为前导）量。
         */
        leading?: number;


        /**
         * 段落的左边距，以像素为单位。
         */
        leftMargin?: number;


        /**
         * 段落的右边距，以像素为单位。
         */
        rightMargin?: number;



        /**
         * 表示显示超链接的目标窗口。
         */
        target?: string;
        

        /**
         * 表示使用此文本格式的文本的目标 URL。
         */
        url?: string;

    }

    

    var BaseStyle: ITextFieldStyle = {
        fontFamily: "sans-serif",
        fontSize: 12,
        color: 0x000000,
        bold: false,
        italic: false,
        float: TextFloat.NONE,
        leftMargin: 0,
        rightMargin: 0,
        blockIndent: 0,
        align: "left",
        indent: 0,
        leading: 0,
        verticalAlign: VerticalAlign.BOTTOM
    }

    export function hasFlag(prop:number, flag:number):boolean{
        return (prop & flag) == flag;
    }

    /**
     * TextField 类用于创建显示对象以显示和输入文本。 
     * 可以使用 TextField 类的方法和属性对文本字段进行操作。
     * Lark 提供了多种在运行时设置文本格式的方法。TextFormat 类允许您设置 TextField 对象的字符和段落格式。
     * 
     */
    export class TextField extends DisplayObjectContainer {
        /**
         * 创建一个TextField对象
         */
        public constructor(text:string,format?:ITextFieldStyle) {
            super();
            this._text = text;
            this._format = this.normalizeStyle(format,BaseStyle);
            this.$invalidateContentBounds();
            
            this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, this);
            //this.stage.invalidate();
        }


        protected _textFieldFlags: number = TextFieldFlags.Dirty;

        $setTextFieldFlags(flags: TextFieldFlags) {
            this._textFieldFlags |= flags;
        }

        protected _text: string;
        public get text(): string {
            return this._text;
        }
        public set text(value: string) {
            if (value == this._text)
                return;
            this._text = value;
            this.$setTextFieldFlags(TextFieldFlags.TextDirty);
        }

        protected _format: ITextFieldStyle;
        public get format(): ITextFieldStyle {
            return this._format;
        }
        public set format(value: ITextFieldStyle) {
            value = this.normalizeStyle(value, BaseStyle);
            this._format = value;
            this.$setTextFieldFlags(TextFieldFlags.FormatDirty);
        }

        protected _multiline = false;
        public get multiline(): boolean {
            return this._multiline;
        }
        public set multiline(value: boolean) {
            if (value == this._multiline)
                return;
            this._multiline = value;
            this.$setTextFieldFlags(TextFieldFlags.MultilineDirty);
        }
        
        protected _wordWrap = false;
        public get wordWrap(): boolean {
            return this._wordWrap;
        }
        public set wordWrap(value: boolean) {
            if (value == this._wordWrap)
                return;
            this._wordWrap = value;
            this.$setTextFieldFlags(TextFieldFlags.WordWrapDirty);
        }

        protected _width:number = NaN;
        public get width(): number {
            return this._width || this.$getTransformedBounds(this.$parent, Rectangle.TEMP).width;
        }
        public set width(value: number) {
            if (value == this._width)
                return;
            this._width = value;
            this.$setTextFieldFlags(TextFieldFlags.Dirty);
        }

        protected _height: number = NaN;
        public get height(): number {
            return this._height || this.$getTransformedBounds(this.$parent, Rectangle.TEMP).height;
        }
        public set height(value: number) {
            if (value == this._height)
                return;
            this._height = value;
            this.$setTextFieldFlags(TextFieldFlags.Dirty);
        }

        protected _scrollV: number = 0;
        public get scrollV(): number {
            return this._scrollV;
        }
        public set scrollV(value: number) {
            if (this._scrollV == value)
                return;
            this._scrollV = value;
            this.$setTextFieldFlags(TextFieldFlags.ScrollVDirty);
        }

        private onEnterFrame() {
                if ((this._textFieldFlags & TextFieldFlags.LineDirty) != 0)
                    this.$createLines();
                if ((this._textFieldFlags & TextFieldFlags.ScrollVDirty) == TextFieldFlags.ScrollVDirty)
                    this.$updateChildren();
            }

        static LineBreaks = /\r|\n/;
        private _textLines: Array<text.TextLine> = []; 
        $createLines() {
            this._textLines.length = 0;
            this._makeContents();
            var contents = this._contents;


            var wrap = this._wordWrap && this._multiline;
            var format = this._format;
            var textBlock = new text.TextBlock();


            var y = format.leading||0;
            var x = format.leftMargin || 0;
            var lm = format.leftMargin || 0,
                rm = format.rightMargin || 0,
                bidt = format.blockIndent || 0;

            var w = (this._width||10000) - lm - rm - bidt;
            if (wrap == false)
                w = 100000;


            for (var i = 0; i < contents.length; i++) {
                var content = contents[i];
                x = lm + bidt;
                textBlock.content = content;
                var lines = textBlock.createAllTextLines(w, format);
                this._textLines = this._textLines.concat(lines);
            }

            this.$updateChildren();

            this._textFieldFlags = 0;
        }

        $updateChildren() {
            this.removeChildren();
            var lines = this._textLines;
            var y = 0;
            for (var i = this._scrollV; i < lines.length; i++) {
                var line = lines[i];
                this.addChild(line);
                line.y = y;
                y += lines[i].textHeight + (this._format.leading || 0);
                if (y > (this._height||10000))
                    break;
            }
            this._textFieldFlags &= ~TextFieldFlags.ScrollVDirty;
        }

        protected _contents: text.ContentElement[];
        protected _makeContents() {
            if (!hasFlag(this._textFieldFlags, TextFieldFlags.TextDirty) && !hasFlag(this._textFieldFlags, TextFieldFlags.MultilineDirty))
                return;
            var lines = this._text.split(TextField.LineBreaks);
            
            if (!this._multiline)
                lines = [lines.join(' ')];

            this._contents = lines.map(t=> new text.TextElement(t, this._format));
        }

        protected normalizeStyle(change: ITextFieldStyle,base:ITextFieldStyle = this._format): ITextFieldStyle {
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
}