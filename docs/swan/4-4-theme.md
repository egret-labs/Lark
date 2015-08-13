#Swan (UI库) 编程指南 - 配置主题
我们在[皮肤部件](4-2-skin-part.md)一节中介绍了如何将皮肤设置到逻辑组件上。但如果有一个全局通用的默认皮肤，我们需要每次实例化组件时都赋值一次皮肤，这样还是挺麻烦的。因此我们提供了一个主题机制，能够让您为指定的组件配置默认皮肤，全局指定一次即可，之后直接实例化组件，不再需要显式设置组件的skinName属性。下面来看一个主题配置文件的例子：

theme.json:

```
{
  "skins":{
    "swan.Button":"skins/blue/ButtonSkin.exml",
    "swan.CheckBox":"skins/blue/CheckBoxSkin.exml",
    "swan.HScrollBar":"skins/blue/HScrollBarSkin.exml",
    "swan.HSlider":"skins/blue/HSliderSkin.exml",
    "swan.Panel":"skins/blue/PanelSkin.exml",
    "swan.ProgressBar":"skins/blue/ProgressBarSkin.exml",
    "swan.RadioButton":"skins/blue/RadioButtonSkin.exml",
    "swan.Scroller":"skins/blue/ScrollerSkin.exml",
    "swan.ToggleSwitch":"skins/blue/ToggleSwitchSkin.exml",
    "swan.VScrollBar":"skins/blue/VScrollBarSkin.exml",
    "swan.VSlider":"skins/blue/VSliderSkin.exml"
  }
}
```

可以看出主题配置文件很简单，就是一个标准的JSON文件，键是组件的类名，值是你需要赋值给这个组件skinName属性的值。可以是exml文件路径，也可以是EXML文件上注册的类名（跟节点上的class属性）。

启用这个主题也很简单，只要在项目初始化时调用一句代码即可：

```
class Main extends lark.Sprite {
    
    public constructor(){
        this.once(lark.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
    }
    
    public onAddedToStage(event:lark.Event):void{
        new swan.Theme("resource/theme.json", this.stage);
    }
}
```

创建了Theme之后，它会开始异步加载指定的主题文件并解析，在加载的过程中，如果已经有组件在创建，也不需要额外处理，这部分组件在主题加载完成后会自动重新查询一次默认皮肤。

特别注意一下，主题配置文件只是起到设置默认值的作用，并不能运行时切换所有默认皮肤。因为这么做需要遍历整个显示列表，开销比较大。