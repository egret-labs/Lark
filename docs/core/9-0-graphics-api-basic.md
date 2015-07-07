#Lark Core 编程指南 - 绘图API基础知识

Lark力求内核精简，直接暴露Canvas的标准绘图API。使得开发者可以自由发挥原生Canvas本身提供的强大功能。
 
直接暴露Canvas的API另外一个好处就是，我们可以直接将相关的资源，比如某种巧妙的绘图API使用技巧，或者解决该部分功能的某个特定问题的方法，都可以在Lark上直接使用。
 
所以，我们也需要对Lark中的绘图环境与H5中Canvas的绘图环境的对应关系有清楚的了解。

常规的H5开发通过从DOM中Canvas对象取得绘图环境(context)：
var context = canvas.getContext("2d");
然后在context上调用各种绘图API进行绘制操作。
 
 在Lark中，对应的绘图环境为Shape类实例的graphics属性。
 > 注意：Lark中，只有在Shape类实例中可以访问graphics。在其他显示对象，比如Sprite类实例中是没有graphics属性，也就是说无法使用绘图API的。