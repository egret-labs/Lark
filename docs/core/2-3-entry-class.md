#Lark Core 编程指南 - 项目初始化

##设置启动入口类

Lark 项目以标签属性的方式指定程序的入口类。

在 `template/index.html` 中

```javascript
    <div id="lark-sample" class="lark-player"
			...
         data-entry-class="Main"
         	...
		 >
    </div>
```

`data-entry-class="Main"` 指定入口类为 `Main`，您可以修改为任何其他的类，
注意当类存在于一个 module 中时，这里要写完整的 module 和类名，如 `test.EntryClass`。