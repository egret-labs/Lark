#Swan (UI库) 编程指南 - 进度条

我们可以使用 swan.ProgressBar 进度条控件来显示随时间变化的进度任务。跟前面的滑块 swan.Slider 控件一样，进度条控件也继承自 swan.Range 控件。也就是说 swan.Progress 进度条控件也可以设置 maximum 、minimum 、value 、等属性。

首先，我们准备好组件皮肤所需要的素材，如下图所示：

![](image/7-8-progressbar-skin.png)

在项目中src目录下新建一个 skins 目录，存放我们的皮肤 skins/ProgressBarSkin.exml ,具体内容如下（图片资源已经在相应路径内）:

``` XML
<?xml version="1.0" encoding="utf-8"?>
<s:Skin class="skins.ProgressBarSkin" minWidth="30" minHeight="18" xmlns:s="http://ns.egret.com/swan">
	<s:Image source="resource/assets/blue/ProgressBar/track.png" scale9Grid="1,1,4,4" width="100%"
			 height="100%" verticalCenter="0"/>
	<s:Image id="thumb" height="100%" width="100%" source="resource/assets/blue/ProgressBar/thumb.png"/>
	<s:Label id="labelDisplay" textAlign="center" verticalAlign="middle"
			 fontSize="15" fontFamily="Tahoma" textColor="0x707070"
			 horizontalCenter="0" verticalCenter="0"/>
</s:Skin>
```

接下来我们创建一个进度条组件，在程序中我们新建一个 ProgressDemo 类，并添加一个 myProgress。代码如下:

``` TypeScript
class ProgressDemo extends swan.Group {
    public constructor() {
        super();
    }
    private myProgress:swan.ProgressBar = new swan.ProgressBar();   //新建一个进度条控件
}
```

跟前面的章节一样，我们需要给组件指定皮肤才可以让他显示出来。我们可以在构造函数中使用 skinName 属性指定我们刚才准备好的皮肤资源。这里皮肤资源可以是外部文件，也可以是直接指定。若是外部文件资源可以监听其加载完成。

需要注意的是，我们需要指定进度条控件的宽度才能让他很好的显示出来，例如我们在下面添加他的属性，宽度为500，最大值1024，最小值0。修改上面的代码如下：

``` TypeScript
class ProgressDemo extends swan.Group {
    public constructor() {
        super();
        this.myProgress.skinName = "skins/ProgressBarSkin.exml";        //定义外部皮肤文件
        this.myProgress.once(lark.Event.COMPLETE, this.loaded, this);   //监听加载完成
    }
    private myProgress:swan.ProgressBar = new swan.ProgressBar();
    private loaded(e:lark.Event){

        console.log("my progress loaded");

        this.myProgress.maximum = 1024;                                 //设置进度条的最大值
        this.myProgress.minimum = 0;                                    //设置进度条的最小值

        this.myProgress.width = 500;                                    //设置进度条的宽度                  
        this.myProgress.height = 30;
        this.addChild(this.myProgress);

        this.myProgress.value = 50;                                     //设置进度条的初始值
    }
}
```

需要注意的是，我们的 ProgressDemo 类的实例需要被添加至舞台，具体可参见其他章节。编译运行项目我们可以看到 ProgressDemo 已经显示出来了。

![](image/7-8-progressbar-1.png)

下面我们模拟一下时间进度事件，在 myProgress 上面监听 swan.ENTER_FRAME 事件，让他每一帧增加给 value 的值 1。

在 loaded() 中添加如下监听：

``` TypeScript
this.myProgress.on(lark.Event.ENTER_FRAME,this.onFrame,this);
```

在 ProgressDemo 中添加 onFrame 处理函数：

``` TypeScript
    private onFrame(e:lark.Event) {
        this.myProgress.value += 1;
    }
```

这样可以看到我们的进度条 myProgress 在随着时间的增长而增长。需要注意的是 value 值是不会大于 maximum 的。

![](image/7-8-progressbar-2.png)

* 上一节 [滑动选择器](7-7-slider.md)
* 下一节 [输入文本](7-9-editabletext.md)