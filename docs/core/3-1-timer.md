#Lark Core 编程指南 - 控制时间间隔

##循环与计时器之比较

在某些编程语言中，使用循环语句（如 for 或 do..while）来作为定时触发方案。

通常，循环语句会以本地计算机所允许的速度尽可能快地执行，而应用程序在每台计算机上的运行速度是不同的，也就会导致触发的时间间隔是不稳定的。如果应用程序需要以相同的时间间隔触发，则需要将其与实际时钟时间联系在一起。许多应用程序（如游戏和缓动动画）都需要有一个在不同计算机上均能保持一致的定时驱动机制。

Lark 的 Timer 类提供了一个功能强大的解决方案。使用 Lark 事件模型，Timer 类在每次达到指定的时间间隔时都会调度计时器事件。

##Timer 类

在 Lark 中处理计时函数的首选方式是使用 Timer 类 (lark.Timer)，可以使用它在每次达到间隔时调度事件。

要启动计时器，请先创建 Timer 类的实例，并告诉它每隔多长时间生成一次计时器事件以及在停止前生成多少次事件。

例如，下列代码创建一个每秒调度一个事件且持续 60 秒的 Timer 实例：

``` TypeScript
var oneMinuteTimer = new lark.Timer(1000, 60);
```

Timer 对象在每次达到指定的间隔时都会调度 TimerEvent 对象。TimerEvent 对象的事件类型是 "timer"（通常使用常量 TimerEvent.TIMER）。TimerEvent 对象包含的属性与标准 Event 对象包含的属性相同。

如果将 Timer 实例设置为固定的间隔数，则在达到最后一次间隔时，它还会调度 "timerComplete" 事件（由常量 TimerEvent.TIMER_COMPLETE 定义）。

以下是一个用来展示 Timer 类实际操作的小示例应用程序：

``` TypeScript
class Main extends lark.Sprite {
    constructor() {
        super();
        var sh = new ShortTimer();
    }   
}
class ShortTimer extends lark.Sprite {
    public constructor() {
        super();
        // 创建一个时间间隔1秒持续5次的计时器
        var minuteTimer:lark.Timer = new lark.Timer(1000, 5);

        // 添加间隔触发和计时完成的事件监听
        minuteTimer.on(lark.TimerEvent.TIMER, this.onTick, this);
        minuteTimer.on(lark.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);

        // 启动计时器
        minuteTimer.start();
    }

    public onTick(event:lark.TimerEvent):void {
        // 输出当前的触发次数，event的target属性就是计时器本身
        lark.log("tick " + event.target.currentCount);
    }

    public onTimerComplete(event:lark.TimerEvent):void {
        lark.log("Time's Up!");
    }
} 
```
创建 ShortTimer 类时，会创建一个用于每秒计时一次并持续五秒的 Timer 实例。然后在计时器上添加两个事件监听：一个用于监听每次计时，另一个用于监听 "timerComplete" 事件。

接着，启动计数器计时，并从此时起以一秒钟的间隔回调 onTick() 方法。

onTick() 方法里会输出当前的触发计数。五秒钟后，执行 onTimerComplete() 方法，告诉您时间已到。

运行该示例时，您应会在控制台看到下列行以每秒一行的速度输出：

```
tick 1 
tick 2 
tick 3 
tick 4 
tick 5 
Time's Up!
```
