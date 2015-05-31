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
     * 进度条控件。
     */
    export class ProgressBar extends Range {
        /**
         * 实例化一个进度条控件
         */
        public constructor() {
            super();
            this.animation = new sys.Animation(this.animationUpdateHandler, this);
        }

        /**
         * [SkinPart]进度高亮显示对象。
         */
        public thumb:swan.UIComponent = null;
        /**
         * [SkinPart]进度条文本
         */
        public labelDisplay:Label = null;

        private _labelFunction:(value:number, maximum:number)=>string = null;
        /**
         * 进度条文本格式化回调函数。示例：labelFunction(value:Number,maximum:Number):String;
         */
        public get labelFunction():(value:number, maximum:number)=>string {
            return this._labelFunction;
        }

        public set labelFunction(value:(value:number, maximum:number)=>string) {
            if (this._labelFunction == value)
                return;
            this._labelFunction = value;
            this.invalidateDisplayList();
        }

        /**
         * 将当前value转换成文本
         */
        protected valueToLabel(value:number, maximum:number):string {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        }

        private _slideDuration:number = 500;

        /**
         * value改变时更新视图的缓动动画时间，单位毫秒。设置为0则不执行缓动。默认值500。
         */
        public get slideDuration():number {
            return this._slideDuration;
        }

        public set slideDuration(value:number) {
            value = +value | 0;
            if (this._slideDuration === value)
                return;
            this._slideDuration = value;
            if (this.animation.isPlaying) {
                this.animation.stop();
                this.setValue(this.slideToValue);
            }
        }

        private _direction:string = Direction.LTR;
        /**
         * 进度条增长方向。请使用 Direction 定义的常量。默认值：Direction.LTR（从左向右增长）。
         */
        public get direction():string {
            return this._direction;
        }

        public set direction(value:string) {
            if (this._direction == value)
                return;
            this._direction = value;
            this.invalidateDisplayList();
        }

        /**
         * 动画实例
         */
        private animation:sys.Animation;
        /**
         * 动画播放结束时要到达的value。
         */
        private slideToValue:number = 0;

        $setValue(newValue:number) {
            if (this.value === newValue)
                return;
            super.$setValue(newValue);
            if (this._slideDuration > 0 && this.$stage) {
                this.validateProperties();//最大值最小值发生改变时要立即应用，防止当前起始值不正确。
                var animation = this.animation;
                if (animation.isPlaying) {
                    this.animationValue = this.slideToValue;
                    this.invalidateDisplayList();
                    animation.stop();
                }
                this.slideToValue = this.nearestValidValue(newValue, this.$snapInterval);
                if (this.slideToValue === this.animationValue)
                    return;
                var duration = this._slideDuration *
                    (Math.abs(this.animationValue - this.slideToValue) / (this.$maximum - this.$minimum));
                animation.duration = duration === Infinity ? 0 : duration;
                animation.from = this.animationValue;
                animation.to = this.slideToValue;
                animation.play();
            }
            else {
                this.animationValue = this.value;
            }
        }

        private animationValue:number = 0;

        /**
         * 动画播放更新数值
         */
        private animationUpdateHandler(animation:sys.Animation):void {
            var value = this.nearestValidValue(animation.currentValue, this.$snapInterval);
            this.animationValue = Math.min(this.$maximum, Math.max(this.$minimum, value));
            this.invalidateDisplayList();
        }


        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            if (instance === this.thumb) {
                this.thumb.on(lark.Event.RESIZE, this.onThumbResize, this);
            }
        }

        protected partRemoved(partName:string, instance:any):void {
            super.partRemoved(partName, instance);
            if (instance === this.thumb) {
                this.thumb.removeListener(lark.Event.RESIZE, this.onThumbResize, this);
            }
        }

        /**
         * thumb的位置或尺寸发生改变
         */
        private onThumbResize(event:lark.Event):void {
            this.updateSkinDisplayList();
        }

        /**
         * 更新皮肤部件大小和可见性。
         */
        protected updateSkinDisplayList():void {
            var currentValue = this.animation.isPlaying ? this.animationValue : this.value;
            var maxValue = this.$maximum;
            var thumb = this.thumb;
            if (thumb) {
                var thumbWidth = thumb.width;
                var thumbHeight = thumb.height;
                var clipWidth = Math.round((currentValue / maxValue) * thumbWidth);
                if (clipWidth < 0 || clipWidth === Infinity)
                    clipWidth = 0;
                var clipHeight = Math.round((currentValue / maxValue) * thumbHeight);
                if (clipHeight < 0 || clipHeight === Infinity)
                    clipHeight = 0;

                var rect = thumb.$scrollRect;
                if (!rect) {
                    rect = lark.$TempRectangle;
                }
                rect.setTo(0,0,thumbWidth,thumbHeight);
                var thumbPosX = thumb.x - rect.x;
                var thumbPosY = thumb.y - rect.y;
                switch (this._direction) {
                    case Direction.LTR:
                        rect.width = clipWidth;
                        thumb.x = thumbPosX;
                        break;
                    case Direction.RTL:
                        rect.width = clipWidth;
                        rect.x = thumbWidth - clipWidth;
                        thumb.x = thumbPosX + rect.x;
                        break;
                    case Direction.TTB:
                        rect.height = clipHeight;
                        thumb.y = thumbPosY;
                        break;
                    case Direction.BTT:
                        rect.height = clipHeight;
                        rect.y = thumbHeight - clipHeight;
                        thumb.y = thumbPosY + rect.y;
                        break;
                }
                thumb.scrollRect = rect;
            }
            if (this.labelDisplay) {
                this.labelDisplay.text = this.valueToLabel(currentValue, maxValue);
            }
        }
    }
}