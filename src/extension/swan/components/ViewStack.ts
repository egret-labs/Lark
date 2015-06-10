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
     * 层级堆叠容器,一次只显示一个子对象。
     */
    export class ViewStack extends Group implements ICollection {
        /**
         * 创建一个ViewStack实例
         */
        public constructor() {
            super();
        }

        /**
         * 此容器的布局对象为只读,默认限制为BasicLayout。
         */
        public get layout():LayoutBase {
            return this.$layout;
        }

        private _selectedChild:lark.DisplayObject = null;
        /**
         * 当前选中的子项
         */
        public get selectedChild():lark.DisplayObject {
            var index = this.selectedIndex;
            if (index >= 0 && index < this.numChildren)
                return this.getChildAt(index);
            return null;
        }

        public set selectedChild(value:lark.DisplayObject) {
            var index = this.getChildIndex(value);
            if (index >= 0 && index < this.numChildren)
                this.setSelectedIndex(index);
        }

        /**
         * 在属性提交前缓存选中项索引
         */
        private proposedSelectedIndex:number = ListBase.NO_PROPOSED_SELECTION;

        public _selectedIndex:number = -1;
        /**
         * 当前选中子项的索引
         */
        public get selectedIndex():number {
            return this.proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex;
        }

        public set selectedIndex(value:number) {
            value = +value|0;
            this.setSelectedIndex(value);
        }

        /**
         * 设置选中项索引
         */
        private setSelectedIndex(value:number):void {
            if (value == this.selectedIndex) {
                return;
            }
            this.proposedSelectedIndex = value;
            this.invalidateProperties();
            PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"selectedIndex");
        }

        /**
         * 一个子项被添加到容器内，此方法不仅在操作addChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        $childAdded(child:lark.DisplayObject, index:number):void {
            super.$childAdded(child, index);
            this.showOrHide(child, false);
            var selectedIndex = this.selectedIndex;
            if (selectedIndex == -1) {
                this.setSelectedIndex(index);
            }
            else if (index <= this.selectedIndex && this.$stage) {
                this.setSelectedIndex(selectedIndex + 1);
            }
            CollectionEvent.emitCollectionEvent(this, CollectionEvent.COLLECTION_CHANGE,
                CollectionEventKind.ADD, index, -1, [child.name]);
        }

        /**
         * 一个子项从容器内移除，此方法不仅在操作removeChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        $childRemoved(child:lark.DisplayObject, index:number):void {
            super.$childRemoved(child, index);
            this.showOrHide(child, true);
            var selectedIndex = this.selectedIndex;
            if (index == selectedIndex) {
                if (this.numChildren > 0) {
                    if (index == 0) {
                        this.proposedSelectedIndex = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0);
                }
                else
                    this.setSelectedIndex(-1);
            }
            else if (index < selectedIndex) {
                this.setSelectedIndex(selectedIndex - 1);
            }
            CollectionEvent.emitCollectionEvent(this, CollectionEvent.COLLECTION_CHANGE,
                CollectionEventKind.REMOVE, index, -1, [child.name]);
        }

        /**
         * 处理对组件设置的属性
         */
        protected commitProperties():void {
            super.commitProperties();
            if (this.proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION) {
                this.commitSelection(this.proposedSelectedIndex);
                this.proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;
            }
        }

        private commitSelection(newIndex:number):void {
            if (newIndex >= 0 && newIndex < this.numChildren) {
                this._selectedIndex = newIndex;
                if (this._selectedChild) {
                    this.showOrHide(this._selectedChild, false);
                }
                this._selectedChild = this.getElementAt(this._selectedIndex);
                this.showOrHide(this._selectedChild, true);
            }
            else {
                this._selectedChild = null;
                this._selectedIndex = -1;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        }

        private showOrHide(child:lark.DisplayObject, visible:boolean):void {
            if (lark.is(child, swan.Types.UIComponent)) {
                (<swan.UIComponent><any>child).includeInLayout = visible;
            }
            child.visible = visible;
        }

        /**
         * 子项数量
         */
        public get length():number {
            return this.$children.length;
        }

        public getItemAt(index:number):any {
            var element:lark.DisplayObject = this.$children[index];
            return element ? element.name : "";
        }

        public getItemIndex(item:any):number {
            var list = this.$children;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                if (list[i].name == item) {
                    return i;
                }
            }
            return -1;
        }
    }
    registerBindable(ViewStack.prototype,"selectedIndex");
    lark.registerClass(ViewStack,Types.ViewStack);

    if(DEBUG){
        lark.$markReadOnly(ViewStack.prototype,"length");
        lark.$markReadOnly(ViewStack.prototype,"layout");
    }
}