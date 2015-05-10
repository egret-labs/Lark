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

module lark.player {
    /**
     * XML节点基类
     */
    export interface XMLNode {
        /**
         * 节点类型，1：XML，2：XMLAttribute，3：XMLText
         */
        nodeType:number;
        /**
         * 节点所属的父级节点
         */
        parentNode: XML;
    }

    /**
     * XML节点对象
     */
    export interface XML extends XMLNode {
        /**
         * 读取一个属性值
         * @param name 要读取的属性名称
         * @returns 返回属性对应的值，若属性不存在返回""。
         */
        getAttribute(name:string):string;

        /**
         * 设置一个属性值
         * @param name 要设置的属性名称
         * @param value 要设置的值
         */
        setAttribute(name:string, value:string);
        /**
         * 当前节点上的属性列表
         */
        attributes:XMLAttribute[];
        /**
         * 当前节点的子节点列表
         */
        childNodes:XMLNode[];
        /**
         * 节点完整名称。例如节点 <e:Button/> 的 nodeName 为：e:Button
         */
        nodeName:string;
        /**
         * 节点的命名空间前缀。例如节点 <e:Button/> 的 prefix 为：e
         */
        prefix: string;
        /**
         * 节点的本地名称。例如节点 <e:Button/> 的 prefix 为：Button
         */
        localName:string;
        /**
         * 节点的命名空间地址。例如节点 <e:Skin xmlns:e="http://ns.egret-labs.org/egret"/> 的 namespaceURI 为： http://ns.egret-labs.org/egret
         */
        namespaceURI: string;
    }

    /**
     * XML文本节点
     */
    export interface XMLText extends XMLNode {
        /**
         * 文本内容
         */
        textContent:string;
    }
    /**
     * XML属性节点
     */
    export interface XMLAttribute extends XMLNode {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 属性值
         */
        value:string;
    }

    export var XML:{
        /**
         * 解析字符串为XML对象
         * @param text 要解析的XML对象。
         */
        parse(text:string):XML;
    };
}