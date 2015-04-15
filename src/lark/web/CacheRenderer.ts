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

    export class CacheRenderer extends ScreenRenderer{

        /**
         * canvas被绘制过的标志
         */
        private drawed:boolean = false;
        /**
         * 重置画布
         */
        public reset(root:DisplayObject):void {
            var texture = root.$cacheNode.texture;
            var offsetX = texture.$offsetX;
            var offsetY = texture.$offsetY;
            var bounds = root.$getOriginalBounds();
            var canvas = this.canvas;
            if(!this.drawed){
                this.drawed = true;
                this.changeCacheSize(texture,bounds);
            }
            else if(bounds.width!==canvas.width||bounds.height!==canvas.height){
                var oldCanvas = this.canvas;
                var oldContext = this.context;
                this.context = sharedCanvasContext;
                this.canvas = this.context.canvas;
                sharedCanvasContext = oldContext;
                this.changeCacheSize(texture,bounds);
                if(oldCanvas.width!==0&&oldCanvas.height!==0){
                    this.context.setTransform(1,0,0,1,0,0);
                    this.context.drawImage(oldCanvas,offsetX-bounds.x,offsetY-bounds.y);
                }
            }
            super.reset(root);
            var m = root.$getInvertedConcatenatedMatrix();
            this.context.transform(m.a, m.b, m.c, m.d, m.tx-texture.$offsetX, m.ty-texture.$offsetY);
        }

        private changeCacheSize(texture:Texture,bounds:Rectangle):void{
            this.canvas.width = bounds.width;
            this.canvas.height = bounds.height;
            texture.$setBitmapData(this.canvas);
            texture.$offsetX = bounds.x;
            texture.$offsetY = bounds.y;
        }

        /**
         * 绘制图片到一个区域上
         */
        public drawImage(texture:Texture, matrix:Matrix, globalAlpha:number):void {
            super.drawImage(texture, matrix, globalAlpha);
            this.context.restore();
        }

        /**
         * 绘制文本到一个区域上
         */
        public drawText(text:string, font:string, color:string, x:number, y:number, width:number, matrix:Matrix, globalAlpha:number):void {
            super.drawText(text, font, color, x, y, width, matrix, globalAlpha);
            this.context.restore();
        }

        /**
         * 设置并缓存矩阵变换参数，所有修改必须统一调用此方法。子类有可能会覆盖此方法改为叠加transform方式。
         */
        protected setTransform(a:number, b:number, c:number, d:number, tx:number, ty:number):void {
            var context = this.context;
            context.save();
            context.transform(a, b, c, d, tx, ty);
        }
    }
}