#Lark Core 编程指南 - 事件对象池优化

在传统的事件派发流程中，事件是需要被新创建后进行派发。在JavaScript中，由于对象都是动态的，需要较多内存来维持一个对象，因此相对于其他编程语言来说，创建JavaScript对象的性能消耗比较大，处于性能优化考虑，我们应该尽可能避免重复创建新对象，而是利用对象池技术来不断复用对象。Lark中已经内置了事件的对象池优化方式。
在Lark中需要派发事件时，可以非常方便地使用Event.create()和Event.release() 这一对方法来创建和释放事件对象， 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。   
 注意：若使用此方法来创建自定义事件的实例，自定义事件的构造函数参数列表必须跟Event类一致。      
 事件派发的过程通常如下：   
 ``` TypeScript
 var event = Event.create(Event,type, bubbles);
 event.data = data;  //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
 this.emit(event);
 Event.release(event);
 ```
 以上调用代码也可以封装为通用的工具方法，之后通过工具方法快速调用抛出事件即可。例如EventEmitter提供的emitWidth()方法就等价于以上代码。若自定义事件需要封装标准的对象池方法，也可以仿照TimerEvent.emitTimerEvent()方法的实现：
```
public static emitTimerEvent(target:IEventEmitter, type:string, bubbles?:boolean, cancelable?:boolean):boolean {
    var event = Event.create(TimerEvent, type, bubbles, cancelable);
    var result = target.emit(event);
    Event.release(event);
    return result;
}
```
除了Event.create()和Event.release()这一对方法，开发者若自定义事件，还需要关注clean()方法。此方法能在事件被回收时自动调用，若自定义事件含有对外部的数据引用，可以覆盖此方法，断开引用，防止引起内存泄露问题。

注意：由于事件对象在派发后立即会被回收，所以在事件响应函数中应注意避免缓存持有事件对象，如果要缓存事件携带的数据，应该立即将事件上的数据赋值给其他的变量，而不是持有事件对象。否则派发结束后事件对象上携带的数据可能会被清空。 
 
 
