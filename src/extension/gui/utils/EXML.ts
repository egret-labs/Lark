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
         */
        public static parse(text:string):Function {
            return parser.parse(text);
        }

        public static describe(instance:any):any {
            config.describe(instance);
            return config.properties;
        }
    }

    class EXMLParser {

        public parse(text:string):Function {
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
}