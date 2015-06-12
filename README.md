#Lark
------------------

Lark 是一套由 Egret 团队制作的基于HTML5技术构建跨平台移动Web应用，微站和富媒体广告营销的交互应用框架。

* **极速渲染** Lark 使用 Canvas 来渲染 UI, 实现了比 DOM 更轻量的显式列表，
    开发者不必关心绘制细节。Lark 实现了全自动的脏区域渲染达到比 DOM 更加优秀的性能表现。
* **快速开发** Lark 可以使用 EXML 来开发应用界面，标签式的语法更加适合 UI 开发，
  EXML 开发可以做到 UI 与逻辑代码的分离，更利于团队协作和版本迭代。
  Lark 内置常用的 UI 组件，简单组合就能实现复杂功能。
* **硬件访问** Lark 提供丰富的硬件访问扩展，充分发挥 HTML5 能力。
  借助 App 打包方案能够获得更加丰富的系统 API （即将到来）。




##Hello Lark
---------------------

下面是一个简单的 Hello World 示例

```html

<!DOCTYPE HTML>
<html>
<head>
    <title>Hello World</title>
    <script src="libs/lark/lark.js"></script>
    <script src="libs/lark/lark.web.js"></script>
    <script src="libs/swan/swan.js"></script>
</head>
<body>
<div class="lark-player" data-entry-class="Main" style="height:400px"></div>

<script id="exml" type="text/xml">
    <s:Group class="Main" xmlns:s="http://ns.egret.com/swan">
        <s:Label text="Hello World" fontSize="64" fontFamily="Helvetica, Arial" left="150"/>
    </s:Group>
</script>

<script>
    var exml = document.getElementById('exml').textContent;
    new swan.sys.EXMLParser().parse(exml);
</script>

</body>
</html>

```
这个例子会在浏览器中显示一个 "Hello World"。

在这段 HTML 代码中我们引入了 lark 和 swan 的 script 文件。将 EXML 包装在一个 script Tag 中，
通过 JavaScript 取得 EXML 文本。 EXMLParser 根据 EXML 中的 `class="Main"` 将它解析成一个
JavaScript 类 `Main`。网页加载完成时，lark 会查找 `class="lark-player"` 的 HTML 元素，
根据它的属性来创建画布。`data-entry-class="Main"` 标记了程序执行的入口，Lark会自动实例化 `Main`
并在画布中显示出来。



##安装 Lark
--------------------

Lark 源代码由 TypeScript 编写，但你也可以使用 JavaScript 来开发 Lark 应用。

###JavaScript
JavaScript 开发者可以直接下载 [build](https://github.com/egret-labs/Lark/tree/master/build)
目录中预编译的 Lark script 文件，将需要的模块引入到您的 HTML 文件中，即可开发 Lark 应用。

###TypeScript
Lark 提供了命令行工具来辅助开发。使用命令行工具可以方便的创建、编译和发布 Lark 项目。

####安装前的准备
Lark 命令行工具依赖于 Node.js 和 NPM 环境，未安装 Node.js 的开发者可以到 [Node.js 官网](https://nodejs.org/) 下载安装。
NPM 是 Node.js 的包管理工具，默认配置下会随 Node.js 一起安装。

####安装命令行工具
你可以从 github 克隆 Lark 的源代码，或者 [下载打包后的源代码](https://github.com/egret-labs/Lark/archive/master.zip)。
然后在命令行工具中进入到 Lark 的根目录执行 `npm install -g` 安装 Lark 命令行工具。
安装完成后执行 `lark` 能看到 Lark 输出的版本信息。

####创建项目
进入您的工作目录，执行 `lark create HelloWorld` Lark 会创建一个 HelloWorld 目录作为项目的根目录, 
如果您想要在当前目录创建项目，请直接执行 `lark create`。命令行工具会自动打开一个浏览器窗口，请按照提示
选择项目模板、屏幕尺寸和要使用的扩展模块。

更多命令行使用说明请参考 [Lark 命令行工具手册](https://github.com/egret-labs/Lark/blob/master/docs/cmd-tools.md)






##Next:
更加详细的 Lark 使用方法请参考: https://github.com/egret-labs/Lark