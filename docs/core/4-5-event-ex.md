#Lark Core 编程指南 - 事件示例

示例：Alarm Clock
Alarm Clock 示例包含一个时钟，供用户指定闹铃响起的时间，还包含一个在该时间显示的消息。Alarm Clock 示例建立在 SimpleClock 应用程序的基础上，详见"处理日期和时间"Alarm Clock 阐明了使用 ActionScript 3.0 中的事件的一些方面，其中包括：

侦听和响应事件 
向侦听器通知事件 
创建自定义事件类型 
要获取该范例的应用程序文件，请访问 www.adobe.com/go/learn_programmingAS3samples_flash_cn。可以在 Samples/AlarmClock 文件夹中找到 Alarm Clock 应用程序文件。该应用程序包括以下文件：

文件
 说明
 
AlarmClockApp.mxml

或

AlarmClockApp.fla
 Flash 或 Flex 中的主应用程序文件（分别为 FLA 和 MXML）。
 
com/example/programmingas3/clock/AlarmClock.as
 一个扩展 SimpleClock 类的类，添加了闹钟功能。
 
com/example/programmingas3/clock/AlarmEvent.as
 自定义事件类（flash.events.Event 的子类），用作 AlarmClock 类的 alarm 事件的事件对象。
 
com/example/programmingas3/clock/AnalogClockFace.as
 绘制一个圆的时钟形状以及基于时间的时针、分针和秒针（如 SimpleClock 示例中所述）。
 
com/example/programmingas3/clock/SimpleClock.as
 具有简单走时功能的时钟界面组件（如 SimpleClock 示例中所述）。
 

子主题
Alarm Clock 概述

触发闹铃

向其它代码通知闹铃

提供自定义 Alarm 事件

Alarm Clock 概述
在本示例中，时钟的主要功能（包括跟踪时间和显示时钟形状）重复使用 SimpleClock 应用程序代码，详见"示例：简单的模拟时钟"。AlarmClock 类添加了闹钟所需的功能（包括设置闹铃时间和在闹铃响起时显示通知），从而扩展了该示例中的 SimpleClock 类。

在发生事情时提供通知，是创建事件的目的。AlarmClock 类公开 Alarm 事件，其它对象可侦听该事件以执行所需操作。此外，AlarmClock 类使用 Timer 类的实例来确定何时触发闹铃。和 AlarmClock 类一样，Timer 类提供一个事件，用于在经过特定时间时通知其它对象（在本例中为 AlarmClock 实例）。就像大多数 ActionScript 应用程序一样，事件构成了 Alarm Clock 范例应用程序功能的重要部分。

触发闹铃
如前所述，AlarmClock 类实际提供的唯一功能与设置和触发闹铃有关。内置的 Timer 类 (flash.utils.Timer) 为开发人员提供了定义要在指定时间之后执行的代码的方法。AlarmClock 类使用 Timer 实例来确定何时触发闹铃。

    import flash.events.TimerEvent;
    import flash.utils.Timer;

    /**
     * 将用于闹铃的 Timer。
     */
    public var alarmTimer:Timer;
    ...
    /**
     * 实例化指定大小的新 AlarmClock。
     */
    public override function initClock(faceSize:Number = 200):void
    {
        super.initClock(faceSize);
        alarmTimer = new Timer(0, 1);
        alarmTimer.addEventListener(TimerEvent.TIMER, onAlarm);
    }


AlarmClock 类中定义的 Timer 实例被命名为 alarmTimer。initClock() 方法执行 AlarmClock 实例的所需设置操作，使用 alarmTimer 变量执行两个任务。首先，使用指示 Timer 实例等待 0 毫秒且仅触发其 timer 事件一次的参数实例化变量。实例化 alarmTimer 后，代码调用变量的 addEventListener() 方法，指示它要监听该变量的 timer 事件。Timer 实例的工作方式是：在经过指定时间后调度其 timer 事件。AlarmClock 类需要了解何时调度 timer 事件，以便触发自己的闹铃。通过调用 addEventListener()，AlarmClock 代码将自身作为侦听器在 alarmTimer 中进行注册。两个参数指示 AlarmClock 类要侦听 timer 事件（由常量 TimerEvent.TIMER 指示），并且当事件发生时，应调用 AlarmClock 类的 onAlarm() 方法以响应事件。

为了实际设置闹铃，代码调用了 AlarmClock 类的 setAlarm() 方法，如下所示： 

    /**
     * 设置应触发闹铃的时间。
     * @param hour 闹铃时间的小时部分。
     * @param minutes 闹铃时间的分钟部分。
     * @param message 触发闹铃时显示的消息。
     * @return 将触发闹铃的时间。
     */
    public function setAlarm(hour:Number = 0, minutes:Number = 0, message:String = "Alarm!"):Date
    {
        this.alarmMessage = message;
        var now:Date = new Date();
        // 将此时间作为今天的某个时间来创建。
        alarmTime = new Date(now.fullYear, now.month, now.date, hour, minutes);

        // 确定指定的时间是否在今天之后。
        if (alarmTime <= now)
        {
            alarmTime.setTime(alarmTime.time + MILLISECONDS_PER_DAY);
        }
    
        // 如果当前设置了闹铃计时器，则将其停止。
        alarmTimer.reset();
        // 计算过多少毫秒后，才会触发
        // 闹铃（闹铃时间和当前时间之差），并将该值
        // 设置为闹铃计时器的延时。
        alarmTimer.delay = Math.max(1000, alarmTime.time - now.time);
        alarmTimer.start();
    
        return alarmTime;
    }


