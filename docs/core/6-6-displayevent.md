#Lark Core 编程指南 - 处理显示对象事件


DisplayObject 类从 EventEmitter 类继承。这意味着，每个显示对象都可完全参与到事件模型中。每个显示对象都可使用其 on() 方法（继承自 EventEmitter 类）来侦听特定的事件，但仅当侦听对象是该事件的事件流的一部分时才能实现此功能。

例如，一个 Shape 对象可以接收来自用户的触摸事件。

```
class Main extends lark.Sprite {

    public constructor() {
        super();
    
        this.addChild( this.shp );
        this.shp.graphics.beginPath();
        this.shp.graphics.fillStyle=0xff0000;
        this.shp.graphics.fillRect(0,0,100,100);

        this.shp.on(lark.TouchEvent.TOUCH_TAP,this.click,this);
    }
    private shp = new lark.Shape();
    private click() {
        lark.log("click shape!");
    }
}
```

多次点击 Shape 后，在控制台打印出内容。

```
click shape!
click shape!
click shape!
```
