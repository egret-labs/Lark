#Lark Core 编程指南 - 使用Point对象


`lark.Point` 对象定义一对笛卡尔坐标。它表示二维坐标系中的某个位置。其中 x 表示水平轴，y 表示垂直轴。

要定义 Point 对象，请设置它的 x 和 y 属性，如下所示：

```
var pt1 = new lark.Point(10, 20); // x == 10; y == 20
var pt2 = new lark.Point();
pt2.x = 10;
pt2.y = 20;
```

Lark还为你准备了更加高效的处理方法。当你想释放一个 `lark.Point` 对象时，请不要将其直接设置为 `null` 。在`lark.Point` 中内建了一个对象池，用户提高你的应用程序性能。释放对象代码如下：

```
var pt1 = new lark.Point(10, 20); // x == 10; y == 20
var pt2 = new lark.Point();
pt2.x = 10;
pt2.y = 20;

lark.Point.release( pt1 );
lark.Point.release( pt2 );
```

`lark.Point.release` 是一个静态方法，可以将你所创建的Point对象存入对象池当中，以备下一次使用。

同理，Lark还为你提供了Point对象的创建操作，在实际项目中，推荐使用这种方式进行创建，以节约内存。方法如下：

```
var pt1 = lark.Point.create(10, 20);
```

不仅如此，你也可以对Point对象进行深度复制，使用 `clone`方法可以返回一个全新的 Point对象，其值与原始 Point对象完全相同。

**数学计算**

`lark.Point` 提供了几个方便简单的运算方法，帮助你快速进行图像计算。

| 属性/方法               | 描述                         |
| -----------------------|----------------------------- |
| length 属性          | 从 (0,0) 到此点的线段长度         |
| distance 方法        | 返回两点之间的距离。              |

```
var pt1 = lark.Point.create(10, 20);
var pt2 = lark.Point.create(100, 20);

console.log( pt1.length );                    //打印 22.360679774997898
console.log( lark.Point.distance(pt1,pt2) );  //打印 90
```

**比较**

判断两个Point对象是否相等我们可使用 `equals` 方法。注意，此方法不是判断两个Point对象是否共同引用同一内存地址。而是判断其x,y值是否相同。

```
var pt1 = lark.Point.create(10, 20); // x == 10; y == 20
var pt2 = lark.Point.create();
pt2.x = 100;
pt2.y = 20;
var pt3 = lark.Point.create(10, 20);

console.log( pt1.equals(pt2) );  //打印 false
console.log( pt3.equals(pt2) );  //打印 true
```