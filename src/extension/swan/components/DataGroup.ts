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
     * DataGroup 是数据容器基类,将数据项目转换为可视元素以进行显示
     */
    export class DataGroup extends Group{

        private _useVirtualLayout:boolean = true;
        /**
         * 是否使用虚拟布局,默认true
         */
        public get useVirtualLayout():boolean {
            return this.$layout ? this.$layout.$useVirtualLayout : this._useVirtualLayout;
        }

        public set useVirtualLayout(value:boolean) {
            value = !!value;
            if (value === this._useVirtualLayout)
                return;

            this._useVirtualLayout = value;
            if (this.$layout)
                this.$layout.useVirtualLayout = value;
        }

        $setLayout(value:LayoutBase) {
            if (value == this.$layout)
                return;

            if (this.$layout) {
                this.$layout.setTypicalSize(0, 0);
                this.$layout.removeListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }

            if (this.$layout && value && (this.$layout.$useVirtualLayout != value.$useVirtualLayout))
                this.onUseVirtualLayoutChanged();
            super.$setLayout(value);
            if (value) {
                var rect = this.typicalLayoutRect;
                if (rect) {
                    value.setTypicalSize(rect.width, rect.height);
                }
                value.useVirtualLayout = this._useVirtualLayout;
                value.on("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
        }

        private useVirtualLayoutChanged:boolean = false;

        /**
         * 是否使用虚拟布局标记改变
         */
        private onUseVirtualLayoutChanged(event?:lark.Event):void {
            this.useVirtualLayoutChanged = true;
            this.cleanFreeRenderer = true;
            this.removeDataProviderListener();
            this.invalidateProperties();
        }

        public setVirtualElementIndicesInView(startIndex:number, endIndex:number):void {
            if (!this.$layout || !this.$layout.$useVirtualLayout) {
                return;
            }
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = +keys[i];
                if (index < startIndex || index > endIndex) {
                    this.freeRendererByIndex(index);
                }
            }
        }

        public getElementAt(index:number):lark.DisplayObject {
            if (index < 0 || index >= this.$dataProvider.length)
                return null;
            var renderer = this.$indexToRenderer[index];
            if (!renderer) {
                var item:any = this.$dataProvider.getItemAt(index);
                renderer = this.createVirtualRenderer(item);
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                if (this.createNewRendererFlag) {
                    renderer.validateNow();
                    this.createNewRendererFlag = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
            return renderer;
        }

        private rendererToClassMap:any = {};
        private freeRenderers:any = {};

        /**
         * 释放指定索引处的项呈示器
         */
        private freeRendererByIndex(index:number):void {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                delete this.$indexToRenderer[index];
                this.doFreeRenderer(renderer);
            }
        }

        private doFreeRenderer(renderer:IItemRenderer):void{
            var rendererClass = this.rendererToClassMap[renderer.$hashCode];
            var hashCode = rendererClass.$hashCode;
            if (!this.freeRenderers[hashCode]) {
                this.freeRenderers[hashCode] = [];
            }
            this.freeRenderers[hashCode].push(renderer);
            renderer.visible = false;
        }

        /**
         * 是否创建了新的项呈示器标志
         */
        private createNewRendererFlag:boolean = false;

        /**
         * 标记组件，以便在稍后屏幕更新期间调用该组件的 measure() 方法
         */
        public invalidateSize():void {
            if (!this.createNewRendererFlag) {//虚拟布局时创建子项不需要重新验证
                super.invalidateSize();
            }
        }

        /**
         * 为指定索引创建虚拟的项呈示器
         */
        private createVirtualRenderer(item:any):IItemRenderer {
            var renderer:IItemRenderer;
            var rendererClass = this.itemToRendererClass(item);
            var hashCode = rendererClass.$hashCode;
            var freeRenderers = this.freeRenderers;
            if (freeRenderers[hashCode] && freeRenderers[hashCode].length > 0) {
                renderer = freeRenderers[hashCode].pop();
                renderer.visible = true;
                return renderer;
            }
            this.createNewRendererFlag = true;
            return this.createOneRenderer(rendererClass);
        }

        /**
         * 根据rendererClass创建一个Renderer,并添加到显示列表
         */
        private createOneRenderer(rendererClass:any):IItemRenderer {
            var renderer = <IItemRenderer> (new rendererClass());
            this.rendererToClassMap[renderer.$hashCode] = rendererClass;
            if (!lark.is(renderer, Types.IItemRenderer)) {
                return null;
            }
            super.addChild(renderer);
            return renderer;
        }

        $dataProviderChanged:boolean = false;

        $dataProvider:ICollection = null;

        /**
         * 列表数据源，请使用实现了ICollection接口的数据类型，例如 ArrayCollection
         */
        public get dataProvider():ICollection {
            return this.$dataProvider;
        }

        public set dataProvider(value:ICollection) {
            if (this.$dataProvider == value)
                return;
            this.removeDataProviderListener();
            this.$dataProvider = value;
            this.$dataProviderChanged = true;
            this.cleanFreeRenderer = true;
            this.invalidateProperties();
            this.invalidateSize();
            this.invalidateDisplayList();
        } 

        /**
         * 移除数据源监听
         */
        private removeDataProviderListener():void {
            if (this.$dataProvider)
                this.$dataProvider.removeListener(CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
        }

        /**
         * 数据源改变事件处理
         */
        protected onCollectionChange(event:CollectionEvent):void {
            switch (event.kind) {
                case CollectionEventKind.ADD:
                    this.itemAddedHandler(event.items, event.location);
                    break;
                case CollectionEventKind.REMOVE:
                    this.itemRemovedHandler(event.items, event.location);
                    break;
                case CollectionEventKind.UPDATE:
                case CollectionEventKind.REPLACE:
                    this.itemUpdatedHandler(event.items[0], event.location);
                    break;
                case CollectionEventKind.RESET:
                case CollectionEventKind.REFRESH:
                    if (this.$layout && this.$layout.$useVirtualLayout) {
                        var indexToRenderer = this.$indexToRenderer;
                        var keys = Object.keys(indexToRenderer);
                        var length = keys.length;
                        for (var i = 0; i < length; i) {
                            var index = +keys[i];
                            this.freeRendererByIndex(index);
                        }
                    }
                    this.$dataProviderChanged = true;
                    this.invalidateProperties();
                    break;
            }

            this.invalidateSize();
            this.invalidateDisplayList();
        }

        /**
         * 数据源添加项目事件处理
         */
        private itemAddedHandler(items:any[], index:number):void {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.itemAdded(items[i], index + i);
            }
            this.resetRenderersIndices();
        }

        /**
         * 数据源移除项目事件处理
         */
        private itemRemovedHandler(items:any[], location:number):void {
            var length = items.length;
            for (var i = length - 1; i >= 0; i--) {
                this.itemRemoved(items[i], location + i);
            }

            this.resetRenderersIndices();
        }

        /**
         * 添加一项
         */
        protected itemAdded(item:any, index:number):void {
            if (this.$layout)
                this.$layout.elementAdded(index);

            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.$indexToRenderer.splice(index, 0, null);
                return;
            }
            var renderer = this.createVirtualRenderer(item);
            this.$indexToRenderer.splice(index, 0, renderer);
            if (renderer) {
                this.updateRenderer(renderer, index, item);
                if(this.createNewRendererFlag){
                    this.createNewRendererFlag = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
        }

        /**
         * 移除一项
         */
        protected itemRemoved(item:any, index:number):void {
            if (this.$layout)
                this.$layout.elementRemoved(index);
            var oldRenderer = this.$indexToRenderer[index];

            if (this.$indexToRenderer.length > index)
                this.$indexToRenderer.splice(index, 1);

            if (oldRenderer) {
                if(this.$layout&&this.$layout.$useVirtualLayout){
                    this.doFreeRenderer(oldRenderer);
                }
                else{
                    this.rendererRemoved(oldRenderer, index, item);
                    super.removeChild(oldRenderer);
                }
            }
        }

        /**
         * 更新当前所有项的索引
         */
        private resetRenderersIndices():void {
            var indexToRenderer = this.$indexToRenderer;
            if (indexToRenderer.length == 0)
                return;

            if (this.$layout && this.$layout.$useVirtualLayout) {
                var keys = Object.keys(indexToRenderer);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var index = +keys[i];
                    this.resetRendererItemIndex(index);
                }
            }
            else {
                var indexToRendererLength = indexToRenderer.length;
                for (index = 0; index < indexToRendererLength; index++) {
                    this.resetRendererItemIndex(index);
                }
            }
        }

        /**
         * 数据源更新或替换项目事件处理
         */
        private itemUpdatedHandler(item:any, location:number):void {
            if (this.renderersBeingUpdated) {
                return;//防止无限循环
            }

            var renderer = this.$indexToRenderer[location];
            if (renderer)
                this.updateRenderer(renderer, location, item);
        }

        /**
         * 调整指定项呈示器的索引值
         */
        private resetRendererItemIndex(index:number):void {
            var renderer = this.$indexToRenderer[index];
            if (renderer)
                renderer.itemIndex = index;
        }


        /**
         * 项呈示器改变
         */
        private itemRendererChanged:boolean = false;

        private _itemRenderer:any = null;
        /**
         * 用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口。<br/>
         * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
         */
        public get itemRenderer():any {
            return this._itemRenderer;
        }

        public set itemRenderer(value:any) {
            if (this._itemRenderer == value)
                return;
            this._itemRenderer = value;
            this.itemRendererChanged = true;
            this.typicalItemChanged = true;
            this.cleanFreeRenderer = true;
            this.removeDataProviderListener();
            this.invalidateProperties();
        }

        private _itemRendererFunction:(item:any)=>any = null;
        /**
         * 为某个特定数据项返回一个项呈示器类定义的函数。
         * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
         */
        public get itemRendererFunction():(item:any)=>any {
            return this._itemRendererFunction;
        }

        public set itemRendererFunction(value:(item:any)=>any) {
            if (this._itemRendererFunction == value)
                return;
            this._itemRendererFunction = value;
            this.itemRendererChanged = true;
            this.typicalItemChanged = true;
            this.removeDataProviderListener();
            this.invalidateProperties();
        }

        /**
         * 为特定的数据项返回项呈示器的工厂实例
         */
        private itemToRendererClass(item:any):any {
            var rendererClass:any;
            if (this._itemRendererFunction) {
                rendererClass = this._itemRendererFunction(item);
            }
            if (!rendererClass) {
                rendererClass = this._itemRenderer;
            }
            if (!rendererClass) {
                rendererClass = ItemRenderer;
            }
            if (!rendererClass.$hashCode) {
                rendererClass.$hashCode = lark.$hashCount++;
            }
            return rendererClass;
        }

        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {
            if (!this.$layout) {
                var layout:VerticalLayout = new VerticalLayout();
                layout.gap = 0;
                layout.horizontalAlign = JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            super.createChildren();
        }


        /**
         * 处理对组件设置的属性
         */
        protected commitProperties():void {
            if (this.itemRendererChanged || this.$dataProviderChanged || this.useVirtualLayoutChanged) {
                this.removeAllRenderers();
                if (this.$layout)
                    this.$layout.clearVirtualLayoutCache();
                this.setTypicalLayoutRect(null);
                this.useVirtualLayoutChanged = false;
                this.itemRendererChanged = false;
                if (this.$dataProvider)
                    this.$dataProvider.on(CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                }
                else {
                    this.createRenderers();
                }
                if (this.$dataProviderChanged) {
                    this.$dataProviderChanged = false;
                    this.scrollV = this.scrollH = 0;
                }
            }

            super.commitProperties();

            if (this.typicalItemChanged) {
                this.typicalItemChanged = false;
                if (this.$dataProvider && this.$dataProvider.length > 0) {
                    this.typicalItem = this.$dataProvider.getItemAt(0);
                    this.measureRendererSize();
                }
            }
        }

        /**
         * 计算组件的默认大小和（可选）默认最小大小
         */
        protected measure():void {
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            super.measure();
        }


        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            var useVirtualLayout = (this.$layout && this.$layout.$useVirtualLayout);
            if (useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            if (useVirtualLayout) {
                //检查索引 0 处的项测量大小是否发生改变，若改变就重新计算 typicalLayoutRect
                var rect = this.typicalLayoutRect;
                if (rect) {
                    var renderer = this.$indexToRenderer[0];
                    if (renderer) {
                        var bounds = lark.$TempRectangle;
                        renderer.getPreferredBounds(bounds);
                        if (bounds.width != rect.width || bounds.height != rect.height) {
                            this.typicalLayoutRect = null;
                        }
                    }
                }
            }
        }

        /**
         * 用于测试默认大小的数据
         */
        private typicalItem:any;

        private typicalItemChanged:boolean = false;

        /**
         * 确保测量过默认条目大小。
         */
        private ensureTypicalLayoutElement():void {
            if (this.typicalLayoutRect)
                return;

            if (this.$dataProvider && this.$dataProvider.length > 0) {
                this.typicalItem = this.$dataProvider.getItemAt(0);
                this.measureRendererSize();
            }
        }

        /**
         * 测量项呈示器默认尺寸
         */
        private measureRendererSize():void {
            if (!this.typicalItem) {
                this.setTypicalLayoutRect(null);
                return;
            }
            var typicalRenderer = this.createVirtualRenderer(this.typicalItem);
            if (!typicalRenderer) {
                this.setTypicalLayoutRect(null);
                return;
            }
            this.updateRenderer(typicalRenderer, 0, this.typicalItem);
            typicalRenderer.validateNow();
            var bounds = lark.$TempRectangle;
            typicalRenderer.getPreferredBounds(bounds);
            var rect = new lark.Rectangle(0, 0, bounds.width, bounds.height);
            if(this.$layout&&this.$layout.$useVirtualLayout){
                if(this.createNewRendererFlag){
                    this.rendererAdded(typicalRenderer,0,this.typicalItem);
                }
                this.doFreeRenderer(typicalRenderer);
            }
            else{
                super.removeChild(typicalRenderer);
            }
            this.setTypicalLayoutRect(rect);
            this.createNewRendererFlag = false;
        }

        /**
         * 项呈示器的默认尺寸
         */
        private typicalLayoutRect:lark.Rectangle = null;

        /**
         * 设置项目默认大小
         */
        private setTypicalLayoutRect(rect:lark.Rectangle):void {
            this.typicalLayoutRect = rect;
            if (this.$layout) {
                if (rect) {
                    this.$layout.setTypicalSize(rect.width, rect.height);
                }
                else {
                    this.$layout.setTypicalSize(0, 0);
                }
            }
        }


        /**
         * 索引到项呈示器的转换数组
         */
        $indexToRenderer:IItemRenderer[] = [];
        /**
         * 清理freeRenderer标志
         */
        private cleanFreeRenderer:boolean = false;

        /**
         * 移除所有项呈示器
         */
        private removeAllRenderers():void {
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = keys[i];
                var renderer = indexToRenderer[index];
                if (renderer) {
                    this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                    super.removeChild(renderer);
                }
            }
            this.$indexToRenderer = [];
            if (this.cleanFreeRenderer) {
                var freeRenderers = this.freeRenderers;
                var keys = Object.keys(freeRenderers);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var hashCode = keys[i];
                    var list:IItemRenderer[] = freeRenderers[hashCode];
                    var length = list.length;
                    for (var i = 0; i < length; i++) {
                        renderer = list[i];
                        this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                        super.removeChild(renderer);
                    }
                }
                this.freeRenderers = {};
                this.rendererToClassMap = {};
                this.cleanFreeRenderer = false;
            }
        }

        /**
         * 为数据项创建项呈示器
         */
        private createRenderers():void {
            if (!this.$dataProvider)
                return;
            var index = 0;
            var length = this.$dataProvider.length;
            for (var i = 0; i < length; i++) {
                var item = this.$dataProvider.getItemAt(i);
                var rendererClass = this.itemToRendererClass(item);
                var renderer:IItemRenderer = this.createOneRenderer(rendererClass);
                if (!renderer)
                    continue;
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                this.rendererAdded(renderer, index, item);
                index++;
            }
        }

        /**
         * 正在更新数据项的标志
         */
        private renderersBeingUpdated:boolean = false;

        /**
         * 更新项呈示器
         */
        public updateRenderer(renderer:IItemRenderer, itemIndex:number, data:any):IItemRenderer {
            this.renderersBeingUpdated = true;
            renderer.itemIndex = itemIndex;
            renderer.data = data;
            this.renderersBeingUpdated = false;
            return renderer;
        }

        /**
         * 获得对象容器的子对象总数
         */
        public get numElements():number {
            if (!this.$dataProvider)
                return 0;
            return this.$dataProvider.length;
        }


        /**
         * 项呈示器被添加
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        protected rendererAdded(renderer:IItemRenderer, index:number, item:any):void {
        }

        /**
         * 项呈示器被移除
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        protected rendererRemoved(renderer:IItemRenderer, index:number, item:any):void {
        }
    }

    registerProperty(DataGroup, "itemRenderer", "Class");
    registerProperty(DataGroup, "dataProvider", "swan.ICollection", true);
    lark.registerClass(DataGroup, Types.DataGroup);
}