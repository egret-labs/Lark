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

module swan {

    /**
     * 默认的皮肤适配器
     */
    var assetAdapter = new DefaultAssetAdapter();
    /**
     * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
     * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
     * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
     * Image 控件可以直接替代 Bitmap 在显示列表中使用。
     *
     * @event lark.Event.COMPLETE 当图片加载完成后调度
     */
    export class Image extends lark.Bitmap implements UIComponent {

        public constructor(source?:string|lark.BitmapData) {
            super();
            sys.UIComponentImpl.call(this);
            if (source) {
                this.source = source;
            }
        }

        /**
         * 矩形区域，它定义素材对象的九个缩放区域。
         * 注意:此属性仅在fileMode为BitmapFillMode.SCALE时有效。
         */
        private _scale9Grid:lark.Rectangle = null;

        public get scale9Grid():lark.Rectangle {
            return this._scale9Grid;
        }

        public set scale9Grid(value:lark.Rectangle) {
            this._scale9Grid = value;
            this.invalidateDisplayList();
        }

        private _fillMode:string = "scale";
        /**
         * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
         * 设置为 BitmapFillMode.CLIP，位图将在边缘处被截断。
         * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
         * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
         */
        public get fillMode():string {
            return this._fillMode;
        }

        public set fillMode(value:string) {
            if (value == this._fillMode) {
                return;
            }
            this._fillMode = value;
            this.invalidateDisplayList();
        }

        private sourceChanged:boolean = false;
        private _source:string|lark.BitmapData = null;
        /**
         * 用于显示位图的数据源。可以为一个网络图片url或BitmapData实例。
         */
        public get source():string|lark.BitmapData {
            return this._source;
        }

        public set source(value:string|lark.BitmapData) {
            if (value == this._source) {
                return;
            }
            this._source = value;
            if (!value) {
                this.$setBitmapData(null);
            }
            else if (typeof value == "string") {
                if(this.$stage){
                    this.parseSource();
                }
                else{
                    this.sourceChanged = true;
                    this.invalidateProperties();
                }
            }
            else {
                this.$setBitmapData(<lark.BitmapData>value);
            }
        }

        $setBitmapData(value:lark.BitmapData):void {
            if (value === this.$bitmapData) {
                return;
            }
            super.$setBitmapData(value);
            this._source = value;
            this.sourceChanged = false;
            this.invalidateSize();
            this.invalidateDisplayList();
        }

        /**
         * 解析source
         */
        private parseSource():void{
            this.sourceChanged = false;
            var adapter:IAssetAdapter = this.$stage.getImplementation("swan.IAssetAdapter");
            if(!adapter){
                adapter = assetAdapter;
            }
            adapter.getAsset(<string>this._source,this.contentChanged,this);
        }

        /**
         * 资源发生改变
         */
        private contentChanged(data:any,source:any):void {
            if (source !== this._source)
                return;
            if(!lark.is(data,lark.Types.BitmapData)){
                return;
            }
            this.$setBitmapData(data);
            if (data) {
                this.emitWith(lark.Event.COMPLETE);
            }
            else if(DEBUG){
                lark.$warn(2301,source);
            }
        }

        $measureContentBounds(bounds:lark.Rectangle):void {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                var values = this.$uiValues;
                var width = values[sys.UIValues.width];
                var height = values[sys.UIValues.height];
                if (lark.isNone(width) || lark.isNone(height)) {
                    bounds.setEmpty();
                    return;
                }
                if (this._fillMode == "clip") {
                    if (width > bitmapData.width) {
                        width = bitmapData.width;
                    }
                    if (height > bitmapData.height) {
                        height = bitmapData.height;
                    }
                }
                bounds.setTo(0, 0, width, height);
            }
            else {
                bounds.setEmpty();
            }
        }

        $render(context:lark.sys.RenderContext):void {
            var bitmapData = this.$bitmapData;
            if (!bitmapData) {
                return;
            }
            var values = this.$uiValues;
            var width = values[sys.UIValues.width];
            var height = values[sys.UIValues.height];
            if (lark.isNone(width) || lark.isNone(height)) {
                return;
            }
            switch (this._fillMode) {
                case "clip":
                    if (width > bitmapData.width) {
                        width = bitmapData.width;
                    }
                    if (height > bitmapData.height) {
                        height = bitmapData.height;
                    }
                    context.drawImage(bitmapData, 0, 0, width, height, 0, 0, width, height);
                    break;
                case "repeat":
                    var pattern = context.createPattern(bitmapData, "repeat");
                    context.rect(0, 0, width, height);
                    context.fillStyle = pattern;
                    context.fill();
                    break;
                default ://scale
                    context.imageSmoothingEnabled = this.$smoothing;
                    if (this._scale9Grid) {
                        this.drawScale9GridImage(context, bitmapData, this._scale9Grid, width, height);
                    }
                    else {
                        context.drawImage(bitmapData, 0, 0, width, height);
                    }
                    break;
            }
        }

