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
     * @language en_US
     * 滚动条基类
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 滚动条基类
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class ScrollBarBase extends Component {
        /**
         * @language en_US
         * 创建一个ScrollBarBase实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个ScrollBarBase实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
        }

        /**
         * @language en_US
         * [SkinPart]滑块显示对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart]滑块显示对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public thumb:swan.UIComponent = null;

        /**
         * @private
         */
        $viewport:IViewport = null;

        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
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

        /**
         * @private
         * 
         * @param event 
         */
        private onViewportResize(event?:lark.Event):void{
            this.invalidateDisplayList();
        }

        /**
         * @language en_US
         * 
         * @param event 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @param event 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onPropertyChanged(event:swan.PropertyEvent):void{

        }
    }

    /**
     * @private
     */
    lark.registerClass(ScrollBarBase,Types.ScrollBarBase);
}