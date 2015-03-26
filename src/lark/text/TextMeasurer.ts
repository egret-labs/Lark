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


module lark {
    var $TextMeasurerInstance: TextMeasurer = null,
        $TextWidthCache = {}
    /**
    * 用于文本宽度测量的辅助类
    */
    export class TextMeasurer {

        static $setInstance(it: TextMeasurer) {
            $TextMeasurerInstance = it;
        }
        /**
        * 测量文本在指定样式下的宽度
        */
        public static measureText(text: string, style: ITextStyle): number {
            if ($TextMeasurerInstance == null)
                throw new Error("TextMeasurer.setInstance has not been called");

            var width = 0.0;
            var fontCache = $TextWidthCache;
            var font = style.toFontString(true);
            var cache: { [char: string]: number } = fontCache[font] || (fontCache[font] = {});
            
            $TextMeasurerInstance.setupFont(style);

            var length = text.length;
            for (var i = 0; i < length; i++) {
                var letter = text.charCodeAt(i);
                var w = cache[letter] || (cache[letter] = $TextMeasurerInstance.measureText(text.charAt(i)));
                width += w;
            }
            return width;
        }

        
        /**
        * 测量前设置 Context 的文本样式
        */
        public setupFont(style: ITextStyle): void {

        }

        /**
        * 测量文本的宽度
        */
        public measureText(text: string): number {
            return 0;
        }
    }

    export class CanvasTextMeasurer extends TextMeasurer {
        protected renderContext: player.CanvasContext;
        protected ctx: CanvasRenderingContext2D;
        public constructor(renderContext: player.CanvasContext,ctx:CanvasRenderingContext2D) {
            super();
            this.renderContext = renderContext;
            this.ctx = ctx;
        }

        public setupFont(style: ITextStyle): void {
            this.renderContext.setupFont(style);
        }
        public measureText(text: string): number {
            return this.ctx.measureText(text).width;
        }
    }
}