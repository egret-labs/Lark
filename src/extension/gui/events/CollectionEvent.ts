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
     * 集合类型数据改变事件
     */
    export class CollectionEvent extends Event {
        /**
         * 集合类数据发生改变
         */
        public static COLLECTION_CHANGE:string = "collectionChange";

        /**
         * 创建一个 CollectionEvent 实例
         */
        public constructor(type:string, bubbles?:boolean, cancelable?:boolean,
                           kind?:string, location?:number, oldLocation?:number,
                           items?:any[], oldItems?:any[]) {
            super(type, bubbles, cancelable);
            this.$setTo(kind, location, oldLocation, items, oldItems);
        }

        $setTo(kind?:string, location?:number, oldLocation?:number, items?:any[], oldItems?:any[]):void {
            this.kind = kind;
            this.location = +location | 0;
            this.oldLocation = +oldLocation | 0;
            this.items = items || [];
            this.oldItems = oldItems || [];
        }

        /**
         * 指示发生的事件类型。此属性值可以是 CollectionEventKind 类中的一个值，也可以是 null，用于指示类型未知。
         */
        public kind:string;
        /**
         * 受事件影响的项目的列表
         */
        public items:any[];
        /**
         * 仅当kind的值为CollectionEventKind.REPLACE时，表示替换前的项目列表
         */
        public oldItems:any[];
        /**
         * 如果 kind 值为 CollectionEventKind.ADD、 CollectionEventKind.MOVE、
         * CollectionEventKind.REMOVE 或 CollectionEventKind.REPLACE，
         * CollectionEventKind.UPDATE
         * 则此属性为 items 属性中指定的项目集合中零号元素的的索引。
         */
        public location:number;
        /**
         * 如果 kind 的值为 CollectionEventKind.MOVE，
         * 则此属性为 items 属性中指定的项目在目标集合中原来位置的从零开始的索引。
         */
        public oldLocation:number;

        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        public static emitCollectionEvent(target:IEventEmitter, eventType:string, kind?:string, location?:number,
                                          oldLocation?:number, items?:any[], oldItems?:any[]):boolean {
            if (!target.hasListener(eventType)) {
                return;
            }
            var event = Event.create(CollectionEvent, eventType);
            event.$setTo(kind, location, oldLocation, items, oldItems);
            var result = target.emit(event);
            Event.release(event);
            return result;
        }
    }

    registerClass(CollectionEvent, Types.CollectionEvent);
}