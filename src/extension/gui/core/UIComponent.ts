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
     * GUI显示对象基类
     */
    export class UIComponent extends DisplayObject {
        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.createChildren();
        }

        /**
         * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

        }

        /**
         * 嵌套深度，失效验证是根据这个深度来进行队列排序。
         */
        $nestLevel:number = 0;

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
            if (this.$invalidatePropertiesFlag) {
                validator.invalidateProperties(this);
            }
            if (this.$invalidateSizeFlag) {
                validator.invalidateSize(this);
            }
            if (this.$invalidateDisplayListFlag) {
                validator.invalidateDisplayList(this);
            }
            if (this.$validateNowFlag) {
                validator.validateClient(this);
                this.$validateNowFlag = false;
            }
        }


        private _explicitWidth:number = NONE;

        /**
         * 外部显式指定的宽度
         */
        public explicitWidth():number {
            return this._explicitWidth;
        }

        private _explicitHeight:number = NONE;

        /**
         * 外部显式指定的高度
         */
        public explicitHeight():number {
            return this._explicitHeight;
        }

        /**
         * 属性提交前组件旧的宽度
         */
        private oldWidth:number = NONE;

        private _width:number = 0;

        /**
         * 组件宽度,默认值为lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
         */
        public get width():number {
            return this._width;
        }

        public set width(value:number) {
            value = +value || 0;
            if (this._width === value && this._explicitWidth === value)
                return;
            this._width = value;
            this._explicitWidth = value;
            if (isNone(value))
                this.invalidateSize();
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 属性提交前组件旧的高度
         */
        private oldHeight:number = NONE;

        private _height:number = 0;

        /**
         * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        public get height():number {
            return this._height;
        }

        public set height(value:number) {
            value = +value || 0;
            if (this._height === value && this._explicitHeight === value)
                return;
            this._height = value;
            this._explicitWidth = value;
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

        private _explicitMinWidth:number = NONE;

        /**
         * 显式设置的最小宽度。
         */
        public get explicitMinWidth():number {
            return this._explicitMinWidth;
        }

        /**
         * 组件的最小测量宽度,此属性设置为大于maxWidth的值时无效。仅影响measuredWidth属性的取值范围。
         */
        public get minWidth():number {
            return isNone(this._explicitMinWidth) ? this._measuredMinWidth : this._explicitMinWidth;
        }

        public set minWidth(value:number) {
            value = +value || 0;
            if (this._explicitMinWidth === value) {
                return;
            }
            this._explicitMinWidth = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        private _explicitMaxWidth:number = NONE;

        /**
         * 显式设置的最大宽度
         */
        public get explicitMaxWidth():number {
            return this._explicitMaxWidth;
        }

        /**
         * 组件的最大测量高度,仅影响measuredWidth属性的取值范围。
         */
        public get maxWidth():number {
            return isNone(this._explicitMaxWidth) ? 10000 : this._explicitMaxWidth;
        }

        public set maxWidth(value:number) {
            value = +value || 0;
            if (this._explicitMaxWidth === value) {
                return;
            }
            this._explicitMaxWidth = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        private _explicitMinHeight:number = NONE;
        /**
         * 显式设置的最小高度
         */
        public get explicitMinHeight():number {
            return this._explicitMinHeight;
        }

        /**
         * 组件的最小测量高度,此属性设置为大于maxHeight的值时无效。仅影响measuredHeight属性的取值范围。
         */
        public get minHeight():number {
            return isNone(this._explicitMinHeight) ? this._measuredMinHeight : this._explicitMinHeight;
        }

        public set minHeight(value:number) {
            value = +value || 0;
            if (this._explicitMinHeight === value) {
                return;
            }
            this._explicitMinHeight = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        private _explicitMaxHeight:number = NONE;
        /**
         * 显式设置的最大高度
         */
        public get explicitMaxHeight():number {
            return this._explicitMaxHeight;
        }

        /**
         * 组件的最大测量高度,仅影响measuredHeight属性的取值范围。
         */
        public get maxHeight():number {
            return isNone(this._explicitMaxHeight) ? 10000 : this._explicitMaxHeight;
        }

        public set maxHeight(value:number) {
            value = +value || 0;
            if (this._explicitMaxHeight === value) {
                return;
            }
            this._explicitMaxHeight = value;
            this.invalidateSize();
            this.invalidateParentSizeAndDisplayList();
        }

        private _measuredMinWidth:number = 0;
        /**
         * 组件的测量最小宽度
         */
        public get measuredMinWidth():number {
            return this._measuredMinWidth;
        }

        private _measuredWidth:number = 0;
        /**
         * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
         */
        public get measuredWidth():number {
            return this._measuredWidth;
        }

        private _measuredMinHeight:number = 0;
        /**
         * 组件的测量最小高度
         */
        public get measuredMinHeight():number {
            return this._measuredMinHeight;
        }

        private _measuredHeight:number = 0;
        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         */
        public get measuredHeight():number {
            return this._measuredHeight;
        }

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @param minWidth 测量的最小宽度
         * @param minHeight 测量的最小高度
         */
        public setMeasuredSize(width:number, height:number, minWidth:number, minHeight:number):void {
            this._measuredWidth = +width||0;
            this._measuredHeight = +height||0;
            this._measuredMinWidth = +minWidth||0;
            this._measuredMinHeight = +minHeight||0;
        }


        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        private setActualSize(w:number, h:number):void {
            var change = false;
            if (this._width !== w) {
                this._width = w;
                change = true;
            }
            if (this._height !== h) {
                this._height = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.emitResizeEvent();
            }
        }

        /**
         * 属性提交前组件旧的X
         */
        private oldX:number = NONE;

        $setX(value:number):boolean {
            var change = super.$setX(value);
            if (change) {
                this.invalidateProperties();
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        }

        /**
         * 属性提交前组件旧的Y
         */
        private oldY:number = NONE;

        $setY(value:number):boolean {
            var change = super.$setY(value);
            if (change) {
                this.invalidateProperties();
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        }


        $invalidatePropertiesFlag:boolean = true;

        /**
         * 标记提交过需要延迟应用的属性
         */
        public invalidateProperties():void {
            if (!this.$invalidatePropertiesFlag) {
                this.$invalidatePropertiesFlag = true;
                if (this.$stage)
                    validator.invalidateProperties(this);
            }
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
            if (this.$invalidatePropertiesFlag) {
                this.commitProperties();

                this.$invalidatePropertiesFlag = false;
            }
        }

        $invalidateSizeFlag:boolean = true;

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
            if (!this.$invalidateSizeFlag) {
                this.$invalidateSizeFlag = true;

                if (this.$stage)
                    validator.invalidateSize(this);
            }
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize():void {
            if (this.$invalidateSizeFlag) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentSizeAndDisplayList();
                }
                this.$invalidateSizeFlag = false;
            }
        }

        /**
         * 上一次测量的首选宽度
         */
        private oldPreferWidth:number = NONE;
        /**
         * 上一次测量的首选高度
         */
        private oldPreferHeight:number = NONE;

        private oldMinWidth:number = NONE;

        private oldMinHeight:number = NONE;

        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        private measureSizes():boolean {
            var changed = false;

            if (!this.$invalidateSizeFlag)
                return changed;

            if (isNone(this._explicitWidth) || isNone(this._explicitHeight)) {
                this.measure();

                if (this._measuredWidth < this._explicitMinWidth) {
                    this._measuredWidth = this._explicitMinWidth;
                }
                if (this._measuredWidth > this._explicitMaxWidth) {
                    this._measuredWidth = this._explicitMaxWidth;
                }
                if (this._measuredHeight < this._explicitMinHeight) {
                    this._measuredHeight = this._explicitMinHeight;
                }
                if (this._measuredHeight > this._explicitMaxHeight) {
                    this._measuredHeight = this._explicitMaxHeight
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            var minW = isNone(this._explicitMinWidth) ? this._measuredMinWidth : this._explicitMinWidth;
            var minH = isNone(this._explicitMinHeight) ? this._measuredMinHeight : this._explicitMinHeight;
            if (preferredW !== this.oldPreferWidth || preferredH !== this.oldPreferHeight ||
                minW !== this.oldMinWidth || minH !== this.oldMinHeight) {
                changed = true;
            }
            this.oldMinWidth = minW;
            this.oldMinHeight = minH;
            this.oldPreferWidth = preferredW;
            this.oldPreferHeight = preferredH;
            return changed;
        }

        public $invalidateDisplayListFlag:boolean = true;

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList():void {
            if (!this.$invalidateDisplayListFlag) {
                this.$invalidateDisplayListFlag = true;
                if (this.$stage)
                    validator.invalidateDisplayList(this);
            }
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
            if (this.$invalidateDisplayListFlag) {
                var unscaledWidth:number = 0;
                var unscaledHeight:number = 0;
                if (this.$layoutWidthExplicitlySet) {
                    unscaledWidth = this._width;
                }
                else if (!isNone(this._explicitWidth)) {
                    unscaledWidth = this._explicitWidth;
                }
                else {
                    unscaledWidth = this._measuredWidth;
                }
                if (this.$layoutHeightExplicitlySet) {
                    unscaledHeight = this._height;
                }
                else if (!isNone(this._explicitHeight)) {
                    unscaledHeight = this._explicitHeight;
                }
                else {
                    unscaledHeight = this._measuredHeight;
                }
                this.setActualSize(unscaledWidth, unscaledHeight);
                this.updateDisplayList(unscaledWidth, unscaledHeight);
                this.$invalidateDisplayListFlag = false;
            }
        }

        public $validateNowFlag:boolean = true;

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
            if (!this.$validateNowFlag)
                validator.validateClient(this);
            else
                this.$validateNowFlag = true;
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentSizeAndDisplayList():void {
            var parent = this.$parent;
            if (!parent || !this.$includeInLayout || !(parent.isType(Types.UIComponent)))
                return;
            (<UIComponent><any>parent).invalidateSize();
            (<UIComponent><any>parent).invalidateDisplayList();
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
            if (this.oldWidth != this._width || this.oldHeight != this._height) {
                this.emitResizeEvent();
            }
            if (this.oldX != this.x || this.oldY != this.y) {
                this.emitMoveEvent();
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {
            this._measuredHeight = 0;
            this._measuredWidth = 0;
        }

        /**
         *  抛出移动事件
         */
        private emitMoveEvent():void {
            if (this.hasListener(MoveEvent.MOVE)) {
                MoveEvent.emitMoveEvent(this, this.oldX, this.oldY);
            }
            this.oldX = this.x;
            this.oldY = this.y;
        }

        /**
         *  抛出尺寸改变事件
         */
        private emitResizeEvent():void {
            if (this.hasListener(ResizeEvent.RESIZE)) {
                ResizeEvent.emitResizeEvent(this, this.oldWidth, this.oldHeight);
            }
            this.oldWidth = this._width;
            this.oldHeight = this._height;
        }

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


        private _left:number = NONE;

        /**
         * 距父级容器离左边距离
         */
        public get left():number {
            return this._left;
        }

        public set left(value:number) {
            value = +value || 0;
            if (this._left === value)
                return;
            this._left = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _right:number = NONE;
        /**
         * 距父级容器右边距离
         */
        public get right():number {
            return this._right;
        }

        public set right(value:number) {
            value = +value || 0;
            if (this._right === value)
                return;
            this._right = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _top:number = NONE;
        /**
         * 距父级容器顶部距离
         */
        public get top():number {
            return this._top;
        }

        public set top(value:number) {
            value = +value || 0;
            if (this._top === value)
                return;
            this._top = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _bottom:number = NONE;
        /**
         * 距父级容器底部距离
         */
        public get bottom():number {
            return this._bottom;
        }

        public set bottom(value:number) {
            value = +value || 0;
            if (this._bottom == value)
                return;
            this._bottom = value;
            this.invalidateParentSizeAndDisplayList();
        }


        private _horizontalCenter:number = NONE;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        public get horizontalCenter():number {
            return this._horizontalCenter;
        }

        public set horizontalCenter(value:number) {
            value = +value || 0;
            if (this._horizontalCenter === value)
                return;
            this._horizontalCenter = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _verticalCenter:number = NONE;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public get verticalCenter():number {
            return this._verticalCenter;
        }

        public set verticalCenter(value:number) {
            value = +value || 0;
            if (this._verticalCenter === value)
                return;
            this._verticalCenter = value;
            this.invalidateParentSizeAndDisplayList();
        }


        private _percentWidth:number = NONE;
        /**
         * 相对父级容器宽度的百分比
         */
        public get percentWidth():number {
            return this._percentWidth;
        }

        public set percentWidth(value:number) {
            value = +value || 0;
            if (this._percentWidth === value)
                return;
            this._percentWidth = value;
            this.invalidateParentSizeAndDisplayList();
        }


        private _percentHeight:number = NONE;
        /**
         * 相对父级容器高度的百分比
         */
        public get percentHeight():number {
            return this._percentHeight;
        }

        public set percentHeight(value:number) {
            value = +value || 0;
            if (this._percentHeight === value)
                return;
            this._percentHeight = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 父级布局管理器设置了组件的宽度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         */
        $layoutWidthExplicitlySet:boolean = false;

        /**
         * 父级布局管理器设置了组件的高度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         */
        $layoutHeightExplicitlySet:boolean = false;

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
            var width = layoutHeight = +layoutHeight||0;
            var height = layoutWidth = +layoutWidth||0;
            if (isNone(layoutWidth)) {
                this.$layoutWidthExplicitlySet = false;
                width = this.getPreferredUWidth();
            }
            else {
                this.$layoutWidthExplicitlySet = true;
            }
            if (isNone(layoutHeight)) {
                this.$layoutHeightExplicitlySet = false;
                height = this.getPreferredUHeight();
            }
            else {
                this.$layoutHeightExplicitlySet = true;
            }
            var matrix = this.$getMatrix();
            if(this.isDeltaIdentity(matrix.$data)){
                this.setActualSize(width, height);
                return;
            }

            var maxWidth = this.maxWidth;
            var maxHeight = this.maxHeight;
            var minWidth = Math.min(this.minWidth, maxWidth);
            var minHeight = Math.min(this.minHeight,maxHeight);
            var fitSize = player.MatrixUtil.fitBounds(layoutWidth,layoutHeight,matrix,
                this._explicitWidth,this._explicitHeight,this.getPreferredUWidth(),this.getPreferredUHeight(),
                minWidth,minHeight,maxWidth,maxHeight);
            if(!fitSize){
                fitSize = new Point(minWidth,minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
            var changed = false;
            var matrix = this.$getMatrix();
            if(!this.isDeltaIdentity(matrix.$data)){
                var bounds = this.getLayoutBounds();
                x += this.x-bounds.x;
                y += this.y-bounds.y;
            }
            changed = super.$setX(x);
            changed = super.$setY(y) || changed;
            if (changed) {
                this.emitMoveEvent();
            }
        }

        private _layoutBounds:Rectangle = new Rectangle();

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds():Rectangle {
            var w:number;
            if (this.$layoutWidthExplicitlySet) {
                w = this._width;
            }
            else if (!isNone(this._explicitWidth)) {
                w = this._explicitWidth;
            }
            else {
                w = this._measuredWidth;
            }
            var h:number;
            if (this.$layoutHeightExplicitlySet) {
                h = this._height;
            }
            else if (!isNone(this._explicitHeight)) {
                h = this._explicitHeight;
            }
            else {
                h = this._measuredHeight;
            }
            return this.applyMatrix(this._layoutBounds, w, h);
        }


        private getPreferredUWidth():number {
            return isNone(this._explicitWidth) ? this._measuredWidth : this._explicitWidth;
        }

        private getPreferredUHeight():number {
            return isNone(this._explicitHeight) ? this._measuredHeight : this._explicitHeight;
        }

        private _preferredBounds:Rectangle = new Rectangle();

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds():Rectangle {
            var w = this.getPreferredUWidth();
            var h = this.getPreferredUHeight();
            return this.applyMatrix(this._preferredBounds, w, h);
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

        private isDeltaIdentity(m:Float64Array):boolean{
            return (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1);
        }

    }

    registerType(UIComponent, [Types.UIComponent]);
}