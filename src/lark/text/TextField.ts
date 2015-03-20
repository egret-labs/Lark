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
        LineDirty = TextDirty | FormatDirty | MultilineDirty | WordWrapDirty,
        Dirty = LineDirty | ScrollVDirty
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
        public constructor(text:string,format:TextFormat=TextFormat.$defaultTextFormat) {
            super();
            this._text = text;
            this._format = format;
            this.$invalidateContentBounds();
            
            //todo: replace with event listeners
            lark.player.WebTicker.getInstance().register(this.onEnterFrame, this);
        }


        private _textFieldFlags: number = TextFieldFlags.Dirty;

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

        protected _format: TextFormat;
        public get format(): TextFormat {
            return this._format;
        }
        public set format(value: TextFormat) {
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

        protected _width:number = 0;
        public get width(): number {
            return this._width;
        }
        public set width(value: number) {
            if (value == this._width)
                return;
            this._width = value;
            this.$setTextFieldFlags(TextFieldFlags.Dirty);
        }

        protected _height: number = 0;
        public get height(): number {
            return this._height;
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
            this._splitParagraphs();
            var ps = this._paragraphs;


            var wrap = this._wordWrap && this._multiline;
            var format = this._format;
            var textElement = new text.TextElement(null,format);
            var textBlock = new text.TextBlock(textElement);


            var y = format.leading;
            var x = format.leftMargin;
            var w = this._width - format.leftMargin - format.rightMargin - format.blockIndent;
            if (wrap == false)
                w = 100000;


            for (var i = 0; i < ps.length; i++) {
                var t = ps[i];
                x = format.leftMargin + format.blockIndent;
                textElement.text = t;
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
                y += lines[i].height + this._format.leading;
                if (y > this._height)
                    break;
            }
            this._textFieldFlags &= ~TextFieldFlags.ScrollVDirty;
        }

        private _paragraphs: string[];
        private _splitParagraphs() {
            if (!hasFlag(this._textFieldFlags, TextFieldFlags.TextDirty) && !hasFlag(this._textFieldFlags, TextFieldFlags.MultilineDirty))
                return;
            var lines = this._text.split(TextField.LineBreaks);
            if (this._multiline)
                this._paragraphs = lines;
            else
                this._paragraphs = [lines.join(" ")];
        }
    }
}