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

    /**
     * EXML皮肤文件运行时解析工具
     */
    export class EXML {

        /**
         * 解析一个EXML文件的文本内容为一个皮肤类。
         * @param text 要解析的EXML文件内容
         * @param className 皮肤对应的类名,例如 lark.gui.ButtonSkin。传入此参数，在解析完成后将会自动注册皮肤类定义到全局，
         * 之后您可以通过lark.getDefinitionByName()方法获取这个皮肤的类定义。若不传入将不注册类定义。
         */
        public static parse(text:string,className?:string):Function {
            var xml = player.XML.parse(text);
            var clazz = parser.parse(xml);
            if(className&&clazz){
                var paths = className.split(".");
                var length = paths.length;
                var definition = __global;
                for (var i = 0; i < length-1; i++) {
                    var path = paths[i];
                    definition = definition[path]||(definition[path]={});
                }
                definition[paths[length-1]] = clazz;
            }
            return clazz;
        }

        public static describe(instance:any):any {
            config.describe(instance);
            return config.properties;
        }
    }

    class EXMLParser {

        public parse(xml:player.XML):Function {
            return null;
        }
    }

    var hashCount = 0;

    class EXMLConfig {

        public properties:any = {};

        public describe(instance:any):void {
            var prototype = Object.getPrototypeOf(instance);
            var info = this.describeSuper(prototype, instance);
            if (!info) {
                return;
            }
            this.updateInfo(info, instance, Object.keys(instance));
        }

        public describeSuper(prototype:any, instance:any):any {
            if (!prototype || prototype.hasOwnProperty("__hashCode__")) {
                return null;
            }
            prototype.__hashCode__ = hashCount++;
            var info = {};
            this.properties[prototype.__hashCode__] = info;
            var superClazz = Object.getPrototypeOf(prototype);
            if (superClazz) {
                this.describeSuper(superClazz,instance);
                info["super"] = superClazz.__hashCode__;
            }
            this.updateInfo(info, instance, Object.keys(prototype));
            return info;
        }

        private updateInfo(info:any, instance:any, keys:string[]):void {
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                var type = typeof instance[key];
                if (type == "function"||key.charAt(0)=="_"||key.charAt(0)=="$") {
                    continue;
                }
                info[key] = type;
            }
        }


    }


    var config = new EXMLConfig();
    var parser = new EXMLParser();

    if(DEBUG){
        EXML["config"] = config;
    }
}

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