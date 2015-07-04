#Lark Core 编程指南 - 事件侦听器

事件侦听器也称为事件处理函数，是 Lark 为响应特定事件而执行的函数。添加事件侦听器的过程分为两步。首先，为 Lark 创建一个为响应事件而执行的函数或类方法。这有时称为侦听器函数或事件处理函数。然后，使用 on() 方法，在事件的目标或位于适当事件流上的任何显示列表对象中注册侦听器函数。 

子主题   
[创建侦听器函数](#event-listener)   
[管理事件侦听器](#event-manage)   
[没有侦听器的错误事件](#event-unhandled)   


<a name="event-listener"/>

##### 创建侦听器函数
创建侦听器函数是 Lark 事件模型与 DOM 事件模型不同的一个方面。在 DOM 事件模型中，事件侦听器和侦听器函数之间有一个明显的不同：即事件侦听器是实现 EventListener 接口的类的实例，而侦听器是该类的名为 handleEvent() 的方法。在 DOM 事件模型中，您注册的是包含侦听器函数的类实例，而不是实际的侦听器函数。 

在 Lark 事件模型中，事件侦听器和侦听器函数之间没有区别。Lark 没有 EventListener 接口，侦听器函数可以在类外部定义，也可以定义为类的一部分。此外，无需将侦听器函数命名为 handleEvent() ─ 可以将它们命名为任何有效的标识符。在 Lark 中，您注册的是实际侦听器函数的名称。

##### 定义为类方法的侦听器函数
下面的示例与前面定义 ClickExample 类的示例相同，只是将 touchHandler() 函数定义为 ChildSprite 类的方法： 

```
public class ClickExample extends Sprite {
     public function ClickExample() {
         var child:ChildSprite = new ChildSprite();
         addChild(child);
     }
}
```
```
class ChildSprite extends Sprite{
    public function ChildSprite() {
        this.graphics.beginFill(0xFF0000);
        this.graphics.drawRect(0,0,100,100);
        this.graphics.endFill();
        on(TouchEvent.TOUCH_TAP, touchHandler);
    }
    private function touchHandler(event:TouchEvent):void{
        trace("touchHandler detected an event of type: " + event.type);
        trace("the this keyword refers to: " + this);
    }
}
```

当用户通过单击红色正方形与生成的 Lark应用交互时，Lark 生成以下跟踪输出：

touchHandler detected an event of type: click
the this keyword refers to: [object ChildSprite]


请注意，this 关键字引用名为 child 的 ChildSprite 实例。 Lark 在调用 on() 时会创建一个绑定方法。这样，this 关键字引用名为 child 的 ChildSprite 实例，且程序员可以访问 ChildSprite 类的其它方法和属性。

<a name="event-manage"/>

#### 管理事件侦听器
使用 IEventEmitter 接口的方法来管理侦听器函数。IEventEmitter 接口是 ActionScript 3.0 版本的 DOM 事件模型的 EventTarget 接口。虽然名称 IEventEmitter 似乎暗示着其主要用途是发送（调度）事件对象，但该类的方法实际上更多用于注册、检查和删除事件侦听器。IEventEmitter 接口定义五个方法，如以下代码中所示：
```
module lark {
    export interface IEventEmitter extends LarkObject{
    
        on(type:string
            , listener:(event:Event)=>void
            , thisObject:any
            , useCapture?:boolean
            , priority?:number):void;
            
        removeListener(type:string
            , listener:(event:Event)=>void
            , thisObject:any
            , useCapture?:boolean):void;

        emit(event:Event):boolean;

        hasListener(type:string):boolean;
        willTrigger(type:string):boolean;
    }
}
```

Lark API 使用 EventDispatcher 类来实现 IEventEmitter 接口，该类用作可以是事件目标或事件流一部分的所有类的基类。例如，DisplayObject 类继承自 EventDispatcher 类。这意味着，显示列表中的所有对象都可以访问 IEventEmitter 接口的方法。

##### 添加事件侦听器
on() 方法是 IEventEmitter 接口的主要函数。使用它来注册侦听器函数。两个必需的参数是 type 和 listener。type 参数用于指定事件的类型。listener 参数用于指定发生事件时将执行的侦听器函数。listener 参数可以是对函数或类方法的引用。

注意
 
 指定 listener 参数时，不要使用括号。例如，在下面的 on() 方法调用中，指定 touchHandler() 函数时没有使用括号：
on(TouchEvent.TOUCH_TAP, touchHandler)。 
 

通过使用 on() 方法的 useCapture 参数，可以控制侦听器将处于活动状态的事件流阶段。如果 useCapture 设置为 true，侦听器将在事件流的捕获阶段成为活动状态。如果 useCapture 设置为 false，侦听器将在事件流的目标阶段和冒泡阶段处于活动状态。要在事件流的所有阶段侦听某一事件，您必须调用 on() 两次，第一次调用时将 useCapture 设置为 true，第二次调用时将 useCapture 设置为 false。

on() 方法的 priority 参数并不是 DOM Level 3 事件模型的正式部分。ActionScript 3.0 中包括它是为了在组织事件侦听器时提供更大的灵活性。调用 on() 时，可以将一个整数值作为 priority 参数传递，以设置该事件侦听器的优先级。默认值为 0，但您可以将它设置为负整数值或正整数值。将优先执行此数字较大的事件侦听器。对于具有相同优先级的事件侦听器，则按它们的添加顺序执行，因此将优先执行较早添加的侦听器。 

可以使用 useWeakReference 参数来指定对侦听器函数的引用是弱引用还是正常引用。通过将此参数设置为 true，可避免侦听器函数在不再需要时仍然存在于内存中的情况。Lark 使用一项称为"垃圾回收"的技术从内存中清除不再使用的对象。如果不存在对某个对象的引用，则该对象被视为不再使用。垃圾回收器不考虑弱引用，这意味着如果侦听器函数仅具有指向它的弱引用，则符合垃圾回收条件。

该参数的一个重要后果与显示对象事件的处理有关。通常，您可能希望从显示列表中删除显示对象时，也将其从内存中删除。但是，如果其它对象已在 useWeakReference 参数设置为 false（默认值）时作为侦听器订阅该显示对象，该显示对象将继续存在于 Lark 的内存中，即使它已不再显示在屏幕中。要解决该问题，可以使所有侦听器在 useWeakReference 参数设置为 true 时订阅该显示对象，或者使用 removeEventListener() 方法从该显示对象中删除所有事件侦听器。

##### 删除事件侦听器
可以使用 removeEventListener() 方法删除不再需要的事件侦听器。删除将不再使用的所有侦听器是个好办法。必需的参数包括 eventName 和 listener 参数，这与 on() 方法所需的参数相同。回想一下，您可以通过调用 on() 两次（第一次调用时将 useCapture 设置为 true，第二次调用时将其设置为 false），在所有事件阶段侦听事件。要删除这两个事件侦听器，您需要调用 removeEventListener() 两次，第一次调用时将 useCapture 设置为 true，第二次调用时将其设置为 false。

##### 调度事件
高级程序员可以使用 emit() 方法将自定义事件对象调度到事件流。该方法唯一接受的参数是对事件对象的引用，此事件对象必须是 Event 类的实例或子类。调度后，事件对象的 target 属性将设置为对其调用了 emit() 的对象。

##### 检查现有的事件侦听器
IEventEmitter 接口的最后两个方法提供有关是否存在事件侦听器的有用信息。如果在特定显示列表对象上发现特定事件类型的事件侦听器，hasEventListener() 方法将返回 true。如果发现特定显示列表对象的侦听器，willTrigger() 方法也会返回 true。但 willTrigger() 不但检查该显示对象上的侦听器，还会检查该显示列表对象在事件流所有阶段中的所有父级上的侦听器。 

<a name="event-unhandled"/>

#### 没有侦听器的错误事件
ActionScript 3.0 中处理错误的主要机制是异常而不是事件，但对于异步操作（例如加载文件），异常处理不起作用。如果在这样的异步操作中发生错误，Lark 会调度一个错误事件对象。如果不为错误事件创建侦听器，Lark 的调试器版本将打开一个对话框，其中包含有关该错误的信息。例如，如果加载文件时使用无效 URL，将在 Lark 的调试器版本中生成此对话框：

Lark 错误对话框的屏幕快照。该框显示"发生 ActionScript 错误"并将此错误标识为具有特定 URL 的流错误。两个按钮显示为"全部去除"和"继续"。

大多数错误事件基于 ErrorEvent 类，而且同样具有一个名为 text 的属性，它用于存储 Lark 显示的错误消息。两个异常是 StatusEvent 和 NetStatusEvent 类。这两个类都具有一个 level 属性（StatusEvent.level 和 NetStatusEvent.info.level）。当 level 属性的值为"error"时，这些事件类型被视为错误事件。

错误事件将不会导致 Lark 应用停止运行。它仅在浏览器调试工具的console中显示。

