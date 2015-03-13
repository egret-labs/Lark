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
    export class Text extends DisplayObjectContainer {

        public constructor() {
            super();
            var img = new Image();
            img.src = "image/icon.png";
            img.onload = () => {
                var texture: Texture = new Texture();
                texture.$setBitmapData(img);
                this.createChildren(texture)
            }
            
        }

        createChildren(texture: Texture) {

            var bitmap = new Bitmap();
            bitmap.texture = texture;


            var str = "Hello World, ActionScript コードから直接 TextLine オブジェクトを作成することはできません。new TextLine() を呼び出すと、例外がスローされます。你好啊，我是中文Hi, how are you? 你在干什么안녕하세요";
            var font = new text.FontDescription('"Microsoft Yahei"', true, true);
            var format = new text.ElementFormat();
            format.fontDescription = font;
            format.fontSize = 24;
            format.verticalAlign = VerticalAlign.BOTTOM;


            var txtElement = new text.TextElement("Hi-------------", format);
            var iconElement = new text.GraphicElement(bitmap, 50, 50, format);
            var txtElement2 = new text.TextElement(str, format);

            
            var group = new text.GroupElement([txtElement, iconElement, txtElement2]);

            var textBlock = new text.TextBlock();
            textBlock.content = group;
            var line: text.TextLine = null;
            var y = 0;
            var width = Math.random() * 200 + 400
            while (line = textBlock.createTextLine(line, width)) {
                this.addChild(line);
                line.y = y;
                y += line.height+10;
                format.color = this.getRandomColor();
                //format.fontSize = Math.random() * 60 + 20;
            }
        }

        
        colors = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF, 0xFFFF00, 0xFF00FF];
        getRandomColor() {
            var random = Math.random() * this.colors.length;
            random = Math.floor(random);
            return this.colors[random];
        }
    }
}