        /**
         * 绘制九宫格位图
         */
        private drawScale9GridImage(context:lark.sys.RenderContext, image:lark.BitmapData,
                                    scale9Grid:lark.Rectangle, surfaceWidth?:number, surfaceHeight?:number):void {

            var imageWidth = image.width;
            var imageHeight = image.height;

            var sourceW0 = scale9Grid.x;
            var sourceH0 = scale9Grid.y;
            var sourceW1 = scale9Grid.width;
            var sourceH1 = scale9Grid.height;

            //防止空心的情况出现。
            if (sourceH1 == 0) {
                sourceH1 = 1;
                if (sourceH0 >= imageHeight) {
                    sourceH0--;
                }
            }
            if (sourceW1 == 0) {
                sourceW1 = 1;
                if (sourceW0 >= imageWidth) {
                    sourceW0--;
                }
            }
            var sourceX0 = 0;
            var sourceX1 = sourceX0 + sourceW0;
            var sourceX2 = sourceX1 + sourceW1;
            var sourceW2 = imageWidth - sourceW0 - sourceW1;

            var sourceY0 = 0;
            var sourceY1 = sourceY0 + sourceH0;
            var sourceY2 = sourceY1 + sourceH1;
            var sourceH2 = imageHeight - sourceH0 - sourceH1;

            var targetX0 = 0;
            var targetX1 = targetX0 + sourceW0;
            var targetX2 = targetX0 + surfaceWidth - sourceW2;
            var targetW1 = surfaceWidth - sourceW0 - sourceW2;

            var targetY0 = 0;
            var targetY1 = targetY0 + sourceH0;
            var targetY2 = targetY0 + surfaceHeight - sourceH2;
            var targetH1 = surfaceHeight - sourceH0 - sourceH2;

            //
            //             x0     x1     x2
            //          y0 +------+------+------+
            //             |      |      |      | h0
            //             |      |      |      |
            //          y1 +------+------+------+
            //             |      |      |      | h1
            //             |      |      |      |
            //          y2 +------+------+------+
            //             |      |      |      | h2
            //             |      |      |      |
            //             +------+------+------+
            //                w0     w1     w2
            //

            context.drawImage(image, sourceX0, sourceY0, sourceW0, sourceH0, targetX0, targetY0, sourceW0, sourceH0);
            context.drawImage(image, sourceX1, sourceY0, sourceW1, sourceH0, targetX1, targetY0, targetW1, sourceH0);
            context.drawImage(image, sourceX2, sourceY0, sourceW2, sourceH0, targetX2, targetY0, sourceW2, sourceH0);
            context.drawImage(image, sourceX0, sourceY1, sourceW0, sourceH1, targetX0, targetY1, sourceW0, targetH1);
            context.drawImage(image, sourceX1, sourceY1, sourceW1, sourceH1, targetX1, targetY1, targetW1, targetH1);
            context.drawImage(image, sourceX2, sourceY1, sourceW2, sourceH1, targetX2, targetY1, sourceW2, targetH1);
            context.drawImage(image, sourceX0, sourceY2, sourceW0, sourceH2, targetX0, targetY2, sourceW0, sourceH2);
            context.drawImage(image, sourceX1, sourceY2, sourceW1, sourceH2, targetX1, targetY2, targetW1, sourceH2);
            context.drawImage(image, sourceX2, sourceY2, sourceW2, sourceH2, targetX2, targetY2, sourceW2, sourceH2);
        }


        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag:(event?:Event)=>void;

        //=======================UIComponent接口实现===========================
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {
            if(this.sourceChanged){
                this.parseSource();
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                this.setMeasuredSize(bitmapData.width, bitmapData.height);
            }
            else {
                this.setMeasuredSize(0, 0);
            }

        }

        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            this.$invalidateContentBounds();
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout():void {
        }

        $uiValues:Float64Array;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        public includeInLayout:boolean;
        /**
         * 距父级容器离左边距离
         */
        public left:number;

        /**
         * 距父级容器右边距离
         */
        public right:number;

        /**
         * 距父级容器顶部距离
         */
        public top:number;

        /**
         * 距父级容器底部距离
         */
        public bottom:number;

        /**
         * 在父级容器中距水平中心位置的距离
         */
        public horizontalCenter:number;

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public verticalCenter:number;

        /**
         * 相对父级容器宽度的百分比
         */
        public percentWidth:number;

        /**
         * 相对父级容器高度的百分比
         */
        public percentHeight:number;

        /**
         * 外部显式指定的宽度
         */
        public explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        public explicitHeight:number;


        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        public minWidth:number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        public maxWidth:number;

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        public minHeight:number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        public maxHeight:number;


        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        public setMeasuredSize(width:number, height:number):void {
        }

        /**
         * 标记提交过需要延迟应用的属性
         */
        public invalidateProperties():void {
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
        }

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize(recursive?:boolean):void {
        }

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList():void {
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
        }

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
        }

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
        }

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
        }
    }

    sys.implementUIComponent(Image, lark.Bitmap);
    lark.registerClass(Image, Types.Image, [Types.UIComponent]);
    registerProperty(Image, "scale9Grid", "lark.Rectangle");
}