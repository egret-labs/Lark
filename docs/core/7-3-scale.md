#Lark Core 编程指南 - 处理大小和缩放对象
有两种方式可测量和操作显示对象的大小：使用尺寸属性（width 和 height）或缩放属性（scaleX 和 scaleY）。

每个显示对象都有 width 属性和 height 属性，它们最初设置为对象的大小，以像素为单位。您可以通过读取这些属性的值来确定显示对象的大小。还可以指定新值来更改对象的大小，如下所示：
```  TypeScript
//设定对象的大小
mySprite.width = 50;
mySprite.height = 100;
```
更改显示对象的 height 或 width 会导致缩放对象，这意味着对象内容将经过伸展或挤压以适合新区域的大小。如果显示对象仅包含矢量形状，将按新缩放比例重绘这些形状，而品质不变。此时将缩放显示对象中的所有位图图形元素，而不是重绘。例如，缩放图形时，如果数码照片的宽度和高度增加后超出图像中像素信息的实际大小，数码照片将被像素化，使数码照片显示带有锯齿。

当更改显示对象的 width 或 height 属性时，也会更新对象的 scaleX 和 scaleY 属性。

每个显示对象都有 scaleX 属性和 scaleY 属性，表示显示对象与其原始大小相比的相对大小，它们默认设置为 1。
scaleX 和 scaleY 属性使用小数（十进制）值来表示百分比。例如，如果某个显示对象的 scaleX 属性的值为 0.5，表示 50％，就是原始宽度的一半。如果其高度加倍，则其 scaleY 属性的值为 2，表示 200％。
```  TypeScript
//画一个圆形，初始的宽高是150，scaleX和scaleY是1
var circle: lark.Shape = new lark.Shape();
circle.graphics.fillStyle = "rgb(255,0,0)";
circle.graphics.arc(75, 75, 75, 0, Math.PI * 2, false);
circle.graphics.fill();
this.addChild(circle);

console.log(circle.scaleX); // output: 1
console.log(circle.scaleY); // output: 1

circle.width = 100;
circle.height = 75;
console.log(circle.scaleX); // output: 0.666666
console.log(circle.scaleY); // output: 0.5
```
此时，大小更改不成比例。换句话说，如果更改一个正方形的 height 但不更改其 width，则其边长不再相同，它将是一个矩形而不是一个正方形。如果要更改显示对象的相对大小，则可以通过设置 scaleX 和 scaleY 属性的值来调整该对象的大小，另一种方法是设置 width 或 height 属性。例如，下面的代码将更改名为 square 的显示对象的 width，然后更改垂直缩放 (scaleY) 以匹配水平缩放，所以正方形的大小成比例。
```  TypeScript
//改变矩形的宽度
square.width = 150;
//通过让y方向的缩放与x方向的缩放相等，实现等比缩放
square.scaleY = square.scaleX;
```
