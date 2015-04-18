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
     * 屏幕渲染器
     */
    export interface IScreenRenderer {

        renderContext:ScreenRenderContext;
        /**
         * 重置画布
         */
        reset(root:DisplayObject):void;
    }

    export interface RenderContext {
        miterLimit: number;
        lineCap: string;
        lineJoin: string;
        lineWidth: number;
        strokeStyle: any;
        fillStyle: any;
        imageSmoothingEnabled: boolean;
        textAlign: string;
        textBaseline: string;
        font: string;

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

        fillText(text:string, x:number, y:number, maxWidth?:number): void;
        drawTexture(texture:Texture): void;

        transform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number): void;
        translate(x:number, y:number): void;
        scale(x:number, y:number): void;
        rotate(angle:number): void;
        //createLinearGradient(x0:number, y0:number, x1:number, y1:number): CanvasGradient;
        //createRadialGradient(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number): CanvasGradient;
        //createPattern(texture:Texture, repetition:string): CanvasPattern;
    }

    export interface ScreenRenderContext extends RenderContext{
        surface:Surface;
        globalCompositeOperation: string;
        globalAlpha: number;
        restore(): void;
        save(): void;
        clip(fillRule?:string): void;
        clearRect(x:number, y:number, w:number, h:number): void;
        setTransform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number): void;
    }

    /**
     * 呈现绘图结果的对象
     */
    export interface Surface {
        width:number;
        height:number;
    }
}