#Lark Core 编程指南 - 使用Matrix对象



Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix 对象应用于显示对象的 matrix 属性。 这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。

虽然可以通过直接调整 Matrix 对象的属性（a、b、c、d、tx 和 ty）来定义矩阵，但更简单的方法是使用Matrix中的其他方法。

下面的方法中设置矩阵的旋转、缩放与平移

```
var matrix:lark.Matrix = lark.Matrix.create();
var rotation:number = Math.PI * (30 / 360); // 30° 由度数计算出弧度
var scaleFactor:number = 2;
matrix.scale(scaleFactor, scaleFactor); //缩放
matrix.rotate(rotation);   //旋转
matrix.translate( 30, 25 );  //平移
```


通过此类操作，我们可以将Matrix对象赋值与显示对象的 matrix 属性，并对其显示效果进行修改。


