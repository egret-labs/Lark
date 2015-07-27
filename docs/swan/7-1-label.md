#Swan (UI库) 编程指南 - 文本 (limengjie)

文本控件对应的类是 swan.Label。swan.Label 继承自 lark.TextField，实现了 swan.UIComponent 接口，因此它不仅拥有基本的文本功能(lark.TextField)，还有自动布局功能(swan.UIComponent)。

基本的文本参考 [Lark Core 编程指南 - 处理文本](../core/11-0-text.md)

显示一个标题非常简单，代码如下：

```  TypeScript
var panel = new swan.Component();
panel.width = 600;
panel.height = 400;
this.addChild(panel);
var label = new swan.Label();
abel.horizontalCenter = 0;
label.text = "标题";
panel.addChild(label);
```