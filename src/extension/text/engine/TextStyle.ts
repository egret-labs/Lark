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
        textColor?: number;

        /**
        * 设置显示对象浮动的位置
        * 此属性一般用于图文混排时，设置图片相对于段落的位置
        */
        float?: string;

        /**
        * 设置一行中不同高度的文本或显示对象的纵向对齐方式，请参照 lark.Align
        */
        textAlignV?: string;

        fontString?: string;
        colorString?: string;
    }

    export class TextStyleWarpper<T extends ITextStyle> extends LarkObject implements ITextStyle {
        baseStyle: T;
        currentStyle: T;

        get fontFamily() {
            return this.currentStyle.fontFamily || this.baseStyle.fontFamily || '"Helvetica Neue", Helvetica, Arial, sans-serif';
        }

        get fontSize() {
            return this.currentStyle.fontSize || this.baseStyle.fontSize || 30;
        }
        get textColor() {
            return this.currentStyle.textColor || this.baseStyle.textColor || 0x000000;
        }
        get bold() {
            return this.currentStyle.bold || this.baseStyle.bold || false;
        }
        get italic() {
            return this.currentStyle.italic || this.baseStyle.italic || false;
        }
        get float() {
            return this.currentStyle.float || this.baseStyle.float || HorizontalAlign.NONE;
        }
        get textAlignV() {
            return this.currentStyle.textAlignV || this.baseStyle.textAlignV || VerticalAlign.TOP;
        }
    }
}