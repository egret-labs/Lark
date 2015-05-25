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
     * ListBase 是列表控件基类。可显示垂直或水平的项目列表。其功能与 HTML 中的 SELECT 表单元素的功能相似。
     * @event lark.Event.CHANGE 选中的索引已经发生改变,注意：此事件仅在索引改变是由用户触摸操作引起时才抛出。
     * @event lark.Event.CHANGING 选中的索引即将发生改变，可以通过调用事件对象的 preventDefault() 方法来阻止改变。
     * 注意：此事件仅在索引改变是由用户触摸操作引起时才抛出。
     * @event lark.gui.UIEvent.VALUE_COMMIT 选中的索引已经发生改变。此事件无论索引改变是否由触摸操作引起都会抛出。
     */
    export class ListBase extends DataGroup {

        /**
         * 未选中任何项时的索引值
         */
        public static NO_SELECTION:number = -1;

        /**
         * 未设置缓存选中项的值
         */
        public static NO_PROPOSED_SELECTION:number = -2;

        $requireSelection:boolean = false;

        private requireSelectionChanged:boolean = false;

        /**
         * 如果为 true，则控件中必须含有选中的数据项目。
         * 如果该值为 true，则始终将 selectedIndex 属性设置为 0 和 (dataProvider.length - 1) 之间的一个值。
         */
        public get requireSelection():boolean {
            return this.$requireSelection;
        }

        public set requireSelection(value:boolean) {
            if (value == this.$requireSelection)
                return;

            this.$requireSelection = value;

            if (value) {
                this.requireSelectionChanged = true;
                this.invalidateProperties();
            }
        }

        /**
         * 在属性提交前缓存真实的选中项的值
         */
        $proposedSelectedIndex:number = ListBase.NO_PROPOSED_SELECTION;

        $selectedIndex:number = ListBase.NO_SELECTION;

        /**
         * 选中项目的基于 0 的索引。<br/>
         * 或者如果未选中项目，则为-1。设置 selectedIndex 属性会取消选择当前选定的项目并选择指定索引位置的数据项目。
         * 当用户通过与控件交互来更改 selectedIndex 属性时，此控件将分派 change 和 changing 事件。
         * 当以编程方式更改 selectedIndex 属性的值时，此控件不分派 change 和 changing 事件。
         */
        public get selectedIndex():number {
            if (this.$proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION)
                return this.$proposedSelectedIndex;
            return this.$selectedIndex;
        }

        public set selectedIndex(value:number) {
            this.setSelectedIndex(value, false);
        }

        /**
         * 索引改变后是否需要抛出事件
         */
        $dispatchChangeAfterSelection:boolean = false;

        /**
         * 设置选中项
         */
        protected setSelectedIndex(value:number, dispatchChangeEvent:boolean = false):void {
            if (value == this.selectedIndex) {
                return;
            }

            if (dispatchChangeEvent)
                this.$dispatchChangeAfterSelection = (this.$dispatchChangeAfterSelection || dispatchChangeEvent);
            this.$proposedSelectedIndex = value;
            this.invalidateProperties();
        }


        /**
         *  在属性提交前缓存真实选中项的数据源
         */
        $pendingSelectedItem:any = undefined;

        private _selectedItem:any = null;

        /**
         * 当前已选中的项目。设置此属性会取消选中当前选定的项目并选择新指定的项目。<br/>
         * 当用户通过与控件交互来更改 selectedItem 属性时，此控件将分派 change 和 changing 事件。<br/>
         * 当以编程方式更改 selectedItem 属性的值时，此控件不分派 change 和 changing 事件。
         */
        public get selectedItem():any {
            if (this.$pendingSelectedItem !== undefined)
                return this.$pendingSelectedItem;

            if (this.selectedIndex == ListBase.NO_SELECTION || this.dataProvider == null)
                return undefined;

            return this.dataProvider.length > this.selectedIndex ? this.dataProvider.getItemAt(this.selectedIndex) : undefined;
        }

        public set selectedItem(value:any) {
            this.setSelectedItem(value, false);
        }

        /**
         * 设置选中项数据源
         */
        protected setSelectedItem(value:any, dispatchChangeEvent:boolean = false):void {
            if (this.selectedItem === value)
                return;

            if (dispatchChangeEvent)
                this.$dispatchChangeAfterSelection = (this.$dispatchChangeAfterSelection || dispatchChangeEvent);

            this.$pendingSelectedItem = value;
            this.invalidateProperties();
        }

        /**
         * 处理对组件设置的属性
         */
        public commitProperties():void {
            var dataProviderChanged = this.$dataProviderChanged;
            super.commitProperties();

            if (dataProviderChanged) {
                var selectedIndex = this.selectedIndex;
                if (selectedIndex >= 0 && this.$dataProvider && selectedIndex < this.$dataProvider.length)
                    this.itemSelected(selectedIndex, true);
                else if (this.requireSelection)
                    this.$proposedSelectedIndex = 0;
                else
                    this.setSelectedIndex(-1, false);
            }

            if (this.requireSelectionChanged) {
                this.requireSelectionChanged = false;

                if (this.requireSelection &&
                    this.selectedIndex == ListBase.NO_SELECTION &&
                    this.dataProvider &&
                    this.dataProvider.length > 0) {
                    this.$proposedSelectedIndex = 0;
                }
            }

            if (this.$pendingSelectedItem !== undefined) {
                if (this.dataProvider)
                    this.$proposedSelectedIndex = this.dataProvider.getItemIndex(this.$pendingSelectedItem);
                else
                    this.$proposedSelectedIndex = ListBase.NO_SELECTION;

                this.$pendingSelectedItem = undefined;
            }

            var changedSelection:boolean = false;
            if (this.$proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION)
                changedSelection = this.commitSelection();

            if (this.selectedIndexAdjusted) {
                this.selectedIndexAdjusted = false;
                if (!changedSelection) {
                    UIEvent.emitUIEvent(this, UIEvent.VALUE_COMMIT);
                }
            }


        }

        /**
         * 更新项呈示器，以备使用或重用
         */
        public updateRenderer(renderer:IItemRenderer, itemIndex:number, data:any):IItemRenderer {
            this.itemSelected(itemIndex, this.$isItemIndexSelected(itemIndex));
            return super.updateRenderer(renderer, itemIndex, data);
        }

        /**
         * 选中或取消选中项目时调用。子类必须覆盖此方法才可设置选中项。
         * @param index 已选中的项目索引。
         * @param selected true为选中，false取消选中
         */
        protected itemSelected(index:number, selected:boolean):void {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                renderer.selected = selected;
            }
        }

        /**
         * 返回指定索引是否等于当前选中索引
         */
        $isItemIndexSelected(index:number):boolean {
            return index == this.selectedIndex;
        }

        /**
         * 提交选中项属性，返回是否成功提交，false表示被取消
         */
        protected commitSelection(dispatchChangedEvents:boolean = true):boolean {
            var dataProvider = this.$dataProvider;
            var maxIndex = dataProvider ? dataProvider.length - 1 : -1;
            var oldSelectedIndex = this.$selectedIndex;
            var tmpProposedIndex:number = this.$proposedSelectedIndex;
            if (tmpProposedIndex < ListBase.NO_SELECTION)
                tmpProposedIndex = ListBase.NO_SELECTION;
            if (tmpProposedIndex > maxIndex)
                tmpProposedIndex = maxIndex;
            if (this.$requireSelection && tmpProposedIndex == ListBase.NO_SELECTION &&
                dataProvider && dataProvider.length > 0) {
                this.$proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;
                this.$dispatchChangeAfterSelection = false;
                return false;
            }



            if (this.$dispatchChangeAfterSelection) {
                var result = this.emitWith(Event.CHANGING, false, true);
                if (!result) {
                    this.itemSelected(this.$proposedSelectedIndex, false);
                    this.$proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;
                    this.$dispatchChangeAfterSelection = false;
                    return false;
                }

            }

            this.$selectedIndex = tmpProposedIndex;
            this.$proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;

            if (oldSelectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(oldSelectedIndex, false);
            if (this.$selectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(this.$selectedIndex, true);

            //子类若需要自身抛出Change事件，而不是在此处抛出，可以设置dispatchChangedEvents为false
            if (dispatchChangedEvents) {
                if (this.$dispatchChangeAfterSelection) {
                    this.emitWith(Event.CHANGE);
                    this.$dispatchChangeAfterSelection = false;
                }
                UIEvent.emitUIEvent(this, UIEvent.VALUE_COMMIT);
            }

            return true;
        }

        private selectedIndexAdjusted:boolean = false;

        /**
         * 仅调整选中索引值而不更新选中项,即在提交属性阶段itemSelected方法不会被调用，也不会触发changing和change事件。
         * @param newIndex 新索引。
         * @param add 如果已将项目添加到组件，则为 true；如果已删除项目，则为 false。
         */
        protected adjustSelection(newIndex:number, add:boolean = false):void {
            if (this.$proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION)
                this.$proposedSelectedIndex = newIndex;
            else
                this.$selectedIndex = newIndex;
            this.selectedIndexAdjusted = true;
            this.invalidateProperties();
        }

        /**
         * 数据项添加
         */
        protected itemAdded(item:any, index:number):void {
            super.itemAdded(item, index);
            if (this.selectedIndex == ListBase.NO_SELECTION) {
                if (this.$requireSelection)
                    this.adjustSelection(index, true);
            }
            else if (index <= this.selectedIndex) {
                this.adjustSelection(this.selectedIndex + 1, true);
            }
        }

        /**
         * 数据项移除
         */
        protected itemRemoved(item:any, index:number):void {
            super.itemRemoved(item, index);
            if (this.selectedIndex == ListBase.NO_SELECTION)
                return;

            var selectedIndex = this.selectedIndex;
            if (index == selectedIndex) {
                if (this.requireSelection && this.$dataProvider && this.$dataProvider.length > 0) {
                    if (index == 0) {
                        this.$proposedSelectedIndex = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0, false);
                }
                else
                    this.adjustSelection(-1, false);
            }
            else if (index < selectedIndex) {
                this.adjustSelection(selectedIndex - 1, false);
            }
        }


        /**
         * 数据源改变事件处理
         */
        protected onCollectionChange(event:CollectionEvent):void {
            super.onCollectionChange(event);
            if (event.kind == CollectionEventKind.RESET) {
                if (this.$dataProvider.length == 0) {
                    this.setSelectedIndex(ListBase.NO_SELECTION, false);
                }
            }
            else if (event.kind == CollectionEventKind.REFRESH) {
                this.dataProviderRefreshed();
            }
        }

        /**
         * 数据源刷新
         */
        protected dataProviderRefreshed():void {
            this.setSelectedIndex(ListBase.NO_SELECTION, false);
        }

        /**
         * 项呈示器被添加
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        protected rendererAdded(renderer:IItemRenderer, index:number, item:any):void {
            renderer.on(TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.on(TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
        }

        /**
         * 项呈示器被移除
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        protected rendererRemoved(renderer:IItemRenderer, index:number, item:any):void {
            renderer.removeListener(TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.removeListener(TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
        }

        $mouseDownItemRenderer:IItemRenderer = null;

        /**
         * 鼠标在项呈示器上按下
         */
        protected onRendererTouchBegin(event:TouchEvent):void {
            if (event.$isDefaultPrevented)
                return;
            this.$mouseDownItemRenderer = <IItemRenderer> (event.$currentTarget);
            this.$stage.on(TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
        }

        /**
         * 鼠标在项呈示器上弹起，抛出ItemClick事件。
         */
        protected onRendererTouchEnd(event:TouchEvent):void {
            var itemRenderer = <IItemRenderer> (event.$currentTarget);
            if (itemRenderer != this.$mouseDownItemRenderer)
                return;
            this.setSelectedIndex(itemRenderer.itemIndex, true);
            ItemClickEvent.emitItemClickEvent(this,ItemClickEvent.ITEM_CLICK,itemRenderer);
        }

        /**
         * 鼠标在舞台上弹起
         */
        private stage_touchEndHandler(event:Event):void {
            var stage = <Stage>event.$currentTarget;
            stage.removeListener(TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this.$mouseDownItemRenderer = null;
        }
    }

    registerClass(ListBase, Types.ListBase);

    if (DEBUG) {
        ListBase.prototype.addChild = function (child) {
            lark.$error(2203);
            return null;
        };
        ListBase.prototype.addChildAt = function (child, index) {
            lark.$error(2203);
            return null;
        };
        ListBase.prototype.removeChild = function (child) {
            lark.$error(2203);
            return null;
        };
        ListBase.prototype.removeChildAt = function (index) {
            lark.$error(2203);
            return null;
        };
        ListBase.prototype.setChildIndex = function (child, index) {
            lark.$error(2203);
        };
        ListBase.prototype.swapChildren = function (child1, child2) {
            lark.$error(2203);
        };
        ListBase.prototype.swapChildrenAt = function (index1, index2) {
            lark.$error(2203);
        };
    }
}