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

module swan {

    var parser = new sys.EXMLParser();

    /**
     * EXML皮肤文件运行时解析工具
     */
    export class EXML {

        /**
         * 解析一个EXML文件的文本内容为一个皮肤类。
         * @param text 要解析的EXML文件内容
         * @param className 皮肤对应的完整类名，包括模块名称。例如 swan.ButtonSkin。解析完成后皮肤类定义会自动缓存到全局，
         * 若指定的类已经存在，将会覆盖已有的类定义。解析后您也可以通过lark.getDefinitionByName(className)方法获取这个皮肤的类定义。
         */
        public static parse(text:string, className:string):{new():any} {
            if (DEBUG) {
                if(!text){
                    lark.$error(1003, "text");
                }
                if(!className){
                    lark.$error(1003, "className");
                }
            }
            try{
                var xml = sys.XML.parse(text);
            }
            catch(e){
                if(DEBUG){
                    lark.$error(2002,className,text+"\n"+e.message);
                }
            }
            var code = parser.parse(xml,className);
            try {
                var clazz = eval(code);
            }
            catch (e) {
                if (DEBUG) {
                    lark.log(code);
                }
                return null;
            }
            if (className && clazz) {
                var paths = className.split(".");
                var length = paths.length;
                var definition = __global;
                for (var i = 0; i < length - 1; i++) {
                    var path = paths[i];
                    definition = definition[path] || (definition[path] = {});
                }
                definition[paths[length - 1]] = clazz;
            }
            return clazz;
        }

    }

}