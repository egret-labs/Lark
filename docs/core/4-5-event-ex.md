#Lark Core 编程指南 - 事件示例

示例：Alarm Clock
Alarm Clock 示例包含一个时钟，供用户指定闹铃响起的时间，还包含一个在该时间显示的消息。Alarm Clock 示例建立在 SimpleClock 应用程序的基础上，详见"处理日期和时间"Alarm Clock 阐明了使用 ActionScript 3.0 中的事件的一些方面，其中包括：

侦听和响应事件 
向侦听器通知事件 
创建自定义事件类型 
 

子主题
Alarm Clock 概述

触发闹铃

向其它代码通知闹铃

提供自定义 Alarm 事件

Alarmer 概述
在发生事情时提供通知，是创建事件的目的。Alarmer 类公开 Alarm 事件，其它对象可侦听该事件以执行所需操作。此外，Alarmer 类使用 Timer 类的实例来确定何时触发闹铃。和 Alarmer 类一样，Timer 类提供一个事件，用于在经过特定时间时通知其它对象（在本例中为 Alarmer 实例）。就像大多数 ActionScript 应用程序一样，事件构成了 Alarm Clock 范例应用程序功能的重要部分。

触发闹铃
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

向其它代码通知闹铃
和 Timer 类一样，Alarmer 类提供了一个事件，以允许其它代码在闹铃响起时收到通知。对于类而言，要使用内置于 ActionScript 中的事件处理框架，必须实现 flash.events.IEventDispatcher 接口。通常，这是通过扩展 flash.events.EventDispatcher 类（提供 IEventDispatcher 的标准实现）或 EventDispatcher 的某个子类来完成的。如前所述，Alarmer 类扩展 SimpleClock 类，SimpleClock 类扩展 Sprite 类，而 Sprite 类（通过继承链）扩展 EventDispatcher 类。所有这些意味着 Alarmer 类已经具有内置功能以提供自己的事件。

其它代码可通过调用 Alarmer 从 EventDispatcher 继承的 on() 方法进行注册，以获得 Alarmer 类的 alarm 事件的通知。当 Alarmer 实例准备通知其它代码已引发其 alarm 事件时，它会调用 dispatchEvent() 方法进行通知，该方法同样是从 EventDispatcher 继承的。

        var alarm:AlarmEvent = new AlarmEvent(this.alarmMessage);
        this.dispatchEvent(alarm);


这些代码行摘自 Alarmer 类的 alarmHandler() 方法（前面完整介绍过）。调用 Alarmer 实例的 dispatchEvent() 方法，该方法接下来通知所有注册的侦听器：已触发 Alarmer 实例的 alarm 事件。传递给 dispatchEvent() 的参数是要一直传递到侦听器方法的事件对象。在本例中，它是 AlarmEvent 类的实例，即为本示例专门创建的 Event 子类。

提供自定义 Alarm 事件
所有事件侦听器都接收一个事件对象参数，该参数提供有关要触发的特定事件的信息。在许多情况下，事件对象是 Event 类的实例。但在某些情况下，向事件侦听器提供其它信息很有用。如本章前面所述，实现该目的的一个常用方法是定义一个新类（Event 类的子类），并将该类的实例用作事件对象。在本示例中，当调度 Alarmer 类的 alarm 事件时，会将一个 AlarmEvent 实例用作事件对象。在此介绍的 AlarmEvent 类提供有关 alarm 事件的其它信息，具体来说是闹铃消息：

    import flash.events.Event;
    
    /**
     * 此自定义 Event 类向基本 Event 添加一个 message 属性。
     */
    public class AlarmEvent extends Event 
    {
        /**
         * 新 AlarmEvent 类型的名称。
         */
        public static const ALARM:String = "alarm";
        
        /**
         * 可以随该事件对象传递给事件处理函数
         * 的文本消息。
         */
        public var message:String;
        
        /**
         * 构造函数。
         * @param message 触发闹铃时显示的文本。
         */
        public function AlarmEvent(message:String = "ALARM!")
        {
            super(ALARM);
            this.message = message;
        }
        ...
    }


要创建自定义事件对象类，最好的方法是定义一个扩展 Event 类的类，如前面的示例中所示。为了补充继承的功能，AlarmEvent 类定义一个属性 message，该属性包含与事件关联的闹铃消息的文本；message 是作为 AlarmEvent 构造函数中的参数传入的。AlarmEvent 类还定义常量 ALARM，当调用 Alarmer 类的 on() 方法时，该常量可用于引用特定事件 (alarm)。