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
     * TextFormat 类描述字符格式设置信息。使用 TextFormat 类可以为文本字段创建特定的文本格式。
     * 您可以将文本格式应用于静态文本字段和动态文本字段。
     * 
     */
    class TextFormat extends HashObject {

        static $defaultTextFormat: TextFormat = new TextFormat();

        /**
         * 创建一个TextFormat对象
         */
        public constructor() {
            super();
        }

        /**
         * 表示段落的对齐方式。
         */
        public align: string = null;


        /**
         * 表示块缩进，以像素为单位。
         */
        public blockIndent: number = NaN;


        /**
         * 指定文本是否为粗体字。
         */
        public bold: boolean = false;


        /**
         * 表示文本为带项目符号的列表的一部分。
         */
        public bullet: boolean = false;


        /**
         * 表示文本的颜色。
         */
        public color: number = NaN;


        /**
         * 使用此文本格式的文本的字体名称，以字符串形式表示。
         */
        public font: string = null;


        /**
         * 表示从左边距到段落中第一个字符的缩进。
         */
        public indent: number = NaN;


        /**
         * 表示使用此文本格式的文本是否为斜体。
         */
        public italic: boolean = null;


        /**
         * 一个整数，表示行与行之间的垂直间距（称为前导）量。
         */
        public leading: number = NaN;


        /**
         * 段落的左边距，以像素为单位。
         */
        public leftMargin : number = NaN;


        /**
         * 段落的右边距，以像素为单位。
         */
        public rightMargin: number = NaN;


        /**
         * 使用此文本格式的文本的大小（以像素为单位）。
         */
        public size: number = NaN;


        /**
         * 表示显示超链接的目标窗口。
         */
        public target : string = null;


        /**
         * 表示使用此文本格式的文本是带下划线 (true) 还是不带下划线 (false)。
         */
        public underline: boolean = null;


        /**
         * 表示使用此文本格式的文本的目标 URL。
         */
        public url: string = null;
    }
}