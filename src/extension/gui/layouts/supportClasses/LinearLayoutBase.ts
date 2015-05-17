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
     * 线性布局基类，通常作为 HorizontalLayout 和 VerticalLayout 的父类。
     */
    export class LinearLayoutBase extends LayoutBase {

        $horizontalAlign:string = "left";

        /**
         * 布局元素的水平对齐策略。请使用 HorizontalAlign 定义的常量。
         */
        public get horizontalAlign():string {
            return this.$horizontalAlign;
        }

        public set horizontalAlign(value:string) {
            if (this.$horizontalAlign == value)
                return;
            this.$horizontalAlign = value;
            if (this.$target)
                this.$target.invalidateDisplayList();
        }

        $verticalAlign:string = "top";

        /**
         * 布局元素的竖直对齐策略。请使用 VerticalAlign 定义的常量。
         */
        public get verticalAlign():string {
            return this.$verticalAlign;
        }

        public set verticalAlign(value:string) {
            if (this.$verticalAlign == value)
                return;
            this.$verticalAlign = value;
            if (this.$target)
                this.$target.invalidateDisplayList();
        }

        $gap:number = 6;

        /**
         * 布局元素之间的间隔空间（以像素为单位）
         */
        public get gap():number {
            return this.$gap;
        }

        public set gap(value:number) {
            value = +value || 0;
            if (this.$gap === value)
                return;
            this.$gap = value;
            this.invalidateTargetLayout();
        }

        $paddingLeft:number = 0;

        /**
         * 容器的左边缘与布局元素的左边缘之间的最少像素数,默认值：0。
         */
        public get paddingLeft():number {
            return this.$paddingLeft;
        }

        public set paddingLeft(value:number) {
            value = +value || 0;
            if (this.$paddingLeft === value)
                return;

            this.$paddingLeft = value;
            this.invalidateTargetLayout();
        }

        $paddingRight:number = 0;

        /**
         * 容器的右边缘与布局元素的右边缘之间的最少像素数,默认值：0。
         */
        public get paddingRight():number {
            return this.$paddingRight;
        }

        public set paddingRight(value:number) {
            value = +value || 0;
            if (this.$paddingRight === value)
                return;

            this.$paddingRight = value;
            this.invalidateTargetLayout();
        }

        $paddingTop:number = 0;

        /**
         * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,默认值：0。
         */
        public get paddingTop():number {
            return this.$paddingTop;
        }

        public set paddingTop(value:number) {
            value = +value || 0;
            if (this.$paddingTop === value)
                return;

            this.$paddingTop = value;
            this.invalidateTargetLayout();
        }

        $paddingBottom:number = 0;

        /**
         * 容器的底边缘与最后一个布局元素的底边缘之间的像素数0,默认值：0。
         */
        public get paddingBottom():number {
            return this.$paddingBottom;
        }

        public set paddingBottom(value:number) {
            value = +value || 0;
            if (this.$paddingBottom === value)
                return;

            this.$paddingBottom = value;
            this.invalidateTargetLayout();
        }

        /**
         * 标记目标容器的尺寸和显示列表失效
         */
        protected invalidateTargetLayout():void {
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
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.measureVirtual();
            }
            else {
                this.measureReal();
            }
        }

        /**
         * 测量使用真实布局的尺寸
         */
        protected measureReal():void {

        }

        /**
         * 测量使用虚拟布局的尺寸
         */
        protected measureVirtual():void {

        }

        /**
         * 调整目标的元素的大小并定位这些元素
         */
        public updateDisplayList(width:number, height:number):void {
            var target = this.$target;
            if (!target)
                return;

            if (target.numElements == 0) {
                target.setContentSize(Math.ceil(this.$paddingLeft + this.$paddingRight),
                    Math.ceil(this.$paddingTop + this.$paddingBottom));
                return;
            }

            if (this.$useVirtualLayout) {
                this.updateDisplayListVirtual(width, height);
            }
            else {
                this.updateDisplayListReal(width, height);
            }
        }


        /**
         * 虚拟布局使用的子对象尺寸缓存
         */
        protected elementSizeTable:number[] = [];

        /**
         * 获取指定索引的起始位置
         */
        protected getStartPosition(index:number):number {
            return 0;
        }

        /**
         * 获取指定索引的元素尺寸
         */
        protected getElementSize(index:number):number {
            return 0;
        }

        /**
         * 获取缓存的子对象尺寸总和
         */
        protected getElementTotalSize():number {
            return 0;
        }

        public elementRemoved(index:number):void {
            if (!this.useVirtualLayout)
                return;
            super.elementRemoved(index);
            this.elementSizeTable.splice(index, 1);
        }

        /**
         * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
         */
        public clearVirtualLayoutCache():void {
            if (!this.$useVirtualLayout)
                return;
            this.elementSizeTable = [];
            this.maxElementSize = 0;
        }


        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(x:number, i0:number, i1:number):number {
            var index = ((i0 + i1) * 0.5)|0;
            var elementX = this.getStartPosition(index);
            var elementWidth = this.getElementSize(index);
            if ((x >= elementX) && (x < elementX + elementWidth + this.$gap))
                return index;
            else if (i0 == i1)
                return -1;
            else if (x < elementX)
                return this.findIndexAt(x, i0, Math.max(i0, index - 1));
            else
                return this.findIndexAt(x, Math.min(index + 1, i1), i1);
        }

        /**
         * 虚拟布局使用的当前视图中的第一个元素索引
         */
        protected startIndex:number = -1;
        /**
         * 虚拟布局使用的当前视图中的最后一个元素的索引
         */
        protected endIndex:number = -1;
        /**
         * 视图的第一个和最后一个元素的索引值已经计算好的标志
         */
        protected indexInViewCalculated:boolean = false;

        /**
         * verticalScrollPosition 或 horizontalScrollPosition 属性更改时调用
         * @method egret.gui.HorizontalLayout#scrollPositionChanged
         */
        public scrollPositionChanged():void {
            super.scrollPositionChanged();
            if (this.useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.target.invalidateDisplayList();
                }
            }

        }

        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        protected getIndexInView():boolean {
            return false;
        }

        /**
         * 子对象最大宽度
         */
        protected maxElementSize:number = 0;

        /**
         * 更新使用虚拟布局的显示列表
         */
        protected updateDisplayListVirtual(width:number, height:number):void {

        }


        /**
         * 更新使用真实布局的显示列表
         */
        protected updateDisplayListReal(width:number, height:number):void {

        }

        /**
         * 为每个可变尺寸的子项分配空白区域
         */
        protected flexChildrenProportionally(spaceForChildren:number, spaceToDistribute:number,
                                             totalPercent:number, childInfoArray:Array<any>):void {

            var numElements:number = childInfoArray.length;
            var done:boolean;

            do {
                done = true;

                var unused:number = spaceToDistribute -
                    (spaceForChildren * totalPercent / 100);
                if (unused > 0)
                    spaceToDistribute -= unused;
                else
                    unused = 0;

                var spacePerPercent:number = spaceToDistribute / totalPercent;

                for (var i:number = 0; i < numElements; i++) {
                    var childInfo:player.ChildInfo = childInfoArray[i];

                    var size:number = childInfo.percent * spacePerPercent;

                    if (size < childInfo.min) {
                        var min:number = childInfo.min;
                        childInfo.size = min;

                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;

                        totalPercent -= childInfo.percent;
                        if (unused >= min) {
                            unused -= min;
                        }
                        else {
                            spaceToDistribute -= min - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else if (size > childInfo.max) {
                        var max:number = childInfo.max;
                        childInfo.size = max;

                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;

                        totalPercent -= childInfo.percent;
                        if (unused >= max) {
                            unused -= max;
                        }
                        else {
                            spaceToDistribute -= max - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else {
                        childInfo.size = size;
                    }
                }
            }
            while (!done);
        }
    }
}

module lark.player {

    export class ChildInfo {


        public layoutElement:gui.UIComponent = null;


        public size:number = 0;


        public percent:number = NONE;


        public min:number = NONE;


        public max:number = NONE;
    }
}