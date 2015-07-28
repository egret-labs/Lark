/**
 * @language en_US
 * The following example uses the class BitmapExample to show how to create a Bitmap object
 */
/**
 * @language zh_CN
 * 以下示例使用 BitmapExample 类来说明如何创建一个位图对象
 */
class BitmapExample extends lark.Sprite {
    constructor() {
        super();
        var imageLoader = new lark.ImageLoader();
        imageLoader.load("http://img.lark.egret.com/lark.png");
        imageLoader.once(lark.Event.COMPLETE, this.showBitmap, this);
    }

    private showBitmap(e: lark.Event) {
        var imageLoader: lark.ImageLoader = e.target;
        var bitmap = new lark.Bitmap(imageLoader.data);
        this.addChild(bitmap);
    }
}
