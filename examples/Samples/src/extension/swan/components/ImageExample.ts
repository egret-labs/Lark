/**
 * @language en_US
 * The following example shows the general use of a Image.
 */
/**
 * @language zh_CN
 * 下面的例子显示了一个图片的常规用法。
 */
class ImageExample extends lark.Sprite {

    public constructor() {
        super();

        var image = new swan.Image();
        image.source = "resources/lark.png";
        this.addChild(image);
        image.x = 100;
        image.y = 100;
    }
}