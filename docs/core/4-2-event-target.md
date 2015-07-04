#Lark Core 编程指南 - 事件对象

事件对象
在新的事件处理系统中，事件对象有两个主要用途。首先，事件对象通过将特定事件的信息存储在一组属性中，来代表实际事件。第二，事件对象包含一组方法，可用于操作事件对象和影响事件处理系统的行为。

为方便对这些属性和方法的访问，Flash Player API 定义了一个 Event 类，作为所有事件对象的基类。Event 类定义一组基本的适用于所有事件对象的属性和方法。

本部分首先讨论 Event 类属性，然后介绍 Event 类方法，最后说明 Event 类的子类存在的意义。

子主题

[了解 Event 类属性](#event-props)   
[了解 Event 类方法](#event-methods)    
[Event 类的子类](#event-subclass)     

<a name="event-props"/>

#### 了解 Event 类属性
Event 类定义许多只读属性和常数，以提供有关事件对象的重要信息。以下内容尤其重要：

* 事件对象类型由常数表示，并存储在 Event.type 属性中。
* 事件的默认行为是否可以被阻止由布尔值表示，并存储在 Event.cancelable 属性中。
* 事件流信息包含在其余属性中。

##### 事件对象类型
每个事件对象都有关联的事件类型。数据类型以字符串值的形式存储在 Event.type 属性中。知道事件对象的类型是非常有用的，这样您的代码就可以区分不同类型的事件。例如，下面的代码指定 tapHandler() 侦听器函数应响应传递给 myDisplayObject 的任何轻触事件对象。
```
myDisplayObject.addEventListener(TouchEvent.TOUCH_TAP tapHandler);
```

大约有 20 多种事件类型与 Event 类自身关联并由 Event 类常数表示，其中某些数据类型显示在摘自 Event 类定义的以下代码中：
```
module lark{
    export class Event extends LarkObject{
        // 类常数
        public static ADDED_TO_STAGE:string = "addedToStage";
        public static ADDED:String    = "added";
        // 为简便起见，省略了其余常数
    }
}
```

这些常数提供了引用特定事件类型的简便方法。您应使用这些常数而不是它们所代表的字符串。如果您的代码中拼错了某个常数名称，编译器将捕获到该错误，但如果您改为使用字符串，则编译时可能不会出现拼写错误，这可能导致难以调试的意外行为。例如，添加事件侦听器时，使用以下代码：
```
myDisplayObject.addEventListener(TouchEvent.TOUCH_TAP, tapHandler);
```

而不是使用：
```
myDisplayObject.addEventListener("touchTap", tapHandler);
```

##### 默认行为信息
代码可通过访问 cancelable 属性来检查是否可以阻止任何指定事件对象的默认行为。cancelable 属性包含一个布尔值，用于指示是否可以阻止默认行为。您可以使用 preventDefault() 方法阻止或取消与少量事件关联的默认行为。有关详细信息，请参阅取消默认事件行为。

##### 事件流信息
其余 Event 类属性包含有关事件对象及其与事件流的关系的重要信息，如以下列表所述：

* bubbles 属性包含有关事件流中事件对象参与的部分的信息。
* eventPhase 属性指示事件流中的当前阶段。
* target 属性存储对事件目标的引用。
* currentTarget 属性存储对当前正在处理事件对象的显示列表对象的引用。

##### bubbles 属性
如果事件对象参与事件流的冒泡阶段，则将该事件称为"冒泡"，这指的是从目标节点将事件对象往回传递，经过目标节点的父节点，直到到达舞台。Event.bubbles 属性存储一个布尔值，用于指示事件对象是否参与冒泡阶段。由于冒泡的所有事件还参与捕获和目标阶段，因此这些事件参与事件流的所有三个阶段。如果值为 true，则事件对象参与所有三个阶段。如果值为 false，则事件对象不参与冒泡阶段。

##### eventPhase 属性
您可以通过调查任何事件对象的 eventPhase 属性来确定事件阶段。eventPhase 属性包含一个无符号整数值，该值代表三个事件流阶段中的一个阶段。Flash Player API 定义了单独的 EventPhase 类，该类包含三个对应于三个无符号整数值的常量，如以下摘录代码中所示：
```
module lark{
    export const enum EventPhase{
        CAPTURING_PHASE = 1;
        AT_TARGET = 2;
        BUBBLING_PHASE = 3;
    }
}
```

这些常数对应于 eventPhase 属性的三个有效值。使用这些常数可以使您的代码可读性更好。例如，如果要确保仅当事件目标在目标阶段中时才调用名为 myFunc() 的函数，您可以使用以下代码来测试此条件：
```
if (event.eventPhase == EventPhase.AT_TARGET){
    myFunc();
}
```

##### target 属性
target 属性包含对作为事件目标的对象的引用。在某些情况下，这很简单，例如当麦克风变为活动状态时，事件对象的目标是 Microphone 对象。但是，如果目标在显示列表中，则必须考虑显示列表层次结构。例如，如果用户在包括重叠的显示列表对象的某一点输入一个鼠标单击，则 Flash Player 始终会选择距离舞台层次最深的对象作为事件目标。

对于复杂的 SWF 文件，特别是那些通常使用更小的子对象来修饰按钮的 SWF 文件，target 属性可能并不常用，因为它通常指向按钮的子对象，而不是按钮。在这些情况下，常见的做法是将事件侦听器添加到按钮并使用 currentTarget 属性，因为该属性指向按钮，而 target 属性可能指向按钮的子对象。

##### currentTarget 属性
currentTarget 属性包含对当前正在处理事件对象的对象的引用。您并不知道哪个节点当前正在处理您要检查的事件对象，虽然这似乎很奇怪，但请记住，您可以向该事件对象的事件流中的任何显示对象添加侦听器函数，并且可以将侦听器函数放在任何位置。而且，可以将相同的侦听器函数添加到不同的显示对象。随着项目大小和复杂性的增加，currentTarget 属性会变得越来越有用。


<a name="event-methods"/>

#### 了解 Event 类方法
共有三种类别的 Event 类方法：

* 实用程序方法：可以创建事件对象的副本或将其转换为字符串
* 事件流方法：用于从事件流中删除事件对象
* 默认行为方法：可阻止默认行为或检查是否已阻止默认行为
##### Event 流实用程序方法
Event 类中有两个实用程序方法。clone() 方法用于创建事件对象的副本。toString() 方法用于生成事件对象属性的字符串表示形式以及它们的值。这两个方法都由事件模型系统在内部使用，但对开发人员公开以用于一般用途。

对于创建 Event 类的子类的高级开发人员来说，必须覆盖和实现两个实用程序方法的版本，以确保事件子类正常使用。

##### 停止事件流
可以调用 Event.stopPropogation() 方法或 Event.stopImmediatePropogation() 方法来阻止在事件流中继续执行事件对象。这两种方法几乎相同，只有在是否允许执行当前节点的其它事件侦听器方面不同：

Event.stopPropogation() 方法可阻止事件对象移动到下一个节点，但只有在允许执行当前节点上的任何其它事件侦听器之后才起作用。
Event.stopImmediatePropogation() 方法也阻止事件对象移动到下一个节点，但不允许执行当前节点上的任何其它事件侦听器。
调用其中任何一个方法对是否发生与事件关联的默认行为没有影响。使用 Event 类的默认行为方法可以阻止默认行为。

##### 取消默认事件行为
与取消默认行为有关的两个方法是 preventDefault() 方法和 isDefaultPrevented() 方法。调用 preventDefault() 方法可取消与事件关联的默认行为。要查看是否已针对事件对象调用了 preventDefault()，请调用 isDefaultPrevented() 方法，如果已经调用，该方法将返回值 true，否则返回值 false。

仅当可以取消事件的默认行为时，preventDefault() 方法才起作用。可通过参考该事件类型的 API 文档或使用 ActionScript 检查事件对象的 cancelable 属性来确定是否属于这种情况。

取消默认行为对事件对象通过事件流的进度没有影响。使用 Event 类的事件流方法可以从事件流中删除事件对象。

<a name="event-subclass"/>

#### Event 类的子类
对于很多事件，Event 类中定义的一组公共属性已经足够了。但是，Event 类中可用的属性无法捕获其它事件具有的独特的特性。Flash Player API 为这些事件定义了 Event 类的几个子类。

每个子类提供了对于该事件类别来说唯一的附加属性和事件类型。例如，与触摸输入相关的事件具有若干独特的特性，无法被 Event 类中定义的属性捕获。TouchEvent 类添加了若干个属性，扩展了 Event 类。这些属性包含诸如鼠标事件的位置和在鼠标事件过程中是否按下了特定键等信息。

Event 子类还包含代表与子类关联的事件类型的常量。例如，TouchEvent 类定义几种触摸事件类型的内容，包括 touchTap、touchBegin 和 touchEnd 事件类型。
<!--[?]创建 Event 子类时，您必须覆盖 clone() 和 toString() 方法才能提供子类所特有的功能。-->


