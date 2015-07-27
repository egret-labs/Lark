/**
 * @language en_US
 * The following example uses the lark.ImageLoader class to load a picture.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.ImageLoader 类加载图片。
 */
class ImageLoaderExample extends lark.Sprite {

    public constructor() {
        super();
        var imageLoader:lark.ImageLoader = new lark.ImageLoader();
        imageLoader.on(lark.Event.COMPLETE,this.loadCompleteHandler,this);
        imageLoader.load("image/egret.png");
    }

    private loadCompleteHandler(event:lark.Event):void {
        var imageLoader = <lark.ImageLoader>event.currentTarget;
        var bitmap:lark.Bitmap = new lark.Bitmap(imageLoader.data);
        this.addChild(bitmap);
    }

}