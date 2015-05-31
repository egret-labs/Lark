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
     * Group 是自动布局的容器基类。如果包含的子项内容太大需要滚动显示，可以在在 Group 外部包裹一层 Scroller 组件
     * (将 Group 实例赋值给 Scroller 组件的 viewport 属性)。Scroller 会为 Group 添加滚动的触摸操作功能，并显示垂直或水平的滚动条。
     */
    export class Group extends lark.Sprite implements UIComponent {

        public constructor() {
            super();
            sys.UIComponentImpl.call(this);
            this.$stateValues.parent = this;
        }

        /**
         * [只写] 此属性通常在 EXML 的解析器中调用，便于快速添加多个子项。
         */
        public set elementsContent(value:lark.DisplayObject[]) {
            if (value) {
                var length = value.length;
                for (var i = 0; i < length; i++) {
                    this.addChild(value[i]);
                }
            }
        }

        $layout:LayoutBase = null;

        /**
         * 此容器的布局对象
         */
        public get layout():LayoutBase {
            return this.$layout;
        }

        public set layout(value:LayoutBase) {
            this.$setLayout(value);
        }

        $setLayout(value:LayoutBase):void {
            if (this.$layout == value)
                return;
            if (this.$layout) {
                this.$layout.target = null;
            }

            this.$layout = value;

            if (value) {
                value.target = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        }

        /**
         * 视域的内容的宽度
         */
        public get contentWidth():number {
            return this.$uiValues[sys.UIValues.contentWidth];
        }

        /**
         * 视域的内容的高度
         */
        public get contentHeight():number {
            return this.$uiValues[sys.UIValues.contentHeight];
        }

        /**
         * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
         */
        public setContentSize(width:number, height:number):void {
            width = Math.ceil(+width || 0);
            height = Math.ceil(+height || 0);
            var values = this.$uiValues;
            var wChange = (values[sys.UIValues.contentWidth] !== width);
            var hChange = (values[sys.UIValues.contentHeight] !== height);
            if (!wChange && !hChange) {
                return;
            }
            values[sys.UIValues.contentWidth] = width;
            values[sys.UIValues.contentHeight] = height;
            if(wChange){
                PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"contentWidth");
            }
            if(hChange){
                PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"contentHeight");
            }
        }

        /**
         * 是否启用容器滚动。如果为 true，则将子项剪切到视区的边界，配合设置scrollH和scrollV属性将能滚动视区。
         * 如果为 false，则容器子代会从容器边界扩展过去，而设置scrollH和scrollV也无效。默认false。
         */
        public get scrollEnabled():boolean {
            return this.$hasFlags(sys.UIFlags.scrollEnabled);
        }

        public set scrollEnabled(value:boolean) {
            value = !!value;
            if (value === this.$hasFlags(sys.UIFlags.scrollEnabled))
                return;
            this.$toggleFlags(sys.UIFlags.scrollEnabled, value);
            this.updateScrollRect();
        }

        /**
         * 可视区域水平方向起始点
         */
        public get scrollH():number {
            return this.$uiValues[sys.UIValues.scrollH];
        }

        public set scrollH(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value === values[sys.UIValues.scrollH])
                return;
            values[sys.UIValues.scrollH] = value;
            if (this.updateScrollRect() && this.$layout) {
                this.$layout.scrollPositionChanged();
            }
            PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"scrollH");
        }

        /**
         * 可视区域竖直方向起始点
         */
        public get scrollV():number {
            return this.$uiValues[sys.UIValues.scrollV];
        }

        public set scrollV(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value == values[sys.UIValues.scrollV])
                return;
            values[sys.UIValues.scrollV] = value;
            if (this.updateScrollRect() && this.$layout) {
                this.$layout.scrollPositionChanged();
            }
            PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"scrollV");
        }

        private updateScrollRect():boolean {
            var values = this.$uiValues;
            var hasClip = this.$hasFlags(sys.UIFlags.scrollEnabled)
            if (hasClip) {
                this.scrollRect = lark.$TempRectangle.setTo(values[sys.UIValues.scrollH],
                    values[sys.UIValues.scrollV],
                    values[sys.UIValues.width], values[sys.UIValues.height]);
            }
            else if (this.$scrollRect) {
                this.scrollRect = null;
            }
            return hasClip;
        }

        /**
         * 布局元素子项的数量。
         */
        public get numElements():number {
            return this.$children.length;
        }

        /**
         * 获取一个布局元素子项
         */
        public getElementAt(index:number):lark.DisplayObject {
            return this.$children[index];
        }

        /**
         * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
         * 通常在即将重新布局子项之前会被调用一次，容器覆盖此方法提前释放已经不可见的子元素。
         * @param startIndex 可视元素起始索引（包括）
         * @param endIndex 可视元素结束索引（包括）
         */
        public setVirtualElementIndicesInView(startIndex:number, endIndex:number):void {

        }

        /**
         * 背景的透明区域是否可以响应触摸事件。默认 true。
         */
        public touchBackground:boolean = true;

        $hitTest(stageX:number, stageY:number, shapeFlag?:boolean):lark.DisplayObject {
            var target = super.$hitTest(stageX, stageY, shapeFlag);
            if (target || !this.touchBackground || shapeFlag ||
                this.$displayObjectFlags & lark.sys.DisplayObjectFlags.PixelHitTest) {
                return target;
            }
            if (!this.$visible || !this.$hasFlags(lark.sys.DisplayObjectFlags.TouchEnabled)) {
                return null;
            }
            var point = this.globalToLocal(stageX, stageY, lark.$TempPoint);
            var values = this.$uiValues;
            var bounds = lark.$TempRectangle.setTo(0, 0, values[sys.UIValues.width], values[sys.UIValues.height]);
            if (bounds.contains(point.x, point.y)) {
                return this;
            }
            return null;
        }


        $stateValues:sys.StateValues = new sys.StateValues();

        /**
         * 为此组件定义的视图状态。
         */
        public states:State[];

        /**
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         */
        public currentState:string;

        /**
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         */
        public hasState:(stateName:string)=>boolean;
        /**
         * 初始化所有视图状态
         */
        private initializeStates:(stage:lark.Stage)=>void;
        /**
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        private commitCurrentState:()=>void;

        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        public invalidateState():void {
            if (this.$hasFlags(sys.UIFlags.stateIsDirty)) {
                return;
            }
            this.$setFlags(sys.UIFlags.stateIsDirty);
            this.invalidateProperties();
        }

        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        protected getCurrentState():string {
            return "";
        }

        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag:(event?:Event)=>void;

        //=======================UIComponent接口实现===========================
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {
            if (!this.$layout) {
                this.$setLayout(new BasicLayout());
            }
            this.initializeStates(this.$stage);
        }

        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated():void {

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {
            sys.UIComponentImpl.prototype["commitProperties"].call(this);
            if (this.$hasFlags(sys.UIFlags.stateIsDirty)) {
                this.$removeFlags(sys.UIFlags.stateIsDirty);
                var values = this.$stateValues;
                if (!values.explicitState) {
                    values.currentState = this.getCurrentState();
                    this.commitCurrentState();
                }
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {
            if (!this.$layout) {
                this.setMeasuredSize(0, 0);
                return;
            }
            this.$layout.measure();
        }

        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            if (this.$layout) {
                this.$layout.updateDisplayList(unscaledWidth, unscaledHeight);
            }
            this.updateScrollRect();
        }


        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout():void {
        }

        $uiValues:Float64Array;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        public includeInLayout:boolean;
        /**
         * 距父级容器离左边距离
         */
        public left:number;

        /**
         * 距父级容器右边距离
         */
        public right:number;

        /**
         * 距父级容器顶部距离
         */
        public top:number;

        /**
         * 距父级容器底部距离
         */
        public bottom:number;

        /**
         * 在父级容器中距水平中心位置的距离
         */
        public horizontalCenter:number;

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public verticalCenter:number;

        /**
         * 相对父级容器宽度的百分比
         */
        public percentWidth:number;

        /**
         * 相对父级容器高度的百分比
         */
        public percentHeight:number;

        /**
         * 外部显式指定的宽度
         */
        public explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        public explicitHeight:number;


        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        public minWidth:number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        public maxWidth:number;

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        public minHeight:number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        public maxHeight:number;

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        public setMeasuredSize(width:number, height:number):void {
        }

        /**
         * 标记提交过需要延迟应用的属性
         */
        public invalidateProperties():void {
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
        }

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize(recursive?:boolean):void {
        }

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList():void {
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
        }

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
        }

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
        }

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
        }
    }

    sys.implementUIComponent(Group, lark.Sprite, true);
    sys.mixin(Group, sys.StateClient);
    registerProperty(Group, "elementsContent", "Array", true);
    registerProperty(Group, "states", "State[]");
    lark.registerClass(Group, Types.Group, [Types.UIComponent,Types.IViewport]);
}