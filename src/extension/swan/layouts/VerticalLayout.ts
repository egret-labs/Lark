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
     * 垂直布局
     */
    export class VerticalLayout extends LinearLayoutBase {

        /**
         * 测量使用真实布局的尺寸
         */
        protected measureReal():void {
            var target = this.$target;
            var count = target.numElements;
            var numElements = count;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var bounds = lark.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = <UIComponent> (target.getElementAt(i));
                if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            measuredHeight += (numElements - 1) * this.$gap;
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        }

        /**
         * 测量使用虚拟布局的尺寸
         */
        protected measureVirtual():void {
            var target = this.$target;
            var typicalHeight = this.$typicalHeight;
            var measuredHeight = this.getElementTotalSize();
            var measuredWidth = Math.max(this.maxElementSize, this.$typicalWidth);
            var bounds = lark.$TempRectangle;
            var endIndex = this.endIndex;
            var elementSizeTable = this.elementSizeTable;
            for (var index = this.startIndex; index < endIndex; index++) {
                var layoutElement = <UIComponent> (target.getElementAt(index));
                if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredHeight -= elementSizeTable[index] || typicalHeight;
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        }

        /**
         * 更新使用真实布局的显示列表
         */
        protected updateDisplayListReal(width:number, height:number):void {
            var target = this.$target;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);

            var vJustify = this.$verticalAlign == JustifyAlign.JUSTIFY;
            var hJustify = this.$horizontalAlign == JustifyAlign.JUSTIFY || this.$horizontalAlign == JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!hJustify) {
                if (this.$horizontalAlign == lark.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == lark.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }

            var count = target.numElements;
            var numElements = count;
            var x = paddingL;
            var y = paddingT;
            var i:number;
            var layoutElement:UIComponent;

            var totalPreferredHeight = 0;
            var totalPercentHeight = 0;
            var childInfoArray:any[] = [];
            var childInfo:lark.player.ChildInfo;
            var heightToDistribute = targetHeight;
            var maxElementWidth = this.maxElementSize;
            var bounds = lark.$TempRectangle;
            for (i = 0; i < count; i++) {
                var layoutElement = <UIComponent> (target.getElementAt(i));
                if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                maxElementWidth = Math.max(maxElementWidth, bounds.width);
                if (vJustify) {
                    totalPreferredHeight += bounds.height;
                }
                else {
                    var values = layoutElement.$uiValues;
                    if (!lark.isNone(values[lark.player.UIValues.percentHeight])) {
                        totalPercentHeight += values[lark.player.UIValues.percentHeight];

                        childInfo = new lark.player.ChildInfo();
                        childInfo.layoutElement = layoutElement;
                        childInfo.percent = values[lark.player.UIValues.percentHeight];
                        childInfo.min = values[lark.player.UIValues.minHeight];
                        childInfo.max = values[lark.player.UIValues.maxHeight];
                        childInfoArray.push(childInfo);

                    }
                    else {
                        heightToDistribute -= bounds.height;
                    }
                }
            }
            heightToDistribute -= gap * (numElements - 1);
            heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
            var excessSpace = targetHeight - totalPreferredHeight - gap * (numElements - 1);

            var averageHeight:number;
            var largeChildrenCount = numElements;
            var heightDic:any = {};
            if (vJustify) {
                if (excessSpace < 0) {
                    averageHeight = heightToDistribute / numElements;
                    for (i = 0; i < count; i++) {
                        layoutElement = <UIComponent> (target.getElementAt(i));
                        if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                            continue;
                        }

                        layoutElement.getPreferredBounds(bounds);
                        if (bounds.height <= averageHeight) {
                            heightToDistribute -= bounds.height;
                            largeChildrenCount--;
                            continue;
                        }
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            else {
                if (totalPercentHeight > 0) {
                    this.flexChildrenProportionally(targetHeight, heightToDistribute,
                        totalPercentHeight, childInfoArray);
                    var roundOff = 0;
                    var length = childInfoArray.length;
                    for (i = 0; i < length; i++) {
                        childInfo = childInfoArray[i];
                        var childSize = Math.round(childInfo.size + roundOff);
                        roundOff += childInfo.size - childSize;

                        heightDic[childInfo.layoutElement.$hashCode] = childSize;
                        heightToDistribute -= childSize;
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }

            if (this.$verticalAlign == lark.VerticalAlign.MIDDLE) {
                y = paddingT + heightToDistribute * 0.5;
            }
            else if (this.$verticalAlign == lark.VerticalAlign.BOTTOM) {
                y = paddingT + heightToDistribute;
            }

            var maxX = paddingL;
            var maxY = paddingT;
            var dx = 0;
            var dy = 0;
            var justifyWidth:number = Math.ceil(targetWidth);
            if (this.$horizontalAlign == JustifyAlign.CONTENT_JUSTIFY)
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            roundOff = 0;
            var layoutElementHeight:number;
            var childHeight:number;
            for (i = 0; i < count; i++) {
                var exceesWidth = 0;
                layoutElement = <UIComponent> (target.getElementAt(i));
                if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                layoutElementHeight = lark.NONE;
                if (vJustify) {
                    childHeight = lark.NONE;
                    if (excessSpace > 0) {
                        childHeight = heightToDistribute * bounds.height / totalPreferredHeight;
                    }
                    else if (excessSpace < 0 && bounds.height > averageHeight) {
                        childHeight = heightToDistribute / largeChildrenCount
                    }
                    if (!lark.isNone(childHeight)) {
                        layoutElementHeight = Math.round(childHeight + roundOff);
                        roundOff += childHeight - layoutElementHeight;
                    }
                }
                else {
                    layoutElementHeight = heightDic[layoutElement.$hashCode] || lark.NONE;
                }
                if (hJustify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    var layoutElementWidth = lark.NONE;
                    var values = layoutElement.$uiValues;
                    if (!lark.isNone(values[lark.player.UIValues.percentWidth])) {
                        var percent = Math.min(100, values[lark.player.UIValues.percentWidth]);
                        layoutElementWidth = Math.round(targetWidth * percent * 0.01);
                    }
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
                dx = Math.ceil(bounds.width);
                dy = Math.ceil(bounds.height);
                maxX = Math.max(maxX, x + dx);
                maxY = Math.max(maxY, y + dy);
                y += dy + gap;
            }
            this.maxElementSize = maxElementWidth;
            target.setContentSize(maxX + paddingR, maxY + paddingB);
        }

        /**
         * 更新使用虚拟布局的显示列表
         */
        protected updateDisplayListVirtual(width:number, height:number):void {
            var target = this.$target;
            if (this.indexInViewCalculated)
                this.indexInViewCalculated = false;
            else
                this.getIndexInView();
            var paddingB = this.$paddingBottom;
            var paddingL = this.$paddingTop;
            var paddingR = this.$paddingRight;
            var gap = this.$gap;
            var contentHeight:number;
            var numElements = target.numElements;
            if (this.startIndex == -1 || this.endIndex == -1) {
                contentHeight = this.getStartPosition(numElements) - gap + paddingB;
                target.setContentSize(target.contentWidth, contentHeight);
                return;
            }

            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            //获取垂直布局参数
            var justify = this.$horizontalAlign == JustifyAlign.JUSTIFY || this.$horizontalAlign == JustifyAlign.CONTENT_JUSTIFY;
            var contentJustify = this.$horizontalAlign == JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!justify) {
                if (this.$horizontalAlign == lark.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == lark.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }

            var bounds = lark.$TempRectangle;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var justifyWidth = Math.ceil(targetWidth);
            var layoutElement:UIComponent;
            var typicalHeight = this.$typicalHeight;
            var typicalWidth = this.$typicalWidth;
            var maxElementWidth = this.maxElementSize;
            var oldMaxW = Math.max(typicalWidth, this.maxElementSize);
            if (contentJustify) {
                for (var index = this.startIndex; index <= endIndex; index++) {
                    layoutElement = <UIComponent> (target.getElementAt(index));
                    if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                        continue;
                    }
                    layoutElement.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            }
            var x = 0;
            var y = 0;
            var contentWidth = 0;
            var oldElementSize:number;
            var needInvalidateSize = false;
            var elementSizeTable = this.elementSizeTable;

            //对可见区域进行布局
            for (var i = this.startIndex; i <= endIndex; i++) {
                var exceesWidth = 0;
                layoutElement = <UIComponent> (target.getElementAt(i));
                if (!lark.is(layoutElement, Types.UIComponent) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                if (!contentJustify) {
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                if (justify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, lark.NONE);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }

                contentWidth = Math.max(contentWidth, bounds.width);
                if (!needInvalidateSize) {
                    oldElementSize = elementSizeTable[i] || typicalHeight;
                    if (oldElementSize != bounds.height)
                        needInvalidateSize = true;
                }
                elementSizeTable[i] = bounds.height;
                y = this.getStartPosition(i);
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
            }

            contentWidth += paddingL + paddingR;
            contentHeight = this.getStartPosition(numElements) - gap + paddingB;
            this.maxElementSize = maxElementWidth;
            target.setContentSize(contentWidth, contentHeight);

            if (needInvalidateSize || oldMaxW < this.maxElementSize) {
                target.invalidateSize();
            }
        }

        /**
         * 获取指定索引的起始位置
         */
        protected getStartPosition(index:number):number {
            if (!this.$useVirtualLayout) {
                if (this.$target) {
                    var element = <UIComponent>this.$target.getElementAt(index);
                    if (element) {
                        return element.y;
                    }
                }
            }
            var typicalHeight = this.$typicalHeight;
            var startPos = this.$paddingTop;
            var gap = this.$gap;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < index; i++) {
                startPos += (elementSizeTable[i] || typicalHeight) + gap;
            }
            return startPos;
        }


        /**
         * 获取指定索引的元素尺寸
         */
        protected getElementSize(index:number):number {

            if (this.$useVirtualLayout) {
                return this.elementSizeTable[index] || this.$typicalHeight;
            }
            if (this.$target) {
                return this.$target.getElementAt(index).height;
            }
            return 0;
        }

        /**
         * 获取缓存的子对象尺寸总和
         */
        protected getElementTotalSize():number {
            var typicalHeight = this.$typicalHeight;
            var gap = this.$gap;
            var totalSize = 0;
            var length = this.$target.numElements;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < length; i++) {
                totalSize += (elementSizeTable[i] || typicalHeight) + gap;
            }
            totalSize -= gap;
            return totalSize;
        }

        public elementAdded(index:number):void {
            if (!this.$useVirtualLayout)
                return;
            super.elementAdded(index);
            this.elementSizeTable.splice(index, 0, this.$typicalHeight);
        }

        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        protected getIndexInView():boolean {
            var target = this.$target;
            if (!target || target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }

            var values = target.$uiValues;
            if (values[lark.player.UIValues.width] == 0 || values[lark.player.UIValues.height] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }

            var numElements = target.numElements;
            var contentHeight = this.getStartPosition(numElements - 1) +
                this.elementSizeTable[numElements - 1] + this.$paddingBottom;
            var minVisibleY = values[lark.player.UIValues.scrollV];
            if (minVisibleY > contentHeight - this.$paddingBottom) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var maxVisibleY = values[lark.player.UIValues.scrollH] + values[lark.player.UIValues.height];
            if (maxVisibleY < this.$paddingTop) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            this.startIndex = this.findIndexAt(minVisibleY, 0, numElements - 1);
            if (this.startIndex == -1)
                this.startIndex = 0;
            this.endIndex = this.findIndexAt(maxVisibleY, 0, numElements - 1);
            if (this.endIndex == -1)
                this.endIndex = numElements - 1;
            return oldStartIndex != this.startIndex || oldEndIndex != this.endIndex;
        }
    }

    lark.registerClass(VerticalLayout,Types.VerticalLayout);
}