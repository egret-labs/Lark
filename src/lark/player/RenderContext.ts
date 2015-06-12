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

module lark.sys {

    /**
     * @private
     * 绘图上下文
     */
    export interface RenderContext {
        /**
         * @private
         */
        surface:Surface;
        /**
         * @private
         */
        globalCompositeOperation: string;
        /**
         * @private
         */
        globalAlpha: number;
        /**
         * @private
         */
        miterLimit: number;
        /**
         * @private
         */
        lineCap: string;
        /**
         * @private
         */
        lineJoin: string;
        /**
         * @private
         */
        lineWidth: number;
        /**
         * @private
         */
        strokeStyle: any;
        /**
         * @private
         */
        fillStyle: any;
        /**
         * @private
         */
        imageSmoothingEnabled: boolean;
        /**
         * @private
         */
        textAlign: string;
        /**
         * @private
         */
        textBaseline: string;
        /**
         * @private
         */
        font: string;

        /**
         * @private
         */
        arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?:boolean): void;
        /**
         * @private
         */
        quadraticCurveTo(cpx:number, cpy:number, x:number, y:number): void;
        /**
         * @private
         */
        lineTo(x:number, y:number): void;
        /**
         * @private
         */
        fill(fillRule?:string): void;
        /**
         * @private
         */
        closePath(): void;
        /**
         * @private
         */
        rect(x:number, y:number, w:number, h:number): void;
        /**
         * @private
         */
        moveTo(x:number, y:number): void;
        /**
         * @private
         */
        fillRect(x:number, y:number, w:number, h:number): void;
        /**
         * @private
         */
        bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number): void;
        /**
         * @private
         * 
         * @returns 
         */
        stroke(): void;
        /**
         * @private
         */
        strokeRect(x:number, y:number, w:number, h:number): void;
        /**
         * @private
         */
        beginPath(): void;
        /**
         * @private
         * @returns
         */
        arcTo(x1:number, y1:number, x2:number, y2:number, radius:number): void;

        /**
         * @private
         */
        transform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number): void;
        /**
         * @private
         */
        translate(x:number, y:number): void;
        /**
         * @private
         */
        scale(x:number, y:number): void;
        /**
         * @private
         */
        rotate(angle:number): void;

        /**
         * @private
         */
        restore(): void;
        /**
         * @private
         */
        save(): void;
        /**
         * @private
         */
        clip(fillRule?:string): void;
        /**
         * @private
         */
        clearRect(x:number, y:number, w:number, h:number): void;
        /**
         * @private
         */
        setTransform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number): void;
        /**
         * @private
         */
        createLinearGradient(x0:number, y0:number, x1:number, y1:number): GraphicsGradient;
        /**
         * @private
         */
        createRadialGradient(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number): GraphicsGradient;

        /**
         * @private
         */
        fillText(text:string, x:number, y:number, maxWidth?:number): void;
        /**
         * @private
         */
        measureText(text:string): TextMetrics;
        /**
         * @private
         * 注意：如果要对绘制的图片进行缩放，出于性能优化考虑，系统不会主动去每次重置imageSmoothingEnabled属性，因此您在调用drawImage()方法前请务必
         * 确保 imageSmoothingEnabled 已被重置为正常的值，否则有可能沿用上个显示对象绘制过程留下的值。
         */
        drawImage(image:BitmapData, offsetX:number, offsetY:number, width?:number, height?:number,
                  surfaceOffsetX?:number, surfaceOffsetY?:number, surfaceImageWidth?:number, surfaceImageHeight?:number):void;
        /**
         * @private
         */
        createPattern(image:BitmapData, repetition:string): GraphicsPattern;
        /**
         * @private
         */
        getImageData(sx:number, sy:number, sw:number, sh:number): ImageData;
    }

    /**
     * @private
     */
    export interface TextMetrics {
        /**
         * @private
         */
        width: number;
    }

    /**
     * @private
     */
    export interface ImageData {
        /**
         * @private
         */
        width: number;
        /**
         * @private
         */
        data: Uint8Array;
        /**
         * @private
         */
        height: number;
    }
}