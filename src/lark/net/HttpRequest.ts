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
     * HttpRequest 类以文本、二进制数据或 JSON对象的形式从 URL 下载数据。。
     * HttpRequest 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
     * 通过 bytesLoaded 和 bytesTotal 属性以及已调度的事件，可以监视下载进度。
     */
    export interface HttpRequest extends EventEmitter {
        /**
         * 本次请求返回的数据，数据类型根据responseType设置的值确定。
         */
        response: any;
        /**
         * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
         */
        responseType: string;
        /**
         * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
         */
        withCredentials: boolean;
        /**
         * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
         * @param url 该请求所要访问的URL该请求所要访问的URL
         * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
         */
        open(url:string, method?:string): void;
        /**
         * 发送请求.
         * @param data 需要发送的数据
         */
        send(data?:any): void;
        /**
         * 如果请求已经被发送,则立刻中止请求.
         */
        abort(): void;
        /**
         * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
         */
        getAllResponseHeaders(): string;
        /**
         * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
         * @param header 将要被赋值的请求头名称.
         * @param value 给指定的请求头赋的值.
         */
        setRequestHeader(header:string, value:string): void;
        /**
         * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
         * @param header 要返回的响应头名称
         */
        getResponseHeader(header:string): string;

        on(type: "complete", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "ioError", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "progress", listener: (event: ProgressEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: "complete", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: "ioError", listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: "progress", listener: (event: ProgressEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }

    export var HttpRequest:{ new (): HttpRequest };

}