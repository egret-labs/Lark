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

module lark.player {

    export const enum UIValues {
        left,                       //NONE
        right,                      //NONE
        top,                        //NONE
        bottom,                     //NONE
        horizontalCenter,           //NONE
        verticalCenter,             //NONE
        percentWidth,               //NONE
        percentHeight,              //NONE
        explicitWidth,              //NONE
        explicitHeight,             //NONE
        width,                      //0
        height,                     //0
        minWidth,                   //0
        maxWidth,                   //100000
        minHeight,                  //0
        maxHeight,                  //100000
        measuredWidth,              //0
        measuredHeight,             //0
        oldPreferWidth,             //NONE
        oldPreferHeight,            //NONE
        contentWidth,               //0
        contentHeight,              //0
        horizontalScrollPosition,   //0
        verticalScrollPosition      //0
    }

    function isDeltaIdentity(m:Float64Array):boolean {
        return (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1);
    }

    /**
     * GUI显示对象基类模板，这个类不需要添加到加载列表。仅作为gui.UIComponent的默认实现，为lark.player.implemenetUIComponenet()方法提供代码模板。
     */
    export class UIComponentImpl extends DisplayObject implements gui.UIComponent {
        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.$uiValues = new Float64Array([
                NONE,       //left
                NONE,       //right
                NONE,       //top
                NONE,       //bottom
                NONE,       //horizontalCenter
                NONE,       //verticalCenter
                NONE,       //percentWidth
                NONE,       //percentHeight
                NONE,       //explicitWidth
                NONE,       //explicitHeight
                0,          //width
                0,          //height
                0,          //minWidth
                100000,     //maxWidth
                0,          //minHeight
                100000,     //maxHeight
                0,          //measuredWidth
                0,          //measuredHeight
                NONE,       //oldPreferWidth
                NONE,       //oldPreferHeight
                0,          //contentWidth
                0,          //contentHeight
                0,          //horizontalScrollPosition,
                0           //verticalScrollPosition
            ]);
            this.createChildren();
        }

        /**
         * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {

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

        $uiValues:Float64Array;

        $includeInLayout:boolean = true;

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
            this.invalidateParentSizeAndDisplayList();
            this.$includeInLayout = value;
        }

        $onAddToStage(stage:Stage,nestLevel:number):void {
            super.$onAddToStage(stage,nestLevel);
            this.checkInvalidateFlag();
        }

        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag(event?:Event):void {
            var validator = lark.gui.validator;
            if (this.$hasFlags(UIComponentFlags.InvalidatePropertiesFlag)) {
                validator.invalidateProperties(this);
            }
            if (this.$hasFlags(UIComponentFlags.InvalidateSizeFlag)) {
                validator.invalidateSize(this);
            }
            if (this.$hasFlags(UIComponentFlags.InvalidateDisplayListFlag)) {
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
            this.invalidateParentSizeAndDisplayList();
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
         * 组件宽度,默认值为lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
         */
        public get width():number {
            return this.$uiValues[UIValues.width];
        }

