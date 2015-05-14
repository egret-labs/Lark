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

module lark.gui {

    var isMobile = Capabilities.isMobile;
    /**
     * 按钮组件
     */
    export class Button extends Component {
        /**
         * 创建一个按钮实例
         */
        public constructor() {
            super();
            this.touchChildren = false;
            this.on(TouchEvent.TOUCH_ENTER, this.mouseEventHandler, this);
            this.on(TouchEvent.TOUCH_LEAVE, this.mouseEventHandler, this);
            this.on(TouchEvent.TOUCH_BEGIN, this.mouseEventHandler, this);
            this.on(TouchEvent.TOUCH_END, this.mouseEventHandler, this);
        }

        /**
         * [SkinPart]按钮上的文本标签
         */
        public labelDisplay:IDisplayText = null;

        private _label:string = "";
        /**
         * 要在按钮上显示的文本
         */
        public get label():string {
            return this._label;
        }

        public set label(value:string) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        }

        /**
         * [SkinPart]按钮上的图标显示对象。
         */
        public iconDisplay:Image = null;

        private _icon:string|BitmapData = null;
        /**
         * 要在按钮上显示的图标数据
         */
        public get icon():string|BitmapData {
            return this._icon;
        }

        public set icon(value:string|BitmapData) {
            this._icon = value;
            if (this.iconDisplay) {
                this.iconDisplay.source = value;
            }
        }

        /**
         * 指示触摸点否位于按钮上。
         */
        private hovered:boolean = false;

        /**
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，是否按下鼠标以及触摸点是否在按钮上。
         */
        private touchCaptured:boolean = false;

        private _stickyHighlighting:boolean = false;
        /**
         * 如果为 true，则按钮会在用户按下它时显示其按下时的外观，并在用户将触摸点拖离时继续显示此外观。默认值为 false。
         */
        public get stickyHighlighting():boolean {
            return this._stickyHighlighting
        }

        public set stickyHighlighting(value:boolean) {
            if (value == this._stickyHighlighting)
                return;

            this._stickyHighlighting = value;
            this.invalidateSkinState();
        }

        /**
         * 添加舞台鼠标弹起事件监听
         */
        private addStageMouseHandlers():void {
            this.$stage.on(TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            this.$stage.on(Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        }

        /**
         * 鼠标事件处理
         */
        protected mouseEventHandler(event:TouchEvent):void {
            switch (event.$type) {
                case TouchEvent.TOUCH_ENTER:
                    if(event.touchDown&&!this.touchCaptured){
                        return;
                    }
                    this.hovered = true;
                    break;

                case TouchEvent.TOUCH_LEAVE:
                    this.hovered = false;
                    break;

                case TouchEvent.TOUCH_BEGIN:
                    this.addStageMouseHandlers();
                    this.touchCaptured = true;
                    break;

                case TouchEvent.TOUCH_END:
                    if (event.target == this) {
                        this.hovered = true;
                        if (this.touchCaptured) {
                            this.buttonReleased();
                            this.touchCaptured = false;
                        }
                    }
                    break;
            }
            this.invalidateSkinState();
            event.updateAfterEvent();
        }

        /**
         * 舞台上鼠标弹起事件
         */
        private stage_mouseUpHandler(event:Event):void {
            this.$stage.removeListener(TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            this.$stage.removeListener(Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);

            if (event.target == this)
                return;

            this.touchCaptured = false;
            this.invalidateSkinState();
        }

        /**
         * 返回要应用到外观的状态的名称
         */
        protected getCurrentSkinState():string {
            if (!this.$hasFlags(player.UIFlags.enabled))
                return "disabled";

            if (this.touchCaptured && (this.hovered || this.stickyHighlighting))
                return "down";

            if (!isMobile&&(this.hovered || this.touchCaptured) &&
                this.$skin && this.$skin.hasState("over"))
                return "over";

            return "up";
        }

        /**
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称
         * @param instance 要附加的皮肤部件实例
         */
        protected partAdded(partName:string, instance:any):void {
            if (instance === this.labelDisplay) {
                this.labelDisplay.text = this._label;
            }
            else if (instance == this.iconDisplay) {
                this.iconDisplay.source = this._icon;
            }
        }

        /**
         * 按钮弹起事件
         */
        protected buttonReleased():void {
        }
    }

    registerClass(Button, Types.Button);
}