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
     * Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
     */
    export class Graphics extends HashObject{

        /**
         * 创建一个放射状渐变填充
         */
        public static createRadialGradient(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):GraphicsGradient{
            return null;
        }

        /**
         * 创建一个线性填充
         */
        public static createLinearGradient(x0:number, y0:number, x1:number, y1:number):GraphicsGradient{
            return null;
        }

        public constructor(){
            super();
            this.reset();
        }

        private reset():void{
            this._fillStyle = "#000000";
            this._lineCap = "butt";
            this._lineJoin = "miter";
            this._lineWidth = 1;
            this._miterLimit = 10;
            this._shadowBlur = 0;
            this._shadowColor = "rgba(0, 0, 0, 0)";
            this._shadowOffsetX = 0;
            this._shadowOffsetY = 0;
            this._strokeStyle = "#000000";
        }

        private _shadowOffsetY:number;

        public get shadowOffsetY():number {
            return this._shadowOffsetY;
        }

        public set shadowOffsetY(value:number) {
            this._shadowOffsetY = value;
            this.pushCommand(player.GraphicsCommandType.shadowOffsetY,arguments);
        }

        private _fillStyle:any;

        public get fillStyle():any {
            return this._fillStyle;
        }

        public set fillStyle(value:any) {
            this._fillStyle = value;
            this.pushCommand(player.GraphicsCommandType.fillStyle,arguments);
        }

        private _lineWidth:number;

        public get lineWidth():number {
            return this._lineWidth;
        }

        public set lineWidth(value:number) {
            this._lineWidth = value;
            this.pushCommand(player.GraphicsCommandType.lineWidth,arguments);
        }

        private _lineCap:string;

        public get lineCap():string {
            return this._lineCap;
        }

        public set lineCap(value:string) {
            this._lineCap = value;
            this.pushCommand(player.GraphicsCommandType.lineCap,arguments);
        }

        private _strokeStyle:any;

        public get strokeStyle():any {
            return this._strokeStyle;
        }

        public set strokeStyle(value:any) {
            this._strokeStyle = value;
            this.pushCommand(player.GraphicsCommandType.strokeStyle,arguments);
        }

        private _shadowBlur:number;

        public get shadowBlur():number {
            return this._shadowBlur;
        }

        public set shadowBlur(value:number) {
            this._shadowBlur = value;
            this.pushCommand(player.GraphicsCommandType.shadowBlur,arguments);
        }

        private _lineJoin:string;

        public get lineJoin():string {
            return this._lineJoin;
        }

        public set lineJoin(value:string) {
            this._lineJoin = value;
            this.pushCommand(player.GraphicsCommandType.lineJoin,arguments);
        }

        private _shadowColor:string;

        public get shadowColor():string {
            return this._shadowColor;
        }

        public set shadowColor(value:string) {
            this._shadowColor = value;
            this.pushCommand(player.GraphicsCommandType.shadowColor,arguments);
        }

        private _shadowOffsetX:number;

        public get shadowOffsetX():number {
            return this._shadowOffsetX;
        }

        public set shadowOffsetX(value:number) {
            this._shadowOffsetX = value;
            this.pushCommand(player.GraphicsCommandType.shadowOffsetX,arguments);
        }

        private _miterLimit:number;

        public get miterLimit():number {
            return this._miterLimit;
        }

        public set miterLimit(value:number) {
            this._miterLimit = value;
            this.pushCommand(player.GraphicsCommandType.miterLimit,arguments);
        }


        public arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?:boolean):void{
            this.pushCommand(player.GraphicsCommandType.arc,arguments);
        }

        public quadraticCurveTo(cpx:number, cpy:number, x:number, y:number):void{
            this.pushCommand(player.GraphicsCommandType.quadraticCurveTo,arguments);
        }

        public lineTo(x:number, y:number):void{
            this.pushCommand(player.GraphicsCommandType.lineTo,arguments);
        }

        public fill(fillRule?:string):void{
            this.pushCommand(player.GraphicsCommandType.fill,arguments);
        }

        public closePath():void{
            this.pushCommand(player.GraphicsCommandType.closePath,arguments);
        }

        public rect(x:number, y:number, w:number, h:number):void{
            this.pushCommand(player.GraphicsCommandType.rect,arguments);
        }

        public moveTo(x:number, y:number):void{
            this.pushCommand(player.GraphicsCommandType.moveTo,arguments);
        }

        public fillRect(x:number, y:number, w:number, h:number):void{
            this.pushCommand(player.GraphicsCommandType.fillRect,arguments);
        }

        public bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):void{
            this.pushCommand(player.GraphicsCommandType.bezierCurveTo,arguments);
        }

        public stroke():void{
            this.pushCommand(player.GraphicsCommandType.stroke,arguments);
        }

        public strokeRect(x:number, y:number, w:number, h:number):void{
            this.pushCommand(player.GraphicsCommandType.strokeRect,arguments);
        }

        public beginPath():void{
            this.pushCommand(player.GraphicsCommandType.beginPath,arguments);
        }

        public arcTo(x1:number, y1:number, x2:number, y2:number, radius:number):void{
            this.pushCommand(player.GraphicsCommandType.arcTo,arguments);
        }

        /**
         * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
         */
        public clear():void {
            this.reset();
            this.$commands.length = 0;
            this.$targetDisplay.$invalidate();
        }

        /**
         * 目标显示对象
         */
        $targetDisplay:DisplayObject;
        /**
         * 绘图命令列表
         */
        $commands:player.GraphicsCommand[] = [];

        private pushCommand(graphicsType:number, args:any):void {
            this.$commands.push({type:graphicsType,arguments:args});
            this.$targetDisplay.$invalidate();
        }

        private minX:number = 0

        $measureContentBounds(bounds:Rectangle):void {

        }
    }
}