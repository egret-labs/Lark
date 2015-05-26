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
     * 带有标题，关闭按钮，可移动区域的面板组件。注意：当第一次通过触摸交互操作移动面板时，面板的 includeInLayout 属性将会自动被设置为false，
     * 以确保移动不会受到自动布局属性的影响。若之后还需要启用面板在父级容器中的自动布局，需手动设置 includeInLayout 为 true。
     * @event swan.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，监听此事件并调用event.preventDefault()能够阻止面板被关闭。
     */
    export class Panel extends Component {
        /**
         * 创建一个Panel实例
         */
        public constructor() {
            super();
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onWindowMouseDown, this, false, 100);
        }

        /**
         * 在窗体上按下时前置窗口
         */
        private onWindowMouseDown(event:lark.TouchEvent):void {
            this.$parent.addChild(this);
        }

        /**
         * [SkinPart]关闭按钮
         */
        public closeButton:Button = null;

        /**
         * [SkinPart]可移动区域
         */
        public moveArea:lark.DisplayObject = null;

        /**
         * [SkinPart]标题显示对象
         */
        public titleDisplay:IDisplayText = null;

        private _title:string = "";

        /**
         * 标题文本内容
         */
        public get title():string {
            return this._title;
        }

        public set title(value:string) {
            this._title = value;
            if (this.titleDisplay)
                this.titleDisplay.text = this.title;
        }

        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            if (instance == this.titleDisplay) {
                this.titleDisplay.text = this._title;
            }
            else if (instance == this.moveArea) {
                this.moveArea.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.on(lark.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        }

        protected partRemoved(partName:string, instance:any):void {
            super.partRemoved(partName, instance);
            if (instance == this.moveArea) {
                this.moveArea.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.removeListener(lark.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        }

        /**
         * 关闭按钮被点击事件
         */
        protected onCloseButtonClick(event:lark.TouchEvent):void {
            if (UIEvent.emitUIEvent(this, UIEvent.CLOSING)) {
                this.close();
            }
        }

        /**
         * 关闭面板，从父级容器移除自身。
         */
        public close():void {
            if (!this.$parent) {
                return;
            }
            this.$parent.removeChild(this);
        }

        /**
         * 鼠标按下时的偏移量
         */
        private offsetPointX:number = 0;
        private offsetPointY:number = 0;

        /**
         * 在可移动区域按下
         */
        protected onTouchBegin(event:lark.TouchEvent):void {
            this.$includeInLayout = false;
            this.offsetPointX = this.x - event.stageX;
            this.offsetPointY = this.y - event.stageY;
            this.$stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }

        /**
         * 触摸拖拽时的移动事件
         */
        public onTouchMove(event:lark.TouchEvent):void {
            this.x = event.stageX + this.offsetPointX;
            this.y += event.stageY + this.offsetPointY;
        }

        /**
         * 鼠标在舞台上弹起事件
         */
        public onTouchEnd(event:lark.TouchEvent):void {
            this.$stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
    }

    lark.registerClass(Panel, Types.Panel);
}