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
     * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
     *
     * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击、触摸或按键等事件时，
     * 引擎会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
     * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为三个阶段：
     * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括回程上遇到的任何后续节点到显示列表的根。
     */
    export class EventEmitter extends HashObject implements IEventEmitter {

        /**
         * EventEmitter 类是可调度事件的所有类的基类。
         * EventEmitter 类实现 IEventEmitter 接口 ，并且是 DisplayObject 类的基类。
         * EventEmitter 类允许显示列表上的任何对象都是一个事件目标，同样允许使用 IEventEmitter 接口的方法。
         */
        public constructor(target:IEventEmitter = null) {
            super();
            if (target) {
                this._eventTarget = target;
            }
            else {
                this._eventTarget = this;
            }

        }

        /**
         * 事件抛出对象
         */
        private _eventTarget:IEventEmitter;

        $eventsMap:any = null;

        $captureEventsMap:any = null;

        /**
         * 添加事件侦听器
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
         * 要在所有三个阶段都侦听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        public on(type:string, listener:(event:Event)=>void, thisObject:any, useCapture?:boolean, priority?:number):void {
            if (!listener) {
                //Logger.fatalWithErrorId(1010);
            }
            var eventMap:any;
            if (useCapture) {
                if (!this.$captureEventsMap)
                    this.$captureEventsMap = {};
                eventMap = this.$captureEventsMap;
            }
            else {
                if (!this.$eventsMap)
                    this.$eventsMap = {};
                eventMap = this.$eventsMap;
            }
            var list:lark.player.EventBin[] = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            else if(this.notifyLevel!==0){
                eventMap[type] = list = list.concat();
            }
            this.$insertEventBin(list, listener, thisObject, priority)
        }

        /**
         * 在一个事件列表中按优先级插入事件对象
         */
        $insertEventBin(list:lark.player.EventBin[], listener:(event:Event)=>void, thisObject:any, priority:number, display?:DisplayObject):boolean {
            priority = +priority|0;
            var insertIndex = -1;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener === listener && bin.thisObject === thisObject && bin.display === display) {
                    return false;
                }
                if (insertIndex === -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            var eventBin:any = {listener: listener, thisObject: thisObject, priority: priority};
            if (display) {
                eventBin.display = display;
            }
            if (insertIndex !== -1) {
                list.splice(insertIndex, 0, eventBin);
            }
            else {
                list.push(eventBin);
            }
            return true;
        }

        /**
         * 移除事件侦听器
         * @param type 事件名
         * @param listener 侦听函数
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
         */
        public removeListener(type:string, listener:(event:Event)=>void, thisObject:any, useCapture?:boolean):void {

            var eventMap:Object = useCapture ? this.$captureEventsMap : this.$eventsMap;
            if (!eventMap)
                return;
            var list:lark.player.EventBin[] = eventMap[type];
            if (!list) {
                return;
            }
            if(this.notifyLevel!==0){
                eventMap[type] = list = list.concat();
            }
            this.$removeEventBin(list, listener, thisObject);
            if (list.length == 0) {
                eventMap[type] = null;
            }
        }

        /**
         * 在一个事件列表中按优先级插入事件对象
         */
        $removeEventBin(list:lark.player.EventBin[], listener:(event:Event)=>void, thisObject:any, display?:DisplayObject):boolean {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener === listener && bin.thisObject === thisObject && bin.display == display) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        /**
         * 检测是否存在监听器
         * @param type 事件类型
         * @returns 是否存在监听器，若存在返回true，反之返回false。
         */
        public hasListener(type:string):boolean {
            return (this.$eventsMap && this.$eventsMap[type] ||
            this.$captureEventsMap && this.$captureEventsMap[type]);
        }

        /**
         * 检查是否用此 EventEmitter 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventEmitter 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasListener() 与 willTrigger() 方法的区别是：hasListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件类型
         * @returns 是否注册过监听器，如果注册过返回true，反之返回false
         */
        public willTrigger(type:string):boolean {
            return this.hasListener(type);
        }


        /**
         * 将事件分派到事件流中。事件目标是对其调用 emit() 方法的 EventEmitter 对象。
         * @param event 调度到事件流中的 Event 对象。如果正在重新分派事件，则会自动创建此事件的一个克隆。
         * 在调度了事件后，其 _eventTarget 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        public emit(event:Event):boolean {
            event.$target = event.$currentTarget = this._eventTarget;
            return this.$notifyListener(event);
        }

        private notifyLevel:number = 0;

        $notifyListener(event:Event):boolean {
            var eventMap:Object = event.$eventPhase == 1 ? this.$captureEventsMap : this.$eventsMap;
            if (!eventMap) {
                return true;
            }
            var list:lark.player.EventBin[] = eventMap[event.$type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length == 0) {
                return true;
            }
            //做个标记，防止外部修改原始数组导致便利错误。这里不直接调用list.concat()因为emit()方法调用通常比on()等方法频繁。
            this.notifyLevel++;
            for (var i = 0; i < length; i++) {
                var eventBin:any = list[i];
                eventBin.listener.call(eventBin.thisObject, event);
                if (event.$isPropagationImmediateStopped) {
                    break;
                }
            }
            this.notifyLevel--;
            return !event.$isDefaultPrevented;
        }

        /**
         * 派发一个包含了特定参数的事件到所有注册了特定类型侦听器的对象中。 这个方法使用了一个内部的事件对象池因避免重复的分配导致的额外开销。
         * @param type 事件类型
         * @param bubbles 是否冒泡，默认false
         * @param data 附加数据(可选)
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        public emitWith(type:string, bubbles?:boolean, data?:any):boolean {
            if (bubbles || this.hasListener(type)) {
                var event = Event.create(Event,type, bubbles);
                event.data = data;
                var result = this.emit(event);
                Event.release(event);
                return result;
            }
        }
    }
}

module lark.player{
    /**
     * 事件信息对象
     */
    export interface EventBin {
        listener: (event:Event)=>void;
        thisObject:any;
        priority:number;
        display?:DisplayObject;
    }
}