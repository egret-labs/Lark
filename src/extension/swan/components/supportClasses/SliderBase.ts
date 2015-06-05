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

    export const enum Keys {
        clickOffsetX,
        clickOffsetY,
        moveStageX,
        moveStageY,
        touchDownTarget,
        animation,
        slideDuration,
        pendingValue,
        slideToValue,
        liveDragging
    }

    /**
     * 滑块控件基类
     */
    export class SliderBase extends Range {
        /**
         * 创建一个 SliderBase 实例
         */
        public constructor() {
            super();
            this.$SliderBase = {
                0: 0,        //clickOffsetX,
                1: 0,        //clickOffsetY,
                2: 0,        //moveStageX,
                3: 0,        //moveStageY,
                4: null,     //touchDownTarget
                5: null,     //animation,
                6: 300,      //slideDuration,
                7: 0,        //pendingValue
                8: 0,        //slideToValue,
                9: true,     //liveDragging
            };
            this.maximum = 10;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }

        $SliderBase:Object;

        /**
         * [SkinPart]轨道高亮显示对象
         */
        public trackHighlight:lark.DisplayObject = null;
        /**
         * [SkinPart]滑块显示对象
         */
        public thumb:swan.UIComponent = null;

        /**
         * [SkinPart]轨道显示对象
         */
        public track:swan.UIComponent = null;

        /**
         * 在轨道上单击以移动滑块时，滑动动画持续的时间（以毫秒为单位）。设置为0将不执行缓动。
         */
        public get slideDuration():number {
            return this.$SliderBase[Keys.slideDuration];
        }

        public set slideDuration(value:number) {
            this.$SliderBase[Keys.slideDuration] = +value || 0;
        }

        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值。
         * @param x 相对于轨道原点的位置的x坐标。
         * @param y 相对于轨道原点的位置的y坐标。
         */
        protected pointToValue(x:number, y:number):number {
            return this.minimum;
        }

        /**
         * 如果为 true，则将在沿着轨道拖动滑块时，而不是在释放滑块按钮时，提交此滑块的值。
         */
        public get liveDragging():boolean {
            return this.$SliderBase[Keys.liveDragging];
        }

        public set liveDragging(value:boolean) {
            this.$SliderBase[Keys.liveDragging] = !!value;
        }


        /**
         * 释放鼠标按键时滑块将具有的值。无论 liveDragging 是否为 true，在滑块拖动期间始终更新此属性。
         * 而 value 属性在当 liveDragging 为 false 时，只在鼠标释放时更新一次。
         */
        public get pendingValue():number {
            return this.$SliderBase[Keys.pendingValue];
        }

        public set pendingValue(value:number) {
            value = +value || 0;
            var values = this.$SliderBase;
            if (value === values[Keys.pendingValue])
                return;
            values[Keys.pendingValue] = value;
            this.invalidateDisplayList();
        }

        /**
         * 在 value 属性改变时为该属性设置后备存储，并调度 valueCommit 事件
         */
        protected setValue(value:number):void {
            this.$SliderBase[Keys.pendingValue] = value;
            super.setValue(value);
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
            else if (instance === this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                if (lark.is(this.trackHighlight, lark.Types.DisplayObjectContainer)) {
                    (<lark.DisplayObjectContainer> this.trackHighlight).touchChildren = false;
                }
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
         * 滑块或轨道尺寸改变事件
         */
        private onTrackOrThumbResize(event:lark.Event):void {
            this.updateSkinDisplayList();
        }


        /**
         * 滑块按下事件
         */
        protected onThumbTouchBegin(event:lark.TouchEvent):void {
            var values = this.$SliderBase;
            if (values[Keys.animation] && values[Keys.animation].isPlaying)
                this.stopAnimation();

            var stage = this.$stage;
            stage.on(lark.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.on(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);

            var clickOffset = this.thumb.globalToLocal(event.stageX, event.stageY, lark.$TempPoint);

            values[Keys.clickOffsetX] = clickOffset.x;
            values[Keys.clickOffsetY] = clickOffset.y;
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_START);
        }

        /**
         * 舞台上触摸移动事件
         */
        private onStageTouchMove(event:lark.TouchEvent):void {
            var values = this.$SliderBase;
            values[Keys.moveStageX] = event.$stageX;
            values[Keys.moveStageY] = event.$stageY;
            var track = this.track;
            if (!track)
                return;
            var p = track.globalToLocal(values[Keys.moveStageX], values[Keys.moveStageY], lark.$TempPoint);
            var newValue = this.pointToValue(p.x - values[Keys.clickOffsetX], p.y - values[Keys.clickOffsetY]);
            newValue = this.nearestValidValue(newValue, this.snapInterval);
            this.updateWhenTouchMove(newValue);
            event.updateAfterEvent();
        }

        protected updateWhenTouchMove(newValue:number):void {
            if (newValue != this.$SliderBase[Keys.pendingValue]) {
                if (this.liveDragging) {
                    this.setValue(newValue);
                    this.emitWith(lark.Event.CHANGE);
                }
                else {
                    this.pendingValue = newValue;
                }
            }
        }

        /**
         * 触摸结束事件
         */
        protected onStageTouchEnd(event:lark.Event):void {
            var stage:lark.Stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_END);
            var values = this.$SliderBase;
            if (!this.liveDragging && this.value != values[Keys.pendingValue]) {
                this.setValue(values[Keys.pendingValue]);
                this.emitWith(lark.Event.CHANGE);
            }
        }

        /**
         * 当在组件上按下时记录被按下的子显示对象
         */
        private onTouchBegin(event:lark.TouchEvent):void {
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            this.$SliderBase[Keys.touchDownTarget] = <lark.DisplayObject> (event.$target);
        }

        /**
         * 当结束时，若不是在 touchDownTarget 上弹起，而是另外的子显示对象上弹起时，额外抛出一个触摸单击事件。
         */
        private stageTouchEndHandler(event:lark.TouchEvent):void {
            var target:lark.DisplayObject = event.$target;
            var values = this.$SliderBase;
            event.$currentTarget.removeListener(lark.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            if (values[Keys.touchDownTarget] != target && this.contains(<lark.DisplayObject> (target))) {
                lark.TouchEvent.emitTouchEvent(this, lark.TouchEvent.TOUCH_TAP, true, true,
                    event.$stageX, event.$stageY, event.touchPointID);
            }
            values[Keys.touchDownTarget] = null;
        }


        /**
         * 动画播放更新数值
         */
        $animationUpdateHandler(animation:sys.Animation):void {
            this.pendingValue = animation.currentValue;
        }

        /**
         * 动画播放完毕
         */
        private animationEndHandler(animation:sys.Animation):void {
            this.setValue(this.$SliderBase[Keys.slideToValue]);
            this.emitWith(lark.Event.CHANGE);
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_END);
        }

        /**
         * 停止播放动画
         */
        private stopAnimation():void {
            this.$SliderBase[Keys.animation].stop();
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
            this.emitWith(lark.Event.CHANGE);
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_END);
        }

        protected onTrackTouchBegin(event:lark.TouchEvent):void {
            var thumbW = this.thumb ? this.thumb.width : 0;
            var thumbH = this.thumb ? this.thumb.height : 0;
            var offsetX = event.$stageX - (thumbW / 2);
            var offsetY = event.$stageY - (thumbH / 2);
            var p = this.track.globalToLocal(offsetX, offsetY, lark.$TempPoint);

            var rangeValues = this.$Range
            var newValue = this.pointToValue(p.x, p.y);
            newValue = this.nearestValidValue(newValue, rangeValues[sys.RangeKeys.snapInterval]);

            var values = this.$SliderBase;
            if (newValue != values[Keys.pendingValue]) {
                if (values[Keys.slideDuration] != 0) {
                    if (!values[Keys.animation]) {
                        values[Keys.animation] = new sys.Animation(this.$animationUpdateHandler, this);
                        values[Keys.animation].endFunction = this.animationEndHandler;
                    }
                    var animation = values[Keys.animation];
                    if (animation.isPlaying)
                        this.stopAnimation();
                    values[Keys.slideToValue] = newValue;
                    animation.duration = values[Keys.slideDuration] *
                        (Math.abs(values[Keys.pendingValue] - values[Keys.slideToValue]) / (rangeValues[sys.RangeKeys.maximum] - rangeValues[sys.RangeKeys.minimum]));
                    animation.from = values[Keys.pendingValue];
                    animation.to = values[Keys.slideToValue];
                    UIEvent.emitUIEvent(this, UIEvent.CHANGE_START);
                    animation.play();
                }
                else {
                    this.setValue(newValue);
                    this.emitWith(lark.Event.CHANGE);
                }
            }
        }

    }

    lark.registerClass(SliderBase,Types.SliderBase);

}
