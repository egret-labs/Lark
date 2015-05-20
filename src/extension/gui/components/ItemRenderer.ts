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
     * 项呈示器基类，通常作为List类的项目视图模板。
     */
    export class ItemRenderer extends Group implements IItemRenderer {

        public constructor() {
            super();
            this.on(TouchEvent.TOUCH_ENTER, this.mouseEventHandler, this);
            this.on(TouchEvent.TOUCH_LEAVE, this.mouseEventHandler, this);
            this.on(TouchEvent.TOUCH_BEGIN, this.mouseEventHandler, this);
            this.on(TouchEvent.TOUCH_END, this.mouseEventHandler, this);
        }

        private _data:any = null;
        /**
         * 要呈示或编辑的数据。
         */
        public get data():any {
            return this._data;
        }

        public set data(value:any) {
            this._data = value;
            this.dataChanged();
        }

        /**
         * 子类复写此方法以在 data 数据源发生改变时跟新显示列表。
         */
        protected dataChanged():void {

        }

        private _selected:boolean = false;
        /**
         * 如果项呈示器可以将其自身显示为已选中，则为 true。
         */
        public get selected():boolean {
            return this._selected;
        }

        public set selected(value:boolean) {
            if (this._selected == value)
                return;
            this._selected = value;
            this.invalidateState();
        }

        /**
         * 项呈示器的数据提供程序中的项目索引。
         */
        public itemIndex:number = -1;

        /**
         * 指示触摸点否位于按钮上。
         */
        private hovered:boolean = false;

        /**
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，是否按下鼠标以及触摸点是否在按钮上。
         */
        private touchCaptured:boolean = false;

        /**
         * 鼠标事件处理
         */
        protected mouseEventHandler(event:TouchEvent):void {
            switch (event.$type) {
                case TouchEvent.TOUCH_ENTER:
                    if (event.touchDown && !this.touchCaptured) {
                        return;
                    }
                    this.hovered = true;
                    break;

                case TouchEvent.TOUCH_LEAVE:
                    this.hovered = false;
                    break;

                case TouchEvent.TOUCH_BEGIN:
                    this.$stage.on(TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                    this.touchCaptured = true;
                    break;

                case TouchEvent.TOUCH_END:
                    this.hovered = true;
                    this.touchCaptured = false;
                    break;
            }
            this.invalidateState();
            event.updateAfterEvent();
        }

        /**
         * 舞台上鼠标弹起事件
         */
        private stage_mouseUpHandler(event:Event):void {
            //this.$stage.removeListener(TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            this.touchCaptured = false;
            this.invalidateState();
        }

        /**
         * 返回要应用到外观的状态的名称
         */
        protected getCurrentState():string {
            if (this._selected)
                return "down";
            if (this.touchCaptured && this.hovered)
                return "down";

            if (!isMobile && (this.hovered || this.touchCaptured) && this.hasState("over"))
                return "over";

            return "up";
        }
    }

    registerClass(ItemRenderer, Types.ItemRenderer, [Types.IItemRenderer])
}