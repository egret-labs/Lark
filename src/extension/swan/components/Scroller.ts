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
     * 滚动条组件
     */
    export class Scroller extends Component {
        /**
         * 创建一个 Scroller 实例
         */
        public constructor() {
            super();
            this.touchScrollH = new swan.TouchScroll(this.horizontalUpdateHandler,this);
            this.touchScrollV = new swan.TouchScroll(this.verticalUpdateHandler,this);
        }

        private horizontalUpdateHandler(scrollPos:number):void {
            this._viewport.scrollH = scrollPos;
        }

        private verticalUpdateHandler(scrollPos:number):void {
            this._viewport.scrollV = scrollPos;
        }

        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。默认值：5 。
         */
        public static scrollThreshold:number = 5;

        protected measure():void {
            var viewport = this._viewport;
            if (viewport) {
                var bounds = lark.$TempRectangle;
                viewport.getPreferredBounds(bounds);
                this.setMeasuredSize(bounds.width, bounds.height);
            }
            else {
                this.setMeasuredSize(0, 0);
            }
        }


        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            var viewport = this._viewport;
            if (viewport) {
                viewport.setLayoutBoundsPosition(0, 0);
                viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
            }
        }


        /**
         * 垂直方向是否允许滚动的策略，参见 ScrollPolicy 类定义的常量。默认值：ScrollPolicy.AUTO
         */
        public scrollPolicyV:string = ScrollPolicy.AUTO;

        /**
         * 水平方向是否允许滚动的策略，参见ScrollPolicy类定义的常量。默认值：ScrollPolicy.AUTO
         */
        public scrollPolicyH:string = ScrollPolicy.AUTO;

        private _viewport:IViewport;

        /**
         * 要滚动的视域组件。
         */
        public get viewport():IViewport {
            return this._viewport;
        }

        public set viewport(value:IViewport) {
            if (value == this._viewport)
                return;
            this.uninstallViewport();
            this._viewport = value;
            this.installViewport();
        }

        /**
         * 安装并初始化视域组件
         */
        private installViewport():void {
            var viewport = this._viewport;
            if (viewport) {
                viewport.scrollEnabled = true;
                viewport.on(lark.TouchEvent.TOUCH_BEGIN, this.onViewportTouchBegin, this);
                viewport.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.on(lark.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this.addChildAt(viewport, 0);
            }
        }

        /**
         * 卸载视域组件
         */
        private uninstallViewport():void {
            var viewport = this._viewport;
            if (viewport) {
                viewport.scrollEnabled = false;
                viewport.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onViewportTouchBegin, this);
                viewport.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this.removeChild(viewport);
            }
        }

        private onTouchEndCapture(event:lark.TouchEvent):void {
            if (!this.delayTouchBeginEvent) {
                return;
            }
            this.onTouchBeginTimer();
        }

        private touchBeginTimer:lark.Timer;
        private delayTouchBeginEvent:lark.TouchEvent;

        /**
         * 若这个Scroller可以滚动，阻止当前事件，延迟100ms再抛出。
         */
        private onTouchBeginCapture(event:lark.TouchEvent):void {
            var canScroll:boolean = this.checkScrollPolicy();
            if (!canScroll) {
                return;
            }

            var target:lark.DisplayObject = event.target;
            while (target != this) {
                if (target instanceof Scroller) {
                    canScroll = (<Scroller><any> target).checkScrollPolicy();
                    if (canScroll) {
                        return;
                    }
                }
                target = target.parent;
            }
            event.stopPropagation();
            var touchEvent = lark.Event.create(lark.TouchEvent, event.$type, event.$bubbles, event.$cancelable);
            touchEvent.$setTo(event.$stageX, event.$stageY, event.touchPointID);
            touchEvent.$target = event.$target;
            this.delayTouchBeginEvent = touchEvent;
            if (!this.touchBeginTimer) {
                this.touchBeginTimer = new lark.Timer(100, 1);
                this.touchBeginTimer.on(lark.TimerEvent.TIMER_COMPLETE, this.onTouchBeginTimer, this);
            }
            this.touchBeginTimer.start();
            this.onTouchBegin(event);
        }

        private onTouchBeginTimer(e?:lark.TimerEvent):void {
            this.touchBeginTimer.stop();
            var event = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null;
            var viewport = this._viewport;
            if (!viewport) {
                return;
            }
            var target:lark.DisplayObject = event.$target;
            var list = this.$getPropagationList(target);
            var length = list.length;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === viewport) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, startIndex + 1);
            var targetIndex = list.indexOf(event.$target);
            this.$emitPropagationEvent(event, list, targetIndex);
            lark.Event.release(event);
        }

        /**
         * 鼠标按下时的偏移量
         */
        private offsetPointX:number = 0;
        private offsetPointY:number = 0;

        private touchStartX:number = 0;
        private touchStartY:number = 0;
        private touchMoved:boolean = false;

        private horizontalCanScroll:boolean;
        private verticalCanScroll:boolean;

        /**
         * 检查当前滚动策略，若有一个方向可以滚动，返回true。
         */
        private checkScrollPolicy():boolean {
            var viewport:IViewport = this._viewport;
            var hCanScroll:boolean;
            var values = viewport.$uiValues;
            switch (this.scrollPolicyH) {
                case "auto":
                    if (values[sys.UIValues.contentWidth] > values[sys.UIValues.width]) {
                        hCanScroll = true;
                    }
                    else {
                        hCanScroll = false;
                    }
                    break;
                case "on":
                    hCanScroll = true;
                    break;
                case "off":
                    hCanScroll = false;
                    break;
            }
            this.horizontalCanScroll = hCanScroll;

            var vCanScroll:boolean;
            switch (this.scrollPolicyV) {
                case "auto":
                    if (values[sys.UIValues.contentHeight] > values[sys.UIValues.height]) {
                        vCanScroll = true;
                    }
                    else {
                        vCanScroll = false;
                    }
                    break;
                case "on":
                    vCanScroll = true;
                    break;
                case "off":
                    vCanScroll = false;
                    break;
            }
            this.verticalCanScroll = vCanScroll;
            return hCanScroll || vCanScroll;
        }

        private touchScrollH:TouchScroll;
        private touchScrollV:TouchScroll;

        private onViewportTouchBegin(event:lark.TouchEvent):void {
            if (event.$target == this._viewport) {
                this.onTouchBegin(event);
            }
        }

        private onTouchBegin(event:lark.TouchEvent):void {
            if (event.isDefaultPrevented()) {
                return;
            }
            if (!this.checkScrollPolicy()) {
                return;
            }
            this.touchScrollV.stop();
            this.touchScrollH.stop();
            var values = this._viewport.$uiValues;
            this.touchStartX = event.$stageX;
            this.touchStartY = event.$stageY;
            this.offsetPointX = values[sys.UIValues.scrollH] + event.$stageX;
            this.offsetPointY = values[sys.UIValues.scrollV] + event.$stageY;

            if (this.horizontalCanScroll) {
                this.touchScrollH.start(event.$stageX, values[sys.UIValues.scrollH],
                    values[sys.UIValues.contentWidth] - values[sys.UIValues.width]);
            }
            if (this.verticalCanScroll) {
                this.touchScrollV.start(event.$stageY, values[sys.UIValues.scrollV],
                    values[sys.UIValues.contentHeight] - values[sys.UIValues.height]);
            }
            var stage = this.$stage;
            stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.preventDefault();
        }

        private onTouchMove(event:lark.TouchEvent):void {
            if (!this.touchMoved) {
                if (Math.abs(this.touchStartX - event.$stageX) < Scroller.scrollThreshold &&
                    Math.abs(this.touchStartY - event.$stageY) < Scroller.scrollThreshold) {
                    return;
                }
                this.touchMoved = true;
            }
            if (this.delayTouchBeginEvent) {
                this.delayTouchBeginEvent = null;
                this.touchBeginTimer.stop();
            }
            var viewport = this._viewport;
            var values = viewport.$uiValues;
            if (this.horizontalCanScroll) {
                this.touchScrollH.update(event.$stageX, values[sys.UIValues.scrollH],
                    values[sys.UIValues.contentWidth] - values[sys.UIValues.width]);
                var hsp = this.offsetPointX - event.$stageX;
                if (hsp < 0) {
                    hsp *= 0.5;
                }
                if (hsp > values[sys.UIValues.contentWidth] - values[sys.UIValues.width]) {
                    hsp = (hsp + values[sys.UIValues.contentWidth] - values[sys.UIValues.width]) * 0.5
                }
                viewport.scrollH = hsp;
            }

            if (this.verticalCanScroll) {
                this.touchScrollV.update(event.$stageY, values[sys.UIValues.scrollV],
                    values[sys.UIValues.contentHeight] - values[sys.UIValues.height]);
                var vsp = this.offsetPointY - event.$stageY;
                if (vsp < 0) {
                    vsp *= 0.5;
                }
                if (vsp > values[sys.UIValues.contentHeight] - values[sys.UIValues.height]) {
                    vsp = (vsp + values[sys.UIValues.contentHeight] - values[sys.UIValues.height]) * 0.5;
                }
                viewport.scrollV = vsp;
            }
        }

        private onTouchEnd(event:lark.Event):void {
            this.touchMoved = false;
            var stage:lark.Stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            var viewport:IViewport = this._viewport;
            var values = viewport.$uiValues;
            var touchScrollH = this.touchScrollH;
            if (touchScrollH.started) {
                touchScrollH.finish(values[sys.UIValues.scrollH],
                    values[sys.UIValues.contentWidth] - values[sys.UIValues.width]);
            }
            var touchScrollV = this.touchScrollV;
            if (touchScrollV.started) {
                touchScrollV.finish( values[sys.UIValues.scrollV],
                    values[sys.UIValues.contentHeight] - values[sys.UIValues.height]);
            }
        }

    }

    registerProperty(Scroller, "viewport", "any", true);
    lark.registerClass(Scroller, Types.Scroller);
}