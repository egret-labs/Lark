class BlendMode extends lark.Sprite {


    constructor() {
        super();

        var imageLoader = new Loader();
        imageLoader.once(lark.Event.COMPLETE,e=>this.onLoaded(imageLoader.images),this);
        imageLoader.loadImages([
            "resources/blendMode3.png",
            "resources/blendMode.png",
            "resources/blendMode2.png",
            "resources/blendModeBG.jpg"
        ]);
    }

    private onLoaded(images:any){

        var larkBitmapData = images["resources/blendMode3.png"];
        var larkOrangeBitmapData = images["resources/blendMode.png"];
        var larkGrayBitmapData = images["resources/blendMode2.png"];
        var bgBitmapData = images["resources/blendModeBG.jpg"];


        var bgBmp = new lark.Bitmap(bgBitmapData);
        this.addChild(bgBmp);


        var modes = [
            lark.BlendMode.NORMAL,
            lark.BlendMode.ADD,
            lark.BlendMode.ERASE
        ];

        var icons = [
            larkOrangeBitmapData,
            larkGrayBitmapData,
            larkBitmapData
        ];

        modes.forEach((mode,i)=>{
            var modeText = new lark.TextField(mode.toUpperCase());
            modeText.x = 100 + 100*i;
            modeText.y = 50;
            modeText.textColor = 0xFFFFFF;
            this.addChild(modeText);
            icons.forEach((image,j)=>{
                var bmp = new lark.Bitmap(image);
                bmp.blendMode = mode;
                bmp.y = 100 + 150*j;
                bmp.x = 100 + 100*i;
                bmp.width = 64;
                bmp.height = 64;
                this.addChild(bmp);
            });
        });
    }
}