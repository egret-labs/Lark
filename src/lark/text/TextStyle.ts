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
    * 文本的对齐方式
    */
    export class Align {
        static LEFT: string = "left";
        static CENTER: string = "left";
        static RIGHT: string = "right";
        static TOP = "top";
        static MIDDLE = "middle";
        static BOTTOM = "bottom";
        static NONE = "";
    }
    
    /**
    * 定义多样式文本的样式
    */
    export interface ITextStyle {
        /**
        * 需要使用的字体集
        */
        fontFamily?: string;

        /**
        * 设置字号，以像素为单位
        */
        fontSize?: number;

        /**
        * 设置是否需要粗体
        */
        bold?: boolean;

        /**
        * 设置是否需要斜体
        */
        italic?: boolean;

        /**
        * 设置文本颜色，数字格式 如 0x000000 表示黑色
        */
        color?: number;

        /**
        * 设置显示对象浮动的位置
        * 此属性一般用于图文混排时，设置图片相对于段落的位置
        */
        float?: string;

        /**
        * 设置一行中不同高度的文本或显示对象的纵向对齐方式，请参照 lark.Align
        */
        verticalAlign?: string;

        /**
        * 设置段落中文本的水平对齐方式
        */
        align?: string;
        
        /**
        * 根据样式生成 Context 需要的字体字符串
        */
        toFontString?(includeSize?:boolean):string;
    }

    Object.defineProperty(Object.prototype, "toFontString", {
        value: function (includeSize = false) {
            var style = <ITextStyle>this;
            var font = "";
            if (style.italic)
                font += "italic ";
            if (style.bold)
                font += "bold ";
            if (includeSize)
                font += (style.fontSize || 12) + "px ";
            font += (style.fontFamily || "sans-serif");
            return font;
        },
        enumerable: false,
        writable:false
    });
}