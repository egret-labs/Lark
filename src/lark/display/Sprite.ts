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
     * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
     */
    export class Sprite extends DisplayObject implements DisplayObjectContainer {

        static $EVENT_ADD_TO_STAGE_LIST:DisplayObject[] = [];
        static $EVENT_REMOVE_FROM_STAGE_LIST:DisplayObject[] = [];

        /**
         * 实例化一个容器
         */
        public constructor() {
            super();
            this.$children = [];
        }

        $propagateFlagsDown(flags:player.DisplayObjectFlags) {
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
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。
         * （要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        public addChild(child:DisplayObject):DisplayObject {
            var index:number = this.$children.length;

            if (child.$parent == this)
                index--;

            return this.doAddChild(child, index);
        }


        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。
         * 索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * 当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        public addChildAt(child:DisplayObject, index:number):DisplayObject {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length;
                if (child.$parent === this) {
                    index--;
                }
            }
            return this.doAddChild(child, index);
        }

        private doAddChild(child:DisplayObject, index:number):DisplayObject {
            if (DEBUG) {
                if (child == this) {
                    $error(1005);
                }
                else if (is(child, Types.DisplayObjectContainer) && (<DisplayObjectContainer>child).contains(this)) {
                    $error(1004);
                }
            }

            var host:DisplayObjectContainer = child.$parent;
            if (host == this) {
                this.doSetChildIndex(child, index);
                return child;
            }

            if (host) {
                host.removeChild(child);
            }

            this.$children.splice(index, 0, child);
            child.$setParent(this);
            var stage:Stage = this.$stage;
            if (stage) {//当前容器在舞台
                child.$onAddToStage(stage, this.$nestLevel + 1);

            }
            child.emitWith(Event.ADDED, true);
            if (stage) {
                var list = Sprite.$EVENT_ADD_TO_STAGE_LIST;
                while (list.length) {
                    var childAddToStage = list.shift();
                    if (childAddToStage.$stage) {
                        childAddToStage.emitWith(Event.ADDED_TO_STAGE);
                    }
                }
            }
            var displayList = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(child, displayList, displayList);
            child.$propagateFlagsDown(player.DisplayObjectFlags.DownOnAddedOrRemoved);
            this.$propagateFlagsUp(player.DisplayObjectFlags.InvalidBounds);
            this.$childAdded(child, index);
            return child;
        }

        /**
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。
         * 孙项、曾孙项等，每项都返回 true。
         * @param child 要测试的子对象。
         * @returns 如果指定的显示对象为 DisplayObjectContainer 该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
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
                DEBUG && $error(1007);
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
                return this.doRemoveChild(index);
            }
            else {
                DEBUG && $error(1006);
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
                return this.doRemoveChild(index);
            }
            else {
                DEBUG && $error(1007);
                return null;
            }
        }

        private doRemoveChild(index:number):DisplayObject {
            index = +index | 0;
            var children = this.$children;
            var child:DisplayObject = children[index];
            this.$childRemoved(child, index);
            child.emitWith(Event.REMOVED, true);

            if (this.$stage) {//在舞台上
                child.$onRemoveFromStage();
                var list = Sprite.$EVENT_REMOVE_FROM_STAGE_LIST
                while (list.length > 0) {
                    var childAddToStage = list.shift();
                    childAddToStage.emitWith(Event.REMOVED_FROM_STAGE);
                    childAddToStage.$stage = null;
                }
            }
            var displayList = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(child, displayList, displayList);
            child.$propagateFlagsDown(player.DisplayObjectFlags.DownOnAddedOrRemoved);
            child.$setParent(null);
            children.splice(index, 1);
            this.$propagateFlagsUp(player.DisplayObjectFlags.InvalidBounds);
            return child;
        }

        /**
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @param child 要为其更改索引编号的 DisplayObject 子实例。
         * @param index 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         */
        public setChildIndex(child:DisplayObject, index:number):void {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length - 1;
            }
            this.doSetChildIndex(child, index);
        }

        private doSetChildIndex(child:DisplayObject, index:number):void {
            var lastIndex = this.$children.indexOf(child);
            if (lastIndex < 0) {
                DEBUG && $error(1006);
            }
            if (lastIndex == index) {
                return;
            }
            this.$childRemoved(child, lastIndex);
            //从原来的位置删除
            this.$children.splice(lastIndex, 1);
            //放到新的位置
            this.$children.splice(index, 0, child);
            this.$childAdded(child, index);
            child.$invalidateTransform();
            this.$propagateFlagsUp(player.DisplayObjectFlags.InvalidBounds);
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
                DEBUG && $error(1007);
            }

        }

        /**
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param child1 第一个子对象。
         * @param child2 第二个子对象。
         */
        public swapChildren(child1:DisplayObject, child2:DisplayObject):void {
            var index1 = this.$children.indexOf(child1);
            var index2 = this.$children.indexOf(child2);
            if (index1 == -1 || index2 == -1) {
                DEBUG && $error(1006);
            }
            else {
                this.doSwapChildrenAt(index1, index2);
            }
        }

        private doSwapChildrenAt(index1:number, index2:number):void {
            if (index1 > index2) {
                var temp = index2;
                index2 = index1;
                index1 = temp;
            }
            else if (index1 === index2) {
                return;
            }
            var list:Array<DisplayObject> = this.$children;
            var child1:DisplayObject = list[index1];
            var child2:DisplayObject = list[index2];
            this.$childRemoved(child1, index1);
            this.$childRemoved(child2, index2);
            list[index1] = child2;
            list[index2] = child1;
            this.$childAdded(child2, index1);
            this.$childAdded(child1, index2);
            child1.$invalidateTransform();
            child2.$invalidateTransform();
            this.$propagateFlagsUp(player.DisplayObjectFlags.InvalidBounds);
        }

        /**
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         */
        public removeChildren():void {
            var children = this.$children;
            for (var i:number = children.length - 1; i >= 0; i--) {
                this.doRemoveChild(i);
            }
        }

        /**
         * 一个子项被添加到容器内，此方法不仅在操作addChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        $childAdded(child:DisplayObject, index:number):void {

        }

        /**
         * 一个子项从容器内移除，此方法不仅在操作removeChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        $childRemoved(child:DisplayObject, index:number):void {

        }

        $onAddToStage(stage:Stage, nestLevel:number):void {
            super.$onAddToStage(stage, nestLevel);
            var children = this.$children;
            var length = children.length;
            nestLevel++;
            for (var i = 0; i < length; i++) {
                var child:DisplayObject = this.$children[i];
                child.$onAddToStage(stage, nestLevel);
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


        $measureChildBounds(bounds:Rectangle):void {
            var children = this.$children;
            var length = children.length;
            if (length === 0) {
                return;
            }
            var xMin = 0, xMax = 0, yMin = 0, yMax = 0;
            var found:boolean = false;
            for (var i = -1; i < length; i++) {
                var childBounds = i === -1 ? bounds : children[i].$getTransformedBounds(this, $TempRectangle);
                if (childBounds.isEmpty()) {
                    continue;
                }
                if (found) {
                    xMin = Math.min(xMin, childBounds.x)
                    xMax = Math.max(xMax, childBounds.x + childBounds.width);
                    yMin = Math.min(yMin, childBounds.y);
                    yMax = Math.max(yMax, childBounds.y + childBounds.height);
                }
                else {
                    found = true;
                    xMin = childBounds.x;
                    xMax = xMin + childBounds.width;
                    yMin = childBounds.y;
                    yMax = yMin + childBounds.height;
                }
            }
            bounds.setTo(xMin, yMin, xMax - xMin, yMax - yMin);
        }

        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * 默认值为 true 即可以接收。
         */
        public get touchChildren():boolean {
            return this.$hasFlags(player.DisplayObjectFlags.TouchChildren);
        }

        public set touchChildren(value:boolean) {
            this.$setTouchChildren(value);
        }

        $setTouchChildren(value:boolean):void {
            this.$toggleFlags(player.DisplayObjectFlags.TouchChildren, !!value);
        }

        /**
         * 标记此显示对象需要重绘。此方法会触发自身的cacheAsBitmap重绘。如果只是矩阵改变，自身显示内容并不改变，应该调用$invalidateTransform().
         * @param notiryChildren 是否标记子项也需要重绘。传入false或不传入，将只标记自身需要重绘。通常只有alpha属性改变会需要通知子项重绘。
         */
        $invalidate(notifyChildren?:boolean):void {
            super.$invalidate(notifyChildren);
            if (!notifyChildren) {
                return;
            }
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.markChildDirty(children[i], cacheRoot);
                }
            }
        }

        /**
         * 标记自身以及所有子项在父级中变换叠加的显示内容失效。此方法不会触发自身的cacheAsBitmap重绘。
         * 通常用于矩阵改变或从显示列表添加和移除时。若自身的显示内容已经改变需要重绘，应该调用$invalidate()。
         */
        $invalidateTransform():void {
            this.markChildDirty(this, this.$parentDisplayList);
        }

        private markChildDirty(child:DisplayObject, parentCache:lark.player.DisplayList):void {
            if (child.$hasFlags(player.DisplayObjectFlags.DirtyChildren)) {
                return;
            }
            child.$setFlags(player.DisplayObjectFlags.DirtyChildren);
            var displayList = child.$displayList;
            if ((displayList || child.$renderRegion) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.markChildDirty(children[i], parentCache);
                }
            }
        }

        /**
         * cacheAsBitmap属性改变
         */
        $cacheAsBitmapChanged():void {
            super.$cacheAsBitmapChanged();
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.assignParentDisplayList(children[i], cacheRoot, cacheRoot);
            }
        }

        private assignParentDisplayList(child:DisplayObject, parentCache:lark.player.DisplayList, newParent:lark.player.DisplayList):void {
            child.$parentDisplayList = newParent;
            child.$setFlags(player.DisplayObjectFlags.DirtyChildren);
            var displayList = child.$displayList;
            if ((child.$renderRegion || displayList) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (child.$displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.assignParentDisplayList(children[i], parentCache, newParent);
                }
            }
        }


        $hitTest(stageX:number, stageY:number, shapeFlag?:boolean):DisplayObject {
            if (!this.$visible || !this.$hasAnyFlags(player.DisplayObjectFlags.TouchEnabled |
                    player.DisplayObjectFlags.TouchChildren)) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix().$data;
            var localX = m[0] * stageX + m[2] * stageY + m[4];
            var localY = m[1] * stageX + m[3] * stageY + m[5];
            if (this.$scrollRect && !this.$scrollRect.contains(localX, localY)) {
                return null;
            }
            if (!this.$getOriginalBounds().contains(localX, localY)) {
                return null;
            }
            if (this.$mask && !this.$mask.$hitTest(stageX, stageY, true)) {
                return null
            }
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                var target = child.$hitTest(stageX, stageY, shapeFlag);
                if (target) {
                    break;
                }
            }
            if (target) {
                if (this.$hasFlags(player.DisplayObjectFlags.TouchChildren)) {
                    return target;
                }
                return this;
            }
            if (this.$hasFlags(player.DisplayObjectFlags.TouchEnabled)) {
                return super.$hitTest(stageX, stageY, shapeFlag);
            }
            return null;
        }

    }
    registerClass(Sprite, Types.Sprite, [Types.DisplayObjectContainer]);
}