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
     * 水平滚动条
     */
    export class HScrollBar extends ScrollBarBase {

        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = lark.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbWidth = bounds.width;
            var thumbY = bounds.y;
            var hsp = viewport.scrollH;
            var contentWidth = viewport.contentWidth;
            var width = viewport.width;
            if (hsp <= 0) {
                var scaleWidth = thumbWidth * (-hsp) / (width * 0.5);
                thumb.setLayoutBoundsSize(scaleWidth, lark.NONE);
                thumb.setLayoutBoundsPosition(0, thumbY);
            }
            else if (hsp >= contentWidth - width) {
                scaleWidth = thumbWidth * (hsp - contentWidth + width) / (width * 0.5);
                thumb.setLayoutBoundsSize(scaleWidth, lark.NONE);
                thumb.setLayoutBoundsPosition(unscaledWidth - scaleWidth, thumbY);
            }
            else {
                var thumbX = (unscaledWidth-thumbWidth) * hsp / (contentWidth - width);
                thumb.setLayoutBoundsSize(lark.NONE, lark.NONE);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        }

        protected onPropertyChanged(event:swan.PropertyEvent):void {
            switch (event.property) {
                case "scrollH":
                case "contentWidth":
                    this.invalidateDisplayList();
                    break;
            }
        }
    }

    lark.registerClass(HScrollBar, Types.HScrollBar);
}