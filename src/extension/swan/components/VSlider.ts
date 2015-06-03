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
     * 垂直滑块控件
     */
    export class VSlider extends SliderBase {
        /**
         * 创建一个垂直滑块控件
         */
        public constructor() {
            super();
        }

        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值
         */
        protected pointToValue(x:number, y:number):number {
            if (!this.thumb || !this.track)
                return 0;

            var values = this.$Range;
            var range = values[sys.RangeKeys.maximum] - values[sys.RangeKeys.minimum];
            var thumbRange = this.getThumbRange();
            return values[sys.RangeKeys.minimum] + ((thumbRange != 0) ? ((thumbRange - y) / thumbRange) * range : 0);
        }

        private getThumbRange():number {
            var bounds = lark.$TempRectangle;
            this.track.getLayoutBounds(bounds);
            var thumbRange = bounds.height;
            this.thumb.getLayoutBounds(bounds);
            return thumbRange - bounds.height;
        }


        /**
         * 设置外观部件（通常为滑块）的边界，这些外观部件的几何图形不是完全由外观的布局指定的
         */
        public updateSkinDisplayList():void {
            if (!this.thumb || !this.track)
                return;
            var values = this.$Range
            var thumbRange = this.getThumbRange();
            var range = values[sys.RangeKeys.maximum] - values[sys.RangeKeys.minimum];
            var thumbPosTrackY:number = (range > 0) ? thumbRange - (((this.$pendingValue - values[sys.RangeKeys.minimum]) / range) * thumbRange) : 0;
            var thumbPos = this.track.localToGlobal(0, thumbPosTrackY,lark.$TempPoint);
            var thumbPosX = thumbPos.x;
            var thumbPosY = thumbPos.y;
            var thumbPosParentY = this.thumb.$parent.globalToLocal(thumbPosX, thumbPosY, lark.$TempPoint).y;

            var bounds = lark.$TempRectangle;
            var thumbHeight = bounds.height;
            this.thumb.getLayoutBounds(bounds);
            this.thumb.setLayoutBoundsPosition(bounds.x, Math.round(thumbPosParentY));
            if (this.trackHighlight) {
                var trackHighlightY = this.trackHighlight.$parent.globalToLocal(thumbPosX, thumbPosY, lark.$TempPoint).y;
                this.trackHighlight.y = Math.round(trackHighlightY + thumbHeight);
                this.trackHighlight.height = Math.round(thumbRange - trackHighlightY);
            }
        }
    }

}