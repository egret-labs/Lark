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


module lark {
    /**
     * 用于渲染的文本块
     */
    export class TextSpan extends LarkObject {
        constructor(
            text: string ,
            style:ITextStyle,
            textWidth: number ,
            length: number ,
            x: number,
            y:number) {
            super();
            this.text = text;
            this.style = style;
            this.width = textWidth;
            this.x = +x || 0;
            this.y = +y || 0;
        }

        
        /**
         * 需要显示的文本
         */
        public text: string;
        /**
         * 文本块相对于父级的 x 坐标
         */
        public x: number;
        /**
         * 文本块相对于父级的 y 坐标
         */
        public y: number;
        /**
         * 需要显示的文本宽度
         */
        public width: number;
        /**
         * 文本的样式
         */
        public style: ITextStyle;
        
        /**
         * 文本块的高度
         */
        public get height() {
            return Math.max(this.style.lineHeight, this.style.fontSize);
        }

        $toFontString(includeSize = false) {
            return this.style.toFontString(includeSize);
        }

        $toColorString() {
            var value = this.style.color;
            if(value < 0)
                value = 0;
            if(value > 16777215)
                value = 16777215;
            var color:string = value.toString(16).toUpperCase();
            while(color.length<6){
                color = "0"+color;
            }
            return "#"+color;
        }
    }
}