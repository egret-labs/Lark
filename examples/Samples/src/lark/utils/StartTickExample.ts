/**
 * @language en_US
 * The following example uses the class StartTickExample to show how to create a ticker, and stop it when the time is bigger than 3 second.
 */
/**
 * @language zh_CN
 * 以下示例使用 StartTickExample 类来说明如何启动一个计时器，并且在计时器运行超过3秒的时候停止它。
 */
class StartTickExample extends lark.Sprite {

    public constructor() {
        super();
        lark.startTick(this.onTick, this);
    }

    private onTick(timeStamp:number):boolean {
        console.log(timeStamp);
        if(timeStamp > 3000)
        {
            lark.stopTick(this.onTick,this);
        }
        return true;
    }
}