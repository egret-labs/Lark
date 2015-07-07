#Lark Core 编程指南 - 设置舞台属性


Stage 类用于覆盖 DisplayObject 类的大多数属性和方法。

##控制播放帧速率

Stage 类的 frameRate 属性用于设置应用程序中的帧速率。

##读取应用程序宽高

Lark中内置了六种屏幕适配模式，不同模式对于Stage的宽高影响不同，可以通过 `stageWidth` 和 `stageHeight` 属性读取当前 Stage 的宽高值。


##Event.RENDER 事件

调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。