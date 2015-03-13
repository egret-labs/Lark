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


            var str = "Hello World, THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF";
            var font = new text.FontDescription('"Microsoft Yahei"', true, true);
            var format = new text.ElementFormat();
            format.fontDescription = font;
            format.fontSize = 24;


            var txtElement = new text.TextElement("Hi-------------", format);
            var iconElement = new text.GraphicElement(bitmap, 24, 24);
            var txtElement2 = new text.TextElement(str, format);

            
            var group = new text.GroupElement([txtElement, iconElement, txtElement2]);

            var textBlock = new text.TextBlock();
            textBlock.content = group;
            var line: text.TextLine = null;
            var y = 30;
            while (line = textBlock.createTextLine(line, 300)) {
                this.addChild(line);
                line.y = y;
                y += line.height;
            }
        }
    }
}



function load() {

    //var txt = new lark.Text();
    //txt.createChildren();

    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("lark_canvas");
    var context = canvas.getContext("2d");
    context.font = '14px "Microsoft Yahei"';


    var count = 1000;
    var width = 0;


    var demoText = 'TextFormat';
    var start = performance.now();
    for (var i = 0; i < count; i++) {
        width = measureText(demoText, context);
    }
    var end = performance.now();
    console.log( width, end - start);




    //demoText = "Hello world";
    start = performance.now();
    for (var i = 0; i < count; i++) {
        width = context.measureText(demoText).width;
    }
    end = performance.now();

    console.log( width, end - start);




}
interface ILetterToWidth {
    [letter:number]:number
}

interface IStringDic {
    [key:string]:ILetterToWidth
}

var fontDic: IStringDic = {
    "Init": []
}



function measureText(text: string, context:CanvasRenderingContext2D) {
    var width = 0.0;
    var font = context.font;
    var letterdic = fontDic[font];
    if (letterdic==undefined) {
        letterdic = createFontDicFor(font, text, context);
        fontDic[font] = letterdic
    }
    var length = text.length;
    for (var i = 0; i < length; i++) {
        var letter = text.charCodeAt(i);
        var w = letterdic[letter];
        if (w >= 0) {
            width += w;
            continue;
        }
        w = context.measureText(text.charAt(i)).width;
        letterdic[letter] = w;
        width += w;
    }
    return width;
}

function createFontDicFor(font: string, text: string, context: CanvasRenderingContext2D) {
    var letterDic: ILetterToWidth = {};
    var length = text.length;
    for (var i = 0; i < length; i++) {
        var letter = text.charCodeAt(i);
        if (letter in letterDic)
            continue;
        var width = context.measureText(text.charAt(i)).width;
        letterDic[letter] = width;
    }
    return letterDic;
}
