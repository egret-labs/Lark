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
        this.once(lark.Event.ADDED_TO_STAGE,this.init,this);

    }
    private progress_LTR:swan.ProgressBar;
    private progress_RTL:swan.ProgressBar;
    private progress_TTB:swan.ProgressBar;
    private progress_BTT:swan.ProgressBar;
    private init():void{
      var theme = new swan.Theme("resources/green-theme.json",this.stage);

      this.progress_LTR = new swan.ProgressBar();
      this.progress_LTR.direction = swan.Direction.LTR;
      this.progress_LTR.width = 200;
      this.addChild(this.progress_LTR);

      this.progress_RTL = new swan.ProgressBar();
      this.progress_RTL.y=50;
      this.progress_RTL.direction = swan.Direction.RTL;
      this.progress_RTL.width = 200;
      this.addChild(this.progress_RTL);

      this.progress_TTB = new swan.ProgressBar();
      this.progress_TTB.width = 60;
      this.progress_TTB.y=100;
      this.progress_TTB.direction = swan.Direction.TTB;
      this.progress_TTB.height = 200;
      this.addChild(this.progress_TTB);

      this.progress_BTT = new swan.ProgressBar();
      this.progress_BTT.width = 60;
      this.progress_BTT.x=100;
      this.progress_BTT.y=100;
      this.progress_BTT.direction = swan.Direction.BTT;
      this.progress_BTT.height = 200;
      this.addChild(this.progress_BTT);

      this.on(lark.Event.ENTER_FRAME,this.onEF,this);
    }
    private onEF():void{
      this.progress_LTR.value +=1;
      if(this.progress_LTR.value>=100) this.progress_LTR.value =0;

      this.progress_RTL.value +=1;
      if(this.progress_RTL.value>=100) this.progress_RTL.value =0;

      this.progress_TTB.value +=1;
      if(this.progress_TTB.value>=100) this.progress_TTB.value =0;

      this.progress_BTT.value +=1;
      if(this.progress_BTT.value>=100) this.progress_BTT.value =0;
    }
}
