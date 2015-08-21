#Swan (UI库) 编程指南 - 层叠容器

层叠容器分为两种： ViewStack 和 TabBar 。

#### ViewStack

ViewStack 也是一个容器，您可以在这个容器中添加多个子项，但只能显示其中的一个。您可以通过设置 selectedIndex 或者 selectedChild 属性，来控制当前应该显示的子项。

首先我们创建一个专用于显示 ViewStack 的类：
``` TypeScript
module uiContainer {
    export class ViewStackDemo extends swan.Group {
        private viewStack:swan.ViewStack;

        public constructor() {
            super();
        }

        public createChildren():void {
            super.createChildren();
            this.viewStack = new swan.ViewStack();
            var btnA:swan.Button = new swan.Button();
            btnA.label = "Lark Button A";
            this.viewStack.addChild( btnA );
            var btnB:swan.Button = new swan.Button();
            btnB.label = "Lark Button B";
            this.viewStack.addChild( btnB );
            //设置默认选项
            this.viewStack.selectedIndex = 1;
            //timer控制选项切换
            var timer:lark.Timer = new lark.Timer( 500 );
            timer.on( lark.TimerEvent.TIMER, this.changeIndexByTimer, this );
            timer.start();
            //show
            this.addChild( this.viewStack );
        }

        private changeIndexByTimer( evt:lark.TimerEvent ):void {
            this.viewStack.selectedIndex = this.viewStack.selectedIndex == 0 ? 1 : 0 ;
        }
    }
}
```

在文档类所覆盖的 createChildren 中加入对以上类的调用： 
``` TypeScript
var stackdemo:swan.Group = new uiContainer.ViewStackDemo;
stackdemo.x = 100;
stackdemo.y = 100;
this.addChild( stackdemo );
```

即可看到该容器的两个部分按照设定的间隔自动变换的效果： 

![][8-2-stack-A]  ![][8-2-stack-B]


#### TabBar
在上一节我们介绍了ViewStack，那么让用户用什么控制ViewStack的显示比较好呢？TabBar是个不错的选择。TabBar将根据数据源，显示一组按钮，并且在同一时间，只有一个按钮会被选中，并且如果数据源是一个ViewStack的话，那么TabBar的选中项索引将和ViewStack的选中项索引保持一致。    
#####  用法1：结合ViewStack
我们修改上一节的例子，不再用timer控制ViewStack的切换，而是绑定到TabBar上面：   
``` TypeScript
var tabbar:swan.TabBar = new swan.TabBar;
tabbar.dataProvider = this.viewStack;
this.addChild( tabbar );
console.log( "tabbar:", tabbar.numElements, tabbar.elementsContent );
//show
this.viewStack.y = 200;
this.addChild( this.viewStack );
```


[8-2-stack-A]: image/8/8-2-stack-A.jpg
[8-2-stack-B]: image/8/8-2-stack-B.jpg