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

module EXML {

    var parser = new swan.sys.EXMLParser();

    var requestPool:lark.HttpRequest[] = [];

    /**
     * 解析一个 EXML 文件的文本内容为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 lark.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     * @param text 要解析的 EXML 文件内容
     */
    export function parse(text:string):{new():any} {
        return parser.parse(text);
    }

    /**
     * 加载并解析一个外部的 EXML 文件为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 lark.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     * @param url 要加载的 EXML 文件路径
     * @param callBack 加载并解析完成后的回调函数，无论加载成功还是失败，此函数均会被回调。失败时将传入 undefined 作为回调函数参数。
     * @param thisObject 回调函数的 this 引用
     */
    export function load(url:string, callBack?:(clazz:any,url:string)=>void, thisObject?:any):void {
        if (DEBUG) {
            if (!url) {
                lark.$error(1003, "url");
            }
        }
        var request = requestPool.pop();
        if (!request) {
            request = new lark.HttpRequest();
        }
        request.on(lark.Event.COMPLETE, onLoadFinish, null);
        request.on(lark.Event.IO_ERROR, onLoadFinish, null);
        request.open(url);
        request.send();

        function onLoadFinish(event:lark.Event):void {
            request.removeListener(lark.Event.COMPLETE, onLoadFinish, null);
            request.removeListener(lark.Event.IO_ERROR, onLoadFinish, null);
            var text:string = event.type == lark.Event.COMPLETE ? request.response : "";
            if(text){
                var clazz = parse(text);
            }
            requestPool.push(request);
            callBack.call(thisObject, clazz, url);
        }
    }

}