        public set width(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.width] === value && values[UIValues.explicitWidth] === value)
                return;
            values[UIValues.width] = value;
            values[UIValues.explicitWidth] = value;
            if (isNone(value))
                this.invalidateSize();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        public get height():number {
            return this.$uiValues[UIValues.height];
        }

        public set height(value:number) {
            value = +value || 0;
            var values = this.$uiValues;
            if (values[UIValues.height] === value && values[UIValues.explicitHeight] === value)
                return;
            values[UIValues.height] = value;
            values[UIValues.explicitWidth] = value;
            if (isNaN(value))
                this.invalidateSize();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        }

        $setScaleX(value:number):boolean {
            var change = super.$setScaleX(value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        }

        $setScaleY(value:number):boolean {
            var change = super.$setScaleY(value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
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
            if (values[UIValues.minWidth] === value) {
                return;
            }
            values[UIValues.minWidth] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
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
            if (values[UIValues.maxWidth] === value) {
                return;
            }
            values[UIValues.maxWidth] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
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
            if (values[UIValues.minHeight] === value) {
                return;
            }
            values[UIValues.minHeight] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
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
            if (values[UIValues.maxHeight] === value) {
                return;
            }
            values[UIValues.maxHeight] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
         */
        public get measuredWidth():number {
            return this.$uiValues[UIValues.measuredWidth];
        }

        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         */
        public get measuredHeight():number {
            return this.$uiValues[UIValues.measuredHeight];
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
            }
        }

        $setX(value:number):boolean {
            var change = super.$setX(value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        }

        $setY(value:number):boolean {
            var change = super.$setY(value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        }


        /**
         * 标记属性失效
         */
        public invalidateProperties():void {
            if (!this.$hasFlags(UIComponentFlags.InvalidatePropertiesFlag)) {
                this.$setFlags(UIComponentFlags.InvalidatePropertiesFlag);
                if (this.$stage)
                    gui.validator.invalidateProperties(this);
            }
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
            if (this.$hasFlags(UIComponentFlags.InvalidatePropertiesFlag)) {
                this.commitProperties();
                this.$removeFlags(UIComponentFlags.InvalidatePropertiesFlag);
            }
        }

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
            if (!this.$hasFlags(UIComponentFlags.InvalidateSizeFlag)) {
                this.$setFlags(UIComponentFlags.InvalidateSizeFlag);
                if (this.$stage)
                    gui.validator.invalidateSize(this);
            }
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize():void {
            if (this.$hasFlags(UIComponentFlags.InvalidateSizeFlag)) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentSizeAndDisplayList();
                }
                this.$removeFlags(UIComponentFlags.InvalidateSizeFlag);
            }
        }

        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        private measureSizes():boolean {
            var changed = false;

            if (!this.$hasFlags(UIComponentFlags.InvalidateSizeFlag))
                return changed;

            var values = this.$uiValues;
            if (isNone(values[UIValues.explicitWidth]) || isNone(values[UIValues.explicitHeight])) {
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
            if (!this.$hasFlags(UIComponentFlags.InvalidateDisplayListFlag)) {
                this.$setFlags(UIComponentFlags.InvalidateDisplayListFlag);
                if (this.$stage)
                    gui.validator.invalidateDisplayList(this);
            }
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
            if (this.$hasFlags(UIComponentFlags.InvalidateDisplayListFlag)) {
                var unscaledWidth:number = 0;
                var unscaledHeight:number = 0;
                var values = this.$uiValues;
                if (this.$hasFlags(UIComponentFlags.LayoutWidthExplicitlySet)) {
                    unscaledWidth = values[UIValues.width];
                }
                else if (!isNone(values[UIValues.explicitWidth])) {
                    unscaledWidth = values[UIValues.explicitWidth];
                }
                else {
                    unscaledWidth = values[UIValues.measuredWidth];
                }
                if (this.$hasFlags(UIComponentFlags.LayoutHeightExplicitlySet)) {
                    unscaledHeight = values[UIValues.height];
                }
                else if (!isNone(values[UIValues.explicitHeight])) {
                    unscaledHeight = values[UIValues.explicitHeight];
                }
                else {
                    unscaledHeight = values[UIValues.measuredHeight];
                }
                this.setActualSize(unscaledWidth, unscaledHeight);
                this.updateDisplayList(unscaledWidth, unscaledHeight);
                this.$removeFlags(UIComponentFlags.InvalidateDisplayListFlag);
            }
        }

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
            if (this.$stage)
                gui.validator.validateClient(this);
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentSizeAndDisplayList():void {
            var parent = this.$parent;
            if (!parent || !this.$includeInLayout || !(parent.isType(gui.Types.UIComponent)))
                return;
            (<gui.UIComponent><any>parent).invalidateSize();
            (<gui.UIComponent><any>parent).invalidateDisplayList();
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
            if (isNone(layoutWidth)) {
                this.$removeFlags(UIComponentFlags.LayoutWidthExplicitlySet);
                width = this.getPreferredUWidth();
            }
            else {
                this.$setFlags(UIComponentFlags.LayoutWidthExplicitlySet);
                width = Math.max(minWidth, Math.min(maxWidth, layoutWidth));
            }
            if (isNone(layoutHeight)) {
                this.$removeFlags(UIComponentFlags.LayoutHeightExplicitlySet);
                height = this.getPreferredUHeight();
            }
            else {
                this.$setFlags(UIComponentFlags.LayoutHeightExplicitlySet);
                height = Math.max(minHeight,Math.min(maxHeight,layoutHeight));
            }
            var matrix = this.$getMatrix();
            if (isDeltaIdentity(matrix.$data)) {
                this.setActualSize(width, height);
                return;
            }

            var fitSize = player.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix,
                values[UIValues.explicitWidth], values[UIValues.explicitHeight],
                this.getPreferredUWidth(), this.getPreferredUHeight(),
                minWidth, minHeight, maxWidth, maxHeight);
            if (!fitSize) {
                fitSize = Point.create(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
            Point.release(fitSize);
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
            var matrix = this.$getMatrix();
            if (!isDeltaIdentity(matrix.$data)) {
                var bounds = this.getLayoutBounds($TempRectangle);
                x += this.$getX() - bounds.x;
                y += this.$getY() - bounds.y;
            }
            super.$setX(x);
            super.$setY(y);
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:Rectangle):Rectangle {
            var values = this.$uiValues;
            var w:number;
            if (this.$hasFlags(UIComponentFlags.LayoutWidthExplicitlySet)) {
                w = values[UIValues.width];
            }
            else if (!isNone(values[UIValues.explicitWidth])) {
                w = values[UIValues.explicitWidth];
            }
            else {
                w = values[UIValues.measuredWidth];
            }
            var h:number;
            if (this.$hasFlags(UIComponentFlags.LayoutHeightExplicitlySet)) {
                h = values[UIValues.height];
            }
            else if (!isNone(values[UIValues.explicitHeight])) {
                h = values[UIValues.explicitHeight];
            }
            else {
                h = values[UIValues.measuredHeight];
            }
            return this.applyMatrix(bounds, w, h);
        }


        private getPreferredUWidth():number {
            var values = this.$uiValues;
            return isNone(values[UIValues.explicitWidth]) ?
                values[UIValues.measuredWidth] : values[UIValues.explicitWidth];
        }

        private getPreferredUHeight():number {
            var values = this.$uiValues;
            return isNone(values[UIValues.explicitHeight]) ?
                values[UIValues.measuredHeight] : values[UIValues.explicitHeight];
        }

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds(bounds:Rectangle):Rectangle {
            var w = this.getPreferredUWidth();
            var h = this.getPreferredUHeight();
            return this.applyMatrix(bounds, w, h);
        }


        private applyMatrix(bounds:Rectangle, w:number, h:number):Rectangle {
            var x = 0, y = 0;
            var scrollRect = this.$scrollRect;
            if (scrollRect) {
                x = scrollRect.x;
                y = scrollRect.y;
            }
            var bounds = bounds.setTo(x, y, w, h);
            var matrix = this.$getMatrix();
            var m = matrix.$data;
            if (isDeltaIdentity(m)) {
                bounds.x += m[4];
                bounds.y += m[5];
            }
            else {
                matrix.$transformBounds(bounds);
            }
            return bounds;
        }

    }
}