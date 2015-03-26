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

module lark.web {

    export class WebInteraction extends HashObject{

        public constructor(interacion:lark.player.Interaction,canvas:HTMLCanvasElement){
            super();
            this.canvas = canvas;
            this.interaction = interacion;
            canvas.addEventListener("mousedown",this.onTouchBegin);
            canvas.addEventListener("mousemove",this.onTouchMove);
            canvas.addEventListener("mouseup",this.onTouchEnd);
        }

        private canvas:HTMLCanvasElement;
        private interaction:lark.player.Interaction;

        private onTouchBegin = (event:any):void => {
            var location = this.getLocation(event);
            this.interaction.onTouchBegin(location.x, location.y, event.identifier);
        }

        private onTouchMove = (event:any):void => {
            var location = this.getLocation(event);
            this.interaction.onTouchMove(location.x, location.y, event.identifier);

        }

        private onTouchEnd = (event:any):void => {
            var location = this.getLocation(event);
            this.interaction.onTouchEnd(location.x, location.y, event.identifier);
        }

        private getLocation(event:any):Point {
            var doc = document.documentElement;
            var box = this.canvas.getBoundingClientRect();
            var left = box.left + window.pageXOffset - doc.clientLeft;
            var top = box.top + window.pageYOffset - doc.clientTop;
            return Point.TEMP.setTo(event.pageX - left,event.pageY - top);
        }
    }
}