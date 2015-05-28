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


module swan {

    /**
     * TrackBase类是具有一个轨道和一个或多个滑块按钮的组件的一个基类，如 Slider 和 ScrollBar。
     */
    export class TrackBase extends Range {
        /**
         * 创建一个TrackBase实例。
         */
        public constructor() {
            super();
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }

        /**
         * [SkinPart]滑块显示对象
         */
        public thumb:swan.UIComponent = null;

        /**
         * [SkinPart]轨道显示对象
         */
        public track:swan.UIComponent = null;
        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值。
         * @param x 相对于轨道原点的位置的x坐标。
         * @param y 相对于轨道原点的位置的y坐标。
         */
        protected pointToValue(x:number, y:number):number {
            return this.$minimum;
        }


        /**
         * 按 stepSize 增大或减小 value
         * @param increase {boolean}
         */
        public changeValueByStep(increase:boolean = true):void {
            var prevValue:number = this.value;

            super.changeValueByStep(increase);

            if (this.value != prevValue)
                this.emitWith(lark.Event.CHANGE);
        }

        /**
         * 添加外观部件时调用
         */
        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);

            if (instance == this.thumb) {
                this.thumb.on(lark.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.on(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.on(lark.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.on(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
        }

        /**
         * 删除外观部件的实例时调用
         */
        protected partRemoved(partName:string, instance:any):void {
            super.partRemoved(partName, instance);

            if (instance == this.thumb) {
                this.thumb.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.removeListener(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.removeListener(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
        }

        /**
         * 记录鼠标在thumb上按下的位置
         */
        $clickOffsetX:number = 0;
        $clickOffsetY:number = 0;

        /**
         * 滑块或轨道尺寸改变事件
         */
        private onTrackOrThumbResize(event:lark.Event):void {
            this.updateSkinDisplayList();
        }


        /**
         * 滑块按下事件
         */
        protected onThumbTouchBegin(event:lark.TouchEvent):void {
            var stage = this.$stage;
            stage.on(lark.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.on(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);

            var clickOffset = this.thumb.globalToLocal(event.stageX, event.stageY, lark.$TempPoint);
            this.$clickOffsetX = clickOffset.x;
            this.$clickOffsetY = clickOffset.y;
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_START);
        }

        $moveStageX:number = 0;
        $moveStageY:number = 0;

        /**
         * 舞台上触摸移动事件
         */
        private onStageTouchMove(event:lark.TouchEvent):void {
            this.$moveStageX = event.stageX;
            this.$moveStageY = event.stageY;
            var track = this.track;
            if (!track)
                return;
            var p = track.globalToLocal(this.$moveStageX, this.$moveStageY, lark.$TempPoint);
            var newValue = this.pointToValue(p.x - this.$clickOffsetX, p.y - this.$clickOffsetY);
            newValue = this.nearestValidValue(newValue, this.$snapInterval);
            this.updateWhenTouchMove(newValue);
            event.updateAfterEvent();
        }

        protected updateWhenTouchMove(newValue:number):void{
            if (newValue != this.value) {
                this.setValue(newValue);
                this.validateDisplayList();
                this.emitWith(lark.Event.CHANGE);
            }
        }

        /**
         * 触摸结束事件
         */
        protected onStageTouchEnd(event:lark.Event):void {
            var stage:lark.Stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_MOVE,this.onStageTouchMove,this);
            stage.removeListener(lark.TouchEvent.TOUCH_END,this.onStageTouchEnd,this);
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_END)
        }

        /**
         * 轨道被按下事件
         */
        protected onTrackTouchBegin(event:lark.TouchEvent):void {

        }

        private touchDownTarget:lark.DisplayObject = null;

        /**
         * 当在组件上按下时记录被按下的子显示对象
         */
        private onTouchBegin(event:lark.TouchEvent):void {
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            this.touchDownTarget = <lark.DisplayObject> (event.$target);
        }

        /**
         * 当结束时，若不是在 touchDownTarget 上弹起，而是另外的子显示对象上弹起时，额外抛出一个触摸单击事件。
         */
        private stageTouchEndHandler(event:lark.TouchEvent):void {
            var target:lark.DisplayObject = event.$target;
            event.$currentTarget.removeListener(lark.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            if (this.touchDownTarget != target && this.contains(<lark.DisplayObject> (target))) {
                lark.TouchEvent.emitTouchEvent(this, lark.TouchEvent.TOUCH_TAP, true, true,
                    event.$stageX, event.$stageY, event.touchPointID);
            }
            this.touchDownTarget = null;
        }
    }

}
