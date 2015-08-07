#Swan (UI库) 编程指南 - 滑动选择器

Swan 库中给我们提供了两种滑块控件，swan.HSlider 水平滑块控件和 swan.VSlider 垂直滑块控件。他们都继承自 swan.SliderBase 基类，效果也相同，只是一个是水平控件，一个是垂直控件。他们都可以使用基类 swan.SliderBase 的属性和方法。下面以 swan.HSlider 为例，介绍如何使用滑动选择器控件.

## 水平滑块控件

首先，我们准备好组件皮肤所需要的素材，如下图所示：

![](image/7-7-slider-skin.png)

在项目中src目录下新建一个 skins 目录，存放我们的皮肤 skins/HSliderSkin.exml ,具体内容如下（图片资源已经在相应路径内）:

``` XML
<?xml version="1.0" encoding="utf-8"?>
<s:Skin class="skins.VSliderSkin" minWidth="25" minHeight="30" xmlns:s="http://ns.egret.com/swan">
    <s:Image id="track" source="resource/assets/blue/Slider/track.png" scale9Grid="1,1,4,4" width="7" height="100%" horizontalCenter="0"/>
    <s:Image id="thumb" source="resource/assets/blue/Slider/thumb.png" horizontalCenter="0" />
</s:Skin>
```

接下来我们创建一个滑块组件，在程序中我们新建一个 SliderDemo 类，并添加一个 myHSlider。代码如下:

``` TypeScript
class SliderDemo extends swan.Group{
    public constructor() {
        super();
    }
    private myHSlider:swan.HSlider = new swan.HSlider();   // 新建一个滑块
    private myHSliderLable:swan.Label = new swan.Label(); //新建一个标签用于以后显示滑块的值
}
```

跟前面的章节一样，我们需要给组件指定皮肤才可以让他显示出来。我们可以在构造函数中使用 skinName 属性指定我们刚才准备好的皮肤资源。这里皮肤资源可以是外部文件，也可以是直接指定。若是外部文件资源可以监听其加载完成。

需要注意的是，我们需要指定滑块控件的宽度才能让他很好的显示出来，例如我们在下面添加他的属性，宽度为500，最大值1024，最小值0，并用上面的 lable 来显示滑块的值。修改上面的代码如下：

``` TypeScript
class SliderDemo extends swan.Group{
    public constructor() {
        super();
        this.myHSlider.skinName = "skins/HSliderSkin.exml"; //定义外部皮肤文件
        this.myHSlider.once(lark.Event.COMPLETE,this.hsliderLoaded,this); //监听加载完成
    }
    private myHSlider:swan.HSlider = new swan.HSlider();
    private myHSliderLable:swan.Label = new swan.Label();
    private hsliderLoaded(e:lark.Event) {
        
        this.myHSliderLable.text = "value:0";                   //设置标签的初始值
        this.myHSliderLable.y = this.myHSlider.height + 10;     //设置标签在滑块的下面
        this.myHSliderLable.horizontalCenter = 0;               //设置标签的居中属性
        this.addChild(this.myHSliderLable);                     //添加到显示列表
        this.addChild(this.myHSlider);                          //添加到显示列表

        this.myHSlider.width = 500;                             //设置滑块的宽度
        this.myHSlider.maximum = 1024;                          //设置滑块的最大值
        this.myHSlider.minimum = 0;                             //设置滑块的最小值
    }
}
```

需要注意的是，我们的 SliderDemo 类的实例需要被添加至舞台，具体可参见其他章节。编译运行项目我们可以看到 SliderDemo 已经显示出来了。

![](image/7-7-slider-1.png)

通过监听其CHANGE事件可以动态获取滑块的值，通过 pendingValue 属性来获得其值。

在 hsliderLoaded() 函数中添加相关监听即可，代码如下：

``` TypeScript
this.myHSlider.on(lark.Event.CHANGE,this.onHChange,this);       //监听滑块滑动的过程
```

在 SliderDemo 中添加相关处理函数：

``` TypeScript
   private onHChange(e:lark.Event){
        this.myHSliderLable.text = "value:" + this.myHSlider.pendingValue;  //将滑块的值显示出来
    }
```

之后我们就可以看到获得的滑块值。

![](image/7-7-slider-2.png)

需要注意的是 liveDragging 属性如果被设置为 false 那么 pendingValue 将不会时时变化。

* 上一节 [切换按钮](7-6-toggle.md)
* 下一节 [进度条](7-8-progressbar.md)