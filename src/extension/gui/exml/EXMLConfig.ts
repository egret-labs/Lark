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

    var hashCount = 0;

    export class EXMLConfig {

        private properties:any = {};

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
                this.describeSuper(superClazz, instance);
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
                if (type == "function" || key.charAt(0) == "_" || key.charAt(0) == "$") {
                    continue;
                }
                info[key] = type;
            }
        }

        /**
         * 根据类的短名ID和命名空间获取完整类名(以"."分隔)
         * @param id 类的短名ID
         * @param ns 命名空间
         */
        public getClassNameById(id:string, ns:string):string {
            var name:string = "";
            return name;
        }

        /**
         * 根据ID获取对应的默认属性
         * @param id 类的短名ID
         * @param ns 命名空间
         * @return 默认属性名
         */
        public getDefaultPropById(id:string, ns:string):string {
            var className:string = this.getClassNameById(id, ns);
            return "";
        }

        /**
         * 获取指定属性的类型,返回基本数据类型："boolean","string","number","any"。
         * @param prop 属性名
         * @param className 要查询的完整类名
         */
        public getPropertyType(prop:string, className:string):string {
            if (className == "Object") {
                return "any";
            }
            return "";
        }


    }
}