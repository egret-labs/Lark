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
     * 渲染器
     */
    export interface IRenderer extends IHashObject {

        /**
         * 绘制图片到一个区域上
         */
        drawImage(texture:Texture, matrix:Matrix, globalAlpha:number): void;

        /**
         * 绘制文本到一个区域上
         */
        drawText(text:string, font:string, color:string, x:number, y:number, width:number, matrix:Matrix, globalAlpha:number): void;

        /**
         * 绘制矢量图形
         */
        drawGraphics(commands:Command[], matrix:Matrix, globalAlpha:number):void;

    }

    /**
     * 屏幕渲染器
     */
    export interface IScreenRenderer extends IRenderer {

        /**
         * 重置画布
         */
        reset(root:DisplayObject):void;
        /**
         * 清空屏幕
         */
        clearScreen():void;
        /**
         * 绘制脏矩形列表
         */
        markDirtyRects(regionList:lark.player.Region[]):void;
        /**
         * 移除之前绘制的脏矩形区域
         */
        removeDirtyRects():void;

        /**
         * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
         */
        drawDirtyRect(x:number, y:number, width:number, height:number):void;
    }

    export interface RenderContext {
        miterLimit: number;
        lineCap: string;
        shadowColor: string;
        lineJoin: string;
        shadowOffsetX: number;
        lineWidth: number;
        strokeStyle: any;
        shadowOffsetY: number;
        fillStyle: any;
        shadowBlur: number;
        arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?:boolean): void;
        quadraticCurveTo(cpx:number, cpy:number, x:number, y:number): void;
        lineTo(x:number, y:number): void;
        fill(fillRule?:string): void;
        closePath(): void;
        rect(x:number, y:number, w:number, h:number): void;
        moveTo(x:number, y:number): void;
        fillRect(x:number, y:number, w:number, h:number): void;
        bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number): void;
        stroke(): void;
        strokeRect(x:number, y:number, w:number, h:number): void;
        beginPath(): void;
        arcTo(x1:number, y1:number, x2:number, y2:number, radius:number): void;
    }

    export interface ScreenRenderContext extends RenderContext{
        font: string;
        globalCompositeOperation: string;
        imageSmoothingEnabled: boolean;
        lineDashOffset: number;
        globalAlpha: number;
        textAlign: string;
        textBaseline: string;
        restore(): void;
        save(): void;
        fillText(text:string, x:number, y:number, maxWidth?:number): void;
        measureText(text:string): TextMetrics;
        rotate(angle:number): void;
        setTransform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number): void;
        transform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number): void;
        translate(x:number, y:number): void;
        scale(x:number, y:number): void;
        clip(fillRule?:string): void;
        clearRect(x:number, y:number, w:number, h:number): void;
        drawImage(image:HTMLElement, offsetX:number, offsetY:number, width?:number, height?:number, canvasOffsetX?:number, canvasOffsetY?:number, canvasImageWidth?:number, canvasImageHeight?:number): void;
        createLinearGradient(x0:number, y0:number, x1:number, y1:number): CanvasGradient;
        createRadialGradient(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number): CanvasGradient;
        createPattern(texture:Texture, repetition:string): CanvasPattern;
    }

}