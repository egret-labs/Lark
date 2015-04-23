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

        private static _textField:lark.TextField;

        public static get display():lark.TextField {
            if (!FPS._textField) {
                FPS._textField = new lark.TextField("", {
                    color: 0x0c8c0c,
                    fontSize: 28,
                    fontFamily: "monospace"
                });
                FPS._textField.x = 20;
                FPS._textField.y = 20;
                FPS._textField.touchEnabled = false;
            }
            return FPS._textField;
        }

        private static totalTime:number = 0;
        private static totalTick:number = 0;
        private static lastTime:number = 0;
        private static drawCalls:number = 0;

        public static info:string = "";

        public static update(drawCalls:number, dirtyRatio:number, ...args):void {
            if (!FPS._textField) {
                return;
            }
            var current = lark.getTimer();
            FPS.totalTime += current - this.lastTime;
            FPS.lastTime = current;
            FPS.totalTick++;
            FPS.drawCalls = Math.max(drawCalls, FPS.drawCalls);
            if (FPS.totalTime > 500) {
                var lastFPS = Math.round(FPS.totalTick * 1000 / FPS.totalTime);
                FPS.totalTick = 0;
                FPS.totalTime = 0;
                var text = "FPS: " + lastFPS + "\nDraw: " + FPS.drawCalls + "," + dirtyRatio + "%\nCost: " + args.join(",");
                if(FPS.info){
                    text += "\nInfo: "+FPS.info;
                }
                if (FPS._textField.text != text) {
                    FPS._textField.text = text;
                }
                FPS.drawCalls = 0;
            }
        }
    }
}