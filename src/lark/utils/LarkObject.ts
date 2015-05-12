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
     * 哈希计数
     */
    var hashCount:number = 1;

    /**
     * Lark顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值，以及isType()快速类型判断方法。
     */
    export class LarkObject {

        /**
         * 创建一个 lark.HashObject 对象
         */
        public constructor() {
            this.$hashCode = hashCount++;
        }

        $hashCode:number;
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         */
        public get hashCode():number {
            return this.$hashCode;
        }

        /**
         * 检查当前对象是否为Lark框架内指定接口或类或其子类的实例。此方法与使用instanceOf关键字相比具有更高的性能，并且能判断接口的实现。
         * @param typeFlag 类或接口的枚举值，请参考lark.Types或lark.gui.Types定义的枚举常量。
         * @returns 返回true表示当前对象是指定类或接口的实例。
         */
        public isType(typeFlag:number):boolean{
            var prototype: any = Object.getPrototypeOf(this);
            return (prototype.__typeFlags__.indexOf(typeFlag)!==-1);
        }
    }
    LarkObject.prototype["__classFlag__"] = 0;
    LarkObject.prototype["__typeFlags__"] = [];
}
