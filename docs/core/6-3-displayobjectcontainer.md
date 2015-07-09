#Lark Core 编程指南 - 使用显示对象容器


如果从显示列表中删除某个 DisplayObjectContainer 对象，或者以其他某种方式移动该对象或对其进行变形处理，则会同时删除、移动 DisplayObjectContainer 中的每个显示对象或对其进行变形处理。

显示对象容器本身就是一种显示对象，它可以添加到其他显示对象容器中。

要使某一显示对象出现在显示列表中，必须将该显示对象添加到显示列表上的显示对象容器中。使用容器对象的 addChild() 方法或 addChildAt() 方法可执行此操作。例如，如果下面的代码没有最后一行，将不会显示 myTextField 对象：

```
var myText:lark.TextField = new lark.TextField();
myText.text = "Hello Lark!";
this.addChild(myText);
```

使用 addChildAt() 方法可将子级添加到显示对象容器的子级列表中的特定位置。子级列表中这些从 0 开始的索引位置与显示对象的分层（从前到后顺序）有关。例如，请考虑下列三个显示对象。每个对象都是从称为 Ball 的自定义类创建的。

![textField](image/6-3-1.png)

使用 addChildAt() 方法可以调整这些显示对象在容器中的分层。例如，请看以下代码：

```
var ball_A = new Ball(0xFFCC00, "a");
ball_A.name = "ball_A";
ball_A.x = 20;
ball_A.y = 20;
container.addChild(ball_A);

var ball_B = new Ball(0xFFCC00, "b");
ball_B.name = "ball_B";
ball_B.x = 70;
ball_B.y = 20;
container.addChild(ball_B);

var ball_C = new Ball(0xFFCC00, "c");
ball_C.name = "ball_C";
ball_C.x = 40;
ball_C.y = 60;
container.addChildAt(ball_C, 1);
```

执行此代码后，显示对象在 container DisplayObjectContainer 对象中的定位如下所示。请注意对象的分层。

![textField](image/6-3-2.png)

要重新将对象定位到显示列表的顶部，只需重新将其添加到列表中。例如，在前面的代码后，要将 ball_A 移到堆栈的顶部，请使用下面的代码行：

```
container.addChild(ball_A);
```

可以使用 getChildAt() 方法来验证显示对象的图层顺序。getChildAt() 方法根据您向容器传递的索引编号返回容器的子对象。例如，下面的代码显示 container DisplayObjectContainer 对象的子级列表中不同位置的显示对象的名称：

```
lark.log(container.getChildAt(0).name); // ball_A
lark.log(container.getChildAt(1).name); // ball_C
lark.log(container.getChildAt(2).name); // ball_B
```

如果从父容器的子级列表中删除了一个显示对象，则列表中更高位置的每一个元素在子索引中会分别下移一个位置。例如，接着前面的代码，下面的代码显示如果删除子级列表中位置较低的一个显示对象，container DisplayObjectContainer 中位置 2 的显示对象如何移到位置 1：

```
container.removeChild(ball_C);
lark.log(container.getChildAt(0).name); // ball_A
lark.log(container.getChildAt(1).name); // ball_B
```

removeChild() 和 removeChildAt() 方法并不完全删除显示对象实例。这两种方法只是从容器的子级列表中删除显示对象实例。该实例仍可由另一个变量引用。


除了上面介绍的方法之外，DisplayObjectContainer 类还定义了用于使用子显示对象的几个方法，其中包括：

* contains: 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。
* getChildByName: 返回具有指定名称的子显示对象。
* getChildIndex: 返回 DisplayObject 的 child 实例的索引位置。
* setChildIndex: 更改现有子项在显示对象容器中的位置。
* removeChildren: 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
* swapChildrenAt: 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。
* swapChildrenAt: 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。

