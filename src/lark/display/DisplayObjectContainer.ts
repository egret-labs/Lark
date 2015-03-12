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
     * 容器基类
     */
    export class DisplayObjectContainer extends DisplayObject {

        static $EVENT_ADD_TO_STAGE_LIST:Array<DisplayObject> = [];
        static $EVENT_REMOVE_FROM_STAGE_LIST:Array<DisplayObject> = [];

        /**
         * 实例化一个容器
         */
        public constructor() {
            super();
            this.$children = [];
            this.$setDirtyFlags(DisplayObjectFlags.DirtyChildren);
        }

        /**
         * 标记子项列表失效
         */
        private $invalidateChildren() {
            this.$setDirtyFlags(DisplayObjectFlags.DirtyChildren);
            this.$invalidateContentBounds();
        }

        $propagateFlagsDown(flags:DisplayObjectFlags) {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var children = this.$children;
            for (var i = 0; i < children.length; i++) {
                children[i].$propagateFlagsDown(flags);
            }
        }

        /**
         * 返回此对象的子项数目。
         */
        public get numChildren():number {
            return this.$children.length;
        }

        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        public addChild(child:DisplayObject):DisplayObject {
            var index:number = this.$children.length;

            if (child.$parent == this)
                index--;

            return this.$doAddChild(child, index);
        }


        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。如果索引值为-1，则表示该DisplayObjectContainer 对象的显示列表的前（上）部。
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        public addChildAt(child:DisplayObject, index:number):DisplayObject {
            index = +index | 0;
            return this.$doAddChild(child, index);
        }

        $doAddChild(child:DisplayObject, index:number, notifyListeners:boolean = true):DisplayObject {
            if (child == this)
                return child;

            if (index < 0 || index > this.$children.length) {
                //lark.Logger.fatalWithErrorId(1007);
                return child;
            }

            var host:DisplayObjectContainer = child.$parent;
            if (host == this) {
                this.doSetChildIndex(child, index);
                return child;
            }

            if (host) {
                var hostIndex = host.$children.indexOf(child);
                if (hostIndex >= 0) {
                    host.$doRemoveChild(hostIndex);
                }
            }

            this.$children.splice(index, 0, child);
            child.$setParent(this);
            if (notifyListeners) {
                //child.dispatchEventWith(Event.ADDED, true);
            }
            if (this.$stage) {//当前容器在舞台
                child.$onAddToStage(this.$stage);
                var list = DisplayObjectContainer.$EVENT_ADD_TO_STAGE_LIST;
                while (list.length > 0) {
                    var childAddToStage = list.shift();
                    if (notifyListeners) {
                        //childAddToStage.dispatchEventWith(Event.ADDED_TO_STAGE);
                    }
                }
            }

            child.$invalidatePosition();
            this.$invalidateChildren();
            return child;
        }

        /**
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。孙项、曾孙项等，每项都返回 true。
         * @param child 要测试的子对象。
         * @returns 如果指定的显示对象为DisplayObjectContainer该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
         */
        public contains(child:DisplayObject):boolean {
            while (child) {
                if (child == this) {
                    return true;
                }
                child = child.$parent;
            }
            return false;
        }

        /**
         * 返回位于指定索引处的子显示对象实例。
         * @param index 子对象的索引位置。
         * @returns 位于指定索引位置处的子显示对象。
         */
        public getChildAt(index:number):DisplayObject {
            index = +index | 0;
            if (index >= 0 && index < this.$children.length) {
                return this.$children[index];
            }
            else {
                //lark.Logger.fatalWithErrorId(1007);
                return null;
            }
        }

        /**
         * 返回 DisplayObject 的 child 实例的索引位置。
         * @returns 要标识的子显示对象的索引位置。
         */
        public getChildIndex(child:DisplayObject):number {
            return this.$children.indexOf(child);
        }

        /**
         * 返回具有指定名称的子显示对象。
         * @param name 要返回的子项的名称。
         * @returns 具有指定名称的子显示对象。
         */
        public getChildByName(name:string):DisplayObject {
            var children = this.$children;
            var length = children.length;
            var displayObject:DisplayObject;
            for (var i:number = 0; i < length; i++) {
                displayObject = children[i];
                if (displayObject.name == name) {
                    return displayObject;
                }
            }
            return null;
        }

        /**
         * 将一个 DisplayObject 子实例从 DisplayObjectContainer 实例中移除。
         * @param child 要删除的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        public removeChild(child:DisplayObject):DisplayObject {
            var index = this.$children.indexOf(child);
            if (index >= 0) {
                return this.$doRemoveChild(index);
            }
            else {
                //lark.Logger.fatalWithErrorId(1008);
                return null;
            }
        }

        /**
         * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。
         * @param index 要删除的 DisplayObject 的子索引。
         * @returns 已删除的 DisplayObject 实例。
         */
        public removeChildAt(index:number):DisplayObject {
            index = +index | 0;
            if (index >= 0 && index < this.$children.length) {
                return this.$doRemoveChild(index);
            }
            else {
                //lark.Logger.fatalWithErrorId(1007);
                return null;
            }
        }

        $doRemoveChild(index:number, notifyListeners:boolean = true):DisplayObject {
            index = +index | 0;
            var children = this.$children;
            var child:DisplayObject = children[index];
            if (notifyListeners) {
                //child.dispatchEventWith(Event.REMOVED, true);
            }

            if (this.$stage) {//在舞台上
                child.$onRemoveFromStage();
                var list = DisplayObjectContainer.$EVENT_REMOVE_FROM_STAGE_LIST
                while (list.length > 0) {
                    var childAddToStage = list.shift();
                    if (notifyListeners) {
                        // childAddToStage.dispatchEventWith(Event.REMOVED_FROM_STAGE);
                    }
                    childAddToStage.$stage = null;
                }
            }
            child.$setParent(null);
            children.splice(index, 1);
            child.$invalidatePosition();
            this.$invalidateChildren();
            return child;
        }

        /**
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @param child 要为其更改索引编号的 DisplayObject 子实例。
         * @param index 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         */
        public setChildIndex(child:DisplayObject, index:number):void {
            index = +index | 0;
            this.doSetChildIndex(child, index);
        }

        private doSetChildIndex(child:DisplayObject, index:number):void {
            var lastIdx = this.$children.indexOf(child);
            if (lastIdx < 0) {
                //lark.Logger.fatalWithErrorId(1006);
            }
            //从原来的位置删除
            this.$children.splice(lastIdx, 1);
            //放到新的位置
            if (index < 0 || this.$children.length <= index) {
                this.$children.push(child);
            }
            else {
                this.$children.splice(index, 0, child);
            }
            this.$invalidateChildren();
        }

        /**
         * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param index1 第一个子对象的索引位置。
         * @param index2 第二个子对象的索引位置。
         */
        public swapChildrenAt(index1:number, index2:number):void {
            index1 = +index1 | 0;
            index2 = +index2 | 0;
            if (index1 >= 0 && index1 < this.$children.length && index2 >= 0 && index2 < this.$children.length) {
                this.doSwapChildrenAt(index1, index2);
            }
            else {
                //lark.Logger.fatalWithErrorId(1007);
            }

        }

        /**
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param child1 第一个子对象。
         * @param child2 第二个子对象。
         */
        public swapChildren(child1:DisplayObject, child2:DisplayObject):void {
            var index1:number = this.$children.indexOf(child1);
            var index2:number = this.$children.indexOf(child2);
            if (index1 == -1 || index2 == -1) {
                //lark.Logger.fatalWithErrorId(1008);
            }
            else {
                this.doSwapChildrenAt(index1, index2);
            }
        }

        private doSwapChildrenAt(index1:number, index2:number):void {
            if (index1 == index2) {
                return;
            }
            var list:Array<DisplayObject> = this.$children;
            var child:DisplayObject = list[index1];
            list[index1] = list[index2];
            list[index2] = child;
            this.$invalidateChildren();
        }

        /**
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         */
        public removeChildren():void {
            var children = this.$children;
            for (var i:number = children.length - 1; i >= 0; i--) {
                this.$doRemoveChild(i);
            }
        }

        $onAddToStage(stage:Stage):void {
            super.$onAddToStage(stage);
            var children = this.$children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var child:DisplayObject = this.$children[i];
                child.$onAddToStage(stage);
            }
        }

        $onRemoveFromStage():void {
            super.$onRemoveFromStage();
            var children = this.$children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var child:DisplayObject = children[i];
                child.$onRemoveFromStage();
            }
        }

        $measureContentBounds(bounds:Rectangle):void {
            var children = this.$children;
            var length = children.length;
            var xMin = 0, xMax = 0, yMin = 0, yMax = 0;
            var found:boolean = false;
            for (var i = 0; i < length; i++) {
                var childBounds = children[i].$getTransformedBounds(this, Rectangle.TEMP);
                if (childBounds.isEmpty()) {
                    continue;
                }
                if (found) {
                    xMin = Math.min(xMin, childBounds.x)
                    xMax = Math.max(xMax, childBounds.x + childBounds.width);
                    yMin = Math.min(yMin,childBounds.y);
                    yMax = Math.max(yMax,childBounds.y+childBounds.width);
                }
                else {
                    found = true;
                    xMin = childBounds.x;
                    xMax = xMin + childBounds.width;
                    yMin = childBounds.y;
                    yMax = yMin + childBounds.height;
                }
            }
            bounds.setTo(xMin,yMin,xMax-xMin,yMax-yMin);
        }


        public _touchChildren:boolean = true;
        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * 默认值为 true 即可以接收。
         */
        public get touchChildren():boolean {
            return this._touchChildren;
        }

        public set touchChildren(value:boolean) {
            this._touchChildren = value;
        }

    }
}