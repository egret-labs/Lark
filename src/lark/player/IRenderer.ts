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

    /**
     * IPlayerContext接口定义Lark播放器与平台相关的操作，包括绘制，网络，交互操作等。
     */
    export interface IRenderer extends IHashObject {

        /**
         * 清除整个屏幕
         */
        clearScreen():void;

        /**
         * 清除屏幕的部分渲染区域
         */
        clearRect(x:number, y:number, width:number, height:number):void;

        /**
         * 绘制图片到一个区域上
         */
        drawImage(texture:Texture, matrix:Matrix, globalAlpha:number): void;

        /**
         * 绘制文本到一个区域上
         */
        drawText(text:string, font:string, color:string, x:number, y:number, width:number, matrix:Matrix, globalAlpha:number): void;

        /**
         * 重置所有属性
         */
        reset():void;

        beginDrawDirtyRect():void;

        drawDirtyRect(x:number, y:number, width:number, height:number):void;

        endDrawDirtyRect():void;

        endDrawScreen():void;
    }
}