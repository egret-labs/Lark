#Swan (UI库) 编程指南 - 列表


列表组件 List ，继承自 DataGroup，它和 DataGroup 的区别在于：
* 在 List 中选中一项，会触发 swan.ItemTapEvent.ITEM_TAP 事件，然后您就可以执行后续的逻辑处理
* 可以设置 List 中的默认选项

下面来看看List的基本用法：
``` TypeScript
class Main extends swan.Group {
    constructor() {
        super();
    }
    private list:swan.List;
    protected createChildren() {
        super.createChildren();
        var exml = `
        <s:Skin xmlns:s="http://ns.egret.com/swan" states="up,down" height="50">
            <s:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/>
        </s:Skin>`;
        var list = new swan.List();
        list.dataProvider = new swan.ArrayCollection(["item1","item2","item3"]);
        list.itemRendererSkinName = exml;
        this.addChild(list);
        this.list = list;
        list.selectedIndex = 1;//设置默认选中项
        list.on(swan.ItemTapEvent.ITEM_TAP,this.onChange,this);
    }
    private onChange(e:swan.PropertyEvent):void{
    	//获取点击消息
        console.log(this.list.selectedItem,this.list.selectedIndex)
    }
}
```
效果如下：
![](./image/9/9_3_1.png)
~~~
设置默认选中项
list.selectedIndex = 1;
~~~
~~~
获取当前选中项的信息
list.selectedItem
list.selectedIndex
~~~