#Lark Core 编程指南 - 了解Graphics类

每个 Shape对象都具有一个 graphics 属性，它是 Graphics 类的一个实例。Graphics 类包含用于绘制线条、填充
和形状的属性和方法。在Lark中，只有Shape含有graphics属性，因此如果希望能够在显示对象上绘制图形内容，并且
还希望该对象包含其他显示对象，请使用 Sprite 实例作为容器，在其中添加一个Shape实例，在其中进行绘制。   
