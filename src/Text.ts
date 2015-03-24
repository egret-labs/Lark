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
        texture: Texture = null;
        public constructor() {
            super();
            var img = new Image();
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=";
            img.onload = () => {
                var texture: Texture = new Texture();
                texture.$setBitmapData(img);
                this.texture = texture;
                this.createChildren(texture)
            }
            
            window.addEventListener("resize", e=> {
                setTimeout(() => this.createChildren(this.texture), 300);
            });
        }

        createChildren(texture: Texture) {
            this.removeChildren();
            this.addChild(FPS.display);
            var bitmap = new Bitmap();
            bitmap.texture = texture;
            var bitmap2 = new Bitmap();
            bitmap2.texture = texture;




            var mergeStyle = function (base: ITextStyle, change: ITextStyle): ITextStyle {
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
            };

            var style: ITextStyle = {
                fontFamily: "'Microsoft YaHei'",
                float: TextFloat.LEFT,
                fontSize: 40,
                color: 0x000000,
                bold: false,
                italic: false,
                verticalAlign: VerticalAlign.BOTTOM
            };

            var red: ITextStyle = mergeStyle(style, { color: 0xFF0000 });
            var green: ITextStyle = mergeStyle(style, { color: 0x00FF00 });
            var blue: ITextStyle = mergeStyle(style, { color: 0x0000FF });

            var textNodes: Array<string|IRichTextNode> = [{
                width: 300,
                height: 150,
                src: "http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/logo/logo_biz_7_00cf31a.gif",
                style: { float: TextFloat.RIGHT }
            }, {
                    text: "Hello World",
                    style: red
                }, {
                    text: " Blue text",
                    style: blue
                }, {
                    text: " Green text",
                    style: green
                },bitmap,"Hi"];
            
            var rich = new RichTextField(style);
            rich.nodes = textNodes;
            this.addChild(rich);
        }

        
        colors = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF, 0xFFFF00, 0xFF00FF];
        getRandomColor() {
            var random = Math.random() * this.colors.length;
            random = Math.floor(random);
            return this.colors[random];
        }
    }
}





function convertImgToBase64(url, callback, outputFormat) {
    var canvas = <HTMLCanvasElement>document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    //img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        console.log(dataURL);
        // Clean up
        canvas = null;
    };
    img.src = url;
}

convertImgToBase64("http://localhost:8080/image/px.png",null,null);