/**
 * @language en_US
 * The following example uses the TimerExample class to show how a listener method timerHandler() can be instantiated and set to listen for a new TimerEvent to be dispatched, which happens when the Timer's start() method is called.
 */
/**
 * @language zh_CN
 * 以下示例使用 TimerExample 类来说明如何能将侦听器方法 timerHandler() 实例化并设置为侦听要调度的新 TimerEvent（在调用 Timer 的 start() 方法时发生）。
 */
class TimerEventExample extends lark.Sprite {

    public constructor() {
        super();
        var myTimer = new lark.Timer(1000, 2);
        myTimer.on(lark.TimerEvent.TIMER, this.timerHandler, this);
        myTimer.start();
    }

    public timerHandler(event:lark.TimerEvent):void {
        console.log("timerHandler: " + event);
    }
}