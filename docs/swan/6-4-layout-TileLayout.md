#Swan (UI库) 编程指南 - 网格布局 

网格布局，则是既做横向排列，也做纵向排列，实现的效果像格子一样。可设置的属性主要包括：

* horizontalGap属性，设置子项之间的水平间距
* verticalGap属性，设置子项之间的垂直间距
* columnAlign属性，指定如何将完全可见列与容器宽度对齐。
* rowAlign属性，指定如何将完全可见行与容器高度对齐。
* padding属性，设置容器内间距，如果需要分开设置可以使用paddingTop,paddingBottom,paddingLeft,paddingRight
* requestedColumnCount属性，明确指定要显示的列数

> 其中columnAlign和rowAlign的设置对于边界对齐起重要作用，不同的设置形成的效果也不尽相同

仍然用 3 个按钮进行布局设置示例：

``` TypeScript   
var btn1:swan.Button = new swan.Button();
btn1.label = "Lark 按钮 A";
var btn2:swan.Button = new swan.Button();
btn2.label = "Lark 按钮 B";
var btn3:swan.Button = new swan.Button();
btn3.label = "Lark 按钮 C";
this.myGroup.addChild( btn1 );
this.myGroup.addChild( btn2 );
this.myGroup.addChild( btn3 );

var tLayout:swan.TileLayout = new swan.TileLayout();
tLayout.horizontalGap = 10;
tLayout.verticalGap = 10;
tLayout.columnAlign = swan.ColumnAlign.JUSTIFY_USING_WIDTH;
tLayout.rowAlign = swan.RowAlign.JUSTIFY_USING_HEIGHT;
tLayout.paddingTop = 30;
tLayout.paddingRight = 30;
tLayout.paddingLeft = 30;
tLayout.requestedColumnCount = 2;  /// 设置两列显示
this.myGroup.layout = tLayout;    /// 网格布局
```    

效果如图：

![][6-4-layout-TLayout]     

[6-4-layout-TLayout]: image/6/6-4-layout-TLayout.jpg