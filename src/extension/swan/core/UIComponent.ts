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
     * UI 显示对象基类
     * @event lark.Event.RESIZE 当UI组件的尺寸发生改变时调度
     * @event swan.UIEvent.MOVE 当UI组件在父级容器中的位置发生改变时调度
     * @event swan.UIEvent.CREATION_COMPLETE 当UI组件第一次被添加到舞台并完成初始化后调度
     */
    export interface UIComponent extends lark.DisplayObject {

        ///**
        // * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
        // * 请务必调用super.createChildren()以完成父类组件的初始化
        // */
        // protected createChildren():void{}

        ///**
        // * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
        // */
        // protected commitProperties():void{}

        ///**
        // * 测量组件尺寸
        // */
        // protected measure():void{}

        ///**
        // * 更新显示列表
        // */
        // protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void{}

        ///**
        // * 标记父级容器的尺寸和显示列表为失效
        // */
        // protected invalidateParentLayout():void{}

        //$getWidth():number;
        //$setWidth(value:number):void;

        //$getHeight():number;
        //$setHeight(value:number):void;

        $uiValues:Float64Array;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout:boolean;
        /**
         * 距父级容器离左边距离
         */
        left:number;

        /**
         * 距父级容器右边距离
         */
        right:number;

        /**
         * 距父级容器顶部距离
         */
        top:number;

        /**
         * 距父级容器底部距离
         */
        bottom:number;

        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter:number;

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter:number;

        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth:number;

        /**
         * 相对父级容器高度的百分比
         */
        percentHeight:number;

        /**
         * 外部显式指定的宽度
         */
        explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        explicitHeight:number;


        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth:number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth:number;

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight:number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight:number;

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width:number, height:number):void;

        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties():void;

        /**
         * 验证组件的属性
         */
        validateProperties():void;

        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize():void;

        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?:boolean):void;

        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList():void;

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList():void;

        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow():void;

        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void;

        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x:number, y:number):void;

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds:lark.Rectangle):void;

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds:lark.Rectangle):void;
    }

}

module swan.sys {

    export const enum UIValues {
        left,                       //lark.NONE
        right,                      //lark.NONE
        top,                        //lark.NONE
        bottom,                     //lark.NONE
        horizontalCenter,           //lark.NONE
        verticalCenter,             //lark.NONE
        percentWidth,               //lark.NONE
        percentHeight,              //lark.NONE
        explicitWidth,              //lark.NONE
        explicitHeight,             //lark.NONE
        width,                      //0
        height,                     //0
        minWidth,                   //0
        maxWidth,                   //100000
        minHeight,                  //0
        maxHeight,                  //100000
        measuredWidth,              //0
        measuredHeight,             //0
        oldPreferWidth,             //lark.NONE
        oldPreferHeight,            //lark.NONE
        contentWidth,               //0
        contentHeight,              //0
        scrollH,                    //0
        scrollV,                    //0
        oldX,                       //0
        oldY,                       //0
        oldWidth,                   //0
        oldHeight                   //0
    }

    function isDeltaIdentity(m:lark.Matrix):boolean {
        return (m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1);
    }

    var validator = new sys.Validator();

    /**
     * Swan 显示对象基类模板。仅作为 UIComponent 的默认实现，为lark.sys.implemenetUIComponenet()方法提供代码模板。
     * 注意：在此类里不允许直接使用super关键字访问父类方法。一律使用this.$super属性访问。
     */
    export class UIComponentImpl extends lark.DisplayObject implements swan.UIComponent {
        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.initializeUIValues();
        }

        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues():void {
            this.$uiValues = new Float64Array([
                lark.NONE,       //left
                lark.NONE,       //right
                lark.NONE,       //top
                lark.NONE,       //bottom
                lark.NONE,       //horizontalCenter
                lark.NONE,       //verticalCenter
                lark.NONE,       //percentWidth
                lark.NONE,       //percentHeight
                lark.NONE,       //explicitWidth
                lark.NONE,       //explicitHeight
                0,          //width
                0,          //height
                0,          //minWidth
                100000,     //maxWidth
                0,          //minHeight
                100000,     //maxHeight
                0,          //measuredWidth
                0,          //measuredHeight
                lark.NONE,       //oldPreferWidth
                lark.NONE,       //oldPreferHeight
                0,          //contentWidth
                0,          //contentHeight
                0,          //scrollH,
                0,           //scrollV
                0,           //oldX,
                0,           //oldY,
                0,           //oldWidth,
                0            //oldHeight
            ]);
            this.$displayFlags |= sys.UIFlags.UIComponentInitFlags;
            this.$includeInLayout = true;
        }


        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

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
            var values = this.$uiValues;
            if (values[UIValues.oldWidth] != values[UIValues.width] || values[UIValues.oldHeight] != values[UIValues.height]) {
                this.emitWith(lark.Event.RESIZE);
            }
            if (values[UIValues.oldX] != this.$getX() || values[UIValues.oldY] != this.$getY()) {
                UIEvent.emitUIEvent(this, UIEvent.MOVE);
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {

        }

        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
        }

