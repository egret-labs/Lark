#Lark Core 编程指南 - 项目初始化

##新建 Lark 工程

Lark 源代码由 TypeScript 编写，但你也可以使用 JavaScript 来开发 Lark 应用。

###JavaScript
JavaScript 开发者可以直接下载 [build](https://github.com/egret-labs/Lark/tree/master/build)
目录中预编译的 Lark script 文件，将需要的模块引入到您的 HTML 文件中，即可开发 Lark 应用。

###TypeScript
Lark 提供了命令行工具来辅助开发。使用命令行工具可以方便的创建、编译和发布 Lark 项目。



##安装 Lark

####安装前的准备
Lark 命令行工具依赖于 Node.js 和 NPM 环境，未安装 Node.js 的开发者可以到 [Node.js 官网](https://nodejs.org/) 下载安装。
NPM 是 Node.js 的包管理工具，默认配置下会随 Node.js 一起安装。

####安装命令行工具
你可以从 github 克隆 Lark 的源代码，或者 [下载打包后的源代码](https://github.com/egret-labs/Lark/archive/master.zip)。
然后在命令行工具中进入到 Lark 的根目录执行 `npm link` 安装 Lark 命令行工具（
这里不使用 `install` 命令的原因是使用 `install` 安装后，每次从 github 更新后都需要重新安装，
而 `link` 命令会把生成的 `lark` 命令链接到当前文件夹，更新后不需要再次安装）。
安装完成后执行 `lark` 能看到 Lark 输出的版本和安装目录信息。

####创建项目
进入您的工作目录，执行 `lark create HelloWorld`, Lark 会创建一个 HelloWorld 目录作为项目的根目录
( 如果您想要在当前目录创建项目，可以直接执行 `lark create` )。命令行工具会自动打开一个浏览器窗口，请按照提示
选择项目模板、屏幕尺寸和要使用的扩展模块。

更多命令行使用说明请参考 [Lark 命令行工具手册](https://github.com/egret-labs/Lark/blob/master/docs/cmd-tools.md)