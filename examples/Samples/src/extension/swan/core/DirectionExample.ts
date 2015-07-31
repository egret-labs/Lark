/**
 * @language en_US
 * The following example uses the class DirectionExample to control the progressbar’s move direction
 */
/**
 * @language zh_CN
 * 以下示例使用 DirectionExample 类来控制进度条增长方向
 */
class DirectionExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);

    }
    private progress_LTR: swan.ProgressBar;
    private progress_RTL: swan.ProgressBar;
    private progress_TTB: swan.ProgressBar;
    private progress_BTT: swan.ProgressBar;
    private init(): void {
        this.progress_LTR = this.getProgressBar();
        this.progress_LTR.direction = swan.Direction.LTR;
        this.progress_LTR.width = 200;
        this.addChild(this.progress_LTR);

        this.progress_RTL = this.getProgressBar();
        this.progress_RTL.y = 50;
        this.progress_RTL.direction = swan.Direction.RTL;
        this.progress_RTL.width = 200;
        this.addChild(this.progress_RTL);

        this.progress_TTB = this.getProgressBar();
        this.progress_TTB.width = 60;
        this.progress_TTB.y = 100;
        this.progress_TTB.direction = swan.Direction.TTB;
        this.progress_TTB.height = 200;
        this.addChild(this.progress_TTB);

        this.progress_BTT = this.getProgressBar();
        this.progress_BTT.width = 60;
        this.progress_BTT.x = 100;
        this.progress_BTT.y = 100;
        this.progress_BTT.direction = swan.Direction.BTT;
        this.progress_BTT.height = 200;
        this.addChild(this.progress_BTT);

        this.on(lark.Event.ENTER_FRAME, this.onEF, this);
    }
    private onEF(): void {
        this.progress_LTR.value += 1;
        if (this.progress_LTR.value >= 100) this.progress_LTR.value = 0;

        this.progress_RTL.value += 1;
        if (this.progress_RTL.value >= 100) this.progress_RTL.value = 0;

        this.progress_TTB.value += 1;
        if (this.progress_TTB.value >= 100) this.progress_TTB.value = 0;

        this.progress_BTT.value += 1;
        if (this.progress_BTT.value >= 100) this.progress_BTT.value = 0;
        //this.getProgressBar();
    }
    private getProgressBar(): swan.ProgressBar {
        var exml =
        `<s:Skin class="skins.ProgressBarSkin" xmlns:s="http://ns.egret.com/swan" minWidth="30" minHeight="18">
            <s:Image source="resources/track.png" scale9Grid="1,1,4,4" width="100%" height="100%" verticalCenter="0"/>
            <s:Image id="thumb" height="100%" width="100%" source="resources/thumb.png"/>
            <s:Label id="labelDisplay" textAlign="center" verticalAlign="middle" fontSize="15" fontFamily="Tahoma" textColor="0x707070" horizontalCenter="0" verticalCenter="0"/>
        </s:Skin>`;
        var clazz = EXML.parse(exml);
        var bar = new swan.ProgressBar();
        bar.skinName = "skins.ProgressBarSkin";
        return bar;
    }
}
