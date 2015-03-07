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
     * 显示对象基类
     */
    export class DisplayObject extends HashObject {
        /**
         * 创建一个显示对象
         */
        public constructor() {
            super();
        }

        /**
         * 表示 DisplayObject 的实例名称。
         * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
         */
        public name:string;

        private _parent:DisplayObjectContainer;
        /**
         * 表示包含此显示对象的 DisplayObjectContainer 对象。
         * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
         */
        public get parent():DisplayObjectContainer {
            return this._parent;
        }

        public _setParent(parent:DisplayObjectContainer):void {
            this._parent = parent;
        }

        private _matrix:Matrix = new Matrix();
        /**
         * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。
         */
        public get matrix():Matrix {
            return this._matrix;
        }

        public set matrix(value:Matrix) {
            if (value) {
                this._matrix.copyFrom(value);
            }
        }

        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        public get x():number {
            return this._matrix.tx;
        }

        public set x(value:number) {
            if (value === this._matrix.tx) {
                return;
            }
            this._matrix.tx = value;
        }

        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        public get y():number {
            return this._matrix.ty;
        }

        public set y(value:number) {
            if (value === this._matrix.ty) {
                return;
            }
            this._matrix.ty = value;
        }


        private _scaleX:number = 1;
        /**
         * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        public get scaleX():number {
            return this._scaleX;
        }

        public set scaleX(value:number) {
            this._scaleX = value;
        }

        private _scaleY:number = 1;
        /**
         * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        public get scaleY():number {
            return this._scaleY;
        }

        public set scaleY(value:number) {
            this._scaleY = value;
        }

        private _rotation:number = 0;
        /**
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
         * 减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
         * @default 0 默认值为 0 不旋转。
         */
        public get rotation():number {
            return this._rotation;
        }

        public set rotation(value:number) {
            this._rotation = value;
        }

        private _width:number = 0;
        /**
         * 表示显示对象的宽度，以像素为单位。
         * 宽度是根据显示对象内容的范围来计算的。优先顺序为 显式设置宽度 > 测量宽度。
         */
        public get width():number {
            return this._width;
        }

        public set width(value:number) {
            this._width = value;
        }

        private _height:number = 0;
        /**
         * 表示显示对象的高度，以像素为单位。
         * 高度是根据显示对象内容的范围来计算的。优先顺序为 显式设置高度 > 测量高度。
         */
        public get height():number {
            return this._height;
        }

        public set height(value:number) {
            this._height = value;
        }

        private _visible:boolean = true;
        /**
         * 显示对象是否可见。
         * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
         * 默认值为 true 可见
         */
        public get visible():boolean {
            return this._visible;
        }

        public set visible(value:boolean) {
            this._visible = value;
        }

        private _alpha:number = 1;
        /**
         * 表示指定对象的 Alpha 透明度值。
         * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
         *  @default 1 默认值为 1。
         */
        public get alpha():number {
            return this._alpha;
        }

        public set alpha(value:number) {
            this._alpha = value;
        }

        private _touchEnabled:boolean = true;
        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @default true 默认为 true 即可以接收。
         */
        public get touchEnabled():boolean {
            return this._touchEnabled;
        }

        public set touchEnabled(value:boolean) {
            this._touchEnabled = value;
        }


        private _scrollRect:Rectangle = null;
        /**
         * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
         */
        public get scrollRect():Rectangle {
            return this._scrollRect;
        }

        public set scrollRect(value:Rectangle) {
            this._scrollRect = value;
        }

        private _blendMode:string = null;
        /**
         * BlendMode 类中的一个值，用于指定要使用的混合模式。
         * 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。
         * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
         */
        public get blendMode():string {
            return this._blendMode;
        }

        public set blendMode(value:string) {
            this._blendMode = value;
        }

        private _mask:DisplayObject;
        /**
         * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
         * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
         * Sprite 对象，它必须在显示列表中。当将 cacheAsBitmap 属性设置为 true，将 cacheAsBitmapMatrix 属性设置为 Matrix
         * 对象来缓存显示对象时，遮罩对象和被遮罩的显示对象必须是同一缓存位图的一部分。因此，如果缓存显示对象，则遮罩必须是显示
         * 对象的子级。如果缓存显示列表上的显示对象的祖代，则遮罩必须是该祖代的子级或其后代之一。如果缓存遮罩对象的多个祖代，
         * 则遮罩必须是显示列表中离遮罩对象最近的缓存容器的后代。
         * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
         * 该对象的 mask 属性将变为 null。
         */
        public get mask():DisplayObject {
            return this._mask;
        }

        public set mask(value:DisplayObject) {
            this._mask = value;
        }
    }

}