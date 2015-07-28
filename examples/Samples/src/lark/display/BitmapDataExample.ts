/**
 * @language en_US
 * The following example uses the class BitmapDataExample to show how to create a Bitmap object
 */
/**
 * @language zh_CN
 * 以下示例使用 BitmapDataExample 类来说明如何创建一个位图对象
 */
class BitmapDataExample extends lark.Sprite {
    constructor() {
        super();
        var imageLoader = new lark.ImageLoader();
        imageLoader.load("resources/lark.png");
        imageLoader.once(lark.Event.COMPLETE, this.showBitmap, this);
    }

    private showBitmap(e: lark.Event) {
        var imageLoader: lark.ImageLoader = e.target;
        var bitmapdata = imageLoader.data;
        var bitmap = new lark.Bitmap();
        bitmap.bitmapData = bitmapdata;
        this.addChild(bitmap);
    }
}
