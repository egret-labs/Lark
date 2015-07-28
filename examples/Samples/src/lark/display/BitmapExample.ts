/**
 * @language en_US
 * The following example uses the class BitmapExample to show how to create a Bitmap object and PixelHitTest
 */
/**
 * @language zh_CN
 * 以下示例使用 BitmapExample 类来说明如何创建一个位图对象,并实现像素点击
 */
class BitmapExample extends lark.Sprite {
    constructor() {
        super();
        var imageLoader = new lark.ImageLoader();
        imageLoader.load("resources/lark.png");
        imageLoader.once(lark.Event.COMPLETE, this.showBitmap, this);
    }

    private showBitmap(e: lark.Event) {
        var imageLoader: lark.ImageLoader = e.target;
        var bitmapLeft = new lark.Bitmap(imageLoader.data);
        bitmapLeft.scaleX = bitmapLeft.scaleY = 2;
        bitmapLeft.smoothing = true;
        this.addChild(bitmapLeft);

        var bitmapRight = new lark.Bitmap(imageLoader.data);
        bitmapRight.scaleX = bitmapRight.scaleY = 2;
        bitmapRight.smoothing = false;
        bitmapRight.x = 260;
        this.addChild(bitmapRight);

        var imageLoader = new lark.ImageLoader();
        imageLoader.load("image/egret.png");
        imageLoader.once(lark.Event.COMPLETE, this.showBitmap2, this);
    }
    private showBitmap2(e: lark.Event) {
        var bitmap = new lark.Bitmap(e.currentTarget.data);
        bitmap.pixelHitTest = true;
        bitmap.y = 260;
        this.addChild(bitmap);
        bitmap.on(lark.TouchEvent.TOUCH_BEGIN,this.onTouchHandler,this);
    }
    private onTouchHandler(e:lark.TouchEvent):void{
        console.log("PixelHitTest")
    }
}
