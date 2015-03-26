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
    /**
     * Bitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 Bitmap() 构造函数创建的图像。
     * 利用 Bitmap() 构造函数，可以创建包含对 Texture 对象的引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 Texture 引用，与转换属性或旋转属性无关。
     * 由于能够创建引用相同 Texture 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的复杂 Texture 对象，
     * 而不会因为每个显示对象实例使用一个 Texture 对象而产生内存开销。
     */
    export class Bitmap extends DisplayObject {

        /**
         * 创建一个Bitmap对象
         */
        public constructor(texture?:Texture) {
            super();
            this.$renderNode = new lark.player.BitmapNode(this);
            this.texture = texture;
        }

        $texture:Texture = null;

        public get texture():Texture{
            return this.$texture;
        }

        public set texture(value:Texture){
            this.$texture = value;
            this.$invalidateContentBounds();
        }

        $measureContentBounds(bounds:Rectangle):void {
            var texture:Texture = this.$texture;
            if(texture){
                bounds.setTo(0,0,texture.width,texture.height);
            }
            else{
                bounds.setEmpty();
            }
        }

        /**
         * 之前若调用过$markDirty()方法，此方法在绘制阶段会自动被调用，它负责将自身的属性改变同步到RenderNode，并清空相关的Dirty标记。
         * 注意：此方法里禁止添加移除显示子项或执行其他可能产生新的Dirty标记的操作，仅执行同步操作，否则可能导致屏幕绘制错误。
         */
        $updateRenderNode():void{
            super.$updateRenderNode()
            var node = <lark.player.BitmapNode>this.$renderNode;
            node.texture = this.$texture;
        }
    }
}