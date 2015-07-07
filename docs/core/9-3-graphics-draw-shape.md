#Lark Core 编程指南 - 使用内置方法绘制形状

为了便于绘制常见形状 （如圆、椭圆、矩形以及带圆角的矩形）， Lark 中提供了用于绘制这些常见形状的方法。
它们是 Graphics 类的 fillRect()、 arc() 方法。但要注意，在调用这些方法之前，您仍需指定线条和填充样式。
``` TypeScript
var shape = new lark.Shape();
var graphics = shape.graphics;
graphics.lineWidth = 2;
graphics.strokeStyle="#990000";
```

以下示例重新创建绘制红色、绿色以及蓝色正方形的示例，其宽度和高度均为 100 个像素。以下代码使用 drawRect() 方法：
``` TypeScript
var squareSize:number = 100; 
 
graphics.beginPath();
graphics.fillStyle = "#FF0000"; 
graphics.fillRect( 0, 0, squareSize, squareSize ); 
graphics.fillStyle = "#00FF00"; 
graphics.fillRect( 200, 0, squareSize, squareSize ); 
graphics.fillStyle = "#0000FF"; 
graphics.fillRect( 400, 0, squareSize, squareSize ); 
```