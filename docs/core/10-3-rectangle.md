#Lark Core 编程指南 - 使用Rectangle对象


Rectangle 对象定义一个矩形区域。Rectangle 对象有具体的位置，该位置由其左上角的 x 和 y 坐标以及 width 属性和 height 属性定义。您可以按照如下方式通过调用 Rectangle() 构造函数来为新 Rectangle 对象定义这些属性：


```
var rx:number = 0;
var ry:number = 0;
var rwidth:number = 100;
var rheight:number = 50;
var rect1 = new lark.Rectangle(rx, ry, rwidth, rheight);
```

**调整 Rectangle 对象的大小和进行重新定位**

有多种方法调整 Rectangle 对象的大小和进行重新定位。

您可以通过更改 Rectangle 对象的 x 和 y 属性直接重新定位该对象。此更改不会影响 Rectangle 对象的宽度或高度。

```
var x1:number = 0;
var y1:number = 0;
var width1:number = 100;
var height1:number = 50;
var rect1:lark.Rectangle = new lark.Rectangle(x1, y1, width1, height1);
lark.log(rect1) // Rectangle {x: 0, y: 0, width: 100, height: 50}
rect1.x = 20;
rect1.y = 30;
lark.log(rect1); // Rectangle {x: 20, y: 30, width: 100, height: 50}
```

如下面的代码所示，当更改 Rectangle 对象的 left 或 top 属性时，将重新定位该矩形。矩形的 x 和 y 属性分别与 left 和 top 属性匹配。然而，Rectangle 对象的左下角的位置不发生改变，因此调整了该对象的大小。

```
var x1:number = 0;
var y1:number = 0;
var width1:number = 100;
var height1:number = 50;
var rect1:lark.Rectangle = new lark.Rectangle(x1, y1, width1, height1);
console.log(rect1) // Rectangle {x: 0, y: 0, width: 100, height: 50}
rect1.left = 20;
rect1.top = 30;
console.log(rect1); // Rectangle {x: 20, y: 30, width: 80, height: 20}
```

同样，如下面的示例所示，如果更改 Rectangle 对象的 bottom 或 right 属性，该对象左上角的位置不发生改变。矩形相应地调整了大小：

```
var x1:number = 0;
var y1:number = 0;
var width1:number = 100;
var height1:number = 50;
var rect1:lark.Rectangle = new lark.Rectangle(x1, y1, width1, height1);
console.log(rect1) // Rectangle {x: 0, y: 0, width: 100, height: 50}
rect1.right = 60;
rect1.bottom = 20;
console.log(rect1); // Rectangle {x: 0, y: 0, width: 60, height: 20}
```

**确定 Rectangle 对象的联合和交集**

可以使用 contains() 方法来确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。

```
var x1:number = 0;
var y1:number = 0;
var width1:number = 100;
var height1:number = 50;
var rect1:lark.Rectangle = new lark.Rectangle(x1, y1, width1, height1);
console.log(rect1.contains(16,35) ); //true
console.log(rect1.contains(161,65) ); //false
```

使用 intersection() 方法查明两个矩形是否相交。返回交集区域作为 Rectangle 对象。

```
var r1 = lark.Rectangle.create();
r1.setTo(10,10,100,50);

var r2 = lark.Rectangle.create();
r2.setTo( 30,40,150,200 );

var rel = r1.intersection(r2);
console.log( rel ); //Rectangle {x: 30, y: 40, width: 80, height: 20}
```


