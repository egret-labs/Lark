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
    import TF = lark.TextField;

    export enum TextFieldFlags {
        WordWrapDirty = 0x000008,
        ScrollVDirty = 0x000010,
        RichNodeDirty = 0x000010,
        RichLineDirty = TextDirty | FormatDirty | MultilineDirty | WordWrapDirty | RichNodeDirty,
        RichDirty = LineDirty | ScrollVDirty
    }


    /**
     * TextFormat 类描述字符格式设置信息。使用 TextFormat 类可以为文本字段创建特定的文本格式。
     * 您可以将文本格式应用于静态文本字段和动态文本字段。
     * 
     */
    export interface ITextFieldStyle extends ITextStyle {
        
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
         * 表示显示超链接的目标窗口。
         */
        target?: string;        

        /**
         * 表示使用此文本格式的文本的目标 URL。
         */
        url?: string;

    }

    


    export type RichTextNode = string | IRichTextNode;

    export interface IRichTextNode {
        text?: string;
        style?: ITextStyle;
        width?: number;
        height?: number;
        src?: string;
        graphic?: DisplayObject;
    }

    /**
     * RichTextField 类用于显示带有复杂格式的文本和显示对象。 
     * Lark 提供了多种在运行时设置文本格式的方法。ITextFieldStyle 允许您设置 RichTextField 对象的字符和段落格式。
     * 
     */
    export class RichTextField extends DisplayObjectContainer {
        /**
         * 创建一个RichTextField对象
         */
        public constructor(format?:ITextFieldStyle) {
            super();
            this._format = TextField.$normalizeStyle(format, BaseStyle);
            this.on(Event.ENTER_FRAME, this.update, this);
        }
        
        protected _textFieldFlags: number = TextFieldFlags.Dirty;

        $setTextFieldFlags(flags: TextFieldFlags) {
            this._textFieldFlags |= flags;
            this.$markDirty(true);
        }


        protected _format: ITextFieldStyle;
        /**
        *  设置或获取 RichTextField 默认的文本格式
        */
        public get format(): ITextFieldStyle {
            return this._format;
        }
        public set format(value: ITextFieldStyle) {
            value = TextField.$normalizeStyle(value);
            this._format = value;
            this.$setTextFieldFlags(TextFieldFlags.FormatDirty);
        }


        protected _nodes: RichTextNode[];
        
        /**
        *  设置或获取要在 RichTextField 中显示的多样式文本或显示对象
        */
        public get nodes(): RichTextNode[] {
            return this._nodes;
        }

        public set nodes(value: RichTextNode[]) {
            this._nodes = value;
        }


        protected _width: number = 400;
        /**
        *  设置或获取 RichTextField 的宽度
        */
        public get width(): number {
            return this._width;
        }
        public set width(value: number) {
            if (value == this._width)
                return;
            this._width = +value || 0;
            this.$setTextFieldFlags(TextFieldFlags.Dirty);
        }

        protected _height: number = NaN;
        /**
        *  设置或获取 RichTextField 的高度
        */
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
        /**
        *  设置或获取 RichTextField 的垂直滚动位置，以行为单位
        */
        public get scrollV(): number {
            return this._scrollV;
        }
        public set scrollV(value: number) {
            if (this._scrollV == value)
                return;
            this._scrollV = value;
            this.$setTextFieldFlags(TextFieldFlags.ScrollVDirty);
        }

        /**
        * 立即更新子项
        * 当您需要立即更新对 RichTextField 做的更改时，请调用此方法
        */
        public update() {
            if ((this._textFieldFlags & TextFieldFlags.LineDirty) != 0)
                this.$generateTextLines();
            if ((this._textFieldFlags & TextFieldFlags.ScrollVDirty) == TextFieldFlags.ScrollVDirty)
                this.$updateChildren();
        }

        protected _contents: text.ContentElement[];
        protected _textLines: Array<text.TextLine> = []; 
        protected _textfield: TextField = new TextField("");

        protected $generateTextLines() {
            this._textLines.length = 0;
            this.parseContents();
            var contents = this._contents;


            var format = this._format;
            var textBlock = new text.TextBlock();


            var y = format.leading;
            var x = format.leftMargin;
            var lm = format.leftMargin,
                rm = format.rightMargin,
                bidt = format.blockIndent;

            var width = this._width - lm - rm - bidt;


            for (var i = 0; i < contents.length; i++) {
                var content = contents[i];
                x = lm + bidt;
                textBlock.content = content;
                var lines = textBlock.createAllTextLines(width, format);
                this._textLines = this._textLines.concat(lines);
            }

            this.$updateChildren();

            this._textFieldFlags = 0;
        }

        protected $updateChildren() {
            this.removeChildren();
            
            var textfield = this._textfield;
            textfield.width = this.width;
            textfield.height = this.height;
            var textLines = [];
            var lines = this._textLines;
            var y = 0;


            for (var i = this._scrollV; i < lines.length; i++) {
                var line = lines[i];
                line.y = y;
                line.spans.forEach(span=> {
                    if (span instanceof TextSpan)
                        textLines.push(span)
                    else if(span instanceof DisplayObject)
                        this.addChild(span);
                });

                y += lines[i].textHeight + this._format.leading;
                if (y > (this._height || 10000))
                    break;
            }
            this.addChild(textfield);
            textfield.$setRenderLines(textLines);
            this._textFieldFlags &= ~TextFieldFlags.ScrollVDirty;
        }



        protected parseContents() {
            if (!hasFlag(this._textFieldFlags, TextFieldFlags.TextDirty)
                && !hasFlag(this._textFieldFlags, TextFieldFlags.MultilineDirty)
                && !hasFlag(this._textFieldFlags, TextFieldFlags.RichNodeDirty))
                return;
            var contents: text.ContentElement[] = [];
            var nodes = this._nodes, length = this._nodes.length;
            for (var i = 0; i < length; i++) {
                var node: any = nodes[i];
                var element: text.ContentElement = null;
                if ((<string>node).charAt) {
                    element = this.parseString(node);
                }
                else if ((<IRichTextNode>node).src) {
                    element = this.parseImage(node);
                }
                else if (node instanceof DisplayObject) {
                    element = this.parseGraphic(node, this._format);
                }
                else if ((<IRichTextNode>node).graphic) {
                    element = this.parseGraphic((<IRichTextNode>node).graphic,(<IRichTextNode>node).style||this._format);
                }
                else if ((<IRichTextNode>node).text) {
                    element = this.parseTextNode(node);
                }
                contents.push(element);
            }
            this._contents = [new text.GroupElement(contents)];
        }

        protected parseGraphic(node: DisplayObject, format?: ITextStyle) {
            var ge = new text.GraphicElement(node, node.width, node.height, format);
            return ge;
        }

        protected parseImage(node: IRichTextNode) {
            var width = node.width, height = node.height;
            var bitmap = new Bitmap();
            bitmap.texture = getTexture(node.src, bitmap);
            bitmap.width = width;
            bitmap.height = height;
            return this.parseGraphic(bitmap, node.style);
        }

        protected parseString(node: string) {
            return this.parseTextNode({ text: node, style: this._format });
        }

        protected parseTextNode(node: IRichTextNode) {
            var textElement = new text.TextElement(node.text, TextField.$normalizeStyle(node.style, this._format));
            return textElement;
        }
    }



    var BaseStyle: ITextFieldStyle = {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: 14,
        color: 0x000000,
        bold: false,
        italic: false,
        float: Align.NONE,
        leftMargin: 0,
        rightMargin: 0,
        blockIndent: 0,
        align: Align.LEFT,
        indent: 0,
        leading: 0,
        verticalAlign: Align.BOTTOM
    }

    function hasFlag(prop: number, flag: number): boolean {
        return (prop & flag) == flag;
    }



    var img1px = new Image(1, 1);
    img1px.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=";
    var texture: Texture = new Texture();
    texture.$setBitmapData(img1px);
    var $1px: Texture = texture;
    var $TextureCache: { [src: string]: Texture } = {};

    function getTexture(src: string, bitmap: Bitmap): Texture {
        if (src in $TextureCache) 
            return $TextureCache[src];

        var image = new Image();
        image.src = src;
        image.onload = e=> {
            var texture = new Texture();
            texture.$setBitmapData(image);
            $TextureCache[src] = texture;

            var width = bitmap.width;
            var height = bitmap.height;
            bitmap.texture = texture;
            bitmap.width = width;
            bitmap.height = height;
        };

        return $1px;
    }
}