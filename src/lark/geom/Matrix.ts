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

    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;

    function cos(angle:number):number {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 0;
            case PI:
            case -PI:
                return -1;
            case PacPI:
            case -HalfPI:
                return 0;
            default:
                return Math.cos(angle);
        }
    }

    function sin(angle:number):number {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 1;
            case PI:
            case -PI:
                return 0;
            case PacPI:
            case -HalfPI:
                return -1;
            default:
                return Math.sin(angle);
        }
    }

    const enum M {
        a, b, c, d, tx, ty
    }

    var matrixPool:Matrix[] = [];
    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     */
    export class Matrix extends LarkObject {

        /**
         * 释放一个Matrix实例到对象池
         */
        public static release(matrix:Matrix):void {
            if(!matrix){
                return;
            }
            matrixPool.push(matrix);
        }

        /**
         * 从对象池中取出或创建一个新的Matrix对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        public static create():Matrix {
            var matrix = matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        }

        /**
         * 创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        constructor(a:number = 1, b:number = 0, c:number = 0, d:number = 1, tx:number = 0, ty:number = 0) {
            super();
            this.$data = new Float64Array([a,b,c,d,tx,ty]);
        }

        /**
         * 将矩阵数据存储在Typed Array里，会获得约60%的性能提升。
         */
        $data:Float64Array

        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         */
        public set a(a:number) {
            this.$data[M.a] = a;
        }

        public get a():number {
            return this.$data[M.a];
        }

        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         */
        public get b():number {
            return this.$data[M.b];
        }

        public set b(b:number) {
            this.$data[M.b] = b;
        }

        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         */
        public get c():number {
            return this.$data[M.c];
        }

        public set c(c:number) {
            this.$data[M.c] = c;
        }

        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         */
        public get d():number {
            return this.$data[M.d];
        }

        public set d(d:number) {
            this.$data[M.d] = d;
        }

        /**
         * 沿 x 轴平移每个点的距离
         */
        public get tx():number {
            return this.$data[M.tx];
        }

        public set tx(tx:number) {
            this.$data[M.tx] = tx;
        }

        /**
         * 沿 y 轴平移每个点的距离
         */
        public set ty(ty:number) {
            this.$data[M.ty] = ty;
        }

        public get ty():number {
            return this.$data[M.ty];
        }

        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         */
        public clone():Matrix {
            var m = this.$data;
            return new Matrix(m[M.a], m[M.b], m[M.c], m[M.d], m[M.tx], m[M.ty]);
        }

        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
         * @param other 要连接到源矩阵的矩阵。
         */
        public concat(other:Matrix):void {
            var m = this.$data, n = other.$data;
            var a =  m[M.a] * n[M.a];
            var b =  0.0;
            var c =  0.0;
            var d =  m[M.d] * n[M.d];
            var tx = m[M.tx] * n[M.a] + n[M.tx];
            var ty = m[M.ty] * n[M.d] + n[M.ty];

            if (m[M.b] !== 0.0 || m[M.c] !== 0.0 || n[M.b] !== 0.0 || n[M.c] !== 0.0) {
                a  += m[M.b] * n[M.c];
                d  += m[M.c] * n[M.b];
                b  += m[M.a] * n[M.b] + m[M.b] * n[M.d];
                c  += m[M.c] * n[M.a] + m[M.d] * n[M.c];
                tx += m[M.ty] * n[M.c];
                ty += m[M.tx] * n[M.b];
            }

            m[M.a] = a;
            m[M.b] = b;
            m[M.c] = c;
            m[M.d] = d;
            m[M.tx] = tx;
            m[M.ty] = ty;
        }

        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         */
        public copyFrom(other:Matrix):Matrix {
            var m = this.$data, n = other.$data;
            m[M.a] = n[M.a];
            m[M.b] = n[M.b];
            m[M.c] = n[M.c];
            m[M.d] = n[M.d];
            m[M.tx] = n[M.tx];
            m[M.ty] = n[M.ty];
            return this;
        }

        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         */
        public identity():void {
            var m = this.$data;
            m[M.a] = m[M.d] = 1;
            m[M.b] = m[M.c] = m[M.tx] = m[M.ty] = 0;
        }

        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         */
        public invert():void {
            this.$invertInto(this);
        }

        $invertInto(target:Matrix):void {
            var m = this.$data, t = target.$data;
            var a = m[M.a];
            var b  = m[M.b];
            var c  = m[M.c];
            var d = m[M.d];
            var tx = m[M.tx];
            var ty = m[M.ty];
            if (b === 0 && c === 0) {
                t[M.b] = t[M.c] = 0;
                if(a===0||d===0){
                    t[M.a] = t[M.d] = t[M.tx] = t[M.ty] = 0;
                }
                else{
                    a = t[M.a] = 1 / a;
                    d = t[M.d] = 1 / d;
                    t[M.tx] = -a * tx;
                    t[M.ty] = -d * ty;
                }

                return;
            }
            var determinant = a * d - b * c;
            if (determinant === 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = t[M.a] =  d * determinant;
            b = t[M.b] = -b * determinant;
            c = t[M.c] = -c * determinant;
            d = t[M.d] =  a * determinant;
            t[M.tx] = -(k * tx + c * ty);
            t[M.ty] = -(b * tx + d * ty);
        }

        /**
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         */
        public rotate(angle:number):void {
            angle = +angle;
            if (angle !== 0) {
                var m = this.$data;
                var u = cos(angle);
                var v = sin(angle);
                var ta = m[M.a];
                var tb = m[M.b];
                var tc = m[M.c];
                var td = m[M.d];
                var ttx = m[M.tx];
                var tty = m[M.ty];
                m[M.a] = ta  * u - tb  * v;
                m[M.b] = ta  * v + tb  * u;
                m[M.c] = tc  * u - td  * v;
                m[M.d] = tc  * v + td  * u;
                m[M.tx] = ttx * u - tty * v;
                m[M.ty] = ttx * v + tty * u;
            }
        }

        /**
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         */
        public scale(sx:number, sy:number):void {
            var m = this.$data;
            if (sx !== 1) {
                m[M.a] *= sx;
                m[M.c] *= sx;
                m[M.tx] *= sx;
            }
            if (sy !== 1) {
                m[M.b] *= sy;
                m[M.d] *= sy;
                m[M.ty] *= sy;
            }
        }

        /**
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        public setTo(a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix {
            var m = this.$data;
            m[M.a] = a;
            m[M.b] = b;
            m[M.c] = c;
            m[M.d] = d;
            m[M.tx] = tx;
            m[M.ty] = ty;
            return this;
        }

        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 引擎建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         */
        public transformPoint(pointX:number, pointY:number, resultPoint?:Point):Point {
            var m = this.$data;
            var x = m[M.a] * pointX + m[M.c] * pointY + m[M.tx];
            var y = m[M.b] * pointX + m[M.d] * pointY + m[M.ty];
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new Point(x, y);
        }

        /**
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         */
        public translate(dx:number, dy:number):void {
            var m = this.$data;
            m[M.tx] += dx;
            m[M.ty] += dy;
        }

        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         */
        public equals(other:Matrix):boolean {
            var m = this.$data, n = other.$data;
            return m[M.a] === n[M.a] && m[M.b] === n[M.b] &&
                m[M.c] === n[M.c] && m[M.d] === n[M.d] &&
                m[M.tx] === n[M.tx] && m[M.ty] === n[M.ty];
        }

        $transformBounds(bounds:Rectangle):void {
            var m = this.$data;
            var a  = m[M.a];
            var b  = m[M.b];
            var c  = m[M.c];
            var d  = m[M.d];
            var tx = m[M.tx];
            var ty = m[M.ty];

            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;

            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;

            var tmp = 0;

            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }

            bounds.x = Math.floor(x0 < x2 ? x0 : x2);
            bounds.width = Math.ceil((x1 > x3 ? x1 : x3) - bounds.x);

            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }

            bounds.y = Math.floor(y0 < y2 ? y0 : y2);
            bounds.height = Math.ceil((y1 > y3 ? y1 : y3) - bounds.y);
        }

        private getDeterminant() {
            var m = this.$data;
            return m[M.a] * m[M.d] - m[M.b] * m[M.c];
        }

        $getScaleX():number {
            var m = this.$data;
            if (m[M.a] === 1 && m[M.b] === 0) {
                return 1;
            }
            var result = Math.sqrt(m[M.a] * m[M.a] + m[M.b] * m[M.b]);
            return this.getDeterminant() < 0 ? -result : result;
        }

        $getScaleY():number {
            var m = this.$data;
            if (m[M.c] === 0 && m[M.d] === 1) {
                return 1;
            }
            var result = Math.sqrt(m[M.c] * m[M.c] + m[M.d] * m[M.d]);
            return this.getDeterminant() < 0 ? -result : result;
        }

        $getSkewX():number {
            var m = this.$data;
            return Math.atan2(m[M.d], m[M.c]) - (PI / 2);
        }

        $getSkewY():number {
            var m = this.$data;
            return Math.atan2(m[M.b], m[M.a]);
        }

        $updateScaleAndRotation(scaleX:number, scaleY:number, skewX:number, skewY:number) {
            var m = this.$data;
            if ((skewX === 0 || skewX === TwoPI) && (skewY === 0 || skewY === TwoPI)) {
                m[M.a] = scaleX;
                m[M.b] = m[M.c] = 0;
                m[M.d] = scaleY;
                return;
            }

            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX === skewY) {
                m[M.a] = u * scaleX;
                m[M.b] = v * scaleX;
            } else {
                m[M.a] = cos(skewY) * scaleX;
                m[M.b] = sin(skewY) * scaleX;
            }
            m[M.c] = -v * scaleY;
            m[M.d] = u * scaleY;
        }

        /**
         * target = other * this
         */
        $preMultiplyInto(other:Matrix, target:Matrix):void {
            var m = this.$data, n = other.$data, t = target.$data;
            var a =  n[M.a] * m[M.a];
            var b =  0.0;
            var c =  0.0;
            var d =  n[M.d] * m[M.d];
            var tx = n[M.tx] * m[M.a] + m[M.tx];
            var ty = n[M.ty] * m[M.d] + m[M.ty];

            if (n[M.b] !== 0.0 || n[M.c] !== 0.0 || m[M.b] !== 0.0 || m[M.c] !== 0.0) {
                a  += n[M.b] * m[M.c];
                d  += n[M.c] * m[M.b];
                b  += n[M.a] * m[M.b] + n[M.b] * m[M.d];
                c  += n[M.c] * m[M.a] + n[M.d] * m[M.c];
                tx += n[M.ty] * m[M.c];
                ty += n[M.tx] * m[M.b];
            }

            t[M.a] = a;
            t[M.b] = b;
            t[M.c] = c;
            t[M.d] = d;
            t[M.tx] = tx;
            t[M.ty] = ty;
        }

    }
    registerType(Matrix,Types.Matrix);

    /**
     * 仅供引擎内复用，要防止暴露引用到外部。
     */
    export var $TempMatrix = new Matrix();
}