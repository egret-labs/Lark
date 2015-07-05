#Lark Core 编程指南 - 事件示例：Alarmer

#### Alarmer 概述
本示例用一个极简单的定时提醒器来展现如何派发和处理事件。   
在发生事情时提供通知，是创建事件的目的。Alarmer 类公开 Alarm 事件，其它对象可侦听该事件以执行所需操作。此外，Alarmer 类使用 Timer 类的实例来确定何时触发闹铃。和 Alarmer 类一样，Timer 类提供一个事件，用于在经过特定时间时通知其它对象（在本例中为 Alarmer 实例）。就像大多数 ActionScript 应用程序一样，事件构成了 Alarm Clock 范例应用程序功能的重要部分。

#### 触发闹铃
如前所述，Alarmer 类实际提供的唯一功能与设置和触发闹铃有关。内置的 Timer 类 (flash.utils.Timer) 为开发人员提供了定义要在指定时间之后执行的代码的方法。Alarmer 类使用 Timer 实例来确定何时触发闹铃。

``` TypeScript
// 将用于闹铃的 Timer。
public var alarmTimer:Timer;

// 实例化指定大小的新 Alarmer。
public initClock( ):void{
    this.alarmTimer = new Timer(0, 1);
    this.alarmTimer.on( TimerEvent.TIMER, alarmHandler );
}
```

Alarmer 类中定义的 Timer 实例被命名为 alarmTimer。initClock() 方法执行 Alarmer 实例的所需设置操作，使用 alarmTimer 变量执行两个任务。首先，使用指示 Timer 实例等待 0 毫秒且仅触发其 timer 事件一次的参数实例化变量。实例化 alarmTimer 后，代码调用变量的 on() 方法，指示它要监听该变量的 timer 事件。Timer 实例的工作方式是：在经过指定时间后调度其 timer 事件。Alarmer 类需要了解何时调度 timer 事件，以便触发自己的闹铃。通过调用 on()，Alarmer 代码将自身作为侦听器在 alarmTimer 中进行注册。两个参数指示 Alarmer 类要侦听 timer 事件（由常量 TimerEvent.TIMER 指示），并且当事件发生时，应调用 Alarmer 类的 alarmHandler() 方法以响应事件。

为了实际设置闹铃，代码调用了 Alarmer 类的 setAlarm() 方法，如下所示： 
```
public setAlarm( sec:number = 0 ):void{
    // 如果当前设置了闹铃计时器，则将其停止。
    this.alarmTimer.reset();
    
    // 计算过多少毫秒后，才会触发
    // 闹铃（闹铃时间和当前时间之差），并将该值
    // 设置为闹铃计时器的延时。
    this.alarmTimer.delay = Math.max(1000, sec * 1000 );
    this.alarmTimer.start();
}
```

此方法简单的设置从被调用开始需要经过多少秒后会触发闹铃。该方法首先调用其 reset() 方法，如果计时器已运行，则将其停止并进行重置。接下来设定延迟间隔，将秒数换算为毫秒数。最后，调用 start() 方法以实际启动计时器。

一旦经过指定时间，alarmTimer 将调度 timer 事件。由于 Alarmer 类已将其 alarmHandler() 方法注册为该事件的侦听器，因此发生 timer 事件时，将调用 alarmHandler()。

```
 // 调度 timer 事件时调用。
public  alarmHandler( event:TimerEvent ):void{
    trace("Alarm!");
    var event = Event.create( "alarm", false);
    event.data = data;  //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
    this.emit(event);
    Event.release(event);
}
```

注册为事件侦听器的方法必须使用适当的签名（即，方法的参数集和返回类型）来定义。要侦听 Timer 类的 timer 事件，方法必须定义一个数据类型为 TimerEvent ( lark.TimerEvent ) 的参数，该参数是 Event 类的子类。当 Timer 实例调用其事件侦听器时，会传递一个 TimerEvent 实例作为事件对象。
