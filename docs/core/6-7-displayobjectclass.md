#Lark Core 编程指南 - 选择DisplayObject子类


可选的子类有多个，使用显示对象时要做出的一个重要决策是：每个显示对象的用途是什么。以下原则可以帮助您作出决策。无论是需要类实例，还是选择要创建的类的基类，这些建议都适用：

1. 用于显示位图图像的 Bitmap。
2. 用于添加文本的 TextField 或 TextInput。
3. 用于绘制矢量图的 Shape。
4. 如果需要将一个对象用作其他显示对象的容器，请选择一个实现 DisplayObjectContainer 接口的类，例如Sprite。
