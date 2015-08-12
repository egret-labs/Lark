/**
 * @language en_US
 * TThe following example uses the TextureExample class to illustrate how to get a frame from a SpriteSheet bitmap.
 */
/**
 * @language zh_CN
 * 以下示例使用 TextureExample 类来说明如何从一个 SpriteSheet 位图中获取一帧。
 */
class TextureExample extends lark.Sprite {
    constructor() {
        super();

        var loader = new lark.ImageLoader();
        loader.on(lark.Event.COMPLETE, this.loadImageComplete, this);
        loader.load("resources/tree.png");
    }

    private loadImageComplete(e:lark.Event):void {
        var loader:lark.ImageLoader = e.currentTarget;
        var bitmapData = loader.data;
        this.addChild(new lark.Bitmap(bitmapData));

        var treeTexture = new lark.Texture(bitmapData, 0, 0, 97, 131);
        var tree = new lark.Bitmap(treeTexture);
        this.addChild(tree);
        tree.y = 300;
    }
}
