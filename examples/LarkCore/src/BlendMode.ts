class BlendMode extends lark.Sprite {


    constructor() {
        super();

        var imageLoader = new Loader();
        imageLoader.once(lark.Event.COMPLETE,e=>this.onLoaded(imageLoader.images),this);
        imageLoader.loadImages([
            "resources/lark.png",
            "resources/products.png"
        ]);
    }

    private onLoaded(images:any){

        var larkBitmapData = images["resources/lark.png"];
        var productsBitmapData = images["resources/products.png"];

        var productBmp = new lark.Bitmap(productsBitmapData);
        this.addChild(productBmp);

        var modes = [
            lark.BlendMode.NORMAL,
            lark.BlendMode.ADD,
            lark.BlendMode.ERASE
        ];

        modes.forEach((mode,i)=>{
            var bmp = new lark.Bitmap(larkBitmapData);
            bmp.blendMode = mode;
            bmp.y = 100;
            bmp.x = 50 + 200*i;
            bmp.alpha = 0.7;
            this.addChild(bmp);
        });

        modes.forEach((mode,i)=>{
            var bmp = new lark.Bitmap(larkBitmapData);
            bmp.blendMode = mode;
            bmp.y = 300;
            bmp.x = 50 + 200*i;
            this.addChild(bmp);
        });
    }
}