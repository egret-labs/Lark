/**
 * @language en_US
 * The following example uses the classes EventDispatcherExample and CustomDispatcher, a subclass of EventDispatcher, to show how a custom event is created and dispatched. The example carries out the following tasks:
 *   1. The constructor of EventDispatcherExample creates a local variable dispatcher and assigns it to a new CustomDispatcher instance.
 *   2. Inside CustomDispatcher, a string is set so that the event has the name action, and the doAction() method is declared. When called, this method creates the action event and dispatches it using EventDispatcher.dispatchEvent().
 *   3. The dispatcher property is then used to add the action event listener and associated subscriber method actionHandler(), which simply prints information about the event when it is dispatched.
 *   4. The doAction() method is invoked, dispatching the action event.
 */
/**
 * @language zh_CN
 * 以下示例使用 EventDispatcherExample 和 CustomDispatcher 类（EventDispatcher 的子类）来说明如何创建和调度自定义事件。该示例执行下列任务：
 *   1. EventDispatcherExample 的构造函数创建一个局部变量 dispatcher，并将其赋给新的 CustomDispatcher 实例。
 *   2. 在 CustomDispatcher 内，设置一个字符串以便事件具有名称 action，并且声明 doAction() 方法。当调用此方法时，此方法将创建 action 事件并使用 EventDispatcher.dispatchEvent() 调度该事件。
 *   3. 然后使用 dispatcher 属性添加 action 事件侦听器和关联的订阅者方法 actionHandler()，这样在调度事件时可以只输出有关该事件的信息。
 *   4. 调用 doAction() 方法，从而调度 action 事件。
 */
class EventEmitterExample extends lark.Sprite {

    public constructor() {
        super();
        var emitter:CustomDispatcher = new CustomDispatcher();
        emitter.on(CustomDispatcher.ACTION, this.actionHandler,this);
        emitter.doAction();
    }

    private actionHandler(event:lark.Event):void {
        console.log("actionHandler: " + event.type);
    }
}

class CustomDispatcher extends lark.EventEmitter {
    public static ACTION = "action";

    public doAction():void {
        this.emit(new lark.Event(CustomDispatcher.ACTION));
    }
}