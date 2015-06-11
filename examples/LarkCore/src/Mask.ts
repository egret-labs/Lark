class Mask extends lark.Sprite {

    mask:lark.Sprite;
    productBmp:lark.Bitmap;

    constructor() {
        super();

        var imageLoader = new Loader();
        imageLoader.once(lark.Event.COMPLETE,e=>this.onLoaded(imageLoader.images),this);
        imageLoader.loadImages([
            "resources/mask.png",
            "resources/products.png"
        ]);
    }

    private onLoaded(images:any){

        var larkBitmapData = images["resources/mask.png"];
        var productsBitmapData = images["resources/products.png"];

        var productBmp = new lark.Bitmap(productsBitmapData);
        this.addChild(productBmp);

        var larkBmp = new lark.Bitmap(larkBitmapData);
        larkBmp.x = -larkBmp.width /2;
        larkBmp.y = -larkBmp.height /2;
        var mask = new lark.Sprite();
        mask.width = 0;
        mask.height = 0;
        mask.addChild(larkBmp);
        this.addChild(mask);

        productBmp.mask = mask;

        this.mask = mask;
        this.productBmp = productBmp;
        this.annimate();
    }

    private annimate(){

        Tween.get(this.mask)
            .to({rotation:360,x:600,y:300},2000,lark.Ease.cubicInOut)
            .to({rotation:360,x:150,y:200},2000,lark.Ease.cubicInOut)
            .call(()=>this.annimate());
    }
}