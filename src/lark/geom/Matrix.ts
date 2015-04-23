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


    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     */
    export class Matrix extends LarkObject {

        /**
         * 只允许在局部变量中使用，使用完要立即释放，并要防止嵌套调用导致对象在其他位置被修改的可能性。
         */
        public static TEMP:Matrix = new Matrix();

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
            this.$typeFlags = Types.Matrix;
            var m = this.$data = new Float64Array(6);
            m[0] = a;
            m[1] = b;
            m[2] = c;
            m[3] = d;
            m[4] = tx;
            m[5] = ty;
        }

        /**
         * 将矩阵数据存储在Typed Array里，会获得约60%的性能提升。
         */
        $data:Float64Array

        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         */
        public set a(a:number) {
            this.$data[0] = a;
        }

        public get a():number {
            return this.$data[0];
        }

        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         */
        public get b():number {
            return this.$data[1];
        }

        public set b(b:number) {
            this.$data[1] = b;
        }

        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         */
        public get c():number {
            return this.$data[2];
        }

        public set c(c:number) {
            this.$data[2] = c;
        }

        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         */
        public get d():number {
            return this.$data[3];
        }

        public set d(d:number) {
            this.$data[3] = d;
        }

        /**
         * 沿 x 轴平移每个点的距离
         */
        public get tx():number {
            return this.$data[4];
        }

        public set tx(tx:number) {
            this.$data[4] = tx;
        }

        /**
         * 沿 y 轴平移每个点的距离
         */
        public set ty(ty:number) {
            this.$data[5] = ty;
        }

        public get ty():number {
            return this.$data[5];
        }

        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         */
        public clone():Matrix {
            var m = this.$data;
            return new Matrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        }

        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
         * @param other 要连接到源矩阵的矩阵。
         */
        public concat(other:Matrix):void {
            var m = this.$data, n = other.$data;
            var a =  m[0] * n[0];
            var b =  0.0;
            var c =  0.0;
            var d =  m[3] * n[3];
            var tx = m[4] * n[0] + n[4];
            var ty = m[5] * n[3] + n[5];

            if (m[1] !== 0.0 || m[2] !== 0.0 || n[1] !== 0.0 || n[2] !== 0.0) {
                a  += m[1] * n[2];
                d  += m[2] * n[1];
                b  += m[0] * n[1] + m[1] * n[3];
                c  += m[2] * n[0] + m[3] * n[2];
                tx += m[5] * n[2];
                ty += m[4] * n[1];
            }

            m[0] = a;
            m[1] = b;
            m[2] = c;
            m[3] = d;
            m[4] = tx;
            m[5] = ty;
        }

        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         */
        public copyFrom(other:Matrix):Matrix {
            var m = this.$data, n = other.$data;
            m[0] = n[0];
            m[1] = n[1];
            m[2] = n[2];
            m[3] = n[3];
            m[4] = n[4];
            m[5] = n[5];
            return this;
        }

        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         */
        public identity():void {
            var m = this.$data;
            m[0] = m[3] = 1;
            m[1] = m[2] = m[4] = m[5] = 0;
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
            var b  = m[1];
            var c  = m[2];
            var tx = m[4];
            var ty = m[5];
            if (b === 0 && c === 0) {
                var a = t[0] = 1 / m[0];
                var d = t[3] = 1 / m[3];
                t[1] = t[2] = 0;
                t[4] = -a * tx;
                t[5] = -d * ty;
                return;
            }
            var a = m[0];
            var d = m[3];
            var determinant = a * d - b * c;
            if (determinant === 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = t[0] =  d * determinant;
            b = t[1] = -b * determinant;
            c = t[2] = -c * determinant;
            d = t[3] =  a * determinant;
            t[4] = -(k * tx + c * ty);
            t[5] = -(b * tx + d * ty);
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
                var ta = m[0];
                var tb = m[1];
                var tc = m[2];
                var td = m[3];
                var ttx = m[4];
                var tty = m[5];
                m[0] = ta  * u - tb  * v;
                m[1] = ta  * v + tb  * u;
                m[2] = tc  * u - td  * v;
                m[3] = tc  * v + td  * u;
                m[4] = ttx * u - tty * v;
                m[5] = ttx * v + tty * u;
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
                m[0] *= sx;
                m[2] *= sx;
                m[4] *= sx;
            }
            if (sy !== 1) {
                m[1] *= sy;
                m[3] *= sy;
                m[5] *= sy;
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
            m[0] = a;
            m[1] = b;
            m[2] = c;
            m[3] = d;
            m[4] = tx;
            m[5] = ty;
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
            var x = m[0] * pointX + m[2] * pointY + m[4];
            var y = m[1] * pointX + m[3] * pointY + m[5];
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
            m[4] += dx;
            m[5] += dy;
        }

        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         */
        public equals(other:Matrix):boolean {
            var m = this.$data, n = other.$data;
            return m[0] === n[0] && m[1] === n[1] &&
                m[2] === n[2] && m[3] === n[3] &&
                m[4] === n[4] && m[5] === n[5];
        }

        $transformBounds(bounds:Rectangle):void {
            var m = this.$data;
            var a  = m[0];
            var b  = m[1];
            var c  = m[2];
            var d  = m[3];
            var tx = m[4];
            var ty = m[5];

            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;

            var round = Math.round;
            var x0 = round(a * x + c * y + tx);
            var y0 = round(b * x + d * y + ty);
            var x1 = round(a * xMax + c * y + tx);
            var y1 = round(b * xMax + d * y + ty);
            var x2 = round(a * xMax + c * yMax + tx);
            var y2 = round(b * xMax + d * yMax + ty);
            var x3 = round(a * x + c * yMax + tx);
            var y3 = round(b * x + d * yMax + ty);

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

            bounds.x = x0 < x2 ? x0 : x2;
            bounds.width = (x1 > x3 ? x1 : x3) - bounds.x;

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

            bounds.y = y0 < y2 ? y0 : y2;
            bounds.height = (y1 > y3 ? y1 : y3) - bounds.y;
        }

        private getDeterminant() {
            var m = this.$data;
            return m[0] * m[3] - m[1] * m[2];
        }

        $getScaleX():number {
            var m = this.$data;
            if (m[0] === 1 && m[1] === 0) {
                return 1;
            }
            var result = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
            return this.getDeterminant() < 0 ? -result : result;
        }

        $getScaleY():number {
            var m = this.$data;
            if (m[2] === 0 && m[3] === 1) {
                return 1;
            }
            var result = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
            return this.getDeterminant() < 0 ? -result : result;
        }

        $getSkewX():number {
            var m = this.$data;
            return Math.atan2(m[3], m[2]) - (PI / 2);
        }

        $getSkewY():number {
            var m = this.$data;
            return Math.atan2(m[1], m[0]);
        }

        $updateScaleAndRotation(scaleX:number, scaleY:number, skewX:number, skewY:number) {
            var m = this.$data;
            if ((skewX === 0 || skewX === TwoPI) && (skewY === 0 || skewY === TwoPI)) {
                m[0] = scaleX;
                m[1] = m[2] = 0;
                m[3] = scaleY;
                return;
            }

            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX === skewY) {
                m[0] = u * scaleX;
                m[1] = v * scaleX;
            } else {
                m[0] = cos(skewY) * scaleX;
                m[1] = sin(skewY) * scaleX;
            }
            m[2] = -v * scaleY;
            m[3] = u * scaleY;
        }

        /**
         * target = other * this
         */
        $preMultiplyInto(other:Matrix, target:Matrix):void {
            var m = this.$data, n = other.$data, t = target.$data;
            var a =  n[0] * m[0];
            var b =  0.0;
            var c =  0.0;
            var d =  n[3] * m[3];
            var tx = n[4] * m[0] + m[4];
            var ty = n[5] * m[3] + m[5];

            if (n[1] !== 0.0 || n[2] !== 0.0 || m[1] !== 0.0 || m[2] !== 0.0) {
                a  += n[1] * m[2];
                d  += n[2] * m[1];
                b  += n[0] * m[1] + n[1] * m[3];
                c  += n[2] * m[0] + n[3] * m[2];
                tx += n[5] * m[2];
                ty += n[4] * m[1];
            }

            t[0] = a;
            t[1] = b;
            t[2] = c;
            t[3] = d;
            t[4] = tx;
            t[5] = ty;
        }

    }
}