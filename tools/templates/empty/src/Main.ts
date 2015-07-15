

class Main extends lark.Sprite {
    constructor() {
        super();
        var text = new lark.TextField("Lark!");
        text.x = 180;
        text.y = 80;
        this.addChild(text);

        var imageLoader = new lark.ImageLoader();
        imageLoader.load("http://img.lark.egret.com/lark.png");
        imageLoader.once(lark.Event.COMPLETE, this.showIcon, this);
    }

    showIcon(e: lark.Event) {
        var imageLoader: lark.ImageLoader = e.target;
        var bitmap = new lark.Bitmap(imageLoader.data);
        bitmap.y = 70;
        bitmap.x = 120;
        this.addChild(bitmap);
    }
}