        $super:any;

        $uiValues:Float64Array;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        public get includeInLayout():boolean {
            return this.$includeInLayout;
        }

        public set includeInLayout(value:boolean) {
            value = !!value;
            if (this.$includeInLayout === value)
                return;
            this.$includeInLayout = true;
            this.invalidateParentLayout();
            this.$includeInLayout = value;
        }

        $onAddToStage(stage:lark.Stage, nestLevel:number):void {
            this.$super.$onAddToStage.call(this, stage, nestLevel);
            this.checkInvalidateFlag();
            if (!this.$hasFlags(sys.UIFlags.initialized)) {
                this.$setFlags(sys.UIFlags.initialized);
                this.createChildren();
                this.childrenCreated();
                UIEvent.emitUIEvent(this, UIEvent.CREATION_COMPLETE);
            }
        }

        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag(event?:Event):void {
            if (this.$hasFlags(UIFlags.InvalidatePropertiesFlag)) {
                validator.invalidateProperties(this);
            }
            if (this.$hasFlags(UIFlags.InvalidateSizeFlag)) {
                validator.invalidateSize(this);
            }
            if (this.$hasFlags(UIFlags.InvalidateDisplayListFlag)) {
                validator.invalidateDisplayList(this);
            }
        }

        /**
         * 距父级容器离左边距离
         */
        public get left():number {
            return this.$uiValues[UIValues.left];
        }

