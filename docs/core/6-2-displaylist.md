#Lark Core 编程指南 - 在显示列表中添加显示对象


实例化显示对象时，在将显示对象实例添加到显示列表上的显示对象容器之前，显示对象不会出现屏幕上（即在舞台上）。例如，在下面的代码中，如果省略了最后一行代码，则 myText TextField 对象不可见。在最后一行代码中，this 关键字必须引用已添加到显示列表中的显示对象容器。

```
var myText:lark.TextField = new lark.TextField();
myText.text = "Hello Lark!";
this.addChild(myText);
```

当在舞台上添加任何可视元素时，该元素会成为 Stage 对象的“子级”。它可以是扩展 Sprite 类的任何类型的对象。