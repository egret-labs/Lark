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
        scaleX,     //1
        scaleY,     //1
        skewX,      //0
        skewY,      //0
        rotation    //0
    }

    /**
     * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
     * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
     * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
     * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
     */
    export class DisplayObject extends EventEmitter implements sys.Renderable {

        /**
         * 创建一个显示对象
         */
        public constructor() {
            super();
            this.$displayFlags = sys.DisplayObjectFlags.InitFlags;
            this.displayValues = {
                0:1,  //scaleX,
                1:1,  //scaleY,
                2:0,  //skewX,
                3:0,  //skewY,
                4:0   //rotation
            };
        }

        private displayValues:any;

        $displayFlags:number;

        $setFlags(flags:number):void {
            this.$displayFlags |= flags;
        }

        $toggleFlags(flags:number, on:boolean):void {
            if (on) {
                this.$displayFlags |= flags;
            } else {
                this.$displayFlags &= ~flags;
            }
        }

        $removeFlags(flags:number):void {
            this.$displayFlags &= ~flags;
        }

        /**
         * 沿着显示列表向上移除标志量，如果标志量没被设置过就停止移除。
         */
        $removeFlagsUp(flags:number):void {
            if (!this.$hasAnyFlags(flags)) {
                return;
            }
            this.$removeFlags(flags)
            var parent = this.$parent;
            if (parent) {
                parent.$removeFlagsUp(flags);
            }
        }

        $hasFlags(flags:number):boolean {
            return (this.$displayFlags & flags) === flags;
        }

        /**
         * 沿着显示列表向上传递标志量，如果标志量已经被设置过就停止传递。
         */
        $propagateFlagsUp(flags:number):void {
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
         * 沿着显示列表向下传递标志量，非容器直接设置自身的flag，此方法会在 DisplayObjectContainer 中被覆盖。
         */
        $propagateFlagsDown(flags:number):void {
            this.$setFlags(flags);
        }

        $hasAnyFlags(flags:number):boolean {
            return !!(this.$displayFlags & flags);
        }

        private invalidateMatrix():void {
            this.$setFlags(sys.DisplayObjectFlags.InvalidMatrix);
            this.invalidatePosition();
        }

        /**
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        private invalidatePosition():void {
            this.$invalidateTransform();
            this.$propagateFlagsDown(sys.DisplayObjectFlags.InvalidConcatenatedMatrix |
                sys.DisplayObjectFlags.InvalidInvertedConcatenatedMatrix);
            if (this.$parent) {
                this.$parent.$propagateFlagsUp(sys.DisplayObjectFlags.InvalidBounds);
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
        public name:string = "";

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

        $onAddToStage(stage:Stage, nestLevel:number):void {
            this.$stage = stage;
            this.$nestLevel = nestLevel;
            Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this);
        }

        $onRemoveFromStage():void {
            this.$nestLevel = 0;
            Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this);
        }

        $stage:Stage = null;

        /**
         * 这个对象在显示列表中的嵌套深度，舞台为1，它的子项为2，子项的子项为3，以此类推。当对象不在显示列表中时此属性值为0.
         */
        $nestLevel:number = 0;

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
         * 注意：必须对matrix属性重新赋值改变的值才能生效，若获取matrix引用来修改对象属性，将不会发生任何改变。
         */
        public get matrix():Matrix {
            return this.$getMatrix().clone();
        }

        $getMatrix():Matrix {
            if (this.$hasFlags(sys.DisplayObjectFlags.InvalidMatrix)) {
                var values = this.displayValues;
                this._matrix.$updateScaleAndRotation(values[Values.scaleX], values[Values.scaleY], values[Values.skewX], values[Values.skewY]);
                this.$removeFlags(sys.DisplayObjectFlags.InvalidMatrix);
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
            var values = this.displayValues;
            values[Values.scaleX] = m.$getScaleX();
            values[Values.scaleY] = m.$getScaleY();
            values[Values.skewX] = matrix.$getSkewX();
            values[Values.skewY] = matrix.$getSkewY();
            values[Values.rotation] = clampRotation(values[Values.skewY] * 180 / Math.PI);
            this.$removeFlags(sys.DisplayObjectFlags.InvalidMatrix);
            this.invalidatePosition();
        }


        /**
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        $getConcatenatedMatrix():Matrix {
            if (this.$hasFlags(sys.DisplayObjectFlags.InvalidConcatenatedMatrix)) {
                if (this.$parent) {
                    this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(),
                        this.$renderMatrix);
                    var rect = this.$scrollRect;
                    if (rect) {
                        this.$renderMatrix.$preMultiplyInto($TempMatrix.setTo(1, 0, 0, 1, -rect.x, -rect.y), this.$renderMatrix)
                    }
                } else {
                    this.$renderMatrix.copyFrom(this.$getMatrix());
                }
                if (this.$displayList) {
                    this.$displayList.$renderRegion.moved = true;
                }
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(sys.DisplayObjectFlags.InvalidConcatenatedMatrix);
            }
            return this.$renderMatrix;
        }

        private _invertedConcatenatedMatrix:Matrix = new Matrix();

        $getInvertedConcatenatedMatrix():Matrix {
            if (this.$hasFlags(sys.DisplayObjectFlags.InvalidInvertedConcatenatedMatrix)) {
                this.$getConcatenatedMatrix().$invertInto(this._invertedConcatenatedMatrix);
                this.$removeFlags(sys.DisplayObjectFlags.InvalidInvertedConcatenatedMatrix);
            }
            return this._invertedConcatenatedMatrix;
        }

        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        public get x():number {
            return this.$getX();
        }

        $getX():number {
            return this._matrix.tx;
        }

        public set x(value:number) {
            this.$setX(value);
        }

        $setX(value:number):boolean {
            value = +value || 0;
            var m = this._matrix;
            if (value === m.tx) {
                return false;
            }
            m.tx = value;
            this.invalidatePosition();
            return true;
        }

        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        public get y():number {
            return this.$getY();
        }

        $getY():number {
            return this._matrix.ty;
        }

        public set y(value:number) {
            this.$setY(value);
        }

        $setY(value:number):boolean {
            value = +value || 0;
            var m = this._matrix;
            if (value === m.ty) {
                return false;
            }
            m.ty = value;
            this.invalidatePosition();
            return true;
        }


        /**
         * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        public get scaleX():number {
            return this.displayValues[Values.scaleX];
        }

        public set scaleX(value:number) {
            this.$setScaleX(value);
        }

        $setScaleX(value:number):boolean {
            value = +value || 0;
            var values = this.displayValues;
            if (value === values[Values.scaleX]) {
                return false;
            }
            values[Values.scaleX] = value;
            this.invalidateMatrix();
            return true;
        }

        /**
         * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        public get scaleY():number {
            return this.displayValues[Values.scaleY];
        }

        public set scaleY(value:number) {
            this.$setScaleY(value);
        }

        $setScaleY(value:number):boolean {
            value = +value || 0;
            if (value === this.displayValues[Values.scaleY]) {
                return false;
            }
            this.displayValues[Values.scaleY] = value;
            this.invalidateMatrix();
            return true;
        }

        /**
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
         * 减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
         * @default 0 默认值为 0 不旋转。
         */
        public get rotation():number {
            return this.displayValues[Values.rotation];
        }

        public set rotation(value:number) {
            value = +value || 0;
            value = clampRotation(value);
            var values = this.displayValues;
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
         */
        public get width():number {
            return this.$getWidth();
        }

        $getWidth():number {
            return this.$getTransformedBounds(this.$parent, $TempRectangle).width;
        }

        public set width(value:number) {
            this.$setWidth(value);
        }

        $setWidth(value:number) {
            value = +value || 0;
            if (value < 0) {
                return;
            }
            var values = this.displayValues;
            var originalBounds = this.$getOriginalBounds();
            var bounds = this.$getTransformedBounds(this.$parent, $TempRectangle);
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
         */
        public get height():number {
            return this.$getHeight();
        }

        $getHeight():number {
            return this.$getTransformedBounds(this.$parent, $TempRectangle).height;
        }

        public set height(value:number) {
            this.$setHeight(value);
        }

        $setHeight(value:number) {
            value = +value || 0;
            if (value < 0) {
                return;
            }
            var values = this.displayValues;
            var originalBounds = this.$getOriginalBounds();
            var bounds = this.$getTransformedBounds(this.$parent, $TempRectangle);
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

        $visible:boolean = true;

        /**
         * 显示对象是否可见。
         * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
         * 默认值为 true 可见
         */
        public get visible():boolean {
            return this.$visible;
        }

        public set visible(value:boolean) {
            value = !!value;
            if (value === this.$visible) {
                return;
            }
            this.$visible = value;
            this.$invalidateTransform();
        }

        /**
         * cacheAsBitmap创建的缓存位图节点。
         */
        $displayList:lark.sys.DisplayList = null;

        /**
         * 如果设置为 true，则 Lark 播放器将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
         * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
         * 具体取决于显示对象内容的复杂性。在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
         * 最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放和旋转的显示对象一起使用。
         */
        public get cacheAsBitmap():boolean {
            return this.$hasFlags(sys.DisplayObjectFlags.CacheAsBitmap);
        }

        public set cacheAsBitmap(value:boolean) {
            value = !!value;
            this.$toggleFlags(sys.DisplayObjectFlags.CacheAsBitmap, value);
            var hasDisplayList = !!this.$displayList;
            if (hasDisplayList === value) {
                return;
            }
            if (value) {
                var displayList = sys.DisplayList.create(this);
                if (displayList) {
                    this.$displayList = displayList;
                    if (this.$parentDisplayList) {
                        this.$parentDisplayList.markDirty(displayList);
                    }
                    this.$cacheAsBitmapChanged();
                }
            }
            else {
                sys.DisplayList.release(this.$displayList);
                this.$displayList = null;
                this.$cacheAsBitmapChanged();
            }
        }

        /**
         * cacheAsBitmap属性改变
         */
        $cacheAsBitmapChanged():void {
            var parentCache = this.$displayList || this.$parentDisplayList;
            if (this.$renderRegion) {
                parentCache.markDirty(this);
            }
        }

        /**
         * 渲染时会用到的属性，独立声明一个变量
         */
        $alpha:number = 1;

        /**
         * 表示指定对象的 Alpha 透明度值。
         * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
         *  @default 1 默认值为 1。
         */
        public get alpha():number {
            return this.$alpha;
        }

        public set alpha(value:number) {
            value = +value || 0;
            if (value === this.$alpha) {
                return;
            }
            this.$alpha = value;
            this.$propagateFlagsDown(sys.DisplayObjectFlags.InvalidConcatenatedAlpha);
            this.$invalidate(true);
        }

        /**
         * 获取这个显示对象跟它所有父级透明度的乘积
         */
        $getConcatenatedAlpha():number {
            if (this.$hasFlags(sys.DisplayObjectFlags.InvalidConcatenatedAlpha)) {
                if (this.$parent) {
                    var parentAlpha = this.$parent.$getConcatenatedAlpha();
                    this.$renderAlpha = parentAlpha * this.$alpha;
                }
                else {
                    this.$renderAlpha = this.$alpha;
                }
                this.$removeFlags(sys.DisplayObjectFlags.InvalidConcatenatedAlpha);
            }
            return this.$renderAlpha;
        }

        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @default true 默认为 true 即可以接收。
         */
        public get touchEnabled():boolean {
            return this.$hasFlags(sys.DisplayObjectFlags.TouchEnabled);
        }

        public set touchEnabled(value:boolean) {
            this.$setTouchEnabled(value);
        }

        $setTouchEnabled(value:boolean):void{
            this.$toggleFlags(sys.DisplayObjectFlags.TouchEnabled, !!value);
        }

        /**
         * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透，设置为false将只检查显示对象测量的最大矩形区域。
         * 开启此属性将会有一定量的额外性能损耗，Shape和Sprite等含有矢量图的类默认开启此属性，其他类默认关闭。
         */
        public get pixelHitTest():boolean {
            return this.$hasFlags(sys.DisplayObjectFlags.PixelHitTest);
        }

        public set pixelHitTest(value:boolean) {
            this.$toggleFlags(sys.DisplayObjectFlags.PixelHitTest, !!value);
        }

        $scrollRect:Rectangle = null;

        /**
         * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
         * 注意：必须对scrollRect属性重新赋值改变的值才能生效，若获取scrollRect引用来修改对象属性，将不会发生任何改变。
         */
        public get scrollRect():Rectangle {
            return this.$scrollRect ? this.$scrollRect.clone() : null;
        }

        public set scrollRect(value:Rectangle) {
            if (!value && !this.$scrollRect) {
                return;
            }
            if (value) {
                if (!this.$scrollRect) {
                    this.$scrollRect = new lark.Rectangle();
                }
                this.$scrollRect.copyFrom(value);
            }
            else {
                this.$scrollRect = null;
            }
            this.invalidatePosition();
        }

        $blendMode:number = 0;

        /**
         * BlendMode 枚举中的一个值，用于指定要使用的混合模式，确定如何将一个源（新的）图像绘制到目标（已有）的图像上
         * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
         */
        public get blendMode():string {
            return sys.numberToBlendMode(this.$blendMode);
        }

        public set blendMode(value:string) {
            var mode = sys.blendModeToNumber(value);
            if (mode === this.$blendMode) {
                return;
            }
            this.$blendMode = mode;
            this.$invalidateTransform();
        }

        /**
         * 被遮罩的对象
         */
        $maskedObject:DisplayObject = null;

        $mask:DisplayObject = null;

        /**
         * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
         * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
         * Sprite 对象，它必须在显示列表中。
         * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
         * 该对象的 mask 属性将变为 null。
         */
        public get mask():DisplayObject {
            return this.$mask;
        }

        public set mask(value:DisplayObject) {
            if (value === this.$mask || value === this) {
                return;
            }
            if (value) {
                if (value.$maskedObject) {
                    value.$maskedObject.mask = null;
                }
                value.$maskedObject = this;
            }
            this.$mask = value;
            this.$invalidateTransform();
        }

        /**
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Rectangle对象来存储结果，
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
                m = $TempMatrix;
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
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
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
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
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
            this.$setFlags(sys.DisplayObjectFlags.InvalidContentBounds);
            this.$propagateFlagsUp(sys.DisplayObjectFlags.InvalidBounds);
        }

        private _bounds:Rectangle = new lark.Rectangle();

        /**
         * 获取显示对象占用的矩形区域集合，通常包括自身绘制的测量区域，如果是容器，还包括所有子项占据的区域。
         */
        $getOriginalBounds():Rectangle {
            var bounds = this._bounds;
            if (this.$hasFlags(sys.DisplayObjectFlags.InvalidBounds)) {
                bounds.copyFrom(this.$getContentBounds());
                this.$measureChildBounds(bounds);
                this.$removeFlags(sys.DisplayObjectFlags.InvalidBounds);
                if (this.$displayList) {
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

        private _contentBounds:Rectangle = new lark.Rectangle();

        $getContentBounds():Rectangle {
            var bounds = this._contentBounds;
            if (this.$hasFlags(sys.DisplayObjectFlags.InvalidContentBounds)) {
                this.$measureContentBounds(bounds);
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(sys.DisplayObjectFlags.InvalidContentBounds);
            }
            return bounds;
        }

        /**
         * 测量自身占用的矩形区域，注意：此测量结果并不包括子项占据的区域。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        $measureContentBounds(bounds:Rectangle):void {

        }

        $parentDisplayList:lark.sys.DisplayList = null;

        /**
         * 标记此显示对象需要重绘。此方法会触发自身的cacheAsBitmap重绘。如果只是矩阵改变，自身显示内容并不改变，应该调用$invalidateTransform().
         * @param notiryChildren 是否标记子项也需要重绘。传入false或不传入，将只标记自身需要重绘。通常只有alpha属性改变会需要通知子项重绘。
         */
        $invalidate(notifyChildren?:boolean):void {
            if (!this.$renderRegion || this.$hasFlags(sys.DisplayObjectFlags.DirtyRender)) {
                return;
            }
            this.$setFlags(sys.DisplayObjectFlags.DirtyRender);
            var displayList = this.$displayList ? this.$displayList : this.$parentDisplayList;
            if (displayList) {
                displayList.markDirty(this);
            }
        }

        /**
         * 标记自身以及所有子项在父级中变换叠加的显示内容失效。此方法不会触发自身的cacheAsBitmap重绘。
         * 通常用于矩阵改变或从显示列表添加和移除时。若自身的显示内容已经改变需要重绘，应该调用$invalidate()。
         */
        $invalidateTransform():void {
            if (this.$hasFlags(sys.DisplayObjectFlags.DirtyChildren)) {
                return;
            }
            this.$setFlags(sys.DisplayObjectFlags.DirtyChildren);
            var displayList = this.$displayList;
            if ((displayList || this.$renderRegion) && this.$parentDisplayList) {
                this.$parentDisplayList.markDirty(displayList || this);
            }
        }

        /**
         * 是否需要重绘的标志，此属性在渲染时会被访问，所以单独声明一个直接的变量。
         */
        $isDirty:boolean = false;
        /**
         * 这个对象在舞台上的整体透明度
         */
        $renderAlpha:number = 1;
        /**
         * 在舞台上的矩阵对象
         */
        $renderMatrix:Matrix = new lark.Matrix();
        /**
         * 此显示对象自身（不包括子项）在屏幕上的显示尺寸。
         */
        $renderRegion:sys.Region = null;

        /**
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         */
        $update():boolean {
            this.$removeFlagsUp(sys.DisplayObjectFlags.Dirty);
            this.$getConcatenatedAlpha();
            var matrix = this.$getConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var stage = this.$stage;
            if (!stage) {
                return false;
            }
            var region = this.$renderRegion;
            if (!region.moved) {
                return false;
            }
            region.moved = false;
            region.updateRegion(bounds, matrix);
            return true;
        }

        /**
         * 执行渲染,绘制自身到屏幕
         */
        $render(context:sys.RenderContext):void {

        }

        $hitTest(stageX:number, stageY:number, shapeFlag?:boolean):DisplayObject {
            if (!this.$renderRegion || !this.$visible || !this.$hasFlags(sys.DisplayObjectFlags.TouchEnabled)) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            if (bounds.contains(localX, localY)) {
                if (!this.$children) {//容器已经检查过scrollRect和mask，避免重复对遮罩进行碰撞。
                    if (this.$scrollRect && !this.$scrollRect.contains(localX, localY)) {
                        return null;
                    }
                    if (this.$mask && !this.$mask.$hitTest(stageX, stageY, true)) {
                        return null;
                    }
                }
                if (shapeFlag || this.$displayFlags & sys.DisplayObjectFlags.PixelHitTest) {
                    return this.hitTestPixel(localX, localY);
                }
                return this;
            }
            return null;
        }

        private hitTestPixel(localX:number, localY:number):DisplayObject {
            var alpha = this.$getConcatenatedAlpha();
            if (alpha === 0) {
                return null;
            }
            var context:sys.RenderContext;
            var data:Uint8Array;
            var displayList = this.$displayList;
            if (displayList) {
                context = displayList.renderContext;
                data = context.getImageData(localX - displayList.offsetX, localY - displayList.offsetY, 1, 1).data;
            }
            else {
                context = sys.sharedRenderContext;
                context.surface.width = context.surface.height = 3;
                context.translate(1 - localX, 1 - localY);
                this.$render(context);
                data = context.getImageData(1, 1, 1, 1).data;
            }
            if (data[3] === 0) {
                return null;
            }
            return this;
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

            var list = this.$getPropagationList(this);
            var targetIndex = list.length*0.5;
            event.$target = this;
            this.$emitPropagationEvent(event, list, targetIndex);
            return !event.$isDefaultPrevented;
        }

        /**
         * 获取事件流列表。注意：Lark框架的事件流与Flash实现并不一致。
         *
         * Flash的事件流有三个阶段：捕获，目标，冒泡。
         * 默认的的事件监听若不开始useCapture将监听目标和冒泡阶段。若开始capture将只能监听捕获当不包括目标的事件。
         * 可以在Flash中写一个简单的测试：实例化一个非容器显示对象，例如TextField。分别监听useCapture为true和false时的鼠标事件。
         * 点击后将只有useCapture为false的回调函数输出信息。也就带来一个问题「Flash的捕获阶段不能监听到最内层对象本身，只在父级列表有效」。
         *
         * 而HTML里的事件流只有两个阶段：捕获，冒泡。
         * 最初是由于各个浏览器都只有一个方向的事件流，并且存在捕获和冒泡两种相反的顺序。w3c最终决定同时实现两种事件流，监听时用useCapture来区分监。
         * HTML里与Flash里事件流最根本的区别：没有目标阶段，最内层的点击对象会触发两次事件，一次捕获一次冒泡。而Flash只触发一次，
         * 是与「捕获」和「冒泡」独立的「目标」阶段。出于拥抱web标准的考虑，加上大部分Flash开发者其实也并不知道有「目标」阶段的存在。
         *
         * Lark最终采用了HTML里只有两个阶段的事件流机制。
         */
        $getPropagationList(target:DisplayObject):DisplayObject[]{
            var list:DisplayObject[] = [];
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            var captureList = list.concat();
            captureList.reverse();//使用一次reverse()方法比多次调用unshift()性能高。
            list = captureList.concat(list);
            return list;
        }

        $emitPropagationEvent(event:Event, list:DisplayObject[], targetIndex:number):void {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event.$currentTarget = currentTarget;
                if (i < targetIndex)
                    event.$eventPhase = EventPhase.CAPTURING_PHASE;
                else
                    event.$eventPhase = EventPhase.BUBBLING_PHASE;
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
    registerClass(DisplayObject, Types.DisplayObject);
}
