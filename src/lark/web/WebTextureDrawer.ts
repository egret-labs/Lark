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

    var TEMP_RECTANGLE:Rectangle = new Rectangle();

    export class WebTextureDrawer extends CanvasRenderer implements lark.player.ITextureDrawer{

        public constructor(){
            super(null);
        }

        /**
         * 检测是否允许显示对象启用cacheAsBitmap功能，若超过系统内存上限或触发其他限制，将返回null。否则返回用于缓存的Texture对象实例。
         */
        public createTextureForCache():Texture{
            var canvas = document.createElement("canvas");
            if(!this.testCanvasValid(canvas)){
                return null;
            }
            var texture = new Texture();
            canvas.width = 1920;
            canvas.height = 900;
            texture.$setBitmapData(canvas);
            return texture;
        }

        /**
         * 检测创建的canvas是否有效，QQ浏览器对内存小等于1G的手机，限制Canvas创建的数量为19个。
         */
        private testCanvasValid(canvas:HTMLCanvasElement):boolean{
            canvas.height = 1;
            canvas.width = 1;
            var data = canvas.toDataURL("image/png");
            if (data == 'data:,')
                return false;
            return true;
        }
        /**
         * 将显示对象或另一个Texture的图像数据绘制到自身。
         * @param texture 要绘制到的 Texture 对象。
         * @param source 要绘制到 Texture 对象的显示对象或 Texture 对象。
         * @param matrix 一个 Matrix 对象，用于缩放、旋转位图或转换位图的坐标。如果不想将矩阵转换应用于图像，
         * 请将此参数设置为恒等矩阵（使用默认 new Matrix() 构造函数创建），或传递 null 值。
         * @param alpha 要叠加的透明度值。如果没有提供任何值，则不会转换位图图像的透明度。如果必须传递此参数但又不想转换图像，请传递值 1。
         * @param clipRect 一个 Rectangle 对象，定义要绘制的源对象的区域。 如果不提供此值，则不会进行剪裁，并且将绘制整个源对象。
         * @param forCache 是否为cacheAsBitmap绘制。
         */
        public drawDisplayObject(texture:Texture,source:DisplayObject,matrix?:Matrix,alpha?:number,clipRect?:Rectangle):void{
            var canvas:HTMLCanvasElement = texture.$bitmapData
            if(!(canvas instanceof HTMLCanvasElement)){
                canvas = document.createElement("canvas");
            }
            var bounds = source.$getOriginalBounds();
            var m = matrix;
            if(m){
                bounds = TEMP_RECTANGLE.copyFrom(bounds);
                m.$transformBounds(bounds);
            }
            canvas.width = bounds.x+bounds.width;
            canvas.height = bounds.y+bounds.height;
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.reset();//清理父类缓存的属性值，防止新的canvas属性无法设置。
            if(m){
                this.context.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
            }
            m = source.$getInvertedConcatenatedMatrix();
            this.context.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
            var invertAlpha = alpha===undefined?1:+alpha;
            this.invertAlpha = invertAlpha/source.$getConcatenatedAlpha();
            this.visitDisplayList(source);
            texture.$setBitmapData(canvas);
            this.canvas = this.context = null;
        }

        private visitDisplayList(displayObject:DisplayObject):void {
            var node = displayObject.$renderNode;
            if (node) {
                if(displayObject.$hasFlags(DisplayObjectFlags.DirtyChildren)){
                    node.update();
                }
                node.render(this);
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (!(child.$displayObjectFlags & DisplayObjectFlags.Visible)) {
                        continue;
                    }
                    this.visitDisplayList(child);
                }
            }
        }

        /**
         * 绘制图片到一个区域上
         */
        public drawImage(texture:Texture, matrix:Matrix, globalAlpha:number):void {
            super.drawImage(texture,matrix,globalAlpha);
            this.context.restore();
        }

        /**
         * 绘制文本到一个区域上
         */
        public drawText(text: string, font: string, color: string, x: number, y: number, width: number, matrix: Matrix, globalAlpha: number): void {
            super.drawText(text,font,color,x,y,width,matrix,globalAlpha);
            this.context.restore();
        }

        /**
         * 需要叠加的透明度
         */
        private invertAlpha:number = 1;
        /**
         * 设置并缓存globalAlpha属性，所有修改必须统一调用此方法。
         */
        protected setGlobalAlpha(value:number):void{
            value *= this.invertAlpha;
            super.setGlobalAlpha(value);
        }

        /**
         * 设置并缓存矩阵变换参数，所有修改必须统一调用此方法。子类有可能会覆盖此方法改为叠加transform方式。
         */
        protected setTransform(a:number,b:number,c:number,d:number,tx:number,ty:number):void{
            var context = this.context;
            context.save();
            context.transform(a,b,c,d,tx,ty);
        }
    }
}