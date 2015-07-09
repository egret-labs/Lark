#Lark Core 编程指南 - 平移和滚动显示对象
如果显示对象太大，不能在要显示它的区域中完全显示出来，则可以使用 scrollRect 属性定义显示对象的可查看区域。此外，通过更改 scrollRect 属性，可以使内容左右平移或上下滚动。

scrollRect 属性是 Rectangle 类的实例，Rectangle 类包括将矩形区域定义为单个对象所需的有关值。最初定义显示对象的可查看区域时，请创建一个新的 Rectangle 实例并为该实例分配显示对象的 scrollRect 属性。以后进行滚动或平移时，请将 scrollRect 属性读入单独的 Rectangle 变量，然后更改所需的属性（例如，更改 Rectangle 实例的 x 属性进行平移，或更改 y 属性进行滚动）。然后将该 Rectangle 实例重新分配给 scrollRect 属性，将更改的值通知显示对象。

例如，下面的代码定义名为 bigText 的 TextField 对象的可查看区域。单击名为 btnLeft 和 btnRight 的两个按钮时，它们调用的函数通过修改 scrollRect Rectangle 实例的 x 属性而使 TextField 对象的内容向左或向右平移。
```  TypeScript
//创建一个文本框,设定一个scrollRect限制显示范围
var bigText: lark.TextField = new lark.TextField();
bigText.text = "平移和滚动显示对象,平移和滚动显示对象";
bigText.scrollRect = new lark.Rectangle(0, 0, 200, 50);
bigText.cacheAsBitmap = true;
this.addChild(bigText);

//创建一个按钮,点击后控制文本内容向左移动
var btnLeft: lark.Shape = new lark.Shape();
btnLeft.graphics.fillRect(0, 0, 50, 50);
btnLeft.x = 50;
btnLeft.y = 100;
this.addChild(btnLeft);
btnLeft.on(lark.TouchEvent.TOUCH_TAP, onScroll, this);

//创建一个按钮,点击后控制文本内容向右移动
var btnRight: lark.Shape = new lark.Shape();
btnRight.graphics.fillRect(0, 0, 50, 50);
btnRight.x = 150;
btnRight.y = 100;
this.addChild(btnRight);
btnRight.on(lark.TouchEvent.TOUCH_TAP, onScroll, this);

//点击按钮后,控制文本向左右移动的方法
function onScroll(e: lark.TouchEvent): void {
  var rect: lark.Rectangle = bigText.scrollRect;
  switch (e.currentTarget) {
    case btnLeft:
      rect.x += 20;
      break;
    case btnRight:
      rect.x -= 20;
      break;
  }
  bigText.scrollRect = rect;
}
 ```
 正如此示例所示，使用显示对象的 scrollRect 属性时，最好使用 cacheAsBitmap 属性将显示对象的内容缓存为位图。这样，每次滚动显示对象时，就不必重绘显示对象的整个内容，而只需改用缓存的位图即可将所需部分直接呈示到屏幕上。有关详细信息，请参阅[缓存显示对象](7-4-cacheAsBitmap.md)。
