class Main extends lark.Sprite {

    larkIcon:lark.Bitmap;
    larkText:lark.TextField;

    constructor() {
        super();
        var text = new lark.TextField("Lark");
        text.x = 180;
        text.y = 10;
        text.fontSize = 120;
        text.fontFamily="Helvetica, Arial";
        this.addChild(text);
        this.larkText = text;

        var imageLoader = new lark.ImageLoader();
        imageLoader.once(lark.Event.COMPLETE,this.onLoaded,this);
        imageLoader.load("resources/lark.png");
    }

    private onLoaded(e:lark.Event){
        var loader:lark.ImageLoader = e.target;
        var bitmapData = loader.data;

        var bitmap = new lark.Bitmap(bitmapData);
        bitmap.x = 30;
        bitmap.y = 10;
        this.addChild(bitmap);
        this.larkIcon = bitmap;

        this.annimate();
    }

    private annimate(){

        Tween.get(this.larkText)
            .to({x:200,textColor:0x0000CC},2000,lark.Ease.cubicInOut)
            .to({x:180,textColor:0x000000},2000,lark.Ease.cubicInOut)
            .call(()=>this.annimate());
    }
}