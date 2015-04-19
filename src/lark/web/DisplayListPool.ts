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

    var pool:lark.player.DisplayList[] = [];

    export class DisplayListPool implements lark.player.IDisplayListPool{

        /**
         * 释放一个DisplayList实例到对象池
         */
        public release(node:lark.player.DisplayList):void{
            node.root = null;
            node.$stageMatrix = null;
            node.bounds = null;
            node.needRedraw = false;
            node.$isDirty = false;
            pool.push(node);
        }

        /**
         * 从对象池中取出或创建一个新的DisplayList对象。
         */
        public create(target:DisplayObject):lark.player.DisplayList{
            var node = pool.pop();
            if(!node){
                var canvas:HTMLCanvasElement = document.createElement("canvas");
                if(this.testCanvasValid(canvas)){
                    node = new lark.player.DisplayList(target);
                    node.bitmapData = canvas;
                    var context = canvas.getContext("2d");
                    node.renderContext = createRenderContext(context);
                }
            }
            return node;
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
         * 即将开始重绘显示列表
         */
        public prepare(displayList:player.DisplayList):void{
            var root = displayList.root;
            var bounds = root.$getOriginalBounds();
            var oldSurface = displayList.renderContext.surface;
            var oldOffsetX = displayList.offsetX;
            var oldOffsetY = displayList.offsetY;
            if(!displayList.$drawed){
                displayList.$drawed = true;
                this.changeCacheSize(displayList,bounds);
            }
            else if(bounds.width!==oldSurface.width||bounds.height!==oldSurface.height){
                var oldContext = displayList.renderContext;
                var newContext = player.sharedRenderContext;
                displayList.renderContext = newContext; 
                var newSurface = newContext.surface;
                player.sharedRenderContext = oldContext;
                displayList.bitmapData = newSurface;
                this.changeCacheSize(displayList,bounds);
                if(oldSurface.width!==0&&oldSurface.height!==0){
                    newContext.setTransform(1,0,0,1,0,0);
                    newContext.drawImage(oldSurface,oldOffsetX,oldOffsetY);
                }
                oldSurface.height = 1;
                oldSurface.width = 1;
            }
            var m = root.$getInvertedConcatenatedMatrix().$data;
            displayList.renderContext.setTransform(m[0], m[1], m[2], m[3], m[4]-displayList.offsetX, m[5]-displayList.offsetY);
        }

        private changeCacheSize(displayList:player.DisplayList,bounds:Rectangle):void{
            var surface = displayList.bitmapData;
            surface.width = bounds.width;
            surface.height = bounds.height;
            displayList.offsetX = bounds.x;
            displayList.offsetY = bounds.y;
        }
    }
}