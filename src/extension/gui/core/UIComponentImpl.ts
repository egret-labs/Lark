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

    export const enum UIComponentValues {
        left,               //NONE
        right,              //NONE
        top,                //NONE
        bottom,             //NONE
        horizontalCenter,   //NONE
        verticalCenter,     //NONE
        percentWidth,       //NONE
        percentHeight,      //NONE
        explicitWidth,      //NONE
        explicitHeight,     //NONE
        oldWidth,           //NONE
        width,              //0
        oldHeight,          //NONE
        height,             //0
        explicitMinWidth,   //NONE
        explicitMaxWidth,   //NONE
        explicitMinHeight,  //NONE
        explicitMaxHeight,  //NONE
        measuredMinWidth,   //0
        measuredWidth,      //0
        measuredMinHeight,  //0
        measuredHeight,     //0
        oldX,               //NONE
        oldY,               //NONE
        oldPreferWidth,     //NONE
        oldPreferHeight,    //NONE
        oldMinWidth,        //NONE
        oldMinHeight        //NONE
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
            this.$uiComponentValues = new Float64Array([
                NONE,    //left
                NONE,    //right
                NONE,    //top
                NONE,    //bottom
                NONE,    //horizontalCenter
                NONE,    //verticalCenter
                NONE,    //percentWidth
                NONE,    //percentHeight
                NONE,    //explicitWidth
                NONE,    //explicitHeight
                NONE,    //oldWidth
                0,       //width
                NONE,    //oldHeight
                0,       //height
                NONE,    //explicitMinWidth
                NONE,    //explicitMaxWidth
                NONE,    //explicitMinHeight
                NONE,    //explicitMaxHeight
                0,       //measuredMinWidth
                0,       //measuredWidth
                0,       //measuredMinHeight
                0,       //measuredHeight
                NONE,    //oldX
                NONE,    //oldY
                NONE,    //oldPreferWidth
                NONE,    //oldPreferHeight
                NONE,    //oldMinWidth
                NONE     //oldMinHeight
            ]);
            this.createChildren();
        }

        /**
         * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

        }

        $uiComponentValues:Float64Array;
        /**
         * 嵌套深度，失效验证是根据这个深度来进行队列排序。
         */
        $nestLevel:number = 0;

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

        $onAddToStage(stage:Stage):void {
            super.$onAddToStage(stage);
            this.checkInvalidateFlag();
        }

        $onRemoveFromStage():void {
            super.$onRemoveFromStage();
            this.$nestLevel = 0;
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
            return this.$uiComponentValues[UIComponentValues.left];
        }

        public set left(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.left] === value)
                return;
            values[UIComponentValues.left] = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 距父级容器右边距离
         */
        public get right():number {
            return this.$uiComponentValues[UIComponentValues.right];
        }

        public set right(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.right] === value)
                return;
            values[UIComponentValues.right] = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 距父级容器顶部距离
         */
        public get top():number {
            return this.$uiComponentValues[UIComponentValues.top];
        }

        public set top(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.top] === value)
                return;
            values[UIComponentValues.top] = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 距父级容器底部距离
         */
        public get bottom():number {
            return this.$uiComponentValues[UIComponentValues.bottom];
        }

        public set bottom(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.bottom] == value)
                return;
            values[UIComponentValues.bottom] = value;
            this.invalidateParentSizeAndDisplayList();
        }


        /**
         * 在父级容器中距水平中心位置的距离
         */
        public get horizontalCenter():number {
            return this.$uiComponentValues[UIComponentValues.horizontalCenter];
        }

        public set horizontalCenter(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.horizontalCenter] === value)
                return;
            values[UIComponentValues.horizontalCenter] = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public get verticalCenter():number {
            return this.$uiComponentValues[UIComponentValues.verticalCenter];
        }

        public set verticalCenter(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.verticalCenter] === value)
                return;
            values[UIComponentValues.verticalCenter] = value;
            this.invalidateParentSizeAndDisplayList();
        }


        /**
         * 相对父级容器宽度的百分比
         */
        public get percentWidth():number {
            return this.$uiComponentValues[UIComponentValues.percentWidth];
        }

        public set percentWidth(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.percentWidth] === value)
                return;
            values[UIComponentValues.percentWidth] = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 相对父级容器高度的百分比
         */
        public get percentHeight():number {
            return this.$uiComponentValues[UIComponentValues.percentHeight];
        }

        public set percentHeight(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.percentHeight] === value)
                return;
            values[UIComponentValues.percentHeight] = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 外部显式指定的宽度
         */
        public get explicitWidth():number {
            return this.$uiComponentValues[UIComponentValues.explicitWidth];
        }

        /**
         * 外部显式指定的高度
         */
        public get explicitHeight():number {
            return this.$uiComponentValues[UIComponentValues.explicitHeight];
        }

        /**
         * 组件宽度,默认值为lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
         */
        public get width():number {
            return this.$uiComponentValues[UIComponentValues.width];
        }

        public set width(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.width] === value && values[UIComponentValues.explicitWidth] === value)
                return;
            values[UIComponentValues.width] = value;
            values[UIComponentValues.explicitWidth] = value;
            if (isNone(value))
                this.invalidateSize();
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        public get height():number {
            return this.$uiComponentValues[UIComponentValues.height];
        }

        public set height(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.height] === value && values[UIComponentValues.explicitHeight] === value)
                return;
            values[UIComponentValues.height] = value;
            values[UIComponentValues.explicitWidth] = value;
            if (isNaN(value))
                this.invalidateSize();
            this.invalidateProperties();
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
         * 显式设置的最小宽度。
         */
        public get explicitMinWidth():number {
            return this.$uiComponentValues[UIComponentValues.explicitMinWidth];
        }

        /**
         * 组件的最小测量宽度,此属性设置为大于maxWidth的值时无效。仅影响measuredWidth属性的取值范围。
         */
        public get minWidth():number {
            var values = this.$uiComponentValues;
            return isNone(values[UIComponentValues.explicitMinWidth]) ?
                values[UIComponentValues.measuredMinWidth] : values[UIComponentValues.explicitMinWidth];
        }

        public set minWidth(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.explicitMinWidth] === value) {
                return;
            }
            values[UIComponentValues.explicitMinWidth] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 显式设置的最大宽度
         */
        public get explicitMaxWidth():number {
            return this.$uiComponentValues[UIComponentValues.explicitMaxWidth];
        }

        /**
         * 组件的最大测量高度,仅影响measuredWidth属性的取值范围。
         */
        public get maxWidth():number {
            var values = this.$uiComponentValues;
            return isNone(values[UIComponentValues.explicitMaxWidth]) ? 10000 : values[UIComponentValues.explicitMaxWidth];
        }

        public set maxWidth(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.explicitMaxWidth] === value) {
                return;
            }
            values[UIComponentValues.explicitMaxWidth] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 显式设置的最小高度
         */
        public get explicitMinHeight():number {
            return this.$uiComponentValues[UIComponentValues.explicitMinHeight];
        }

        /**
         * 组件的最小测量高度,此属性设置为大于maxHeight的值时无效。仅影响measuredHeight属性的取值范围。
         */
        public get minHeight():number {
            var values = this.$uiComponentValues;
            return isNone(values[UIComponentValues.explicitMinHeight]) ?
                values[UIComponentValues.measuredMinHeight] : values[UIComponentValues.explicitMinHeight];
        }

        public set minHeight(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.explicitMinHeight] === value) {
                return;
            }
            values[UIComponentValues.explicitMinHeight] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 显式设置的最大高度
         */
        public get explicitMaxHeight():number {
            return this.$uiComponentValues[UIComponentValues.explicitMaxHeight];
        }

        /**
         * 组件的最大测量高度,仅影响measuredHeight属性的取值范围。
         */
        public get maxHeight():number {
            var values = this.$uiComponentValues;
            return isNone(values[UIComponentValues.explicitMaxHeight]) ? 10000 : values[UIComponentValues.explicitMaxHeight];
        }

        public set maxHeight(value:number) {
            value = +value || 0;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.explicitMaxHeight] === value) {
                return;
            }
            values[UIComponentValues.explicitMaxHeight] = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 组件的测量最小宽度
         */
        public get measuredMinWidth():number {
            return this.$uiComponentValues[UIComponentValues.measuredMinWidth];
        }

        /**
         * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
         */
        public get measuredWidth():number {
            return this.$uiComponentValues[UIComponentValues.measuredWidth];
        }

        /**
         * 组件的测量最小高度
         */
        public get measuredMinHeight():number {
            return this.$uiComponentValues[UIComponentValues.measuredMinHeight];
        }

        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         */
        public get measuredHeight():number {
            return this.$uiComponentValues[UIComponentValues.measuredHeight];
        }

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @param minWidth 测量的最小宽度
         * @param minHeight 测量的最小高度
         */
        public setMeasuredSize(width:number, height:number, minWidth:number, minHeight:number):void {
            var values = this.$uiComponentValues;
            values[UIComponentValues.measuredWidth] = +width || 0;
            values[UIComponentValues.measuredHeight] = +height || 0;
            values[UIComponentValues.measuredMinWidth] = +minWidth || 0;
            values[UIComponentValues.measuredMinHeight] = +minHeight || 0;
        }


        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        private setActualSize(w:number, h:number):void {
            var change = false;
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.width] !== w) {
                values[UIComponentValues.width] = w;
                change = true;
            }
            if (values[UIComponentValues.height] !== h) {
                values[UIComponentValues.height] = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.emitResizeEvent();
            }
        }

        $setX(value:number):boolean {
            var change = super.$setX(value);
            if (change) {
                this.invalidateProperties();
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        }

        $setY(value:number):boolean {
            var change = super.$setY(value);
            if (change) {
                this.invalidateProperties();
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

            var values = this.$uiComponentValues;
            if (isNone(values[UIComponentValues.explicitWidth]) || isNone(values[UIComponentValues.explicitHeight])) {
                this.measure();

                if (values[UIComponentValues.measuredWidth] < values[UIComponentValues.explicitMinWidth]) {
                    values[UIComponentValues.measuredWidth] = values[UIComponentValues.explicitMinWidth];
                }
                if (values[UIComponentValues.measuredWidth] > values[UIComponentValues.explicitMaxWidth]) {
                    values[UIComponentValues.measuredWidth] = values[UIComponentValues.explicitMaxWidth];
                }
                if (values[UIComponentValues.measuredHeight] < values[UIComponentValues.explicitMinHeight]) {
                    values[UIComponentValues.measuredHeight] = values[UIComponentValues.explicitMinHeight];
                }
                if (values[UIComponentValues.measuredHeight] > values[UIComponentValues.explicitMaxHeight]) {
                    values[UIComponentValues.measuredHeight] = values[UIComponentValues.explicitMaxHeight]
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            var minW = isNone(values[UIComponentValues.explicitMinWidth]) ?
                values[UIComponentValues.measuredMinWidth] : values[UIComponentValues.explicitMinWidth];
            var minH = isNone(values[UIComponentValues.explicitMinHeight]) ?
                values[UIComponentValues.measuredMinHeight] : values[UIComponentValues.explicitMinHeight];
            if (preferredW !== values[UIComponentValues.oldPreferWidth] ||
                preferredH !== values[UIComponentValues.oldPreferHeight] ||
                minW !== values[UIComponentValues.oldMinWidth] ||
                minH !== values[UIComponentValues.oldMinHeight]) {
                changed = true;
            }
            values[UIComponentValues.oldMinWidth] = minW;
            values[UIComponentValues.oldMinHeight] = minH;
            values[UIComponentValues.oldPreferWidth] = preferredW;
            values[UIComponentValues.oldPreferHeight] = preferredH;
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
                var values = this.$uiComponentValues;
                if (this.$hasFlags(UIComponentFlags.LayoutWidthExplicitlySet)) {
                    unscaledWidth = values[UIComponentValues.width];
                }
                else if (!isNone(values[UIComponentValues.explicitWidth])) {
                    unscaledWidth = values[UIComponentValues.explicitWidth];
                }
                else {
                    unscaledWidth = values[UIComponentValues.measuredWidth];
                }
                if (this.$hasFlags(UIComponentFlags.LayoutHeightExplicitlySet)) {
                    unscaledHeight = values[UIComponentValues.height];
                }
                else if (!isNone(values[UIComponentValues.explicitHeight])) {
                    unscaledHeight = values[UIComponentValues.explicitHeight];
                }
                else {
                    unscaledHeight = values[UIComponentValues.measuredHeight];
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
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {
            var values = this.$uiComponentValues;
            if (values[UIComponentValues.oldWidth] != values[UIComponentValues.width] ||
                values[UIComponentValues.oldHeight] != values[UIComponentValues.height]) {
                this.emitResizeEvent();
            }
            if (values[UIComponentValues.oldX] != this.$getX() || values[UIComponentValues.oldY] != this.$getY()) {
                this.emitMoveEvent();
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {
            var values = this.$uiComponentValues;
            values[UIComponentValues.measuredHeight] = 0;
            values[UIComponentValues.measuredWidth] = 0;
        }

        /**
         *  抛出移动事件
         */
        private emitMoveEvent():void {
            var values = this.$uiComponentValues;
            if (this.hasListener(gui.MoveEvent.MOVE)) {
                gui.MoveEvent.emitMoveEvent(this, values[UIComponentValues.oldX], values[UIComponentValues.oldY]);
            }
            values[UIComponentValues.oldX] = this.$getX();
            values[UIComponentValues.oldY] = this.$getY();
        }

        /**
         *  抛出尺寸改变事件
         */
        private emitResizeEvent():void {
            var values = this.$uiComponentValues;
            if (this.hasListener(gui.ResizeEvent.RESIZE)) {
                gui.ResizeEvent.emitResizeEvent(this, values[UIComponentValues.oldWidth], values[UIComponentValues.oldHeight]);
            }
            values[UIComponentValues.oldWidth] = values[UIComponentValues.width];
            values[UIComponentValues.oldHeight] = values[UIComponentValues.height];
        }

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
            var width = layoutHeight = +layoutHeight || 0;
            var height = layoutWidth = +layoutWidth || 0;
            if (isNone(layoutWidth)) {
                this.$removeFlags(UIComponentFlags.LayoutWidthExplicitlySet);
                width = this.getPreferredUWidth();
            }
            else {
                this.$setFlags(UIComponentFlags.LayoutWidthExplicitlySet);
            }
            if (isNone(layoutHeight)) {
                this.$removeFlags(UIComponentFlags.LayoutHeightExplicitlySet);
                height = this.getPreferredUHeight();
            }
            else {
                this.$setFlags(UIComponentFlags.LayoutHeightExplicitlySet);
            }
            var matrix = this.$getMatrix();
            if (this.isDeltaIdentity(matrix.$data)) {
                this.setActualSize(width, height);
                return;
            }

            var maxWidth = this.maxWidth;
            var maxHeight = this.maxHeight;
            var minWidth = Math.min(this.minWidth, maxWidth);
            var minHeight = Math.min(this.minHeight, maxHeight);
            var values = this.$uiComponentValues;
            var fitSize = player.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix,
                values[UIComponentValues.explicitWidth], values[UIComponentValues.explicitHeight],
                this.getPreferredUWidth(), this.getPreferredUHeight(),
                minWidth, minHeight, maxWidth, maxHeight);
            if (!fitSize) {
                fitSize = new Point(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
            var changed = false;
            var matrix = this.$getMatrix();
            if (!this.isDeltaIdentity(matrix.$data)) {
                var bounds = this.getLayoutBounds($TempRectangle);
                x += this.$getX() - bounds.x;
                y += this.$getY() - bounds.y;
            }
            changed = super.$setX(x);
            changed = super.$setY(y) || changed;
            if (changed) {
                this.emitMoveEvent();
            }
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:Rectangle):Rectangle {
            var values = this.$uiComponentValues;
            var w:number;
            if (this.$hasFlags(UIComponentFlags.LayoutWidthExplicitlySet)) {
                w = values[UIComponentValues.width];
            }
            else if (!isNone(values[UIComponentValues.explicitWidth])) {
                w = values[UIComponentValues.explicitWidth];
            }
            else {
                w = values[UIComponentValues.measuredWidth];
            }
            var h:number;
            if (this.$hasFlags(UIComponentFlags.LayoutHeightExplicitlySet)) {
                h = values[UIComponentValues.height];
            }
            else if (!isNone(values[UIComponentValues.explicitHeight])) {
                h = values[UIComponentValues.explicitHeight];
            }
            else {
                h = values[UIComponentValues.measuredHeight];
            }
            return this.applyMatrix(bounds, w, h);
        }


        private getPreferredUWidth():number {
            var values = this.$uiComponentValues;
            return isNone(values[UIComponentValues.explicitWidth]) ?
                values[UIComponentValues.measuredWidth] : values[UIComponentValues.explicitWidth];
        }

        private getPreferredUHeight():number {
            var values = this.$uiComponentValues;
            return isNone(values[UIComponentValues.explicitHeight]) ?
                values[UIComponentValues.measuredHeight] : values[UIComponentValues.explicitHeight];
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
            if (this.isDeltaIdentity(m)) {
                bounds.x += m[4];
                bounds.y += m[5];
            }
            else {
                matrix.$transformBounds(bounds);
            }
            return bounds;
        }

        private isDeltaIdentity(m:Float64Array):boolean {
            return (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1);
        }

    }
}