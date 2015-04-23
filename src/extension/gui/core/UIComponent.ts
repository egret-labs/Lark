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
    export class UIComponent extends DisplayObject{
        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.createChildren();
        }

        $onAddToStage(stage:Stage):void {
            super.$onAddToStage(stage);
            this.checkInvalidateFlag();
        }

        /**
         * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
         * 请务必调用super.createChildren()以完成父类组件的初始化
         * @method egret.gui.UIComponent#createChildren
         */
        public createChildren():void {

        }

        private _nestLevel:number = 0;
        /**
         * @member egret.gui.UIComponent#nestLevel
         */
        public get nestLevel():number {
            return this._nestLevel;
        }

        public set nestLevel(value:number) {
            if (this._nestLevel == value)
                return;
            this._nestLevel = value;
            this._updateChildrenNestLevel();
        }

        /**
         * 更新子项的nestLevel属性
         */
        public _updateChildrenNestLevel():void {
            for (var i:number = this.numChildren - 1; i >= 0; i--) {
                var child:UIComponent = <UIComponent><any> (this.getChildAt(i));
                if (child && "nestLevel" in child) {
                    child.nestLevel = this._nestLevel + 1;
                }
            }
        }

        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag(event:Event = null):void {
            var validator = lark.player.validator;
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


        public _enabled:boolean = true;
        /**
         * @member egret.gui.UIComponent#enabled
         */
        public get enabled():boolean {
            return this._enabled;
        }

        public set enabled(value:boolean) {
            this._enabled = value;
        }

        /**
         * 属性提交前组件旧的宽度
         */
        private oldWidth:number = NaN;

        public _width:number = 0;
        /**
         * 组件宽度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        public set width(value:number) {
            this._setWidth(value);
        }

        public _setWidth(value:number):void {
            if (this._width == value && this._explicitWidth == value)
                return;
            super._setWidth(value);
            if (isNaN(value))
                this.invalidateSize();
            else
                this._width = value;
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * @member egret.gui.UIComponent#width
         */
        public get width():number {
            return this._width;
        }

        /**
         * 属性提交前组件旧的高度
         */
        private oldHeight:number = NaN;

        public _height:number = 0;
        /**
         * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        public set height(value:number) {
            this._setHeight(value);
        }

        public _setHeight(value:number):void {
            if (this._height == value && this._explicitHeight == value)
                return;
            super._setHeight(value);
            if (isNaN(value))
                this.invalidateSize();
            else
                this._height = value;
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * @member egret.gui.UIComponent#height
         */
        public get height():number {
            return this._height;
        }

        /**
         * @member egret.gui.UIComponent#scaleX
         */
        public get scaleX():number {
            return this._scaleX;
        }

        /**
         * @inheritDoc
         */
        public set scaleX(value:number) {
            this._setScaleX(value);
        }

        public _setScaleX(value:number):void {
            if (this._scaleX == value)
                return;
            this._scaleX = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * @member egret.gui.UIComponent#scaleY
         */
        public get scaleY():number {
            return this._scaleY;
        }

        /**
         * @inheritDoc
         */
        public set scaleY(value:number) {
            this._setScaleY(value);
        }

        public _setScaleY(value:number):void {
            if (this._scaleY == value)
                return;
            this._scaleY = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _minWidth:number = 0;
        /**
         * @member egret.gui.UIComponent#minWidth
         */
        public get minWidth():number {
            return this._minWidth;
        }

        public set minWidth(value:number) {
            if (this._minWidth == value)
                return;
            this._minWidth = value;
            this.invalidateSize();
        }

        private _maxWidth:number = 10000;
        /**
         * @member egret.gui.UIComponent#maxWidth
         */
        public get maxWidth():number {
            return this._maxWidth;
        }

        public _getMaxWidth():number {
            return this._maxWidth;
        }

        public set maxWidth(value:number) {
            if (this._maxWidth == value)
                return;
            this._maxWidth = value;
            this.invalidateSize();
        }

        private _minHeight:number = 0;
        /**
         * @member egret.gui.UIComponent#minHeight
         */
        public get minHeight():number {
            return this._minHeight;
        }

        public set minHeight(value:number) {
            if (this._minHeight == value)
                return;
            this._minHeight = value;
            this.invalidateSize();
        }

        private _maxHeight:number = 10000;
        /**
         * @member egret.gui.UIComponent#maxHeight
         */
        public get maxHeight():number {
            return this._maxHeight;
        }

        public set maxHeight(value:number) {
            if (this._maxHeight == value)
                return;
            this._maxHeight = value;
            this.invalidateSize();
        }


        private _measuredWidth:number = 0;
        /**
         * 组件的默认宽度（以像素为单位）。此值由 measure() 方法设置。
         * @member egret.gui.UIComponent#measuredWidth
         */
        public get measuredWidth():number {
            return this._measuredWidth;
        }

        public set measuredWidth(value:number) {
            this._measuredWidth = value;
        }

        private _measuredHeight:number = 0;
        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         * @member egret.gui.UIComponent#measuredHeight
         */
        public get measuredHeight():number {
            return this._measuredHeight;
        }

        public set measuredHeight(value:number) {
            this._measuredHeight = value;
        }

        /**
         * @method egret.gui.UIComponent#setActualSize
         * @param w {number}
         * @param h {number}
         */
        public setActualSize(w:number, h:number):void {
            var change:boolean = false;
            if (this._width != w) {
                this._width = w;
                change = true;
            }
            if (this._height != h) {
                this._height = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.dispatchResizeEvent();
            }
        }

        /**
         * 属性提交前组件旧的X
         * @member egret.gui.UIComponent#oldX
         */
        private oldX:number = NaN;

        /**
         * @constant egret.gui.UIComponent#x
         */
        public get x():number {
            return this._x;
        }

        /**
         * @inheritDoc
         */
        public set x(value:number) {
            if (this._x == value)
                return;
            this._setX(value);
            this.invalidateProperties();
            if (this._includeInLayout && this.parent && this.parent instanceof UIComponent)
                (<UIComponent><any> (this.parent))._childXYChanged();
        }

        /**
         * 属性提交前组件旧的Y
         * @member egret.gui.UIComponent#oldY
         */
        private oldY:number = NaN;

        /**
         * @constant egret.gui.UIComponent#y
         */
        public get y():number {
            return this._y;
        }

        /**
         * @inheritDoc
         */
        public set y(value:number) {
            if (this._y == value)
                return;
            this._setY(value);
            this.invalidateProperties();
            if (this._includeInLayout && this.parent && this.parent instanceof UIComponent)
                (<UIComponent> (this.parent))._childXYChanged();
        }

        /**
         * @member egret.gui.UIComponent#$invalidatePropertiesFlag
         */
        $invalidatePropertiesFlag:boolean = true;

        /**
         * @method egret.gui.UIComponent#invalidateProperties
         */
        public invalidateProperties():void {
            if (!this.$invalidatePropertiesFlag) {
                this.$invalidatePropertiesFlag = true;
                if (this.$stage)
                    player.validator.invalidateProperties(this);
            }
        }

        /**
         * @method egret.gui.UIComponent#validateProperties
         */
        public validateProperties():void {
            if (this.$invalidatePropertiesFlag) {
                this.commitProperties();

                this.$invalidatePropertiesFlag = false;
            }
        }

        /**
         * @member egret.gui.UIComponent#$invalidateSizeFlag
         */
        public $invalidateSizeFlag:boolean = true;

        /**
         * @method egret.gui.UIComponent#invalidateSize
         */
        public invalidateSize():void {
            if (!this.$invalidateSizeFlag) {
                this.$invalidateSizeFlag = true;

                if (this.$stage)
                    player.validator.invalidateSize(this);
            }
        }

        public validateSize():void {
            if (this.$invalidateSizeFlag) {
                var changed:boolean = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentSizeAndDisplayList();
                }
                this.$invalidateSizeFlag = false;
            }
        }

        /**
         * 上一次测量的首选宽度
         * @member egret.gui.UIComponent#_oldPreferWidth
         */
        public _oldPreferWidth:number = NaN;
        /**
         * 上一次测量的首选高度
         * @member egret.gui.UIComponent#_oldPreferHeight
         */
        public _oldPreferHeight:number = NaN;

        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        private measureSizes():boolean {
            var changed:boolean = false;

            if (!this.$invalidateSizeFlag)
                return changed;

            if (!this.canSkipMeasurement()) {
                this.measure();
                if (this.measuredWidth < this.minWidth) {
                    this.measuredWidth = this.minWidth;
                }
                if (this.measuredWidth > this.maxWidth) {
                    this.measuredWidth = this.maxWidth;
                }
                if (this.measuredHeight < this.minHeight) {
                    this.measuredHeight = this.minHeight;
                }
                if (this.measuredHeight > this.maxHeight) {
                    this.measuredHeight = this.maxHeight
                }
            }
            if (isNaN(this._oldPreferWidth)) {
                this._oldPreferWidth = this.preferredWidth;
                this._oldPreferHeight = this.preferredHeight;
                changed = true;
            }
            else {
                if (this.preferredWidth != this._oldPreferWidth || this.preferredHeight != this._oldPreferHeight)
                    changed = true;
                this._oldPreferWidth = this.preferredWidth;
                this._oldPreferHeight = this.preferredHeight;
            }
            return changed;
        }

        public $invalidateDisplayListFlag:boolean = true;

        /**
         * @method egret.gui.UIComponent#invalidateDisplayList
         */
        public invalidateDisplayList():void {
            if (!this.$invalidateDisplayListFlag) {
                this.$invalidateDisplayListFlag = true;

                if (this.parent && UIGlobals._layoutManager)
                    UIGlobals._layoutManager.invalidateDisplayList(this);

                this._setSizeDirty();
            }
        }

        /**
         * @method egret.gui.UIComponent#validateDisplayList
         */
        public validateDisplayList():void {
            if (this.$invalidateDisplayListFlag) {
                var unscaledWidth:number = 0;
                var unscaledHeight:number = 0;
                if (this._layoutWidthExplicitlySet) {
                    unscaledWidth = this._width;
                }
                else if (!isNaN(this.explicitWidth)) {
                    unscaledWidth = this._explicitWidth;
                }
                else {
                    unscaledWidth = this.measuredWidth;
                }
                if (this._layoutHeightExplicitlySet) {
                    unscaledHeight = this._height;
                }
                else if (!isNaN(this.explicitHeight)) {
                    unscaledHeight = this._explicitHeight;
                }
                else {
                    unscaledHeight = this.measuredHeight;
                }
                if (isNaN(unscaledWidth))
                    unscaledWidth = 0;
                if (isNaN(unscaledHeight))
                    unscaledHeight = 0;
                this.setActualSize(unscaledWidth, unscaledHeight);
                this.updateDisplayList(unscaledWidth, unscaledHeight);
                this.$invalidateDisplayListFlag = false;
            }
        }

        public $validateNowFlag:boolean = true;

        /**
         * @method egret.gui.UIComponent#validateNow
         * @param skipDisplayList {boolean}
         */
        public validateNow(skipDisplayList:boolean = false):void {
            if (!this.$validateNowFlag)
                UIGlobals._layoutManager.validateClient(this, skipDisplayList);
            else
                this.$validateNowFlag = true;
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         * @method egret.gui.UIComponent#invalidateParentSizeAndDisplayList
         */
        public invalidateParentSizeAndDisplayList():void {
            if (!this.parent || !this._includeInLayout || !("invalidateSize" in this.parent))
                return;
            var p:IInvalidating = <IInvalidating><any>(this.parent);
            p.invalidateSize();
            p.invalidateDisplayList();
        }

        /**
         * 更新显示列表
         * @method egret.gui.UIComponent#updateDisplayList
         * @param unscaledWidth {number}
         * @param unscaledHeight {number}
         */
        public updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
        }

        /**
         * 是否可以跳过测量尺寸阶段,返回true则不执行measure()方法
         */
        public canSkipMeasurement():boolean {
            return !isNaN(this._explicitWidth) && !isNaN(this._explicitHeight);
        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        public commitProperties():void {
            if (this.oldWidth != this._width || this.oldHeight != this._height) {
                this.dispatchResizeEvent();
            }
            if (this.oldX != this.x || this.oldY != this.y) {
                this.dispatchMoveEvent();
            }
        }

        /**
         * 测量组件尺寸
         * @method egret.gui.UIComponent#measure
         */
        public measure():void {
            this._measuredHeight = 0;
            this._measuredWidth = 0;
        }

        /**
         *  抛出移动事件
         */
        private dispatchMoveEvent():void {
            if (this.hasEventListener(MoveEvent.MOVE)) {
                MoveEvent.dispatchMoveEvent(this, this.oldX, this.oldY);
            }
            this.oldX = this.x;
            this.oldY = this.y;
        }

        /**
         * 子项的xy位置发生改变
         */
        public _childXYChanged():void {

        }

        /**
         *  抛出尺寸改变事件
         */
        private dispatchResizeEvent():void {
            if (this.hasEventListener(ResizeEvent.RESIZE)) {
                ResizeEvent.dispatchResizeEvent(this, this.oldWidth, this.oldHeight);
            }
            this.oldWidth = this._width;
            this.oldHeight = this._height;
        }

        public _includeInLayout:boolean = true;
        /**
         * @member egret.gui.UIComponent#includeInLayout
         */
        public get includeInLayout():boolean {
            return this._includeInLayout;
        }

        public set includeInLayout(value:boolean) {
            if (this._includeInLayout == value)
                return;
            this._includeInLayout = true;
            this.invalidateParentSizeAndDisplayList();
            this._includeInLayout = value;
        }


        private _left:number = NaN;

        /**
         * @member egret.gui.UIComponent#left
         */
        public get left():number {
            return this._left;
        }

        public set left(value:number) {
            if (this._left == value)
                return;
            this._left = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _right:number = NaN;
        /**
         * @member egret.gui.UIComponent#right
         */
        public get right():number {
            return this._right;
        }

        public set right(value:number) {
            if (this._right == value)
                return;
            this._right = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _top:number = NaN;
        /**
         * @member egret.gui.UIComponent#top
         */
        public get top():number {
            return this._top;
        }

        public set top(value:number) {
            if (this._top == value)
                return;
            this._top = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _bottom:number = NaN;
        /**
         * @member egret.gui.UIComponent#bottom
         */
        public get bottom():number {
            return this._bottom;
        }

        public set bottom(value:number) {
            if (this._bottom == value)
                return;
            this._bottom = value;
            this.invalidateParentSizeAndDisplayList();
        }


        private _horizontalCenter:number = NaN;
        /**
         * @member egret.gui.UIComponent#horizontalCenter
         */
        public get horizontalCenter():number {
            return this._horizontalCenter;
        }

        public set horizontalCenter(value:number) {
            if (this._horizontalCenter == value)
                return;
            this._horizontalCenter = value;
            this.invalidateParentSizeAndDisplayList();
        }

        private _verticalCenter:number = NaN;
        /**
         * @member egret.gui.UIComponent#verticalCenter
         */
        public get verticalCenter():number {
            return this._verticalCenter;
        }

        public set verticalCenter(value:number) {
            if (this._verticalCenter == value)
                return;
            this._verticalCenter = value;
            this.invalidateParentSizeAndDisplayList();
        }


        private _percentWidth:number = NaN;
        /**
         * @member egret.gui.UIComponent#percentWidth
         */
        public get percentWidth():number {
            return this._percentWidth;
        }

        public set percentWidth(value:number) {
            if (this._percentWidth == value)
                return;
            this._percentWidth = value;
            this.invalidateParentSizeAndDisplayList();
        }


        private _percentHeight:number = NaN;

        /**
         * @member egret.gui.UIComponent#percentHeight
         */
        public get percentHeight():number {
            return this._percentHeight;
        }

        public set percentHeight(value:number) {
            if (this._percentHeight == value)
                return;
            this._percentHeight = value;
            this.invalidateParentSizeAndDisplayList();
        }

        /**
         * 父级布局管理器设置了组件的宽度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         * @member egret.gui.UIComponent#_layoutWidthExplicitlySet
         */
        public _layoutWidthExplicitlySet:boolean = false;

        /**
         * 父级布局管理器设置了组件的高度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         * @member egret.gui.UIComponent#_layoutHeightExplicitlySet
         */
        public _layoutHeightExplicitlySet:boolean = false;

        /**
         * @method egret.gui.UIComponent#setLayoutBoundsSize
         * @param layoutWidth {number}
         * @param layoutHeight {number}
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
            if (isNaN(layoutWidth)) {
                this._layoutWidthExplicitlySet = false;
                layoutWidth = this.preferredWidth;
            }
            else {
                this._layoutWidthExplicitlySet = true;
            }
            if (isNaN(layoutHeight)) {
                this._layoutHeightExplicitlySet = false;
                layoutHeight = this.preferredHeight;
            }
            else {
                this._layoutHeightExplicitlySet = true;
            }

            this.setActualSize(layoutWidth / this._scaleX, layoutHeight / this._scaleY);
        }

        /**
         * @method egret.gui.UIComponent#setLayoutBoundsPosition
         * @param x {number}
         * @param y {number}
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
            if (this._scaleX < 0) {
                x += this.layoutBoundsWidth;
            }
            if (this._scaleY < 0) {
                y += this.layoutBoundsHeight;
            }
            var changed:boolean = false;
            if (this._x != x) {
                this._setX(x);
                changed = true;
            }
            if (this._y != y) {
                this._setY(y);
                changed = true;
            }
            if (changed) {
                this.dispatchMoveEvent();
            }
        }

        /**
         * @member egret.gui.UIComponent#preferredWidth
         */
        public get preferredWidth():number {
            var w:number = this._hasWidthSet ? this._explicitWidth : this._measuredWidth;
            var scaleX:number = this._scaleX;
            if (scaleX < 0) {
                scaleX = -scaleX;
            }
            return w * scaleX;
        }

        /**
         * @member egret.gui.UIComponent#preferredHeight
         */
        public get preferredHeight():number {
            var h:number = this._hasHeightSet ? this._explicitHeight : this._measuredHeight;
            var scaleY:number = this._scaleY;
            if (scaleY < 0) {
                scaleY = -scaleY;
            }
            return h * scaleY;
        }

        /**
         * @member egret.gui.UIComponent#preferredX
         */
        public get preferredX():number {
            if (this._scaleX >= 0) {
                return this._x;
            }
            var w:number = this.preferredWidth;
            return this._x - w;
        }

        /**
         * @member egret.gui.UIComponent#preferredY
         */
        public get preferredY():number {
            if (this._scaleY >= 0) {
                return this._y;
            }
            var h:number = this.preferredHeight;
            return this._y - h;
        }

        /**
         * @member egret.gui.UIComponent#layoutBoundsX
         */
        public get layoutBoundsX():number {
            if (this._scaleX >= 0) {
                return this._x;
            }
            var w:number = this.layoutBoundsWidth;
            return this._x - w;
        }

        /**
         * @member egret.gui.UIComponent#layoutBoundsY
         */
        public get layoutBoundsY():number {
            if (this._scaleY >= 0) {
                return this._y;
            }
            var h:number = this.layoutBoundsHeight;
            return this._y - h;
        }

        /**
         * @member egret.gui.UIComponent#layoutBoundsWidth
         */
        public get layoutBoundsWidth():number {
            var w:number = 0;
            if (this._layoutWidthExplicitlySet) {
                w = this._width;
            }
            else if (this._hasWidthSet) {
                w = this._explicitWidth;
            }
            else {
                w = this._measuredWidth;
            }
            var scaleX:number = this._scaleX;
            if (scaleX < 0) {
                scaleX = -scaleX;
            }
            return w * scaleX;
        }

        /**
         * 组件的布局高度,常用于父级的updateDisplayList()方法中
         * 按照：布局高度>外部显式设置高度>测量高度 的优先级顺序返回高度
         * @member egret.gui.UIComponent#layoutBoundsHeight
         */
        public get layoutBoundsHeight():number {
            var h:number = 0
            if (this._layoutHeightExplicitlySet) {
                h = this._height;
            }
            else if (this._hasHeightSet) {
                h = this._explicitHeight;
            }
            else {
                h = this._measuredHeight;
            }
            var scaleY:number = this.scaleY;
            if (scaleY < 0) {
                scaleY = -scaleY;
            }
            return h * scaleY;
        }
    }
}