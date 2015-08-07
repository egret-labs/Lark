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
     */
    export const enum BitmapKeys {
        bitmapData,
        image,
        clipX,
        clipY,
        clipWidth,
        clipHeight,
        offsetX,
        offsetY,
        width,
        height,
        smoothing
    }
}

module lark {

    /**
     * @language en_US
     * The Bitmap class represents display objects that represent bitmap images.
     * The Bitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object.
     * After you create a Bitmap object, use the addChild() or addChildAt() method of the parent DisplayObjectContainer
     * instance to place the bitmap on the display list.A Bitmap object can share its BitmapData reference among several
     * Bitmap objects, independent of translation or rotation properties. Because you can create multiple Bitmap objects
     * that reference the same BitmapData object, multiple display objects can use the same complex BitmapData object
     * without incurring the memory overhead of a BitmapData object for each display object instance.
     *
     * @see lark.BitmapData
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/BitmapExample.ts
     */
    /**
     * @language zh_CN
     * Bitmap 类表示用于显示位图图片的显示对象。
     * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父级 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法可以将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与缩放或旋转属性无关。
     * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的 BitmapData 对象，
     * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生额外内存开销。
     *
     * @see lark.BitmapData
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/BitmapExample.ts
     */
    export class Bitmap extends DisplayObject {

        /**
         * @language en_US
         * Initializes a Bitmap object to refer to the specified BitmapData object.
         * @param bitmapData The BitmapData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个引用指定 BitmapData 实例的 Bitmap 对象
         * @param bitmapData 被引用的 BitmapData 实例
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(bitmapData?:BitmapData|Texture) {
            super();
            this.$renderRegion = new sys.Region();
            this.$Bitmap = {
                0: null,     // bitmapData,
                1: null,     // image,
                2: 0,        // clipX,
                3: 0,        // clipY,
                4: 0,        // clipWidth,
                5: 0,        // clipHeight,
                6: 0,        // offsetX,
                7: 0,        // offsetY,
                8: 0,        // width,
                9: 0,        // height
                10: true,    // smoothing
            };
            this.$setBitmapData(bitmapData);
        }

        /**
         * @private
         */
        $Bitmap:Object;

        /**
         * @language en_US
         * The BitmapData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 被引用的 BitmapData 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get bitmapData():BitmapData|Texture {
            return this.$Bitmap[sys.BitmapKeys.bitmapData];
        }

        public set bitmapData(value:BitmapData|Texture) {
            this.$setBitmapData(value);
        }

        /**
         * @private
         */
        $setBitmapData(value:BitmapData|Texture):void {
            var values = this.$Bitmap;
            if (value == values[sys.BitmapKeys.bitmapData]) {
                return;
            }
            values[sys.BitmapKeys.bitmapData] = value;
            if (value) {
                if (value instanceof Texture) {
                    var texture = <Texture>value;
                    this.setImageData(texture.$bitmapData, texture.$clipX, texture.$clipY, texture.$clipWidth,
                        texture.$clipHeight, texture.$offsetX, texture.$offsetY, texture.$width, texture.$height);
                }
                else {
                    this.setImageData(value, 0, 0, value.width, value.height, 0, 0, value.width, value.height);
                }
            }
            else {
                this.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0);
            }
            this.$invalidateContentBounds();
        }

        /**
         * @private
         */
        private setImageData(image:BitmapData, clipX:number, clipY:number, clipWidth:number, clipHeight:number,
                             offsetX:number, offsetY:number, width:number, height:number):void {
            var values = this.$Bitmap;
            values[sys.BitmapKeys.image] = image;
            values[sys.BitmapKeys.clipX] = clipX;
            values[sys.BitmapKeys.clipY] = clipY;
            values[sys.BitmapKeys.clipWidth] = clipWidth;
            values[sys.BitmapKeys.clipHeight] = clipHeight;
            values[sys.BitmapKeys.offsetX] = offsetX;
            values[sys.BitmapKeys.offsetY] = offsetY;
            values[sys.BitmapKeys.width] = width;
            values[sys.BitmapKeys.height] = height;
        }

        /**
         * @language en_US
         * Whether or not the bitmap is smoothed when scaled.
         * @default true。
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 控制在缩放时是否对位图进行平滑处理。
         * @default true。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get smoothing():boolean {
            return this.$Bitmap[sys.BitmapKeys.smoothing];
        }

        public set smoothing(value:boolean) {
            value = !!value;
            var values = this.$Bitmap;
            if (value === values[sys.BitmapKeys.smoothing]) {
                return;
            }
            values[sys.BitmapKeys.smoothing] = value;
            this.$invalidate();
        }


        private _pixelHitTest:boolean = false;
        /**
         * @language en_US
         * Specifies whether this object use precise hit testing by checking the alpha value of each pixel.If pixelHitTest
         * is set to true,the transparent area of the bitmap will be touched through.
         * Note:If the image is loaded from cross origin,that we can't access to the pixel data,so it might cause
         * the pixelHitTest property invalid.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。<br/>
         * 注意：若图片资源是以跨域方式从外部服务器加载的，将无法访问图片的像素数据，而导致此属性失效。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get pixelHitTest():boolean {
            return this._pixelHitTest;
        }

        public set pixelHitTest(value:boolean) {
            this._pixelHitTest = !!value;
        }

        $hitTest(stageX:number, stageY:number):DisplayObject {
            var target = super.$hitTest(stageX, stageY);
            if (target && this._pixelHitTest) {
                target = this.hitTestPixel(stageX, stageY);
            }
            return target;
        }

        /**
         * @private
         */
        private hitTestPixel(stageX:number, stageY:number):DisplayObject {
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
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

        /**
         * @private
         */
        $measureContentBounds(bounds:Rectangle):void {
            var values = this.$Bitmap;
            var image = values[sys.BitmapKeys.image];
            if (image) {
                var x = values[sys.BitmapKeys.offsetX];
                if(x>0){//裁切的透明区域要可以点击
                    x = 0;
                }
                var y = values[sys.BitmapKeys.offsetX];
                if(y>0){
                    y = 0;
                }
                bounds.setTo(x, y, values[sys.BitmapKeys.width], values[sys.BitmapKeys.height]);
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         */
        $render(context:sys.RenderContext):void {
            var values = this.$Bitmap;
            var image = values[sys.BitmapKeys.image];
            if (image) {
                context.imageSmoothingEnabled = values[sys.BitmapKeys.smoothing];
                context.drawImage(image, values[sys.BitmapKeys.clipX], values[sys.BitmapKeys.clipY], values[sys.BitmapKeys.clipWidth],
                    values[sys.BitmapKeys.clipHeight], values[sys.BitmapKeys.offsetX], values[sys.BitmapKeys.offsetY],
                    values[sys.BitmapKeys.clipWidth], values[sys.BitmapKeys.clipHeight]);
            }
        }
    }

}