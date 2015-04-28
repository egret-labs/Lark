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
    export interface UIComponent extends DisplayObject {

        ///**
        // * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
        // * 请务必调用super.createChildren()以完成父类组件的初始化
        // */
        // protected createChildren():void;

        ///**
        // * 标记父级容器的尺寸和显示列表为失效
        // */
        // protected invalidateParentSizeAndDisplayList():void;

        ///**
        // * 更新显示列表
        // */
        // protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void;

        ///**
        // * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
        // */
        // protected commitProperties():void;

        ///**
        // * 测量组件尺寸
        // */
        // protected measure():void;


        /**
         * 嵌套深度，失效验证是根据这个深度来进行队列排序。
         */
        $nestLevel:number;

        /**
         * 外部显式指定的宽度
         */
        explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        explicitHeight:number;

        /**
         * 显式设置的最小宽度。
         */
        explicitMinWidth:number;

        /**
         * 组件的最小测量宽度,此属性设置为大于maxWidth的值时无效。仅影响measuredWidth属性的取值范围。
         */
        minWidth:number;

        /**
         * 显式设置的最大宽度
         */
        explicitMaxWidth:number;

        /**
         * 组件的最大测量高度,仅影响measuredWidth属性的取值范围。
         */
        maxWidth:number;

        /**
         * 显式设置的最小高度
         */
        explicitMinHeight:number;

        /**
         * 组件的最小测量高度,此属性设置为大于maxHeight的值时无效。仅影响measuredHeight属性的取值范围。
         */
        minHeight:number;

        /**
         * 显式设置的最大高度
         */
        explicitMaxHeight:number;

        /**
         * 组件的最大测量高度,仅影响measuredHeight属性的取值范围。
         */
        maxHeight:number;

        /**
         * 组件的测量最小宽度
         */
        measuredMinWidth:number;

        /**
         * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
         */
        measuredWidth:number;

        /**
         * 组件的测量最小高度
         */
        measuredMinHeight:number;

        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         */
        measuredHeight:number;

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @param minWidth 测量的最小宽度
         * @param minHeight 测量的最小高度
         */
        setMeasuredSize(width:number, height:number, minWidth:number, minHeight:number):void;


        $invalidatePropertiesFlag:boolean;

        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties():void;

        /**
         * 验证组件的属性
         */
        validateProperties():void;

        $invalidateSizeFlag:boolean;

        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize():void;

        /**
         * 验证组件的尺寸
         */
        validateSize():void;

        $invalidateDisplayListFlag:boolean;

        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList():void;

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList():void;

        $validateNowFlag:boolean;

        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow():void;

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
         * 父级布局管理器设置了组件的宽度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         */
        $layoutWidthExplicitlySet:boolean;

        /**
         * 父级布局管理器设置了组件的高度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         */
        $layoutHeightExplicitlySet:boolean;

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
        getLayoutBounds():Rectangle;

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds():Rectangle;

    }

}

module lark.player {

