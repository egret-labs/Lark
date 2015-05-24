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

    var bindables = "__bindables__";
    var bindableCount = 0;

    function getPropertyDescriptor(host:any, property:string):any {
        var data = Object.getOwnPropertyDescriptor(host, property);
        if (data) {
            return data;
        }
        var prototype = Object.getPrototypeOf(host);
        if (prototype) {
            return getPropertyDescriptor(prototype, property);
        }
        return null;
    }

    /**
     * Watcher 类能够监视可绑定属性的改变，您可以定义一个事件处理函数作为 Watcher 的回调方法，在每次可绑定属性的值改变时都执行此函数。
     */
    export class Watcher {

        /**
         * 创建并启动 Watcher 实例。注意：Watcher 只能监视 host 为 IEventEmitter 对象的属性改变。若属性链中某个属性所对应的实例不是 IEventEmitter，则属性链中在它之后的属性改变将无法检测到。
         * @param host 用于承载要监视的属性或属性链的对象。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 host.a.b.c，需按以下形式调用此方法：watch(host, ["a","b","c"], ...)。
         * @param handler 在监视的目标属性链中任何属性的值发生改变时调用的事件处理函数。
         * @param thisObject handler 方法绑定的this对象
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         */
        public static watch(host:any, chain:string[], handler:(value:any)=>void, thisObject:any):Watcher {
            if (DEBUG) {
                if (!chain) {
                    $error(1003, "chain");
                }
            }
            if (chain.length > 0) {
                var property = chain.shift();
                var next = Watcher.watch(null, chain, handler, thisObject);
                var watcher = new Watcher(property, handler, thisObject, next);
                watcher.reset(host);
                return watcher;
            }
            else {
                return null;
            }
        }

        /**
         * 检查属性是否可以绑定。若还未绑定，尝试添加绑定事件。若是只读或只写属性，返回false。
         */
        private static checkBindable(host:any, property:string):boolean {
            var list:string[] = host[bindables];
            if (list && list.indexOf(property) != -1) {
                return true;
            }
            var data:PropertyDescriptor = getPropertyDescriptor(host, property);
            if (data && data.set && data.get) {
                var orgSet = data.set;
                data.set = function (value:any) {
                    if (this[property] != value) {
                        orgSet.call(this, value);
                        PropertyEvent.emitPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, property);
                    }
                };
            }
            else if (!data || (!data.get && !data.set)) {
                bindableCount++;
                var newProp = "_" + bindableCount + property;
                host[newProp] = data ? data.value : null;
                data = {enumerable: true, configurable: true};
                data.get = function ():any {
                    return this[newProp];
                };
                data.set = function (value:any) {
                    if (this[newProp] != value) {
                        this[newProp] = value;
                        PropertyEvent.emitPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, property);
                    }
                };
            }
            else {
                return false;
            }
            Object.defineProperty(host, property, data);
            registerBindable(host, property);
        }

        /**
         * 构造函数，非公开。只能从 watch() 方法中调用此方法。有关参数用法，请参阅 watch() 方法。
         */
        public constructor(property:string, handler:(value:any)=>void, thisObject:any, next?:Watcher) {
            this.property = property;
            this.handler = handler;
            this.next = next;
            this.thisObject = thisObject;
        }

        private host:any;

        private property:string;

        private handler:(value:any)=>void;

        private thisObject:any;

        private next:Watcher;

        private isExecuting:boolean = false;

        /**
         * 从当前宿主中断开此 Watcher 实例及其处理函数。
         */
        public unwatch():void {
            this.reset(null);
            this.handler = null;
            if (this.next) {
                this.next.handler = null;
            }
        }

        /**
         * 检索观察的属性或属性链的当前值，当宿主对象为空时此值为空。
         */
        public getValue():any {
            if (this.next) {
                return this.next.getValue();
            }
            return this.getHostPropertyValue();
        }

        /**
         * 设置处理函数。
         * @param handler 处理函数
         */
        public setHandler(handler:(value:any)=>void,thisObject:any):void {
            this.handler = handler;
            this.thisObject = thisObject;
            if (this.next){
                this.next.setHandler(handler,thisObject);
            }

        }

        /**
         * 重置此 Watcher 实例使用新的宿主对象。
         */
        public reset(newHost:IEventEmitter):void {
            if (is(this.host,lark.Types.IEventEmitter)) {
                this.host.removeListener(PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this);
            }

            this.host = newHost;

            if (is(newHost,lark.Types.IEventEmitter)) {
                Watcher.checkBindable(newHost, this.property)
                newHost.on(PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this, false, 100);
            }

            if (this.next)
                this.next.reset(this.getHostPropertyValue());
        }


        private getHostPropertyValue():any {
            return this.host ? this.host[this.property] : null;
        }

        private wrapHandler(event:PropertyEvent):void {
            if (event.property == this.property && !this.isExecuting) {
                try {
                    this.isExecuting = true;
                    if (this.next)
                        this.next.reset(this.getHostPropertyValue());
                    this.handler.call(this.thisObject,this.getValue());
                }
                finally {
                    this.isExecuting = false;
                }
            }
        }
    }

    registerClass(Watcher, Types.Watcher);
}