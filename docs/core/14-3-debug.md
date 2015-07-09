#Lark Core 编程指南 - 调试功能

##使用 DEBUG 编译参数

我们经常写一些希望仅在开发阶段使用的代码，来进行数据校验、输出日志等。
Lark 提供了 `DEBUG` 这一全局变量来实现这样的功能。

下面的代码校验 `value` 是不是由4个数字组成，如果不是，输出指定的错误信息。

```javascript
	if (DEBUG) {
	    var rect = value.split(",");
	    if (rect.length != 4 || isNaN(parseInt(rect[0])) || isNaN(parseInt(rect[1])) ||
	        isNaN(parseInt(rect[2])) || isNaN(parseInt(rect[3]))) {
	        lark.$error(2016, this.currentClassName, toXMLString(node));
	    }
	}
```

在发行版生成过程中，Lark 命令行会移除 `if(DEBUG){ ... }` 这以整个代码块，保持发行版包体的精简。

Lark 还提供了另外一个与 `DEBUG` 对应的编译参数 `RELEASE`，用来编写只在发行版中运行的代码。