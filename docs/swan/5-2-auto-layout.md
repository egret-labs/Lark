#Swan (UI库) 编程指南 - EXML

EXML是一种遵循XML语法的标记语言，用于在Swan中描述显示列表外观。大家可以把它类比HTML（严格来说，HTML并不遵循严谨的XML语法，它允许一些不闭合的标签，而EXML则必须严格遵循XML语法）。XML这种标记语言在描述静态用户界面的时候，有着得天独厚的优势。XML本身非常简洁，它树状的数据结构，能够直接匹配显示列表的树状结构。并且XML非常容易学习，任何没有编程基础的人员都可以短时间内看懂并开始编写标签。在Swan中，我们建议您尽量都使用EXML的简洁方式来描述显示列表，仅在动态改变对象属性时才编写TypeScript/JavaScript 代码。

* [如何使用EXML](3-1-use-exml.md)
* [EXML基本语法(一)](3-2-exml-syntax-1.md)
* [EXML基本语法(二)](3-2-exml-syntax-2.md)
* [启用EXML语法提示](3-4-exml-auto-complete.md)
