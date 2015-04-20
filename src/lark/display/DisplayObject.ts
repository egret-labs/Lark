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
     * 格式化旋转角度的值
     */
    function clampRotation(value):number {
        value %= 360;
        if (value > 180) {
            value -= 360;
        } else if (value < -180) {
            value += 360;
        }
        return value;
    }

    const enum Values {
        scaleX, scaleY, skewX, skewY, rotation,alpha
    }

    /**
     * 显示对象基类
     */
    export class DisplayObject extends EventEmitter implements player.Renderable{
        /**
         * 创建一个显示对象
         */
        public constructor() {
            super();
            this.$displayObjectFlags = player.DisplayObjectFlags.InitFlags;
            this.$values = new Float64Array([1,1,0,0,0,1]);
        }

        $values:Float64Array;

        $displayObjectFlags:number = 0;

        $setFlags(flags:player.DisplayObjectFlags):void {
            this.$displayObjectFlags |= flags;
        }

        $toggleFlags(flags:player.DisplayObjectFlags, on:boolean):void {
            if (on) {
                this.$displayObjectFlags |= flags;
            } else {
                this.$displayObjectFlags &= ~flags;
            }
        }

        $removeFlags(flags:player.DisplayObjectFlags):void {
            this.$displayObjectFlags &= ~flags;
        }

        /**
         * 沿着显示列表向上移除标志量，如果标志量没被设置过就停止移除。
         */
        $removeFlagsUp(flags:player.DisplayObjectFlags):void {
            if (!this.$hasAnyFlags(flags)) {
                return;
            }
            this.$removeFlags(flags)
            var parent = this.$parent;
            if (parent) {
                parent.$removeFlagsUp(flags);
            }
        }

        $hasFlags(flags:player.DisplayObjectFlags):boolean {
            return (this.$displayObjectFlags & flags) === flags;
        }

        /**
         * 沿着显示列表向上传递标志量，如果标志量已经被设置过就停止传递。
         */
        $propagateFlagsUp(flags:player.DisplayObjectFlags):void {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$propagateFlagsUp(flags);
            }
        }

        /**
         * 沿着显示列表向下传递标志量，非容器直接设置自身的flag，此方法会在DisplayObjectContainer中被覆盖。
         */
        $propagateFlagsDown(flags:player.DisplayObjectFlags):void {
            this.$setFlags(flags);
        }

        $hasAnyFlags(flags:player.DisplayObjectFlags):boolean {
            return !!(this.$displayObjectFlags & flags);
        }

        private invalidateMatrix():void {
            this.$setFlags(player.DisplayObjectFlags.InvalidMatrix);
            this.invalidatePosition();
        }

        /**
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        private invalidatePosition():void {
            this.$invalidateChildren();
            this.$propagateFlagsDown(player.DisplayObjectFlags.InvalidConcatenatedMatrix |
            player.DisplayObjectFlags.InvalidInvertedConcatenatedMatrix);
            if (this.$parent) {
                this.$parent.$propagateFlagsUp(player.DisplayObjectFlags.InvalidBounds);
            }
        }

        /**
         * 能够含有子项的类将子项列表存储在这个属性里。
         */
        $children:DisplayObject[] = null;

        /**
         * 表示 DisplayObject 的实例名称。
         * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
         */
        public name:string;

        $parent:DisplayObjectContainer = null;

        /**
         * 表示包含此显示对象的 DisplayObjectContainer 对象。
         * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
         */
        public get parent():DisplayObjectContainer {
            return this.$parent;
        }

        $setParent(parent:DisplayObjectContainer):void {
            this.$parent = parent;
        }

        $onAddToStage(stage:Stage):void {
            this.$stage = stage;
            DisplayObjectContainer.$EVENT_ADD_TO_STAGE_LIST.push(this);
        }

        $onRemoveFromStage():void {
            DisplayObjectContainer.$EVENT_REMOVE_FROM_STAGE_LIST.push(this);
        }

        $stage:Stage = null;

        /**
         * 显示对象的舞台。
         * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。
         * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
         */
        public get stage():Stage {
            return this.$stage;
        }

        private _matrix:Matrix = new Matrix();
        /**
         * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。
         */
        public get matrix():Matrix {
            return this.$getMatrix();
        }

        $getMatrix():Matrix {
            if (this.$hasFlags(player.DisplayObjectFlags.InvalidMatrix)) {
                var values = this.$values;
                this._matrix.$updateScaleAndRotation(values[Values.scaleX],values[Values.scaleY],values[Values.skewX],values[Values.skewY]);
                this.$removeFlags(player.DisplayObjectFlags.InvalidMatrix);
            }
            return this._matrix;
        }

        public set matrix(value:Matrix) {
            this.$setMatrix(value);
            if (value) {
                this._matrix.copyFrom(value);
            }
        }

        $setMatrix(matrix:Matrix):void {
            if (this._matrix.equals(matrix)) {
                return;
            }
            var m = this._matrix;
            m.copyFrom(matrix);
            var values = this.$values;
            values[Values.scaleX] = m.$getScaleX();
            values[Values.scaleY] = m.$getScaleY();
            values[Values.skewX] = matrix.$getSkewX();
            values[Values.skewY] = matrix.$getSkewY();
            values[Values.rotation] = clampRotation(values[Values.skewY] * 180 / Math.PI);
            this.$removeFlags(player.DisplayObjectFlags.InvalidMatrix);
            this.invalidatePosition();
        }


        /**
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        $getConcatenatedMatrix():Matrix {
            if (this.$hasFlags(player.DisplayObjectFlags.InvalidConcatenatedMatrix)) {
                if (this.$parent) {
                    this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(),
                        this.$renderMatrix);
                } else {
                    this.$renderMatrix.copyFrom(this.$getMatrix());
                }
                if(this.$displayList){
                    this.$displayList.$renderRegion.moved = true;
                }
                if(this.$renderRegion){
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(player.DisplayObjectFlags.InvalidConcatenatedMatrix);
            }
            return this.$renderMatrix;
        }

        private _invertedConcatenatedMatrix:Matrix = new Matrix();

        $getInvertedConcatenatedMatrix():Matrix {
            if (this.$hasFlags(player.DisplayObjectFlags.InvalidInvertedConcatenatedMatrix)) {
                this.$getConcatenatedMatrix().$invertInto(this._invertedConcatenatedMatrix);
                this.$removeFlags(player.DisplayObjectFlags.InvalidInvertedConcatenatedMatrix);
            }
            return this._invertedConcatenatedMatrix;
        }

        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        public get x():number {
            return this._matrix.$data[4];
        }

        public set x(value:number) {
            value = +value || 0;
            if (value === this._matrix.$data[4]) {
                return;
            }
            this._matrix.$data[4] = value;
            this.invalidatePosition();
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
            value = +value || 0;
            if (value === this._matrix.ty) {
                return;
            }
            this._matrix.ty = value;
            this.invalidatePosition();
        }


        /**
         * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        public get scaleX():number {
            return this.$values[Values.scaleX];
        }

        public set scaleX(value:number) {
            value = +value || 0;
            var values = this.$values;
            if (value === values[Values.scaleX]) {
                return;
            }
            values[Values.scaleX] = value;
            this.invalidateMatrix();
        }

        /**
         * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        public get scaleY():number {
            return this.$values[Values.scaleY];
        }

        public set scaleY(value:number) {
            value = +value || 0;
            if (value === this.$values[Values.scaleY]) {
                return;
            }
            this.$values[Values.scaleY] = value;
            this.invalidateMatrix();
        }

        /**
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
         * 减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
         * @default 0 默认值为 0 不旋转。
         */
        public get rotation():number {
            return this.$values[Values.rotation];
        }

        public set rotation(value:number) {
            value = +value || 0;
            value = clampRotation(value);
            var values = this.$values;
            if (value === values[Values.rotation]) {
                return;
            }
            var delta = value - values[Values.rotation];
            var angle = delta / 180 * Math.PI;
            values[Values.skewX] += angle;
            values[Values.skewY] += angle;
            values[Values.rotation] = value;
            this.invalidateMatrix();
        }

        /**
         * 表示显示对象的宽度，以像素为单位。
         * 宽度是根据显示对象内容的范围来计算的。优先顺序为 显式设置宽度 > 测量宽度。
         */
        public get width():number {
            return this.$getWidth();
        }

        $getWidth():number {
            return this.$getTransformedBounds(this.$parent, Rectangle.TEMP).width;
        }

        public set width(value:number) {
            this.$setWidth(value);
        }

        $setWidth(value:number) {
            value = +value || 0;
            if (value < 0) {
                return;
            }
            var values = this.$values;
            var originalBounds = this.$getOriginalBounds();
            var bounds = this.$getTransformedBounds(this.$parent, Rectangle.TEMP);
            var angle = values[Values.rotation] / 180 * Math.PI;
            var baseWidth = originalBounds.$getBaseWidth(angle);
            if (!baseWidth) {
                return;
            }
            var baseHeight = originalBounds.$getBaseHeight(angle);
            values[Values.scaleY] = bounds.height / baseHeight;
            values[Values.scaleX] = value / baseWidth;
            this.invalidateMatrix();
        }

        /**
         * 表示显示对象的高度，以像素为单位。
         * 高度是根据显示对象内容的范围来计算的。优先顺序为 显式设置高度 > 测量高度。
         */
        public get height():number {
            return this.$getHeight();
        }

        $getHeight():number {
            return this.$getTransformedBounds(this.$parent, Rectangle.TEMP).height;
        }

        public set height(value:number) {
            this.$setHeight(value);
        }

        $setHeight(value:number) {
            value = +value || 0;
            if (value < 0) {
                return;
            }
            var values = this.$values;
            var originalBounds = this.$getOriginalBounds();
            var bounds = this.$getTransformedBounds(this.$parent, Rectangle.TEMP);
            var angle = values[Values.rotation] / 180 * Math.PI;
            var baseHeight = originalBounds.$getBaseHeight(angle);
            if (!baseHeight) {
                return;
            }
            var baseWidth = originalBounds.$getBaseWidth(angle);
            values[Values.scaleY] = value / baseHeight;
            values[Values.scaleX] = bounds.width / baseWidth;
            this.invalidateMatrix();
        }

        /**
         * 显示对象是否可见。
         * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
         * 默认值为 true 可见
         */
        public get visible():boolean {
            return this.$hasFlags(player.DisplayObjectFlags.Visible);
        }

        public set visible(value:boolean) {
            value = !!value;
            if (value === this.$hasFlags(player.DisplayObjectFlags.Visible)) {
                return;
            }
            this.$toggleFlags(player.DisplayObjectFlags.Visible, value);
            this.$invalidateChildren();
        }

        /**
         * cacheAsBitmap创建的缓存位图节点。
         */
        $displayList:lark.player.DisplayList = null;

        /**
         * 如果设置为 true，则 Lark 播放器将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
         * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
         * 具体取决于显示对象内容的复杂性。在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
         * 最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放和旋转的显示对象一起使用。
         */
        public get cacheAsBitmap():boolean {
            return this.$hasFlags(player.DisplayObjectFlags.CacheAsBitmap);
        }

        public set cacheAsBitmap(value:boolean) {
            value = !!value;
            this.$toggleFlags(player.DisplayObjectFlags.CacheAsBitmap, value);
            var hasDisplayList = !!this.$displayList;
            if (hasDisplayList === value) {
                return;
            }
            if (value) {
                var displayList = lark.player.$displayListPool.create(this);
                if (displayList) {
                    this.$displayList = displayList;
                    if (this.$parentDisplayList) {
                        this.$parentDisplayList.markDirty(displayList);
                    }
                    this.$cacheAsBitmapChanged();
                }
            }
            else {
                lark.player.$displayListPool.release(this.$displayList);
                this.$displayList = null;
                this.$cacheAsBitmapChanged();
            }
        }

        /**
         * cacheAsBitmap属性改变
         */
        $cacheAsBitmapChanged():void {
            var parentCache = this.$displayList || this.$parentDisplayList;
            if(this.$renderRegion){
                parentCache.markDirty(this);
            }
        }

        /**
         * 表示指定对象的 Alpha 透明度值。
         * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
         *  @default 1 默认值为 1。
         */
        public get alpha():number {
            return this.$values[Values.alpha];
        }

        public set alpha(value:number) {
            value = +value || 0;
            var values = this.$values;
            if (value === values[Values.alpha]) {
                return;
            }
            values[Values.alpha] = value;
            this.$propagateFlagsDown(player.DisplayObjectFlags.InvalidConcatenatedAlpha);
            this.$invalidate(true);
        }

        /**
         * 获取这个显示对象跟它所有父级透明度的乘积
         */
        $getConcatenatedAlpha():number {
            if (this.$hasFlags(player.DisplayObjectFlags.InvalidConcatenatedAlpha)) {
                if (this.$parent) {
                    var parentAlpha = this.$parent.$getConcatenatedAlpha();
                    this.$renderAlpha = parentAlpha * this.$values[Values.alpha];
                }
                else {
                    this.$renderAlpha = this.$values[Values.alpha];
                }
                this.$removeFlags(player.DisplayObjectFlags.InvalidConcatenatedAlpha);
            }
            return this.$renderAlpha;
        }

        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @default true 默认为 true 即可以接收。
         */
        public get touchEnabled():boolean {
            return this.$hasFlags(player.DisplayObjectFlags.TouchEnabled);
        }

        public set touchEnabled(value:boolean) {
            this.$toggleFlags(player.DisplayObjectFlags.TouchEnabled, !!value);
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

        private _mask:DisplayObject = null;
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

        /**
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 引擎建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Rectangle对象来存储结果，
         * 若不传入将创建一个新的Rectangle对象返回。
         * @returns 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
         */
        public getBounds(targetCoordinateSpace:DisplayObject, resultRect?:Rectangle):Rectangle {
            targetCoordinateSpace = targetCoordinateSpace || this;
            return this.$getTransformedBounds(targetCoordinateSpace, resultRect);
        }

        $getTransformedBounds(targetCoordinateSpace:DisplayObject, resultRect?:Rectangle):Rectangle {
            var bounds = this.$getOriginalBounds();
            if (!resultRect) {
                resultRect = new Rectangle();
            }
            resultRect.copyFrom(bounds);
            if (targetCoordinateSpace === this || resultRect.isEmpty()) {
                return resultRect;
            }
            var m:Matrix;
            if (targetCoordinateSpace) {
                m = Matrix.TEMP;
                var invertedTargetMatrix = targetCoordinateSpace.$getInvertedConcatenatedMatrix();
                invertedTargetMatrix.$preMultiplyInto(this.$getConcatenatedMatrix(), m);
            } else {
                m = this.$getConcatenatedMatrix();
            }
            m.$transformBounds(resultRect);
            return resultRect;
        }

        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param stageX 舞台坐标x
         * @param stageY 舞台坐标y
         * @param resultPoint 引擎建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
         * 若不传入将创建一个新的Point对象返回。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         */
        public globalToLocal(stageX:number, stageY:number, resultPoint?:Point):Point {
            var m = this.$getInvertedConcatenatedMatrix();
            return m.transformPoint(stageX, stageY, resultPoint);
        }

        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param localX 舞台坐标x
         * @param localY 舞台坐标y
         * @param resultPoint 引擎建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
         * 若不传入将创建一个新的Point对象返回。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         */
        public localToGlobal(localX:number, localY:number, resultPoint?:Point):Point {
            var m = this.$getConcatenatedMatrix();
            return m.transformPoint(localX, localY, resultPoint);
        }

        /**
         * 标记自身的测量尺寸失效
         */
        $invalidateContentBounds():void {
            this.$invalidate();
            this.$setFlags(player.DisplayObjectFlags.InvalidContentBounds);
            this.$propagateFlagsUp(player.DisplayObjectFlags.InvalidBounds);
        }

        private _bounds:Rectangle = new Rectangle();

        /**
         * 获取显示对象占用的矩形区域集合，通常包括自身绘制的测量区域，如果是容器，还包括所有子项占据的区域。
         */
        $getOriginalBounds():Rectangle {
            var bounds = this._bounds;
            if (this.$hasFlags(player.DisplayObjectFlags.InvalidBounds)) {
                bounds.copyFrom(this.$getContentBounds());
                this.$measureChildBounds(bounds);
                this.$removeFlags(player.DisplayObjectFlags.InvalidBounds);
                if(this.$displayList){
                    this.$displayList.$renderRegion.moved = true;
                }
            }
            return bounds;
        }

        /**
         * 测量子项占用的矩形区域
         * @param bounds 测量结果存储在这个矩形对象内
         */
        $measureChildBounds(bounds:Rectangle):void {

        }

        private _contentBounds:Rectangle = new Rectangle();

        $getContentBounds():Rectangle {
            var bounds = this._contentBounds;
            if (this.$hasFlags(player.DisplayObjectFlags.InvalidContentBounds)) {
                this.$measureContentBounds(bounds);
                if(this.$renderRegion){
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(player.DisplayObjectFlags.InvalidContentBounds);
            }
            return bounds;
        }

        /**
         * 测量自身占用的矩形区域，注意：此测量结果并不包括子项占据的区域。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        $measureContentBounds(bounds:Rectangle):void {

        }

        $parentDisplayList:lark.player.DisplayList = null;

        /**
         * 标记此显示对象需要重绘。
         * @param notiryChildren 是否标记子项也需要重绘。传入false会不传入，将只标记自身的RenderNode需要重绘。
         */
        $invalidate(notifyChildren?:boolean):void {
            if (!this.$renderRegion || this.$hasFlags(player.DisplayObjectFlags.DirtyRender)) {
                return;
            }
            this.$setFlags(player.DisplayObjectFlags.DirtyRender);
            var displayList = this.$displayList ? this.$displayList : this.$parentDisplayList;
            if (displayList) {
                displayList.markDirty(this);
            }
        }

        /**
         * 标记自身和所有子项都失效。
         */
        $invalidateChildren():void {
            if (this.$hasFlags(player.DisplayObjectFlags.DirtyChildren)) {
                return;
            }
            this.$setFlags(player.DisplayObjectFlags.DirtyChildren);
            var displayList = this.$displayList;
            if ((displayList||this.$renderRegion)&&this.$parentDisplayList) {
                this.$parentDisplayList.markDirty(displayList||this);
            }
        }
        /**
         * 是否需要重绘
         */
        $isDirty:boolean = false;
        /**
         * 这个对象在舞台上的整体透明度
         */
        $renderAlpha:number = 1;
        /**
         * 在舞台上的矩阵对象
         */
        $renderMatrix:Matrix = new Matrix();
        /**
         * 此显示对象自身（不包括子项）在屏幕上的显示尺寸。
         */
        $renderRegion:player.Region = null;
        /**
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         */
        $update():boolean {
            this.$removeFlagsUp(player.DisplayObjectFlags.Dirty);
            this.$getConcatenatedAlpha();
            var matrix = this.$getConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var stage = this.$stage;
            if (!stage) {
                return false;
            }
            return this.$renderRegion.updateRegion(bounds,matrix);
        }

        /**
         * 执行渲染,绘制自身到屏幕
         */
        $render(context:player.RenderContext):void {

        }

        $hitTest(stageX:number, stageY:number):DisplayObject {
            if (!this.$renderRegion||!this.$hasAnyFlags(player.DisplayObjectFlags.TouchEnabled|
                    player.DisplayObjectFlags.Visible)) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix().$data;
            var bounds = this.$getContentBounds();
            var localX = m[0] * stageX + m[2] * stageY + m[4];
            var localY = m[1] * stageX + m[3] * stageY + m[5];
            if (bounds.contains(localX, localY)) {
                return this;
            }
            return null;
        }

        static $enterFrameCallBackList:DisplayObject[] = [];
        static $renderCallBackList:DisplayObject[] = [];

        public $addListener(type:string, listener:(event:Event)=>void, thisObject:any, useCapture?:boolean, priority?:number, emitOnce?:boolean):void {
            super.$addListener(type, listener, thisObject, useCapture, priority, emitOnce);
            var isEnterFrame = (type == Event.ENTER_FRAME);
            if (isEnterFrame || type == Event.RENDER) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                if (list.indexOf(this) == -1) {
                    list.push(this);
                }
            }
        }

        public removeListener(type:string, listener:(event:Event)=>void, thisObject:any, useCapture?:boolean):void {
            super.removeListener(type, listener, thisObject, useCapture);
            var isEnterFrame:boolean = (type == Event.ENTER_FRAME);
            if ((isEnterFrame || type == Event.RENDER) && !this.hasListener(type)) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                var index = list.indexOf(this);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
        }

        public emit(event:Event):boolean {
            if (!event.$bubbles) {
                return super.emit(event);
            }

            var list:Array<DisplayObject> = [];
            var target:DisplayObject = this;
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            event.$target = this;
            this.emitPropagationEvent(event, list);
            return !event.$isDefaultPrevented;
        }

        private emitPropagationEvent(event:Event, list:DisplayObject[]):void {
            var length:number = list.length;
            var eventPhase:number = EventPhase.CAPTURING_PHASE;
            for (var i:number = length - 1; i >= 0; i--) {
                var currentTarget:DisplayObject = list[i];
                event.$currentTarget = currentTarget;
                event.$eventPhase = eventPhase;
                currentTarget.$notifyListener(event);
                if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                    return;
                }
            }

            var eventPhase:number = EventPhase.AT_TARGET;
            var currentTarget:DisplayObject = list[0];
            event.$currentTarget = currentTarget;
            event.$eventPhase = eventPhase;
            currentTarget.$notifyListener(event);
            if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                return;
            }

            var eventPhase:number = EventPhase.BUBBLING_PHASE;
            for (i = 1; i < length; i++) {
                var currentTarget:DisplayObject = list[i];
                event.$currentTarget = currentTarget;
                event.$eventPhase = eventPhase;
                currentTarget.$notifyListener(event);
                if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                    return;
                }
            }
        }

        public willTrigger(type:string):boolean {
            var parent = this;
            while (parent) {
                if (parent.hasListener(type))
                    return true;
                parent = parent.$parent;
            }
            return false;
        }

    }
}