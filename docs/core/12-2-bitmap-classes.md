#Lark Core 编程指南 - Bitmap和BitmapData类

Lark中使用位图图像的主要类是 Bitmap 类和 BitmapData 类，前者用于在屏幕上显示位图图像，后者用于访问和处理位图的原始图像数据。

#### 了解 Bitmap 类

作为 DisplayObject 类的子类， Bitmap 类是用于显示位图图像的主要 Lark 类。这些图像可通常通过 lark.ImageLoader 类加载获得 BitmapData 对象并使用 Bitmap() 构造函数动态地创建。 从外部源加载图像时，Bitmap 对象只能使用 JPEG 或 PNG 格式的图像。实例化后，可将 Bitmap 实例视为需要呈示在舞台上的 BitmapData 对象的包装。由于 Bitmap 实例是一个显示对象，因此可以使用显示对象的所有特性和功能来操作 Bitmap 实例。

#### 像素平滑

除了所有显示对象常见的功能外， Bitmap 类还提供了特定于位图图像的一些附加功能。   
Bitmap 类的 smoothing 属性是个布尔值，控制 Bitmap 对象在缩放时是否对位图进行平滑处理。

#### 了解 BitmapData 类

BitmapData 类可以看作是加载的位图图像中包含的像素的照片快照。   
BitmapData 实例通常是在 ImageLoader 实例加载图片完成时，从其中的 data 属性取值。   
假如 ImageLoader 类通过如下代码加载位于 'resources/lark.png' 的图片： 
``` TypeScript
var imgLoader:lark.ImageLoader = new lark.ImageLoader;
imgLoader.once( lark.Event.COMPLETE, this.imgLoadHandler, this ); 
imgLoader.load( "resources/lark.png" );  
```
则在所定义的回调事件中，可以这样来获取该图片对应的 BitmapData：
``` TypeScript
imgLoadHandler( evt:lark.Event ):void{
    var loader:lark.ImageLoader = evt.currentTarget;
    var bmd:lark.BitmapData = loader.data;
    var bmp:lark.Bitmap = new lark.Bitmap( bmd );
    this.addChild(bmp);
}
```
