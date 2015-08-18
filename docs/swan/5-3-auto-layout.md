#Swan (UI库) 编程指南 - 自动布局原理


自动布局本质上就是封装了各种更加便捷的相对布局属性，结合[失效验证机制](5-2-invalidate.md)，在合适的触发条件下(如尺寸发生改变时)，自动设置相关对象的x，y,width,height等属性。所以无论过程是怎么样的，最终结果都是直接体现在x,y,width,height这些最原始的属性上，并没有脱离显示对象原始的API。

在上一节内容中，我们简单介绍了跟布局有关的两个方法：measure()和updateDisplayList()。现在我们来详细说明这个两个方法：

updateDisplayList()方法负责布局子项(即设置子项的x,y,width,height),或做一些矢量重绘操作。这个方法很好理解，具体的布局功能就是在这里实现的。那为什么要measure()呢？举个例子，你有一个容器(Group)，里面放了一个单行文本(Label)，你想要文本始终在容器中水平居中(horizotalCenter=0)。那么你不显式设置文本的width即可，这时measure()方法就派上用场了，它会在文本内容改变时，自动测量出当前合适的width，父级就会根据这个width，重新布局它的xy。

Swan里所有的组件都是这样：如果你不显式设置它的宽高，它就调用measure()方法给自己测量出一个最佳尺寸，在没有被父级强制布局情况下，这个值最终赋值给width和height属性。反之，如果你显式设置了组件的width或height属性，width或height就使用你显式设置的值。若组件同时被设置了width和height，measure()方法将不会再被调用。至于何为测量的”最佳尺寸”？不同的组件有自己的测量方式，容器是能刚好放下所有子项的尺寸，文本是能完整显式文本内容的尺寸，而Image则是内部要显示的位图素材的尺寸。还有其他的组件，具体在各自的measure()方法里实现。多个组件都需要测量的时候，会按照显式列表深度，从内向外测量。而布局阶段正好相反，从外向内。具体细节参考[失效验证机制](5-2-invalidate.md)的内容。

总之，如果你希望你自定义的组件像框架里的标准组件一样，能加入自动布局体系，就必须要同时复写measure()和updateDisplayList()这两个方法。我们就先来看Group这个容器基类。它就一个类，是如何实现的多种多样的布局方式的呢？答案是：它不负责具体的布局规则，而是做了一个解耦处理。增加了一个layout的属性，类型为LayoutBase。我们先看下Group的那两个方法体里写了什么：

```
protected measure():void {
    if (!this.$layout) {
        this.setMeasuredSize(0, 0);
        return;
    }
    this.$layout.measure();
}

protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
    if (this.$layout) {
        this.$layout.updateDisplayList(unscaledWidth, unscaledHeight);
    }
    this.updateScrollRect();
}
```
Group把自己的measure()方法交给了layout.measure()去实现，updateDisplayList()交给了layout.updateDisplayList()去实现。也就是把具体的布局方式解耦了出来，成了独立的一个LayoutBase类。这样所有的容器都可以采用Group+LayoutBase的组合的方式，为自己设置任意的布局。

