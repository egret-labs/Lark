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
     * 垂直滚动条
     */
    export class VScrollBar extends ScrollBarBase {

        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = lark.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbHeight = bounds.height;
            var thumbX = bounds.x;
            var vsp = viewport.scrollV;
            var contentHeight = viewport.contentHeight;
            var height = viewport.height;
            if (vsp <= 0) {
                var scaleHeight = thumbHeight * (-vsp) / (height * 0.5);
                thumb.setLayoutBoundsSize(lark.NONE, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, 0);
            }
            else if (vsp >= contentHeight - height) {
                scaleHeight = thumbHeight * (vsp - contentHeight + height) / (height * 0.5);
                thumb.setLayoutBoundsSize(lark.NONE, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, unscaledHeight - scaleHeight);
            }
            else {
                var thumbY = (unscaledHeight - thumbHeight) * vsp / (contentHeight - height);
                thumb.setLayoutBoundsSize(lark.NONE, lark.NONE);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        }


        protected onPropertyChanged(event:swan.PropertyEvent):void {
            switch (event.property) {
                case "scrollV":
                case "contentHeight":
                    this.invalidateDisplayList();
                    break;
            }
        }
    }

    lark.registerClass(VScrollBar, Types.VScrollBar);
}