#Lark Core 编程指南 - 项目初始化

##引用扩展库

在 Lark 项目中 Lark 核心库和第三方库都用同一种方式引用。在新创建的 Lark 项目中，Lark 代码被放在
`src/libs` 目录中，同目录中还有 Lark 的 GUI 扩展库 swan，我们建议把第三方库的类型定义文件 `libname.d.ts`
和 JavaScript 文件放置在这个目录中。

### 添加引用

在 `template/index.html` 中，引用 Lark 的代码是：

```javascript
    <script src="libs/lark/lark.js" src-release="libs/lark/lark.min.js"></script>
    <script src="libs/lark/lark.web.js" src-release="libs/lark/lark.web.min.js"></script>
```
其中 `src-release` 是不能被浏览器识别的属性，在 Lark 项目发布时，这个 script 标签的 src
会被替换成 release 版本，确保加载包体最小。

```javascript
    <script src="libs/lark/lark.min.js"></script>
    <script src="libs/lark/lark.web.min.js"></script>
```

需要添加第三方类库时可以仿照上面的代码来写。

需要注意的是，script 标签是阻塞加载的，所以添加有依赖关系的类库，请按照顺序添加。