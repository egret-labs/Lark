#Swan (UI库) 编程指南 - 按钮

按钮控件对应的类是 swan.Button。swan.Button 继承自 swan.Component类，因此它是可定制皮肤的。要显示一个按钮通常要给按钮指定一个皮肤，按钮的代码如下：

```  TypeScript
var button = new swan.Button();
button.width = 100;
button.height = 40;
button.label = "确定";
button.skinName = "ButtonSkin.exml";
this.addChild(button);
```

ButtonSkin.exml皮肤的代码如下：

``` XML
<s:Skin states="up,down,disabled" xmlns:s="http://ns.egret.com/swan">
    <s:Image source="image/button_up.png" includeIn="up" width="100%" height="100%" scale9Grid="5,5,63,16"/>
    <s:Image source="image/button_down.png" includeIn="down" width="100%" height="100%" scale9Grid="5,5,63,16"/>
    <s:Image source="image/button_disabled.png" includeIn="disabled" width="100%" height="100%" scale9Grid="5,5,63,16"/>
    <s:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0" fontSize="20"/>
</s:Skin>
```

按钮的效果如下图所示：

![](image/7-3-button.png)

一个按钮的皮肤通常需要有 up、down、disabled 几个状态，并且每个状态都有对应的显示。按钮默认的皮肤组件为 labelDisplay，一个文本(swan.Label)。EXML 中的 includeIn 是指该显示对象在什么状态下显示。九宫格图片的设置可以参考上一节。

如果按钮没显示出来，请确认：1，您是否正确配置了皮肤，2，组件皮肤和相关素材是否在项目中.

按钮可以设置禁用，禁用的按钮会以另外一种样式显示（进入disabled视图状态），且不再响应交互，设置enabled属性可以控制是否禁用：

```  TypeScript
button.enabled = false;
```

在按钮上，可以添加事件侦听，判断当用户按下按钮后，下一步要执行的方法：

```  TypeScript
button.on(lark.TouchEvent.TOUCH_TAP,this.btnTouchHandler,this);

private btnTouchHandler(event:lark.TouchEvent):void {
    console.log("button touched");
}
```
