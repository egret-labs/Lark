#Swan (UI库) 编程指南 - 垂直布局
 
垂直布局的行为和水平布局类似，只不过方向变了，从水平方向变为竖直方向。     

我们仍然使用水平布局所用的代码，将布局方式改变为垂直：    
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

var vLayout:swan.VerticalLayout = new swan.VerticalLayout();
vLayout.gap = 10;
vLayout.paddingTop = 30;
vLayout.horizontalAlign = lark.HorizontalAlign.CENTER;
this.myGroup.layout = vLayout;      /// 垂直布局
```    
效果如图：
![][6-3-layout-VLayout]     
对比水平布局可以看到，容器内的UI控件是作为一个整体参与布局的。   

[6-3-layout-VLayout]: image/6/6-3-layout-VLayout.jpg
