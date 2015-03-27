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

            var bitmap = new Bitmap(texture);
            this.addChild(bitmap);

            var container = new DisplayObjectContainer();
            container.x = 250;
            container.addChild(new Bitmap(texture));
            bitmap = new Bitmap(texture);
            bitmap.x = 250;
            bitmap.touchEnabled = false;
            container.addChild(bitmap);
            container.touchEnabled = false;

            var container2 = new DisplayObjectContainer();
            this.addChild(container2);
            container2.addChild(container);
            container2.addChild(new Bitmap(texture));
            container2.x = 250;
            container2.touchChildren = false;
            this.stage.addEventListener(TouchEvent.TOUCH_TAP,this.onTouchTap,this);
            this.stage.addEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchTap,this);
            this.stage.addEventListener(TouchEvent.TOUCH_END,this.onTouchTap,this);
            this.stage.addEventListener(TouchEvent.TOUCH_BEGIN,this.onTouchTap,this);
            //var x = 0, y = 0;
            //for (var i = 0; i < 2000; i++) {
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
            //    this.iconList.push(bitmap);
            //}
            //bitmap = new lark.Bitmap();
            //bitmap.texture = texture;
            //bitmap.x = 700;
            //bitmap.y = 500;
            //this.iconList.push(bitmap);
            //this.targetIcon = bitmap;
            //this.addChild(this.targetIcon);
            //this.stage.frameRate = 24;
            //var timer = new Timer(16);
            //timer.addEventListener(TimerEvent.TIMER, this.onTick, this);
            //timer.start();
            this.addChild(FPS.display);
           // this.stage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }

        private onTouchTap(event:TouchEvent):void{
            console.log(event.type);
        }

        private touchTarget:DisplayObject;
        private offsetX:number = 0;
        private offsetY:number = 0;

        private onTouchBegin(event:TouchEvent):void {
            this.touchTarget = <DisplayObject>event.target;
            if(this.touchTarget===this.stage){
                return;
            }
            this.offsetX = this.touchTarget.x - event.stageX;
            this.offsetY = this.touchTarget.y - event.stageY;
            this.stage.addEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }

        private onTouchMove(event:TouchEvent):void {
            this.touchTarget.x = event.stageX + this.offsetX;
            this.touchTarget.y = event.stageY + this.offsetY;
            event.updateAfterEvent();
        }

        private onTouchEnd(event:TouchEvent):void {
            this.targetIcon = this.touchTarget;
            this.touchTarget = null;
            this.stage.removeEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.removeEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }

        private onTick(event:TimerEvent):void {
            this.targetIcon.rotation += 2;
            event.updateAfterEvent();
            //var list = this.iconList;
            //var length = list.length;
            //for(var i=0;i<length;i++){
            //    var bitmap = list[i];
            //    bitmap.rotation += 2;
            //}
        }
    }

}