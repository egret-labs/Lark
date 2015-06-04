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
     * 滑块控件基类
     */
    export class SliderBase extends TrackBase {
        /**
         * 创建一个 SliderBase 实例
         */
        public constructor() {
            super();
            this.maximum = 10;
        }

        /**
         * 在轨道上单击以移动滑块时，滑动动画持续的时间（以毫秒为单位）。
         */
        public slideDuration:number = 300;

        /**
         * [SkinPart]轨道高亮显示对象
         */
        public trackHighlight:lark.DisplayObject = null;

        /**
         * 动画实例
         */
        private animation:sys.Animation;

        $pendingValue:number = 0;
        /**
         * 释放鼠标按键时滑块将具有的值。无论 liveDragging 是否为 true，在滑块拖动期间始终更新此属性。
         * 而 value 属性在当 liveDragging 为 false 时，只在鼠标释放时更新一次。
         */
        public get pendingValue():number {
            return this.$pendingValue;
        }

        public set pendingValue(value:number) {
            if (value === this.$pendingValue)
                return;
            this.$pendingValue = value;
            this.invalidateDisplayList();
        }

        /**
         * 在 value 属性改变时为该属性设置后备存储，并调度 valueCommit 事件
         */
        protected setValue(value:number):void {
            this.$pendingValue = value;
            super.setValue(value);
        }

        /**
         * 动画播放更新数值
         */
        $animationUpdateHandler(animation:sys.Animation):void {
            this.pendingValue = animation.currentValue;
        }

        /**
         * 动画播放结束时要到达的value。
         */
        private slideToValue:number = 0;

        /**
         * 动画播放完毕
         */
        private animationEndHandler(animation:sys.Animation):void {
            this.setValue(this.slideToValue);
            this.emitWith(lark.Event.CHANGE);
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_END);
        }

        /**
         * 停止播放动画
         */
        private stopAnimation():void {
            this.animation.stop();
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
            this.emitWith(lark.Event.CHANGE);
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_END);
        }

        protected onThumbTouchBegin(event:lark.TouchEvent):void {
            if (this.animation && this.animation.isPlaying)
                this.stopAnimation();

            super.onThumbTouchBegin(event);
        }

        /**
         * 如果为 true，则将在沿着轨道拖动滑块时，而不是在释放滑块按钮时，提交此滑块的值。
         */
        public liveDragging:boolean = true;

        protected updateWhenTouchMove(newValue:number):void {
            if (newValue != this.$pendingValue) {
                if (this.liveDragging) {
                    this.setValue(newValue);
                    this.emitWith(lark.Event.CHANGE);
                }
                else {
                    this.pendingValue = newValue;
                }
            }
        }

        protected onStageTouchEnd(event:lark.Event):void {
            super.onStageTouchEnd(event);
            if (!this.liveDragging && this.value != this.$pendingValue) {
                this.setValue(this.$pendingValue);
                this.emitWith(lark.Event.CHANGE);
            }
        }

        protected onTrackTouchBegin(event:lark.TouchEvent):void {
            var thumbW = this.thumb ? this.thumb.width : 0;
            var thumbH = this.thumb ? this.thumb.height : 0;
            var offsetX = event.$stageX - (thumbW / 2);
            var offsetY = event.$stageY - (thumbH / 2);
            var p = this.track.globalToLocal(offsetX, offsetY, lark.$TempPoint);

            var values = this.$Range
            var newValue = this.pointToValue(p.x, p.y);
            newValue = this.nearestValidValue(newValue, values[sys.RangeKeys.snapInterval]);

            if (newValue != this.$pendingValue) {
                if (this.slideDuration != 0) {
                    if (!this.animation) {
                        this.animation = new sys.Animation(this.$animationUpdateHandler, this);
                        this.animation.endFunction = this.animationEndHandler;
                    }
                    var animation = this.animation;
                    if (animation.isPlaying)
                        this.stopAnimation();
                    this.slideToValue = newValue;
                    animation.duration = this.slideDuration *
                        (Math.abs(this.$pendingValue - this.slideToValue) / (values[sys.RangeKeys.maximum] - values[sys.RangeKeys.minimum]));
                    animation.from = this.$pendingValue;
                    animation.to = this.slideToValue;
                    UIEvent.emitUIEvent(this, UIEvent.CHANGE_START);
                    animation.play();
                }
                else {
                    this.setValue(newValue);
                    this.emitWith(lark.Event.CHANGE);
                }
            }
        }

        /**
         * 正删除外观部件的实例时调用
         */
        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            if (instance === this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                if (lark.is(this.trackHighlight, lark.Types.DisplayObjectContainer)) {
                    (<lark.DisplayObjectContainer> this.trackHighlight).touchChildren = false;
                }
            }
        }
    }

}