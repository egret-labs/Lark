EXML中的数据绑定
=============================

##绑定数据源

List 是一种非常常见的数据绑定使用场景，我们需要指定数据在数据渲染器(ItemRenderer)中的展现方式。

下面是一个 List 组件的例子

```xml
<?xml version="1.0" encoding="utf-8"?>
<s:Group class="components.ListGroup" xmlns:s="http://ns.egret.com/swan">
    <s:Scroller left="1" right="1" top="1" bottom="1">
        <s:List id="list">
            <s:itemRenderer>
                <s:ItemRenderer states="up,down,disabled" touchThrough="false">
                    <s:Image includeIn="down"
                             source="resource/assets/blue/ItemRenderer/selected.png"/>
                    <s:Label text="{data.label}" />
                </s:ItemRenderer>
            </s:itemRenderer>
            <s:ArrayCollection>
                <s:Array>
                    <s:Object label="项目1"/>
                    <s:Object label="项目2"/>
                    <s:Object label="项目3"/>
                    <s:Object label="项目4"/>
                </s:Array>
            </s:ArrayCollection>
        </s:List>
    </s:Scroller>
</s:Group>
```

List 的 itemRenderer 中 `<s:Label text="{data.label}" />` 表示这个 Label 将显示 `ItemRenderer`
中数据对象 `data` 的 `label` 属性。 

由于 List 的 itemRenderer 属性需要一个 实现了 `IItemRenderer` 接口的类定义，
所以这里的 `<s:ItemRenderer../>` 会被编译成为一个继承自 `ItemRenderer` 的内部类，`<s:Label text="{data.label}" />`
中的绑定表达式的作用域被限制在这个内部类中。所以 `text="{data.label}"` 最终实现的效果相当于在这个内部类中调用
```javascript
	this.label.text = this.data.label;
```
这一表达式将会在对 `data` 赋值时自动处理。

##绑定其他组件属性

UI 中经常遇到一个展示组件随另一个输入组件变化的行为。通过数据绑定可以很方便的实现这一效果。

```xml
<s:Group class="components.SliderGroup" xmlns:s="http://ns.egret.com/swan">
    <s:VSlider id="vSlider"  maximum="100"/>
    <s:Label text="Silder当前的数值是:"/>
    <s:Label text="{vSlider.value}" x="200"/>
</s:Group>
```
例子中指定 id 的 `VSilder` 会被赋值给组件的 `vSlider` 属性，于是
```xml
<s:Label text="{vSlider.value}" x="200"/>
```
相当于执行了
```javascript
this.label2.text = this.vSlider.value
```
由于 `VSlider` 实现了 `lark.IEventEmitter`，当我们拖动 `vSlider` 时，它会派发 `value` 改变的通知，
swan 便可以立即更新 Label 中显示的文本。