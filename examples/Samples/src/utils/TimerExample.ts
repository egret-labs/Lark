/**
 * @language en_US
 * The following example uses the class TimerExample to show how a listener method timerHandler() can be set to listen for a new TimerEvent to be dispatched. The timer is started when start() is called, and after that point, the timer events are dispatched.
 */
/**
 * @language zh_CN
 * 以下示例使用 TimerExample 类来说明如何将侦听器方法 timerHandler() 设置为侦听要调度的新 TimerEvent。计时器将在调用 start() 时启动，并且之后将调度计时器事件。
 */
class TimerExample extends lark.Sprite {

    public constructor() {
        super();
        var myTimer:lark.Timer = new lark.Timer(1000, 2);
        myTimer.on("timer", this.timerHandler, this);
        myTimer.start();
    }

    public timerHandler(event:lark.TimerEvent):void {
        console.log("timerHandler: " + event);
    }
}