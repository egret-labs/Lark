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

    export interface ITextureDrawer extends IRenderer {

        /**
         * 将显示对象或另一个Texture的图像数据绘制到自身。
         * @param texture 要绘制到的 Texture 对象。
         * @param source 要绘制到 Texture 对象的显示对象或 Texture 对象。
         * @param matrix 一个 Matrix 对象，用于缩放、旋转位图或转换位图的坐标。如果不想将矩阵转换应用于图像，
         * 请将此参数设置为恒等矩阵（使用默认 new Matrix() 构造函数创建），或传递 null 值。
         * @param alpha 要叠加的透明度值。如果没有提供任何值，则不会转换位图图像的透明度。如果必须传递此参数但又不想转换图像，请传递值 1。
         * @param clipRect 一个 Rectangle 对象，定义要绘制的源对象的区域。 如果不提供此值，则不会进行剪裁，并且将绘制整个源对象。
         */
        drawDisplayObject(texture:Texture,source:DisplayObject,matrix?:Matrix,alpha?:number,clipRect?:Rectangle):void;
    }
}