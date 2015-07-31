#Lark Core 编程指南 - 改变位置
对任何显示对象进行的最基本操作是确定显示对象在屏幕上的位置。若要设置显示对象的位置，请更改对象的 x 和 y 属性。
```  TypeScript
mySprite.x = 17;
mySprite.y = 212;
 ```
 显示对象定位系统将舞台视为一个笛卡尔坐标系（带有水平 x 轴和垂直 y 轴的常见网格系统）。坐标系的原点（x 和 y 轴相交的 0,0 坐标）位于舞台的左上角。从原点开始，x 轴的值向右为正，向左为负，而 y 轴的值向下为正，向上为负（与典型的图形系统相反）。例如，通过前面的代码行可以将对象 mySprite 移到 x 轴坐标 17（原点向右 17 个像素）和 y 轴坐标 212（原点向下 212 个像素）。

 默认创建显示对象时，x 和 y 属性均设置为 0，从而可将对象放在其父内容的左上角。

##改变相对于舞台的位置

 x 和 y 属性始终是指显示对象相对于其父显示对象坐标轴的 0,0 坐标的位置，记住这一点很重要。因此，对于包含在 Sprite 实例内的 Shape 实例（如圆），如果将 Shape 对象的 x 和 y 属性设置为 0，则会将圆放在 Sprite 的左上角，该位置不一定是舞台的左上角。若要确定对象相对于全局舞台坐标的位置，可以使用任何显示对象的 globalToLocal() 方法将坐标从全局（舞台）坐标转换为本地（显示对象容器）坐标，如下所示：
 ```  TypeScript
 //创建一个空的 Sprite，把它的 x 和 y 坐标都改为
var mySprite: lark.Sprite = new lark.Sprite();
mySprite.x = 200;
mySprite.y = 200;
this.addChild(mySprite);

//画一个红色的圆，添加到 mySprite 中
var circle: lark.Shape = new lark.Shape();
circle.graphics.fillStyle = "rgb(255,0,0)";
circle.graphics.arc(25, 25, 25, 0, Math.PI * 2, false);
circle.graphics.fill();
mySprite.addChild(circle);

//给圆增加点击事件
circle.on(lark.TouchEvent.TOUCH_TAP,onClick,this);

function onClick():void{
   //把舞台左上角的坐标(0,0)转换为 mySprite 内部的坐标
   var targetPoint: lark.Point = mySprite.globalToLocal(0,0);
   //重新定位圆，可以看到圆形移到了屏幕的左上角
   circle.x = targetPoint.x;
   circle.y = targetPoint.y;
}
  ```
同样，也可以使用 DisplayObject 类的 localToGlobal() 方法将本地坐标转换为舞台坐标。
##通过触摸移动显示对象
您可以通过触摸来移动显示对象，当手指按到屏幕时监听 TOUCH_MOVE 事件，然后每次手指移动时都会调用此函数，使拖动的对象跳到手指所在的x,y坐标。当手指离开屏幕后取消监听，对象停止跟随。如下所示：
```  TypeScript
//设定2个偏移量
var offsetX:number;
var offsetY:number;

//画一个红色的圆
var circle: lark.Shape = new lark.Shape();
circle.graphics.fillStyle = "rgb(255,0,0)";
circle.graphics.arc(50, 50, 50, 0, Math.PI * 2, false);
circle.graphics.fill();
this.addChild(circle);

//手指按到屏幕，触发 startMove 方法
circle.on(lark.TouchEvent.TOUCH_BEGIN,startMove,this);

//手指离开屏幕，触发 stopMove 方法
circle.on(lark.TouchEvent.TOUCH_END,stopMove,this);

function startMove(e:lark.TouchEvent):void{
  //计算手指和圆形的距离
  offsetX = e.stageX - circle.x;
  offsetY = e.stageY - circle.y;
  //手指在屏幕上移动，会触发 onMove 方法
  circle.on(lark.TouchEvent.TOUCH_MOVE,onMove,this);
}

function stopMove(e:lark.TouchEvent) {console.log(22);
  //手指离开屏幕，移除手指移动的监听
  circle.removeListener(lark.TouchEvent.TOUCH_MOVE,onMove,this);
}

function onMove(e:lark.TouchEvent):void{
  //通过计算手指在屏幕上的位置，计算当前圆形的坐标，达到跟随手指移动的效果
  circle.x = e.stageX - offsetX;
  circle.y = e.stageY - offsetY;
}
 ```
 除了使显示对象跟随手指移动之外，经常需要将拖动的对象移动到显示列表的前方，就像是浮动在其他对象上面。

 以下代码（根据上一示例改写）使两个显示对象（一个圆形和一个正方形）可跟随手指移动。只要手指在任意显示对象上按下，该显示对象就会移到舞台显示列表的顶部，所以拖动的对象始终出现在顶部。
 ```  TypeScript
 //要拖拽的对象
 var draggedObject:lark.Shape;
 var offsetX:number;
 var offsetY:number;

 //画一个红色的圆
 var circle: lark.Shape = new lark.Shape();
 circle.graphics.fillStyle = "rgb(255,0,0)";
 circle.graphics.arc(50, 50, 50, 0, Math.PI * 2, false);
 circle.graphics.fill();
 this.addChild(circle);

 //画一个蓝色的正方形
 var square:lark.Shape = new lark.Shape();
 square.graphics.fillStyle = "rgb(0,0,255)";
 square.graphics.fillRect(0,0,100,100);
 this.addChild(square);

 //增加圆形的触摸监听
 circle.on(lark.TouchEvent.TOUCH_BEGIN,startMove,this);
 circle.on(lark.TouchEvent.TOUCH_END,stopMove,this);

 //增加正方形的触摸监听
 square.on(lark.TouchEvent.TOUCH_BEGIN,startMove,this);
 square.on(lark.TouchEvent.TOUCH_END,stopMove,this);

 function startMove(e:lark.TouchEvent):void{
   //把手指按到的对象记录下来
   draggedObject = e.currentTarget;
   //计算手指和要拖动的对象的距离
   offsetX = e.stageX - draggedObject.x;
   offsetY = e.stageY - draggedObject.y;
   //把触摸的对象放在显示列表的顶层
   this.addChild(draggedObject);
   //手指在屏幕上移动，会触发 onMove 方法
   this.stage.on(lark.TouchEvent.TOUCH_MOVE,onMove,this);
 }
 function stopMove(e:lark.TouchEvent) {console.log(22);
   //手指离开屏幕，移除手指移动的监听
   this.stage.removeListener(lark.TouchEvent.TOUCH_MOVE,onMove,this);
 }
 function onMove(e:lark.TouchEvent):void{
   //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
   draggedObject.x = e.stageX - offsetX;
   draggedObject.y = e.stageY - offsetY;
 }
  ```
  若要进一步扩展这种效果，如在几副纸牌（或几组标记）之间移动纸牌（或标记）的游戏中，您可以在“拿出”拖动对象时将拖动对象添加到舞台的显示列表中，然后在“放入”拖动对象时（通过松开鼠标按键）将拖动对象添加到另一个显示列表中（如“那副纸牌”或“那组标记”）。