    export function UIComponent():void {
        /**
         * 嵌套深度，失效验证是根据这个深度来进行队列排序。
         */
        this.$nestLevel = 0;
        this._explicitWidth = lark.NONE;
        this._explicitHeight = lark.NONE;
        /**
         * 属性提交前组件旧的宽度
         */
        this.oldWidth = lark.NONE;
        this._width = 0;
        /**
         * 属性提交前组件旧的高度
         */
        this.oldHeight = lark.NONE;
        this._height = 0;
        this._explicitMinWidth = lark.NONE;
        this._explicitMaxWidth = lark.NONE;
        this._explicitMinHeight = lark.NONE;
        this._explicitMaxHeight = lark.NONE;
        this._measuredMinWidth = 0;
        this._measuredWidth = 0;
        this._measuredMinHeight = 0;
        this._measuredHeight = 0;
        /**
         * 属性提交前组件旧的X
         */
        this.oldX = lark.NONE;
        /**
         * 属性提交前组件旧的Y
         */
        this.oldY = lark.NONE;
        this.$invalidatePropertiesFlag = true;
        this.$invalidateSizeFlag = true;
        /**
         * 上一次测量的首选宽度
         */
        this.oldPreferWidth = lark.NONE;
        /**
         * 上一次测量的首选高度
         */
        this.oldPreferHeight = lark.NONE;
        this.oldMinWidth = lark.NONE;
        this.oldMinHeight = lark.NONE;
        this.$invalidateDisplayListFlag = true;
        this.$validateNowFlag = true;
        this.$includeInLayout = true;
        this._left = lark.NONE;
        this._right = lark.NONE;
        this._top = lark.NONE;
        this._bottom = lark.NONE;
        this._horizontalCenter = lark.NONE;
        this._verticalCenter = lark.NONE;
        this._percentWidth = lark.NONE;
        this._percentHeight = lark.NONE;
        /**
         * 父级布局管理器设置了组件的宽度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         */
        this.$layoutWidthExplicitlySet = false;
        /**
         * 父级布局管理器设置了组件的高度标志，尺寸设置优先级：自动布局>显式设置>自动测量
         */
        this.$layoutHeightExplicitlySet = false;
        this._layoutBounds = new lark.Rectangle();
        this._preferredBounds = new lark.Rectangle();
        this.createChildren();
    }

