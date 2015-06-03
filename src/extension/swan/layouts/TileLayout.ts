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
     * 网格布局
     */
    export class TileLayout extends LayoutBase {
        /**
         * 创建一个网格布局实例
         */
        public constructor() {
            super();
        }

        /**
         * 标记horizontalGap被显式指定过
         */
        private explicitHorizontalGap:number = lark.NONE;

        private _horizontalGap:number = 6;
        /**
         * 列之间的水平空间（以像素为单位）。
         */
        public get horizontalGap():number {
            return this._horizontalGap;
        }

        public set horizontalGap(value:number) {
            value = +value || 0;
            if (value === this._horizontalGap)
                return;
            this.explicitHorizontalGap = value;

            this._horizontalGap = value;
            this.invalidateTargetLayout();
        }

        /**
         * 标记verticalGap被显式指定过
         */
        private explicitVerticalGap:number = lark.NONE;

        private _verticalGap:number = 6;

        /**
         * 行之间的垂直空间（以像素为单位）。
         */
        public get verticalGap():number {
            return this._verticalGap;
        }

        public set verticalGap(value:number) {
            value = +value || 0;
            if (value === this._verticalGap)
                return;
            this.explicitVerticalGap = value;
            this._verticalGap = value;
            this.invalidateTargetLayout();
        }


        private _columnCount:number = -1;
        /**
         * 实际列计数。
         */
        public get columnCount():number {
            return this._columnCount;
        }

        private _requestedColumnCount:number = 0;
        /**
         * 要显示的列数。设置为0表示自动确定列计数,默认值0。
         * 注意:当orientation为TileOrientation.COLUMNS(逐列排列元素)且tagert被显式设置宽度时，此属性无效。
         */
        public get requestedColumnCount():number {
            return this._requestedColumnCount;
        }

        public set requestedColumnCount(value:number) {
            value = +value || 0;
            if (this._requestedColumnCount === value)
                return;
            this._requestedColumnCount = value;
            this._columnCount = value;
            this.invalidateTargetLayout();
        }


        private _rowCount:number = -1;
        /**
         * 实际行计数。
         */
        public get rowCount():number {
            return this._rowCount;
        }

        private _requestedRowCount:number = 0;
        /**
         * 要显示的行数。设置为0表示自动确定行计数,默认值0。
         * 注意:当orientation为TileOrientation.ROWS(即逐行排列元素,此为默认值)且target被显式设置高度时，此属性无效。
         */
        public get requestedRowCount():number {
            return this._requestedRowCount;
        }

        public set requestedRowCount(value:number) {
            value = +value || 0;
            if (this._requestedRowCount == value)
                return;
            this._requestedRowCount = value;
            this._rowCount = value;
            this.invalidateTargetLayout();
        }


        /**
         * 外部显式指定的列宽
         */
        private explicitColumnWidth:number = lark.NONE;

        private _columnWidth:number = lark.NONE;
        /**
         * 实际列宽（以像素为单位）。 若未显式设置，则从根据最宽的元素的宽度确定列宽度。
         */
        public get columnWidth():number {
            return this._columnWidth;
        }

        public set columnWidth(value:number) {
            value = +value || 0;
            if (value === this._columnWidth)
                return;
            this.explicitColumnWidth = value;
            this._columnWidth = value;
            this.invalidateTargetLayout();
        }

        /**
         * 外部显式指定的行高
         */
        private explicitRowHeight:number = lark.NONE;

        private _rowHeight:number = lark.NONE;
        /**
         * 行高（以像素为单位）。 如果未显式设置，则从元素的高度的最大值确定行高度。
         */
        public get rowHeight():number {
            return this._rowHeight;
        }

        public set rowHeight(value:number) {
            value = +value || 0;
            if (value === this._rowHeight)
                return;
            this.explicitRowHeight = value;
            this._rowHeight = value;
            this.invalidateTargetLayout();
        }


        private _paddingLeft:number = 0;
        /**
         * 容器的左边缘与布局元素的左边缘之间的最少像素数,默认值：0。
         */
        public get paddingLeft():number {
            return this._paddingLeft;
        }

        public set paddingLeft(value:number) {
            value = +value || 0;
            if (this._paddingLeft == value)
                return;

            this._paddingLeft = value;
            this.invalidateTargetLayout();
        }

        private _paddingRight:number = 0;
        /**
         * 容器的右边缘与布局元素的右边缘之间的最少像素数,默认值：0。
         */
        public get paddingRight():number {
            return this._paddingRight;
        }

        public set paddingRight(value:number) {
            value = +value || 0;
            if (this._paddingRight === value)
                return;

            this._paddingRight = value;
            this.invalidateTargetLayout();
        }

        private _paddingTop:number = 0;
        /**
         * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,默认值：0。
         */
        public get paddingTop():number {
            return this._paddingTop;
        }

        public set paddingTop(value:number) {
            value = +value || 0;
            if (this._paddingTop == value)
                return;
            this._paddingTop = value;
            this.invalidateTargetLayout();
        }

        private _paddingBottom:number = 0;
        /**
         * 容器的底边缘与最后一个布局元素的底边缘之间的像素数,默认值：0。
         */
        public get paddingBottom():number {
            return this._paddingBottom;
        }

        public set paddingBottom(value:number) {
            value = +value || 0;
            if (this._paddingBottom === value)
                return;
            this._paddingBottom = value;
            this.invalidateTargetLayout();
        }


        private _horizontalAlign:string = JustifyAlign.JUSTIFY;
        /**
         * 指定如何在水平方向上对齐单元格内的元素。
         * 支持的值有 HorizontalAlign.LEFT、HorizontalAlign.CENTER、
         * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
         * 默认值：JustifyAlign.JUSTIFY
         */
        public get horizontalAlign():string {
            return this._horizontalAlign;
        }

        public set horizontalAlign(value:string) {
            if (this._horizontalAlign == value)
                return;

            this._horizontalAlign = value;
            this.invalidateTargetLayout();
        }

        private _verticalAlign:string = JustifyAlign.JUSTIFY;

        /**
         * 指定如何在垂直方向上对齐单元格内的元素。
         * 支持的值有 VerticalAlign.TOP、VerticalAlign.MIDDLE、
         * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
         * 默认值：JustifyAlign.JUSTIFY。
         */
        public get verticalAlign():string {
            return this._verticalAlign;
        }

        public set verticalAlign(value:string) {
            if (this._verticalAlign == value)
                return;

            this._verticalAlign = value;
            this.invalidateTargetLayout();
        }

        private _columnAlign:string = ColumnAlign.LEFT;

        /**
         * 指定如何将完全可见列与容器宽度对齐。
         * 设置为 ColumnAlign.LEFT 时，它会关闭列两端对齐。在容器的最后一列和右边缘之间可能存在部分可见的列或空白。这是默认值。
         * 设置为 ColumnAlign.JUSTIFY_USING_GAP 时，horizontalGap 的实际值将增大，
         * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。仅存在一个完全可见列时，
         * horizontalGap 的实际值将增大，这样它会将任何部分可见列推到容器的右边缘之外。
         * 请注意显式设置 horizontalGap 属性不会关闭两端对齐。它仅确定初始间隙值。两端对齐可能会增大它。
         * 设置为 ColumnAlign.JUSTIFY_USING_WIDTH 时，columnWidth 的实际值将增大，
         * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。请注意显式设置 columnWidth 属性不会关闭两端对齐。
         * 它仅确定初始列宽度值。两端对齐可能会增大它。
         */
        public get columnAlign():string {
            return this._columnAlign;
        }

        public set columnAlign(value:string) {
            if (this._columnAlign == value)
                return;

            this._columnAlign = value;
            this.invalidateTargetLayout();
        }

        private _rowAlign:string = RowAlign.TOP;
        /**
         * 指定如何将完全可见行与容器高度对齐。
         * 设置为 RowAlign.TOP 时，它会关闭列两端对齐。在容器的最后一行和底边缘之间可能存在部分可见的行或空白。这是默认值。
         *
         * 设置为 RowAlign.JUSTIFY_USING_GAP 时，verticalGap 的实际值会增大，
         * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。仅存在一个完全可见行时，verticalGap 的值会增大，
         * 这样它会将任何部分可见行推到容器的底边缘之外。请注意，显式设置 verticalGap
         * 不会关闭两端对齐，而只是确定初始间隙值。两端对齐接着可以增大它。
         *
         * 设置为 RowAlign.JUSTIFY_USING_HEIGHT 时，rowHeight 的实际值会增大，
         * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。请注意，显式设置 rowHeight
         * 不会关闭两端对齐，而只是确定初始行高度值。两端对齐接着可以增大它。
         */
        public get rowAlign():string {
            return this._rowAlign;
        }

        public set rowAlign(value:string) {
            if (this._rowAlign == value)
                return;

            this._rowAlign = value;
            this.invalidateTargetLayout();
        }

        private _orientation:string = TileOrientation.ROWS;
        /**
         * 指定是逐行还是逐列排列元素。默认值：TileOrientation.ROWS
         */
        public get orientation():string {
            return this._orientation;
        }

        public set orientation(value:string) {
            if (this._orientation == value)
                return;

            this._orientation = value;
            this.invalidateTargetLayout();
        }

        /**
         * 标记目标容器的尺寸和显示列表失效
         */
        private invalidateTargetLayout():void {
            var target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        }

        /**
         * 基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        public measure():void {
            var target = this.$target;
            if (!target)
                return;

            var savedColumnCount = this._columnCount;
            var savedRowCount = this._rowCount;
            var savedColumnWidth = this._columnWidth;
            var savedRowHeight = this._rowHeight;

            var measuredWidth = 0;
            var measuredHeight = 0;

            var values = target.$UIComponent;
            this.calculateRowAndColumn(values[sys.UIKeys.explicitWidth], values[sys.UIKeys.explicitHeight]);
            var columnCount = this._requestedColumnCount > 0 ? this._requestedColumnCount : this._columnCount;
            var rowCount = this._requestedRowCount > 0 ? this._requestedRowCount : this._rowCount;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            if (columnCount > 0) {
                measuredWidth = columnCount * (this._columnWidth + horizontalGap) - horizontalGap;
            }

            if (rowCount > 0) {
                measuredHeight = rowCount * (this._rowHeight + verticalGap) - verticalGap;
            }

            var hPadding = this._paddingLeft + this._paddingRight;
            var vPadding = this._paddingTop + this._paddingBottom;

            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding)

            this._columnCount = savedColumnCount;
            this._rowCount = savedRowCount;
            this._columnWidth = savedColumnWidth;
            this._rowHeight = savedRowHeight;
        }

        /**
         * 计算行和列的尺寸及数量
         */
        private calculateRowAndColumn(explicitWidth:number, explicitHeight:number):void {
            var target = this.$target;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            var numElements = target.numElements;
            var count = numElements;
            for (var index = 0; index < count; index++) {
                var layoutElement = <UIComponent> (target.getElementAt(index));
                if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
            }
            if (numElements == 0) {
                this._rowCount = this._columnCount = 0;
                return;
            }

            if (lark.isNone(this.explicitColumnWidth) || lark.isNone(this.explicitRowHeight))
                this.updateMaxElementSize();

            if (lark.isNone(this.explicitColumnWidth)) {
                this._columnWidth = this.maxElementWidth;
            }
            else {
                this._columnWidth = this.explicitColumnWidth;
            }
            if (lark.isNone(this.explicitRowHeight)) {
                this._rowHeight = this.maxElementHeight;
            }
            else {
                this._rowHeight = this.explicitRowHeight;
            }

            var itemWidth = this._columnWidth + horizontalGap;
            //防止出现除数为零的情况
            if (itemWidth <= 0)
                itemWidth = 1;
            var itemHeight = this._rowHeight + verticalGap;
            if (itemHeight <= 0)
                itemHeight = 1;

            var orientedByColumns = (this._orientation == TileOrientation.COLUMNS);
            var widthHasSet = !lark.isNone(explicitWidth);
            var heightHasSet = !lark.isNone(explicitHeight);

            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;

            if (this._requestedColumnCount > 0 || this._requestedRowCount > 0) {
                if (this._requestedRowCount > 0)
                    this._rowCount = Math.min(this._requestedRowCount, numElements);

                if (this._requestedColumnCount > 0)
                    this._columnCount = Math.min(this._requestedColumnCount, numElements);
            }
            else if (!widthHasSet && !heightHasSet) {
                var side = Math.sqrt(numElements * itemWidth * itemHeight);
                if (orientedByColumns) {
                    this._rowCount = Math.max(1, Math.round(side / itemHeight));
                }
                else {
                    this._columnCount = Math.max(1, Math.round(side / itemWidth));
                }
            }
            else if (widthHasSet && (!heightHasSet || !orientedByColumns)) {
                var targetWidth = Math.max(0,
                    explicitWidth - paddingL - paddingR);
                this._columnCount = Math.floor((targetWidth + horizontalGap) / itemWidth);
                this._columnCount = Math.max(1, Math.min(this._columnCount, numElements));
            }
            else {
                var targetHeight = Math.max(0,
                    explicitHeight - paddingT - paddingB);
                this._rowCount = Math.floor((targetHeight + verticalGap) / itemHeight);
                this._rowCount = Math.max(1, Math.min(this._rowCount, numElements));
            }
            if (this._rowCount == -1)
                this._rowCount = Math.max(1, Math.ceil(numElements / this._columnCount));
            if (this._columnCount == -1)
                this._columnCount = Math.max(1, Math.ceil(numElements / this._rowCount));
            if (this._requestedColumnCount > 0 && this._requestedRowCount > 0) {
                if (this._orientation == TileOrientation.ROWS)
                    this._rowCount = Math.max(1, Math.ceil(numElements / this._requestedColumnCount));
                else
                    this._columnCount = Math.max(1, Math.ceil(numElements / this._requestedRowCount));
            }
        }

        /**
         * 缓存的最大子对象宽度
         */
        private maxElementWidth:number = 0;
        /**
         * 缓存的最大子对象高度
         */
        private maxElementHeight:number = 0;

        /**
         * 更新最大子对象尺寸
         */
        private updateMaxElementSize():void {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.maxElementWidth = Math.max(this.maxElementWidth, this.$typicalWidth);
                this.maxElementHeight = Math.max(this.maxElementHeight, this.$typicalHeight);
                this.doUpdateMaxElementSize(this.startIndex, this.endIndex);
            }
            else {
                this.doUpdateMaxElementSize(0, this.$target.numElements - 1);
            }
        }

        /**
         * 更新虚拟布局的最大子对象尺寸
         */
        private doUpdateMaxElementSize(startIndex:number, endIndex:number):void {
            var maxElementWidth = this.maxElementWidth;
            var maxElementHeight = this.maxElementHeight;
            var bounds = lark.$TempRectangle;
            var target = this.$target;
            if ((startIndex != -1) && (endIndex != -1)) {
                for (var index = startIndex; index <= endIndex; index++) {
                    var elt = <UIComponent> target.getElementAt(index);
                    if (!lark.is(elt, Types.UIComponent) || !elt.$includeInLayout) {
                        continue;
                    }
                    elt.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
            }
            this.maxElementWidth = maxElementWidth;
            this.maxElementHeight = maxElementHeight;

        }

        /**
         * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
         */
        public clearVirtualLayoutCache():void {
            super.clearVirtualLayoutCache();
            this.maxElementWidth = 0;
            this.maxElementHeight = 0;
        }

        /**
         * 当前视图中的第一个元素索引
         */
        private startIndex:number = -1;
        /**
         * 当前视图中的最后一个元素的索引
         */
        private endIndex:number = -1;
        /**
         * 视图的第一个和最后一个元素的索引值已经计算好的标志
         */
        private indexInViewCalculated:boolean = false;

        /**
         * scrollV 或 scrollH 属性更改时调用
         */
        public scrollPositionChanged():void {
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.$target.invalidateDisplayList();
                }
            }

        }

        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        private getIndexInView():boolean {
            if (!this.$target || this.$target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }

            var target = this.$target;
            var numElements = target.numElements;
            if (!this.$useVirtualLayout) {
                this.startIndex = 0;
                this.endIndex = numElements - 1;
                return false;
            }

            var values = target.$UIComponent;
            if (values[sys.UIKeys.width] == 0 || values[sys.UIKeys.height] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            var paddingL = this._paddingLeft;
            var paddingT = this._paddingTop;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            if (this._orientation == TileOrientation.COLUMNS) {
                var itemWidth = this._columnWidth + horizontalGap;
                if (itemWidth <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleX = target.scrollH;
                var maxVisibleX = minVisibleX + values[sys.UIKeys.width];
                var startColumn = Math.floor((minVisibleX - paddingL) / itemWidth);
                if (startColumn < 0)
                    startColumn = 0;
                var endColumn = Math.ceil((maxVisibleX - paddingL) / itemWidth);
                if (endColumn < 0)
                    endColumn = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startColumn * this._rowCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endColumn * this._rowCount - 1));
            }
            else {
                var itemHeight = this._rowHeight + verticalGap;
                if (itemHeight <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleY = target.scrollV;
                var maxVisibleY = minVisibleY + values[sys.UIKeys.height];
                var startRow = Math.floor((minVisibleY - paddingT) / itemHeight);
                if (startRow < 0)
                    startRow = 0;
                var endRow = Math.ceil((maxVisibleY - paddingT) / itemHeight);
                if (endRow < 0)
                    endRow = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startRow * this._columnCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endRow * this._columnCount - 1));
            }

            return this.startIndex != oldStartIndex || this.endIndex != oldEndIndex;
        }

        /**
         * 调整目标的元素的大小并定位这些元素
         */
        public updateDisplayList(width:number, height:number):void {
            super.updateDisplayList(width, height);
            if (!this.$target)
                return;
            var target = this.$target;
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this.indexInViewCalculated) {
                this.indexInViewCalculated = false;
            }
            else {
                this.calculateRowAndColumn(width, height);
                if (this._rowCount == 0 || this._columnCount == 0) {
                    target.setContentSize(paddingL + paddingR, paddingT + paddingB);
                    return;
                }
                this.adjustForJustify(width, height);
                this.getIndexInView();
            }
            if (this.$useVirtualLayout) {
                this.calculateRowAndColumn(width, height);
                this.adjustForJustify(width, height);
            }

            if (this.startIndex == -1 || this.endIndex == -1) {
                target.setContentSize(0, 0);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            var elt:UIComponent;
            var x:number;
            var y:number;
            var columnIndex:number;
            var rowIndex:number;
            var orientedByColumns = (this._orientation == TileOrientation.COLUMNS);
            var index = this.startIndex;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            var rowCount = this._rowCount;
            var columnCount = this._columnCount;
            var columnWidth = this._columnWidth;
            var rowHeight = this._rowHeight;
            for (var i = this.startIndex; i <= endIndex; i++) {
                if (this.$useVirtualLayout)
                    elt = <UIComponent> target.getElementAt(i);
                if (!lark.is(elt, Types.UIComponent) || !elt.$includeInLayout) {
                    continue;
                }

                if (orientedByColumns) {
                    columnIndex = Math.ceil((index + 1) / rowCount) - 1;
                    rowIndex = Math.ceil((index + 1) % rowCount) - 1;
                    if (rowIndex == -1)
                        rowIndex = rowCount - 1;
                }
                else {
                    columnIndex = Math.ceil((index + 1) % columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = columnCount - 1;
                    rowIndex = Math.ceil((index + 1) / columnCount) - 1;
                }
                x = columnIndex * (columnWidth + horizontalGap) + paddingL;
                y = rowIndex * (rowHeight + verticalGap) + paddingT;
                this.sizeAndPositionElement(elt, x, y, columnWidth, rowHeight);
                index++;
            }

            var hPadding = paddingL + paddingR;
            var vPadding = paddingT + paddingB;
            var contentWidth = (columnWidth + horizontalGap) * columnCount - horizontalGap;
            var contentHeight = (rowHeight + verticalGap) * rowCount - verticalGap;
            target.setContentSize(contentWidth + hPadding, contentHeight + vPadding);
        }

        /**
         * 为单个元素布局
         */
        private sizeAndPositionElement(element:UIComponent, cellX:number, cellY:number,
                                       cellWidth:number, cellHeight:number):void {
            var elementWidth = lark.NONE;
            var elementHeight = lark.NONE;
            var values = element.$UIComponent;
            if (this._horizontalAlign == JustifyAlign.JUSTIFY)
                elementWidth = cellWidth;
            else if (!lark.isNone(values[sys.UIKeys.percentWidth]))
                elementWidth = cellWidth * values[sys.UIKeys.percentWidth] * 0.01;

            if (this._verticalAlign == JustifyAlign.JUSTIFY)
                elementHeight = cellHeight;
            else if (!lark.isNone(values[sys.UIKeys.percentHeight]))
                elementHeight = cellHeight * values[sys.UIKeys.percentHeight] * 0.01;


            element.setLayoutBoundsSize(Math.round(elementWidth), Math.round(elementHeight));

            var x = cellX;
            var bounds = lark.$TempRectangle;
            element.getLayoutBounds(bounds);
            switch (this._horizontalAlign) {
                case lark.HorizontalAlign.RIGHT:
                    x += cellWidth - bounds.width;
                    break;
                case lark.HorizontalAlign.CENTER:
                    x = cellX + (cellWidth - bounds.width) / 2;
                    break;
            }

            var y = cellY;
            switch (this._verticalAlign) {
                case lark.VerticalAlign.BOTTOM:
                    y += cellHeight - bounds.height;
                    break;
                case lark.VerticalAlign.MIDDLE:
                    y += (cellHeight - bounds.height) / 2;
                    break;
            }
            element.setLayoutBoundsPosition(Math.round(x), Math.round(y));
        }


        /**
         * 为两端对齐调整间隔或格子尺寸
         */
        private adjustForJustify(width:number, height:number):void {
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;

            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            if (!lark.isNone(this.explicitVerticalGap))
                this._verticalGap = this.explicitVerticalGap;
            if (!lark.isNone(this.explicitHorizontalGap))
                this._horizontalGap = this.explicitHorizontalGap;
            this._verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            this._horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;

            var offsetY = targetHeight - this._rowHeight * this._rowCount;
            var offsetX = targetWidth - this._columnWidth * this._columnCount;
            var gapCount;
            if (offsetY > 0) {
                if (this._rowAlign == RowAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._rowCount - 1);
                    this._verticalGap = offsetY / gapCount;
                }
                else if (this._rowAlign == RowAlign.JUSTIFY_USING_HEIGHT) {
                    if (this._rowCount > 0) {
                        this._rowHeight += (offsetY - (this._rowCount - 1) * this._verticalGap) / this._rowCount;
                    }
                }
            }
            if (offsetX > 0) {
                if (this._columnAlign == ColumnAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._columnCount - 1);
                    this._horizontalGap = offsetX / gapCount;
                }
                else if (this._columnAlign == ColumnAlign.JUSTIFY_USING_WIDTH) {
                    if (this._columnCount > 0) {
                        this._columnWidth += (offsetX - (this._columnCount - 1) * this._horizontalGap) / this._columnCount;
                    }
                }
            }
        }
    }

    lark.registerClass(TileLayout,Types.TileLayout);
}