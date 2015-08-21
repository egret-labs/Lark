#Swan (UI库) 编程指南 - 滚动控制容器

屏幕的尺寸总是有限的，当您的内容已经超出屏幕的范围，该如何处理呢？在上网浏览网页的时候，我们是如何看到屏幕显示不下的那些内容呢？没错，用滚动条。通过拉动滚动条，我们就能一点一点的看完整个网页。这里就引入了一个概念：视口(ViewPort)，如下图所示：     

![][8-4-scroller-A]     

可以这样理解：视口就是您的显示器，内容可以在视口中滚动，这样您就可以看到本来是隐藏的那些部分。在PC上，我们用滚动条来控制内容滚动，在手机上就比较特殊了，我们是用手指的滑动，来实现和滚动条类似的效果。对于移动设备的浏览器来说，"滚动"是内置的功能，一个网页不需要特殊设置就能使用这个功能。但对Egret来说，"滚动"却是需要自己实现的，因为Egret一般情况下要禁用浏览器的滚动，以免对交互造成干扰。对于在Canvas上绘制的内容，"滚动"是需要自己去"虚拟实现"的。      

好在Egret GUI中已经提供了一个组件，就是egret.gui.Scroller。您只需要创建一个Scroller的实例，设置位置和尺寸，然后把需要"滚动"的那个容器，设置到Scroller的viewport属性上就可以了。     

这里我们还是用"egret_labs"这个图片做例子，这是一个比较大的图片，手机屏幕是显示不下的，然后我们看看如何交给Scroller来处理：     

``` TypeScript
//创建一个Scroller
var myController:swan.Scroller = new swan.Scroller();
//注意位置和尺寸的设置是在Scroller上面，而不是容器上面
myController.x = 40;
myController.y = 40;
myController.width = 400;
myController.height = 300;
//创建容器
var group:swan.Group = new swan.Group();
//创建一个大图添加到容器上
group.addChild( RES.getRes("egret_labs") );
//设置viewport
myController.viewport = group;
this.addChild(myController);
```
> 注意位置和尺寸的约束应该是在Scroller上面，而不是容器上面，这是新手容易犯的错误，需要注意

实现效果：   

![][8-4-scroller-B]     


[8-4-scroller-A]: image/8/8-4-scroller-A.png
[8-4-scroller-B]: image/8/8-4-scroller-B.png