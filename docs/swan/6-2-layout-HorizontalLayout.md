#Swan (UI库) 编程指南 - 水平布局 

在横向布局，以及下面将要讲的垂直布局，网格布局中，都会忽略您在子项上的坐标设置，所有子项的位置将由布局类统一管理。

横向布局会自动将所有的子项横着排列，您可以做以下的设置：
* gap属性，设置子项之间的间距
* horizontalAlign属性，设置水平对齐方式
* verticalAlign属性，设置垂直对齐方式
* padding系列属性，设置容器内间距，相对于4个边分别可以使用 paddingTop, paddingBottom, paddingLeft, paddingRight

示例：    
``` TypeScript   
this.myGroup = new swan.Group();
this.addChild( this.myGroup );

this.myGroup.layout = new swan.BasicLayout();

var outline:lark.Shape = new lark.Shape;
outline.graphics.strokeStyle = "#00ff00";
outline.graphics.beginPath();
outline.graphics.strokeRect( 0, 0, 500, 300 );
this.myGroup.addChild( outline );

var btn1:swan.Button = new swan.Button();
btn1.label = "Lark 按钮 A";
var btn2:swan.Button = new swan.Button();
btn2.label = "Lark 按钮 B";
var btn3:swan.Button = new swan.Button();
btn3.label = "Lark 按钮 C";
this.myGroup.addChild( btn1 );
this.myGroup.addChild( btn2 );
this.myGroup.addChild( btn3 );

var hLayout:swan.HorizontalLayout = new swan.HorizontalLayout();
hLayout.gap = 10;
hLayout.paddingTop = 30;
hLayout.horizontalAlign = lark.HorizontalAlign.CENTER;
this.myGroup.layout = hLayout;   /// 水平布局```              
效果如图：
![][6-2-layout-HLayout]     


[6-2-layout-HLayout]: image/6/6-2-layout-HLayout.jpg

