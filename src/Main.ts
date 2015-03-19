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
    export class Main extends DisplayObjectContainer {

        public constructor() {
            super();
            var img = new Image();
            img.src = "image/test.png";
            img.onload = ()=> {
                var texture:Texture = new Texture();
                texture.$setBitmapData(img);
                this.start(texture);
            }

        }

        private targetIcon:Bitmap;

        private iconList:Bitmap[] = [];

        private start(texture:Texture):void{
            var x=0,y=0;
            for(var i=0;i<100000;i++){
                var bitmap = new Bitmap();
                bitmap.texture = texture;
                bitmap.x = x;
                bitmap.y = y;
                //bitmap.scaleX = bitmap.scaleY = Math.random();
                //bitmap.rotation = 1;
                x += texture.width;
                if(x>1920){
                    x = 0;
                    y += texture.height;
                    //if(y>960){
                    //    y = 0;
                    //}
                }
                this.addChild(bitmap);
                this.iconList.push(bitmap);
            }
            this.targetIcon = new lark.Bitmap();
            this.targetIcon.texture = texture;
            this.targetIcon.x = 0;
            this.targetIcon.y = 0;
            this.addChild(this.targetIcon);
            this.iconList.push(this.targetIcon);
            this.addChild(FPS.display);
            lark.player.WebTicker.getInstance().register(this.onTick,this);
        }

        private onTick():void{
            this.targetIcon.rotation += 2;
            //var list = this.iconList;
            //var length = list.length;
            //for(var i=0;i<length;i++){
            //    var bitmap = list[i];
            //    //bitmap.x = Math.random()*1900;
            //    //bitmap.y = Math.random()*960;
            //    i+=2;
            //}
        }
    }

}