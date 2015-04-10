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

module lark.player {

    export var $ScreenRenderer:any;

    var cacheNodeList:CacheNode[] = [];

    export class CacheNode extends BitmapNode {

        static $release(node:CacheNode):void{
            node.target = null;
            node.matrix = null;
            node.bounds = null;
            node.needRedraw = true;
            node.isDirty = true;
            node.moved = true;
            cacheNodeList.push(node);
        }

        static $create(target:DisplayObject):CacheNode{
            var node = cacheNodeList.pop();
            if(!node){
                var texture = $textureDrawer.createTextureForCache();
                if(texture){
                    node = new CacheNode(target);
                    node.texture = texture;
                    node.renderer = new $ScreenRenderer(texture.$bitmapData);
                }
            }
            return node;
        }

        /**
         * 显示对象的渲染节点发生改变时，把自身的RenderNode对象注册到此列表上。
         */
        public dirtyNodes:any = {};

        public markDirty(node:RenderNode):void{
            this.dirtyNodes[node.$hashCode] = node;
            if(!this.needRedraw){
                this.needRedraw = true;
                var parentCache = this.target.$parentCacheNode;
                if(parentCache){
                    parentCache.markDirty(this);
                }
            }
        }

        public update():void{
            var target = this.target;
            target.$removeFlagsUp(DisplayObjectFlags.Dirty);
            this.matrix = target.$getConcatenatedMatrix();
            this.alpha = target.$getConcatenatedAlpha();
            this.bounds = target.$getOriginalBounds();
            this.updateBounds();
        }

        public needRedraw:boolean = false;

        public renderer:IScreenRenderer;

        public redraw():void{
            this.renderer.drawDisplayList(this.target);
            this.needRedraw = false;
        }
    }
}