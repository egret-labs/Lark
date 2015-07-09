#Lark Core 编程指南 - 设置舞台属性


Stage 类覆盖并屏蔽了 DisplayObject 类的大多数属性和方法。如果调用其中一个被屏蔽的属性或方法会引发异常。例如，Stage 对象不具有 x 或 y 属性，因为作为应用程序的主容器，该对象的位置是固定的。x 和 y 属性是指显示对象相对于其容器的位置，因为舞台没有包含在其他显示对象容器中，所以这些属性不适用。

##控制播放帧速率

Stage 类的 frameRate 属性用于设置应用程序中的帧速率。

##读取应用程序宽高

Lark中内置了六种屏幕适配模式，不同模式对于Stage的宽高影响不同，可以通过 `stageWidth` 和 `stageHeight` 属性读取当前 Stage 的宽高值。


##Event.RENDER 事件

调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
