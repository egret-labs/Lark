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
    export class CanvasTest extends Container {

        public constructor() {
            super();
            var img = new Image();
            img.src = "image/test.png";
            img.onload = ()=> {
                this.start(img);
            }

        }

        private image:any;

        private start(bitmapData:BitmapData):void {

            this.image = bitmapData;
            var textField = new TextField("", {fontSize: 12, color: 0xFF0000});
            textField.text = "2";
            textField.x = 100;
            textField.multiline = true;
            textField.width = 400;
            this.textField = textField;
            this.addChild(textField);
            this.stage.on(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            console.log("start");

        }

        private textField:TextField;
        private canvasCount:number = 2;

        private createCanvas():void {
            var canvas = this.createCanvasElement();
            if (canvas == null) {
                this.log("create error");
                return;
            }
            canvas.width = 250;
            canvas.height = 250;
            var context: CanvasRenderingContext2D = canvas.getContext("2d");
            context.drawImage(this.image, 0, 0);
            var bitmap = new Bitmap(canvas);
            this.addChild(bitmap);
            bitmap.y = 50+this.canvasCount * 5;
            this.canvasCount++;
        }


        private onTouchBegin(event:TouchEvent):void {
            this.createCanvas();
        }

        private log(msg: string) {
            var tx = this.textField.text;
            tx += this.canvasCount + ":" + msg + "\n";
            var lines = tx.split("\n");
            if (lines.length > 5) {
                tx = lines.splice(lines.length - 4).join("\n");
            }
            this.textField.text = tx;
        }

        private createCanvasElement(): HTMLCanvasElement {
            var canvas = document.createElement("canvas");
            canvas.height = 1;
            canvas.width = 1;
            if (!canvas.getContext || !canvas.getContext("2d"))
                return null;
            var data = canvas.toDataURL("image/png");
            if (data == 'data:,')
                return null;
            return canvas;
        }
    }

}