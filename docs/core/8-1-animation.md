#Lark Core 编程指南 - 动画基础知识

动画的基本概念是变化一定要分时间逐步完成，随时间重复执行某个动作。在更新显示之前，系统将循环将遍历其所有迭代，然后更新屏幕。

例如，我们要创建一个简单的动画，让一个球沿着屏幕运动。那么通过代码，使球每次移动一点点，直到球到达目标为止。每次移动后，屏幕都会更新，从而看到一个运动的小球。

每个显示对象都有 enterFrame 事件，它根据帧速率来调度（帧速率定义了更新屏幕的频率），即每帧一个事件。每一帧都让动画球移动一定的量，当屏幕更新时（每一帧），将会在新位置重新绘制该球，从而产生了运动。

注： 另一种随时间重复执行某个动作的方法是使用 Timer 类。每次过了指定的时间时，Timer 实例都会触发事件通知。可以编写通过处理 Timer 类的 timer 事件来执行动画的代码，将时间间隔设置为一个很小的值（几分之几秒）。有关使用 Timer 类的详细信息，请参阅[使用Timer类](3-1-timer.md)。

在下面的示例中，将在舞台上创建一个名为 circle 的圆形 Shape 实例。当用户单击圆时，触发EnterFrame事件，从而使 circle 淡化（其 alpha 属性值减少），直到完全透明：
```  TypeScript
//画一个圆
var circle: lark.Shape = new lark.Shape();
circle.graphics.fillStyle = "rgb(255,0,0)";
circle.graphics.beginPath();
circle.graphics.arc(25, 25, 25, 0, Math.PI * 2, false);
circle.graphics.fill();
circle.graphics.closePath();
this.addChild(circle);

//增加点击事件的监听，会触发 onClick 这个方法
circle.on(lark.TouchEvent.TOUCH_TAP, onClick, this);

function onClick(): void {
  //增加 ENTER_FRAME 事件的监听，每一帧都会调用一次 onEnterFrame 这个方法
  circle.on(lark.Event.ENTER_FRAME,onEnterFrame,this);
  circle.alpha = 1;
}

function onEnterFrame(): void {
  //每一帧圆形的 alpha 值都会减少一点
  circle.alpha -= 0.05;

  //当圆形的 alpha 值小于等于0的时候，移除 ENTER_FRAME 事件的监听
  if (circle.alpha <= 0) {
    circle.removeListener(lark.Event.ENTER_FRAME,onEnterFrame,this);
  }
}
```
以上代码还可用来创建动画运动而不是淡化。通过用不同属性替换 onEnterFrame 方法中的 alpha，就可获得该属性的动画效果。

例如，可以将下行
```  TypeScript
circle.alpha -= 0.05;
```
更改为以下代码
```  TypeScript
circle.x += 2;
```
这样就可以获得 x 属性的动画效果，使圆形从左向右移动。
