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
     * 滚动条基类
     */
    export class ScrollBarBase extends Component {
        /**
         * 创建一个ScrollBarBase实例
         */
        public constructor() {
            super();
        }

        /**
         * [SkinPart]滑块显示对象
         */
        public thumb:swan.UIComponent = null;

        $viewport:IViewport = null;

        public get viewport():IViewport {
            return this.$viewport;
        }

        public set viewport(value:IViewport) {
            if (value == this.$viewport) {
                return;
            }
            var viewport = this.$viewport;
            if (viewport)
            {
                viewport.removeListener(swan.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged,this);
                viewport.removeListener(lark.Event.RESIZE, this.onViewportResize,this);
            }
            this.$viewport = value;
            if (value)
            {
                value.on(swan.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged,this);
                value.on(lark.Event.RESIZE, this.onViewportResize,this);
            }
            this.invalidateDisplayList();
        }

        private onViewportResize(event?:lark.Event):void{
            this.invalidateDisplayList();
        }

        protected onPropertyChanged(event:swan.PropertyEvent):void{

        }
    }

    lark.registerClass(ScrollBarBase,Types.ScrollBarBase);
}