此方法执行了几项操作，包括存储闹铃消息和创建一个 Date 对象 (alarmTime)，该对象表示触发闹铃的实际时间。在该方法的最后几行中，与当前讨论最相关的操作是设置和激活了 alarmTimer 变量的计时器。首先，调用其 reset() 方法，如果计时器已运行，则将其停止并进行重置。接下来，从 alarmTime 变量值中减去当前时间（由 now 变量表示），以确定需要经过多少毫秒后才会触发闹铃。Timer 类并不会在某个绝对时间触发其 timer 事件，因此，分配给 alarmTimer 的 delay 属性的是该相对时间差。最后，调用 start() 方法以实际启动计时器。

一旦经过指定时间，alarmTimer 将调度 timer 事件。由于 AlarmClock 类已将其 onAlarm() 方法注册为该事件的侦听器，因此发生 timer 事件时，将调用 onAlarm()。

    /**
     * 调度 timer 事件时调用。
     */
    public function onAlarm(event:TimerEvent):void 
    {
        trace("Alarm!");
        var alarm:AlarmEvent = new AlarmEvent(this.alarmMessage);
        this.dispatchEvent(alarm);
    }


注册为事件侦听器的方法必须使用适当的签名（即，方法的参数集和返回类型）来定义。要侦听 Timer 类的 timer 事件，方法必须定义一个数据类型为 TimerEvent (flash.events.TimerEvent) 的参数，该参数是 Event 类的子类。当 Timer 实例调用其事件侦听器时，会传递一个 TimerEvent 实例作为事件对象。

向其它代码通知闹铃
和 Timer 类一样，AlarmClock 类提供了一个事件，以允许其它代码在闹铃响起时收到通知。对于类而言，要使用内置于 ActionScript 中的事件处理框架，必须实现 flash.events.IEventDispatcher 接口。通常，这是通过扩展 flash.events.EventDispatcher 类（提供 IEventDispatcher 的标准实现）或 EventDispatcher 的某个子类来完成的。如前所述，AlarmClock 类扩展 SimpleClock 类，SimpleClock 类扩展 Sprite 类，而 Sprite 类（通过继承链）扩展 EventDispatcher 类。所有这些意味着 AlarmClock 类已经具有内置功能以提供自己的事件。

其它代码可通过调用 AlarmClock 从 EventDispatcher 继承的 addEventListener() 方法进行注册，以获得 AlarmClock 类的 alarm 事件的通知。当 AlarmClock 实例准备通知其它代码已引发其 alarm 事件时，它会调用 dispatchEvent() 方法进行通知，该方法同样是从 EventDispatcher 继承的。

        var alarm:AlarmEvent = new AlarmEvent(this.alarmMessage);
        this.dispatchEvent(alarm);


这些代码行摘自 AlarmClock 类的 onAlarm() 方法（前面完整介绍过）。调用 AlarmClock 实例的 dispatchEvent() 方法，该方法接下来通知所有注册的侦听器：已触发 AlarmClock 实例的 alarm 事件。传递给 dispatchEvent() 的参数是要一直传递到侦听器方法的事件对象。在本例中，它是 AlarmEvent 类的实例，即为本示例专门创建的 Event 子类。

提供自定义 Alarm 事件
所有事件侦听器都接收一个事件对象参数，该参数提供有关要触发的特定事件的信息。在许多情况下，事件对象是 Event 类的实例。但在某些情况下，向事件侦听器提供其它信息很有用。如本章前面所述，实现该目的的一个常用方法是定义一个新类（Event 类的子类），并将该类的实例用作事件对象。在本示例中，当调度 AlarmClock 类的 alarm 事件时，会将一个 AlarmEvent 实例用作事件对象。在此介绍的 AlarmEvent 类提供有关 alarm 事件的其它信息，具体来说是闹铃消息：

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


要创建自定义事件对象类，最好的方法是定义一个扩展 Event 类的类，如前面的示例中所示。为了补充继承的功能，AlarmEvent 类定义一个属性 message，该属性包含与事件关联的闹铃消息的文本；message 是作为 AlarmEvent 构造函数中的参数传入的。AlarmEvent 类还定义常量 ALARM，当调用 AlarmClock 类的 addEventListener() 方法时，该常量可用于引用特定事件 (alarm)。

除了添加自定义功能外，作为 ActionScript 事件处理框架的一部分，每个 Event 子类还必须覆盖继承的 clone() 方法。Event 子类还可以选择性地覆盖继承的 toString() 方法，以便在调用 toString() 方法时返回的值中包括自定义事件的属性。

    /**
     * 创建并返回当前实例的副本。
     * @return 当前实例的副本。
     */
    public override function clone():Event
    {
        return new AlarmEvent(message);
    }
    
    /**
     * 返回包含当前实例的所有属性的
     * 字符串。
     * @return 当前实例的字符串表示形式。
     */
    public override function toString():String
    {
        return formatToString("AlarmEvent", "type", "bubbles", "cancelable", "eventPhase", "message");
    }


被覆盖的 clone() 方法需要返回自定义 Event 子类的新实例，并且设置了所有自定义属性以匹配当前实例。在被覆盖的 toString() 方法中，实用程序方法 formatToString()（从 Event 继承）用于提供一个字符串，包括自定义类型的名称以及所有属性的名称和值。
