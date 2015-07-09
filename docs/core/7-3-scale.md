#Lark Core 编程指南 - 处理大小和缩放对象
有两种方式可测量和操作显示对象的大小：使用尺寸属性（width 和 height）或缩放属性（scaleX 和 scaleY）。

每个显示对象都有 width 属性和 height 属性，它们最初设置为对象的大小，以像素为单位。您可以通过读取这些属性的值来确定显示对象的大小。还可以指定新值来更改对象的大小，如下所示：
```  TypeScript
//设定对象的大小
mySprite.width = 50;
mySprite.height = 100;
```
每个显示对象都有 scaleX 属性和 scaleY 属性，表示显示对象与其原始大小相比的相对大小，它们默认设置为 1。
scaleX 和 scaleY 属性使用小数（十进制）值来表示百分比。例如，如果某个显示对象的 scaleX 属性的值为 0.5，表示 50％，就是原始宽度的一半。如果其高度加倍，则其 scaleY 属性的值为 2，表示 200％。
```  TypeScript
//把对象横向放大2倍
mySprite.scaleX = 2;
//把对象纵向放大3倍
mySprite.scaleY = 3;
```
