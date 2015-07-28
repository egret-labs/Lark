#Swan (UI库) 编程指南 - 文本

文本控件对应的类是 swan.Label。swan.Label 继承自 lark.TextField，实现了 swan.UIComponent 接口。因此它不仅拥有基本的文本功能(lark.TextField)，还有自动布局功能(swan.UIComponent)。

基本的文本参考 [Lark Core 编程指南 - 处理文本](../core/11-0-text.md)

例如显示一个顶部居中的标题，代码如下：

```  TypeScript
//设置一个 600x400 的容器
var panel = new swan.Component();
panel.width = 600;
panel.height = 400;
this.addChild(panel);

//添加一个水平居中的标题
var label = new swan.Label();
abel.horizontalCenter = 0;
label.text = "标题";
panel.addChild(label);
```

* 下一节 [图片](7-2-image.md)
