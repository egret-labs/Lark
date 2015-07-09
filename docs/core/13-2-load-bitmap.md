#Lark Core 编程指南 - 加载位图文件

Lark为加载位图文件准备了专门的类 ImageLoader 。
使用 ImageLoader 类通过如下代码加载位于 'resources/lark.png' 的图片： 
``` TypeScript
var imgLoader:lark.ImageLoader = new lark.ImageLoader;
imgLoader.once( lark.Event.COMPLETE, this.imgLoadHandler, this ); 
imgLoader.load( "resources/lark.png" );  
```
则在所定义的回调事件中，可以这样来获取该图片对应的 BitmapData，并以此来创建位图：
``` TypeScript
private imgLoadHandler( evt:lark.Event ):void{
    var loader:lark.ImageLoader = evt.currentTarget;
    var bmd:lark.BitmapData = loader.data;
    var bmp:lark.Bitmap = new lark.Bitmap( bmd );
}
```
注意：由于HTML5标准普及率限制，目前ImageLoader还无法抛出加载进度事件。
