#Swan (UI库) 编程指南 - 控件

控件是指 Swan 库里的显示对象，它们既拥有基本显示对象的内容，又有控件的特性，比如自动布局、换肤等等。控件是从常用的 UI 显示对象中提取和抽象出来的，它们通常功能强大、使用简单。通过使用控件可以快速构建一款软件的界面部分。

所有的控件都实现了控件基本功能的接口 swan.UIComponent。
需要注意的是如果控件的父类不是 swan.Component （控件容器的基类），自动布局部分就不会生效。例如显示一个600x400的对象，在这个对象上添加一个顶部居中的文字，代码如下：

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

如果把 panel 改成 Sprite 对象，原本设置居中的文字坐标还是在 (0,0) 点。代码如下：

```  TypeScript
var panel = new Sprite();
panel.width = 600;
panel.height = 400;
this.addChild(panel);
var label = new swan.Label();
abel.horizontalCenter = 0;
label.text = "标题";
panel.addChild(label);
```

* [文本](7-1-label.md)