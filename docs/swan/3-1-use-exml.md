#Swan (UI库) 编程指南 - 如何使用EXML

在Swan中，EXML是可以运行时加载解析的。您可以把它当做标准的文本文件加载后解析，或者直接将exml文本内容嵌入代码中解析。在下一节我们将详细讲解EXML的语法，这节我们先来看一下如何在代码中使用EXML文件。下面是一个EXML文件内容示例，它描述了一个按钮的皮肤：

```
<s:Skin states="up,over,down,disabled" xmlns:s="http://ns.egret.com/swan">
    <s:Image source="image/button_up.png" includeIn="up" width="100%" height="100%" scale9Grid="5,5,63,16"/>
    <s:Image source="image/button_down.png" includeIn="down" width="100%" height="100%" scale9Grid="5,5,63,16"/>
    <s:Image source="image/button_disabled.png" includeIn="disabled" width="100%" height="100%" scale9Grid="5,5,63,16"/>
    <s:Label id="labelDisplay" text="按钮" left="20" right="20" top="10" bottom="10"/>
</s:Skin>

```
运行时显示结果如下：

![](image/3-1-button.png)

###直接引用EXML文件
第一种方式也是最简单的方式，因为这个EXML的根节点是Skin，表示这个文件描述的是一个皮肤。在EXML根节点是Skin的情况下，可以直接使用组件的skinName接受EXML文件路径，这通常也是最普遍的使用情景。这里我们假设之前那个EXML文件的路径为:[项目根路径]/src/skins/ButtonSkin.exml，引用那个ButtonSkin.exml的代码如下：

```
var button = new swan.Button();
button.skinName = "skins/ButtonSkin.exml";
this.addChild(button);
```

###动态加载EXML文件

上面介绍了EXML根节点是Skin的情况，若不描述的对象不是皮肤，那么我们就得采用更加通用的一种加载解析方式。可以直接使用EXML.load()方法来加载并解析外部的EXML文件，加载完成后，回调函数的参数会传入解析后的类定义，可以把类定义new出来实例化它，或直接赋值给组件的skinName属性（如果EXML根节点是Skin）。下面看个简单例子：

```
private init():void{
    EXML.load("skins/ButtonSkin.exml",this.onLoaded,this);
}

private onLoaded(clazz:any,url:string):void{
    var button = new swan.Button();
    button.skinName = clazz;
    this.addChild(button);
}
```

###嵌入EXML到代码
EXML同样也提供了文本的解析方式，这个过程大家可以直接类比对JSON文件的处理，因为几乎是一样的。您可以使用HttpRequest去加载EXML文件的文本内容，然后运行时调用EXML.parse(exmlText)方法去解析即可，会立即返回解析后的类定义。当然，您也可以跳过异步加载，直接在代码中嵌入EXML文本内容：

```
var exmlText = `<s:Skin states="up,over,down,disabled" xmlns:s="http://ns.egret.com/swan">
                    <s:Image source="image/button_up.png" includeIn="up" width="100%" height="100%" scale9Grid="5,5,63,16"/>
                    <s:Image source="image/button_down.png" includeIn="down" width="100%" height="100%" scale9Grid="5,5,63,16"/>
                    <s:Image source="image/button_disabled.png" includeIn="disabled" width="100%" height="100%" scale9Grid="5,5,63,16"/>
                    <s:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0" left="20" right="20" top="10" bottom="10"/>
                </s:Skin>`;


var button = new swan.Button();
var clazz = EXML.parse(exmlText);//解析字符串得到类定义
button.skinName = clazz;
this.addChild(button);
```
注意观察上面的例子，这里有个嵌入多行文本的技巧，您可以不用写一堆的 `"\n"+` 符号来连接字符串，可以直接使用头尾一对·符号（波浪线那个按键）来包裹多行文本。另外，包含在这对符合之间的文本内容，还可以使用`${key}`的形式来引用代码中的变量，进行简洁的字符串拼接：

```
var className = "skins.ButtonSkin";
var exmlText = `<s:Skin class="${className}" states="up,over,down,disabled" xmlns:s="http://ns.egret.com/swan">
                ...
                </s:Skin>`;
```
