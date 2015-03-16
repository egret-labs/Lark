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

    export class FPS {

        public constructor() {

        }

        private static _textSpan:lark.text.TextSpan;

        public static get display():lark.text.TextSpan {
            if (!FPS._textSpan) {
                FPS._textSpan = new lark.text.TextSpan();
                FPS._textSpan.color = 0xFF0000;
                FPS._textSpan.bold = true;
                FPS._textSpan.size = 24;
                FPS._textSpan.text = "fps:60";
                FPS._textSpan.textWidth = 400;
                FPS._textSpan.x = 20;
                FPS._textSpan.y = 20;
            }
            return FPS._textSpan;
        }

        private static totalTime:number = 0;
        private static totalTick:number = 0;
        private static lastTime:number = 0;
        private static lastFPS:number = 60;

        public static update(drawCalls:number, ...args):void {
            if(!FPS._textSpan){
                return;
            }
            var current = lark.getTimer();
            FPS.totalTime += current - this.lastTime;
            FPS.lastTime = current;
            FPS.totalTick++;
            if (FPS.totalTime > 500) {
                FPS.lastFPS = Math.round(FPS.totalTick * 1000 / FPS.totalTime);
                FPS.totalTick = 0;
                FPS.totalTime = 0;
            }
            var text = "FPS:" + FPS.lastFPS + " draw:" + drawCalls + " cost: " + args.join(",");
            if (FPS._textSpan.text != text) {
                FPS._textSpan.text = text;
                FPS._textSpan.$setDirtyFlags(DisplayObjectFlags.DirtyTextContent);
            }
        }
    }
}