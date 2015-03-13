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

    import TextBlock = text.TextBlock;

    /**
     * TextField 类用于创建显示对象以显示和输入文本。 
     * 可以使用 TextField 类的方法和属性对文本字段进行操作。
     * Lark 提供了多种在运行时设置文本格式的方法。TextFormat 类允许您设置 TextField 对象的字符和段落格式。
     * 
     */
    class TextField extends DisplayObjectContainer {
        /**
         * 创建一个TextField对象
         */
        public constructor() {
            super();
        }


        protected _multiline = false;
        public get multiline(): boolean {
            return this._multiline;
        }
        public set multiline(value: boolean) {
            if (value == this._multiline)
                return;
            this._multiline = value;

            //todo:dirty
        }

        
        protected _wordWrap = false;
        public get wordWrap(): boolean {
            return this._wordWrap;
        }
        public set wordWrap(value: boolean) {
            if (value == this._wordWrap)
                return;
            this._wordWrap = value;

            //todo:dirty
        }
    }
}