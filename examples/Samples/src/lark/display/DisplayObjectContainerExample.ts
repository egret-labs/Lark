/**
 * @language en_US
 * The following example uses the class DisplayObjectContainerExample to show the display list
 */
/**
 * @language zh_CN
 * 以下示例使用 DisplayObjectContainerExample 类来说明显示列表的功能
 */
class DisplayObjectContainerExample extends lark.Sprite {
    constructor() {
        super();
        var imageLoader = new lark.ImageLoader();
        imageLoader.load("image/egret.png");
        imageLoader.once(lark.Event.COMPLETE, this.init, this);
    }
    private container1:lark.Sprite;
    private container2:lark.Sprite;
    private container3:lark.Sprite;
    private bmp4:lark.Bitmap;
    private bmp5:lark.Bitmap;
    private init(e: lark.Event): void {
        var bmd = e.currentTarget.data;

        this.container1 = new lark.Sprite();
        this.container2 = new lark.Sprite();

        var bmp1 = new lark.Bitmap(bmd);
        bmp1.name = "bmp1";
        var bmp2 = new lark.Bitmap(bmd);
        bmp2.x = 50;
        bmp2.name = "bmp2";

        this.container2.addChild(this.container1);
        this.container1.addChild(bmp1);//addChild
        this.container1.addChildAt(bmp2, 0);//addChildAt

        this.addChild(this.container2);

        console.log(this.container1.numChildren);//2
        console.log(this.container2.numChildren);//1
        console.log(this.container1.getChildAt(0).name);//bmp2
        console.log(this.container1.getChildAt(1).name);//bmp1

        var target = this.container1.getChildByName("bmp1");
        console.log(this.container1.getChildIndex(target));//1

        var bmp3 = new lark.Bitmap(bmd);
        bmp3.y = 100;
        this.container1.addChild(bmp3);
        bmp3.once(lark.TouchEvent.TOUCH_TAP,this.onRemoveChildAtHandler,this);

        this.container3 = new lark.Sprite();
        this.container3.y = 200;
        this.addChild(this.container3);

        this.bmp4 = new lark.Bitmap(bmd);
        this.container3.addChild(this.bmp4);
        this.bmp5 = new lark.Bitmap(bmd);
        this.bmp5.x = 80;
        this.container3.addChild(this.bmp5);
        this.bmp4.on(lark.TouchEvent.TOUCH_TAP,this.onSwapChildrenHandler,this);
        this.bmp5.on(lark.TouchEvent.TOUCH_TAP,this.onSwapChildrenAtHandler,this);
    }
    private onRemoveChildAtHandler():void{
      this.container1.removeChildAt(2);//removeChild the bmp3
    }
    private onSwapChildrenHandler():void{
      this.container3.swapChildren(this.bmp4,this.bmp5);//swap the bmp4 and bmp5
    }
    private onSwapChildrenAtHandler():void{
      this.container3.swapChildrenAt(0,1);//swap the bmp4 and bmp5
    }

}
