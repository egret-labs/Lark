/**
 * @language en_US
 * The following example uses the class Stage to show how to change the scale mode
 */
/**
 * @language zh_CN
 * 以下示例使用 Stage 类来演示如何修改舞台的缩放模式
 */
class Stage extends lark.Sprite {
    constructor() {
        super();
        //设定舞台的缩放模式,循环使用
        this.typeModes = [lark.StageScaleMode.SHOW_ALL, lark.StageScaleMode.FIXED_WIDTH, lark.StageScaleMode.FIXED_HEIGHT
            , lark.StageScaleMode.EXACT_FIT, lark.StageScaleMode.NO_SCALE
        ];

        var imageLoader = new lark.ImageLoader();
        imageLoader.load("http://img.lark.egret.com/lark.png");
        imageLoader.once(lark.Event.COMPLETE, this.showBitmap, this);
    }

    private showBitmap(e: lark.Event) {
        var imageLoader: lark.ImageLoader = e.target;
        var bitmap = new lark.Bitmap(imageLoader.data);
        this.addChild(bitmap);

        this.txt = new lark.TextField();
        this.txt.y = 200;
        this.addChild(this.txt);
        this.onResizeHandler();
        //点击舞台，改变舞台缩放模式
        this.stage.on(lark.TouchEvent.TOUCH_TAP, this.changeStageMode, this);
        //监听舞台调整大小
        this.stage.on(lark.Event.RESIZE, this.onResizeHandler, this);
    }

    private txt: lark.TextField;
    private idxMode: number = 0;
    private typeModes: string[];
    //改变舞台缩放模式
    private changeStageMode(): void {
        this.idxMode += 1;
        if (this.idxMode >= this.typeModes.length) this.idxMode = 0;
        this.stage.scaleMode = this.typeModes[this.idxMode];
        console.log(this.idxMode, this.typeModes[this.idxMode]);
    }
    //显示舞台调整后的大小
    private onResizeHandler(): void {
        console.log(333, this.idxMode, this.typeModes[this.idxMode]);
        this.txt.text = this.typeModes[this.idxMode] + ":" + this.stage.stageWidth.toString() + ";" + this.stage.stageHeight.toString();
    }
}
