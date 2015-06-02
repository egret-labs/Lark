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

    /**
     * 列表项单击事件
     */
    export class ItemTapEvent extends lark.Event {
        /**
         *
         */
        public static ITEM_TAP:string = "itemTap";

        /**
         * 触发触摸事件的项呈示器数据源项。
         */
        public item:any = null;

        /**
         * 触发触摸事件的项呈示器。
         */
        public itemRenderer:IItemRenderer = null;

        /**
         * 触发触摸事件的项索引
         */
        public itemIndex:number = -1;

        protected clean():void{
            super.clean();
            this.item = this.itemRenderer = null;
        }

        /**
         * 使用指定的 EventEmitter 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        public static emitItemTapEvent(target:lark.IEventEmitter, eventType:string, itemRenderer?:IItemRenderer):boolean {
            if (!target.hasListener(eventType)) {
                return true;
            }
            var event = lark.Event.create(ItemTapEvent, eventType);
            event.item = itemRenderer.data;
            event.itemIndex = itemRenderer.itemIndex;
            event.itemRenderer = itemRenderer;
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        }
    }

    lark.registerClass(ItemTapEvent, Types.ItemTapEvent);
}