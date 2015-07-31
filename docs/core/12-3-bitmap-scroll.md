#Lark Core 编程指南 - 滚动位图

设想您创建了一个街道图应用程序，每次用户移动该图时，都需要您更新视图 （即使该图只移动了几个像素）。    
创建此功能的一种方式是，每次用户移动街道图时，均重新呈示包含更新的街道图视图的新图像。或者，创建一个大型图像，并使用 scrollRect 属性。   
scrollRect 属性用于设置显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。滚动的显示对象始终以整像素为增量进行滚动。您可以通过设置 scrollRect Rectangle 对象的 x 属性来左右滚动对象， 还可以通过设置scrollRect 对象的 y 属性来上下滚动对象。如果显示对象旋转了 90 度，并且您左右滚动它，则实际上显示对象会上下滚动。   
> 注意：要改变一个显示对象 scrollRect 属性的值，您必引用整个 scrollRect 对象，然后将它重新赋值给显示对象的 scrollRect 属性。   

如下代码将位图bmp在其本身大小的矩形区域内进行水平向右移动，并会判断当移动到消失时，重新出现在左侧。
``` TypeScript
class Main extends lark.Sprite {
    constructor() {
        super();
        
        var imgLoader:lark.ImageLoader = new lark.ImageLoader;
        imgLoader.once( lark.Event.COMPLETE, this.imgLoadHandler, this ); 
        imgLoader.load( "resources/lark.png" );  
    }

    imgLoadHandler( evt:lark.Event ):void{
        var loader:lark.ImageLoader = evt.currentTarget;
        var bmd:lark.BitmapData = loader.data;
        var bmp:lark.Bitmap = new lark.Bitmap( bmd );
        this.addChild(bmp);

        var rect:lark.Rectangle = bmp.scrollRect = new lark.Rectangle( 0, 0, bmp.width, bmp.height );
        var move = function():void{
            rect.x -= 2;
            if( rect.x < bmp.x - bmp.width ){
                rect.x = bmp.width;
            }
            bmp.scrollRect = rect;
            console.log( rect.x, bmp.x );
        }

        this.on( lark.Event.ENTER_FRAME, move, this );
    }

}
```
