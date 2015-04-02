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
    export class Main extends DisplayObjectContainer {

        public constructor() {
            super();
            var img = new Image();
            img.src = "image/test.png";
            img.onload = ()=> {
                var texture:Texture = new Texture();
                texture.$setBitmapData(img);
                this.start(texture);
            }

        }

        private targetIcon:DisplayObject;

        private iconList:DisplayObject[] = [];

        private start(texture:Texture):void {

            var container = new DisplayObjectContainer();
            container.name = "container";
            container.x = 150;
            container.addChild(new Bitmap(texture));
            var bitmap = new Bitmap(texture);
            bitmap.x = 150;
            bitmap.touchEnabled = false;
            container.addChild(bitmap);
            container.touchEnabled = false;
            container.scaleX = container.scaleY = 0.5;

            var container2 = new DisplayObjectContainer();
            container2.name  = "container2";
            container2.addChild(container);
            bitmap = new Bitmap(texture);
            bitmap.alpha = 0.7;
            container2.addChild(bitmap);
            container2.x = 250;
            container2.touchChildren = false;

            var t = new Texture();
            t.draw(container2);
            bitmap = new lark.Bitmap(t);
            this.addChild(bitmap);



            //var x = 0, y = 0;
            //for (var i = 0; i < 3000; i++) {
            //    var bitmap = new Bitmap();
            //    bitmap.texture = texture;
            //    bitmap.x = x;
            //    bitmap.y = y;
            //    bitmap.scaleX = bitmap.scaleY = Math.random();
            //    bitmap.rotation = Math.random() * 360;
            //    x += texture.width;
            //    if (x > 1920) {
            //        x = 0;
            //        y += texture.height;
            //        if (y > 960) {
            //            y = 0;
            //        }
            //    }
            //    this.addChild(bitmap);
            //    //this.iconList.push(bitmap);
            //}
            //bitmap = new lark.Bitmap();
            //bitmap.texture = texture;
            //bitmap.x = 700;
            //bitmap.y = 500;
            //this.iconList.push(bitmap);
            //this.targetIcon = bitmap;
            //this.addChild(this.targetIcon);
            //var timer = new Timer(16);
            //timer.on(TimerEvent.TIMER, this.onTick, this);
            //timer.start();
            this.addChild(FPS.display);
            this.stage.on(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }

        private touchTarget:DisplayObject;
        private offsetX:number = 0;
        private offsetY:number = 0;

        private onTouchBegin(event:TouchEvent):void {
            this.touchTarget = <DisplayObject>event.target;
            if(this.touchTarget===this.stage||this.touchTarget===FPS.display){
                return;
            }
            this.offsetX = this.touchTarget.x - event.stageX;
            this.offsetY = this.touchTarget.y - event.stageY;
            this.stage.on(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.on(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }

        private onTouchMove(event:TouchEvent):void {
            this.touchTarget.x = event.stageX + this.offsetX;
            this.touchTarget.y = event.stageY + this.offsetY;
            event.updateAfterEvent();
        }

        private onTouchEnd(event:TouchEvent):void {
            this.targetIcon = this.touchTarget;
            if(this.iconList.indexOf(this.touchTarget)==-1){
                this.iconList.push(this.touchTarget);
            }
            this.touchTarget = null;
            this.stage.removeListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.removeListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }

        private onTick(event:TimerEvent):void {
            //this.targetIcon.rotation += 2;
            event.updateAfterEvent();
            var list = this.iconList;
            var length = list.length;
            for(var i=0;i<length;i++){
                var bitmap = list[i];
                bitmap.rotation += 2;
            }
        }
    }

}