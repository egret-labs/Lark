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

    var cacheNodeList:lark.player.CacheNode[] = [];

    export class CacheNodePool implements lark.player.ICacheNodePool{

        /**
         * 释放一个CacheNode实例到对象池
         */
        public release(node:lark.player.CacheNode):void{
            node.target = null;
            node.matrix = null;
            node.bounds = null;
            node.needRedraw = false;
            node.isDirty = false;
            node.moved = false;
            cacheNodeList.push(node);
        }

        /**
         * 从对象池中取出或创建一个新的CacheNode对象。
         */
        public create(target:DisplayObject):lark.player.CacheNode{
            var node = cacheNodeList.pop();
            if(!node){
                var texture = this.createTextureForCache(target);
                if(texture){
                    node = new lark.player.CacheNode(target);
                    node.texture = texture;
                    node.renderer = new CacheRenderer(texture.$bitmapData);
                }
            }
            return node;
        }

        /**
         * 检测是否允许显示对象启用cacheAsBitmap功能，若超过系统内存上限或触发其他限制，将返回null。否则返回用于缓存的Texture对象实例。
         */
        private createTextureForCache(target:DisplayObject):Texture{
            var canvas = document.createElement("canvas");
            if(!this.testCanvasValid(canvas)){
                return null;
            }
            var texture = new Texture();
            texture.$bitmapData = canvas;
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
    }
}