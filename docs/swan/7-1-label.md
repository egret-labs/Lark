#Swan (UI库) 编程指南 - 文本

文本控件对应的类是 swan.Label。swan.Label 继承自 lark.TextField，实现了 swan.UIComponent 接口。因此它不仅拥有基本的文本功能(lark.TextField)，还有自动布局功能(swan.UIComponent)。

基本的文本使用请参考 [Lark Core 编程指南 - 处理文本](../core/11-0-text.md)

使用方式也非常简单，比如下面的例子：
```  TypeScript
var label:swan.Label = new swan.Label();
label.text = "swan Label 测试";
this.addChild(label);
```
得到的效果：
![](./image/7/7_1_1.png)

上面这是设置了它的显示文字，您还可以修改样式，实现不同的显示效果：

```  TypeScript
label.width = 400;//设置宽度
label.height = 300;//设置高度
label.fontFamily = "Tahoma";//设置字体
label.textColor = 0xFF0000;//设置颜色
label.fontSize = 35;//设置文本字号
label.bold = true;//设置是否加粗
label.italic = true;//设置是否斜体
label.textAlign = "right";//设置水平对齐方式
label.verticalAlign = "middle";//设置垂直对齐方式
```
得到的效果：
![](./image/7/7_1_2.png)

Label既可以显示单行文本，也可以显示多行文本。当您为Label设定了宽度，并且文字过长的时候，会自动换行。
```  TypeScript
label.width = 200;
label.height = 60;
label.fontSize = 14;
label.lineSpacing = 2;//行间距
label.text = "很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字";
```
得到的效果：
![](./image/7/7_1_3.png)
