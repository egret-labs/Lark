#Lark

Lark 是一套由 Egret 团队制作的基于HTML5技术构建跨平台移动Web应用，微站和富媒体广告营销的交互应用框架。

* **极速渲染** Lark 使用 Canvas 来渲染 UI, 实现了比 DOM 更轻量的显式列表，
    开发者不必关心绘制细节。Lark 实现了全自动的脏区域渲染达到比 DOM 更加优秀的性能表现。
* **快速开发** Lark 可以使用 EXML 来开发应用界面，标签式的语法更加适合 UI 开发，
  EXML 开发可以做到 UI 与逻辑代码的分离，更利于团队协作和版本迭代。
  Lark 内置常用的 UI 组件，简单组合就能实现复杂功能。
* **硬件访问** Lark 提供丰富的硬件访问扩展，充分发挥 HTML5 能力。
  借助 App 打包方案能够获得更加丰富的系统 API （即将到来）。

想要了解更多 Lark 产品细节，请访问 [http://www.egret.com/products-lark](http://www.egret.com/products-lark)


##Hello Lark

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
    EXML.parse(exml);
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
然后在命令行工具中进入到 Lark 的根目录执行 `npm link` 安装 Lark 命令行工具（
这里不使用 `npm install` 命令的原因是使用 `install` 安装后，每次从 github 更新后都需要重新安装，
而 `link` 命令会把生成的 `lark` 命令链接到当前文件夹，更新后不需要再次安装）。

安装完成后执行 `lark` 能看到 Lark 输出的版本和安装目录信息。

####创建项目
进入您的工作目录，执行 `lark create HelloWorld`, Lark 会创建一个 HelloWorld 目录作为项目的根目录
( 如果您想要在当前目录创建项目，可以直接执行 `lark create` )。命令行工具会自动打开一个浏览器窗口，请按照提示
选择项目模板、屏幕尺寸和要使用的扩展模块。

更多命令行使用说明请参考 [Lark 命令行工具手册](https://github.com/egret-labs/Lark/blob/master/docs/cmd-tools.md)

##升级 Lark
当 Lark 发布新版本或您自己修改了 Lark 源代码时，需要在您项目根目录中执行 `lark clean`， 命令行工具会更新项目中的 Lark 框架为最新版本。

需要注意的是，`clean` 命令只会用 Lark 根目录中 build 文件夹下的文件，覆盖 libs 目录中的同名文件，
其他第三方库不会被删除，当然也有可能 Lark 本身的扩展库在新版本中被删除，这种情况请手动删除旧版本的扩展库。

##更多示例
在 [examples](https://github.com/egret-labs/Lark/tree/master/examples) 目录中有更多的示例项目。
* **LarkCore** :  Lark 核心 API 相关示例，包括位图、文本、矢量图绘制、音频视频和设备传感器访问等。
* **UIExamples** :  Lark GUI 类库示例，包括皮肤、EXML组件、主题等的使用。

每个目录都是标准的 Lark 项目，你可以进入相应的目录，执行 `lark run` 来查看该项目的运行效果。

##路线图

###Lark 1.0
Lark 核心显示列表
<br/>Lark GUI类库

###Lark 1.5
Lark 硬件访问能力
<br/>Lark App 打包方案
<br/>Wing 可视化编辑支持

###Lark 2.0
Lark 动画库
<br/>Lark GUI 矢量库


## 更新日志

[Lark 1.0 Beta 更新日志](docs/release-notes/1.0-beta-cn.md)

##版本声明
Lark 目前处于 Beta 阶段，根据开发者具体反馈情况，可能会有少量不兼容重构，
但在正式版发布后会开始持续的向后兼容。欢迎广大开发者试用反馈，或直接发起pull request，
与我们共同推进 Lark 的版本迭代。
如果您希望更加深入地参与到 Lark 框架的开发设计中，请参考下方「工作机会」。

##工作机会
Lark 框架团队期待您的加入，现招募核心研发工程师数名：

核心框架及扩展库研发：
* 三年以上ActionScript游戏行业编程经验，或2年JavaScript前端开发经验。
* 有参与设计或维护通用框架或开源项目经验。
* 有个人技术博客优先。

原生打包方案研发：
* 有1年以上 Android 或 iOS 原生应用开发经验
* 熟悉移动设备Web App开发，如 React 或 Angularjs。
* 有 Cordova 打包经验优先。

「我没有以上经验，但学习能力超强」也欢迎联系我们。

##联系方式
* 公司：北京白鹭时代信息技术有限公司
* 地址：北京市朝阳区望京阜荣街悠乐汇商业C座321室
* 首页：http://www.egret.com
* 邮箱：hr@egret.com 
* QQ群：399919028
