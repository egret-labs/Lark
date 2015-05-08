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
    export class Main extends Sprite {

        public constructor() {
            super();
            var loader = new ImageLoader();
            loader.once(Event.COMPLETE,this.start,this);
            loader.load("image/test.png");
        }

        private targetIcon:DisplayObject;

        private iconList:DisplayObject[] = [];

        private start(event:Event):void {
            var loader:ImageLoader = event.target;
            var bitmapData = loader.data;

            var container = new Sprite();
            var x = 0, y = 0;
            for (var i = 0; i < 8000; i++) {
                var bitmap = new Bitmap();
                bitmap.bitmapData = bitmapData;
                bitmap.x = x;
                bitmap.y = y;
                bitmap.scaleX = bitmap.scaleY = Math.random();
                bitmap.rotation = Math.random() * 360;
                x += bitmapData.width;
                if (x > 1900) {
                    x = 0;
                    y += bitmapData.height;
                    if (y > 960) {
                        y = 0;
                    }
                }
                container.addChild(bitmap);
                //this.iconList.push(bitmap);
            }
            var shape = new Shape();
            shape.x = 150;
            shape.y = 150;
            var g = shape.graphics;
            g.beginPath();
            g.arc(100, 100, 200, 0, 2 * Math.PI, false);
            g.moveTo(50, 50);
            g.lineTo(50, 150);
            g.lineTo(150, 150);
            g.lineTo(150, 50);
            g.lineTo(50, 50);
            g.lineWidth = 10;
            g.stroke();
            g.strokeRect(0, 0, 100, 100);
            g.fillStyle = "green";
            g.fill();
            this.addChild(container);
            //container.y = 150;
            container.cacheAsBitmap = true;
            bitmap = new lark.Bitmap();
            bitmap.x = 350;
            bitmap.y = 350;
            bitmap.bitmapData = bitmapData;
            //bitmap.blendMode = BlendMode.ADD;
            this.iconList.push(bitmap);
            this.targetIcon = bitmap;
            this.addChild(this.targetIcon);
            this.timer.on(TimerEvent.TIMER, this.onTick, this);
            //this.timer.start();
            this.stage.on(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.container = container;
            //container.addChild(shape);
            //shape.cacheAsBitmap = true;
            //container.mask = this.targetIcon;

        }

        private container:DisplayObjectContainer;
        private timer = new Timer(16);
        private touchTarget:DisplayObject;
        private offsetX:number = 0;
        private offsetY:number = 0;


        private onTouchBegin(event:TouchEvent):void {
            var target = <DisplayObject>event.target;
            if (target === this.stage) {
                return;
            }
            this.timer.stop();
            this.touchTarget = target;
            var pos = target.parent.localToGlobal(target.x, target.y);
            this.addChild(target);
            pos = target.parent.globalToLocal(pos.x, pos.y);
            target.x = pos.x;
            target.y = pos.y;
            this.offsetX = target.x - event.stageX;
            this.offsetY = target.y - event.stageY;
            //this.offsetX = event.stageX;
            //this.offsetY = event.stageY;
            this.stage.on(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.on(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }

        private rect = new Rectangle(300, 300, 500, 500);

        private onTouchMove(event:TouchEvent):void {
            this.touchTarget.x = this.offsetX + event.stageX;
            this.touchTarget.y = this.offsetY + event.stageY;
            //this.rect.x -= event.stageX - this.offsetX;
            //this.rect.y -= event.stageY - this.offsetY;
            //this.offsetX = event.stageX;
            //this.offsetY = event.stageY;
            //this.container.scrollRect = this.rect;
            event.updateAfterEvent();
        }

        private onTouchEnd(event:TouchEvent):void {
            this.targetIcon = this.touchTarget;
            if (this.iconList.indexOf(this.touchTarget) == -1) {
                this.iconList.push(this.touchTarget);
            }
            this.touchTarget = null;
            this.stage.removeListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.removeListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
            this.timer.start();
        }

        private onTick(event:TimerEvent):void {
            this.targetIcon.$invalidate();
            //this.targetIcon.rotation += 2;
            event.updateAfterEvent();
            var list = this.iconList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bitmap = list[i];
                bitmap.rotation += 2;
            }
        }

    }

}