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
     * 对象的一个属性发生更改时传递到事件侦听器的事件
     */
    export class PropertyEvent extends Event {
        /**
         * 属性改变
         */
        public static PROPERTY_CHANGE:string = "propertyChange";

        /**
         * 创建一个属性改变事件
         */
        public constructor(type:string, bubbles?:boolean, cancelable?:boolean, property?:string) {
            super(type, bubbles, cancelable);
            this.property = property;
        }

        /**
         * 发生改变的属性名称。
         */
        public property:string;

        /**
         * 使用指定的 EventEmitter 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        public static emitPropertyEvent(target:IEventEmitter, eventType:string, property?:string):boolean {
            if (!target.hasListener(eventType)) {
                return true;
            }
            var event = Event.create(PropertyEvent, eventType);
            event.property = property;
            var result = target.emit(event);
            Event.release(event);
            return result;
        }
    }

    registerClass(PropertyEvent, Types.PropertyEvent);
}