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
     * @language en_US
     * The List control displays a vertical or horizontal list of items.
     * The user can select one or more items from the list, depending
     * on the value of the <code>allowMultipleSelection</code> property.
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * List 控件可显示垂直或水平的项目列表。用户可以根据 <code>allowMultipleSelection</code> 属性的值从列表中选择一个或多个项目。
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class List extends ListBase {


        /**
         * @language en_US
         * whether are allowed to multiple selection.
         * If <code>true</code> tap an unselected item will be selected,
         * and tap the item again will cancel selection.
         *
         * @default false
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否允许同时选中多项,设置为 <code>true</code> 时，触摸按下未选中的项呈示器，将会设置该项选中，再次按下将会取消选中。
         * 可以设置多项为选中状态。
         *
         * @default false
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public allowMultipleSelection:boolean = false;

        /**
         * @private
         */
        private _selectedIndices:number[] = [];

        /**
         * @private
         */
        private _proposedSelectedIndices:number[];

        /**
         * @language en_US
         * An Array of numbers representing the indices of the currently selected
         * item or items.
         *
         * @default []
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前选中的一个或多个项目的索引列表。
         *
         * @default []
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get selectedIndices():number[] {
            if (this._proposedSelectedIndices)
                return this._proposedSelectedIndices;
            return this._selectedIndices;
        }

        public set selectedIndices(value:number[]) {
            this.setSelectedIndices(value, false);
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get selectedIndex():number {
            if (this._proposedSelectedIndices) {
                if (this._proposedSelectedIndices.length > 0)
                    return this._proposedSelectedIndices[0];
                return -1;
            }
            return this.$getSelectedIndex();
        }

        public set selectedIndex(value:number) {
            this.setSelectedIndex(value);
        }

        /**
         * @language en_US
         * 当前选中的一个或多个项目的数据源列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前选中的一个或多个项目的数据源列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get selectedItems():any[] {
            var result:any[] = [];
            var list = this.selectedIndices;
            if (list) {
                var count = list.length;
                for (var i = 0; i < count; i++) {
                    result[i] = this.$dataProvider.getItemAt(list[i]);
                }
            }
            return result;
        }

        public set selectedItems(value:any[]) {
            var indices:number[] = [];

            if (value) {
                var count = value.length;

                for (var i = 0; i < count; i++) {
                    var index:number = this.$dataProvider.getItemIndex(value[i]);
                    if (index != -1) {
                        indices.splice(0, 0, index);
                    }
                    if (index == -1) {
                        indices = [];
                        break;
                    }
                }
            }
            this.setSelectedIndices(indices, false);
        }

        /**
         * @language en_US
         * 设置多个选中项
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置多个选中项
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setSelectedIndices(value:number[], emitChangeEvent?:boolean):void {
            var values = this.$ListBase;
            if (emitChangeEvent)
                values[sys.ListBaseKeys.emitChangeAfterSelection] =
                    (values[sys.ListBaseKeys.emitChangeAfterSelection] || emitChangeEvent);

            if (value)
                this._proposedSelectedIndices = value;
            else
                this._proposedSelectedIndices = [];
            this.invalidateProperties();
        }

        /**
         * @language en_US
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties():void {
            super.commitProperties();
            if (this._proposedSelectedIndices) {
                this.commitSelection();
            }
        }

        /**
         * @language en_US
         * 
         * @param emitChangedEvents
         * @returns 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @param emitChangedEvents
         * @returns 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitSelection(emitChangedEvents:boolean = true):boolean {
            var values = this.$ListBase;
            var oldSelectedIndex = values[sys.ListBaseKeys.selectedIndex];
            if (this._proposedSelectedIndices) {
                this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex);

                if (!this.allowMultipleSelection && this._proposedSelectedIndices.length > 0) {
                    var temp:number[] = [];
                    temp.push(this._proposedSelectedIndices[0]);
                    this._proposedSelectedIndices = temp;
                }
                if (this._proposedSelectedIndices.length > 0) {
                    values[sys.ListBaseKeys.proposedSelectedIndex] = this._proposedSelectedIndices[0];
                }
                else {
                    values[sys.ListBaseKeys.proposedSelectedIndex] = -1;
                }
            }

            var retVal = super.commitSelection(false);

            if (!retVal) {
                this._proposedSelectedIndices = null;
                return false;
            }

            var selectedIndex = this.$getSelectedIndex();
            if (selectedIndex > ListBase.NO_SELECTION) {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.indexOf(selectedIndex) == -1)
                        this._proposedSelectedIndices.push(selectedIndex);
                }
                else {
                    this._proposedSelectedIndices = [selectedIndex];
                }
            }

            if (this._proposedSelectedIndices) {
                if (this._proposedSelectedIndices.indexOf(oldSelectedIndex) != -1)
                    this.itemSelected(oldSelectedIndex, true);
                this.commitMultipleSelection();
            }

            if (emitChangedEvents && retVal) {
                if (values[sys.ListBaseKeys.emitChangeAfterSelection]) {
                    this.emitWith(lark.Event.CHANGE)
                    values[sys.ListBaseKeys.emitChangeAfterSelection] = false;
                }
                PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"selectedIndex");
                PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"selectedItem");
            }

            return retVal;
        }

        /**
         * @private
         * 是否是有效的索引
         */
        private isValidIndex = (item:number, index:number, v:number[]):boolean => {
            return this.$dataProvider && (item >= 0) && (item < this.$dataProvider.length) && item % 1 == 0;
        }

        /**
         * @language en_US
         * 提交多项选中项属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 提交多项选中项属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitMultipleSelection():void {
            var removedItems:number[] = [];
            var addedItems:number[] = [];
            var i:number;
            var count:number;

            var selectedIndices = this._selectedIndices;
            var proposedSelectedIndices = this._proposedSelectedIndices;
            if (selectedIndices.length > 0 && proposedSelectedIndices.length > 0) {
                count = proposedSelectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (selectedIndices.indexOf(proposedSelectedIndices[i]) == -1)
                        addedItems.push(proposedSelectedIndices[i]);
                }
                count = selectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (proposedSelectedIndices.indexOf(selectedIndices[i]) == -1)
                        removedItems.push(selectedIndices[i]);
                }
            }
            else if (selectedIndices.length > 0) {
                removedItems = selectedIndices;
            }
            else if (proposedSelectedIndices.length > 0) {
                addedItems = proposedSelectedIndices;
            }

            this._selectedIndices = proposedSelectedIndices;

            if (removedItems.length > 0) {
                count = removedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(removedItems[i], false);
                }
            }

            if (addedItems.length > 0) {
                count = addedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(addedItems[i], true);
                }
            }

            this._proposedSelectedIndices = null;
        }

        /**
         * @private
         * 
         * @param index 
         * @returns 
         */
        $isItemIndexSelected(index:number):boolean {
            if (this.allowMultipleSelection)
                return this._selectedIndices.indexOf(index) != -1;
            return super.$isItemIndexSelected(index);
        }

        /**
         * @language en_US
         * 数据源发生刷新
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据源发生刷新
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public dataProviderRefreshed():void {
            if (this.allowMultipleSelection) {
                return;
            }
            super.dataProviderRefreshed();
        }

        /**
         * @private
         * 计算当前的选中项列表
         */
        private calculateSelectedIndices(index:number):number[] {
            var interval:number[] = [];
            var selectedIndices = this._selectedIndices;
            var length = selectedIndices.length;
            if (length > 0) {
                if (length == 1 && (selectedIndices[0] == index)) {
                    if (!this.$ListBase[sys.ListBaseKeys.requireSelection]) {
                        return interval;
                    }
                    interval.splice(0, 0, selectedIndices[0]);
                    return interval;
                }
                else {
                    var found = false;
                    for (var i = 0; i < length; i++) {
                        if (selectedIndices[i] == index) {
                            found = true;
                        }
                        else if (selectedIndices[i] != index) {
                            interval.splice(0, 0, selectedIndices[i]);
                        }
                    }
                    if (!found) {
                        interval.splice(0, 0, index);
                    }
                    return interval;
                }
            }
            else {
                interval.splice(0, 0, index);
                return interval;
            }
        }

        /**
         * @language en_US
         * 鼠标在项呈示器上弹起，抛出ItemClick事件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 鼠标在项呈示器上弹起，抛出ItemClick事件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onRendererTouchEnd(event:lark.TouchEvent):void {
            if (this.allowMultipleSelection) {
                var itemRenderer = <IItemRenderer> (event.currentTarget);
                var touchDownItemRenderer = this.$ListBase[sys.ListBaseKeys.touchDownItemRenderer];
                if (itemRenderer != touchDownItemRenderer)
                    return;
                this.setSelectedIndices(this.calculateSelectedIndices(itemRenderer.itemIndex), true);
                ItemTapEvent.emitItemTapEvent(this, ItemTapEvent.ITEM_TAP, itemRenderer);
            }
            else {
                super.onRendererTouchEnd(event);
            }
        }
    }

    lark.registerClass(List, Types.List);
}