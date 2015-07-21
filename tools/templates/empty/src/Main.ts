class Main extends lark.Sprite {

    public constructor() {
        super();
        var imageLoader = new lark.ImageLoader();
        imageLoader.load("http://img.lark.egret.com/lark.png");
        imageLoader.once(lark.Event.COMPLETE, this.showIcon, this);
    }

    public showIcon(e:lark.Event) {
        var imageLoader:lark.ImageLoader = e.target;
        var bitmap = new lark.Bitmap(imageLoader.data);
        var container = new lark.Sprite();
        container.addChild(bitmap);
        var text = new lark.TextField("Hello Lark");
        container.addChild(text);
        text.y = bitmap.height + 10;
        bitmap.x = (text.width-bitmap.width)*0.5;
        var stage = this.stage;
        container.x = (stage.stageWidth - bitmap.width) * 0.5;
        container.y = (stage.stageHeight - bitmap.height) * 0.5;
        this.addChild(container);
    }
}