    /**
     * UIComponent代码复用工具方法
     */
    export function implementUIComponent(prototype:any, _super:any):void {
        /**
         * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        prototype.createChildren = function () {
        };
        prototype.$onAddToStage = function (stage) {
            _super.prototype.$onAddToStage.call(this, stage);
            this.checkInvalidateFlag();
        };
        prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.$nestLevel = 0;
        };
        /**
         * 检查属性失效标记并应用
         */
        prototype.checkInvalidateFlag = function (event) {
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
        };
        /**
         * 外部显式指定的宽度
         */
        prototype.explicitWidth = function () {
            return this._explicitWidth;
        };
        /**
         * 外部显式指定的高度
         */
        prototype.explicitHeight = function () {
            return this._explicitHeight;
        };
        Object.defineProperty(prototype, "width", {
            /**
             * 组件宽度,默认值为lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
             */
            get: function () {
                return this._width;
            },
            set: function (value) {
                value = +value || 0;
                if (this._width === value && this._explicitWidth === value)
                    return;
                this._width = value;
                this._explicitWidth = value;
                if (lark.isNone(value))
                    this.invalidateSize();
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "height", {
            /**
             * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
             */
            get: function () {
                return this._height;
            },
            set: function (value) {
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
            },
            enumerable: true,
            configurable: true
        });
        prototype.$setScaleX = function (value) {
            var change = _super.prototype.$setScaleX.call(this, value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        prototype.$setScaleY = function (value) {
            var change = _super.prototype.$setScaleY.call(this, value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        Object.defineProperty(prototype, "explicitMinWidth", {
            /**
             * 显式设置的最小宽度。
             */
            get: function () {
                return this._explicitMinWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "minWidth", {
            /**
             * 组件的最小测量宽度,此属性设置为大于maxWidth的值时无效。仅影响measuredWidth属性的取值范围。
             */
            get: function () {
                return lark.isNone(this._explicitMinWidth) ? this._measuredMinWidth : this._explicitMinWidth;
            },
            set: function (value) {
                value = +value || 0;
                if (this._explicitMinWidth === value) {
                    return;
                }
                this._explicitMinWidth = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "explicitMaxWidth", {
            /**
             * 显式设置的最大宽度
             */
            get: function () {
                return this._explicitMaxWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "maxWidth", {
            /**
             * 组件的最大测量高度,仅影响measuredWidth属性的取值范围。
             */
            get: function () {
                return lark.isNone(this._explicitMaxWidth) ? 10000 : this._explicitMaxWidth;
            },
            set: function (value) {
                value = +value || 0;
                if (this._explicitMaxWidth === value) {
                    return;
                }
                this._explicitMaxWidth = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "explicitMinHeight", {
            /**
             * 显式设置的最小高度
             */
            get: function () {
                return this._explicitMinHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "minHeight", {
            /**
             * 组件的最小测量高度,此属性设置为大于maxHeight的值时无效。仅影响measuredHeight属性的取值范围。
             */
            get: function () {
                return lark.isNone(this._explicitMinHeight) ? this._measuredMinHeight : this._explicitMinHeight;
            },
            set: function (value) {
                value = +value || 0;
                if (this._explicitMinHeight === value) {
                    return;
                }
                this._explicitMinHeight = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "explicitMaxHeight", {
            /**
             * 显式设置的最大高度
             */
            get: function () {
                return this._explicitMaxHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "maxHeight", {
            /**
             * 组件的最大测量高度,仅影响measuredHeight属性的取值范围。
             */
            get: function () {
                return lark.isNone(this._explicitMaxHeight) ? 10000 : this._explicitMaxHeight;
            },
            set: function (value) {
                value = +value || 0;
                if (this._explicitMaxHeight === value) {
                    return;
                }
                this._explicitMaxHeight = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredMinWidth", {
            /**
             * 组件的测量最小宽度
             */
            get: function () {
                return this._measuredMinWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredWidth", {
            /**
             * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
             */
            get: function () {
                return this._measuredWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredMinHeight", {
            /**
             * 组件的测量最小高度
             */
            get: function () {
                return this._measuredMinHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredHeight", {
            /**
             * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
             */
            get: function () {
                return this._measuredHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @param minWidth 测量的最小宽度
         * @param minHeight 测量的最小高度
         */
        prototype.setMeasuredSize = function (width, height, minWidth, minHeight) {
            this._measuredWidth = +width || 0;
            this._measuredHeight = +height || 0;
            this._measuredMinWidth = +minWidth || 0;
            this._measuredMinHeight = +minHeight || 0;
        };
        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        prototype.setActualSize = function (w, h) {
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
        };
        prototype.$setX = function (value) {
            var change = _super.prototype.$setX.call(this, value);
            if (change) {
                this.invalidateProperties();
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        prototype.$setY = function (value) {
            var change = _super.prototype.$setY.call(this, value);
            if (change) {
                this.invalidateProperties();
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        /**
         * 标记提交过需要延迟应用的属性
         */
        prototype.invalidateProperties = function () {
            if (!this.$invalidatePropertiesFlag) {
                this.$invalidatePropertiesFlag = true;
                if (this.$stage)
                    gui.validator.invalidateProperties(this);
            }
        };
        /**
         * 验证组件的属性
         */
        prototype.validateProperties = function () {
            if (this.$invalidatePropertiesFlag) {
                this.commitProperties();
                this.$invalidatePropertiesFlag = false;
            }
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        prototype.invalidateSize = function () {
            if (!this.$invalidateSizeFlag) {
                this.$invalidateSizeFlag = true;
                if (this.$stage)
                    gui.validator.invalidateSize(this);
            }
        };
        /**
         * 验证组件的尺寸
         */
        prototype.validateSize = function () {
            if (this.$invalidateSizeFlag) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentSizeAndDisplayList();
                }
                this.$invalidateSizeFlag = false;
            }
        };
        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        prototype.measureSizes = function () {
            var changed = false;
            if (!this.$invalidateSizeFlag)
                return changed;
            if (lark.isNone(this._explicitWidth) || lark.isNone(this._explicitHeight)) {
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
                    this._measuredHeight = this._explicitMaxHeight;
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            var minW = lark.isNone(this._explicitMinWidth) ? this._measuredMinWidth : this._explicitMinWidth;
            var minH = lark.isNone(this._explicitMinHeight) ? this._measuredMinHeight : this._explicitMinHeight;
            if (preferredW !== this.oldPreferWidth || preferredH !== this.oldPreferHeight || minW !== this.oldMinWidth || minH !== this.oldMinHeight) {
                changed = true;
            }
            this.oldMinWidth = minW;
            this.oldMinHeight = minH;
            this.oldPreferWidth = preferredW;
            this.oldPreferHeight = preferredH;
            return changed;
        };
        /**
         * 标记需要验证显示列表
         */
        prototype.invalidateDisplayList = function () {
            if (!this.$invalidateDisplayListFlag) {
                this.$invalidateDisplayListFlag = true;
                if (this.$stage)
                    gui.validator.invalidateDisplayList(this);
            }
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        prototype.validateDisplayList = function () {
            if (this.$invalidateDisplayListFlag) {
                var unscaledWidth = 0;
                var unscaledHeight = 0;
                if (this.$layoutWidthExplicitlySet) {
                    unscaledWidth = this._width;
                }
                else if (!lark.isNone(this._explicitWidth)) {
                    unscaledWidth = this._explicitWidth;
                }
                else {
                    unscaledWidth = this._measuredWidth;
                }
                if (this.$layoutHeightExplicitlySet) {
                    unscaledHeight = this._height;
                }
                else if (!lark.isNone(this._explicitHeight)) {
                    unscaledHeight = this._explicitHeight;
                }
                else {
                    unscaledHeight = this._measuredHeight;
                }
                this.setActualSize(unscaledWidth, unscaledHeight);
                this.updateDisplayList(unscaledWidth, unscaledHeight);
                this.$invalidateDisplayListFlag = false;
            }
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        prototype.validateNow = function () {
            if (!this.$validateNowFlag)
                gui.validator.validateClient(this);
            else
                this.$validateNowFlag = true;
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        prototype.invalidateParentSizeAndDisplayList = function () {
            var parent = this.$parent;
            if (!parent || !this.$includeInLayout || !(parent.isType(1001 /* UIComponent */)))
                return;
            parent.invalidateSize();
            parent.invalidateDisplayList();
        };
        /**
         * 更新显示列表
         */
        prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
        };
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        prototype.commitProperties = function () {
            if (this.oldWidth != this._width || this.oldHeight != this._height) {
                this.emitResizeEvent();
            }
            if (this.oldX != this.x || this.oldY != this.y) {
                this.emitMoveEvent();
            }
        };
        /**
         * 测量组件尺寸
         */
        prototype.measure = function () {
            this._measuredHeight = 0;
            this._measuredWidth = 0;
        };
        /**
         *  抛出移动事件
         */
        prototype.emitMoveEvent = function () {
            if (this.hasListener(gui.MoveEvent.MOVE)) {
                gui.MoveEvent.emitMoveEvent(this, this.oldX, this.oldY);
            }
            this.oldX = this.x;
            this.oldY = this.y;
        };
        /**
         *  抛出尺寸改变事件
         */
        prototype.emitResizeEvent = function () {
            if (this.hasListener(gui.ResizeEvent.RESIZE)) {
                gui.ResizeEvent.emitResizeEvent(this, this.oldWidth, this.oldHeight);
            }
            this.oldWidth = this._width;
            this.oldHeight = this._height;
        };
        Object.defineProperty(prototype, "includeInLayout", {
            /**
             * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
             * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
             */
            get: function () {
                return this.$includeInLayout;
            },
            set: function (value) {
                value = !!value;
                if (this.$includeInLayout === value)
                    return;
                this.$includeInLayout = true;
                this.invalidateParentSizeAndDisplayList();
                this.$includeInLayout = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "left", {
            /**
             * 距父级容器离左边距离
             */
            get: function () {
                return this._left;
            },
            set: function (value) {
                value = +value || 0;
                if (this._left === value)
                    return;
                this._left = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "right", {
            /**
             * 距父级容器右边距离
             */
            get: function () {
                return this._right;
            },
            set: function (value) {
                value = +value || 0;
                if (this._right === value)
                    return;
                this._right = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "top", {
            /**
             * 距父级容器顶部距离
             */
            get: function () {
                return this._top;
            },
            set: function (value) {
                value = +value || 0;
                if (this._top === value)
                    return;
                this._top = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "bottom", {
            /**
             * 距父级容器底部距离
             */
            get: function () {
                return this._bottom;
            },
            set: function (value) {
                value = +value || 0;
                if (this._bottom == value)
                    return;
                this._bottom = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "horizontalCenter", {
            /**
             * 在父级容器中距水平中心位置的距离
             */
            get: function () {
                return this._horizontalCenter;
            },
            set: function (value) {
                value = +value || 0;
                if (this._horizontalCenter === value)
                    return;
                this._horizontalCenter = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "verticalCenter", {
            /**
             * 在父级容器中距竖直中心位置的距离
             */
            get: function () {
                return this._verticalCenter;
            },
            set: function (value) {
                value = +value || 0;
                if (this._verticalCenter === value)
                    return;
                this._verticalCenter = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "percentWidth", {
            /**
             * 相对父级容器宽度的百分比
             */
            get: function () {
                return this._percentWidth;
            },
            set: function (value) {
                value = +value || 0;
                if (this._percentWidth === value)
                    return;
                this._percentWidth = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "percentHeight", {
            /**
             * 相对父级容器高度的百分比
             */
            get: function () {
                return this._percentHeight;
            },
            set: function (value) {
                value = +value || 0;
                if (this._percentHeight === value)
                    return;
                this._percentHeight = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置组件的布局宽高
         */
        prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            var width = layoutHeight = +layoutHeight || 0;
            var height = layoutWidth = +layoutWidth || 0;
            if (lark.isNone(layoutWidth)) {
                this.$layoutWidthExplicitlySet = false;
                width = this.getPreferredUWidth();
            }
            else {
                this.$layoutWidthExplicitlySet = true;
            }
            if (lark.isNone(layoutHeight)) {
                this.$layoutHeightExplicitlySet = false;
                height = this.getPreferredUHeight();
            }
            else {
                this.$layoutHeightExplicitlySet = true;
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
            var fitSize = lark.player.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix, this._explicitWidth, this._explicitHeight, this.getPreferredUWidth(), this.getPreferredUHeight(), minWidth, minHeight, maxWidth, maxHeight);
            if (!fitSize) {
                fitSize = new lark.Point(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
        };
        /**
         * 设置组件的布局位置
         */
        prototype.setLayoutBoundsPosition = function (x, y) {
            var changed = false;
            var matrix = this.$getMatrix();
            if (!this.isDeltaIdentity(matrix.$data)) {
                var bounds = this.getLayoutBounds();
                x += this.x - bounds.x;
                y += this.y - bounds.y;
            }
            changed = _super.prototype.$setX.call(this, x);
            changed = _super.prototype.$setY.call(this, y) || changed;
            if (changed) {
                this.emitMoveEvent();
            }
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        prototype.getLayoutBounds = function () {
            var w;
            if (this.$layoutWidthExplicitlySet) {
                w = this._width;
            }
            else if (!lark.isNone(this._explicitWidth)) {
                w = this._explicitWidth;
            }
            else {
                w = this._measuredWidth;
            }
            var h;
            if (this.$layoutHeightExplicitlySet) {
                h = this._height;
            }
            else if (!lark.isNone(this._explicitHeight)) {
                h = this._explicitHeight;
            }
            else {
                h = this._measuredHeight;
            }
            return this.applyMatrix(this._layoutBounds, w, h);
        };
        prototype.getPreferredUWidth = function () {
            return lark.isNone(this._explicitWidth) ? this._measuredWidth : this._explicitWidth;
        };
        prototype.getPreferredUHeight = function () {
            return lark.isNone(this._explicitHeight) ? this._measuredHeight : this._explicitHeight;
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        prototype.getPreferredBounds = function () {
            var w = this.getPreferredUWidth();
            var h = this.getPreferredUHeight();
            return this.applyMatrix(this._preferredBounds, w, h);
        };
        prototype.applyMatrix = function (bounds, w, h) {
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
        };
        prototype.isDeltaIdentity = function (m) {
            return (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1);
        };
    }
}