        public set left(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.left] === value)
                return;
            values[UIValues.left] = value;
            this.invalidateParentLayout();
        }

        /**
         * 距父级容器右边距离
         */
        public get right():number {
            return this.$uiValues[UIValues.right];
        }

        public set right(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.right] === value)
                return;
            values[UIValues.right] = value;
            this.invalidateParentLayout();
        }

        /**
         * 距父级容器顶部距离
         */
        public get top():number {
            return this.$uiValues[UIValues.top];
        }

        public set top(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.top] === value)
                return;
            values[UIValues.top] = value;
            this.invalidateParentLayout();
        }

        /**
         * 距父级容器底部距离
         */
        public get bottom():number {
            return this.$uiValues[UIValues.bottom];
        }

        public set bottom(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.bottom] == value)
                return;
            values[UIValues.bottom] = value;
            this.invalidateParentLayout();
        }


        /**
         * 在父级容器中距水平中心位置的距离
         */
        public get horizontalCenter():number {
            return this.$uiValues[UIValues.horizontalCenter];
        }

        public set horizontalCenter(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.horizontalCenter] === value)
                return;
            values[UIValues.horizontalCenter] = value;
            this.invalidateParentLayout();
        }

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public get verticalCenter():number {
            return this.$uiValues[UIValues.verticalCenter];
        }

        public set verticalCenter(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.verticalCenter] === value)
                return;
            values[UIValues.verticalCenter] = value;
            this.invalidateParentLayout();
        }


        /**
         * 相对父级容器宽度的百分比
         */
        public get percentWidth():number {
            return this.$uiValues[UIValues.percentWidth];
        }

        public set percentWidth(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.percentWidth] === value)
                return;
            values[UIValues.percentWidth] = value;
            this.invalidateParentLayout();
        }

        /**
         * 相对父级容器高度的百分比
         */
        public get percentHeight():number {
            return this.$uiValues[UIValues.percentHeight];
        }

        public set percentHeight(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.percentHeight] === value)
                return;
            values[UIValues.percentHeight] = value;
            this.invalidateParentLayout();
        }

        /**
         * 外部显式指定的宽度
         */
        public get explicitWidth():number {
            return this.$uiValues[UIValues.explicitWidth];
        }

        /**
         * 外部显式指定的高度
         */
        public get explicitHeight():number {
            return this.$uiValues[UIValues.explicitHeight];
        }

        /**
         * 组件宽度,默认值为lark.lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
         */
        $getWidth():number {
            this.validateSizeNow();
            return this.$uiValues[UIValues.width];
        }

        $setWidth(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value < 0 || values[UIValues.width] === value && values[UIValues.explicitWidth] === value)
                return;
            values[UIValues.width] = value;
            values[UIValues.explicitWidth] = value;
            if (lark.isNone(value))
                this.invalidateSize();
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentLayout();
        }

        /**
         * 立即验证自身的尺寸。
         */
        private validateSizeNow():void {
            this.validateSize(true);
            this.updateFinalSize();
        }

        /**
         * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        $getHeight():number {
            this.validateSizeNow();
            return this.$uiValues[UIValues.height];
        }

        $setHeight(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value < 0 || values[UIValues.height] === value && values[UIValues.explicitHeight] === value)
                return;
            values[UIValues.height] = value;
            values[UIValues.explicitHeight] = value;
            if (lark.isNone(value))
                this.invalidateSize();
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentLayout();
        }

        $setScaleX(value:number):boolean {
            var change = this.$super.$setScaleX.call(this, value);
            if (change) {
                this.invalidateParentLayout();
            }
            return change;
        }

        $setScaleY(value:number):boolean {
            var change = this.$super.$setScaleY.call(this, value);
            if (change) {
                this.invalidateParentLayout();
            }
            return change;
        }

        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        public get minWidth():number {
            return this.$uiValues[UIValues.minWidth];
        }

        public set minWidth(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value < 0 || values[UIValues.minWidth] === value) {
                return;
            }
            values[UIValues.minWidth] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }

        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        public get maxWidth():number {
            return this.$uiValues[UIValues.maxWidth];
        }

        public set maxWidth(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value < 0 || values[UIValues.maxWidth] === value) {
                return;
            }
            values[UIValues.maxWidth] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        public get minHeight():number {
            return this.$uiValues[UIValues.minHeight];
        }

        public set minHeight(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value < 0 || values[UIValues.minHeight] === value) {
                return;
            }
            values[UIValues.minHeight] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }


        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        public get maxHeight():number {
            return this.$uiValues[UIValues.maxHeight];
        }

        public set maxHeight(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (value < 0 || values[UIValues.maxHeight] === value) {
                return;
            }
            values[UIValues.maxHeight] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        public setMeasuredSize(width:number, height:number):void {
            var values = this.$uiValues;
            values[UIValues.measuredWidth] = Math.ceil(+width || 0);
            values[UIValues.measuredHeight] = Math.ceil(+height || 0);
        }


        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        private setActualSize(w:number, h:number):void {
            var change = false;
            var values = this.$uiValues;
            if (values[UIValues.width] !== w) {
                values[UIValues.width] = w;
                change = true;
            }
            if (values[UIValues.height] !== h) {
                values[UIValues.height] = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.emitWith(lark.Event.RESIZE);
            }
        }

        $setX(value:number):boolean {
            var change = this.$super.$setX.call(this, value);
            if (change) {
                this.invalidateParentLayout();
                this.invalidateProperties();
            }
            return change;
        }

        $setY(value:number):boolean {
            var change = this.$super.$setY.call(this, value);
            if (change) {
                this.invalidateParentLayout();
                this.invalidateProperties();
            }
            return change;
        }


        /**
         * 标记属性失效
         */
        public invalidateProperties():void {
            if (!this.$hasFlags(UIFlags.InvalidatePropertiesFlag)) {
                this.$setFlags(UIFlags.InvalidatePropertiesFlag);
                if (this.$stage)
                    validator.invalidateProperties(this);
            }
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
            if (this.$hasFlags(UIFlags.InvalidatePropertiesFlag)) {
                this.commitProperties();
                this.$removeFlags(UIFlags.InvalidatePropertiesFlag);
            }
        }

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
            if (!this.$hasFlags(UIFlags.InvalidateSizeFlag)) {
                this.$setFlags(UIFlags.InvalidateSizeFlag);
                if (this.$stage)
                    validator.invalidateSize(this);
            }
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize(recursive?:boolean):void {
            if (recursive) {
                var children = this.$children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var child = children[i];
                        if (lark.is(child, swan.Types.UIComponent)) {
                            (<swan.UIComponent>child).validateSize(true);
                        }
                    }
                }
            }
            if (this.$hasFlags(UIFlags.InvalidateSizeFlag)) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentLayout();
                }
                this.$removeFlags(UIFlags.InvalidateSizeFlag);
            }
        }

        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        private measureSizes():boolean {
            var changed = false;

            if (!this.$hasFlags(UIFlags.InvalidateSizeFlag))
                return changed;

            var values = this.$uiValues;
            if (lark.isNone(values[UIValues.explicitWidth]) || lark.isNone(values[UIValues.explicitHeight])) {
                this.measure();
                if (values[UIValues.measuredWidth] < values[UIValues.minWidth]) {
                    values[UIValues.measuredWidth] = values[UIValues.minWidth];
                }
                if (values[UIValues.measuredWidth] > values[UIValues.maxWidth]) {
                    values[UIValues.measuredWidth] = values[UIValues.maxWidth];
                }
                if (values[UIValues.measuredHeight] < values[UIValues.minHeight]) {
                    values[UIValues.measuredHeight] = values[UIValues.minHeight];
                }
                if (values[UIValues.measuredHeight] > values[UIValues.maxHeight]) {
                    values[UIValues.measuredHeight] = values[UIValues.maxHeight]
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            if (preferredW !== values[UIValues.oldPreferWidth] ||
                preferredH !== values[UIValues.oldPreferHeight]) {
                values[UIValues.oldPreferWidth] = preferredW;
                values[UIValues.oldPreferHeight] = preferredH;
                changed = true;
            }
            return changed;
        }

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList():void {
            if (!this.$hasFlags(UIFlags.InvalidateDisplayListFlag)) {
                this.$setFlags(UIFlags.InvalidateDisplayListFlag);
                if (this.$stage)
                    validator.invalidateDisplayList(this);
            }
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
            if (this.$hasFlags(UIFlags.InvalidateDisplayListFlag)) {
                this.updateFinalSize();
                var values = this.$uiValues;
                this.updateDisplayList(values[UIValues.width], values[UIValues.height]);
                this.$removeFlags(UIFlags.InvalidateDisplayListFlag);
            }
        }

        /**
         * 更新最终的组件宽高
         */
        private updateFinalSize():void {
            var unscaledWidth = 0;
            var unscaledHeight = 0;
            var values = this.$uiValues;
            if (this.$hasFlags(UIFlags.LayoutWidthExplicitlySet)) {
                unscaledWidth = values[UIValues.width];
            }
            else if (!lark.isNone(values[UIValues.explicitWidth])) {
                unscaledWidth = values[UIValues.explicitWidth];
            }
            else {
                unscaledWidth = values[UIValues.measuredWidth];
            }
            if (this.$hasFlags(UIFlags.LayoutHeightExplicitlySet)) {
                unscaledHeight = values[UIValues.height];
            }
            else if (!lark.isNone(values[UIValues.explicitHeight])) {
                unscaledHeight = values[UIValues.explicitHeight];
            }
            else {
                unscaledHeight = values[UIValues.measuredHeight];
            }
            this.setActualSize(unscaledWidth, unscaledHeight);
        }

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
            if (this.$stage)
                validator.validateClient(this);
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout():void {
            var parent = this.$parent;
            if (!parent || !this.$includeInLayout || !lark.is(parent, swan.Types.UIComponent))
                return;
            (<swan.UIComponent><any>parent).invalidateSize();
            (<swan.UIComponent><any>parent).invalidateDisplayList();
        }

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
            layoutHeight = +layoutHeight || 0;
            layoutWidth = +layoutWidth || 0;
            var values = this.$uiValues;
            var maxWidth = values[UIValues.maxWidth];
            var maxHeight = values[UIValues.maxHeight];
            var minWidth = Math.min(values[UIValues.minWidth], maxWidth);
            var minHeight = Math.min(values[UIValues.minHeight], maxHeight);
            var width:number;
            var height:number;
            if (lark.isNone(layoutWidth)) {
                this.$removeFlags(UIFlags.LayoutWidthExplicitlySet);
                width = this.getPreferredUWidth();
            }
            else {
                this.$setFlags(UIFlags.LayoutWidthExplicitlySet);
                width = Math.max(minWidth, Math.min(maxWidth, layoutWidth));
            }
            if (lark.isNone(layoutHeight)) {
                this.$removeFlags(UIFlags.LayoutHeightExplicitlySet);
                height = this.getPreferredUHeight();
            }
            else {
                this.$setFlags(UIFlags.LayoutHeightExplicitlySet);
                height = Math.max(minHeight, Math.min(maxHeight, layoutHeight));
            }
            var matrix = this.$getMatrix();
            if (isDeltaIdentity(matrix)) {
                this.setActualSize(width, height);
                return;
            }

            var fitSize = sys.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix,
                values[UIValues.explicitWidth], values[UIValues.explicitHeight],
                this.getPreferredUWidth(), this.getPreferredUHeight(),
                minWidth, minHeight, maxWidth, maxHeight);
            if (!fitSize) {
                fitSize = lark.Point.create(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
            lark.Point.release(fitSize);
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
            var matrix = this.$getMatrix();
            if (!isDeltaIdentity(matrix)) {
                var bounds = lark.$TempRectangle;
                this.getLayoutBounds(bounds);
                x += this.$getX() - bounds.x;
                y += this.$getY() - bounds.y;
            }
            var changed:boolean = this.$super.$setX.call(this, x);
            if (this.$super.$setY.call(this, y) || changed) {
                UIEvent.emitUIEvent(this, UIEvent.MOVE);
            }
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
            var values = this.$uiValues;
            var w:number;
            if (this.$hasFlags(UIFlags.LayoutWidthExplicitlySet)) {
                w = values[UIValues.width];
            }
            else if (!lark.isNone(values[UIValues.explicitWidth])) {
                w = values[UIValues.explicitWidth];
            }
            else {
                w = values[UIValues.measuredWidth];
            }
            var h:number;
            if (this.$hasFlags(UIFlags.LayoutHeightExplicitlySet)) {
                h = values[UIValues.height];
            }
            else if (!lark.isNone(values[UIValues.explicitHeight])) {
                h = values[UIValues.explicitHeight];
            }
            else {
                h = values[UIValues.measuredHeight];
            }
            this.applyMatrix(bounds, w, h);
        }


        private getPreferredUWidth():number {
            var values = this.$uiValues;
            return lark.isNone(values[UIValues.explicitWidth]) ?
                values[UIValues.measuredWidth] : values[UIValues.explicitWidth];
        }

        private getPreferredUHeight():number {
            var values = this.$uiValues;
            return lark.isNone(values[UIValues.explicitHeight]) ?
                values[UIValues.measuredHeight] : values[UIValues.explicitHeight];
        }

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
            var w = this.getPreferredUWidth();
            var h = this.getPreferredUHeight();
            this.applyMatrix(bounds, w, h);
        }


        private applyMatrix(bounds:lark.Rectangle, w:number, h:number):void {
            var bounds = bounds.setTo(0, 0, w, h);
            var matrix = this.$getMatrix();
            if (isDeltaIdentity(matrix)) {
                bounds.x += matrix.tx;
                bounds.y += matrix.ty;
            }
            else {
                matrix.$transformBounds(bounds);
            }
        }
    }

    /**
     * 检查一个函数的方法体是否为空。
     */
    function isEmptyFunction(prototype:any, key:string):boolean {
        if (typeof prototype[key] != "function") {
            return false;
        }
        var body = prototype[key].toString();
        var index = body.indexOf("{");
        var lastIndex = body.lastIndexOf("}");
        body = body.substring(index + 1, lastIndex);
        return body.trim() == "";
    }

    /**
     * 拷贝模板类的方法体和属性到目标类上。
     * @param target 目标类
     * @param template 模板类
     */
    export function mixin(target:any, template:any):void {
        for (var property in template) {
            if (template.hasOwnProperty(property)) {
                target[property] = template[property];
            }
        }
        var prototype = target.prototype;
        var protoBase = template.prototype;
        var keys = Object.keys(protoBase);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (key == "__meta__") {
                continue;
            }
            if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                var value = Object.getOwnPropertyDescriptor(protoBase, key);
                Object.defineProperty(prototype, key, value);
            }
        }
    }

    /**
     * 自定义类实现UIComponent的步骤：
     * 1.在自定义类的构造函数里调用：this.initializeUIValues();
     * 2.拷贝UIComponent接口定义的所有内容(包括注释掉的protected函数)到自定义类，将所有子类需要覆盖的方法都声明为空方法体。
     * 3.在定义类结尾的外部调用sys.implementUIComponent()，并传入自定义类。
     * 4.若覆盖了某个UIComponent的方法，需要手动调用UIComponentImpl.prototype["方法名"].call(this);
     * @param descendant 自定义的UIComponent子类
     * @param base 自定义子类继承的父类
     */
    export function implementUIComponent(descendant:any, base:any, isContainer?:boolean):void {
        mixin(descendant, UIComponentImpl);
        var prototype = descendant.prototype;
        prototype.$super = base.prototype;

        if (isContainer) {
            prototype.$childAdded = function (child:lark.DisplayObject, index:number):void {
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            prototype.$childRemoved = function (child:lark.DisplayObject, index:number):void {
                this.invalidateSize();
                this.invalidateDisplayList();
            };
        }

        if (DEBUG) {//用于调试时查看布局尺寸的便利属性，发行版时移除。
            Object.defineProperty(prototype, "preferredWidth", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "preferredHeight", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "preferredX", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "preferredY", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsX", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsY", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsWidth", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsHeight", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "measuredWidth", {
                get: function () {
                    return this.$uiValues[UIValues.measuredWidth];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "measuredHeight", {
                get: function () {
                    return this.$uiValues[UIValues.measuredHeight];
                },
                enumerable: true,
                configurable: true
            });
        }
    }
}