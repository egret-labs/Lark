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
     * @private
     */
    const enum Keys{
        contentWidth,
        contentHeight,
        scrollH,
        scrollV,
        scrollEnabled,
        touchThrough
    }

    /**
     * @language en_US
     * Group 是自动布局的容器基类。如果包含的子项内容太大需要滚动显示，可以在在 Group 外部包裹一层 Scroller 组件
     * (将 Group 实例赋值给 Scroller 组件的 viewport 属性)。Scroller 会为 Group 添加滚动的触摸操作功能，并显示垂直或水平的滚动条。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Group 是自动布局的容器基类。如果包含的子项内容太大需要滚动显示，可以在在 Group 外部包裹一层 Scroller 组件
     * (将 Group 实例赋值给 Scroller 组件的 viewport 属性)。Scroller 会为 Group 添加滚动的触摸操作功能，并显示垂直或水平的滚动条。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Group extends lark.Sprite implements IViewport {

        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.initializeUIValues();
            this.$Group = {
                0: 0,        //contentWidth,
                1: 0,        //contentHeight,
                2: 0,        //scrollH,
                3: 0,        //scrollV,
                4: false,    //scrollEnabled,
                5: false,    //touchThrough
            };
            this.$stateValues.parent = this;
        }

        /**
         * @private
         */
        $Group:Object;

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

        /**
         * @private
         */
        $layout:LayoutBase = null;

        /**
         * @language en_US
         * 此容器的布局对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 此容器的布局对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get layout():LayoutBase {
            return this.$layout;
        }

        public set layout(value:LayoutBase) {
            this.$setLayout(value);
        }

        /**
         * @private
         * 
         * @param value 
         */
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
         * @language en_US
         * 视域的内容的宽度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 视域的内容的宽度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get contentWidth():number {
            return this.$Group[Keys.contentWidth];
        }

        /**
         * @language en_US
         * 视域的内容的高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 视域的内容的高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get contentHeight():number {
            return this.$Group[Keys.contentHeight];
        }

        /**
         * @language en_US
         * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setContentSize(width:number, height:number):void {
            width = Math.ceil(+width || 0);
            height = Math.ceil(+height || 0);
            var values = this.$Group;
            var wChange = (values[Keys.contentWidth] !== width);
            var hChange = (values[Keys.contentHeight] !== height);
            if (!wChange && !hChange) {
                return;
            }
            values[Keys.contentWidth] = width;
            values[Keys.contentHeight] = height;
            if (wChange) {
                PropertyEvent.emitPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "contentWidth");
            }
            if (hChange) {
                PropertyEvent.emitPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "contentHeight");
            }
        }

        /**
         * @language en_US
         * 是否启用容器滚动。如果为 true，则将子项剪切到视区的边界，配合设置scrollH和scrollV属性将能滚动视区。
         * 如果为 false，则容器子代会从容器边界扩展过去，而设置scrollH和scrollV也无效。默认false。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否启用容器滚动。如果为 true，则将子项剪切到视区的边界，配合设置scrollH和scrollV属性将能滚动视区。
         * 如果为 false，则容器子代会从容器边界扩展过去，而设置scrollH和scrollV也无效。默认false。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get scrollEnabled():boolean {
            return this.$Group[Keys.scrollEnabled];
        }

        public set scrollEnabled(value:boolean) {
            value = !!value;
            var values = this.$Group;
            if (value === values[Keys.scrollEnabled])
                return;
            values[Keys.scrollEnabled] = value;
            this.updateScrollRect();
        }

        /**
         * @language en_US
         * 可视区域水平方向起始点
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 可视区域水平方向起始点
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get scrollH():number {
            return this.$Group[Keys.scrollH];
        }

        public set scrollH(value:number) {
            value = +value || 0;
            var values = this.$Group;
            if (value === values[Keys.scrollH])
                return;
            values[Keys.scrollH] = value;
            if (this.updateScrollRect() && this.$layout) {
                this.$layout.scrollPositionChanged();
            }
            PropertyEvent.emitPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "scrollH");
        }

        /**
         * @language en_US
         * 可视区域竖直方向起始点
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 可视区域竖直方向起始点
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get scrollV():number {
            return this.$Group[Keys.scrollV];
        }

        public set scrollV(value:number) {
            value = +value || 0;
            var values = this.$Group;
            if (value == values[Keys.scrollV])
                return;
            values[Keys.scrollV] = value;
            if (this.updateScrollRect() && this.$layout) {
                this.$layout.scrollPositionChanged();
            }
            PropertyEvent.emitPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "scrollV");
        }

        /**
         * @private
         * 
         * @returns 
         */
        private updateScrollRect():boolean {
            var values = this.$Group;
            var hasClip = values[Keys.scrollEnabled];
            if (hasClip) {
                var uiValues = this.$UIComponent;
                this.scrollRect = lark.$TempRectangle.setTo(values[Keys.scrollH],
                    values[Keys.scrollV],
                    uiValues[sys.UIKeys.width], uiValues[sys.UIKeys.height]);
            }
            else if (this.$scrollRect) {
                this.scrollRect = null;
            }
            return hasClip;
        }

        /**
         * @language en_US
         * 布局元素子项的数量。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 布局元素子项的数量。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get numElements():number {
            return this.$children.length;
        }

        /**
         * @language en_US
         * 获取一个布局元素子项
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取一个布局元素子项
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getElementAt(index:number):lark.DisplayObject {
            return this.$children[index];
        }

        /**
         * @language en_US
         * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
         * 通常在即将重新布局子项之前会被调用一次，容器覆盖此方法提前释放已经不可见的子元素。
         * @param startIndex 可视元素起始索引（包括）
         * @param endIndex 可视元素结束索引（包括）
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
         * 通常在即将重新布局子项之前会被调用一次，容器覆盖此方法提前释放已经不可见的子元素。
         * @param startIndex 可视元素起始索引（包括）
         * @param endIndex 可视元素结束索引（包括）
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setVirtualElementIndicesInView(startIndex:number, endIndex:number):void {

        }

        /**
         * @language en_US
         * 触摸组件的背景透明区域是否可以穿透。设置为true表示可以穿透，反之透明区域也会响应触摸事件。默认 false。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 触摸组件的背景透明区域是否可以穿透。设置为true表示可以穿透，反之透明区域也会响应触摸事件。默认 false。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get touchThrough():boolean{
            return this.$Group[Keys.touchThrough];
        }

        public set touchThrough(value:boolean){
            this.$Group[Keys.touchThrough] = !!value;
        }

        /**
         * @private
         * 
         * @param stageX 
         * @param stageY 
         * @param shapeFlag 
         * @returns 
         */
        $hitTest(stageX:number, stageY:number, shapeFlag?:boolean):lark.DisplayObject {
            var target = super.$hitTest(stageX, stageY, shapeFlag);
            if (target || this.$Group[Keys.touchThrough] || shapeFlag ||
                this.$displayFlags & lark.sys.DisplayObjectFlags.PixelHitTest) {
                return target;
            }
            if (!this.$visible || !this.$hasFlags(lark.sys.DisplayObjectFlags.TouchEnabled)) {
                return null;
            }
            var point = this.globalToLocal(stageX, stageY, lark.$TempPoint);
            var values = this.$UIComponent;
            var bounds = lark.$TempRectangle.setTo(0, 0, values[sys.UIKeys.width], values[sys.UIKeys.height]);
            if (bounds.contains(point.x, point.y)) {
                return this;
            }
            return null;
        }


        /**
         * @private
         */
        $stateValues:sys.StateValues = new sys.StateValues();

        /**
         * @language en_US
         * 为此组件定义的视图状态。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 为此组件定义的视图状态。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public states:State[];

        /**
         * @language en_US
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public currentState:string;

        /**
         * @language en_US
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public hasState:(stateName:string)=>boolean;
        /**
         * @private
         * 初始化所有视图状态
         */
        private initializeStates:(stage:lark.Stage)=>void;
        /**
         * @private
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        private commitCurrentState:()=>void;

        /**
         * @language en_US
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateState():void {
            var values = this.$stateValues;
            if (values.stateIsDirty) {
                return;
            }
            values.stateIsDirty = true;
            this.invalidateProperties();
        }

        /**
         * @language en_US
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected getCurrentState():string {
            return "";
        }


        //=======================UIComponent接口实现===========================
        /**
         * @private
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues:()=>void;

        /**
         * @language en_US
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected createChildren():void {
            if (!this.$layout) {
                this.$setLayout(new BasicLayout());
            }
            this.initializeStates(this.$stage);
        }

        /**
         * @language en_US
         * 子项创建完成,此方法在createChildren()之后执行。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 子项创建完成,此方法在createChildren()之后执行。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected childrenCreated():void {

        }

        /**
         * @language en_US
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties():void {
            sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$stateValues;
            if (values.stateIsDirty) {
                values.stateIsDirty = false;
                if (!values.explicitState) {
                    values.currentState = this.getCurrentState();
                    this.commitCurrentState();
                }
            }
        }

        /**
         * @language en_US
         * 测量组件尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 测量组件尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected measure():void {
            if (!this.$layout) {
                this.setMeasuredSize(0, 0);
                return;
            }
            this.$layout.measure();
        }

        /**
         * @language en_US
         * 更新显示列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新显示列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            if (this.$layout) {
                this.$layout.updateDisplayList(unscaledWidth, unscaledHeight);
            }
            this.updateScrollRect();
        }


        /**
         * @language en_US
         * 标记父级容器的尺寸和显示列表为失效
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记父级容器的尺寸和显示列表为失效
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected invalidateParentLayout():void {
        }

        /**
         * @private
         */
        $UIComponent:Object;

        /**
         * @private
         */
        $includeInLayout:boolean;

        /**
         * @language en_US
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public includeInLayout:boolean;
        /**
         * @language en_US
         * 距父级容器离左边距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器离左边距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public left:number;

        /**
         * @language en_US
         * 距父级容器右边距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器右边距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public right:number;

        /**
         * @language en_US
         * 距父级容器顶部距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器顶部距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public top:number;

        /**
         * @language en_US
         * 距父级容器底部距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器底部距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public bottom:number;

        /**
         * @language en_US
         * 在父级容器中距水平中心位置的距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在父级容器中距水平中心位置的距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public horizontalCenter:number;

        /**
         * @language en_US
         * 在父级容器中距竖直中心位置的距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在父级容器中距竖直中心位置的距离
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public verticalCenter:number;

        /**
         * @language en_US
         * 相对父级容器宽度的百分比
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 相对父级容器宽度的百分比
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public percentWidth:number;

        /**
         * @language en_US
         * 相对父级容器高度的百分比
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 相对父级容器高度的百分比
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public percentHeight:number;

        /**
         * @language en_US
         * 外部显式指定的宽度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 外部显式指定的宽度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public explicitWidth:number;

        /**
         * @language en_US
         * 外部显式指定的高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 外部显式指定的高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public explicitHeight:number;


        /**
         * @language en_US
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public minWidth:number;
        /**
         * @language en_US
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public maxWidth:number;

        /**
         * @language en_US
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public minHeight:number;
        /**
         * @language en_US
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public maxHeight:number;

        /**
         * @language en_US
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setMeasuredSize(width:number, height:number):void {
        }

        /**
         * @language en_US
         * 标记提交过需要延迟应用的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记提交过需要延迟应用的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateProperties():void {
        }

        /**
         * @language en_US
         * 验证组件的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 验证组件的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateProperties():void {
        }

        /**
         * @language en_US
         * 标记提交过需要验证组件尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记提交过需要验证组件尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateSize():void {
        }

        /**
         * @language en_US
         * 验证组件的尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 验证组件的尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateSize(recursive?:boolean):void {
        }

        /**
         * @language en_US
         * 标记需要验证显示列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记需要验证显示列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateDisplayList():void {
        }

        /**
         * @language en_US
         * 验证子项的位置和大小，并绘制其他可视内容
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 验证子项的位置和大小，并绘制其他可视内容
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateDisplayList():void {
        }

        /**
         * @language en_US
         * 立即应用组件及其子项的所有属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 立即应用组件及其子项的所有属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateNow():void {
        }

        /**
         * @language en_US
         * 设置组件的布局宽高
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置组件的布局宽高
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
        }

        /**
         * @language en_US
         * 设置组件的布局位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置组件的布局位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
        }

        /**
         * @language en_US
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含 scale 和 rotation。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含 scale 和 rotation。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
        }

        /**
         * @language en_US
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
        }
    }

    sys.implementUIComponent(Group, lark.Sprite, true);
    sys.mixin(Group, sys.StateClient);
    registerProperty(Group, "elementsContent", "Array", true);
    registerProperty(Group, "states", "State[]");
    lark.registerClass(Group, Types.Group, [Types.UIComponent, Types.IViewport]);

    if(DEBUG){
        lark.$markReadOnly(Group.prototype,"contentWidth");
        lark.$markReadOnly(Group.prototype,"contentHeight");
        lark.$markReadOnly(Group.prototype,"numElements");
    }
}