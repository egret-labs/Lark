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
     * @private
     */
    const enum Keys {
        scrollPolicyV,
        scrollPolicyH,
        autoHideTimer,
        touchStartX,
        touchStartY,
        touchMoved,
        horizontalCanScroll,
        verticalCanScroll,
        touchScrollH,
        touchScrollV,
        delayTouchTimer,
        delayTouchEvent,
        viewport
    }
    /**
     * @language en_US
     * 滚动条组件
     *
     * @event swan.UIEvent.CHANGE_START 滚动位置改变开始
     * @event swan.UIEvent.CHANGE_END 滚动位置改变结束
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 滚动条组件
     *
     * @event swan.UIEvent.CHANGE_START 滚动位置改变开始
     * @event swan.UIEvent.CHANGE_END 滚动位置改变结束
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Scroller extends Component {

        /**
         * @language en_US
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。默认值：5 。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。默认值：5 。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public static scrollThreshold:number = 5;

        /**
         * @language en_US
         * 创建一个 Scroller 实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Scroller 实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            var touchScrollH = new sys.TouchScroll(this.horizontalUpdateHandler, this.horizontalEndHandler, this);
            var touchScrollV = new sys.TouchScroll(this.verticalUpdateHandler, this.verticalEndHanlder, this);
            this.$Scroller = {
                0: "auto",          //scrollPolicyV,
                1: "auto",          //scrollPolicyH,
                2: null,            //autoHideTimer,
                3: 0,               //touchStartX,
                4: 0,               //touchStartY,
                5: false,           //touchMoved,
                6: false,           //horizontalCanScroll,
                7: false,           //verticalCanScroll,
                8: touchScrollH,    //touchScrollH,
                9: touchScrollV,    //touchScrollV
                10: null,           //delayTouchTimer,
                11: null,           //delayTouchEvent
                12: null,           //viewport
            };
        }

        /**
         * @private
         */
        $Scroller:Object;
        /**
         * @language en_US
         * [SkinPart] 水平滚动条
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart] 水平滚动条
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public horizontalScrollBar:swan.HScrollBar = null;
        /**
         * @language en_US
         * [SkinPart] 垂直滚动条
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart] 垂直滚动条
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public verticalScrollBar:swan.VScrollBar = null;

        /**
         * @language en_US
         * 垂直方向是否允许滚动的策略，参见 ScrollPolicy 类定义的常量。默认值：ScrollPolicy.AUTO
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 垂直方向是否允许滚动的策略，参见 ScrollPolicy 类定义的常量。默认值：ScrollPolicy.AUTO
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get scrollPolicyV():string {
            return this.$Scroller[Keys.scrollPolicyV];
        }

        public set scrollPolicyV(value:string) {
            this.$Scroller[Keys.scrollPolicyV] = value;
        }

        /**
         * @language en_US
         * 水平方向是否允许滚动的策略，参见ScrollPolicy类定义的常量。默认值：ScrollPolicy.AUTO
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 水平方向是否允许滚动的策略，参见ScrollPolicy类定义的常量。默认值：ScrollPolicy.AUTO
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get scrollPolicyH():string {
            return this.$Scroller[Keys.scrollPolicyH];
        }

        public set scrollPolicyH(value:string) {
            this.$Scroller[Keys.scrollPolicyH] = value;
        }

        /**
         * @language en_US
         * 要滚动的视域组件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要滚动的视域组件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get viewport():IViewport {
            return this.$Scroller[Keys.viewport];
        }

        public set viewport(value:IViewport) {
            var values = this.$Scroller;
            if (value == values[Keys.viewport])
                return;
            this.uninstallViewport();
            values[Keys.viewport] = value;
            this.installViewport();
        }

        /**
         * @private
         * 安装并初始化视域组件
         */
        private installViewport():void {
            var viewport = this.viewport;
            if (viewport) {
                viewport.scrollEnabled = true;
                viewport.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.on(lark.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this.addChildAt(viewport, 0);
            }
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = viewport;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = viewport;
            }
        }

        /**
         * @private
         * 卸载视域组件
         */
        private uninstallViewport():void {
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = null;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = null;
            }
            var viewport = this.viewport;
            if (viewport) {
                viewport.scrollEnabled = false;
                viewport.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this.removeChild(viewport);
            }
        }

        /**
         * @language en_US
         * 
         * @param skin 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @param skin 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setSkin(skin:Skin):void {
            super.setSkin(skin);
            var viewport = this.viewport;
            if (viewport) {
                this.addChildAt(viewport, 0);
            }
        }

        /**
         * @private
         * 
         * @param event 
         */
        private onTouchEndCapture(event:lark.TouchEvent):void {
            if (this.$Scroller[Keys.delayTouchEvent]) {
                this.delayEmitEvent(event);
            }
        }

        /**
         * @private
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
                target = target.$parent;
            }
            this.delayEmitEvent(event);
            this.onTouchBegin(event);
        }

        /**
         * @private
         * 
         * @param event 
         */
        private delayEmitEvent(event:lark.TouchEvent):void {
            var values = this.$Scroller;
            if (values[Keys.delayTouchEvent]) {
                this.onDelayTouchEventTimer();
            }
            event.stopPropagation();
            var touchEvent = lark.Event.create(lark.TouchEvent, event.$type, event.$bubbles, event.$cancelable);
            touchEvent.$setTo(event.$stageX, event.$stageY, event.touchPointID);
            touchEvent.$target = event.$target;
            values[Keys.delayTouchEvent] = touchEvent;
            if (!values[Keys.delayTouchTimer]) {
                values[Keys.delayTouchTimer] = new lark.Timer(100, 1);
                values[Keys.delayTouchTimer].on(lark.TimerEvent.TIMER_COMPLETE, this.onDelayTouchEventTimer, this);
            }
            values[Keys.delayTouchTimer].start();
        }

        /**
         * @private
         * 
         * @param e 
         */
        private onDelayTouchEventTimer(e?:lark.TimerEvent):void {
            var values = this.$Scroller;
            values[Keys.delayTouchTimer].stop();
            var event = values[Keys.delayTouchEvent];
            values[Keys.delayTouchEvent] = null;
            var viewport = values[Keys.viewport];
            if (!viewport) {
                return;
            }
            var target:lark.DisplayObject = event.$target;
            var list = this.$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === viewport) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, startIndex + 1);
            targetIndex -= startIndex + 1;
            this.$emitPropagationEvent(event, list, targetIndex);
            lark.Event.release(event);
        }

        /**
         * @private
         * 检查当前滚动策略，若有一个方向可以滚动，返回true。
         */
        private checkScrollPolicy():boolean {
            var values = this.$Scroller;
            var viewport:IViewport = values[Keys.viewport];
            var hCanScroll:boolean;
            var uiValues = viewport.$UIComponent;
            switch (values[Keys.scrollPolicyH]) {
                case "auto":
                    if (viewport.contentWidth > uiValues[sys.UIKeys.width]) {
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
            values[Keys.horizontalCanScroll] = hCanScroll;

            var vCanScroll:boolean;
            switch (values[Keys.scrollPolicyV]) {
                case "auto":
                    if (viewport.contentHeight > uiValues[sys.UIKeys.height]) {
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
            values[Keys.verticalCanScroll] = vCanScroll;
            return hCanScroll || vCanScroll;
        }

        /**
         * @private
         * 
         * @param event 
         */
        private onTouchBegin(event:lark.TouchEvent):void {
            if (event.isDefaultPrevented()) {
                return;
            }
            if (!this.checkScrollPolicy()) {
                return;
            }
            var values = this.$Scroller;
            values[Keys.touchScrollV].stop();
            values[Keys.touchScrollH].stop();
            var viewport = values[Keys.viewport];
            values[Keys.touchStartX] = event.$stageX;
            values[Keys.touchStartY] = event.$stageY;

            var uiValues = viewport.$UIComponent;

            if (values[Keys.horizontalCanScroll]) {
                values[Keys.touchScrollH].start(event.$stageX, viewport.scrollH,
                    viewport.contentWidth - uiValues[sys.UIKeys.width]);
            }
            if (values[Keys.verticalCanScroll]) {
                values[Keys.touchScrollV].start(event.$stageY, viewport.scrollV,
                    viewport.contentHeight - uiValues[sys.UIKeys.height]);
            }
            var stage = this.$stage;
            stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.preventDefault();
        }

        /**
         * @private
         * 
         * @param event 
         */
        private onTouchMove(event:lark.TouchEvent):void {
            var values = this.$Scroller;
            if (!values[Keys.touchMoved]) {
                if (Math.abs(values[Keys.touchStartX] - event.$stageX) < Scroller.scrollThreshold &&
                    Math.abs(values[Keys.touchStartY] - event.$stageY) < Scroller.scrollThreshold) {
                    return;
                }
                values[Keys.touchMoved] = true;
                var horizontalBar = this.horizontalScrollBar;
                var verticalBar = this.verticalScrollBar;
                if (horizontalBar && values[Keys.horizontalCanScroll]) {
                    horizontalBar.visible = true;
                }
                if (verticalBar && values[Keys.verticalCanScroll]) {
                    verticalBar.visible = true;
                }
                if(values[Keys.autoHideTimer]){
                    values[Keys.autoHideTimer].reset();
                }
            }
            UIEvent.emitUIEvent(this, UIEvent.CHANGE_START);
            if (values[Keys.delayTouchEvent]) {
                values[Keys.delayTouchEvent] = null;
                values[Keys.delayTouchTimer].stop();
            }
            var viewport = values[Keys.viewport];
            var uiValues = viewport.$UIComponent;
            if (values[Keys.horizontalCanScroll]) {
                values[Keys.touchScrollH].update(event.$stageX, viewport.contentWidth - uiValues[sys.UIKeys.width]);
            }
            if (values[Keys.verticalCanScroll]) {
                values[Keys.touchScrollV].update(event.$stageY, viewport.contentHeight - uiValues[sys.UIKeys.height]);
            }
        }


        /**
         * @private
         * 
         * @param event 
         */
        private onTouchEnd(event:lark.Event):void {
            var values = this.$Scroller;
            values[Keys.touchMoved] = false;
            var stage:lark.Stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            var viewport:IViewport = values[Keys.viewport];
            var uiValues = viewport.$UIComponent;
            if (values[Keys.horizontalCanScroll]) {
                values[Keys.touchScrollH].finish(viewport.scrollH, viewport.contentWidth - uiValues[sys.UIKeys.width]);
            }
            if (values[Keys.verticalCanScroll]) {
                values[Keys.touchScrollV].finish(viewport.scrollV, viewport.contentHeight - uiValues[sys.UIKeys.height]);
            }
        }

        /**
         * @private
         * 
         * @param scrollPos 
         */
        private horizontalUpdateHandler(scrollPos:number):void {
            this.$Scroller[Keys.viewport].scrollH = scrollPos;
        }

        /**
         * @private
         * 
         * @param scrollPos 
         */
        private verticalUpdateHandler(scrollPos:number):void {
            this.$Scroller[Keys.viewport].scrollV = scrollPos;
        }

        /**
         * @private
         * 
         */
        private horizontalEndHandler():void {
            if(!this.$Scroller[Keys.touchScrollV].isPlaying()){
                this.onChangeEnd();
            }
        }

        /**
         * @private
         * 
         */
        private verticalEndHanlder():void {
            if(!this.$Scroller[Keys.touchScrollH].isPlaying()){
                this.onChangeEnd();
            }
        }

        /**
         * @private
         * 
         */
        private onChangeEnd():void{
            var values = this.$Scroller;
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar && horizontalBar.visible || verticalBar && verticalBar.visible) {
                if (!values[Keys.autoHideTimer]) {
                    values[Keys.autoHideTimer] = new lark.Timer(200, 1);
                    values[Keys.autoHideTimer].on(lark.TimerEvent.TIMER_COMPLETE, this.onAutoHideTimer, this);
                }
                values[Keys.autoHideTimer].reset();
                values[Keys.autoHideTimer].start();
            }

            UIEvent.emitUIEvent(this,UIEvent.CHANGE_END);

        }

        /**
         * @private
         * 
         * @param event 
         */
        private onAutoHideTimer(event:lark.TimerEvent):void {
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar) {
                horizontalBar.visible = false;
            }
            if (verticalBar) {
                verticalBar.visible = false;
            }
        }

        /**
         * @language en_US
         * 
         * @param unscaledWidth 
         * @param unscaledHeight 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @param unscaledWidth 
         * @param unscaledHeight 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            var viewport = this.viewport;
            if (viewport) {
                viewport.setLayoutBoundsPosition(0, 0);
                viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
            }

        }

        /**
         * @language en_US
         * 
         * @param partName 
         * @param instance 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @param partName 
         * @param instance 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            if (instance == this.horizontalScrollBar) {
                this.horizontalScrollBar.touchChildren = false;
                this.horizontalScrollBar.touchEnabled = false;
                this.horizontalScrollBar.viewport = this.viewport;
                this.horizontalScrollBar.visible = false;
            }
            else if (instance == this.verticalScrollBar) {
                this.verticalScrollBar.touchChildren = false;
                this.verticalScrollBar.touchEnabled = false;
                this.verticalScrollBar.viewport = this.viewport;
                this.verticalScrollBar.visible = false;
            }
        }
    }

    registerProperty(Scroller, "viewport", "swan.IViewport", true);
    lark.registerClass(Scroller, Types.Scroller);
}