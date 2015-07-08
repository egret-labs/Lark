class Dirty extends lark.Sprite {

    icons:lark.Bitmap[] = [];

    constructor() {
        super();

        var imageLoader = new Loader();
        imageLoader.once(lark.Event.COMPLETE,e=>this.onLoaded(imageLoader.images),this);
        imageLoader.loadImages([
            "resources/lark.png",
            "resources/blendModeBG.jpg"
        ]);
    }

    private onLoaded(images:any){

        var larkBitmapData = images["resources/lark.png"];
        var productsBitmapData = images["resources/blendModeBG.jpg"];

        var productBmp = new lark.Bitmap(productsBitmapData);
        this.addChild(productBmp);

        for(var i=0;i<3;i++){

            var bmp = new lark.Bitmap(larkBitmapData);
            bmp.y = 200;
            bmp.x = 100 + 100*i;
            bmp.height = 50;
            bmp.width = 50;
            bmp.rotation = 120*i;
            this.addChild(bmp);
            this.icons.push(bmp);
        }

        this.on(lark.Event.ENTER_FRAME,this.annimate,this);
    }

    private annimate(){
        this.icons.forEach(icon=>icon.rotation+=2);
    }
}