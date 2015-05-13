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

    export class GUI extends gui.Group {

        public constructor() {
            super();
            this.width = 1800;
            this.height  = 800;
            var request = new HttpRequest();
            request.once(Event.COMPLETE, this.onExmlLoaded, this);
            request.open("tests/AlertSkin.exml");
            request.send();
        }

        private onExmlLoaded(event:Event):void {
            var request:HttpRequest = event.target;
                var skin = lark.gui.EXML.parse(request.response,"lark.gui.AlertSkin");
            var component = new lark.gui.SkinnableComponent();
            component.skinName = skin;
            this.addChild(component);
            component.horizontalCenter = 0;
            component.verticalCenter = 0;
            component.height = 300;
            is(component,lark.gui.Types.UIComponent);

            var image = new lark.gui.Image("image/test.png");
            image.fillMode = "clip";
            this.addChild(image);
            image.horizontalCenter = 0;
            image.verticalCenter = 0;
            image.width = 300;
            image.height = 400;

            var image2 = new lark.gui.Image("image/button.png");
            image2.scale9Grid = new lark.Rectangle(5,5,110,30);
            this.addChild(image2);
            image2.x = 300;
            image2.y = 100;
            //image2.smoothing = false;
            image2.width = 300;
            image2.height = 100;

            this.stage.on(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }

        private touchTarget:lark.gui.UIComponent;
        private offsetX:number = 0;
        private offsetY:number = 0;

        private onTouchBegin(event:TouchEvent):void {
            var target = <lark.gui.UIComponent>event.target;
            if (is(target,Types.Stage)) {
                return;
            }
            this.touchTarget = target;
            target.includeInLayout = false;
            var pos = target.parent.localToGlobal(target.x, target.y);
            this.addChild(target);
            pos = target.parent.globalToLocal(pos.x, pos.y);
            target.x = pos.x;
            target.y = pos.y;
            this.offsetX = target.x - event.stageX;
            this.offsetY = target.y - event.stageY;
            this.stage.on(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.on(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }

        private onTouchMove(event:TouchEvent):void {
            this.touchTarget.x = this.offsetX + event.stageX;
            this.touchTarget.y = this.offsetY + event.stageY;
            event.updateAfterEvent();
        }

        private onTouchEnd(event:TouchEvent):void {
            this.touchTarget = null;
            this.stage.removeListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.removeListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.updateAfterEvent();
        }
    }
}