//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * ColumnAlign 类为 TileLayout 类的 columnAlign 属性定义可能的值。
     */
    var ColumnAlign = (function () {
        function ColumnAlign() {
        }
        var d = __define,c=ColumnAlign;p=c.prototype;
        /**
         * 不将行两端对齐。
         */
        ColumnAlign.LEFT = "left";
        /**
         * 通过增大水平间隙将行两端对齐。
         */
        ColumnAlign.JUSTIFY_USING_GAP = "justifyUsingGap";
        /**
         * 通过增大行高度将行两端对齐。
         */
        ColumnAlign.JUSTIFY_USING_WIDTH = "justifyUsingWidth";
        return ColumnAlign;
    })();
    swan.ColumnAlign = ColumnAlign;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        var STATE = "swan.State";
        var ADD_ITEMS = "swan.AddItems";
        var SET_PROPERTY = "swan.SetProperty";
        var BINDING_PROPERTY = "swan.Binding.bindProperty";
        /**
         * 代码生成工具基类
         */
        var CodeBase = (function () {
            function CodeBase() {
                this.indent = 0;
            }
            var d = __define,c=CodeBase;p=c.prototype;
            p.toCode = function () {
                return "";
            };
            /**
             * 获取缩进字符串
             */
            p.getIndent = function (indent) {
                if (indent === void 0)
                    indent = this.indent;
                var str = "";
                for (var i = 0; i < indent; i++) {
                    str += "	";
                }
                return str;
            };
            return CodeBase;
        })();
        sys.CodeBase = CodeBase;
        var EXClass = (function (_super) {
            __extends(EXClass, _super);
            function EXClass() {
                _super.apply(this, arguments);
                /**
                 * 类名,不包括模块名
                 */
                this.className = "";
                /**
                 * 父类类名,包括完整模块名
                 */
                this.superClass = "";
                /**
                 * 内部类区块
                 */
                this.innerClassBlock = [];
                /**
                 * 变量定义区块
                 */
                this.variableBlock = [];
                /**
                 * 函数定义区块
                 */
                this.functionBlock = [];
            }
            var d = __define,c=EXClass;p=c.prototype;
            /**
             * 添加一个内部类
             */
            p.addInnerClass = function (clazz) {
                if (this.innerClassBlock.indexOf(clazz) == -1) {
                    this.innerClassBlock.push(clazz);
                }
            };
            /**
             * 添加变量
             */
            p.addVariable = function (variableItem) {
                if (this.variableBlock.indexOf(variableItem) == -1) {
                    this.variableBlock.push(variableItem);
                }
            };
            /**
             * 根据变量名获取变量定义
             */
            p.getVariableByName = function (name) {
                var list = this.variableBlock;
                var length = list.length;
                for (var i = 0; i < length; i++) {
                    var item = list[i];
                    if (item.name == name) {
                        return item;
                    }
                }
                return null;
            };
            /**
             * 添加函数
             */
            p.addFunction = function (functionItem) {
                if (this.functionBlock.indexOf(functionItem) == -1) {
                    this.functionBlock.push(functionItem);
                }
            };
            /**
             * 根据函数名返回函数定义块
             */
            p.getFuncByName = function (name) {
                var list = this.functionBlock;
                var length = list.length;
                for (var i = 0; i < length; i++) {
                    var item = list[i];
                    if (item.name == name) {
                        return item;
                    }
                }
                return null;
            };
            p.toCode = function () {
                var indent = this.indent;
                var indentStr = this.getIndent(indent);
                var indent1Str = this.getIndent(indent + 1);
                var indent2Str = this.getIndent(indent + 2);
                //打印类起始块
                var returnStr = indentStr + "(function (";
                if (this.superClass) {
                    returnStr += "_super) {\n" + indent1Str + "__extends(" + this.className + ", _super);\n";
                }
                else {
                    returnStr += ") {\n";
                }
                //打印内部类列表
                var innerClasses = this.innerClassBlock;
                var length = innerClasses.length;
                for (var i = 0; i < length; i++) {
                    var clazz = innerClasses[i];
                    clazz.indent = indent + 1;
                    returnStr += indent1Str + "var " + clazz.className + " = " + clazz.toCode() + "\n\n";
                }
                returnStr += indent1Str + "function " + this.className + "() {\n";
                if (this.superClass) {
                    returnStr += indent2Str + "_super.call(this);\n";
                }
                //打印变量列表
                var variables = this.variableBlock;
                length = variables.length;
                for (i = 0; i < length; i++) {
                    var variable = variables[i];
                    if (variable.defaultValue) {
                        returnStr += indent2Str + variable.toCode() + "\n";
                    }
                }
                //打印构造函数
                if (this.constructCode) {
                    var codes = this.constructCode.toCode().split("\n");
                    length = codes.length;
                    for (i = 0; i < length; i++) {
                        var code = codes[i];
                        returnStr += indent2Str + code + "\n";
                    }
                }
                returnStr += indent1Str + "}\n";
                returnStr += indent1Str + "var _proto = " + this.className + ".prototype;\n\n";
                //打印函数列表
                var functions = this.functionBlock;
                length = functions.length;
                for (i = 0; i < length; i++) {
                    var functionItem = functions[i];
                    functionItem.indent = indent + 1;
                    returnStr += functionItem.toCode() + "\n";
                }
                //打印类结尾
                returnStr += indent1Str + "return " + this.className + ";\n" + indentStr;
                if (this.superClass) {
                    returnStr += "})(" + this.superClass + ");";
                }
                else {
                    returnStr += "})();";
                }
                return returnStr;
            };
            return EXClass;
        })(CodeBase);
        sys.EXClass = EXClass;
        var EXCodeBlock = (function (_super) {
            __extends(EXCodeBlock, _super);
            function EXCodeBlock() {
                _super.apply(this, arguments);
                this.lines = [];
            }
            var d = __define,c=EXCodeBlock;p=c.prototype;
            /**
             * 添加变量声明语句
             * @param name 变量名
             * @param value 变量初始值
             */
            p.addVar = function (name, value) {
                var valueStr = value ? " = " + value : "";
                this.addCodeLine("var " + name + valueStr + ";");
            };
            /**
             * 添加赋值语句
             * @param target 要赋值的目标
             * @param value 值
             * @param prop 目标的属性(用“.”访问)，不填则是对目标赋值
             */
            p.addAssignment = function (target, value, prop) {
                var propStr = prop ? "." + prop : "";
                this.addCodeLine(target + propStr + " = " + value + ";");
            };
            /**
             * 添加返回值语句
             */
            p.addReturn = function (data) {
                this.addCodeLine("return " + data + ";");
            };
            /**
             * 添加一条空行
             */
            p.addEmptyLine = function () {
                this.addCodeLine("");
            };
            /**
             * 开始添加if语句块,自动调用startBlock();
             */
            p.startIf = function (expression) {
                this.addCodeLine("if(" + expression + ")");
                this.startBlock();
            };
            /**
             * 开始else语句块,自动调用startBlock();
             */
            p.startElse = function () {
                this.addCodeLine("else");
                this.startBlock();
            };
            /**
             * 开始else if语句块,自动调用startBlock();
             */
            p.startElseIf = function (expression) {
                this.addCodeLine("else if(" + expression + ")");
                this.startBlock();
            };
            /**
             * 添加一个左大括号，开始新的语句块
             */
            p.startBlock = function () {
                this.addCodeLine("{");
                this.indent++;
            };
            /**
             * 添加一个右大括号,结束当前的语句块
             */
            p.endBlock = function () {
                this.indent--;
                this.addCodeLine("}");
            };
            /**
             * 添加执行函数语句块
             * @param functionName 要执行的函数名称
             * @param args 函数参数列表
             */
            p.doFunction = function (functionName, args) {
                var argsStr = args.join(",");
                this.addCodeLine(functionName + "(" + argsStr + ")");
            };
            /**
             * 添加一行代码
             */
            p.addCodeLine = function (code) {
                this.lines.push(this.getIndent() + code);
            };
            /**
             * 添加一行代码到指定行
             */
            p.addCodeLineAt = function (code, index) {
                this.lines.splice(index, 0, this.getIndent() + code);
            };
            /**
             * 是否存在某行代码内容
             */
            p.containsCodeLine = function (code) {
                return this.lines.indexOf(code) != -1;
            };
            /**
             * 在结尾追加另一个代码块的内容
             */
            p.concat = function (cb) {
                this.lines = this.lines.concat(cb.lines);
            };
            p.toCode = function () {
                return this.lines.join("\n");
            };
            return EXCodeBlock;
        })(CodeBase);
        sys.EXCodeBlock = EXCodeBlock;
        var EXFunction = (function (_super) {
            __extends(EXFunction, _super);
            function EXFunction() {
                _super.apply(this, arguments);
                /**
                 * 代码块
                 */
                this.codeBlock = null;
                this.isGet = false;
                /**
                 * 函数名
                 */
                this.name = "";
            }
            var d = __define,c=EXFunction;p=c.prototype;
            p.toCode = function () {
                var indentStr = this.getIndent();
                var indent1Str = this.getIndent(this.indent + 1);
                var codeIndent;
                var returnStr = indentStr;
                if (this.isGet) {
                    codeIndent = this.getIndent(this.indent + 2);
                    returnStr += 'Object.defineProperty(_proto, "skinParts", {\n';
                    returnStr += indent1Str + "get: function () {\n";
                }
                else {
                    codeIndent = indent1Str;
                    returnStr += "_proto." + this.name + " = function () {\n";
                }
                if (this.codeBlock) {
                    var lines = this.codeBlock.toCode().split("\n");
                    var length = lines.length;
                    for (var i = 0; i < length; i++) {
                        var line = lines[i];
                        returnStr += codeIndent + line + "\n";
                    }
                }
                if (this.isGet) {
                    returnStr += indent1Str + "},\n" + indent1Str + "enumerable: true,\n" + indent1Str + "configurable: true\n" + indentStr + "});";
                }
                else {
                    returnStr += indentStr + "};";
                }
                return returnStr;
            };
            return EXFunction;
        })(CodeBase);
        sys.EXFunction = EXFunction;
        var EXVariable = (function (_super) {
            __extends(EXVariable, _super);
            function EXVariable(name, defaultValue) {
                _super.call(this);
                this.indent = 2;
                this.name = name;
                this.defaultValue = defaultValue;
            }
            var d = __define,c=EXVariable;p=c.prototype;
            p.toCode = function () {
                if (!this.defaultValue) {
                    return "";
                }
                return "this." + this.name + " = " + this.defaultValue + ";";
            };
            return EXVariable;
        })(CodeBase);
        sys.EXVariable = EXVariable;
        var EXState = (function (_super) {
            __extends(EXState, _super);
            function EXState(name, stateGroups) {
                _super.call(this);
                /**
                 * 视图状态名称
                 */
                this.name = "";
                this.stateGroups = [];
                this.addItems = [];
                this.setProperty = [];
                this.name = name;
                if (stateGroups)
                    this.stateGroups = stateGroups;
            }
            var d = __define,c=EXState;p=c.prototype;
            /**
             * 添加一个覆盖
             */
            p.addOverride = function (item) {
                if (item instanceof EXAddItems)
                    this.addItems.push(item);
                else
                    this.setProperty.push(item);
            };
            p.toCode = function () {
                var indentStr = this.getIndent(1);
                var returnStr = "new " + STATE + " (\"" + this.name + "\",\n" + indentStr + "[\n";
                var index = 0;
                var isFirst = true;
                var overrides = this.addItems.concat(this.setProperty);
                while (index < overrides.length) {
                    if (isFirst)
                        isFirst = false;
                    else
                        returnStr += ",\n";
                    var item = overrides[index];
                    var codes = item.toCode().split("\n");
                    var length = codes.length;
                    for (var i = 0; i < length; i++) {
                        var code = codes[i];
                        codes[i] = indentStr + indentStr + code;
                    }
                    returnStr += codes.join("\n");
                    index++;
                }
                returnStr += "\n" + indentStr + "])";
                return returnStr;
            };
            return EXState;
        })(CodeBase);
        sys.EXState = EXState;
        var EXAddItems = (function (_super) {
            __extends(EXAddItems, _super);
            function EXAddItems(target, property, position, relativeTo) {
                _super.call(this);
                this.target = target;
                this.property = property;
                this.position = position;
                this.relativeTo = relativeTo;
            }
            var d = __define,c=EXAddItems;p=c.prototype;
            p.toCode = function () {
                var returnStr = "new " + ADD_ITEMS + "(\"" + this.target + "\",\"" + this.property + "\"," + this.position + ",\"" + this.relativeTo + "\")";
                return returnStr;
            };
            return EXAddItems;
        })(CodeBase);
        sys.EXAddItems = EXAddItems;
        var EXSetProperty = (function (_super) {
            __extends(EXSetProperty, _super);
            function EXSetProperty(target, name, value) {
                _super.call(this);
                this.target = target;
                this.name = name;
                this.value = value;
            }
            var d = __define,c=EXSetProperty;p=c.prototype;
            p.toCode = function () {
                return "new " + SET_PROPERTY + "(\"" + this.target + "\",\"" + this.name + "\"," + this.value + ")";
            };
            return EXSetProperty;
        })(CodeBase);
        sys.EXSetProperty = EXSetProperty;
        var EXBinding = (function (_super) {
            __extends(EXBinding, _super);
            function EXBinding(target, property, expression) {
                _super.call(this);
                this.target = target;
                this.property = property;
                this.expression = expression;
            }
            var d = __define,c=EXBinding;p=c.prototype;
            p.toCode = function () {
                var chain = this.expression.split(".").join("\",\"");
                return BINDING_PROPERTY + "(this, [\"" + chain + "\"], this." + this.target + ",\"" + this.property + "\");";
            };
            return EXBinding;
        })(CodeBase);
        sys.EXBinding = EXBinding;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 定义  CollectionEvent 类 kind 属性的有效值的常量。
     * 这些常量指示对集合进行的更改类型。
     */
    var CollectionEventKind = (function () {
        function CollectionEventKind() {
        }
        var d = __define,c=CollectionEventKind;p=c.prototype;
        /**
         * 指示集合添加了一个或多个项目。
         */
        CollectionEventKind.ADD = "add";
        /**
         * 指示集合应用了排序或/和筛选。
         */
        CollectionEventKind.REFRESH = "refresh";
        /**
         * 指示集合删除了一个或多个项目。
         */
        CollectionEventKind.REMOVE = "remove";
        /**
         * 指示已替换由 CollectionEvent.location 属性确定的位置处的项目。
         */
        CollectionEventKind.REPLACE = "replace";
        /**
         * 指示集合已彻底更改，需要进行重置。
         */
        CollectionEventKind.RESET = "reset";
        /**
         * 指示集合中一个或多个项目进行了更新。受影响的项目将存储在  CollectionEvent.items 属性中。
         */
        CollectionEventKind.UPDATE = "update";
        /**
         * 指示集合中某个节点的子项列表已打开，通常应用于Tree的数据源XMLCollection。
         */
        CollectionEventKind.OPEN = "open";
        /**
         * 指示集合中某个节点的子项列表已关闭，通常应用于Tree的数据源XMLCollection。
         */
        CollectionEventKind.CLOSE = "close";
        return CollectionEventKind;
    })();
    swan.CollectionEventKind = CollectionEventKind;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 滚动条显示策略常量
     */
    var ScrollPolicy = (function () {
        function ScrollPolicy() {
        }
        var d = __define,c=ScrollPolicy;p=c.prototype;
        /**
         * 如果子项超出父级的尺寸，则允许滚动，反之不允许滚动。
         */
        ScrollPolicy.AUTO = "auto";
        /**
         * 从不允许滚动。
         */
        ScrollPolicy.OFF = "off";
        /**
         * 总是允许滚动。
         */
        ScrollPolicy.ON = "on";
        return ScrollPolicy;
    })();
    swan.ScrollPolicy = ScrollPolicy;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * JustifyAlign 定义布局类中 horizontalAlign 与 verticalAlign 属性需要的两端对齐常量值。
     */
    var JustifyAlign = (function () {
        function JustifyAlign() {
        }
        var d = __define,c=JustifyAlign;p=c.prototype;
        /**
         * 两端对齐，使用容器的尺寸作为对齐尺寸。
         */
        JustifyAlign.JUSTIFY = "justify";
        /**
         * 相对于容器对子项进行内容对齐。与 JUSTIFY 不同，CONTENT_JUSTIFY 使用最大子项的尺寸与容器尺寸的两者中的较大值作为对齐尺寸。
         */
        JustifyAlign.CONTENT_JUSTIFY = "contentJustify";
        return JustifyAlign;
    })();
    swan.JustifyAlign = JustifyAlign;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * BitmapFillMode 类定义 Image 控件的图像填充方式。
     * BitmapFillMode 类定义了调整大小模式的一个枚举，这些模式确定 Bitmap 如何填充由布局系统指定的尺寸。
     */
    var BitmapFillMode = (function () {
        function BitmapFillMode() {
        }
        var d = __define,c=BitmapFillMode;p=c.prototype;
        /**
         * 在区域的边缘处截断不显示位图。
         */
        BitmapFillMode.CLIP = "clip";
        /**
         * 重复位图以填充区域。
         */
        BitmapFillMode.REPEAT = "repeat";
        /**
         * 拉伸位图以填充区域。
         */
        BitmapFillMode.SCALE = "scale";
        return BitmapFillMode;
    })();
    swan.BitmapFillMode = BitmapFillMode;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * RowAlign 类为 TileLayout 类的 rowAlign 属性定义可能的值。
     */
    var RowAlign = (function () {
        function RowAlign() {
        }
        var d = __define,c=RowAlign;p=c.prototype;
        /**
         * 不进行两端对齐。
         */
        RowAlign.TOP = "top";
        /**
         * 通过增大垂直间隙将行两端对齐。
         */
        RowAlign.JUSTIFY_USING_GAP = "justifyUsingGap";
        /**
         * 通过增大行高度将行两端对齐。
         */
        RowAlign.JUSTIFY_USING_HEIGHT = "justifyUsingHeight";
        return RowAlign;
    })();
    swan.RowAlign = RowAlign;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 定义进度条等控件增长方向的常量
     */
    var Direction = (function () {
        function Direction() {
        }
        var d = __define,c=Direction;p=c.prototype;
        /**
         * 水平从左到右增长
         */
        Direction.LTR = "ltr";
        /**
         * 水平从右到左增长
         */
        Direction.RTL = "rtl";
        /**
         * 竖直从上到下增长
         */
        Direction.TTB = "ttb";
        /**
         * 竖直从下到上增长
         */
        Direction.BTT = "btt";
        return Direction;
    })();
    swan.Direction = Direction;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * TileOrientation 类为 TileLayout 类的 orientation 属性定义可能的值。
     */
    var TileOrientation = (function () {
        function TileOrientation() {
        }
        var d = __define,c=TileOrientation;p=c.prototype;
        /**
         * 逐行排列元素。
         */
        TileOrientation.ROWS = "rows";
        /**
         * 逐列排列元素。
         */
        TileOrientation.COLUMNS = "columns";
        return TileOrientation;
    })();
    swan.TileOrientation = TileOrientation;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        /**
         * @private
         *
         * @param fraction
         * @returns
         */
        function sineInOut(fraction) {
            return -0.5 * (Math.cos(Math.PI * fraction) - 1);
        }
        /**
         * @private
         * 数值缓动工具类
         */
        var Animation = (function () {
            /**
             * @private
             */
            function Animation(updateFunction, thisObject) {
                /**
                 * @private
                 * 此动画的缓动行为。设置为null意味着不使用缓动，默认值为 sineInOut
                 */
                this.easerFunction = sineInOut;
                /**
                 * @private
                 * 是否正在播放动画，不包括延迟等待和暂停的阶段
                 */
                this.isPlaying = false;
                /**
                 * @private
                 * 动画持续时间,单位毫秒，默认值500
                 */
                this.duration = 500;
                /**
                 * @private
                 * 动画到当前时间对应的值。
                 */
                this.currentValue = 0;
                /**
                 * @private
                 * 起始值
                 */
                this.from = 0;
                /**
                 * @private
                 * 终点值。
                 */
                this.to = 0;
                /**
                 * @private
                 * 动画启动时刻
                 */
                this.startTime = 0;
                /**
                 * @private
                 * 动画播放结束时的回调函数
                 */
                this.endFunction = null;
                this.updateFunction = updateFunction;
                this.thisObject = thisObject;
            }
            var d = __define,c=Animation;p=c.prototype;
            /**
             * @private
             * 开始正向播放动画,无论何时调用都重新从零时刻开始，若设置了延迟会首先进行等待。
             */
            p.play = function () {
                this.stop();
                this.start();
            };
            /**
             * @private
             * 开始播放动画
             */
            p.start = function () {
                this.isPlaying = false;
                this.currentValue = 0;
                this.startTime = lark.getTimer();
                this.doInterval(this.startTime);
                lark.startTick(this.doInterval, this);
            };
            /**
             * @private
             * 停止播放动画
             */
            p.stop = function () {
                this.isPlaying = false;
                this.startTime = 0;
                lark.stopTick(this.doInterval, this);
            };
            /**
             * @private
             * 计算当前值并返回动画是否结束
             */
            p.doInterval = function (currentTime) {
                var runningTime = currentTime - this.startTime;
                if (!this.isPlaying) {
                    this.isPlaying = true;
                }
                var duration = this.duration;
                var fraction = duration == 0 ? 1 : Math.min(runningTime, duration) / duration;
                if (this.easerFunction) {
                    fraction = this.easerFunction(fraction);
                }
                this.currentValue = this.from + (this.to - this.from) * fraction;
                if (this.updateFunction)
                    this.updateFunction.call(this.thisObject, this);
                var isEnded = runningTime >= duration;
                if (isEnded) {
                    this.stop();
                }
                if (isEnded && this.endFunction) {
                    this.endFunction.call(this.thisObject, this);
                }
                return true;
            };
            return Animation;
        })();
        sys.Animation = Animation;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        /**
         * Swan 命名空间
         */
        sys.NS_S = "http://ns.egret.com/swan";
        /**
         * Wing命名空间
         */
        sys.NS_W = "http://ns.egret.com/wing";
        var basicTypes = ["Array", "boolean", "string", "number"];
        var MODULE_NAME = "swan.";
        var hashCount = 0;
        var EXMLConfig = (function () {
            function EXMLConfig() {
                this.properties = {};
            }
            var d = __define,c=EXMLConfig;p=c.prototype;
            p.describe = function (instance) {
                if (!instance) {
                    return null;
                }
                var prototype = Object.getPrototypeOf(instance);
                if (!prototype) {
                    return null;
                }
                var info;
                if (prototype.hasOwnProperty("__hashCode__")) {
                    info = this.properties[prototype.__hashCode__];
                    if (info) {
                        return info;
                    }
                }
                var superProto = Object.getPrototypeOf(prototype);
                if (!superProto) {
                    return null;
                }
                var superInstance = getInstanceOf(superProto.constructor);
                var superInfo = this.describe(superInstance);
                if (superInfo) {
                    function factory() {
                    }
                    factory.prototype = superInfo;
                    info = new factory();
                }
                else {
                    info = {};
                }
                if (DEBUG) {
                    info.__class__ = prototype.constructor.name;
                }
                var keys = Object.keys(prototype).concat(Object.keys(instance));
                var length = keys.length;
                var meta = instance.__meta__;
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    if (key == "constructor" || key.charAt(0) == "_" || key.charAt(0) == "$") {
                        continue;
                    }
                    var resultType;
                    if (meta && meta[key]) {
                        resultType = meta[key];
                    }
                    else if (isArray(instance[key])) {
                        resultType = "Array";
                    }
                    else {
                        resultType = typeof instance[key];
                        if (resultType == "function") {
                            continue;
                        }
                        if (basicTypes.indexOf(resultType) == -1) {
                            resultType = "any";
                        }
                    }
                    info[key] = resultType;
                }
                prototype.__hashCode__ = hashCount++;
                this.properties[prototype.__hashCode__] = info;
                return info;
            };
            /**
             * 根据类的短名ID和命名空间获取完整类名(以"."分隔)
             * @param id 类的短名ID
             * @param ns 命名空间
             */
            p.getClassNameById = function (id, ns) {
                if (id == "Object" && ns == sys.NS_S) {
                    return id;
                }
                var name = "";
                if (basicTypes.indexOf(id) != -1) {
                    return id;
                }
                if (ns == sys.NS_W) {
                }
                else if (!ns || ns == sys.NS_S) {
                    name = MODULE_NAME + id;
                }
                else {
                    name = ns.substring(0, ns.length - 1) + id;
                }
                if (!getPrototypeOf(name)) {
                    name = "";
                }
                return name;
            };
            /**
             * 根据ID获取对应的默认属性
             * @param id 类的短名ID
             * @param ns 命名空间
             * @return 默认属性名
             */
            p.getDefaultPropById = function (id, ns) {
                var className = this.getClassNameById(id, ns);
                var prototype = getPrototypeOf(className);
                if (!prototype) {
                    name = "";
                }
                return prototype.__defaultProperty__;
            };
            /**
             * 获取指定属性的类型,返回基本数据类型："boolean","string","number","any"。
             * @param property 属性名
             * @param className 要查询的完整类名
             */
            p.getPropertyType = function (property, className) {
                if (className == "Object") {
                    return "any";
                }
                var resultType = "";
                var prototype = getPrototypeOf(className);
                if (prototype) {
                    if (!prototype.hasOwnProperty("__hashCode__")) {
                        var clazz = lark.getDefinitionByName(className);
                        var instance = getInstanceOf(clazz);
                        if (!instance) {
                            if (DEBUG) {
                                lark.$warn(2104, className);
                            }
                            return resultType;
                        }
                        this.describe(instance);
                    }
                    var info = this.properties[prototype.__hashCode__];
                    if (info) {
                        resultType = info[property];
                    }
                }
                return resultType;
            };
            return EXMLConfig;
        })();
        sys.EXMLConfig = EXMLConfig;
        /**
         * 判断一个对象是数组
         */
        function isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        }
        /**
         * 获取一个类名对应的prototype引用
         */
        function getPrototypeOf(className) {
            var clazz = lark.getDefinitionByName(className);
            if (!clazz) {
                return null;
            }
            return clazz.prototype;
        }
        /**
         * 创建一个类名对应的实例
         */
        function getInstanceOf(clazz) {
            if (!clazz) {
                return null;
            }
            try {
                var instance = new clazz();
            }
            catch (e) {
                return null;
            }
            return instance;
        }
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @private
     */
    var loaderPool = [];
    /**
     * @private
     */
    var callBackMap = {};
    /**
     * @private
     */
    var loaderMap = {};
    /**
     * @language en_US
     * Default instance of interface <code>IAssetAdapter</code>.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 默认的IAssetAdapter接口实现。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var DefaultAssetAdapter = (function () {
        function DefaultAssetAdapter() {
        }
        var d = __define,c=DefaultAssetAdapter;p=c.prototype;
        /**
         * @language en_US
         * resolve asset.
         * @param source the identifier of new asset need to be resolved
         * @param callBack callback function when resolving complete
         * example：callBack(content:any,source:string):void;
         * @param thisObject <code>this</code> object of callback method
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param callBack 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.getAsset = function (source, callBack, thisObject) {
            var list = callBackMap[source];
            if (list) {
                list.push([callBack, thisObject]);
                return;
            }
            var loader = loaderPool.pop();
            if (!loader) {
                loader = new lark.ImageLoader();
            }
            callBackMap[source] = [[callBack, thisObject]];
            loaderMap[loader.$hashCode] = source;
            loader.on(lark.Event.COMPLETE, this.onLoadFinish, this);
            loader.on(lark.Event.IO_ERROR, this.onLoadFinish, this);
            loader.load(source);
        };
        /**
         * @private
         *
         * @param event
         */
        p.onLoadFinish = function (event) {
            var loader = event.currentTarget;
            loader.removeListener(lark.Event.COMPLETE, this.onLoadFinish, this);
            loader.removeListener(lark.Event.IO_ERROR, this.onLoadFinish, this);
            var data;
            if (event.$type == lark.Event.COMPLETE) {
                data = loader.data;
                loader.data = null;
            }
            loaderPool.push(loader);
            var source = loaderMap[loader.$hashCode];
            delete loaderMap[loader.$hashCode];
            var list = callBackMap[source];
            delete callBackMap[source];
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var arr = list[i];
                arr[0].call(arr[1], data, source);
            }
        };
        return DefaultAssetAdapter;
    })();
    swan.DefaultAssetAdapter = DefaultAssetAdapter;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var key = "__bindables__";
    /**
     * 标记实例的一个属性是可绑定的,此方法通常由 Watcher 类调用。
     * @param instance 要标记的实例
     * @param property 可绑定的属性。
     */
    function registerBindable(instance, property) {
        if (DEBUG) {
            if (!instance) {
                lark.$error(1003, "instance");
            }
            if (!property) {
                lark.$error(1003, "property");
            }
        }
        if (instance.hasOwnProperty(key)) {
            instance[key].push(property);
        }
        else {
            var list = [property];
            if (instance[key]) {
                list = instance[key].concat(list);
            }
            instance[key] = list;
        }
    }
    swan.registerBindable = registerBindable;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 为一个类定义注册运行时属性类型，以便运行时的EXML文件解析过程能获取准确的属性类型。大多数情况下，您都不需要手动调用此方法显式注册属性类型。
     * 仅当您有一个自定义的 UI 组件，需要在EXML中用标签描述时可能需要显式注册，但以下情况除外：
     * 当属性类型为基本数据类型：boolean,number,string,Array这四种其中之一时，您只需要为自定义的属性赋值上正确的初始值，
     * 运行时EXML解析器就能通过初始值自动分析出正确的属性类型。
     * 若您无法为属性赋值上正确的初始值时(有初始值，比如null),运行时EXML解析器会把此属性当做string来处理，若完全没有初始值，将会报错找不到节点属性，
     * 这种情况下可以手动调用此方法显式注册属性类型。
     *
     * @param classDefinition 要注册的类定义。
     * @param property 要注册的属性,注意属性名不能以 _ 或 $ 符开头。
     * @param type 要注册的类型,例如：“boolean","number","string","Array","lark.Rectangle"
     * @param asDefault 是否将此属性注册为组件的默认属性,一个组件只可以设置一个默认属性。注册了组件默认属性后，在EXML中可以使用省略属性节点的写法，
     * 例如：
     *
     * <e:Scroller>
     *     <e:viewport>
     *         <e:Group/>
     *     </e:viewport>
     * </e:Scroller>
     *
     * 因为 viewport 已经注册为 Scroller 的默认属性，上面的例子可以等效为：
     *
     * <e:Scroller>
     *     <e:Group/>
     * </e:Scroller>
     *
     */
    function registerProperty(classDefinition, property, type, asDefault) {
        if (DEBUG) {
            if (!classDefinition) {
                lark.$error(1003, "classDefinition");
            }
            if (!classDefinition.prototype) {
                lark.$error(1012, "classDefinition");
            }
            if (!property) {
                lark.$error(1003, "property");
            }
            if (!type) {
                lark.$error(1003, "type");
            }
        }
        var prototype = classDefinition.prototype;
        prototype.__meta__ = prototype.__meta__ || {};
        prototype.__meta__[property] = type;
        if (asDefault) {
            prototype.__defaultProperty__ = property;
        }
    }
    swan.registerProperty = registerProperty;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        /**
         * @private
         * 需要记录的历史速度的最大次数。
         */
        var MAX_VELOCITY_COUNT = 4;
        /**
         * @private
         * 记录的历史速度的权重列表。
         */
        var VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2];
        /**
         * @private
         * 当前速度所占的权重。
         */
        var CURRENT_VELOCITY_WEIGHT = 2.33;
        /**
         * @private
         * 最小的改变速度，解决浮点数精度问题。
         */
        var MINIMUM_VELOCITY = 0.02;
        /**
         * @private
         * 当容器自动滚动时要应用的摩擦系数
         */
        var FRICTION = 0.998;
        /**
         * @private
         * 当容器自动滚动时并且滚动位置超出容器范围时要额外应用的摩擦系数
         */
        var EXTRA_FRICTION = 0.95;
        /**
         * @private
         * 摩擦系数的自然对数
         */
        var FRICTION_LOG = Math.log(FRICTION);
        /**
         * @private
         *
         * @param ratio
         * @returns
         */
        function easeOut(ratio) {
            var invRatio = ratio - 1.0;
            return invRatio * invRatio * invRatio + 1;
        }
        /**
         * @private
         * 一个工具类,用于容器的滚屏拖动操作，计算在一段时间持续滚动后释放，应该继续滚动到的值和缓动时间。
         * 使用此工具类，您需要创建一个 ScrollThrown 实例,并在滚动发生时调用start()方法，然后在触摸移动过程中调用update()更新当前舞台坐标。
         * 内部将会启动一个计时器定时根据当前位置计算出速度值，并缓存下来最后4个值。当停止滚动时，再调用finish()方法，
         * 将立即停止记录位移，并将计算出的最终结果存储到 Thrown.scrollTo 和 Thrown.duration 属性上。
         */
        var TouchScroll = (function () {
            /**
             * @private
             * 创建一个 TouchScroll 实例
             * @param updateFunction 滚动位置更新回调函数
             */
            function TouchScroll(updateFunction, endFunction, target) {
                /**
                 * @private
                 */
                this.previousTime = 0;
                /**
                 * @private
                 */
                this.velocity = 0;
                /**
                 * @private
                 */
                this.previousVelocity = [];
                /**
                 * @private
                 */
                this.currentPosition = 0;
                /**
                 * @private
                 */
                this.previousPosition = 0;
                /**
                 * @private
                 */
                this.currentScrollPos = 0;
                /**
                 * @private
                 */
                this.maxScrollPos = 0;
                /**
                 * @private
                 * 鼠标按下时的偏移量
                 */
                this.offsetPoint = 0;
                if (DEBUG && !updateFunction) {
                    lark.$error(1003, "updateFunction");
                }
                this.updateFunction = updateFunction;
                this.endFunction = endFunction;
                this.target = target;
                this.animation = new sys.Animation(this.onScrollingUpdate, this);
                this.animation.endFunction = this.finishScrolling;
                this.animation.easerFunction = easeOut;
            }
            var d = __define,c=TouchScroll;p=c.prototype;
            /**
             * @private
             * 正在播放缓动动画的标志。
             */
            p.isPlaying = function () {
                return this.animation.isPlaying;
            };
            /**
             * @private
             * 如果正在执行缓动滚屏，停止缓动。
             */
            p.stop = function () {
                this.animation.stop();
                lark.stopTick(this.onTick, this);
            };
            /**
             * @private
             * 开始记录位移变化。注意：当使用完毕后，必须调用 finish() 方法结束记录，否则该对象将无法被回收。
             * @param touchPoint 起始触摸位置，以像素为单位，通常是stageX或stageY。
             */
            p.start = function (touchPoint, scrollValue, maxScrollValue) {
                this.velocity = 0;
                this.previousVelocity.length = 0;
                this.previousTime = lark.getTimer();
                this.previousPosition = this.currentPosition = touchPoint;
                this.offsetPoint = scrollValue + touchPoint;
                lark.startTick(this.onTick, this);
            };
            /**
             * @private
             * 更新当前移动到的位置
             * @param touchPoint 当前触摸位置，以像素为单位，通常是stageX或stageY。
             */
            p.update = function (touchPoint, maxScrollValue) {
                this.currentPosition = touchPoint;
                this.maxScrollPos = maxScrollValue;
                var scrollPos = this.offsetPoint - touchPoint;
                if (scrollPos < 0) {
                    scrollPos *= 0.5;
                }
                if (scrollPos > maxScrollValue) {
                    scrollPos = (scrollPos + maxScrollValue) * 0.5;
                }
                this.currentScrollPos = scrollPos;
                this.updateFunction.call(this.target, scrollPos);
            };
            /**
             * @private
             * 停止记录位移变化，并计算出目标值和继续缓动的时间。
             * @param currentScrollPos 容器当前的滚动值。
             * @param maxScrollPos 容器可以滚动的最大值。当目标值不在 0~maxValue之间时，将会应用更大的摩擦力，从而影响缓动时间的长度。
             */
            p.finish = function (currentScrollPos, maxScrollPos) {
                lark.stopTick(this.onTick, this);
                var sum = this.velocity * CURRENT_VELOCITY_WEIGHT;
                var previousVelocityX = this.previousVelocity;
                var length = previousVelocityX.length;
                var totalWeight = CURRENT_VELOCITY_WEIGHT;
                for (var i = 0; i < length; i++) {
                    var weight = VELOCITY_WEIGHTS[i];
                    sum += previousVelocityX[0] * weight;
                    totalWeight += weight;
                }
                var pixelsPerMS = sum / totalWeight;
                var absPixelsPerMS = Math.abs(pixelsPerMS);
                var duration = 0;
                var posTo = 0;
                if (absPixelsPerMS > MINIMUM_VELOCITY) {
                    posTo = currentScrollPos + (pixelsPerMS - MINIMUM_VELOCITY) / FRICTION_LOG;
                    if (posTo < 0 || posTo > maxScrollPos) {
                        posTo = currentScrollPos;
                        while (Math.abs(pixelsPerMS) > MINIMUM_VELOCITY) {
                            posTo -= pixelsPerMS;
                            if (posTo < 0 || posTo > maxScrollPos) {
                                pixelsPerMS *= FRICTION * EXTRA_FRICTION;
                            }
                            else {
                                pixelsPerMS *= FRICTION;
                            }
                            duration++;
                        }
                    }
                    else {
                        duration = Math.log(MINIMUM_VELOCITY / absPixelsPerMS) / FRICTION_LOG;
                    }
                }
                if (duration > 0) {
                    this.throwTo(posTo, duration);
                }
                else {
                    this.finishScrolling();
                }
            };
            /**
             * @private
             *
             * @param timeStamp
             * @returns
             */
            p.onTick = function (timeStamp) {
                var timeOffset = timeStamp - this.previousTime;
                if (timeOffset > 0) {
                    var previousVelocity = this.previousVelocity;
                    previousVelocity.push(this.velocity);
                    if (previousVelocity.length > MAX_VELOCITY_COUNT) {
                        previousVelocity.shift();
                    }
                    this.velocity = (this.currentPosition - this.previousPosition) / timeOffset;
                    this.previousTime = timeStamp;
                    this.previousPosition = this.currentPosition;
                }
                return true;
            };
            /**
             * @private
             *
             * @param animation
             */
            p.finishScrolling = function (animation) {
                var hsp = this.currentScrollPos;
                var maxHsp = this.maxScrollPos;
                var hspTo = hsp;
                if (hsp < 0) {
                    hspTo = 0;
                }
                if (hsp > maxHsp) {
                    hspTo = maxHsp;
                }
                this.throwTo(hspTo, 300);
            };
            /**
             * @private
             * 缓动到水平滚动位置
             */
            p.throwTo = function (hspTo, duration) {
                if (duration === void 0) { duration = 500; }
                var hsp = this.currentScrollPos;
                if (hsp == hspTo) {
                    this.endFunction.call(this.target);
                    return;
                }
                var animation = this.animation;
                animation.duration = duration;
                animation.from = hsp;
                animation.to = hspTo;
                animation.play();
            };
            /**
             * @private
             * 更新水平滚动位置
             */
            p.onScrollingUpdate = function (animation) {
                this.currentScrollPos = animation.currentValue;
                this.updateFunction.call(this.target, animation.currentValue);
            };
            return TouchScroll;
        })();
        sys.TouchScroll = TouchScroll;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        var SOLUTION_TOLERANCE = 0.1;
        var MIN_MAX_TOLERANCE = 0.1;
        var MatrixUtil = (function () {
            function MatrixUtil() {
            }
            var d = __define,c=MatrixUtil;p=c.prototype;
            MatrixUtil.fitBounds = function (width, height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight) {
                if (lark.isNone(width) && lark.isNone(height))
                    return lark.Point.create(preferredWidth, preferredHeight);
                var newMinWidth = (minWidth < MIN_MAX_TOLERANCE) ? 0 : minWidth - MIN_MAX_TOLERANCE;
                var newMinHeight = (minHeight < MIN_MAX_TOLERANCE) ? 0 : minHeight - MIN_MAX_TOLERANCE;
                var newMaxWidth = maxWidth + MIN_MAX_TOLERANCE;
                var newMaxHeight = maxHeight + MIN_MAX_TOLERANCE;
                var actualSize;
                if (!lark.isNone(width) && !lark.isNone(height)) {
                    actualSize = calcUBoundsToFitTBounds(width, height, matrix, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                    if (!actualSize) {
                        var actualSize1;
                        actualSize1 = fitTBoundsWidth(width, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                        if (actualSize1) {
                            var fitHeight = transformSize(actualSize1.x, actualSize1.y, matrix).height;
                            if (fitHeight - SOLUTION_TOLERANCE > height) {
                                lark.Point.release(actualSize1);
                                actualSize1 = null;
                            }
                        }
                        var actualSize2;
                        actualSize2 = fitTBoundsHeight(height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                        if (actualSize2) {
                            var fitWidth = transformSize(actualSize2.x, actualSize2.y, matrix).width;
                            if (fitWidth - SOLUTION_TOLERANCE > width) {
                                lark.Point.release(actualSize2);
                                actualSize2 = null;
                            }
                        }
                        if (actualSize1 && actualSize2) {
                            actualSize = ((actualSize1.x * actualSize1.y) > (actualSize2.x * actualSize2.y)) ? actualSize1 : actualSize2;
                        }
                        else if (actualSize1) {
                            actualSize = actualSize1;
                        }
                        else {
                            actualSize = actualSize2;
                        }
                        lark.Point.release(actualSize1);
                        lark.Point.release(actualSize2);
                    }
                    return actualSize;
                }
                else if (!lark.isNone(width)) {
                    return fitTBoundsWidth(width, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                }
                else {
                    return fitTBoundsHeight(height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                }
            };
            return MatrixUtil;
        })();
        sys.MatrixUtil = MatrixUtil;
        function fitTBoundsWidth(width, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight) {
            var actualSize;
            if (!lark.isNone(explicitWidth) && lark.isNone(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsWidth(width, matrix, explicitWidth, preferredHeight, explicitWidth, minHeight, explicitWidth, maxHeight);
                if (actualSize)
                    return actualSize;
            }
            else if (lark.isNone(explicitWidth) && !lark.isNone(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsWidth(width, matrix, preferredWidth, explicitHeight, minWidth, explicitHeight, maxWidth, explicitHeight);
                if (actualSize)
                    return actualSize;
            }
            actualSize = calcUBoundsToFitTBoundsWidth(width, matrix, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight);
            return actualSize;
        }
        function fitTBoundsHeight(height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight) {
            var actualSize;
            if (!lark.isNone(explicitWidth) && lark.isNone(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsHeight(height, matrix, explicitWidth, preferredHeight, explicitWidth, minHeight, explicitWidth, maxHeight);
                if (actualSize)
                    return actualSize;
            }
            else if (lark.isNone(explicitWidth) && !lark.isNone(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsHeight(height, matrix, preferredWidth, explicitHeight, minWidth, explicitHeight, maxWidth, explicitHeight);
                if (actualSize)
                    return actualSize;
            }
            actualSize = calcUBoundsToFitTBoundsHeight(height, matrix, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight);
            return actualSize;
        }
        function calcUBoundsToFitTBoundsHeight(h, matrix, preferredX, preferredY, minX, minY, maxX, maxY) {
            var b = matrix.b;
            var d = matrix.d;
            if (-1.0e-9 < b && b < +1.0e-9)
                b = 0;
            if (-1.0e-9 < d && d < +1.0e-9)
                d = 0;
            if (b == 0 && d == 0)
                return null;
            if (b == 0 && d == 0)
                return null;
            if (b == 0)
                return lark.Point.create(preferredX, h / Math.abs(d));
            else if (d == 0)
                return lark.Point.create(h / Math.abs(b), preferredY);
            var d1 = (b * d >= 0) ? d : -d;
            var s;
            var x;
            var y;
            if (d1 != 0 && preferredX > 0) {
                var invD1 = 1 / d1;
                preferredX = Math.max(minX, Math.min(maxX, preferredX));
                x = preferredX;
                y = (h - b * x) * invD1;
                if (minY <= y && y <= maxY && b * x + d1 * y >= 0) {
                    s = lark.Point.create(x, y);
                }
                y = (-h - b * x) * invD1;
                if (minY <= y && y <= maxY && b * x + d1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).width > transformSize(x, y, matrix).width) {
                        lark.Point.release(s);
                        s = lark.Point.create(x, y);
                    }
                }
            }
            if (b != 0 && preferredY > 0) {
                var invB = 1 / b;
                preferredY = Math.max(minY, Math.min(maxY, preferredY));
                y = preferredY;
                x = (h - d1 * y) * invB;
                if (minX <= x && x <= maxX && b * x + d1 * y >= 0) {
                    if (!s || transformSize(s.x, s.y, matrix).width > transformSize(x, y, matrix).width)
                        s = lark.Point.create(x, y);
                }
                x = (-h - d1 * y) * invB;
                if (minX <= x && x <= maxX && b * x + d1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).width > transformSize(x, y, matrix).width) {
                        lark.Point.release(s);
                        s = lark.Point.create(x, y);
                    }
                }
            }
            if (s)
                return s;
            var a = matrix.a;
            var c = matrix.c;
            var c1 = (a * c >= 0) ? c : -c;
            return solveEquation(b, d1, h, minX, minY, maxX, maxY, a, c1);
        }
        function calcUBoundsToFitTBoundsWidth(w, matrix, preferredX, preferredY, minX, minY, maxX, maxY) {
            var a = matrix.a;
            var c = matrix.c;
            if (-1.0e-9 < a && a < +1.0e-9)
                a = 0;
            if (-1.0e-9 < c && c < +1.0e-9)
                c = 0;
            if (a == 0 && c == 0)
                return null;
            if (a == 0)
                return lark.Point.create(preferredX, w / Math.abs(c));
            else if (c == 0)
                return lark.Point.create(w / Math.abs(a), preferredY);
            var c1 = (a * c >= 0) ? c : -c;
            var s;
            var x;
            var y;
            if (c1 != 0 && preferredX > 0) {
                var invC1 = 1 / c1;
                preferredX = Math.max(minX, Math.min(maxX, preferredX));
                x = preferredX;
                y = (w - a * x) * invC1;
                if (minY <= y && y <= maxY && a * x + c1 * y >= 0) {
                    s = lark.Point.create(x, y);
                }
                y = (-w - a * x) * invC1;
                if (minY <= y && y <= maxY && a * x + c1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).height > transformSize(x, y, matrix).height) {
                        lark.Point.release(s);
                        s = lark.Point.create(x, y);
                    }
                }
            }
            if (a != 0 && preferredY > 0) {
                var invA = 1 / a;
                preferredY = Math.max(minY, Math.min(maxY, preferredY));
                y = preferredY;
                x = (w - c1 * y) * invA;
                if (minX <= x && x <= maxX && a * x + c1 * y >= 0) {
                    if (!s || transformSize(s.x, s.y, matrix).height > transformSize(x, y, matrix).height) {
                        lark.Point.release(s);
                        s = lark.Point.create(x, y);
                    }
                }
                x = (-w - c1 * y) * invA;
                if (minX <= x && x <= maxX && a * x + c1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).height > transformSize(x, y, matrix).height) {
                        lark.Point.release(s);
                        s = lark.Point.create(x, y);
                    }
                }
            }
            if (s)
                return s;
            var b = matrix.b;
            var d = matrix.d;
            var d1 = (b * d >= 0) ? d : -d;
            return solveEquation(a, c1, w, minX, minY, maxX, maxY, b, d1);
        }
        function solveEquation(a, c, w, minX, minY, maxX, maxY, b, d) {
            if (a == 0 || c == 0)
                return null;
            var x;
            var y;
            var A = (w - minX * a) / c;
            var B = (w - maxX * a) / c;
            var rangeMinY = Math.max(minY, Math.min(A, B));
            var rangeMaxY = Math.min(maxY, Math.max(A, B));
            var det = (b * c - a * d);
            if (rangeMinY <= rangeMaxY) {
                if (Math.abs(det) < 1.0e-9) {
                    y = w / (a + c);
                }
                else {
                    y = b * w / det;
                }
                y = Math.max(rangeMinY, Math.min(y, rangeMaxY));
                x = (w - c * y) / a;
                return lark.Point.create(x, y);
            }
            A = -(minX * a + w) / c;
            B = -(maxX * a + w) / c;
            rangeMinY = Math.max(minY, Math.min(A, B));
            rangeMaxY = Math.min(maxY, Math.max(A, B));
            if (rangeMinY <= rangeMaxY) {
                if (Math.abs(det) < 1.0e-9) {
                    y = -w / (a + c);
                }
                else {
                    y = -b * w / det;
                }
                y = Math.max(rangeMinY, Math.min(y, rangeMaxY));
                x = (-w - c * y) / a;
                return lark.Point.create(x, y);
            }
            return null;
        }
        function calcUBoundsToFitTBounds(w, h, matrix, minX, minY, maxX, maxY) {
            var a = matrix.a;
            var b = matrix.b;
            var c = matrix.c;
            var d = matrix.d;
            if (-1.0e-9 < a && a < +1.0e-9)
                a = 0;
            if (-1.0e-9 < b && b < +1.0e-9)
                b = 0;
            if (-1.0e-9 < c && c < +1.0e-9)
                c = 0;
            if (-1.0e-9 < d && d < +1.0e-9)
                d = 0;
            if (b == 0 && c == 0) {
                if (a == 0 || d == 0)
                    return null;
                return lark.Point.create(w / Math.abs(a), h / Math.abs(d));
            }
            if (a == 0 && d == 0) {
                if (b == 0 || c == 0)
                    return null;
                return lark.Point.create(h / Math.abs(b), w / Math.abs(c));
            }
            var c1 = (a * c >= 0) ? c : -c;
            var d1 = (b * d >= 0) ? d : -d;
            var det = a * d1 - b * c1;
            if (Math.abs(det) < 1.0e-9) {
                if (c1 == 0 || a == 0 || a == -c1)
                    return null;
                if (Math.abs(a * h - b * w) > 1.0e-9)
                    return null;
                return solveEquation(a, c1, w, minX, minX, maxX, maxY, b, d1);
            }
            var invDet = 1 / det;
            w *= invDet;
            h *= invDet;
            var s;
            s = solveSystem(a, c1, b, d1, w, h);
            if (s && minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY && a * s.x + c1 * s.x >= 0 && b * s.x + d1 * s.y >= 0)
                return s;
            s = solveSystem(a, c1, b, d1, w, -h);
            if (s && minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY && a * s.x + c1 * s.x >= 0 && b * s.x + d1 * s.y < 0)
                return s;
            s = solveSystem(a, c1, b, d1, -w, h);
            if (s && minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY && a * s.x + c1 * s.x < 0 && b * s.x + d1 * s.y >= 0)
                return s;
            s = solveSystem(a, c1, b, d1, -w, -h);
            if (s && minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY && a * s.x + c1 * s.x < 0 && b * s.x + d1 * s.y < 0)
                return s;
            lark.Point.release(s);
            return null;
        }
        function transformSize(width, height, matrix) {
            var bounds = lark.$TempRectangle.setTo(0, 0, width, height);
            matrix.$transformBounds(bounds);
            return bounds;
        }
        function solveSystem(a, c, b, d, mOverDet, nOverDet) {
            return lark.Point.create(d * mOverDet - c * nOverDet, a * nOverDet - b * mOverDet);
        }
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 视图状态设置属性操作
     */
    var SetProperty = (function () {
        /**
         * 创建一个SetProperty实例
         */
        function SetProperty(target, name, value) {
            this.target = target;
            this.name = name;
            this.value = value;
        }
        var d = __define,c=SetProperty;p=c.prototype;
        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        p.apply = function (host, parent) {
            var obj = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.oldValue = obj[this.name];
            this.setPropertyValue(obj, this.name, this.value, this.oldValue);
        };
        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        p.remove = function (host, parent) {
            var obj = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.setPropertyValue(obj, this.name, this.oldValue, this.oldValue);
            this.oldValue = null;
        };
        /**
         * 设置属性值
         */
        p.setPropertyValue = function (obj, name, value, valueForType) {
            if (value === undefined || value === null)
                obj[name] = value;
            else if (typeof (valueForType) == "number")
                obj[name] = +value;
            else if (typeof (valueForType) == "boolean")
                obj[name] = this.toBoolean(value);
            else
                obj[name] = value;
        };
        /**
         * 转成Boolean值
         */
        p.toBoolean = function (value) {
            if (typeof (value) == "string")
                return value.toLowerCase() == "true";
            return value != false;
        };
        return SetProperty;
    })();
    swan.SetProperty = SetProperty;
    lark.registerClass(SetProperty, 1034 /* SetProperty */, [1032 /* IOverride */]);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @language en_US
     * The ArrayCollection class is a wrapper class that exposes an <code>any[]</code> as a collection that can be
     * accessed and manipulated using the methods and properties of the <code>ICollection</code> interfaces.
     * ArrayCollection can notify the view to update item when data source changed.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ArrayCollection 类是数组的集合类数据结构包装器，可使用<code>ICollection</code>接口的方法和属性对其进行访问和处理。
     * 使用这种数据结构包装普通数组，能在数据源发生改变的时候主动通知视图刷新变更数据项。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var ArrayCollection = (function (_super) {
        __extends(ArrayCollection, _super);
        /**
         * @language en_US
         * Constructor. <p/>
         * Creates a new ArrayCollection using the specified source array.
         * If no array is specified an empty array will be used.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。<p/>
         * 用指定的原始数组创建一个 ArrayCollection 实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        function ArrayCollection(source) {
            _super.call(this);
            if (source) {
                this._source = source;
            }
            else {
                this._source = [];
            }
        }
        var d = __define,c=ArrayCollection;p=c.prototype;
        d(p, "source",
            /**
             * @language en_US
             * The source of data in the ArrayCollection.
             * The ArrayCollection object does not represent any changes that you make
             * directly to the source array. Always use the ICollection methods to view the collection.
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 数据源
             * 通常情况下请不要直接调用Array的方法操作数据源，否则对应的视图无法收到数据改变的通知。通常都是通过ICollection的接口方法来查看数据。
             * 若对数据源进行了修改，请手动调用refresh()方法刷新数据。
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this._source;
            },
            function (value) {
                if (!value)
                    value = [];
                this._source = value;
                this.dispatchCoEvent(swan.CollectionEventKind.RESET);
            }
        );
        /**
         * @language en_US
         * Applies the sort and filter to the view.
         * The ArrayCollection does not detect source data changes automatically,
         * so you must call the <code>refresh()</code>
         * method to update the view after changing the source data.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在对数据源进行排序或过滤操作后可以手动调用此方法刷新所有数据,以更新视图。
         * ArrayCollection 不会自动检原始数据进行了改变,所以你必须调用<code>refresh()</code>方法去更新显示。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.refresh = function () {
            this.dispatchCoEvent(swan.CollectionEventKind.REFRESH);
        };
        d(p, "length",
            //--------------------------------------------------------------------------
            //
            // ICollection接口实现方法
            //
            //--------------------------------------------------------------------------
            /**
             * @inheritDoc
             */
            function () {
                return this._source.length;
            },undefined
        );
        /**
         * @language en_US
         * Adds the specified item to the end of the list.
         * Equivalent to <code>addItemAt(item, length)</code>.
         * @param item The item to add.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 向列表末尾添加指定项目。等效于 <code>addItemAt(item, length)</code>。
         * @param item 要被添加的项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.addItem = function (item) {
            this._source.push(item);
            this.dispatchCoEvent(swan.CollectionEventKind.ADD, this._source.length - 1, -1, [item]);
        };
        /**
         * @language en_US
         * Adds the item at the specified index.
         * The index of any item greater than the index of the added item is increased by one.
         * If the the specified index is less than zero or greater than the length
         * of the list, a Error which code is 1007 is thrown.
         * @param item The item to place at the index.
         * @param index The index at which to place the item.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在指定的索引处添加项目。
         * 任何大于已添加项目的索引的项目索引都会增加 1。
         * 如果指定的索引比0小或者比最大长度要大。则会抛出1007异常。
         * @param item 要添加的项
         * @param index 要添加的指定索引位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.addItemAt = function (item, index) {
            if (index < 0 || index > this._source.length) {
                DEBUG && lark.$error(1007);
            }
            this._source.splice(index, 0, item);
            this.dispatchCoEvent(swan.CollectionEventKind.ADD, index, -1, [item]);
        };
        /**
         * @inheritDoc
         */
        p.getItemAt = function (index) {
            return this._source[index];
        };
        /**
         * @inheritDoc
         */
        p.getItemIndex = function (item) {
            var length = this._source.length;
            for (var i = 0; i < length; i++) {
                if (this._source[i] === item) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * @language en_US
         * Notifies the view that an item has been updated.
         * @param item The item within the view that was updated.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 通知视图，某个项目的属性已更新。
         * @param item 视图中需要被更新的项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.itemUpdated = function (item) {
            var index = this.getItemIndex(item);
            if (index != -1) {
                this.dispatchCoEvent(swan.CollectionEventKind.UPDATE, index, -1, [item]);
            }
        };
        /**
         * @language en_US
         * Removes all items from the list.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 删除列表中的所有项目。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.removeAll = function () {
            var items = this._source.concat();
            this._source.length = 0;
            this.dispatchCoEvent(swan.CollectionEventKind.REMOVE, 0, -1, items);
        };
        /**
         * @language en_US
         * Removes the item at the specified index and returns it.
         * Any items that were after this index are now one index earlier.
         * @param index The index from which to remove the item.
         * @return The item that was removed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 删除指定索引处的项目并返回该项目。原先位于此索引之后的所有项目的索引现在都向前移动一个位置。
         * @param index 要被移除的项的索引。
         * @return 被移除的项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.removeItemAt = function (index) {
            if (index < 0 || index >= this._source.length) {
                DEBUG && lark.$error(1007);
                return;
            }
            var item = this._source.splice(index, 1)[0];
            this.dispatchCoEvent(swan.CollectionEventKind.REMOVE, index, -1, [item]);
            return item;
        };
        /**
         * @language en_US
         * Replaces the item at the specified index.
         * @param item The new item to be placed at the specified index.
         * @param index The index at which to place the item.
         * @return The item that was replaced, or <code>null</code> if none.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 替换在指定索引处的项目，并返回该项目。
         * @param item 要在指定索引放置的新的项。
         * @param index 要被替换的项的索引位置。
         * @return 被替换的项目，如果没有该项则返回<code>null</code> 。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.replaceItemAt = function (item, index) {
            if (index < 0 || index >= this._source.length) {
                DEBUG && lark.$error(1007);
                return;
            }
            var oldItem = this._source.splice(index, 1, item)[0];
            this.dispatchCoEvent(swan.CollectionEventKind.REPLACE, index, -1, [item], [oldItem]);
            return oldItem;
        };
        /**
         * @language en_US
         * Replaces all items with a new source data, this method can not reset the scroller position of view.
         * @param newSource new source data.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 用新数据源替换原始数据源，此方法与直接设置source不同，它不会导致目标视图重置滚动位置。
         * @param newSource 新数据。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.replaceAll = function (newSource) {
            if (!newSource)
                newSource = [];
            var newLength = newSource.length;
            var oldLength = this._source.length;
            for (var i = newLength; i < oldLength; i++) {
                this.removeItemAt(newLength);
            }
            for (i = 0; i < newLength; i++) {
                if (i >= oldLength)
                    this.addItemAt(newSource[i], i);
                else
                    this.replaceItemAt(newSource[i], i);
            }
            this._source = newSource;
        };
        /**
         * @private
         * 抛出事件
         */
        p.dispatchCoEvent = function (kind, location, oldLocation, items, oldItems) {
            swan.CollectionEvent.emitCollectionEvent(this, swan.CollectionEvent.COLLECTION_CHANGE, kind, location, oldLocation, items, oldItems);
        };
        return ArrayCollection;
    })(lark.EventEmitter);
    swan.ArrayCollection = ArrayCollection;
    /**
     * @private
     */
    swan.registerProperty(ArrayCollection, "source", "Array", true);
    /**
     * @private
     */
    lark.registerClass(ArrayCollection, 1018 /* ArrayCollection */);
    /**
     * @private
     */
    if (DEBUG) {
        lark.$markReadOnly(ArrayCollection.prototype, "length");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        /**
         * EXML配置管理器实例
         */
        sys.exmlConfig;
        var exmlParserPool = [];
        var parsedClasses = {};
        var innerClassCount = 1;
        var DECLARATIONS = "Declarations";
        var RECTANGLE = "lark.Rectangle";
        var TYPE_CLASS = "Class";
        var TYPE_ARRAY = "Array";
        var TYPE_STATE = "State[]";
        var SKIN_NAME = "skinName";
        var ELEMENTS_CONTENT = "elementsContent";
        var basicTypes = [TYPE_ARRAY, "boolean", "string", "number"];
        var wingKeys = ["id", "locked", "includeIn", "excludeFrom"];
        var htmlEntities = [["<", "&lt;"], [">", "&gt;"], ["&", "&amp;"], ["\"", "&quot;"], ["'", "&apos;"]];
        var EXMLParser = (function () {
            function EXMLParser() {
                /**
                 * 延迟赋值字典
                 */
                this.delayAssignmentDic = {};
                if (DEBUG) {
                    this.repeatedIdMap = {};
                    this.getRepeatedIds = getRepeatedIds;
                    this.getIds = getIds;
                    this.checkDeclarations = checkDeclarations;
                }
            }
            var d = __define,c=EXMLParser;p=c.prototype;
            /**
             * 编译指定的XML对象为JavaScript代码。
             * @param xmlData 要编译的EXML文件内容
             * @param className 要编译成的完整类名，包括模块名。
             */
            p.parse = function (text) {
                if (DEBUG) {
                    if (!text) {
                        lark.$error(1003, "text");
                    }
                }
                try {
                    var xmlData = lark.XML.parse(text);
                }
                catch (e) {
                    if (DEBUG) {
                        lark.$error(2002, text + "\n" + e.message);
                    }
                }
                var className = "";
                var hasClass = false;
                if (xmlData.attributes["class"]) {
                    className = xmlData.attributes["class"];
                    delete xmlData.attributes["class"];
                    hasClass = !!className;
                }
                else {
                    className = "$exmlClass" + innerClassCount++;
                }
                var exClass = this.parseClass(xmlData, className);
                var code = exClass.toCode();
                try {
                    var clazz = eval(code);
                }
                catch (e) {
                    if (DEBUG) {
                        lark.log(code);
                    }
                    return null;
                }
                if (hasClass && clazz) {
                    var paths = className.split(".");
                    var length = paths.length;
                    var definition = __global;
                    for (var i = 0; i < length - 1; i++) {
                        var path = paths[i];
                        definition = definition[path] || (definition[path] = {});
                    }
                    if (definition[paths[length - 1]]) {
                        if (DEBUG && !parsedClasses[className]) {
                            lark.$warn(2101, className, toXMLString(xmlData));
                        }
                    }
                    else {
                        if (DEBUG) {
                            parsedClasses[className] = true;
                        }
                        definition[paths[length - 1]] = clazz;
                    }
                }
                return clazz;
            };
            /**
             * 编译指定的XML对象为CpClass对象。
             */
            p.parseClass = function (xmlData, className) {
                if (!sys.exmlConfig) {
                    sys.exmlConfig = new sys.EXMLConfig();
                }
                this.currentXML = xmlData;
                this.currentClassName = className;
                this.delayAssignmentDic = {};
                this.idDic = {};
                this.idToNode = {};
                this.stateCode = [];
                this.stateNames = [];
                this.skinParts = [];
                this.bindings = [];
                this.declarations = null;
                this.currentClass = new sys.EXClass();
                this.stateIds = [];
                var index = className.lastIndexOf(".");
                if (index != -1) {
                    this.currentClass.className = className.substring(index + 1);
                }
                else {
                    this.currentClass.className = className;
                }
                this.startCompile();
                var clazz = this.currentClass;
                this.currentClass = null;
                return clazz;
            };
            /**
             * 开始编译
             */
            p.startCompile = function () {
                if (DEBUG) {
                    var result = this.getRepeatedIds(this.currentXML);
                    if (result.length > 0) {
                        lark.$error(2004, this.currentClassName, result.join("\n"));
                    }
                }
                this.currentClass.superClass = this.getClassNameOfNode(this.currentXML);
                this.getStateNames();
                var children = this.currentXML.children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var node = children[i];
                        if (node.nodeType === 1 && node.namespace == sys.NS_W && node.localName == DECLARATIONS) {
                            this.declarations = node;
                            break;
                        }
                    }
                }
                if (DEBUG) {
                    var list = [];
                    this.checkDeclarations(this.declarations, list);
                    if (list.length > 0) {
                        lark.$error(2020, this.currentClassName, list.join("\n"));
                    }
                }
                if (!this.currentXML.namespace) {
                    if (DEBUG) {
                        lark.$error(2017, this.currentClassName, toXMLString(this.currentXML));
                    }
                    return;
                }
                this.addIds(this.currentXML.children);
                this.createConstructFunc();
            };
            /**
             * 添加必须的id
             */
            p.addIds = function (items) {
                if (!items) {
                    return;
                }
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    var node = items[i];
                    if (node.nodeType != 1) {
                        continue;
                    }
                    if (!node.namespace) {
                        if (DEBUG) {
                            lark.$error(2017, this.currentClassName, toXMLString(node));
                        }
                        continue;
                    }
                    if (this.isInnerClass(node)) {
                        continue;
                    }
                    this.addIds(node.children);
                    if (node.namespace == sys.NS_W || !node.localName) {
                    }
                    else if (this.isProperty(node)) {
                        var prop = node.localName;
                        var index = prop.indexOf(".");
                        var children = node.children;
                        if (index == -1 || !children || children.length == 0) {
                            continue;
                        }
                        var firstChild = children[0];
                        this.stateIds.push(firstChild.attributes.id);
                    }
                    else if (node.nodeType === 1) {
                        var id = node.attributes["id"];
                        if (id) {
                            this.idToNode[id] = node;
                            if (this.skinParts.indexOf(id) == -1) {
                                this.skinParts.push(id);
                            }
                            this.createVarForNode(node);
                            if (this.isStateNode(node))
                                this.stateIds.push(id);
                        }
                        else {
                            this.createIdForNode(node);
                            this.idToNode[node.attributes.id] = node;
                            if (this.isStateNode(node))
                                this.stateIds.push(node.attributes.id);
                        }
                    }
                }
            };
            /**
             * 是否为内部类。
             */
            p.isInnerClass = function (node) {
                if (node.hasOwnProperty("isInnerClass")) {
                    return node["isInnerClass"];
                }
                var result = (node.localName == "Skin" && node.namespace == sys.NS_S);
                if (!result) {
                    if (this.isProperty(node)) {
                        result = false;
                    }
                    else {
                        var parent = node.parent;
                        if (this.isProperty(parent)) {
                            var prop = parent.localName;
                            var index = prop.indexOf(".");
                            if (index != -1) {
                                var stateName = prop.substring(index + 1);
                                prop = prop.substring(0, index);
                            }
                            parent = parent.parent;
                        }
                        else {
                            prop = sys.exmlConfig.getDefaultPropById(parent.localName, parent.namespace);
                        }
                        var className = sys.exmlConfig.getClassNameById(parent.localName, parent.namespace);
                        result = (sys.exmlConfig.getPropertyType(prop, className) == TYPE_CLASS);
                    }
                }
                node["isInnerClass"] = result;
                return result;
            };
            /**
             * 检测指定节点的属性是否含有视图状态
             */
            p.containsState = function (node) {
                var attributes = node.attributes;
                if (attributes["includeIn"]) {
                    return true;
                }
                var keys = Object.keys(attributes);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var name = keys[i];
                    if (name.indexOf(".") != -1) {
                        return true;
                    }
                }
                return false;
            };
            /**
             * 为指定节点创建id属性
             */
            p.createIdForNode = function (node) {
                var idName = this.getNodeId(node);
                if (!this.idDic[idName])
                    this.idDic[idName] = 1;
                else
                    this.idDic[idName]++;
                idName += this.idDic[idName];
                node.attributes.id = idName;
            };
            /**
             * 获取节点ID
             */
            p.getNodeId = function (node) {
                if (node.attributes["id"])
                    return node.attributes.id;
                return "_" + node.localName;
            };
            /**
             * 为指定节点创建变量
             */
            p.createVarForNode = function (node) {
                var moduleName = this.getClassNameOfNode(node);
                if (moduleName == "")
                    return;
                if (!this.currentClass.getVariableByName(node.attributes.id))
                    this.currentClass.addVariable(new sys.EXVariable(node.attributes.id));
            };
            /**
             * 为指定节点创建初始化函数,返回函数名引用
             */
            p.createFuncForNode = function (node) {
                var className = node.localName;
                var isBasicType = this.isBasicTypeData(className);
                if (isBasicType)
                    return this.createBasicTypeForNode(node);
                var moduleName = this.getClassNameOfNode(node);
                var func = new sys.EXFunction();
                var tailName = "_i";
                var id = node.attributes.id;
                func.name = id + tailName;
                this.currentClass.addFunction(func);
                var cb = new sys.EXCodeBlock();
                func.codeBlock = cb;
                var varName = "t";
                if (className == "Object") {
                    cb.addVar(varName, "{}");
                }
                else {
                    cb.addVar(varName, "new " + moduleName + "()");
                }
                var containsId = !!this.currentClass.getVariableByName(id);
                if (containsId) {
                    cb.addAssignment("this." + id, varName);
                }
                this.addAttributesToCodeBlock(cb, varName, node);
                this.initlizeChildNode(node, cb, varName);
                var delayAssignments = this.delayAssignmentDic[id];
                if (delayAssignments) {
                    var length = delayAssignments.length;
                    for (var i = 0; i < length; i++) {
                        var codeBlock = delayAssignments[i];
                        cb.concat(codeBlock);
                    }
                }
                cb.addReturn(varName);
                return "this." + func.name + "()";
            };
            /**
             * 检查目标类名是否是基本数据类型
             */
            p.isBasicTypeData = function (className) {
                return basicTypes.indexOf(className) != -1;
            };
            /**
             * 为指定基本数据类型节点实例化,返回实例化后的值。
             */
            p.createBasicTypeForNode = function (node) {
                var className = node.localName;
                var returnValue = "";
                var varItem = this.currentClass.getVariableByName(node.attributes.id);
                var children = node.children;
                var text = "";
                if (children && children.length > 0) {
                    var firstChild = children[0];
                    if (firstChild.nodeType == 3) {
                        text = firstChild.text.trim();
                    }
                }
                switch (className) {
                    case TYPE_ARRAY:
                        var values = [];
                        if (children) {
                            var length = children.length;
                            for (var i = 0; i < length; i++) {
                                var child = children[i];
                                if (child.nodeType == 1) {
                                    values.push(this.createFuncForNode(child));
                                }
                            }
                        }
                        returnValue = "[" + values.join(",") + "]";
                        break;
                    case "boolean":
                        returnValue = (text == "false" || !text) ? "false" : "true";
                        break;
                    case "number":
                        returnValue = text;
                        if (returnValue.indexOf("%") != -1)
                            returnValue = returnValue.substring(0, returnValue.length - 1);
                        break;
                    case "string":
                        returnValue = this.formatString(text);
                        break;
                }
                if (varItem)
                    varItem.defaultValue = returnValue;
                return returnValue;
            };
            /**
             * 将节点属性赋值语句添加到代码块
             */
            p.addAttributesToCodeBlock = function (cb, varName, node) {
                var key;
                var value;
                var attributes = node.attributes;
                var keyList = Object.keys(attributes);
                keyList.sort(); //排序一下防止出现随机顺序
                var length = keyList.length;
                for (var i = 0; i < length; i++) {
                    key = keyList[i];
                    if (!this.isNormalKey(key)) {
                        continue;
                    }
                    value = attributes[key];
                    key = this.formatKey(key, value);
                    value = this.formatValue(key, value, node);
                    if (!value) {
                        continue;
                    }
                    if (this.currentClass.getVariableByName(value)) {
                        var THIS = "this.";
                        var id = attributes.id;
                        var codeLine = THIS + id + " = t;";
                        if (!this.currentClass.getVariableByName(id))
                            this.createVarForNode(node);
                        if (!cb.containsCodeLine(codeLine)) {
                            cb.addCodeLineAt(codeLine, 1);
                        }
                        var delayCb = new sys.EXCodeBlock();
                        if (varName == "this") {
                            delayCb.addAssignment(varName, THIS + value, key);
                        }
                        else {
                            delayCb.startIf(THIS + id);
                            delayCb.addAssignment(THIS + id, THIS + value, key);
                            delayCb.endBlock();
                        }
                        if (!this.delayAssignmentDic[value]) {
                            this.delayAssignmentDic[value] = [];
                        }
                        this.delayAssignmentDic[value].push(delayCb);
                        value = THIS + value;
                    }
                    cb.addAssignment(varName, value, key);
                }
            };
            /**
             * 初始化子项
             */
            p.initlizeChildNode = function (node, cb, varName) {
                var children = node.children;
                if (!children || children.length == 0)
                    return;
                var className = sys.exmlConfig.getClassNameById(node.localName, node.namespace);
                var directChild = [];
                var length = children.length;
                var propList = [];
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (child.nodeType != 1 || child.namespace == sys.NS_W) {
                        continue;
                    }
                    if (this.isInnerClass(child)) {
                        if (child.localName == "Skin") {
                            var innerClassName = this.parseInnerClass(child);
                            var type = sys.exmlConfig.getPropertyType(SKIN_NAME, className);
                            if (type) {
                                cb.addAssignment(varName, innerClassName, SKIN_NAME);
                            }
                            else {
                                lark.$error(2005, this.currentClassName, SKIN_NAME, getPropertyStr(child));
                            }
                        }
                        continue;
                    }
                    var prop = child.localName;
                    if (this.isProperty(child)) {
                        if (!this.isNormalKey(prop)) {
                            continue;
                        }
                        var type = sys.exmlConfig.getPropertyType(child.localName, className);
                        if (!type) {
                            if (DEBUG) {
                                lark.$error(2005, this.currentClassName, child.localName, getPropertyStr(child));
                            }
                            continue;
                        }
                        if (!child.children || child.children.length == 0) {
                            if (DEBUG) {
                                lark.$warn(2102, this.currentClassName, getPropertyStr(child));
                            }
                            continue;
                        }
                        if (DEBUG) {
                            var errorInfo = getPropertyStr(child);
                        }
                        this.addChildrenToProp(child.children, type, prop, cb, varName, errorInfo, propList, node);
                    }
                    else {
                        directChild.push(child);
                    }
                }
                if (directChild.length == 0)
                    return;
                var defaultProp = sys.exmlConfig.getDefaultPropById(node.localName, node.namespace);
                var defaultType = sys.exmlConfig.getPropertyType(defaultProp, className);
                if (DEBUG) {
                    var errorInfo = getPropertyStr(directChild[0]);
                }
                if (!defaultProp || !defaultType) {
                    if (DEBUG) {
                        lark.$error(2012, this.currentClassName, errorInfo);
                    }
                    return;
                }
                this.addChildrenToProp(directChild, defaultType, defaultProp, cb, varName, errorInfo, propList, node);
            };
            /**
             * 解析内部类节点，并返回类名。
             */
            p.parseInnerClass = function (node) {
                var parser = exmlParserPool.pop();
                if (!parser) {
                    parser = new EXMLParser();
                }
                var innerClassName = this.currentClass.className + "$" + node.localName + innerClassCount++;
                var innerClass = parser.parseClass(node, innerClassName);
                this.currentClass.addInnerClass(innerClass);
                exmlParserPool.push(parser);
                return innerClassName;
            };
            /**
             * 添加多个子节点到指定的属性
             */
            p.addChildrenToProp = function (children, type, prop, cb, varName, errorInfo, propList, node) {
                var childFunc = "";
                var childLength = children.length;
                if (childLength > 1) {
                    if (type != TYPE_ARRAY) {
                        if (DEBUG) {
                            lark.$error(2011, this.currentClassName, prop, errorInfo);
                        }
                        return;
                    }
                    var values = [];
                    for (var j = 0; j < childLength; j++) {
                        var item = children[j];
                        if (item.nodeType != 1) {
                            continue;
                        }
                        childFunc = this.createFuncForNode(item);
                        var childClassName = this.getClassNameOfNode(item);
                        if (!this.isStateNode(item))
                            values.push(childFunc);
                    }
                    childFunc = "[" + values.join(",") + "]";
                }
                else {
                    var firstChild = children[0];
                    if (type == TYPE_ARRAY) {
                        if (firstChild.localName == TYPE_ARRAY) {
                            values = [];
                            if (firstChild.children) {
                                var len = firstChild.children.length;
                                for (var k = 0; k < len; k++) {
                                    item = firstChild.children[k];
                                    if (item.nodeType != 1) {
                                        continue;
                                    }
                                    childFunc = this.createFuncForNode(item);
                                    childClassName = this.getClassNameOfNode(item);
                                    if (!this.isStateNode(item))
                                        values.push(childFunc);
                                }
                            }
                            childFunc = "[" + values.join(",") + "]";
                        }
                        else {
                            childFunc = this.createFuncForNode(firstChild);
                            var childClassName = this.getClassNameOfNode(firstChild);
                            if (!this.isStateNode(firstChild))
                                childFunc = "[" + childFunc + "]";
                            else
                                childFunc = "[]";
                        }
                    }
                    else if (firstChild.nodeType == 1) {
                        if (type == TYPE_CLASS) {
                            if (childLength > 1) {
                                if (DEBUG) {
                                    lark.$error(2011, this.currentClassName, prop, errorInfo);
                                }
                                return;
                            }
                            childFunc = this.parseInnerClass(children[0]);
                        }
                        else {
                            var targetClass = this.getClassNameOfNode(firstChild);
                            childFunc = this.createFuncForNode(firstChild);
                        }
                    }
                    else {
                        childFunc = this.formatValue(prop, firstChild.text, node);
                    }
                }
                if (childFunc != "") {
                    if (childFunc.indexOf("()") == -1)
                        prop = this.formatKey(prop, childFunc);
                    if (propList.indexOf(prop) == -1) {
                        propList.push(prop);
                    }
                    else if (DEBUG) {
                        lark.$warn(2103, this.currentClassName, prop, errorInfo);
                    }
                    cb.addAssignment(varName, childFunc, prop);
                }
            };
            /**
             * 指定节点是否是属性节点
             */
            p.isProperty = function (node) {
                if (node.hasOwnProperty("isProperty")) {
                    return node["isProperty"];
                }
                var result;
                var name = node.localName;
                if (!name || node.nodeType !== 1 || !node.parent || this.isBasicTypeData(name)) {
                    result = false;
                }
                else {
                    var parent = node.parent;
                    var index = name.indexOf(".");
                    if (index != -1) {
                        name = name.substr(0, index);
                    }
                    var className = sys.exmlConfig.getClassNameById(parent.localName, parent.namespace);
                    result = !!sys.exmlConfig.getPropertyType(name, className);
                }
                node["isProperty"] = result;
                return result;
            };
            /**
             * 是否是普通赋值的key
             */
            p.isNormalKey = function (key) {
                if (!key || key.indexOf(".") != -1 || wingKeys.indexOf(key) != -1)
                    return false;
                return true;
            };
            /**
             * 格式化key
             */
            p.formatKey = function (key, value) {
                if (value.indexOf("%") != -1) {
                    if (key == "height")
                        key = "percentHeight";
                    else if (key == "width")
                        key = "percentWidth";
                }
                return key;
            };
            /**
             * 格式化值
             */
            p.formatValue = function (key, value, node) {
                if (!value) {
                    value = "";
                }
                var stringValue = value; //除了字符串，其他类型都去除两端多余空格。
                value = value.trim();
                var className = this.getClassNameOfNode(node);
                var type = sys.exmlConfig.getPropertyType(key, className);
                if (DEBUG && !type) {
                    lark.$error(2005, this.currentClassName, key, toXMLString(node));
                }
                if (value.charAt(0) == "{" && value.charAt(value.length - 1) == "}") {
                    value = value.substr(1, value.length - 2).trim();
                    if (value.indexOf("this.") == 0) {
                        value = value.substring(5);
                    }
                    this.checkIdForState(node);
                    this.bindings.push(new sys.EXBinding(node.attributes["id"], key, value));
                    value = "";
                }
                else if (type == RECTANGLE) {
                    if (DEBUG) {
                        var rect = value.split(",");
                        if (rect.length != 4 || isNaN(parseInt(rect[0])) || isNaN(parseInt(rect[1])) || isNaN(parseInt(rect[2])) || isNaN(parseInt(rect[3]))) {
                            lark.$error(2016, this.currentClassName, toXMLString(node));
                        }
                    }
                    value = "new " + RECTANGLE + "(" + value + ")";
                }
                else {
                    var orgValue = value;
                    switch (type) {
                        case TYPE_CLASS:
                            break;
                        case "number":
                            if (value.indexOf("#") == 0)
                                value = "0x" + value.substring(1);
                            else if (value.indexOf("%") != -1)
                                value = (parseFloat(value.substr(0, value.length - 1))).toString();
                            break;
                        case "boolean":
                            value = (value == "false" || !value) ? "false" : "true";
                            break;
                        case "string":
                        case "any":
                            value = this.formatString(stringValue);
                            break;
                        default:
                            if (DEBUG) {
                                lark.$error(2008, this.currentClassName, "string", key + ":" + type, toXMLString(node));
                            }
                            break;
                    }
                }
                return value;
            };
            /**
             * 格式化字符串
             */
            p.formatString = function (value) {
                value = this.unescapeHTMLEntity(value);
                value = value.split("\n").join("\\n");
                value = value.split("\r").join("\\n");
                value = value.split("\"").join("\\\"");
                value = "\"" + value + "\"";
                return value;
            };
            /**
             /**
             * 转换HTML实体字符为普通字符
             */
            p.unescapeHTMLEntity = function (str) {
                if (!str)
                    return "";
                var length = htmlEntities.length;
                for (var i = 0; i < length; i++) {
                    var arr = htmlEntities[i];
                    var key = arr[0];
                    var value = arr[1];
                    str = str.split(value).join(key);
                }
                return str;
            };
            /**
             * 创建构造函数
             */
            p.createConstructFunc = function () {
                var cb = new sys.EXCodeBlock;
                cb.addEmptyLine();
                var varName = "this";
                this.addAttributesToCodeBlock(cb, varName, this.currentXML);
                if (this.declarations) {
                    var children = this.declarations.children;
                    if (children && children.length > 0) {
                        var length = children.length;
                        for (var i = 0; i < length; i++) {
                            var decl = children[i];
                            if (decl.nodeType != 1) {
                                continue;
                            }
                            var funcName = this.createFuncForNode(decl);
                            if (funcName) {
                                cb.addCodeLine(funcName + ";");
                            }
                        }
                    }
                }
                this.initlizeChildNode(this.currentXML, cb, varName);
                var id;
                var stateIds = this.stateIds;
                if (stateIds.length > 0) {
                    length = stateIds.length;
                    for (var i = 0; i < length; i++) {
                        id = stateIds[i];
                        cb.addCodeLine("this." + id + "_i();");
                    }
                    cb.addEmptyLine();
                }
                var skinParts = this.skinParts;
                var skinPartStr = "[]";
                length = skinParts.length;
                if (length > 0) {
                    for (i = 0; i < length; i++) {
                        skinParts[i] = "\"" + skinParts[i] + "\"";
                    }
                    skinPartStr = "[" + skinParts.join(",") + "]";
                }
                var skinPartFunc = new sys.EXFunction();
                skinPartFunc.name = "skinParts";
                skinPartFunc.isGet = true;
                var skinPartCB = new sys.EXCodeBlock();
                skinPartCB.addReturn(skinPartStr);
                skinPartFunc.codeBlock = skinPartCB;
                this.currentClass.addFunction(skinPartFunc);
                this.currentXML.attributes.id = "";
                //生成视图状态代码
                this.createStates(this.currentXML);
                var states;
                var node = this.currentXML;
                var nodeClassName = this.getClassNameOfNode(node);
                var attributes = node.attributes;
                var keys = Object.keys(attributes);
                var keysLength = keys.length;
                for (var m = 0; m < keysLength; m++) {
                    var itemName = keys[m];
                    var value = attributes[itemName];
                    var index = itemName.indexOf(".");
                    if (index != -1) {
                        var key = itemName.substring(0, index);
                        key = this.formatKey(key, value);
                        var itemValue = this.formatValue(key, value, node);
                        if (!itemValue) {
                            continue;
                        }
                        var stateName = itemName.substr(index + 1);
                        states = this.getStateByName(stateName, node);
                        var stateLength = states.length;
                        if (stateLength > 0) {
                            for (i = 0; i < stateLength; i++) {
                                var state = states[i];
                                state.addOverride(new sys.EXSetProperty("", key, itemValue));
                            }
                        }
                    }
                }
                //打印视图状态初始化代码
                var stateCode = this.stateCode;
                length = stateCode.length;
                if (length > 0) {
                    var indentStr = "	";
                    cb.addCodeLine("this.states = [");
                    var first = true;
                    for (i = 0; i < length; i++) {
                        state = stateCode[i];
                        if (first)
                            first = false;
                        else
                            cb.addCodeLine(indentStr + ",");
                        var codes = state.toCode().split("\n");
                        var codeIndex = 0;
                        while (codeIndex < codes.length) {
                            var code = codes[codeIndex];
                            if (code)
                                cb.addCodeLine(indentStr + code);
                            codeIndex++;
                        }
                    }
                    cb.addCodeLine("];");
                }
                //生成绑定代码
                var bindings = this.bindings;
                length = bindings.length;
                if (length > 0) {
                    cb.addEmptyLine();
                    for (i = 0; i < length; i++) {
                        var binding = bindings[i];
                        cb.addCodeLine(binding.toCode());
                    }
                }
                this.currentClass.constructCode = cb;
            };
            /**
             * 是否含有includeIn和excludeFrom属性
             */
            p.isStateNode = function (node) {
                var attributes = node.attributes;
                return attributes.hasOwnProperty("includeIn") || attributes.hasOwnProperty("excludeFrom");
            };
            /**
             * 获取视图状态名称列表
             */
            p.getStateNames = function () {
                var root = this.currentXML;
                var className = sys.exmlConfig.getClassNameById(root.localName, root.namespace);
                var type = sys.exmlConfig.getPropertyType("states", className);
                if (type != TYPE_STATE) {
                    return;
                }
                var statesValue = root.attributes["states"];
                if (statesValue) {
                    delete root.attributes["states"];
                }
                var stateNames = this.stateNames;
                var stateChildren;
                var children = root.children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var item = children[i];
                        if (item.nodeType == 1 && item.localName == "states") {
                            item.namespace = sys.NS_W;
                            stateChildren = item.children;
                            break;
                        }
                    }
                }
                if (!stateChildren && !statesValue) {
                    return;
                }
                if (DEBUG) {
                    if (stateChildren && stateChildren.length == 0) {
                        lark.$warn(2102, this.currentClassName, getPropertyStr(item));
                    }
                    if (stateChildren && statesValue) {
                        lark.$warn(2103, this.currentClassName, "states", getPropertyStr(item));
                    }
                }
                if (statesValue) {
                    var states = statesValue.split(",");
                    length = states.length;
                    for (var i = 0; i < length; i++) {
                        var stateName = states[i].trim();
                        if (!stateName) {
                            continue;
                        }
                        if (stateNames.indexOf(stateName) == -1) {
                            stateNames.push(stateName);
                        }
                        this.stateCode.push(new sys.EXState(stateName));
                    }
                    return;
                }
                length = stateChildren.length;
                for (i = 0; i < length; i++) {
                    var state = stateChildren[i];
                    if (state.nodeType != 1) {
                        continue;
                    }
                    var stateGroups = [];
                    var attributes = state.attributes;
                    if (attributes["stateGroups"]) {
                        var groups = attributes.stateGroups.split(",");
                        var len = groups.length;
                        for (var j = 0; j < len; j++) {
                            var group = groups[j].trim();
                            if (group) {
                                if (stateNames.indexOf(group) == -1) {
                                    stateNames.push(group);
                                }
                                stateGroups.push(group);
                            }
                        }
                    }
                    stateName = attributes.name;
                    if (stateNames.indexOf(stateName) == -1) {
                        stateNames.push(stateName);
                    }
                    this.stateCode.push(new sys.EXState(stateName, stateGroups));
                }
            };
            /**
             * 解析视图状态代码
             */
            p.createStates = function (parentNode) {
                var items = parentNode.children;
                if (!items) {
                    return;
                }
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    var node = items[i];
                    if (node.nodeType != 1 || this.isInnerClass(node)) {
                        continue;
                    }
                    this.createStates(node);
                    if (node.namespace == sys.NS_W || !node.localName) {
                        continue;
                    }
                    if (this.isProperty(node)) {
                        var prop = node.localName;
                        var index = prop.indexOf(".");
                        var children = node.children;
                        if (index == -1 || !children || children.length == 0) {
                            continue;
                        }
                        var stateName = prop.substring(index + 1);
                        prop = prop.substring(0, index);
                        var className = this.getClassNameOfNode(parentNode);
                        var type = sys.exmlConfig.getPropertyType(prop, className);
                        if (DEBUG) {
                            if (type == TYPE_ARRAY) {
                                lark.$error(2013, this.currentClassName, getPropertyStr(node));
                            }
                            if (children.length > 1) {
                                lark.$error(2011, this.currentClassName, prop, getPropertyStr(node));
                            }
                        }
                        var firstChild = children[0];
                        var value;
                        if (firstChild.nodeType == 1) {
                            this.createFuncForNode(firstChild);
                            this.checkIdForState(firstChild);
                            value = "this." + firstChild.attributes.id;
                        }
                        else {
                            value = this.formatValue(prop, firstChild.text, parentNode);
                        }
                        states = this.getStateByName(stateName, node);
                        var l = states.length;
                        if (l > 0) {
                            for (var j = 0; j < l; j++) {
                                state = states[j];
                                state.addOverride(new sys.EXSetProperty(parentNode.attributes.id, prop, value));
                            }
                        }
                    }
                    else if (this.containsState(node)) {
                        var attributes = node.attributes;
                        var id = attributes.id;
                        var nodeClassName = this.getClassNameOfNode(node);
                        this.checkIdForState(node);
                        var stateName;
                        var states;
                        var state;
                        if (this.isStateNode(node)) {
                            var propertyName = "";
                            var parent = node.parent;
                            if (parent.localName == TYPE_ARRAY)
                                parent = parent.parent;
                            if (parent && parent.parent) {
                                if (this.isProperty(parent))
                                    parent = parent.parent;
                            }
                            if (parent && parent != this.currentXML) {
                                propertyName = parent.attributes.id;
                                this.checkIdForState(parent);
                            }
                            var positionObj = this.findNearNodeId(node);
                            var stateNames = [];
                            if (attributes.includeIn) {
                                stateNames = attributes.includeIn.split(",");
                            }
                            else {
                                var excludeNames = attributes.excludeFrom.split(",");
                                var stateLength = excludeNames.length;
                                for (var j = 0; j < stateLength; j++) {
                                    var name = excludeNames[j];
                                    this.getStateByName(name, node); //检查exlcudeFrom是否含有未定义的视图状态名
                                }
                                stateLength = this.stateCode.length;
                                for (j = 0; j < stateLength; j++) {
                                    state = this.stateCode[j];
                                    if (excludeNames.indexOf(state.name) == -1) {
                                        stateNames.push(state.name);
                                    }
                                }
                            }
                            var len = stateNames.length;
                            for (var k = 0; k < len; k++) {
                                stateName = stateNames[k];
                                states = this.getStateByName(stateName, node);
                                if (states.length > 0) {
                                    var l = states.length;
                                    for (var j = 0; j < l; j++) {
                                        state = states[j];
                                        state.addOverride(new sys.EXAddItems(id, propertyName, positionObj.position, positionObj.relativeTo));
                                    }
                                }
                            }
                        }
                        var names = Object.keys(attributes);
                        var namesLength = names.length;
                        for (var m = 0; m < namesLength; m++) {
                            name = names[m];
                            var value = attributes[name];
                            var index = name.indexOf(".");
                            if (index != -1) {
                                var key = name.substring(0, index);
                                key = this.formatKey(key, value);
                                var value = this.formatValue(key, value, node);
                                if (!value) {
                                    continue;
                                }
                                stateName = name.substr(index + 1);
                                states = this.getStateByName(stateName, node);
                                var l = states.length;
                                if (l > 0) {
                                    for (var j = 0; j < l; j++) {
                                        state = states[j];
                                        state.addOverride(new sys.EXSetProperty(id, key, value));
                                    }
                                }
                            }
                        }
                    }
                }
            };
            /**
             * 检查指定的ID是否创建了类成员变量，若没创建则为其创建。
             */
            p.checkIdForState = function (node) {
                if (!node || this.currentClass.getVariableByName(node.attributes.id)) {
                    return;
                }
                this.createVarForNode(node);
                var id = node.attributes.id;
                var funcName = id + "_i";
                var func = this.currentClass.getFuncByName(funcName);
                if (!func)
                    return;
                var codeLine = "this." + id + " = t;";
                var cb = func.codeBlock;
                if (!cb)
                    return;
                if (!cb.containsCodeLine(codeLine)) {
                    cb.addCodeLineAt(codeLine, 1);
                }
            };
            /**
             * 通过视图状态名称获取对应的视图状态
             */
            p.getStateByName = function (name, node) {
                var states = [];
                var stateCode = this.stateCode;
                var length = stateCode.length;
                for (var i = 0; i < length; i++) {
                    var state = stateCode[i];
                    if (state.name == name) {
                        if (states.indexOf(state) == -1)
                            states.push(state);
                    }
                    else if (state.stateGroups.length > 0) {
                        var found = false;
                        var len = state.stateGroups.length;
                        for (var j = 0; j < len; j++) {
                            var g = state.stateGroups[j];
                            if (g == name) {
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            if (states.indexOf(state) == -1)
                                states.push(state);
                        }
                    }
                }
                if (DEBUG && states.length == 0) {
                    lark.$error(2006, this.currentClassName, name, toXMLString(node));
                }
                return states;
            };
            /**
             * 寻找节点的临近节点ID和位置
             */
            p.findNearNodeId = function (node) {
                var parentNode = node.parent;
                var targetId = "";
                var position;
                var index = -1;
                var preItem;
                var afterItem;
                var found = false;
                var children = parentNode.children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var item = children[i];
                    if (this.isProperty(item))
                        continue;
                    if (item == node) {
                        found = true;
                        index = i;
                    }
                    else {
                        if (found && !afterItem && !this.isStateNode(item)) {
                            afterItem = item;
                        }
                    }
                    if (!found && !this.isStateNode(item))
                        preItem = item;
                }
                if (index == 0) {
                    position = 0 /* FIRST */;
                    return { position: position, relativeTo: targetId };
                }
                if (index == length - 1) {
                    position = 1 /* LAST */;
                    return { position: position, relativeTo: targetId };
                }
                if (afterItem) {
                    position = 2 /* BEFORE */;
                    targetId = afterItem.attributes.id;
                    if (targetId) {
                        this.checkIdForState(afterItem);
                        return { position: position, relativeTo: targetId };
                    }
                }
                return { position: 1 /* LAST */, relativeTo: targetId };
            };
            /**
             * 获取节点的完整类名，包括模块名
             */
            p.getClassNameOfNode = function (node) {
                var className = sys.exmlConfig.getClassNameById(node.localName, node.namespace);
                if (DEBUG && !className) {
                    lark.$error(2003, this.currentClassName, toXMLString(node));
                }
                return className;
            };
            return EXMLParser;
        })();
        sys.EXMLParser = EXMLParser;
        if (DEBUG) {
            /**
             * 获取重复的ID名
             */
            function getRepeatedIds(xml) {
                var result = [];
                this.getIds(xml, result);
                this.repeatedIdMap = {};
                return result;
            }
            function getIds(xml, result) {
                if (xml.namespace != sys.NS_W && xml["$id"]) {
                    var id = xml.$id;
                    if (this.repeatedIdMap[id]) {
                        result.push(toXMLString(xml));
                    }
                    else {
                        this.repeatedIdMap[id] = true;
                    }
                }
                var children = xml.children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var node = children[i];
                        getIds(node, result);
                    }
                }
            }
            function toXMLString(node) {
                if (!node) {
                    return "";
                }
                var str = "  at <" + node.name;
                var attributes = node.attributes;
                var keys = Object.keys(attributes);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    var value = attributes[key];
                    if (key == "id" && value.substring(0, 2) == "__") {
                        continue;
                    }
                    str += " " + key + "=\"" + value + "\"";
                }
                if (node.children.length == 0) {
                    str += "/>";
                }
                else {
                    str += ">";
                }
                return str;
            }
            /**
             * 清理声明节点里的状态标志
             */
            function checkDeclarations(declarations, list) {
                if (!declarations) {
                    return;
                }
                var children = declarations.children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var node = children[i];
                        if (node.nodeType != 1) {
                            continue;
                        }
                        if (node.attributes.includeIn) {
                            list.push(toXMLString(node));
                        }
                        if (node.attributes.excludeFrom) {
                            list.push(toXMLString(node));
                        }
                        checkDeclarations(node, list);
                    }
                }
            }
            function getPropertyStr(child) {
                var parentStr = toXMLString(child.parent);
                var childStr = toXMLString(child).substring(5);
                return parentStr + "\n      \t" + childStr;
            }
        }
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 集合类型数据改变事件
     */
    var CollectionEvent = (function (_super) {
        __extends(CollectionEvent, _super);
        /**
         * 创建一个 CollectionEvent 实例
         */
        function CollectionEvent(type, bubbles, cancelable, kind, location, oldLocation, items, oldItems) {
            _super.call(this, type, bubbles, cancelable);
            this.$setTo(kind, location, oldLocation, items, oldItems);
        }
        var d = __define,c=CollectionEvent;p=c.prototype;
        p.$setTo = function (kind, location, oldLocation, items, oldItems) {
            this.kind = kind;
            this.location = +location | 0;
            this.oldLocation = +oldLocation | 0;
            this.items = items || [];
            this.oldItems = oldItems || [];
        };
        p.clean = function () {
            _super.prototype.clean.call(this);
            this.items = this.oldItems = null;
        };
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        CollectionEvent.emitCollectionEvent = function (target, eventType, kind, location, oldLocation, items, oldItems) {
            if (!target.hasListener(eventType)) {
                return true;
            }
            var event = lark.Event.create(CollectionEvent, eventType);
            event.$setTo(kind, location, oldLocation, items, oldItems);
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * 集合类数据发生改变
         */
        CollectionEvent.COLLECTION_CHANGE = "collectionChange";
        return CollectionEvent;
    })(lark.Event);
    swan.CollectionEvent = CollectionEvent;
    lark.registerClass(CollectionEvent, 1015 /* CollectionEvent */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        /**
         * 失效验证管理器
         */
        var Validator = (function (_super) {
            __extends(Validator, _super);
            /**
             * 创建一个Validator对象
             */
            function Validator() {
                _super.call(this);
                this.targetLevel = Number.POSITIVE_INFINITY;
                this.invalidatePropertiesFlag = false;
                this.invalidateClientPropertiesFlag = false;
                this.invalidatePropertiesQueue = new DepthQueue();
                this.invalidateSizeFlag = false;
                this.invalidateClientSizeFlag = false;
                this.invalidateSizeQueue = new DepthQueue();
                this.invalidateDisplayListFlag = false;
                this.invalidateDisplayListQueue = new DepthQueue();
                this.eventDisplay = new lark.Bitmap();
                /**
                 * 是否已经添加了事件监听
                 */
                this.listenersAttached = false;
            }
            var d = __define,c=Validator;p=c.prototype;
            /**
             * 标记组件属性失效
             */
            p.invalidateProperties = function (client) {
                if (!this.invalidatePropertiesFlag) {
                    this.invalidatePropertiesFlag = true;
                    if (!this.listenersAttached)
                        this.attachListeners();
                }
                if (this.targetLevel <= client.$nestLevel)
                    this.invalidateClientPropertiesFlag = true;
                this.invalidatePropertiesQueue.insert(client);
            };
            /**
             * 验证失效的属性
             */
            p.validateProperties = function () {
                var queue = this.invalidatePropertiesQueue;
                var client = queue.shift();
                while (client) {
                    if (client.$stage) {
                        client.validateProperties();
                    }
                    client = queue.shift();
                }
                if (queue.isEmpty())
                    this.invalidatePropertiesFlag = false;
            };
            /**
             * 标记需要重新测量尺寸
             */
            p.invalidateSize = function (client) {
                if (!this.invalidateSizeFlag) {
                    this.invalidateSizeFlag = true;
                    if (!this.listenersAttached)
                        this.attachListeners();
                }
                if (this.targetLevel <= client.$nestLevel)
                    this.invalidateClientSizeFlag = true;
                this.invalidateSizeQueue.insert(client);
            };
            /**
             * 测量尺寸
             */
            p.validateSize = function () {
                var queue = this.invalidateSizeQueue;
                var client = queue.pop();
                while (client) {
                    if (client.$stage) {
                        client.validateSize();
                    }
                    client = queue.pop();
                }
                if (queue.isEmpty())
                    this.invalidateSizeFlag = false;
            };
            /**
             * 标记需要重新布局
             */
            p.invalidateDisplayList = function (client) {
                if (!this.invalidateDisplayListFlag) {
                    this.invalidateDisplayListFlag = true;
                    if (!this.listenersAttached)
                        this.attachListeners();
                }
                this.invalidateDisplayListQueue.insert(client);
            };
            /**
             * 重新布局
             */
            p.validateDisplayList = function () {
                var queue = this.invalidateDisplayListQueue;
                var client = queue.shift();
                while (client) {
                    if (client.$stage) {
                        client.validateDisplayList();
                    }
                    client = queue.shift();
                }
                if (queue.isEmpty())
                    this.invalidateDisplayListFlag = false;
            };
            /**
             * 添加事件监听
             */
            p.attachListeners = function () {
                this.eventDisplay.on(lark.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
                this.eventDisplay.on(lark.Event.RENDER, this.doPhasedInstantiationCallBack, this);
                lark.sys.$invalidateRenderFlag = true;
                this.listenersAttached = true;
            };
            /**
             * 执行属性应用
             */
            p.doPhasedInstantiationCallBack = function (event) {
                this.eventDisplay.removeListener(lark.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
                this.eventDisplay.removeListener(lark.Event.RENDER, this.doPhasedInstantiationCallBack, this);
                this.doPhasedInstantiation();
            };
            p.doPhasedInstantiation = function () {
                if (this.invalidatePropertiesFlag) {
                    this.validateProperties();
                }
                if (this.invalidateSizeFlag) {
                    this.validateSize();
                }
                if (this.invalidateDisplayListFlag) {
                    this.validateDisplayList();
                }
                if (this.invalidatePropertiesFlag || this.invalidateSizeFlag || this.invalidateDisplayListFlag) {
                    this.attachListeners();
                }
                else {
                    this.listenersAttached = false;
                }
            };
            /**
             * 使大于等于指定组件层级的元素立即应用属性
             * @param target 要立即应用属性的组件
             */
            p.validateClient = function (target) {
                var obj;
                var done = false;
                var oldTargetLevel = this.targetLevel;
                if (this.targetLevel === Number.POSITIVE_INFINITY)
                    this.targetLevel = target.$nestLevel;
                var propertiesQueue = this.invalidatePropertiesQueue;
                var sizeQueue = this.invalidateSizeQueue;
                var displayListQueue = this.invalidateDisplayListQueue;
                while (!done) {
                    done = true;
                    obj = propertiesQueue.removeSmallestChild(target);
                    while (obj) {
                        if (obj.$stage) {
                            obj.validateProperties();
                        }
                        obj = propertiesQueue.removeSmallestChild(target);
                    }
                    if (propertiesQueue.isEmpty()) {
                        this.invalidatePropertiesFlag = false;
                    }
                    this.invalidateClientPropertiesFlag = false;
                    obj = sizeQueue.removeLargestChild(target);
                    while (obj) {
                        if (obj.$stage) {
                            obj.validateSize();
                        }
                        if (this.invalidateClientPropertiesFlag) {
                            obj = (propertiesQueue.removeSmallestChild(target));
                            if (obj) {
                                propertiesQueue.insert(obj);
                                done = false;
                                break;
                            }
                        }
                        obj = sizeQueue.removeLargestChild(target);
                    }
                    if (sizeQueue.isEmpty()) {
                        this.invalidateSizeFlag = false;
                    }
                    this.invalidateClientPropertiesFlag = false;
                    this.invalidateClientSizeFlag = false;
                    obj = displayListQueue.removeSmallestChild(target);
                    while (obj) {
                        if (obj.$stage) {
                            obj.validateDisplayList();
                        }
                        if (this.invalidateClientPropertiesFlag) {
                            obj = propertiesQueue.removeSmallestChild(target);
                            if (obj) {
                                propertiesQueue.insert(obj);
                                done = false;
                                break;
                            }
                        }
                        if (this.invalidateClientSizeFlag) {
                            obj = sizeQueue.removeLargestChild(target);
                            if (obj) {
                                sizeQueue.insert(obj);
                                done = false;
                                break;
                            }
                        }
                        obj = displayListQueue.removeSmallestChild(target);
                    }
                    if (displayListQueue.isEmpty()) {
                        this.invalidateDisplayListFlag = false;
                    }
                }
                if (oldTargetLevel === Number.POSITIVE_INFINITY) {
                    this.targetLevel = Number.POSITIVE_INFINITY;
                }
            };
            return Validator;
        })(lark.EventEmitter);
        sys.Validator = Validator;
        /**
         * 显示列表嵌套深度排序队列
         */
        var DepthQueue = (function () {
            function DepthQueue() {
                /**
                 * 深度队列
                 */
                this.depthBins = {};
                /**
                 * 最小深度
                 */
                this.minDepth = 0;
                /**
                 * 最大深度
                 */
                this.maxDepth = -1;
            }
            var d = __define,c=DepthQueue;p=c.prototype;
            /**
             * 插入一个元素
             */
            p.insert = function (client) {
                var depth = client.$nestLevel;
                if (this.maxDepth < this.minDepth) {
                    this.minDepth = this.maxDepth = depth;
                }
                else {
                    if (depth < this.minDepth)
                        this.minDepth = depth;
                    if (depth > this.maxDepth)
                        this.maxDepth = depth;
                }
                var bin = this.depthBins[depth];
                if (!bin) {
                    bin = this.depthBins[depth] = new DepthBin();
                }
                bin.insert(client);
            };
            /**
             * 从队列尾弹出深度最大的一个对象
             */
            p.pop = function () {
                var client;
                var minDepth = this.minDepth;
                if (minDepth <= this.maxDepth) {
                    var bin = this.depthBins[this.maxDepth];
                    while (!bin || bin.length === 0) {
                        this.maxDepth--;
                        if (this.maxDepth < minDepth)
                            return null;
                        bin = this.depthBins[this.maxDepth];
                    }
                    client = bin.shift();
                    while (!bin || bin.length == 0) {
                        this.maxDepth--;
                        if (this.maxDepth < minDepth)
                            break;
                        bin = this.depthBins[this.maxDepth];
                    }
                }
                return client;
            };
            /**
             * 从队列首弹出深度最小的一个对象
             */
            p.shift = function () {
                var client;
                var maxDepth = this.maxDepth;
                if (this.minDepth <= maxDepth) {
                    var bin = this.depthBins[this.minDepth];
                    while (!bin || bin.length === 0) {
                        this.minDepth++;
                        if (this.minDepth > maxDepth)
                            return null;
                        bin = this.depthBins[this.minDepth];
                    }
                    client = bin.shift();
                    while (!bin || bin.length == 0) {
                        this.minDepth++;
                        if (this.minDepth > maxDepth)
                            break;
                        bin = this.depthBins[this.minDepth];
                    }
                }
                return client;
            };
            /**
             * 移除大于等于指定组件层级的元素中最大的元素
             */
            p.removeLargestChild = function (client) {
                var hashCode = client.$hashCode;
                var nestLevel = client.$nestLevel;
                var max = this.maxDepth;
                var min = nestLevel;
                while (min <= max) {
                    var bin = this.depthBins[max];
                    if (bin && bin.length > 0) {
                        if (max === nestLevel) {
                            if (bin.map[hashCode]) {
                                bin.remove(client);
                                return client;
                            }
                        }
                        else if (lark.is(client, 4 /* DisplayObjectContainer */)) {
                            var items = bin.items;
                            var length = bin.length;
                            for (var i = 0; i < length; i++) {
                                var value = items[i];
                                if (client.contains(value)) {
                                    bin.remove(value);
                                    return value;
                                }
                            }
                        }
                        else {
                            break;
                        }
                        max--;
                    }
                    else {
                        if (max == this.maxDepth) {
                            this.maxDepth--;
                        }
                        max--;
                        if (max < min)
                            break;
                    }
                }
                return null;
            };
            /**
             * 移除大于等于指定组件层级的元素中最小的元素
             */
            p.removeSmallestChild = function (client) {
                var nestLevel = client.$nestLevel;
                var min = nestLevel;
                var max = this.maxDepth;
                var hashCode = client.$hashCode;
                while (min <= max) {
                    var bin = this.depthBins[min];
                    if (bin && bin.length > 0) {
                        if (min === nestLevel) {
                            if (bin.map[hashCode]) {
                                bin.remove(client);
                                return client;
                            }
                        }
                        else if (lark.is(client, 4 /* DisplayObjectContainer */)) {
                            var items = bin.items;
                            var length = bin.length;
                            for (var i = 0; i < length; i++) {
                                var value = items[i];
                                if (client.contains(value)) {
                                    bin.remove(value);
                                    return value;
                                }
                            }
                        }
                        else {
                            break;
                        }
                        min++;
                    }
                    else {
                        if (min == this.minDepth)
                            this.minDepth++;
                        min++;
                        if (min > max)
                            break;
                    }
                }
                return null;
            };
            /**
             * 队列是否为空
             */
            p.isEmpty = function () {
                return this.minDepth > this.maxDepth;
            };
            return DepthQueue;
        })();
        /**
         * 列表项
         */
        var DepthBin = (function () {
            function DepthBin() {
                this.map = {};
                this.items = [];
                this.length = 0;
            }
            var d = __define,c=DepthBin;p=c.prototype;
            p.insert = function (client) {
                var hashCode = client.$hashCode;
                if (this.map[hashCode]) {
                    return;
                }
                this.map[hashCode] = true;
                this.length++;
                this.items.push(client);
            };
            p.shift = function () {
                var client = this.items.shift();
                if (client) {
                    this.map[client.$hashCode] = false;
                    this.length--;
                }
                return client;
            };
            p.remove = function (client) {
                var index = this.items.indexOf(client);
                if (index >= 0) {
                    this.items.splice(index, 1);
                    this.map[client.$hashCode] = false;
                    this.length--;
                }
            };
            return DepthBin;
        })();
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var groupCount = 0;
    /**
     * 显示列表深度排序
     */
    function breadthOrderCompare(a, b) {
        var aParent = a.parent;
        var bParent = b.parent;
        if (!aParent || !bParent)
            return 0;
        var aNestLevel = a.$nestLevel;
        var bNestLevel = b.$nestLevel;
        var aIndex = 0;
        var bIndex = 0;
        if (aParent == bParent) {
            aIndex = aParent.getChildIndex(a);
            bIndex = bParent.getChildIndex(b);
        }
        if (aNestLevel > bNestLevel || aIndex > bIndex)
            return 1;
        if (aNestLevel < bNestLevel || bIndex > aIndex)
            return -1;
        if (a == b)
            return 0;
        return breadthOrderCompare(aParent, bParent);
    }
    /**
     * RadioButtonGroup 组件定义一组 RadioButton 组件，这些组件相互排斥；因此，用户每次只能选择一个 RadioButton 组件
     */
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        /**
         * 创建一个RadioButtonGroup实例
         */
        function RadioButtonGroup() {
            _super.call(this);
            /**
             * 组名
             */
            this.$name = null;
            /**
             * 单选按钮列表
             */
            this.radioButtons = [];
            this.$enabled = true;
            this._selectedValue = null;
            this._selection = null;
            this.$name = "_radioButtonGroup" + groupCount++;
        }
        var d = __define,c=RadioButtonGroup;p=c.prototype;
        /**
         * 获取指定索引的单选按钮
         * @param index 单选按钮的索引
         */
        p.getRadioButtonAt = function (index) {
            return this.radioButtons[index];
        };
        d(p, "enabled",
            /**
             * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮。
             */
            function () {
                return this.$enabled;
            },
            function (value) {
                value = !!value;
                if (this.$enabled === value)
                    return;
                this.$enabled = value;
                var buttons = this.radioButtons;
                var length = buttons.length;
                for (var i = 0; i < length; i++)
                    buttons[i].invalidateState();
            }
        );
        d(p, "numRadioButtons",
            /**
             * 组内单选按钮数量
             */
            function () {
                return this.radioButtons.length;
            },undefined
        );
        d(p, "selectedValue",
            /**
             * 当前被选中的单选按钮的value属性值。注意，此属性仅当目标RadioButton在显示列表时有效。
             */
            function () {
                if (this.selection) {
                    return this.selection.value != null ? this.selection.value : this.selection.label;
                }
                return null;
            },
            function (value) {
                this._selectedValue = value;
                if (value == null) {
                    this.$setSelection(null, false);
                    return;
                }
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    var radioButton = this.radioButtons[i];
                    if (radioButton.value == value || radioButton.label == value) {
                        this.changeSelection(i, false);
                        this._selectedValue = null;
                        swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
                        break;
                    }
                }
            }
        );
        d(p, "selection",
            /**
             * 当前被选中的单选按钮引用,注意，此属性仅当目标RadioButton在显示列表时有效。
             */
            function () {
                return this._selection;
            },
            function (value) {
                if (this._selection == value)
                    return;
                this.$setSelection(value, false);
            }
        );
        /**
         * 添加单选按钮到组内
         */
        p.$addInstance = function (instance) {
            instance.on(lark.Event.REMOVED, this.removedHandler, this);
            var buttons = this.radioButtons;
            buttons.push(instance);
            buttons.sort(breadthOrderCompare);
            var length = buttons.length;
            for (var i = 0; i < length; i++) {
                buttons[i].$indexNumber = i;
            }
            if (this._selectedValue)
                this.selectedValue = this._selectedValue;
            if (instance.selected == true)
                this.selection = instance;
            instance.$radioButtonGroup = this;
            instance.invalidateState();
        };
        /**
         * 从组里移除单选按钮
         */
        p.$removeInstance = function (instance, addListener) {
            if (instance) {
                var foundInstance = false;
                var buttons = this.radioButtons;
                var length = buttons.length;
                for (var i = 0; i < length; i++) {
                    var rb = buttons[i];
                    if (foundInstance) {
                        rb.$indexNumber = rb.$indexNumber - 1;
                    }
                    else if (rb == instance) {
                        if (addListener)
                            instance.on(lark.Event.ADDED, this.addedHandler, this);
                        if (instance == this._selection)
                            this._selection = null;
                        instance.$radioButtonGroup = null;
                        instance.invalidateState();
                        this.radioButtons.splice(i, 1);
                        foundInstance = true;
                        i--;
                    }
                }
            }
        };
        /**
         * 设置选中的单选按钮
         */
        p.$setSelection = function (value, fireChange) {
            if (this._selection == value)
                return;
            if (!value) {
                if (this._selection) {
                    this._selection.selected = false;
                    this._selection = null;
                    if (fireChange)
                        this.emitWith(lark.Event.CHANGE);
                }
            }
            else {
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    if (value == this.getRadioButtonAt(i)) {
                        this.changeSelection(i, fireChange);
                        break;
                    }
                }
            }
            swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
        };
        /**
         * 改变选中项
         */
        p.changeSelection = function (index, fireChange) {
            var rb = this.getRadioButtonAt(index);
            if (rb && rb != this._selection) {
                if (this._selection)
                    this._selection.selected = false;
                this._selection = rb;
                this._selection.selected = true;
                if (fireChange)
                    this.emitWith(lark.Event.CHANGE);
            }
        };
        /**
         * 单选按钮添加到显示列表
         */
        p.addedHandler = function (event) {
            var rb = event.target;
            if (rb) {
                rb.removeListener(lark.Event.ADDED, this.addedHandler, this);
                this.$addInstance(rb);
            }
        };
        /**
         * 单选按钮从显示列表移除
         */
        p.removedHandler = function (event) {
            var rb = event.target;
            if (rb) {
                rb.removeListener(lark.Event.REMOVED, this.removedHandler, this);
                this.$removeInstance(rb, true);
            }
        };
        return RadioButtonGroup;
    })(lark.EventEmitter);
    swan.RadioButtonGroup = RadioButtonGroup;
    swan.registerBindable(RadioButtonGroup.prototype, "selectedValue");
    lark.registerClass(RadioButtonGroup, 1030 /* RadioButtonGroup */);
    if (DEBUG) {
        lark.$markReadOnly(RadioButtonGroup.prototype, "numRadioButtons");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * State 类定义视图状态，即组件的特定视图。
     */
    var State = (function (_super) {
        __extends(State, _super);
        /**
         * 创建一个State实例
         */
        function State(name, overrides) {
            _super.call(this);
            this.name = name;
            this.overrides = overrides;
        }
        var d = __define,c=State;p=c.prototype;
        /**
         * 初始化视图状态
         */
        p.initialize = function (host, stage) {
            var overrides = this.overrides;
            var length = overrides.length;
            for (var i = 0; i < length; i++) {
                var addItems = overrides[i];
                if (lark.is(addItems, 1033 /* AddItems */)) {
                    var target = host[addItems.target];
                    if (lark.is(target, 1011 /* Image */) && !target.$parent) {
                        stage.addChild(target);
                        stage.removeChild(target);
                    }
                }
            }
        };
        return State;
    })(lark.LarkObject);
    swan.State = State;
    lark.registerClass(State, 1031 /* State */);
})(swan || (swan = {}));
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        var StateClient = (function () {
            function StateClient() {
            }
            var d = __define,c=StateClient;p=c.prototype;
            d(p, "states",
                /**
                 * 为此组件定义的视图状态。
                 */
                function () {
                    return this.$stateValues.states;
                },
                function (value) {
                    if (!value)
                        value = [];
                    var values = this.$stateValues;
                    values.states = value;
                    var statesMap = {};
                    var length = value.length;
                    for (var i = 0; i < length; i++) {
                        var state = value[i];
                        statesMap[state.name] = state;
                    }
                    values.statesMap = statesMap;
                    if (values.parent) {
                        this.commitCurrentState();
                    }
                }
            );
            d(p, "currentState",
                /**
                 * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
                 */
                function () {
                    return this.$stateValues.currentState;
                },
                function (value) {
                    var values = this.$stateValues;
                    values.explicitState = value;
                    values.currentState = value;
                    this.commitCurrentState();
                }
            );
            /**
             * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
             */
            p.commitCurrentState = function () {
                var values = this.$stateValues;
                if (!values.parent) {
                    return;
                }
                var destination = values.statesMap[values.currentState];
                if (!destination) {
                    if (values.states.length > 0) {
                        values.currentState = values.states[0].name;
                    }
                    else {
                        return;
                    }
                }
                if (values.oldState == values.currentState) {
                    return;
                }
                var parent = values.parent;
                var state = values.statesMap[values.oldState];
                if (state) {
                    var overrides = state.overrides;
                    var length = overrides.length;
                    for (var i = 0; i < length; i++) {
                        overrides[i].remove(this, parent);
                    }
                }
                values.oldState = values.currentState;
                state = values.statesMap[values.currentState];
                if (state) {
                    overrides = state.overrides;
                    length = overrides.length;
                    for (i = 0; i < length; i++) {
                        overrides[i].apply(this, parent);
                    }
                }
            };
            /**
             * 返回是否含有指定名称的视图状态
             * @param stateName 要检查的视图状态名称
             */
            p.hasState = function (stateName) {
                return !!this.$stateValues.statesMap[stateName];
            };
            /**
             * 初始化所有视图状态
             */
            p.initializeStates = function (stage) {
                this.$stateValues.intialized = true;
                var states = this.states;
                var length = states.length;
                for (var i = 0; i < length; i++) {
                    states[i].initialize(this, stage);
                }
            };
            return StateClient;
        })();
        sys.StateClient = StateClient;
        var StateValues = (function () {
            function StateValues() {
                this.intialized = false;
                this.statesMap = {};
                this.states = [];
                this.oldState = null;
                this.explicitState = null;
                this.currentState = null;
                this.parent = null;
                this.stateIsDirty = false;
            }
            var d = __define,c=StateValues;p=c.prototype;
            return StateValues;
        })();
        sys.StateValues = StateValues;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 视图添加状态显示元素操作
     */
    var AddItems = (function () {
        /**
         * 创建一个AddItems实例
         */
        function AddItems(target, propertyName, position, relativeTo) {
            this.target = target;
            this.propertyName = propertyName;
            this.position = position;
            this.relativeTo = relativeTo;
        }
        var d = __define,c=AddItems;p=c.prototype;
        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        p.apply = function (host, parent) {
            var index;
            var relative = host[this.relativeTo];
            var target = host[this.target];
            var container = this.propertyName ? host[this.propertyName] : parent;
            if (!target || !container)
                return;
            switch (this.position) {
                case 0 /* FIRST */:
                    index = 0;
                    break;
                case 1 /* LAST */:
                    index = -1;
                    break;
                case 2 /* BEFORE */:
                    index = container.getChildIndex(relative);
                    break;
                case 3 /* AFTER */:
                    index = container.getChildIndex(relative) + 1;
                    break;
            }
            if (index == -1)
                index = container.numChildren;
            container.addChildAt(target, index);
        };
        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        p.remove = function (host, parent) {
            var container = this.propertyName ? host[this.propertyName] : parent;
            var target = host[this.target];
            if (!target || !container)
                return;
            if (target.$parent === container) {
                container.removeChild(target);
            }
        };
        return AddItems;
    })();
    swan.AddItems = AddItems;
    lark.registerClass(AddItems, 1033 /* AddItems */, [1032 /* IOverride */]);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 容器布局基类。若要创建使用 Group 容器的自定义布局，必须扩展 LayoutBase 或其子类之一。
     * 子类必须实现 updateDisplayList() 方法（定位 target Group 的子项并调整这些子项的大小）和 measure() 方法（计算 target 的默认大小）。
     */
    var LayoutBase = (function (_super) {
        __extends(LayoutBase, _super);
        function LayoutBase() {
            _super.call(this);
            this.$target = null;
            this.$useVirtualLayout = false;
            this.$typicalWidth = 71;
            this.$typicalHeight = 22;
        }
        var d = __define,c=LayoutBase;p=c.prototype;
        d(p, "target",
            /**
             * 目标容器
             */
            function () {
                return this.$target;
            },
            function (value) {
                if (this.$target === value)
                    return;
                this.$target = value;
                this.clearVirtualLayoutCache();
            }
        );
        d(p, "useVirtualLayout",
            /**
             * 若要配置容器使用虚拟布局，请为与容器关联的布局的 useVirtualLayout 属性设置为 true。
             * 只有布局设置为 VerticalLayout、HorizontalLayout
             * 或 TileLayout 的 DataGroup 或 SkinnableDataContainer
             * 才支持虚拟布局。不支持虚拟化的布局子类必须禁止更改此属性。
             */
            function () {
                return this.$useVirtualLayout;
            },
            function (value) {
                value = !!value;
                if (this.$useVirtualLayout == value)
                    return;
                this.$useVirtualLayout = value;
                this.emitWith("useVirtualLayoutChanged");
                if (this.$useVirtualLayout && !value)
                    this.clearVirtualLayoutCache();
                if (this.target)
                    this.target.invalidateDisplayList();
            }
        );
        p.setTypicalSize = function (width, height) {
            width = +width || 71;
            height = +height || 22;
            if (width !== this.$typicalWidth || height !== this.$typicalHeight) {
                this.$typicalWidth = width;
                this.$typicalHeight = height;
                if (this.$target) {
                    this.$target.invalidateSize();
                }
            }
        };
        /**
         * 滚动条位置改变
         */
        p.scrollPositionChanged = function () {
        };
        /**
         * 清理虚拟布局缓存的数据
         */
        p.clearVirtualLayoutCache = function () {
        };
        /**
         * 在已添加布局元素之后且在验证目标的大小和显示列表之前，由目标调用。
         * 按元素状态缓存的布局（比如虚拟布局）可以覆盖此方法以更新其缓存。
         * @param index 发生改变的子项索引
         */
        p.elementAdded = function (index) {
        };
        /**
         * 必须在已删除布局元素之后且在验证目标的大小和显示列表之前，由目标调用此方法。
         * 按元素状态缓存的布局（比如虚拟布局）可以覆盖此方法以更新其缓存。
         * @param index 发生改变的子项索引
         */
        p.elementRemoved = function (index) {
        };
        /**
         * 获取在视图中的索引列表
         */
        p.getElementIndicesInView = function () {
            return null;
        };
        /**
         * 测量组件尺寸大小
         */
        p.measure = function () {
        };
        /**
         * 更新显示列表
         */
        p.updateDisplayList = function (width, height) {
        };
        return LayoutBase;
    })(lark.EventEmitter);
    swan.LayoutBase = LayoutBase;
    lark.registerClass(LayoutBase, 1019 /* LayoutBase */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @private
     */
    var bindables = "__bindables__";
    /**
     * @private
     */
    var bindableCount = 0;
    /**
     * @private
     *
     * @param host
     * @param property
     * @returns
     */
    function getPropertyDescriptor(host, property) {
        var data = Object.getOwnPropertyDescriptor(host, property);
        if (data) {
            return data;
        }
        var prototype = Object.getPrototypeOf(host);
        if (prototype) {
            return getPropertyDescriptor(prototype, property);
        }
        return null;
    }
    /**
     * @language en_US
     * The Watcher class defines utility method that you can use with bindable properties.
     * These methods let you define an event handler that is executed whenever a bindable property is updated.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Watcher 类能够监视可绑定属性的改变，您可以定义一个事件处理函数作为 Watcher 的回调方法，在每次可绑定属性的值改变时都执行此函数。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var Watcher = (function () {
        /**
         * @language en_US
         * Constructor.
         * Not for public use. This method is called only from the <code>watch()</code> method.
         * See the <code>watch()</code> method for parameter usage.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数，非公开。只能从 watch() 方法中调用此方法。有关参数用法，请参阅 watch() 方法。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        function Watcher(property, handler, thisObject, next) {
            /**
             * @private
             */
            this.isExecuting = false;
            this.property = property;
            this.handler = handler;
            this.next = next;
            this.thisObject = thisObject;
        }
        var d = __define,c=Watcher;p=c.prototype;
        /**
         * @language en_US
         * Creates and starts a Watcher instance.
         * The Watcher can only watch the property of a Object which host is instance of IEventEmitter.
         * @param host The object that hosts the property or property chain to be watched.
         * You can use the use the <code>reset()</code> method to change the value of the <code>host</code> argument
         * after creating the Watcher instance.
         * The <code>host</code> maintains a list of <code>handlers</code> to invoke when <code>prop</code> changes.
         * @param chain A value specifying the property or chain to be watched.
         * For example, to watch the property <code>host.a.b.c</code>,
         * call the method as: <code>watch(host, ["a","b","c"], ...)</code>.
         * @param handler  An event handler function called when the value of the watched property
         * (or any property in a watched chain) is modified.
         * @param thisObject <code>this</code> object of which binding with handler
         * @returns he ChangeWatcher instance, if at least one property name has been specified to
         * the <code>chain</code> argument; null otherwise.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建并启动 Watcher 实例。注意：Watcher 只能监视 host 为 IEventEmitter 对象的属性改变。若属性链中某个属性所对应的实例不是 IEventEmitter，
         * 则属性链中在它之后的属性改变将无法检测到。
         * @param host 用于承载要监视的属性或属性链的对象。
         * 创建Watcher实例后，您可以利用<code>reset()</code>方法更改<code>host</code>参数的值。
         * 当<code>prop</code>改变的时候，会使得host对应的一系列<code>handlers</code>被触发。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 host.a.b.c，需按以下形式调用此方法：watch¬(host, ["a","b","c"], ...)。
         * @param handler 在监视的目标属性链中任何属性的值发生改变时调用的事件处理函数。
         * @param thisObject handler 方法绑定的this对象
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Watcher.watch = function (host, chain, handler, thisObject) {
            if (DEBUG) {
                if (!chain) {
                    lark.$error(1003, "chain");
                }
            }
            if (chain.length > 0) {
                var property = chain.shift();
                var next = Watcher.watch(null, chain, handler, thisObject);
                var watcher = new Watcher(property, handler, thisObject, next);
                watcher.reset(host);
                return watcher;
            }
            else {
                return null;
            }
        };
        /**
         * @private
         * 检查属性是否可以绑定。若还未绑定，尝试添加绑定事件。若是只读或只写属性，返回false。
         */
        Watcher.checkBindable = function (host, property) {
            var list = host[bindables];
            if (list && list.indexOf(property) != -1) {
                return true;
            }
            var data = getPropertyDescriptor(host, property);
            if (data && data.set && data.get) {
                var orgSet = data.set;
                data.set = function (value) {
                    if (this[property] != value) {
                        orgSet.call(this, value);
                        swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, property);
                    }
                };
            }
            else if (!data || (!data.get && !data.set)) {
                bindableCount++;
                var newProp = "_" + bindableCount + property;
                host[newProp] = data ? data.value : null;
                data = { enumerable: true, configurable: true };
                data.get = function () {
                    return this[newProp];
                };
                data.set = function (value) {
                    if (this[newProp] != value) {
                        this[newProp] = value;
                        swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, property);
                    }
                };
            }
            else {
                return false;
            }
            Object.defineProperty(host, property, data);
            swan.registerBindable(host, property);
        };
        /**
         * @language en_US
         * Detaches this Watcher instance, and its handler function, from the current host.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从当前宿主中断开此 Watcher 实例及其处理函数。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.unwatch = function () {
            this.reset(null);
            this.handler = null;
            if (this.next) {
                this.next.handler = null;
            }
        };
        /**
         * @language en_US
         * Retrieves the current value of the watched property or property chain, or null if the host object is null.
         * @example
         * <code>
         * watch(obj, ["a","b","c"], ...).getValue() === obj.a.b.c
         * </code>
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 检索观察的属性或属性链的当前值，当宿主对象为空时此值为空。
         * @example
         * <code>
         * watch(obj, ["a","b","c"], ...).getValue() === obj.a.b.c
         * </code>
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.getValue = function () {
            if (this.next) {
                return this.next.getValue();
            }
            return this.getHostPropertyValue();
        };
        /**
         * @language en_US
         * Sets the handler function.s
         * @param handler The handler function. This argument must not be null.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置处理函数。
         * @param handler 处理函数，此参数必须为非空。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.setHandler = function (handler, thisObject) {
            this.handler = handler;
            this.thisObject = thisObject;
            if (this.next) {
                this.next.setHandler(handler, thisObject);
            }
        };
        /**
         * @language en_US
         * Resets this ChangeWatcher instance to use a new host object.
         * You can call this method to reuse a watcher instance on a different host.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 重置此 Watcher 实例使用新的宿主对象。
         * 您可以通过该方法实现一个Watcher实例用于不同的宿主。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.reset = function (newHost) {
            if (lark.is(this.host, 1 /* IEventEmitter */)) {
                this.host.removeListener(swan.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this);
            }
            this.host = newHost;
            if (lark.is(newHost, 1 /* IEventEmitter */)) {
                Watcher.checkBindable(newHost, this.property);
                newHost.on(swan.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this, false, 100);
            }
            if (this.next)
                this.next.reset(this.getHostPropertyValue());
        };
        /**
         * @private
         *
         * @returns
         */
        p.getHostPropertyValue = function () {
            return this.host ? this.host[this.property] : null;
        };
        /**
         * @private
         *
         * @param event
         */
        p.wrapHandler = function (event) {
            if (event.property == this.property && !this.isExecuting) {
                try {
                    this.isExecuting = true;
                    if (this.next)
                        this.next.reset(this.getHostPropertyValue());
                    this.handler.call(this.thisObject, this.getValue());
                }
                finally {
                    this.isExecuting = false;
                }
            }
        };
        return Watcher;
    })();
    swan.Watcher = Watcher;
    /**
     * @private
     */
    lark.registerClass(Watcher, 1035 /* Watcher */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 列表项单击事件
     */
    var ItemTapEvent = (function (_super) {
        __extends(ItemTapEvent, _super);
        function ItemTapEvent() {
            _super.apply(this, arguments);
            /**
             * 触发触摸事件的项呈示器数据源项。
             */
            this.item = null;
            /**
             * 触发触摸事件的项呈示器。
             */
            this.itemRenderer = null;
            /**
             * 触发触摸事件的项索引
             */
            this.itemIndex = -1;
        }
        var d = __define,c=ItemTapEvent;p=c.prototype;
        p.clean = function () {
            _super.prototype.clean.call(this);
            this.item = this.itemRenderer = null;
        };
        /**
         * 使用指定的 EventEmitter 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        ItemTapEvent.emitItemTapEvent = function (target, eventType, itemRenderer) {
            if (!target.hasListener(eventType)) {
                return true;
            }
            var event = lark.Event.create(ItemTapEvent, eventType);
            event.item = itemRenderer.data;
            event.itemIndex = itemRenderer.itemIndex;
            event.itemRenderer = itemRenderer;
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         *
         */
        ItemTapEvent.ITEM_TAP = "itemTap";
        return ItemTapEvent;
    })(lark.Event);
    swan.ItemTapEvent = ItemTapEvent;
    lark.registerClass(ItemTapEvent, 1017 /* ItemTapEvent */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015; Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms; with or without
//  modification; are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice; this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice; this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES; INCLUDING; BUT NOT LIMITED TO; THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT; INDIRECT;
//  INCIDENTAL; SPECIAL; EXEMPLARY; OR CONSEQUENTIAL DAMAGES (INCLUDING; BUT NOT
//  LIMITED TO; PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE; DATA;
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY; WHETHER IN CONTRACT; STRICT LIABILITY; OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE;
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    lark.$locale_strings = lark.$locale_strings || {};
    lark.$locale_strings["en_US"] = lark.$locale_strings["en_US"] || {};
    var locale_strings = lark.$locale_strings["en_US"];
    locale_strings[2001] = "EXML parsing error {0}: EXML file can't be found ";
    locale_strings[2002] = "EXML parsing error : invalid XML file:\n{0}";
    locale_strings[2003] = "EXML parsing error {0}: the class definitions corresponding to nodes can't be found  \n {1}";
    locale_strings[2004] = "EXML parsing error {0}: nodes cannot contain id property with the same name \n {1}";
    locale_strings[2005] = "EXML parsing error {0}: property with the name of '{1}' does not exist on the node: \n {2}";
    locale_strings[2006] = "EXML parsing error {0}: undefined view state name: '{1}' \n {2}";
    locale_strings[2007] = "EXML parsing error {0}: only UIComponent objects within the container can use the includeIn and excludeFrom properties\n {1}";
    locale_strings[2008] = "EXML parsing error {0}: fail to assign values of '{1}' class to property: '{2}' \n {3}";
    locale_strings[2009] = "EXML parsing error {0}: only one ID can be referenced in the node property value '{}' label; and complex expression is not allowed to use \n {1}";
    locale_strings[2010] = "EXML parsing error {0}: ID referenced by property: '{1}':  '{2}' does not exist \n {3}";
    locale_strings[2011] = "EXML parsing error {0}: fail to assign more than one child nodes to the same property: '{1}' \n {2}";
    locale_strings[2012] = "EXML parsing error {0}: no default property exists on the node; and you must explicitly declare the property name that the child node  is assigned to \n {1}";
    locale_strings[2013] = "EXML parsing error {0}: view state grammar is not allowed to use on property nodes of Array class \n {1} ";
    locale_strings[2014] = "EXML parsing error {0}: assigning the skin class itself to the node property is not allowed \n {1}";
    locale_strings[2015] = "EXML parsing error {0}: class definition referenced by node: {1} does not exist \n {2}";
    locale_strings[2016] = "EXML parsing error {0}: format error of 'scale9Grid' property value on the node: {1}";
    locale_strings[2017] = "EXML parsing error {0}: namespace prefix missing on the node: {1}";
    locale_strings[2018] = "EXML parsing error {0}: format error of 'skinName' property value on the node: {1}";
    locale_strings[2019] = "EXML parsing error {0}: the container’s child item must be visible nodes: {1}";
    locale_strings[2020] = "EXML parsing error {0}: for child nodes in w: Declarations, the includeIn and excludeFrom properties are not allowed to use \n {1}";
    locale_strings[2101] = "EXML parsing warnning : fail to register the class property : {0},there is already a class with the same name in the global,please try to rename the class name for the exml. \n {1}";
    locale_strings[2102] = "EXML parsing warnning {0}: no child node can be found on the property code \n {1}";
    locale_strings[2103] = "EXML parsing warnning {0}: the same property '{1}' on the node is assigned multiple times \n {2}";
    locale_strings[2104] = "Instantiate class {0} error，the parameters of its constructor method must be empty.";
    locale_strings[2201] = "BasicLayout doesn't support virtualization.";
    locale_strings[2202] = "parse skinName error，the parsing result of skinName must be a instance of swan.Skin.";
    locale_strings[2301] = "parse source failed，could not find asset from URL：{0} .";
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * UI事件
     */
    var UIEvent = (function (_super) {
        __extends(UIEvent, _super);
        function UIEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=UIEvent;p=c.prototype;
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        UIEvent.emitUIEvent = function (target, eventType) {
            if (!target.hasListener(eventType)) {
                return true;
            }
            var event = lark.Event.create(UIEvent, eventType);
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * 组件创建完成
         */
        UIEvent.CREATION_COMPLETE = "creationComplete";
        /**
         * 改变结束
         */
        UIEvent.CHANGE_END = "changeEnd";
        /**
         * 改变开始
         */
        UIEvent.CHANGE_START = "changeStart";
        /**
         * 即将关闭面板事件
         */
        UIEvent.CLOSING = "close";
        /**
         * UI组件在父级容器中的坐标发生改变事件
         */
        UIEvent.MOVE = "move";
        return UIEvent;
    })(lark.Event);
    swan.UIEvent = UIEvent;
    lark.registerClass(UIEvent, 1014 /* UIEvent */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 皮肤主题。注意：皮肤主题是一次性设置的默认值,并不能运行时切换所有组件默认皮肤。切换单个皮肤您可以自行对Component.skinName赋值来修改。
     */
    var Theme = (function (_super) {
        __extends(Theme, _super);
        /**
         * 创建一个主题实例
         * @param configURL 要加载并解析的外部主题配置文件路径。若传入null，将不进行配置文件加载，
         * 之后需要在外部以代码方式手动调用 mapSkin() 方法完成每条默认皮肤名的注册。
         * @param stage 当前舞台引用。传入此参数，主题会自动注册自身到舞台上。
         * 若传入null，需要在外部手动调用stage.registerImplementation("swan.Theme",theme) 来完成主题的注册。
         */
        function Theme(configURL, stage) {
            _super.call(this);
            this.delayList = [];
            this.skinMap = {};
            this.flagToClassName = {};
            this.initialized = !configURL;
            if (stage) {
                stage.registerImplementation("swan.Theme", this);
            }
            this.load(configURL);
        }
        var d = __define,c=Theme;p=c.prototype;
        p.load = function (url) {
            var request = new lark.HttpRequest();
            request.on(lark.Event.COMPLETE, this.onConfigLoaded, this);
            request.on(lark.Event.IO_ERROR, this.onConfigLoaded, this);
            request.open(url);
            request.send();
        };
        p.onConfigLoaded = function (event) {
            var request = event.target;
            try {
                var data = JSON.parse(request.response);
            }
            catch (e) {
                if (DEBUG) {
                    lark.error(e.message);
                }
            }
            if (data && data.skins) {
                var skinMap = this.skinMap;
                var skins = data.skins;
                var keys = Object.keys(skins);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    if (!skinMap[key]) {
                        this.mapSkin(key, skins[key]);
                    }
                }
            }
            this.initialized = true;
            this.hadleDelayList();
        };
        p.hadleDelayList = function () {
            var list = this.delayList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var client = list[i];
                if (!client.$Component[5 /* skinNameExplicitlySet */]) {
                    var skinName = this.getSkinName(client);
                    if (skinName) {
                        client.$Component[1 /* skinName */] = skinName;
                        client.$parseSkinName();
                    }
                }
            }
            list.length = 0;
        };
        /**
         * 根据主机组件，获取对应的默认皮肤名。查询规则如下：
         * 1.使用client的hostComponentKey作为键查询默认皮肤名
         * 2.使用client的类名作为键查询默认皮肤名
         * 3.使用client的父类名作为键查询默认皮肤名
         * 4.不断重复3直到查询到皮肤名或父类为swan.Component时停止
         * @param client 要获取默认皮肤的组件
         */
        p.getSkinName = function (client) {
            if (!this.initialized) {
                if (this.delayList.indexOf(client) == -1) {
                    this.delayList.push(client);
                }
                return;
            }
            var skinMap = this.skinMap;
            var skinName = skinMap[client.hostComponentKey];
            if (!skinName) {
                skinName = this.findSkinName(client);
            }
            return skinName;
        };
        p.findSkinName = function (prototype) {
            if (!prototype) {
                return "";
            }
            var flag = prototype["__classFlag__"];
            if (flag === void 0) {
                return "";
            }
            var key = this.flagToClassName[flag];
            var skinName = this.skinMap[key];
            if (skinName || flag === 1009 /* Component */) {
                return skinName;
            }
            return this.findSkinName(Object.getPrototypeOf(prototype));
        };
        /**
         * 为指定的主机组件映射一个默认皮肤
         * @param hostComponentKey 主机组件名称，例如：“swan.Button”
         * @param skinName 皮肤名称 例如："app.MyButtonSkin";
         */
        p.mapSkin = function (hostComponentKey, skinName) {
            if (DEBUG) {
                if (!hostComponentKey) {
                    lark.$error(1003, "hostComponentKey");
                }
                if (!skinName) {
                    lark.$error(1003, "skinName");
                }
            }
            this.skinMap[hostComponentKey] = skinName;
            var clazz = lark.getDefinitionByName(hostComponentKey);
            if (clazz && clazz.prototype) {
                var flag = clazz.prototype.__classFlag__;
                if (flag) {
                    this.flagToClassName[flag] = hostComponentKey;
                }
            }
        };
        return Theme;
    })(lark.EventEmitter);
    swan.Theme = Theme;
    lark.registerClass(Theme, 1013 /* Theme */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015; Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms; with or without
//  modification; are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice; this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice; this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES; INCLUDING; BUT NOT LIMITED TO; THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT; INDIRECT;
//  INCIDENTAL; SPECIAL; EXEMPLARY; OR CONSEQUENTIAL DAMAGES (INCLUDING; BUT NOT
//  LIMITED TO; PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE; DATA;
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY; WHETHER IN CONTRACT; STRICT LIABILITY; OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE;
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    lark.$locale_strings = lark.$locale_strings || {};
    lark.$locale_strings["zh_CN"] = lark.$locale_strings["zh_CN"] || {};
    var locale_strings = lark.$locale_strings["zh_CN"];
    //EXML报错信息
    locale_strings[2001] = "EXML解析错误 {0}: 找不到EXML文件";
    locale_strings[2002] = "EXML解析错误: 不是有效的XML文件:\n{0}";
    locale_strings[2003] = "EXML解析错误 {0}: 无法找到节点所对应的类定义\n{1}";
    locale_strings[2004] = "EXML解析错误 {0}: 节点不能含有同名的id属性\n{1}";
    locale_strings[2005] = "EXML解析错误 {0}: 节点上不存在名为'{1}'的属性:\n{2}";
    locale_strings[2006] = "EXML解析错误 {0}: 未定义的视图状态名称:'{1}'\n{2}";
    locale_strings[2007] = "EXML解析错误 {0}: 只有处于容器内的 UIComponent 对象可以使用includeIn和excludeFrom属性\n{1}";
    locale_strings[2008] = "EXML解析错误 {0}: 无法将'{1}'类型的值赋给属性:'{2}'\n{3}";
    locale_strings[2009] = "EXML解析错误 {0}: 在节点属性值的‘{}’标签内只能引用一个ID，不允许使用复杂表达式\n{1}";
    locale_strings[2010] = "EXML解析错误 {0}: 属性:'{1}'所引用的ID: '{2}'不存在\n{3}";
    locale_strings[2011] = "EXML解析错误 {0}: 无法将多个子节点赋值给同一个属性:'{1}'\n{2}";
    locale_strings[2012] = "EXML解析错误 {0}: 节点上不存在默认属性，必须显式声明子节点要赋值到的属性名\n{1}";
    locale_strings[2013] = "EXML解析错误 {0}: 类型为Array的属性节点上不允许使用视图状态语法\n{1}";
    locale_strings[2014] = "EXML解析错误 {0}: 不允许将皮肤类自身赋值给节点属性\n{1}";
    locale_strings[2015] = "EXML解析错误 {0}: 节点引用的类定义:{1}不存在\n{2}";
    locale_strings[2016] = "EXML解析错误 {0}: 节点上'scale9Grid'属性值的格式错误:{1}";
    locale_strings[2017] = "EXML解析错误 {0}: 节点上缺少命名空间前缀:{1}";
    locale_strings[2018] = "EXML解析错误 {0}: 节点上'skinName'属性值的格式错误:{1}";
    locale_strings[2019] = "EXML解析错误 {0}: 容器的子项必须是可视节点:{1}";
    locale_strings[2020] = "EXML解析错误 {0}: 在w:Declarations内的子节点，不允许使用includeIn和excludeFrom属性\n{1}";
    //EXML警告信息
    locale_strings[2101] = "EXML解析警告: 在EXML根节点上声明的 class 属性: {0} 注册失败，所对应的类已经存在，请尝试重命名要注册的类名。\n{1}";
    locale_strings[2102] = "EXML解析警告 {0}: 在属性节点上找不到任何子节点\n{1}";
    locale_strings[2103] = "EXML解析警告 {0}: 节点上的同一个属性'{1}'被多次赋值\n{2}";
    locale_strings[2104] = "无法实例化组件：{0} ，请检查该组件构造函数参数是否为空。";
    //Swan 报错与警告信息
    locale_strings[2201] = "BasicLayout 不支持虚拟化。";
    locale_strings[2202] = "皮肤解析出错，属性 skinName 的值必须要能够解析为一个 swan.Skin 的实例。";
    locale_strings[2301] = "素材解析失败，找不到URL：{0} 所对应的资源。";
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var EXML;
(function (EXML) {
    var parser = new swan.sys.EXMLParser();
    var requestPool = [];
    var callBackMap = {};
    var requestMap = {};
    /**
     * 解析一个 EXML 文件的文本内容为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 lark.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     * @param text 要解析的 EXML 文件内容
     */
    function parse(text) {
        return parser.parse(text);
    }
    EXML.parse = parse;
    /**
     * 加载并解析一个外部的 EXML 文件为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 lark.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     * @param url 要加载的 EXML 文件路径
     * @param callBack 加载并解析完成后的回调函数，无论加载成功还是失败，此函数均会被回调。失败时将传入 undefined 作为回调函数参数。
     * @param thisObject 回调函数的 this 引用
     */
    function load(url, callBack, thisObject) {
        if (DEBUG) {
            if (!url) {
                lark.$error(1003, "url");
            }
        }
        var list = callBackMap[url];
        if (list) {
            list.push([callBack, thisObject]);
            return;
        }
        var request = requestPool.pop();
        if (!request) {
            request = new lark.HttpRequest();
        }
        callBackMap[url] = [[callBack, thisObject]];
        requestMap[request.$hashCode] = url;
        request.on(lark.Event.COMPLETE, onLoadFinish, null);
        request.on(lark.Event.IO_ERROR, onLoadFinish, null);
        request.open(url);
        request.send();
    }
    EXML.load = load;
    function onLoadFinish(event) {
        var request = event.currentTarget;
        request.removeListener(lark.Event.COMPLETE, onLoadFinish, null);
        request.removeListener(lark.Event.IO_ERROR, onLoadFinish, null);
        var text = event.type == lark.Event.COMPLETE ? request.response : "";
        if (text) {
            var clazz = parse(text);
        }
        requestPool.push(request);
        var url = requestMap[request.$hashCode];
        delete requestMap[request.$hashCode];
        var list = callBackMap[url];
        delete callBackMap[url];
        var length = list.length;
        for (var i = 0; i < length; i++) {
            var arr = list[i];
            arr[0].call(arr[1], clazz, url);
        }
    }
})(EXML || (EXML = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @language en_US
     * The Binding class defines utility methods for performing data binding.
     * You can use the methods defined in this class to configure data bindings.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 绑定工具类，用于执行数据绑定用的方法集。您可以使用此类中定义的方法来配置数据绑定。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var Binding = (function () {
        function Binding() {
        }
        var d = __define,c=Binding;p=c.prototype;
        /**
         * @language en_US
         * Binds a property, <prop>prop</code> on the <code>target</code> Object, to a bindable property or peoperty chain.
         * @param host The object that hosts the property or property chain to be watched.
         * The <code>host</code> maintains a list of <code>targets</code> to update theirs <code>prop</code> when <code>chain</code> changes.
         * @param chain A value specifying the property or chain to be watched. For example, when watch the property <code>host.a.b.c</code>,
         * you need call the method like this: <code>indProperty(host, ["a","b","c"], ...)</code>
         * @param target The Object defining the property to be bound to <code>chain</code>.
         * @param prop The name of the public property defined in the <code>site</code> Object to be bound.
         * @returns A ChangeWatcher instance, if at least one property name has been specified
         * to the <code>chain</code> argument; null otherwise.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绑定一个对象的属性值到要监视的对象属性上。
         * @param host 用于承载要监视的属性或属性链的对象。
         * 当 <code>host</code>上<code>chain</code>所对应的值发生改变时，<code>target</code>上的<code>prop</code>属性将被自动更新。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 <code>host.a.b.c</code>，需按以下形式调用此方法：<code>bindProperty(host, ["a","b","c"], ...)。</code>
         * @param target 本次绑定要更新的目标对象。
         * @param prop 本次绑定要更新的目标属性名称。
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Binding.bindProperty = function (host, chain, target, prop) {
            var watcher = swan.Watcher.watch(host, chain, null, null);
            if (watcher) {
                var assign = function (value) {
                    target[prop] = value;
                };
                watcher.setHandler(assign, null);
                assign(watcher.getValue());
            }
            return watcher;
        };
        /**
         * @language en_US
         * Binds a callback, <prop>handler</code> on the <code>target</code> Object, to a bindable property or peoperty chain.
         * Callback method to invoke with an argument of the current value of <code>chain</code> when that value changes.
         * @param host The object that hosts the property or property chain to be watched.
         * @param chain A value specifying the property or chain to be watched. For example, when watch the property <code>host.a.b.c</code>,
         * you need call the method like this: <code>indProperty(host, ["a","b","c"], ...)</code>
         * @param handler method to invoke with an argument of the current value of <code>chain</code> when that value changes.
         * @param thisObject <code>this</code> object of binding method
         * @returns A ChangeWatcher instance, if at least one property name has been  specified to the <code>chain</code> argument; null otherwise.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绑定一个回调函数到要监视的对象属性上。当 host上 chain 所对应的值发生改变时，handler 方法将被自动调用。
         * @param host 用于承载要监视的属性或属性链的对象。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 host.a.b.c，需按以下形式调用此方法：bindSetter(host, ["a","b","c"], ...)。
         * @param handler 在监视的目标属性链中任何属性的值发生改变时调用的事件处理函数。
         * @param thisObject handler 方法绑定的this对象
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Binding.bindHandler = function (host, chain, handler, thisObject) {
            var watcher = swan.Watcher.watch(host, chain, handler, thisObject);
            if (watcher) {
                handler.call(thisObject, watcher.getValue());
            }
            return watcher;
        };
        return Binding;
    })();
    swan.Binding = Binding;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        function isDeltaIdentity(m) {
            return (m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1);
        }
        var validator = new sys.Validator();
        /**
         * Swan 显示对象基类模板。仅作为 UIComponent 的默认实现，为lark.sys.implemenetUIComponenet()方法提供代码模板。
         * 注意：在此类里不允许直接使用super关键字访问父类方法。一律使用this.$super属性访问。
         */
        var UIComponentImpl = (function (_super) {
            __extends(UIComponentImpl, _super);
            /**
             * 构造函数
             */
            function UIComponentImpl() {
                _super.call(this);
                this.initializeUIValues();
            }
            var d = __define,c=UIComponentImpl;p=c.prototype;
            /**
             * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
             */
            p.initializeUIValues = function () {
                this.$UIComponent = {
                    0: lark.NONE,
                    1: lark.NONE,
                    2: lark.NONE,
                    3: lark.NONE,
                    4: lark.NONE,
                    5: lark.NONE,
                    6: lark.NONE,
                    7: lark.NONE,
                    8: lark.NONE,
                    9: lark.NONE,
                    10: 0,
                    11: 0,
                    12: 0,
                    13: 100000,
                    14: 0,
                    15: 100000,
                    16: 0,
                    17: 0,
                    18: lark.NONE,
                    19: lark.NONE,
                    20: 0,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: true,
                    25: true,
                    26: true,
                    27: false,
                    28: false,
                    29: false,
                };
                this.$includeInLayout = true;
            };
            /**
             * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
             * 请务必调用super.createChildren()以完成父类组件的初始化
             */
            p.createChildren = function () {
            };
            /**
             * 子项创建完成,此方法在createChildren()之后执行。
             */
            p.childrenCreated = function () {
            };
            /**
             * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
             */
            p.commitProperties = function () {
                var values = this.$UIComponent;
                if (values[22 /* oldWidth */] != values[10 /* width */] || values[23 /* oldHeight */] != values[11 /* height */]) {
                    this.emitWith(lark.Event.RESIZE);
                }
                if (values[20 /* oldX */] != this.$getX() || values[21 /* oldY */] != this.$getY()) {
                    swan.UIEvent.emitUIEvent(this, swan.UIEvent.MOVE);
                }
            };
            /**
             * 测量组件尺寸
             */
            p.measure = function () {
            };
            /**
             * 更新显示列表
             */
            p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            };
            d(p, "includeInLayout",
                /**
                 * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
                 * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
                 */
                function () {
                    return this.$includeInLayout;
                },
                function (value) {
                    value = !!value;
                    if (this.$includeInLayout === value)
                        return;
                    this.$includeInLayout = true;
                    this.invalidateParentLayout();
                    this.$includeInLayout = value;
                }
            );
            p.$onAddToStage = function (stage, nestLevel) {
                this.$super.$onAddToStage.call(this, stage, nestLevel);
                this.checkInvalidateFlag();
                var values = this.$UIComponent;
                if (!values[29 /* initialized */]) {
                    values[29 /* initialized */] = true;
                    this.createChildren();
                    this.childrenCreated();
                    swan.UIEvent.emitUIEvent(this, swan.UIEvent.CREATION_COMPLETE);
                }
            };
            /**
             * 检查属性失效标记并应用
             */
            p.checkInvalidateFlag = function (event) {
                var values = this.$UIComponent;
                if (values[24 /* invalidatePropertiesFlag */]) {
                    validator.invalidateProperties(this);
                }
                if (values[25 /* invalidateSizeFlag */]) {
                    validator.invalidateSize(this);
                }
                if (values[26 /* invalidateDisplayListFlag */]) {
                    validator.invalidateDisplayList(this);
                }
            };
            d(p, "left",
                /**
                 * 距父级容器离左边距离
                 */
                function () {
                    return this.$UIComponent[0 /* left */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[0 /* left */] === value)
                        return;
                    values[0 /* left */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "right",
                /**
                 * 距父级容器右边距离
                 */
                function () {
                    return this.$UIComponent[1 /* right */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[1 /* right */] === value)
                        return;
                    values[1 /* right */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "top",
                /**
                 * 距父级容器顶部距离
                 */
                function () {
                    return this.$UIComponent[2 /* top */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[2 /* top */] === value)
                        return;
                    values[2 /* top */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "bottom",
                /**
                 * 距父级容器底部距离
                 */
                function () {
                    return this.$UIComponent[3 /* bottom */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[3 /* bottom */] == value)
                        return;
                    values[3 /* bottom */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "horizontalCenter",
                /**
                 * 在父级容器中距水平中心位置的距离
                 */
                function () {
                    return this.$UIComponent[4 /* horizontalCenter */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[4 /* horizontalCenter */] === value)
                        return;
                    values[4 /* horizontalCenter */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "verticalCenter",
                /**
                 * 在父级容器中距竖直中心位置的距离
                 */
                function () {
                    return this.$UIComponent[5 /* verticalCenter */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[5 /* verticalCenter */] === value)
                        return;
                    values[5 /* verticalCenter */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "percentWidth",
                /**
                 * 相对父级容器宽度的百分比
                 */
                function () {
                    return this.$UIComponent[6 /* percentWidth */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[6 /* percentWidth */] === value)
                        return;
                    values[6 /* percentWidth */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "percentHeight",
                /**
                 * 相对父级容器高度的百分比
                 */
                function () {
                    return this.$UIComponent[7 /* percentHeight */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (values[7 /* percentHeight */] === value)
                        return;
                    values[7 /* percentHeight */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "explicitWidth",
                /**
                 * 外部显式指定的宽度
                 */
                function () {
                    return this.$UIComponent[8 /* explicitWidth */];
                },undefined
            );
            d(p, "explicitHeight",
                /**
                 * 外部显式指定的高度
                 */
                function () {
                    return this.$UIComponent[9 /* explicitHeight */];
                },undefined
            );
            /**
             * 组件宽度,默认值为lark.lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
             */
            p.$getWidth = function () {
                this.validateSizeNow();
                return this.$UIComponent[10 /* width */];
            };
            p.$setWidth = function (value) {
                value = +value || 0;
                var values = this.$UIComponent;
                if (value < 0 || values[10 /* width */] === value && values[8 /* explicitWidth */] === value)
                    return;
                values[10 /* width */] = value;
                values[8 /* explicitWidth */] = value;
                if (lark.isNone(value))
                    this.invalidateSize();
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentLayout();
            };
            /**
             * 立即验证自身的尺寸。
             */
            p.validateSizeNow = function () {
                this.validateSize(true);
                this.updateFinalSize();
            };
            /**
             * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
             */
            p.$getHeight = function () {
                this.validateSizeNow();
                return this.$UIComponent[11 /* height */];
            };
            p.$setHeight = function (value) {
                value = +value || 0;
                var values = this.$UIComponent;
                if (value < 0 || values[11 /* height */] === value && values[9 /* explicitHeight */] === value)
                    return;
                values[11 /* height */] = value;
                values[9 /* explicitHeight */] = value;
                if (lark.isNone(value))
                    this.invalidateSize();
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentLayout();
            };
            p.$setScaleX = function (value) {
                var change = this.$super.$setScaleX.call(this, value);
                if (change) {
                    this.invalidateParentLayout();
                }
                return change;
            };
            p.$setScaleY = function (value) {
                var change = this.$super.$setScaleY.call(this, value);
                if (change) {
                    this.invalidateParentLayout();
                }
                return change;
            };
            d(p, "minWidth",
                /**
                 * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
                 */
                function () {
                    return this.$UIComponent[12 /* minWidth */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[12 /* minWidth */] === value) {
                        return;
                    }
                    values[12 /* minWidth */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            d(p, "maxWidth",
                /**
                 * 组件的最大高度。同时影响测量和自动布局的尺寸。
                 */
                function () {
                    return this.$UIComponent[13 /* maxWidth */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[13 /* maxWidth */] === value) {
                        return;
                    }
                    values[13 /* maxWidth */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            d(p, "minHeight",
                /**
                 * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
                 */
                function () {
                    return this.$UIComponent[14 /* minHeight */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[14 /* minHeight */] === value) {
                        return;
                    }
                    values[14 /* minHeight */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            d(p, "maxHeight",
                /**
                 * 组件的最大高度,同时影响测量和自动布局的尺寸。
                 */
                function () {
                    return this.$UIComponent[15 /* maxHeight */];
                },
                function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[15 /* maxHeight */] === value) {
                        return;
                    }
                    values[15 /* maxHeight */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            /**
             * 设置测量结果。
             * @param width 测量宽度
             * @param height 测量高度
             */
            p.setMeasuredSize = function (width, height) {
                var values = this.$UIComponent;
                values[16 /* measuredWidth */] = Math.ceil(+width || 0);
                values[17 /* measuredHeight */] = Math.ceil(+height || 0);
            };
            /**
             * 设置组件的宽高。此方法不同于直接设置width,height属性，
             * 不会影响显式标记尺寸属性
             */
            p.setActualSize = function (w, h) {
                var change = false;
                var values = this.$UIComponent;
                if (values[10 /* width */] !== w) {
                    values[10 /* width */] = w;
                    change = true;
                }
                if (values[11 /* height */] !== h) {
                    values[11 /* height */] = h;
                    change = true;
                }
                if (change) {
                    this.invalidateDisplayList();
                    this.emitWith(lark.Event.RESIZE);
                }
            };
            p.$setX = function (value) {
                var change = this.$super.$setX.call(this, value);
                if (change) {
                    this.invalidateParentLayout();
                    this.invalidateProperties();
                }
                return change;
            };
            p.$setY = function (value) {
                var change = this.$super.$setY.call(this, value);
                if (change) {
                    this.invalidateParentLayout();
                    this.invalidateProperties();
                }
                return change;
            };
            /**
             * 标记属性失效
             */
            p.invalidateProperties = function () {
                var values = this.$UIComponent;
                if (!values[24 /* invalidatePropertiesFlag */]) {
                    values[24 /* invalidatePropertiesFlag */] = true;
                    if (this.$stage)
                        validator.invalidateProperties(this);
                }
            };
            /**
             * 验证组件的属性
             */
            p.validateProperties = function () {
                var values = this.$UIComponent;
                if (values[24 /* invalidatePropertiesFlag */]) {
                    this.commitProperties();
                    values[24 /* invalidatePropertiesFlag */] = false;
                }
            };
            /**
             * 标记提交过需要验证组件尺寸
             */
            p.invalidateSize = function () {
                var values = this.$UIComponent;
                if (!values[25 /* invalidateSizeFlag */]) {
                    values[25 /* invalidateSizeFlag */] = true;
                    if (this.$stage)
                        validator.invalidateSize(this);
                }
            };
            /**
             * 验证组件的尺寸
             */
            p.validateSize = function (recursive) {
                if (recursive) {
                    var children = this.$children;
                    if (children) {
                        var length = children.length;
                        for (var i = 0; i < length; i++) {
                            var child = children[i];
                            if (lark.is(child, 1001 /* UIComponent */)) {
                                child.validateSize(true);
                            }
                        }
                    }
                }
                var values = this.$UIComponent;
                if (values[25 /* invalidateSizeFlag */]) {
                    var changed = this.measureSizes();
                    if (changed) {
                        this.invalidateDisplayList();
                        this.invalidateParentLayout();
                    }
                    values[25 /* invalidateSizeFlag */] = false;
                }
            };
            /**
             * 测量组件尺寸，返回尺寸是否发生变化
             */
            p.measureSizes = function () {
                var changed = false;
                var values = this.$UIComponent;
                if (!values[25 /* invalidateSizeFlag */])
                    return changed;
                if (lark.isNone(values[8 /* explicitWidth */]) || lark.isNone(values[9 /* explicitHeight */])) {
                    this.measure();
                    if (values[16 /* measuredWidth */] < values[12 /* minWidth */]) {
                        values[16 /* measuredWidth */] = values[12 /* minWidth */];
                    }
                    if (values[16 /* measuredWidth */] > values[13 /* maxWidth */]) {
                        values[16 /* measuredWidth */] = values[13 /* maxWidth */];
                    }
                    if (values[17 /* measuredHeight */] < values[14 /* minHeight */]) {
                        values[17 /* measuredHeight */] = values[14 /* minHeight */];
                    }
                    if (values[17 /* measuredHeight */] > values[15 /* maxHeight */]) {
                        values[17 /* measuredHeight */] = values[15 /* maxHeight */];
                    }
                }
                var preferredW = this.getPreferredUWidth();
                var preferredH = this.getPreferredUHeight();
                if (preferredW !== values[18 /* oldPreferWidth */] || preferredH !== values[19 /* oldPreferHeight */]) {
                    values[18 /* oldPreferWidth */] = preferredW;
                    values[19 /* oldPreferHeight */] = preferredH;
                    changed = true;
                }
                return changed;
            };
            /**
             * 标记需要验证显示列表
             */
            p.invalidateDisplayList = function () {
                var values = this.$UIComponent;
                if (!values[26 /* invalidateDisplayListFlag */]) {
                    values[26 /* invalidateDisplayListFlag */] = true;
                    if (this.$stage)
                        validator.invalidateDisplayList(this);
                }
            };
            /**
             * 验证子项的位置和大小，并绘制其他可视内容
             */
            p.validateDisplayList = function () {
                var values = this.$UIComponent;
                if (values[26 /* invalidateDisplayListFlag */]) {
                    this.updateFinalSize();
                    this.updateDisplayList(values[10 /* width */], values[11 /* height */]);
                    values[26 /* invalidateDisplayListFlag */] = false;
                }
            };
            /**
             * 更新最终的组件宽高
             */
            p.updateFinalSize = function () {
                var unscaledWidth = 0;
                var unscaledHeight = 0;
                var values = this.$UIComponent;
                if (values[27 /* layoutWidthExplicitlySet */]) {
                    unscaledWidth = values[10 /* width */];
                }
                else if (!lark.isNone(values[8 /* explicitWidth */])) {
                    unscaledWidth = values[8 /* explicitWidth */];
                }
                else {
                    unscaledWidth = values[16 /* measuredWidth */];
                }
                if (values[28 /* layoutHeightExplicitlySet */]) {
                    unscaledHeight = values[11 /* height */];
                }
                else if (!lark.isNone(values[9 /* explicitHeight */])) {
                    unscaledHeight = values[9 /* explicitHeight */];
                }
                else {
                    unscaledHeight = values[17 /* measuredHeight */];
                }
                this.setActualSize(unscaledWidth, unscaledHeight);
            };
            /**
             * 立即应用组件及其子项的所有属性
             */
            p.validateNow = function () {
                if (this.$stage)
                    validator.validateClient(this);
            };
            /**
             * 标记父级容器的尺寸和显示列表为失效
             */
            p.invalidateParentLayout = function () {
                var parent = this.$parent;
                if (!parent || !this.$includeInLayout || !lark.is(parent, 1001 /* UIComponent */))
                    return;
                parent.invalidateSize();
                parent.invalidateDisplayList();
            };
            /**
             * 设置组件的布局宽高
             */
            p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
                layoutHeight = +layoutHeight || 0;
                layoutWidth = +layoutWidth || 0;
                if (layoutHeight < 0 || layoutWidth < 0) {
                    return;
                }
                var values = this.$UIComponent;
                var maxWidth = values[13 /* maxWidth */];
                var maxHeight = values[15 /* maxHeight */];
                var minWidth = Math.min(values[12 /* minWidth */], maxWidth);
                var minHeight = Math.min(values[14 /* minHeight */], maxHeight);
                var width;
                var height;
                if (lark.isNone(layoutWidth)) {
                    values[27 /* layoutWidthExplicitlySet */] = false;
                    width = this.getPreferredUWidth();
                }
                else {
                    values[27 /* layoutWidthExplicitlySet */] = true;
                    width = Math.max(minWidth, Math.min(maxWidth, layoutWidth));
                }
                if (lark.isNone(layoutHeight)) {
                    values[28 /* layoutHeightExplicitlySet */] = false;
                    height = this.getPreferredUHeight();
                }
                else {
                    values[28 /* layoutHeightExplicitlySet */] = true;
                    height = Math.max(minHeight, Math.min(maxHeight, layoutHeight));
                }
                var matrix = this.$getMatrix();
                if (isDeltaIdentity(matrix)) {
                    this.setActualSize(width, height);
                    return;
                }
                var fitSize = sys.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix, values[8 /* explicitWidth */], values[9 /* explicitHeight */], this.getPreferredUWidth(), this.getPreferredUHeight(), minWidth, minHeight, maxWidth, maxHeight);
                if (!fitSize) {
                    fitSize = lark.Point.create(minWidth, minHeight);
                }
                this.setActualSize(fitSize.x, fitSize.y);
                lark.Point.release(fitSize);
            };
            /**
             * 设置组件的布局位置
             */
            p.setLayoutBoundsPosition = function (x, y) {
                var matrix = this.$getMatrix();
                if (!isDeltaIdentity(matrix)) {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    x += this.$getX() - bounds.x;
                    y += this.$getY() - bounds.y;
                }
                var changed = this.$super.$setX.call(this, x);
                if (this.$super.$setY.call(this, y) || changed) {
                    swan.UIEvent.emitUIEvent(this, swan.UIEvent.MOVE);
                }
            };
            /**
             * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
             * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
             * 注意此方法返回值已经包含scale和rotation。
             */
            p.getLayoutBounds = function (bounds) {
                var values = this.$UIComponent;
                var w;
                if (values[27 /* layoutWidthExplicitlySet */]) {
                    w = values[10 /* width */];
                }
                else if (!lark.isNone(values[8 /* explicitWidth */])) {
                    w = values[8 /* explicitWidth */];
                }
                else {
                    w = values[16 /* measuredWidth */];
                }
                var h;
                if (values[28 /* layoutHeightExplicitlySet */]) {
                    h = values[11 /* height */];
                }
                else if (!lark.isNone(values[9 /* explicitHeight */])) {
                    h = values[9 /* explicitHeight */];
                }
                else {
                    h = values[17 /* measuredHeight */];
                }
                this.applyMatrix(bounds, w, h);
            };
            p.getPreferredUWidth = function () {
                var values = this.$UIComponent;
                return lark.isNone(values[8 /* explicitWidth */]) ? values[16 /* measuredWidth */] : values[8 /* explicitWidth */];
            };
            p.getPreferredUHeight = function () {
                var values = this.$UIComponent;
                return lark.isNone(values[9 /* explicitHeight */]) ? values[17 /* measuredHeight */] : values[9 /* explicitHeight */];
            };
            /**
             * 获取组件的首选尺寸,常用于父级的measure()方法中
             * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
             * 注意此方法返回值已经包含scale和rotation。
             */
            p.getPreferredBounds = function (bounds) {
                var w = this.getPreferredUWidth();
                var h = this.getPreferredUHeight();
                this.applyMatrix(bounds, w, h);
            };
            p.applyMatrix = function (bounds, w, h) {
                var bounds = bounds.setTo(0, 0, w, h);
                var matrix = this.$getMatrix();
                if (isDeltaIdentity(matrix)) {
                    bounds.x += matrix.tx;
                    bounds.y += matrix.ty;
                }
                else {
                    matrix.$transformBounds(bounds);
                }
            };
            return UIComponentImpl;
        })(lark.DisplayObject);
        sys.UIComponentImpl = UIComponentImpl;
        /**
         * 检查一个函数的方法体是否为空。
         */
        function isEmptyFunction(prototype, key) {
            if (typeof prototype[key] != "function") {
                return false;
            }
            var body = prototype[key].toString();
            var index = body.indexOf("{");
            var lastIndex = body.lastIndexOf("}");
            body = body.substring(index + 1, lastIndex);
            return body.trim() == "";
        }
        /**
         * 拷贝模板类的方法体和属性到目标类上。
         * @param target 目标类
         * @param template 模板类
         */
        function mixin(target, template) {
            for (var property in template) {
                if (template.hasOwnProperty(property)) {
                    target[property] = template[property];
                }
            }
            var prototype = target.prototype;
            var protoBase = template.prototype;
            var keys = Object.keys(protoBase);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                if (key == "__meta__") {
                    continue;
                }
                if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                    var value = Object.getOwnPropertyDescriptor(protoBase, key);
                    Object.defineProperty(prototype, key, value);
                }
            }
        }
        sys.mixin = mixin;
        /**
         * 自定义类实现UIComponent的步骤：
         * 1.在自定义类的构造函数里调用：this.initializeUIValues();
         * 2.拷贝UIComponent接口定义的所有内容(包括注释掉的protected函数)到自定义类，将所有子类需要覆盖的方法都声明为空方法体。
         * 3.在定义类结尾的外部调用sys.implementUIComponent()，并传入自定义类。
         * 4.若覆盖了某个UIComponent的方法，需要手动调用UIComponentImpl.prototype["方法名"].call(this);
         * @param descendant 自定义的UIComponent子类
         * @param base 自定义子类继承的父类
         */
        function implementUIComponent(descendant, base, isContainer) {
            mixin(descendant, UIComponentImpl);
            var prototype = descendant.prototype;
            prototype.$super = base.prototype;
            if (isContainer) {
                prototype.$childAdded = function (child, index) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                };
                prototype.$childRemoved = function (child, index) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                };
            }
            if (DEBUG) {
                lark.$markReadOnly(prototype, "explicitWidth");
                lark.$markReadOnly(prototype, "explicitHeight");
                Object.defineProperty(prototype, "preferredWidth", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "preferredHeight", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "preferredX", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "preferredY", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsX", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsY", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsWidth", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsHeight", {
                    get: function () {
                        var bounds = lark.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "measuredWidth", {
                    get: function () {
                        return this.$UIComponent[16 /* measuredWidth */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "measuredHeight", {
                    get: function () {
                        return this.$UIComponent[17 /* measuredHeight */];
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }
        sys.implementUIComponent = implementUIComponent;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * BasicLayout 类根据其各个设置彼此独立地排列布局元素。
     * BasicLayout（也称为绝对布局）要求显式定位每个容器子代。可以使用子代的 x 和 y 属性，或使用约束来定位每个子代。
     */
    var BasicLayout = (function (_super) {
        __extends(BasicLayout, _super);
        /**
         * 创建一个基本布局实例
         */
        function BasicLayout() {
            _super.call(this);
        }
        var d = __define,c=BasicLayout;p=c.prototype;
        /**
         *基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        p.measure = function () {
            _super.prototype.measure.call(this);
            swan.sys.measure(this.$target);
        };
        /**
         * 调整目标的元素的大小并定位这些元素
         * @param unscaledWidth
         * @param unscaledHeight
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var target = this.$target;
            var pos = swan.sys.updateDisplayList(target, unscaledWidth, unscaledHeight);
            target.setContentSize(Math.ceil(pos.x), Math.ceil(pos.y));
        };
        return BasicLayout;
    })(swan.LayoutBase);
    swan.BasicLayout = BasicLayout;
    if (DEBUG) {
        Object.defineProperty(BasicLayout.prototype, "useVirtualLayout", {
            /**
             * 此布局不支持虚拟布局，设置这个属性无效
             */
            get: function () {
                return this.$useVirtualLayout;
            },
            set: function (value) {
                lark.$error(2201);
            },
            enumerable: true,
            configurable: true
        });
    }
    lark.registerClass(BasicLayout, 1021 /* BasicLayout */);
})(swan || (swan = {}));
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        /**
         * 一个工具方法，使用BasicLayout规则测量目标对象。
         */
        function measure(target) {
            if (!target) {
                return;
            }
            var width = 0;
            var height = 0;
            var bounds = lark.$TempRectangle;
            var count = target.numChildren;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getChildAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                var values = layoutElement.$UIComponent;
                var hCenter = values[4 /* horizontalCenter */];
                var vCenter = values[5 /* verticalCenter */];
                var left = values[0 /* left */];
                var right = values[1 /* right */];
                var top = values[2 /* top */];
                var bottom = values[3 /* bottom */];
                var extX;
                var extY;
                layoutElement.getPreferredBounds(bounds);
                if (!lark.isNone(left) && !lark.isNone(right)) {
                    extX = left + right;
                }
                else if (!lark.isNone(hCenter)) {
                    extX = Math.abs(hCenter) * 2;
                }
                else if (!lark.isNone(left) || !lark.isNone(right)) {
                    extX = lark.isNone(left) ? 0 : left;
                    extX += lark.isNone(right) ? 0 : right;
                }
                else {
                    extX = bounds.x;
                }
                if (!lark.isNone(top) && !lark.isNone(bottom)) {
                    extY = top + bottom;
                }
                else if (!lark.isNone(vCenter)) {
                    extY = Math.abs(vCenter) * 2;
                }
                else if (!lark.isNone(top) || !lark.isNone(bottom)) {
                    extY = lark.isNone(top) ? 0 : top;
                    extY += lark.isNone(bottom) ? 0 : bottom;
                }
                else {
                    extY = bounds.y;
                }
                var preferredWidth = bounds.width;
                var preferredHeight = bounds.height;
                width = Math.ceil(Math.max(width, extX + preferredWidth));
                height = Math.ceil(Math.max(height, extY + preferredHeight));
            }
            target.setMeasuredSize(width, height);
        }
        sys.measure = measure;
        /**
         * 一个工具方法，使用BasicLayout规则布局目标对象。
         */
        function updateDisplayList(target, unscaledWidth, unscaledHeight) {
            if (!target)
                return;
            var count = target.numChildren;
            var maxX = 0;
            var maxY = 0;
            var bounds = lark.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getChildAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                var values = layoutElement.$UIComponent;
                var hCenter = values[4 /* horizontalCenter */];
                var vCenter = values[5 /* verticalCenter */];
                var left = values[0 /* left */];
                var right = values[1 /* right */];
                var top = values[2 /* top */];
                var bottom = values[3 /* bottom */];
                var percentWidth = values[6 /* percentWidth */];
                var percentHeight = values[7 /* percentHeight */];
                var childWidth = lark.NONE;
                var childHeight = lark.NONE;
                if (!lark.isNone(left) && !lark.isNone(right)) {
                    childWidth = unscaledWidth - right - left;
                }
                else if (!lark.isNone(percentWidth)) {
                    childWidth = Math.round(unscaledWidth * Math.min(percentWidth * 0.01, 1));
                }
                if (!lark.isNone(top) && !lark.isNone(bottom)) {
                    childHeight = unscaledHeight - bottom - top;
                }
                else if (!lark.isNone(percentHeight)) {
                    childHeight = Math.round(unscaledHeight * Math.min(percentHeight * 0.01, 1));
                }
                layoutElement.setLayoutBoundsSize(childWidth, childHeight);
                layoutElement.getLayoutBounds(bounds);
                var elementWidth = bounds.width;
                var elementHeight = bounds.height;
                var childX = lark.NONE;
                var childY = lark.NONE;
                if (!lark.isNone(hCenter))
                    childX = Math.round((unscaledWidth - elementWidth) / 2 + hCenter);
                else if (!lark.isNone(left))
                    childX = left;
                else if (!lark.isNone(right))
                    childX = unscaledWidth - elementWidth - right;
                else
                    childX = bounds.x;
                if (!lark.isNone(vCenter))
                    childY = Math.round((unscaledHeight - elementHeight) / 2 + vCenter);
                else if (!lark.isNone(top))
                    childY = top;
                else if (!lark.isNone(bottom))
                    childY = unscaledHeight - elementHeight - bottom;
                else
                    childY = bounds.y;
                layoutElement.setLayoutBoundsPosition(childX, childY);
                maxX = Math.max(maxX, childX + elementWidth);
                maxY = Math.max(maxY, childY + elementHeight);
            }
            return lark.$TempPoint.setTo(maxX, maxY);
        }
        sys.updateDisplayList = updateDisplayList;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 对象的一个属性发生更改时传递到事件侦听器的事件
     */
    var PropertyEvent = (function (_super) {
        __extends(PropertyEvent, _super);
        /**
         * 创建一个属性改变事件
         */
        function PropertyEvent(type, bubbles, cancelable, property) {
            _super.call(this, type, bubbles, cancelable);
            this.property = property;
        }
        var d = __define,c=PropertyEvent;p=c.prototype;
        /**
         * 使用指定的 EventEmitter 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        PropertyEvent.emitPropertyEvent = function (target, eventType, property) {
            if (!target.hasListener(eventType)) {
                return true;
            }
            var event = lark.Event.create(PropertyEvent, eventType);
            event.property = property;
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * 属性改变
         */
        PropertyEvent.PROPERTY_CHANGE = "propertyChange";
        return PropertyEvent;
    })(lark.Event);
    swan.PropertyEvent = PropertyEvent;
    lark.registerClass(PropertyEvent, 1016 /* PropertyEvent */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 网格布局
     */
    var TileLayout = (function (_super) {
        __extends(TileLayout, _super);
        /**
         * 创建一个网格布局实例
         */
        function TileLayout() {
            _super.call(this);
            /**
             * 标记horizontalGap被显式指定过
             */
            this.explicitHorizontalGap = lark.NONE;
            this._horizontalGap = 6;
            /**
             * 标记verticalGap被显式指定过
             */
            this.explicitVerticalGap = lark.NONE;
            this._verticalGap = 6;
            this._columnCount = -1;
            this._requestedColumnCount = 0;
            this._rowCount = -1;
            this._requestedRowCount = 0;
            /**
             * 外部显式指定的列宽
             */
            this.explicitColumnWidth = lark.NONE;
            this._columnWidth = lark.NONE;
            /**
             * 外部显式指定的行高
             */
            this.explicitRowHeight = lark.NONE;
            this._rowHeight = lark.NONE;
            this._paddingLeft = 0;
            this._paddingRight = 0;
            this._paddingTop = 0;
            this._paddingBottom = 0;
            this._horizontalAlign = swan.JustifyAlign.JUSTIFY;
            this._verticalAlign = swan.JustifyAlign.JUSTIFY;
            this._columnAlign = swan.ColumnAlign.LEFT;
            this._rowAlign = swan.RowAlign.TOP;
            this._orientation = swan.TileOrientation.ROWS;
            /**
             * 缓存的最大子对象宽度
             */
            this.maxElementWidth = 0;
            /**
             * 缓存的最大子对象高度
             */
            this.maxElementHeight = 0;
            /**
             * 当前视图中的第一个元素索引
             */
            this.startIndex = -1;
            /**
             * 当前视图中的最后一个元素的索引
             */
            this.endIndex = -1;
            /**
             * 视图的第一个和最后一个元素的索引值已经计算好的标志
             */
            this.indexInViewCalculated = false;
        }
        var d = __define,c=TileLayout;p=c.prototype;
        d(p, "horizontalGap",
            /**
             * 列之间的水平空间（以像素为单位）。
             */
            function () {
                return this._horizontalGap;
            },
            function (value) {
                value = +value || 0;
                if (value === this._horizontalGap)
                    return;
                this.explicitHorizontalGap = value;
                this._horizontalGap = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "verticalGap",
            /**
             * 行之间的垂直空间（以像素为单位）。
             */
            function () {
                return this._verticalGap;
            },
            function (value) {
                value = +value || 0;
                if (value === this._verticalGap)
                    return;
                this.explicitVerticalGap = value;
                this._verticalGap = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "columnCount",
            /**
             * 实际列计数。
             */
            function () {
                return this._columnCount;
            },undefined
        );
        d(p, "requestedColumnCount",
            /**
             * 要显示的列数。设置为0表示自动确定列计数,默认值0。
             * 注意:当orientation为TileOrientation.COLUMNS(逐列排列元素)且tagert被显式设置宽度时，此属性无效。
             */
            function () {
                return this._requestedColumnCount;
            },
            function (value) {
                value = +value || 0;
                if (this._requestedColumnCount === value)
                    return;
                this._requestedColumnCount = value;
                this._columnCount = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "rowCount",
            /**
             * 实际行计数。
             */
            function () {
                return this._rowCount;
            },undefined
        );
        d(p, "requestedRowCount",
            /**
             * 要显示的行数。设置为0表示自动确定行计数,默认值0。
             * 注意:当orientation为TileOrientation.ROWS(即逐行排列元素,此为默认值)且target被显式设置高度时，此属性无效。
             */
            function () {
                return this._requestedRowCount;
            },
            function (value) {
                value = +value || 0;
                if (this._requestedRowCount == value)
                    return;
                this._requestedRowCount = value;
                this._rowCount = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "columnWidth",
            /**
             * 实际列宽（以像素为单位）。 若未显式设置，则从根据最宽的元素的宽度确定列宽度。
             */
            function () {
                return this._columnWidth;
            },
            function (value) {
                value = +value || 0;
                if (value === this._columnWidth)
                    return;
                this.explicitColumnWidth = value;
                this._columnWidth = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "rowHeight",
            /**
             * 行高（以像素为单位）。 如果未显式设置，则从元素的高度的最大值确定行高度。
             */
            function () {
                return this._rowHeight;
            },
            function (value) {
                value = +value || 0;
                if (value === this._rowHeight)
                    return;
                this.explicitRowHeight = value;
                this._rowHeight = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingLeft",
            /**
             * 容器的左边缘与布局元素的左边缘之间的最少像素数,默认值：0。
             */
            function () {
                return this._paddingLeft;
            },
            function (value) {
                value = +value || 0;
                if (this._paddingLeft == value)
                    return;
                this._paddingLeft = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingRight",
            /**
             * 容器的右边缘与布局元素的右边缘之间的最少像素数,默认值：0。
             */
            function () {
                return this._paddingRight;
            },
            function (value) {
                value = +value || 0;
                if (this._paddingRight === value)
                    return;
                this._paddingRight = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingTop",
            /**
             * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,默认值：0。
             */
            function () {
                return this._paddingTop;
            },
            function (value) {
                value = +value || 0;
                if (this._paddingTop == value)
                    return;
                this._paddingTop = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingBottom",
            /**
             * 容器的底边缘与最后一个布局元素的底边缘之间的像素数,默认值：0。
             */
            function () {
                return this._paddingBottom;
            },
            function (value) {
                value = +value || 0;
                if (this._paddingBottom === value)
                    return;
                this._paddingBottom = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "horizontalAlign",
            /**
             * 指定如何在水平方向上对齐单元格内的元素。
             * 支持的值有 HorizontalAlign.LEFT、HorizontalAlign.CENTER、
             * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
             * 默认值：JustifyAlign.JUSTIFY
             */
            function () {
                return this._horizontalAlign;
            },
            function (value) {
                if (this._horizontalAlign == value)
                    return;
                this._horizontalAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "verticalAlign",
            /**
             * 指定如何在垂直方向上对齐单元格内的元素。
             * 支持的值有 VerticalAlign.TOP、VerticalAlign.MIDDLE、
             * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
             * 默认值：JustifyAlign.JUSTIFY。
             */
            function () {
                return this._verticalAlign;
            },
            function (value) {
                if (this._verticalAlign == value)
                    return;
                this._verticalAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "columnAlign",
            /**
             * 指定如何将完全可见列与容器宽度对齐。
             * 设置为 ColumnAlign.LEFT 时，它会关闭列两端对齐。在容器的最后一列和右边缘之间可能存在部分可见的列或空白。这是默认值。
             * 设置为 ColumnAlign.JUSTIFY_USING_GAP 时，horizontalGap 的实际值将增大，
             * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。仅存在一个完全可见列时，
             * horizontalGap 的实际值将增大，这样它会将任何部分可见列推到容器的右边缘之外。
             * 请注意显式设置 horizontalGap 属性不会关闭两端对齐。它仅确定初始间隙值。两端对齐可能会增大它。
             * 设置为 ColumnAlign.JUSTIFY_USING_WIDTH 时，columnWidth 的实际值将增大，
             * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。请注意显式设置 columnWidth 属性不会关闭两端对齐。
             * 它仅确定初始列宽度值。两端对齐可能会增大它。
             */
            function () {
                return this._columnAlign;
            },
            function (value) {
                if (this._columnAlign == value)
                    return;
                this._columnAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "rowAlign",
            /**
             * 指定如何将完全可见行与容器高度对齐。
             * 设置为 RowAlign.TOP 时，它会关闭列两端对齐。在容器的最后一行和底边缘之间可能存在部分可见的行或空白。这是默认值。
             *
             * 设置为 RowAlign.JUSTIFY_USING_GAP 时，verticalGap 的实际值会增大，
             * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。仅存在一个完全可见行时，verticalGap 的值会增大，
             * 这样它会将任何部分可见行推到容器的底边缘之外。请注意，显式设置 verticalGap
             * 不会关闭两端对齐，而只是确定初始间隙值。两端对齐接着可以增大它。
             *
             * 设置为 RowAlign.JUSTIFY_USING_HEIGHT 时，rowHeight 的实际值会增大，
             * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。请注意，显式设置 rowHeight
             * 不会关闭两端对齐，而只是确定初始行高度值。两端对齐接着可以增大它。
             */
            function () {
                return this._rowAlign;
            },
            function (value) {
                if (this._rowAlign == value)
                    return;
                this._rowAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "orientation",
            /**
             * 指定是逐行还是逐列排列元素。默认值：TileOrientation.ROWS
             */
            function () {
                return this._orientation;
            },
            function (value) {
                if (this._orientation == value)
                    return;
                this._orientation = value;
                this.invalidateTargetLayout();
            }
        );
        /**
         * 标记目标容器的尺寸和显示列表失效
         */
        p.invalidateTargetLayout = function () {
            var target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        };
        /**
         * 基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        p.measure = function () {
            var target = this.$target;
            if (!target)
                return;
            var savedColumnCount = this._columnCount;
            var savedRowCount = this._rowCount;
            var savedColumnWidth = this._columnWidth;
            var savedRowHeight = this._rowHeight;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var values = target.$UIComponent;
            this.calculateRowAndColumn(values[8 /* explicitWidth */], values[9 /* explicitHeight */]);
            var columnCount = this._requestedColumnCount > 0 ? this._requestedColumnCount : this._columnCount;
            var rowCount = this._requestedRowCount > 0 ? this._requestedRowCount : this._rowCount;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            if (columnCount > 0) {
                measuredWidth = columnCount * (this._columnWidth + horizontalGap) - horizontalGap;
            }
            if (rowCount > 0) {
                measuredHeight = rowCount * (this._rowHeight + verticalGap) - verticalGap;
            }
            var hPadding = this._paddingLeft + this._paddingRight;
            var vPadding = this._paddingTop + this._paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
            this._columnCount = savedColumnCount;
            this._rowCount = savedRowCount;
            this._columnWidth = savedColumnWidth;
            this._rowHeight = savedRowHeight;
        };
        /**
         * 计算行和列的尺寸及数量
         */
        p.calculateRowAndColumn = function (explicitWidth, explicitHeight) {
            var target = this.$target;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            var numElements = target.numElements;
            var count = numElements;
            for (var index = 0; index < count; index++) {
                var layoutElement = (target.getElementAt(index));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
            }
            if (numElements == 0) {
                this._rowCount = this._columnCount = 0;
                return;
            }
            if (lark.isNone(this.explicitColumnWidth) || lark.isNone(this.explicitRowHeight))
                this.updateMaxElementSize();
            if (lark.isNone(this.explicitColumnWidth)) {
                this._columnWidth = this.maxElementWidth;
            }
            else {
                this._columnWidth = this.explicitColumnWidth;
            }
            if (lark.isNone(this.explicitRowHeight)) {
                this._rowHeight = this.maxElementHeight;
            }
            else {
                this._rowHeight = this.explicitRowHeight;
            }
            var itemWidth = this._columnWidth + horizontalGap;
            //防止出现除数为零的情况
            if (itemWidth <= 0)
                itemWidth = 1;
            var itemHeight = this._rowHeight + verticalGap;
            if (itemHeight <= 0)
                itemHeight = 1;
            var orientedByColumns = (this._orientation == swan.TileOrientation.COLUMNS);
            var widthHasSet = !lark.isNone(explicitWidth);
            var heightHasSet = !lark.isNone(explicitHeight);
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this._requestedColumnCount > 0 || this._requestedRowCount > 0) {
                if (this._requestedRowCount > 0)
                    this._rowCount = Math.min(this._requestedRowCount, numElements);
                if (this._requestedColumnCount > 0)
                    this._columnCount = Math.min(this._requestedColumnCount, numElements);
            }
            else if (!widthHasSet && !heightHasSet) {
                var side = Math.sqrt(numElements * itemWidth * itemHeight);
                if (orientedByColumns) {
                    this._rowCount = Math.max(1, Math.round(side / itemHeight));
                }
                else {
                    this._columnCount = Math.max(1, Math.round(side / itemWidth));
                }
            }
            else if (widthHasSet && (!heightHasSet || !orientedByColumns)) {
                var targetWidth = Math.max(0, explicitWidth - paddingL - paddingR);
                this._columnCount = Math.floor((targetWidth + horizontalGap) / itemWidth);
                this._columnCount = Math.max(1, Math.min(this._columnCount, numElements));
            }
            else {
                var targetHeight = Math.max(0, explicitHeight - paddingT - paddingB);
                this._rowCount = Math.floor((targetHeight + verticalGap) / itemHeight);
                this._rowCount = Math.max(1, Math.min(this._rowCount, numElements));
            }
            if (this._rowCount == -1)
                this._rowCount = Math.max(1, Math.ceil(numElements / this._columnCount));
            if (this._columnCount == -1)
                this._columnCount = Math.max(1, Math.ceil(numElements / this._rowCount));
            if (this._requestedColumnCount > 0 && this._requestedRowCount > 0) {
                if (this._orientation == swan.TileOrientation.ROWS)
                    this._rowCount = Math.max(1, Math.ceil(numElements / this._requestedColumnCount));
                else
                    this._columnCount = Math.max(1, Math.ceil(numElements / this._requestedRowCount));
            }
        };
        /**
         * 更新最大子对象尺寸
         */
        p.updateMaxElementSize = function () {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.maxElementWidth = Math.max(this.maxElementWidth, this.$typicalWidth);
                this.maxElementHeight = Math.max(this.maxElementHeight, this.$typicalHeight);
                this.doUpdateMaxElementSize(this.startIndex, this.endIndex);
            }
            else {
                this.doUpdateMaxElementSize(0, this.$target.numElements - 1);
            }
        };
        /**
         * 更新虚拟布局的最大子对象尺寸
         */
        p.doUpdateMaxElementSize = function (startIndex, endIndex) {
            var maxElementWidth = this.maxElementWidth;
            var maxElementHeight = this.maxElementHeight;
            var bounds = lark.$TempRectangle;
            var target = this.$target;
            if ((startIndex != -1) && (endIndex != -1)) {
                for (var index = startIndex; index <= endIndex; index++) {
                    var elt = target.getElementAt(index);
                    if (!lark.is(elt, 1001 /* UIComponent */) || !elt.$includeInLayout) {
                        continue;
                    }
                    elt.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
            }
            this.maxElementWidth = maxElementWidth;
            this.maxElementHeight = maxElementHeight;
        };
        /**
         * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
         */
        p.clearVirtualLayoutCache = function () {
            _super.prototype.clearVirtualLayoutCache.call(this);
            this.maxElementWidth = 0;
            this.maxElementHeight = 0;
        };
        /**
         * scrollV 或 scrollH 属性更改时调用
         */
        p.scrollPositionChanged = function () {
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.$target.invalidateDisplayList();
                }
            }
        };
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        p.getIndexInView = function () {
            if (!this.$target || this.$target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var target = this.$target;
            var numElements = target.numElements;
            if (!this.$useVirtualLayout) {
                this.startIndex = 0;
                this.endIndex = numElements - 1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] == 0 || values[11 /* height */] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            var paddingL = this._paddingLeft;
            var paddingT = this._paddingTop;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            if (this._orientation == swan.TileOrientation.COLUMNS) {
                var itemWidth = this._columnWidth + horizontalGap;
                if (itemWidth <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleX = target.scrollH;
                var maxVisibleX = minVisibleX + values[10 /* width */];
                var startColumn = Math.floor((minVisibleX - paddingL) / itemWidth);
                if (startColumn < 0)
                    startColumn = 0;
                var endColumn = Math.ceil((maxVisibleX - paddingL) / itemWidth);
                if (endColumn < 0)
                    endColumn = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startColumn * this._rowCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endColumn * this._rowCount - 1));
            }
            else {
                var itemHeight = this._rowHeight + verticalGap;
                if (itemHeight <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleY = target.scrollV;
                var maxVisibleY = minVisibleY + values[11 /* height */];
                var startRow = Math.floor((minVisibleY - paddingT) / itemHeight);
                if (startRow < 0)
                    startRow = 0;
                var endRow = Math.ceil((maxVisibleY - paddingT) / itemHeight);
                if (endRow < 0)
                    endRow = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startRow * this._columnCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endRow * this._columnCount - 1));
            }
            return this.startIndex != oldStartIndex || this.endIndex != oldEndIndex;
        };
        /**
         * 调整目标的元素的大小并定位这些元素
         */
        p.updateDisplayList = function (width, height) {
            _super.prototype.updateDisplayList.call(this, width, height);
            if (!this.$target)
                return;
            var target = this.$target;
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this.indexInViewCalculated) {
                this.indexInViewCalculated = false;
            }
            else {
                this.calculateRowAndColumn(width, height);
                if (this._rowCount == 0 || this._columnCount == 0) {
                    target.setContentSize(paddingL + paddingR, paddingT + paddingB);
                    return;
                }
                this.adjustForJustify(width, height);
                this.getIndexInView();
            }
            if (this.$useVirtualLayout) {
                this.calculateRowAndColumn(width, height);
                this.adjustForJustify(width, height);
            }
            if (this.startIndex == -1 || this.endIndex == -1) {
                target.setContentSize(0, 0);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            var elt;
            var x;
            var y;
            var columnIndex;
            var rowIndex;
            var orientedByColumns = (this._orientation == swan.TileOrientation.COLUMNS);
            var index = this.startIndex;
            var horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            var rowCount = this._rowCount;
            var columnCount = this._columnCount;
            var columnWidth = this._columnWidth;
            var rowHeight = this._rowHeight;
            for (var i = this.startIndex; i <= endIndex; i++) {
                if (this.$useVirtualLayout)
                    elt = target.getElementAt(i);
                if (!lark.is(elt, 1001 /* UIComponent */) || !elt.$includeInLayout) {
                    continue;
                }
                if (orientedByColumns) {
                    columnIndex = Math.ceil((index + 1) / rowCount) - 1;
                    rowIndex = Math.ceil((index + 1) % rowCount) - 1;
                    if (rowIndex == -1)
                        rowIndex = rowCount - 1;
                }
                else {
                    columnIndex = Math.ceil((index + 1) % columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = columnCount - 1;
                    rowIndex = Math.ceil((index + 1) / columnCount) - 1;
                }
                x = columnIndex * (columnWidth + horizontalGap) + paddingL;
                y = rowIndex * (rowHeight + verticalGap) + paddingT;
                this.sizeAndPositionElement(elt, x, y, columnWidth, rowHeight);
                index++;
            }
            var hPadding = paddingL + paddingR;
            var vPadding = paddingT + paddingB;
            var contentWidth = (columnWidth + horizontalGap) * columnCount - horizontalGap;
            var contentHeight = (rowHeight + verticalGap) * rowCount - verticalGap;
            target.setContentSize(contentWidth + hPadding, contentHeight + vPadding);
        };
        /**
         * 为单个元素布局
         */
        p.sizeAndPositionElement = function (element, cellX, cellY, cellWidth, cellHeight) {
            var elementWidth = lark.NONE;
            var elementHeight = lark.NONE;
            var values = element.$UIComponent;
            if (this._horizontalAlign == swan.JustifyAlign.JUSTIFY)
                elementWidth = cellWidth;
            else if (!lark.isNone(values[6 /* percentWidth */]))
                elementWidth = cellWidth * values[6 /* percentWidth */] * 0.01;
            if (this._verticalAlign == swan.JustifyAlign.JUSTIFY)
                elementHeight = cellHeight;
            else if (!lark.isNone(values[7 /* percentHeight */]))
                elementHeight = cellHeight * values[7 /* percentHeight */] * 0.01;
            element.setLayoutBoundsSize(Math.round(elementWidth), Math.round(elementHeight));
            var x = cellX;
            var bounds = lark.$TempRectangle;
            element.getLayoutBounds(bounds);
            switch (this._horizontalAlign) {
                case lark.HorizontalAlign.RIGHT:
                    x += cellWidth - bounds.width;
                    break;
                case lark.HorizontalAlign.CENTER:
                    x = cellX + (cellWidth - bounds.width) / 2;
                    break;
            }
            var y = cellY;
            switch (this._verticalAlign) {
                case lark.VerticalAlign.BOTTOM:
                    y += cellHeight - bounds.height;
                    break;
                case lark.VerticalAlign.MIDDLE:
                    y += (cellHeight - bounds.height) / 2;
                    break;
            }
            element.setLayoutBoundsPosition(Math.round(x), Math.round(y));
        };
        /**
         * 为两端对齐调整间隔或格子尺寸
         */
        p.adjustForJustify = function (width, height) {
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            if (!lark.isNone(this.explicitVerticalGap))
                this._verticalGap = this.explicitVerticalGap;
            if (!lark.isNone(this.explicitHorizontalGap))
                this._horizontalGap = this.explicitHorizontalGap;
            this._verticalGap = lark.isNone(this._verticalGap) ? 0 : this._verticalGap;
            this._horizontalGap = lark.isNone(this._horizontalGap) ? 0 : this._horizontalGap;
            var offsetY = targetHeight - this._rowHeight * this._rowCount;
            var offsetX = targetWidth - this._columnWidth * this._columnCount;
            var gapCount;
            if (offsetY > 0) {
                if (this._rowAlign == swan.RowAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._rowCount - 1);
                    this._verticalGap = offsetY / gapCount;
                }
                else if (this._rowAlign == swan.RowAlign.JUSTIFY_USING_HEIGHT) {
                    if (this._rowCount > 0) {
                        this._rowHeight += (offsetY - (this._rowCount - 1) * this._verticalGap) / this._rowCount;
                    }
                }
            }
            if (offsetX > 0) {
                if (this._columnAlign == swan.ColumnAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._columnCount - 1);
                    this._horizontalGap = offsetX / gapCount;
                }
                else if (this._columnAlign == swan.ColumnAlign.JUSTIFY_USING_WIDTH) {
                    if (this._columnCount > 0) {
                        this._columnWidth += (offsetX - (this._columnCount - 1) * this._horizontalGap) / this._columnCount;
                    }
                }
            }
        };
        return TileLayout;
    })(swan.LayoutBase);
    swan.TileLayout = TileLayout;
    lark.registerClass(TileLayout, 1046 /* TileLayout */);
    if (DEBUG) {
        lark.$markReadOnly(TileLayout.prototype, "columnCount");
        lark.$markReadOnly(TileLayout.prototype, "rowCount");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 线性布局基类，通常作为 HorizontalLayout 和 VerticalLayout 的父类。
     */
    var LinearLayoutBase = (function (_super) {
        __extends(LinearLayoutBase, _super);
        function LinearLayoutBase() {
            _super.apply(this, arguments);
            this.$horizontalAlign = "left";
            this.$verticalAlign = "top";
            this.$gap = 6;
            this.$paddingLeft = 0;
            this.$paddingRight = 0;
            this.$paddingTop = 0;
            this.$paddingBottom = 0;
            /**
             * 虚拟布局使用的子对象尺寸缓存
             */
            this.elementSizeTable = [];
            /**
             * 虚拟布局使用的当前视图中的第一个元素索引
             */
            this.startIndex = -1;
            /**
             * 虚拟布局使用的当前视图中的最后一个元素的索引
             */
            this.endIndex = -1;
            /**
             * 视图的第一个和最后一个元素的索引值已经计算好的标志
             */
            this.indexInViewCalculated = false;
            /**
             * 子对象最大宽度
             */
            this.maxElementSize = 0;
        }
        var d = __define,c=LinearLayoutBase;p=c.prototype;
        d(p, "horizontalAlign",
            /**
             * 布局元素的水平对齐策略。请使用 HorizontalAlign 定义的常量。
             */
            function () {
                return this.$horizontalAlign;
            },
            function (value) {
                if (this.$horizontalAlign == value)
                    return;
                this.$horizontalAlign = value;
                if (this.$target)
                    this.$target.invalidateDisplayList();
            }
        );
        d(p, "verticalAlign",
            /**
             * 布局元素的竖直对齐策略。请使用 VerticalAlign 定义的常量。
             */
            function () {
                return this.$verticalAlign;
            },
            function (value) {
                if (this.$verticalAlign == value)
                    return;
                this.$verticalAlign = value;
                if (this.$target)
                    this.$target.invalidateDisplayList();
            }
        );
        d(p, "gap",
            /**
             * 布局元素之间的间隔空间（以像素为单位）
             */
            function () {
                return this.$gap;
            },
            function (value) {
                value = +value || 0;
                if (this.$gap === value)
                    return;
                this.$gap = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingLeft",
            /**
             * 容器的左边缘与布局元素的左边缘之间的最少像素数,默认值：0。
             */
            function () {
                return this.$paddingLeft;
            },
            function (value) {
                value = +value || 0;
                if (this.$paddingLeft === value)
                    return;
                this.$paddingLeft = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingRight",
            /**
             * 容器的右边缘与布局元素的右边缘之间的最少像素数,默认值：0。
             */
            function () {
                return this.$paddingRight;
            },
            function (value) {
                value = +value || 0;
                if (this.$paddingRight === value)
                    return;
                this.$paddingRight = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingTop",
            /**
             * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,默认值：0。
             */
            function () {
                return this.$paddingTop;
            },
            function (value) {
                value = +value || 0;
                if (this.$paddingTop === value)
                    return;
                this.$paddingTop = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingBottom",
            /**
             * 容器的底边缘与最后一个布局元素的底边缘之间的像素数0,默认值：0。
             */
            function () {
                return this.$paddingBottom;
            },
            function (value) {
                value = +value || 0;
                if (this.$paddingBottom === value)
                    return;
                this.$paddingBottom = value;
                this.invalidateTargetLayout();
            }
        );
        /**
         * 标记目标容器的尺寸和显示列表失效
         */
        p.invalidateTargetLayout = function () {
            var target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        };
        /**
         * 基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        p.measure = function () {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.measureVirtual();
            }
            else {
                this.measureReal();
            }
        };
        /**
         * 测量使用真实布局的尺寸
         */
        p.measureReal = function () {
        };
        /**
         * 测量使用虚拟布局的尺寸
         */
        p.measureVirtual = function () {
        };
        /**
         * 调整目标的元素的大小并定位这些元素
         */
        p.updateDisplayList = function (width, height) {
            var target = this.$target;
            if (!target)
                return;
            if (target.numElements == 0) {
                target.setContentSize(Math.ceil(this.$paddingLeft + this.$paddingRight), Math.ceil(this.$paddingTop + this.$paddingBottom));
                return;
            }
            if (this.$useVirtualLayout) {
                this.updateDisplayListVirtual(width, height);
            }
            else {
                this.updateDisplayListReal(width, height);
            }
        };
        /**
         * 获取指定索引的起始位置
         */
        p.getStartPosition = function (index) {
            return 0;
        };
        /**
         * 获取指定索引的元素尺寸
         */
        p.getElementSize = function (index) {
            return 0;
        };
        /**
         * 获取缓存的子对象尺寸总和
         */
        p.getElementTotalSize = function () {
            return 0;
        };
        p.elementRemoved = function (index) {
            if (!this.$useVirtualLayout)
                return;
            _super.prototype.elementRemoved.call(this, index);
            this.elementSizeTable.splice(index, 1);
        };
        /**
         * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
         */
        p.clearVirtualLayoutCache = function () {
            if (!this.$useVirtualLayout)
                return;
            this.elementSizeTable = [];
            this.maxElementSize = 0;
        };
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        p.findIndexAt = function (x, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var elementX = this.getStartPosition(index);
            var elementWidth = this.getElementSize(index);
            if ((x >= elementX) && (x < elementX + elementWidth + this.$gap))
                return index;
            else if (i0 == i1)
                return -1;
            else if (x < elementX)
                return this.findIndexAt(x, i0, Math.max(i0, index - 1));
            else
                return this.findIndexAt(x, Math.min(index + 1, i1), i1);
        };
        /**
         * scrollV 或 scrollH 属性更改时调用
         */
        p.scrollPositionChanged = function () {
            _super.prototype.scrollPositionChanged.call(this);
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.target.invalidateDisplayList();
                }
            }
        };
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        p.getIndexInView = function () {
            return false;
        };
        /**
         * 更新使用虚拟布局的显示列表
         */
        p.updateDisplayListVirtual = function (width, height) {
        };
        /**
         * 更新使用真实布局的显示列表
         */
        p.updateDisplayListReal = function (width, height) {
        };
        /**
         * 为每个可变尺寸的子项分配空白区域
         */
        p.flexChildrenProportionally = function (spaceForChildren, spaceToDistribute, totalPercent, childInfoArray) {
            var numElements = childInfoArray.length;
            var done;
            do {
                done = true;
                var unused = spaceToDistribute - (spaceForChildren * totalPercent / 100);
                if (unused > 0)
                    spaceToDistribute -= unused;
                else
                    unused = 0;
                var spacePerPercent = spaceToDistribute / totalPercent;
                for (var i = 0; i < numElements; i++) {
                    var childInfo = childInfoArray[i];
                    var size = childInfo.percent * spacePerPercent;
                    if (size < childInfo.min) {
                        var min = childInfo.min;
                        childInfo.size = min;
                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;
                        totalPercent -= childInfo.percent;
                        if (unused >= min) {
                            unused -= min;
                        }
                        else {
                            spaceToDistribute -= min - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else if (size > childInfo.max) {
                        var max = childInfo.max;
                        childInfo.size = max;
                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;
                        totalPercent -= childInfo.percent;
                        if (unused >= max) {
                            unused -= max;
                        }
                        else {
                            spaceToDistribute -= max - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else {
                        childInfo.size = size;
                    }
                }
            } while (!done);
        };
        return LinearLayoutBase;
    })(swan.LayoutBase);
    swan.LinearLayoutBase = LinearLayoutBase;
    lark.registerClass(LinearLayoutBase, 1020 /* LinearLayoutBase */);
})(swan || (swan = {}));
var swan;
(function (swan) {
    var sys;
    (function (sys) {
        var ChildInfo = (function () {
            function ChildInfo() {
                this.layoutElement = null;
                this.size = 0;
                this.percent = lark.NONE;
                this.min = lark.NONE;
                this.max = lark.NONE;
            }
            var d = __define,c=ChildInfo;p=c.prototype;
            return ChildInfo;
        })();
        sys.ChildInfo = ChildInfo;
    })(sys = swan.sys || (swan.sys = {}));
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var UIImpl = swan.sys.UIComponentImpl;
    var EditableText = (function (_super) {
        __extends(EditableText, _super);
        function EditableText() {
            _super.call(this);
            this._widthConstraint = lark.NONE;
            this.initializeUIValues();
        }
        var d = __define,c=EditableText;p=c.prototype;
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        p.$setWidth = function (value) {
            _super.prototype.$setWidth.call(this, value);
            UIImpl.prototype.$setWidth.call(this, value);
        };
        p.$setHeight = function (value) {
            _super.prototype.$setHeight.call(this, value);
            UIImpl.prototype.$setHeight.call(this, value);
        };
        p.$setText = function (value) {
            _super.prototype.$setText.call(this, value);
            swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "text");
        };
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        p.createChildren = function () {
        };
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        p.childrenCreated = function () {
        };
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        p.commitProperties = function () {
        };
        /**
         * 测量组件尺寸
         */
        p.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$TextField;
            var oldWidth = textValues[3 /* textFieldWidth */];
            var availableWidth = lark.NONE;
            if (!lark.isNone(this._widthConstraint)) {
                availableWidth = this._widthConstraint;
                this._widthConstraint = lark.NONE;
            }
            else if (!lark.isNone(values[8 /* explicitWidth */])) {
                availableWidth = values[8 /* explicitWidth */];
            }
            else if (values[13 /* maxWidth */] != 100000) {
                availableWidth = values[13 /* maxWidth */];
            }
            _super.prototype.$setWidth.call(this, availableWidth);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
        };
        /**
         * 更新显示列表
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * 标记提交过需要延迟应用的属性
         */
        p.invalidateProperties = function () {
        };
        /**
         * 验证组件的属性
         */
        p.validateProperties = function () {
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        p.invalidateSize = function () {
        };
        /**
         * 验证组件的尺寸
         */
        p.validateSize = function (recursive) {
        };
        /**
         * 标记需要验证显示列表
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        p.validateDisplayList = function () {
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        p.validateNow = function () {
        };
        /**
         * 设置组件的布局宽高
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (lark.isNone(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                return;
            }
            var values = this.$UIComponent;
            if (!lark.isNone(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this._widthConstraint = layoutWidth;
            this.invalidateSize();
        };
        /**
         * 设置组件的布局位置
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getPreferredBounds = function (bounds) {
        };
        return EditableText;
    })(lark.TextInput);
    swan.EditableText = EditableText;
    swan.sys.implementUIComponent(EditableText, lark.TextInput);
    swan.registerBindable(EditableText.prototype, "text");
    lark.registerClass(EditableText, 1047 /* EditableText */, [1001 /* UIComponent */]);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 皮肤基类。通常情况下，您不需要手动创建这个类的实例，而是通过解析EXML文件后自动生成。
     */
    var Skin = (function (_super) {
        __extends(Skin, _super);
        function Skin() {
            _super.apply(this, arguments);
            /**
             * 皮肤的最大宽度。仅影响主机组件的测量结果。
             */
            this.maxWidth = 100000;
            /**
             * 皮肤的最小宽度,此属性设置为大于maxWidth的值时无效。仅影响主机组件的测量结果。
             */
            this.minWidth = 0;
            /**
             * 皮肤的最大高度。仅影响主机组件的测量结果。
             */
            this.maxHeight = 100000;
            /**
             * 皮肤的最小高度,此属性设置为大于maxHeight的值时无效。仅影响主机组件的测量结果。
             */
            this.minHeight = 0;
            /**
             * 皮肤显式设置宽度,设置为NONE表示不显式设置。仅影响主机组件的测量结果。
             */
            this.width = lark.NONE;
            /**
             * 皮肤显式设置高度,设置为NONE表示不显式设置。仅影响主机组件的测量结果。
             */
            this.height = lark.NONE;
            this.$elementsContent = [];
            this._hostComponent = null;
            this.$stateValues = new swan.sys.StateValues();
        }
        var d = __define,c=Skin;p=c.prototype;
        d(p, "elementsContent",undefined,
            function (value) {
                this.$elementsContent = value;
            }
        );
        d(p, "hostComponent",
            /**
             * 此皮肤附加到的主机组件
             */
            function () {
                return this._hostComponent;
            },
            function (value) {
                if (this._hostComponent == value)
                    return;
                this._hostComponent = value;
                var values = this.$stateValues;
                values.parent = value;
                if (value) {
                    this.commitCurrentState();
                    if (!this.$stateValues.intialized) {
                        if (value.$stage) {
                            this.initializeStates(value.$stage);
                        }
                        else {
                            value.once(lark.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                        }
                    }
                }
            }
        );
        p.onAddedToStage = function (event) {
            this.initializeStates(this._hostComponent.$stage);
        };
        return Skin;
    })(lark.LarkObject);
    swan.Skin = Skin;
    swan.sys.mixin(Skin, swan.sys.StateClient);
    swan.registerProperty(Skin, "elementsContent", "Array", true);
    swan.registerProperty(Skin, "states", "State[]");
    lark.registerClass(Skin, 1012 /* Skin */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var UIImpl = swan.sys.UIComponentImpl;
    /**
     * Label 是可以呈示一行或多行统一格式文本的UI组件。要显示的文本由 text 属性确定。文本格式由样式属性指定，例如 fontFamily 和 fontSize。
     * 因为 Label 运行速度快且占用内存少，所以它特别适合用于显示多个小型非交互式文本的情况，例如，项呈示器和 Button 外观中的标签。
     * 在 Label 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。
     * 如果没有为 Label 指定宽度，则由这些显式换行符确定的最长行确定 Label 的宽度。
     * 如果指定了宽度，则指定文本将在组件边界的右边缘换行，如果文本扩展到低于组件底部，则将被剪切。
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(text) {
            _super.call(this, text);
            this._widthConstraint = lark.NONE;
            this.initializeUIValues();
        }
        var d = __define,c=Label;p=c.prototype;
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        p.$setWidth = function (value) {
            _super.prototype.$setWidth.call(this, value);
            UIImpl.prototype.$setWidth.call(this, value);
        };
        p.$setHeight = function (value) {
            _super.prototype.$setHeight.call(this, value);
            UIImpl.prototype.$setHeight.call(this, value);
        };
        p.$setText = function (value) {
            _super.prototype.$setText.call(this, value);
            swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "text");
        };
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        p.createChildren = function () {
        };
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        p.childrenCreated = function () {
        };
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        p.commitProperties = function () {
        };
        /**
         * 测量组件尺寸
         */
        p.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$TextField;
            var oldWidth = textValues[3 /* textFieldWidth */];
            var availableWidth = lark.NONE;
            if (!lark.isNone(this._widthConstraint)) {
                availableWidth = this._widthConstraint;
                this._widthConstraint = lark.NONE;
            }
            else if (!lark.isNone(values[8 /* explicitWidth */])) {
                availableWidth = values[8 /* explicitWidth */];
            }
            else if (values[13 /* maxWidth */] != 100000) {
                availableWidth = values[13 /* maxWidth */];
            }
            _super.prototype.$setWidth.call(this, availableWidth);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
        };
        /**
         * 更新显示列表
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * 标记提交过需要延迟应用的属性
         */
        p.invalidateProperties = function () {
        };
        /**
         * 验证组件的属性
         */
        p.validateProperties = function () {
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        p.invalidateSize = function () {
        };
        /**
         * 验证组件的尺寸
         */
        p.validateSize = function (recursive) {
        };
        /**
         * 标记需要验证显示列表
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        p.validateDisplayList = function () {
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        p.validateNow = function () {
        };
        /**
         * 设置组件的布局宽高
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (lark.isNone(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                return;
            }
            var values = this.$UIComponent;
            if (!lark.isNone(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this._widthConstraint = layoutWidth;
            this.invalidateSize();
        };
        /**
         * 设置组件的布局位置
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Label;
    })(lark.TextField);
    swan.Label = Label;
    swan.sys.implementUIComponent(Label, lark.TextField);
    swan.registerBindable(Label.prototype, "text");
    lark.registerClass(Label, 1010 /* Label */, [1001 /* UIComponent */]);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    var parsedClasses = {};
    /**
     * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。
     *
     * @event lark.Event.COMPLETE 当设置skinName为外部exml文件路径时，加载并完成EXML解析后调度。
     */
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.call(this);
            this.initializeUIValues();
            this.$Component = {
                0: null,
                1: null,
                2: "",
                3: true,
                4: false,
                5: false,
                6: false,
                7: false,
                8: null //skin
            };
        }
        var d = __define,c=Component;p=c.prototype;
        d(p, "hostComponentKey",
            /**
             * 主机组件标识符。用于唯一确定一个组件的名称。通常用于在主题中查询默认皮肤名。
             *
             * @see swan.Theme#getSkinName()
             */
            function () {
                return this.$Component[0 /* hostComponentKey */];
            },
            function (value) {
                this.$Component[0 /* hostComponentKey */] = value;
            }
        );
        d(p, "skinName",
            /**
             * 皮肤标识符。有效值可为：皮肤类定义,皮肤类名,皮肤实例,EXML文件内容,或外部EXML文件路径，
             */
            function () {
                return this.$Component[1 /* skinName */];
            },
            function (value) {
                var values = this.$Component;
                values[5 /* skinNameExplicitlySet */] = true;
                if (values[1 /* skinName */] == value)
                    return;
                values[1 /* skinName */] = value;
                this.$parseSkinName();
            }
        );
        /**
         * 解析skinName
         */
        p.$parseSkinName = function () {
            var skinName = this.skinName;
            var skin;
            if (skinName) {
                if (skinName.prototype) {
                    skin = new skinName();
                }
                else if (typeof (skinName) == "string") {
                    var clazz;
                    var text = skinName.trim();
                    if (text.charAt(0) == "<") {
                        clazz = EXML.parse(text);
                    }
                    else if (text.substr(text.length - 5, 5).toLowerCase() == ".exml") {
                        clazz = parsedClasses[skinName];
                        if (!clazz) {
                            EXML.load(skinName, this.onExmlLoaded, this);
                            return;
                        }
                        this.emitWith(lark.Event.COMPLETE);
                    }
                    else {
                        clazz = lark.getDefinitionByName(skinName);
                    }
                    if (clazz) {
                        skin = new clazz();
                    }
                }
                else {
                    skin = skinName;
                }
            }
            this.setSkin(skin);
        };
        p.onExmlLoaded = function (clazz, url) {
            parsedClasses[url] = clazz;
            if (this.skinName != url) {
                return;
            }
            var skin = new clazz();
            this.setSkin(skin);
            this.emitWith(lark.Event.COMPLETE);
        };
        d(p, "skin",
            /**
             * [只读]皮肤对象实例。
             */
            function () {
                return this.$Component[8 /* skin */];
            },undefined
        );
        /**
         * 设置皮肤实例
         */
        p.setSkin = function (skin) {
            if (!lark.is(skin, 1012 /* Skin */)) {
                skin = null;
                DEBUG && lark.$error(2202);
            }
            var values = this.$Component;
            var oldSkin = values[8 /* skin */];
            if (oldSkin) {
                var skinParts = oldSkin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    if (this[partName]) {
                        this.setSkinPart(partName, null);
                    }
                }
                var children = oldSkin.$elementsContent;
                if (children) {
                    length = children.length;
                    for (var i = 0; i < length; i++) {
                        var child = children[i];
                        if (child.$parent == this) {
                            this.removeChild(child);
                        }
                    }
                }
                oldSkin.hostComponent = null;
            }
            values[8 /* skin */] = skin;
            if (skin) {
                var skinParts = skin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    var instance = skin[partName];
                    if (instance) {
                        this.setSkinPart(partName, instance);
                    }
                }
                children = skin.$elementsContent;
                if (children) {
                    length = children.length;
                    for (i = 0; i < length; i++) {
                        this.addChild(children[i]);
                    }
                }
                skin.hostComponent = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * 关联一个对象到逻辑组件的指定皮肤部件上。通常您不需要手动调用此方法，当使用EXML文件作为组件皮肤，此方法将会被自动调用。
         * 在运行时，EXML文件内声明的id名称将作为此方法的partName参数，而id所对应的节点对象，将作为此方法的instance参数被依次传入。
         * @param partName 皮肤部件名称
         * @param instance 皮肤部件实例
         */
        p.setSkinPart = function (partName, instance) {
            var oldInstance = this[partName];
            if (oldInstance) {
                this.partRemoved(partName, oldInstance);
            }
            this[partName] = instance;
            if (instance) {
                this.partAdded(partName, instance);
            }
        };
        /**
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称
         * @param instance 要附加的皮肤部件实例
         */
        p.partAdded = function (partName, instance) {
        };
        /**
         * 子类覆盖此方法，以在皮肤部件从逻辑组件卸载时对其执行一些清理操作，例如移除事件监听，断开缓存的引用等。
         * @param partName 要卸载的皮肤部件名称
         * @param instance 要卸载的皮肤部件实例
         */
        p.partRemoved = function (partName, instance) {
        };
        p.$setTouchChildren = function (value) {
            value = !!value;
            var values = this.$Component;
            if (values[3 /* enabled */]) {
                this.$toggleFlags(2048 /* TouchChildren */, value);
            }
            else {
                values[6 /* explicitTouchChildren */] = value;
            }
        };
        p.$setTouchEnabled = function (value) {
            value = !!value;
            var values = this.$Component;
            if (values[3 /* enabled */]) {
                this.$toggleFlags(1024 /* TouchEnabled */, value);
            }
            else {
                values[7 /* explicitTouchEnabled */] = value;
            }
        };
        d(p, "enabled",
            /**
             * 组件是否可以接受用户交互。将 enabled 属性设置为 false 后，组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
             * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。默认值为 true。
             */
            function () {
                return this.$Component[3 /* enabled */];
            },
            function (value) {
                value = !!value;
                this.$setEnabled(value);
            }
        );
        p.$setEnabled = function (value) {
            var values = this.$Component;
            if (value === values[3 /* enabled */]) {
                return;
            }
            values[3 /* enabled */] = value;
            if (value) {
                values[7 /* explicitTouchEnabled */] = this.touchEnabled;
                values[6 /* explicitTouchChildren */] = this.touchChildren;
            }
            else {
                _super.prototype.$setTouchEnabled.call(this, values[7 /* explicitTouchEnabled */]);
                _super.prototype.$setTouchChildren.call(this, values[6 /* explicitTouchChildren */]);
            }
            this.invalidateState();
        };
        d(p, "currentState",
            //========================皮肤视图状态=====================start=======================
            /**
             * 组件的当前视图状态。显式设置此属性，将采用显式设置的值去更新皮肤状态，而忽略组件内部 getCurrentState() 方法返回的值。
             * 将其设置为 "" 或 null 可将取消组件外部显式设置的视图状态名称，从而采用内部 getCurrentState() 方法返回的状态。
             */
            function () {
                var values = this.$Component;
                return values[2 /* explicitState */] ? values[2 /* explicitState */] : this.getCurrentState();
            },
            function (value) {
                var values = this.$Component;
                if (value == values[2 /* explicitState */]) {
                    return;
                }
                values[2 /* explicitState */] = value;
                this.invalidateState();
            }
        );
        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        p.invalidateState = function () {
            var values = this.$Component;
            if (values[4 /* stateIsDirty */])
                return;
            values[4 /* stateIsDirty */] = true;
            this.invalidateProperties();
        };
        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        p.getCurrentState = function () {
            return "";
        };
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        p.createChildren = function () {
            var values = this.$Component;
            if (!values[5 /* skinNameExplicitlySet */]) {
                var theme = this.$stage.getImplementation("swan.Theme");
                if (theme) {
                    var skinName = theme.getSkinName(this);
                    if (skinName) {
                        values[1 /* skinName */] = skinName;
                        this.$parseSkinName();
                    }
                }
            }
        };
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        p.childrenCreated = function () {
        };
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        p.commitProperties = function () {
            swan.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$Component;
            if (values[4 /* stateIsDirty */]) {
                values[4 /* stateIsDirty */] = false;
                if (values[8 /* skin */]) {
                    values[8 /* skin */].currentState = this.currentState;
                }
            }
        };
        /**
         * 测量组件尺寸
         */
        p.measure = function () {
            swan.sys.measure(this);
            var skin = this.$Component[8 /* skin */];
            if (!skin) {
                return;
            }
            var values = this.$UIComponent;
            if (!lark.isNone(skin.width)) {
                values[16 /* measuredWidth */] = skin.width;
            }
            else {
                if (values[16 /* measuredWidth */] < skin.minWidth) {
                    values[16 /* measuredWidth */] = skin.minWidth;
                }
                if (values[16 /* measuredWidth */] > skin.maxWidth) {
                    values[16 /* measuredWidth */] = skin.maxWidth;
                }
            }
            if (!lark.isNone(skin.height)) {
                values[17 /* measuredHeight */] = skin.height;
            }
            else {
                if (values[17 /* measuredHeight */] < skin.minHeight) {
                    values[17 /* measuredHeight */] = skin.minHeight;
                }
                if (values[17 /* measuredHeight */] > skin.maxHeight) {
                    values[17 /* measuredHeight */] = skin.maxHeight;
                }
            }
        };
        /**
         * 更新显示列表
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            swan.sys.updateDisplayList(this, unscaledWidth, unscaledHeight);
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * 标记提交过需要延迟应用的属性
         */
        p.invalidateProperties = function () {
        };
        /**
         * 验证组件的属性
         */
        p.validateProperties = function () {
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        p.invalidateSize = function () {
        };
        /**
         * 验证组件的尺寸
         */
        p.validateSize = function (recursive) {
        };
        /**
         * 标记需要验证显示列表
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        p.validateDisplayList = function () {
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        p.validateNow = function () {
        };
        /**
         * 设置组件的布局宽高
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * 设置组件的布局位置
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Component;
    })(lark.Sprite);
    swan.Component = Component;
    swan.registerProperty(Component, "skinName", "Class");
    swan.sys.implementUIComponent(Component, lark.Sprite, true);
    lark.registerClass(Component, 1009 /* Component */, [1001 /* UIComponent */]);
    if (DEBUG) {
        lark.$markReadOnly(Component.prototype, "skin");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * Group 是自动布局的容器基类。如果包含的子项内容太大需要滚动显示，可以在在 Group 外部包裹一层 Scroller 组件
     * (将 Group 实例赋值给 Scroller 组件的 viewport 属性)。Scroller 会为 Group 添加滚动的触摸操作功能，并显示垂直或水平的滚动条。
     */
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            _super.call(this);
            this.$layout = null;
            this.$stateValues = new swan.sys.StateValues();
            this.initializeUIValues();
            this.$Group = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: false,
                5: false,
            };
            this.$stateValues.parent = this;
        }
        var d = __define,c=Group;p=c.prototype;
        d(p, "elementsContent",undefined,
            /**
             * [只写] 此属性通常在 EXML 的解析器中调用，便于快速添加多个子项。
             */
            function (value) {
                if (value) {
                    var length = value.length;
                    for (var i = 0; i < length; i++) {
                        this.addChild(value[i]);
                    }
                }
            }
        );
        d(p, "layout",
            /**
             * 此容器的布局对象
             */
            function () {
                return this.$layout;
            },
            function (value) {
                this.$setLayout(value);
            }
        );
        p.$setLayout = function (value) {
            if (this.$layout == value)
                return;
            if (this.$layout) {
                this.$layout.target = null;
            }
            this.$layout = value;
            if (value) {
                value.target = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        d(p, "contentWidth",
            /**
             * 视域的内容的宽度
             */
            function () {
                return this.$Group[0 /* contentWidth */];
            },undefined
        );
        d(p, "contentHeight",
            /**
             * 视域的内容的高度
             */
            function () {
                return this.$Group[1 /* contentHeight */];
            },undefined
        );
        /**
         * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
         */
        p.setContentSize = function (width, height) {
            width = Math.ceil(+width || 0);
            height = Math.ceil(+height || 0);
            var values = this.$Group;
            var wChange = (values[0 /* contentWidth */] !== width);
            var hChange = (values[1 /* contentHeight */] !== height);
            if (!wChange && !hChange) {
                return;
            }
            values[0 /* contentWidth */] = width;
            values[1 /* contentHeight */] = height;
            if (wChange) {
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "contentWidth");
            }
            if (hChange) {
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "contentHeight");
            }
        };
        d(p, "scrollEnabled",
            /**
             * 是否启用容器滚动。如果为 true，则将子项剪切到视区的边界，配合设置scrollH和scrollV属性将能滚动视区。
             * 如果为 false，则容器子代会从容器边界扩展过去，而设置scrollH和scrollV也无效。默认false。
             */
            function () {
                return this.$Group[4 /* scrollEnabled */];
            },
            function (value) {
                value = !!value;
                var values = this.$Group;
                if (value === values[4 /* scrollEnabled */])
                    return;
                values[4 /* scrollEnabled */] = value;
                this.updateScrollRect();
            }
        );
        d(p, "scrollH",
            /**
             * 可视区域水平方向起始点
             */
            function () {
                return this.$Group[2 /* scrollH */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$Group;
                if (value === values[2 /* scrollH */])
                    return;
                values[2 /* scrollH */] = value;
                if (this.updateScrollRect() && this.$layout) {
                    this.$layout.scrollPositionChanged();
                }
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "scrollH");
            }
        );
        d(p, "scrollV",
            /**
             * 可视区域竖直方向起始点
             */
            function () {
                return this.$Group[3 /* scrollV */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$Group;
                if (value == values[3 /* scrollV */])
                    return;
                values[3 /* scrollV */] = value;
                if (this.updateScrollRect() && this.$layout) {
                    this.$layout.scrollPositionChanged();
                }
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "scrollV");
            }
        );
        p.updateScrollRect = function () {
            var values = this.$Group;
            var hasClip = values[4 /* scrollEnabled */];
            if (hasClip) {
                var uiValues = this.$UIComponent;
                this.scrollRect = lark.$TempRectangle.setTo(values[2 /* scrollH */], values[3 /* scrollV */], uiValues[10 /* width */], uiValues[11 /* height */]);
            }
            else if (this.$scrollRect) {
                this.scrollRect = null;
            }
            return hasClip;
        };
        d(p, "numElements",
            /**
             * 布局元素子项的数量。
             */
            function () {
                return this.$children.length;
            },undefined
        );
        /**
         * 获取一个布局元素子项
         */
        p.getElementAt = function (index) {
            return this.$children[index];
        };
        /**
         * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
         * 通常在即将重新布局子项之前会被调用一次，容器覆盖此方法提前释放已经不可见的子元素。
         * @param startIndex 可视元素起始索引（包括）
         * @param endIndex 可视元素结束索引（包括）
         */
        p.setVirtualElementIndicesInView = function (startIndex, endIndex) {
        };
        d(p, "touchThrough",
            /**
             * 触摸组件的背景透明区域是否可以穿透。设置为true表示可以穿透，反之透明区域也会响应触摸事件。默认 false。
             */
            function () {
                return this.$Group[5 /* touchThrough */];
            },
            function (value) {
                this.$Group[5 /* touchThrough */] = !!value;
            }
        );
        p.$hitTest = function (stageX, stageY, shapeFlag) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY, shapeFlag);
            if (target || this.$Group[5 /* touchThrough */] || shapeFlag || this.$displayFlags & 1 /* PixelHitTest */) {
                return target;
            }
            if (!this.$visible || !this.$hasFlags(1024 /* TouchEnabled */)) {
                return null;
            }
            var point = this.globalToLocal(stageX, stageY, lark.$TempPoint);
            var values = this.$UIComponent;
            var bounds = lark.$TempRectangle.setTo(0, 0, values[10 /* width */], values[11 /* height */]);
            if (bounds.contains(point.x, point.y)) {
                return this;
            }
            return null;
        };
        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        p.invalidateState = function () {
            var values = this.$stateValues;
            if (values.stateIsDirty) {
                return;
            }
            values.stateIsDirty = true;
            this.invalidateProperties();
        };
        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        p.getCurrentState = function () {
            return "";
        };
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        p.createChildren = function () {
            if (!this.$layout) {
                this.$setLayout(new swan.BasicLayout());
            }
            this.initializeStates(this.$stage);
        };
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        p.childrenCreated = function () {
        };
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        p.commitProperties = function () {
            swan.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$stateValues;
            if (values.stateIsDirty) {
                values.stateIsDirty = false;
                if (!values.explicitState) {
                    values.currentState = this.getCurrentState();
                    this.commitCurrentState();
                }
            }
        };
        /**
         * 测量组件尺寸
         */
        p.measure = function () {
            if (!this.$layout) {
                this.setMeasuredSize(0, 0);
                return;
            }
            this.$layout.measure();
        };
        /**
         * 更新显示列表
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (this.$layout) {
                this.$layout.updateDisplayList(unscaledWidth, unscaledHeight);
            }
            this.updateScrollRect();
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * 标记提交过需要延迟应用的属性
         */
        p.invalidateProperties = function () {
        };
        /**
         * 验证组件的属性
         */
        p.validateProperties = function () {
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        p.invalidateSize = function () {
        };
        /**
         * 验证组件的尺寸
         */
        p.validateSize = function (recursive) {
        };
        /**
         * 标记需要验证显示列表
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        p.validateDisplayList = function () {
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        p.validateNow = function () {
        };
        /**
         * 设置组件的布局宽高
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * 设置组件的布局位置
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含 scale 和 rotation。
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Group;
    })(lark.Sprite);
    swan.Group = Group;
    swan.sys.implementUIComponent(Group, lark.Sprite, true);
    swan.sys.mixin(Group, swan.sys.StateClient);
    swan.registerProperty(Group, "elementsContent", "Array", true);
    swan.registerProperty(Group, "states", "State[]");
    lark.registerClass(Group, 1002 /* Group */, [1001 /* UIComponent */, 1045 /* IViewport */]);
    if (DEBUG) {
        lark.$markReadOnly(Group.prototype, "contentWidth");
        lark.$markReadOnly(Group.prototype, "contentHeight");
        lark.$markReadOnly(Group.prototype, "numElements");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 默认的皮肤适配器
     */
    var assetAdapter = new swan.DefaultAssetAdapter();
    /**
     * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
     * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
     * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
     * Image 控件可以直接替代 Bitmap 在显示列表中使用。
     *
     * @event lark.Event.COMPLETE 当图片加载完成后调度
     */
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(source) {
            _super.call(this);
            /**
             * 矩形区域，它定义素材对象的九个缩放区域。
             * 注意:此属性仅在fileMode为BitmapFillMode.SCALE时有效。
             */
            this._scale9Grid = null;
            this._fillMode = "scale";
            this.sourceChanged = false;
            this._source = null;
            this.initializeUIValues();
            if (source) {
                this.source = source;
            }
        }
        var d = __define,c=Image;p=c.prototype;
        d(p, "scale9Grid",
            function () {
                return this._scale9Grid;
            },
            function (value) {
                this._scale9Grid = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "fillMode",
            /**
             * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
             * 设置为 BitmapFillMode.CLIP，位图将在边缘处被截断。
             * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
             * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
             */
            function () {
                return this._fillMode;
            },
            function (value) {
                if (value == this._fillMode) {
                    return;
                }
                this._fillMode = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "source",
            /**
             * 用于显示位图的数据源。可以为一个网络图片url或BitmapData实例。
             */
            function () {
                return this._source;
            },
            function (value) {
                if (value == this._source) {
                    return;
                }
                this._source = value;
                this.sourceChanged = true;
                this.invalidateProperties();
            }
        );
        p.$setBitmapData = function (value) {
            if (value == this.$bitmapData) {
                return;
            }
            _super.prototype.$setBitmapData.call(this, value);
            this._source = value;
            this.sourceChanged = false;
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * 解析source
         */
        p.parseSource = function () {
            this.sourceChanged = false;
            var source = this._source;
            if (source && typeof source == "string") {
                var adapter = this.$stage.getImplementation("swan.IAssetAdapter");
                if (!adapter) {
                    adapter = assetAdapter;
                }
                adapter.getAsset(this._source, this.contentChanged, this);
            }
            else {
                this.$setBitmapData(source);
            }
        };
        /**
         * 资源发生改变
         */
        p.contentChanged = function (data, source) {
            if (source !== this._source)
                return;
            if (!lark.is(data, 7 /* BitmapData */)) {
                return;
            }
            this.$setBitmapData(data);
            if (data) {
                this.emitWith(lark.Event.COMPLETE);
            }
            else if (DEBUG) {
                lark.$warn(2301, source);
            }
        };
        p.$measureContentBounds = function (bounds) {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                var values = this.$UIComponent;
                var width = values[10 /* width */];
                var height = values[11 /* height */];
                if (lark.isNone(width) || lark.isNone(height)) {
                    bounds.setEmpty();
                    return;
                }
                if (this._fillMode == "clip") {
                    if (width > bitmapData.width) {
                        width = bitmapData.width;
                    }
                    if (height > bitmapData.height) {
                        height = bitmapData.height;
                    }
                }
                bounds.setTo(0, 0, width, height);
            }
            else {
                bounds.setEmpty();
            }
        };
        p.$render = function (context) {
            var bitmapData = this.$bitmapData;
            if (!bitmapData) {
                return;
            }
            var values = this.$UIComponent;
            var width = values[10 /* width */];
            var height = values[11 /* height */];
            if (width === 0 || height === 0) {
                return;
            }
            switch (this._fillMode) {
                case "clip":
                    if (width > bitmapData.width) {
                        width = bitmapData.width;
                    }
                    if (height > bitmapData.height) {
                        height = bitmapData.height;
                    }
                    context.drawImage(bitmapData, 0, 0, width, height, 0, 0, width, height);
                    break;
                case "repeat":
                    var pattern = context.createPattern(bitmapData, "repeat");
                    context.rect(0, 0, width, height);
                    context.fillStyle = pattern;
                    context.fill();
                    break;
                default:
                    context.imageSmoothingEnabled = this.$smoothing;
                    if (this._scale9Grid) {
                        this.drawScale9GridImage(context, bitmapData, this._scale9Grid, width, height);
                    }
                    else {
                        context.drawImage(bitmapData, 0, 0, width, height);
                    }
                    break;
            }
        };
        /**
         * 绘制九宫格位图
         */
        p.drawScale9GridImage = function (context, image, scale9Grid, surfaceWidth, surfaceHeight) {
            var imageWidth = image.width;
            var imageHeight = image.height;
            var sourceW0 = scale9Grid.x;
            var sourceH0 = scale9Grid.y;
            var sourceW1 = scale9Grid.width;
            var sourceH1 = scale9Grid.height;
            //防止空心的情况出现。
            if (sourceH1 == 0) {
                sourceH1 = 1;
                if (sourceH0 >= imageHeight) {
                    sourceH0--;
                }
            }
            if (sourceW1 == 0) {
                sourceW1 = 1;
                if (sourceW0 >= imageWidth) {
                    sourceW0--;
                }
            }
            var sourceX0 = 0;
            var sourceX1 = sourceX0 + sourceW0;
            var sourceX2 = sourceX1 + sourceW1;
            var sourceW2 = imageWidth - sourceW0 - sourceW1;
            var sourceY0 = 0;
            var sourceY1 = sourceY0 + sourceH0;
            var sourceY2 = sourceY1 + sourceH1;
            var sourceH2 = imageHeight - sourceH0 - sourceH1;
            if (sourceW0 + sourceW2 > surfaceWidth || sourceH0 + sourceH2 > surfaceHeight) {
                context.drawImage(image, 0, 0, surfaceWidth, surfaceHeight);
                return;
            }
            var targetX0 = 0;
            var targetX1 = targetX0 + sourceW0;
            var targetX2 = targetX0 + surfaceWidth - sourceW2;
            var targetW1 = surfaceWidth - sourceW0 - sourceW2;
            var targetY0 = 0;
            var targetY1 = targetY0 + sourceH0;
            var targetY2 = targetY0 + surfaceHeight - sourceH2;
            var targetH1 = surfaceHeight - sourceH0 - sourceH2;
            //
            //             x0     x1     x2
            //          y0 +------+------+------+
            //             |      |      |      | h0
            //             |      |      |      |
            //          y1 +------+------+------+
            //             |      |      |      | h1
            //             |      |      |      |
            //          y2 +------+------+------+
            //             |      |      |      | h2
            //             |      |      |      |
            //             +------+------+------+
            //                w0     w1     w2
            //
            context.drawImage(image, sourceX0, sourceY0, sourceW0, sourceH0, targetX0, targetY0, sourceW0, sourceH0);
            context.drawImage(image, sourceX1, sourceY0, sourceW1, sourceH0, targetX1, targetY0, targetW1, sourceH0);
            context.drawImage(image, sourceX2, sourceY0, sourceW2, sourceH0, targetX2, targetY0, sourceW2, sourceH0);
            context.drawImage(image, sourceX0, sourceY1, sourceW0, sourceH1, targetX0, targetY1, sourceW0, targetH1);
            context.drawImage(image, sourceX1, sourceY1, sourceW1, sourceH1, targetX1, targetY1, targetW1, targetH1);
            context.drawImage(image, sourceX2, sourceY1, sourceW2, sourceH1, targetX2, targetY1, sourceW2, targetH1);
            context.drawImage(image, sourceX0, sourceY2, sourceW0, sourceH2, targetX0, targetY2, sourceW0, sourceH2);
            context.drawImage(image, sourceX1, sourceY2, sourceW1, sourceH2, targetX1, targetY2, targetW1, sourceH2);
            context.drawImage(image, sourceX2, sourceY2, sourceW2, sourceH2, targetX2, targetY2, sourceW2, sourceH2);
        };
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        p.createChildren = function () {
        };
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        p.childrenCreated = function () {
        };
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        p.commitProperties = function () {
            swan.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            if (this.sourceChanged) {
                this.parseSource();
            }
        };
        /**
         * 测量组件尺寸
         */
        p.measure = function () {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                this.setMeasuredSize(bitmapData.width, bitmapData.height);
            }
            else {
                this.setMeasuredSize(0, 0);
            }
        };
        /**
         * 更新显示列表
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            this.$invalidateContentBounds();
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * 标记提交过需要延迟应用的属性
         */
        p.invalidateProperties = function () {
        };
        /**
         * 验证组件的属性
         */
        p.validateProperties = function () {
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        p.invalidateSize = function () {
        };
        /**
         * 验证组件的尺寸
         */
        p.validateSize = function (recursive) {
        };
        /**
         * 标记需要验证显示列表
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        p.validateDisplayList = function () {
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        p.validateNow = function () {
        };
        /**
         * 设置组件的布局宽高
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * 设置组件的布局位置
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Image;
    })(lark.Bitmap);
    swan.Image = Image;
    swan.sys.implementUIComponent(Image, lark.Bitmap);
    lark.registerClass(Image, 1011 /* Image */, [1001 /* UIComponent */]);
    swan.registerProperty(Image, "scale9Grid", "lark.Rectangle");
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 水平布局
     */
    var HorizontalLayout = (function (_super) {
        __extends(HorizontalLayout, _super);
        function HorizontalLayout() {
            _super.apply(this, arguments);
        }
        var d = __define,c=HorizontalLayout;p=c.prototype;
        /**
         * 测量使用真实布局的尺寸
         */
        p.measureReal = function () {
            var target = this.$target;
            var count = target.numElements;
            var numElements = count;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var bounds = lark.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredWidth += bounds.width;
                measuredHeight = Math.max(measuredHeight, bounds.height);
            }
            measuredWidth += (numElements - 1) * this.$gap;
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * 测量使用虚拟布局的尺寸
         */
        p.measureVirtual = function () {
            var target = this.$target;
            var typicalWidth = this.$typicalWidth;
            var measuredWidth = this.getElementTotalSize();
            var measuredHeight = Math.max(this.maxElementSize, this.$typicalHeight);
            var bounds = lark.$TempRectangle;
            var endIndex = this.endIndex;
            var elementSizeTable = this.elementSizeTable;
            for (var index = this.startIndex; index < endIndex; index++) {
                var layoutElement = (target.getElementAt(index));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredWidth += bounds.width;
                measuredWidth -= elementSizeTable[index] || typicalWidth;
                measuredHeight = Math.max(measuredHeight, bounds.height);
            }
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * 更新使用真实布局的显示列表
         */
        p.updateDisplayListReal = function (width, height) {
            var target = this.$target;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var hJustify = this.$horizontalAlign == swan.JustifyAlign.JUSTIFY;
            var vJustify = this.$verticalAlign == swan.JustifyAlign.JUSTIFY || this.$verticalAlign == swan.JustifyAlign.CONTENT_JUSTIFY;
            var vAlign = 0;
            if (!vJustify) {
                if (this.$verticalAlign == lark.VerticalAlign.MIDDLE) {
                    vAlign = 0.5;
                }
                else if (this.$verticalAlign == lark.VerticalAlign.BOTTOM) {
                    vAlign = 1;
                }
            }
            var count = target.numElements;
            var numElements = count;
            var x = paddingL;
            var y = paddingT;
            var i;
            var layoutElement;
            var totalPreferredWidth = 0;
            var totalPercentWidth = 0;
            var childInfoArray = [];
            var childInfo;
            var widthToDistribute = targetWidth;
            var maxElementHeight = this.maxElementSize;
            var bounds = lark.$TempRectangle;
            for (i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                maxElementHeight = Math.max(maxElementHeight, bounds.height);
                if (hJustify) {
                    totalPreferredWidth += bounds.width;
                }
                else {
                    var values = layoutElement.$UIComponent;
                    if (!lark.isNone(values[6 /* percentWidth */])) {
                        totalPercentWidth += values[6 /* percentWidth */];
                        childInfo = new swan.sys.ChildInfo();
                        childInfo.layoutElement = layoutElement;
                        childInfo.percent = values[6 /* percentWidth */];
                        childInfo.min = values[12 /* minWidth */];
                        childInfo.max = values[13 /* maxWidth */];
                        childInfoArray.push(childInfo);
                    }
                    else {
                        widthToDistribute -= bounds.width;
                    }
                }
            }
            widthToDistribute -= gap * (numElements - 1);
            widthToDistribute = widthToDistribute > 0 ? widthToDistribute : 0;
            var excessSpace = targetWidth - totalPreferredWidth - gap * (numElements - 1);
            var averageWidth;
            var largeChildrenCount = numElements;
            var widthDic = {};
            if (hJustify) {
                if (excessSpace < 0) {
                    averageWidth = widthToDistribute / numElements;
                    for (i = 0; i < count; i++) {
                        layoutElement = (target.getElementAt(i));
                        if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                            continue;
                        }
                        layoutElement.getPreferredBounds(bounds);
                        if (bounds.width <= averageWidth) {
                            widthToDistribute -= bounds.width;
                            largeChildrenCount--;
                            continue;
                        }
                    }
                    widthToDistribute = widthToDistribute > 0 ? widthToDistribute : 0;
                }
            }
            else {
                if (totalPercentWidth > 0) {
                    this.flexChildrenProportionally(targetWidth, widthToDistribute, totalPercentWidth, childInfoArray);
                    var roundOff = 0;
                    var length = childInfoArray.length;
                    for (i = 0; i < length; i++) {
                        childInfo = childInfoArray[i];
                        var childSize = Math.round(childInfo.size + roundOff);
                        roundOff += childInfo.size - childSize;
                        widthDic[childInfo.layoutElement.$hashCode] = childSize;
                        widthToDistribute -= childSize;
                    }
                    widthToDistribute = widthToDistribute > 0 ? widthToDistribute : 0;
                }
            }
            if (this.$horizontalAlign == lark.HorizontalAlign.CENTER) {
                x = paddingL + widthToDistribute * 0.5;
            }
            else if (this.$horizontalAlign == lark.HorizontalAlign.RIGHT) {
                x = paddingL + widthToDistribute;
            }
            var maxX = paddingL;
            var maxY = paddingT;
            var dx = 0;
            var dy = 0;
            var justifyHeight = Math.ceil(targetHeight);
            if (this.$verticalAlign == swan.JustifyAlign.CONTENT_JUSTIFY)
                justifyHeight = Math.ceil(Math.max(targetHeight, maxElementHeight));
            roundOff = 0;
            var layoutElementWidth;
            var childWidth;
            for (i = 0; i < count; i++) {
                var exceesHeight = 0;
                layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                layoutElementWidth = lark.NONE;
                if (hJustify) {
                    childWidth = lark.NONE;
                    if (excessSpace > 0) {
                        childWidth = widthToDistribute * bounds.width / totalPreferredWidth;
                    }
                    else if (excessSpace < 0 && bounds.width > averageWidth) {
                        childWidth = widthToDistribute / largeChildrenCount;
                    }
                    if (!lark.isNone(childWidth)) {
                        layoutElementWidth = Math.round(childWidth + roundOff);
                        roundOff += childWidth - layoutElementWidth;
                    }
                }
                else {
                    layoutElementWidth = widthDic[layoutElement.$hashCode] || lark.NONE;
                }
                if (vJustify) {
                    y = paddingT;
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, justifyHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    var layoutElementHeight = lark.NONE;
                    var values = layoutElement.$UIComponent;
                    if (!lark.isNone(layoutElement.percentHeight)) {
                        var percent = Math.min(100, values[7 /* percentHeight */]);
                        layoutElementHeight = Math.round(targetHeight * percent * 0.01);
                    }
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                    exceesHeight = (targetHeight - bounds.height) * vAlign;
                    exceesHeight = exceesHeight > 0 ? exceesHeight : 0;
                    y = paddingT + exceesHeight;
                }
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
                dx = Math.ceil(bounds.width);
                dy = Math.ceil(bounds.height);
                maxX = Math.max(maxX, x + dx);
                maxY = Math.max(maxY, y + dy);
                x += dx + gap;
            }
            this.maxElementSize = maxElementHeight;
            target.setContentSize(maxX + paddingR, maxY + paddingB);
        };
        /**
         * 更新使用虚拟布局的显示列表
         */
        p.updateDisplayListVirtual = function (width, height) {
            var target = this.$target;
            if (this.indexInViewCalculated)
                this.indexInViewCalculated = false;
            else
                this.getIndexInView();
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var contentWidth;
            var numElements = target.numElements;
            if (this.startIndex == -1 || this.endIndex == -1) {
                contentWidth = this.getStartPosition(numElements) - gap + paddingR;
                target.setContentSize(contentWidth, target.contentHeight);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            //获取垂直布局参数
            var justify = this.$verticalAlign == swan.JustifyAlign.JUSTIFY || this.$verticalAlign == swan.JustifyAlign.CONTENT_JUSTIFY;
            var contentJustify = this.$verticalAlign == swan.JustifyAlign.CONTENT_JUSTIFY;
            var vAlign = 0;
            if (!justify) {
                if (this.$verticalAlign == lark.VerticalAlign.MIDDLE) {
                    vAlign = 0.5;
                }
                else if (this.$verticalAlign == lark.VerticalAlign.BOTTOM) {
                    vAlign = 1;
                }
            }
            var bounds = lark.$TempRectangle;
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var justifyHeight = Math.ceil(targetHeight);
            var layoutElement;
            var typicalHeight = this.$typicalHeight;
            var typicalWidth = this.$typicalWidth;
            var maxElementHeight = this.maxElementSize;
            var oldMaxH = Math.max(typicalHeight, this.maxElementSize);
            if (contentJustify) {
                for (var index = this.startIndex; index <= endIndex; index++) {
                    layoutElement = (target.getElementAt(index));
                    if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                        continue;
                    }
                    layoutElement.getPreferredBounds(bounds);
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
                justifyHeight = Math.ceil(Math.max(targetHeight, maxElementHeight));
            }
            var x = 0;
            var y = 0;
            var contentHeight = 0;
            var oldElementSize;
            var needInvalidateSize = false;
            var elementSizeTable = this.elementSizeTable;
            for (var i = this.startIndex; i <= endIndex; i++) {
                var exceesHeight = 0;
                layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                if (!contentJustify) {
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
                if (justify) {
                    y = paddingT;
                    layoutElement.setLayoutBoundsSize(lark.NONE, justifyHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    layoutElement.getLayoutBounds(bounds);
                    exceesHeight = (targetHeight - bounds.height) * vAlign;
                    exceesHeight = exceesHeight > 0 ? exceesHeight : 0;
                    y = paddingT + exceesHeight;
                }
                contentHeight = Math.max(contentHeight, bounds.height);
                if (!needInvalidateSize) {
                    oldElementSize = elementSizeTable[i] || typicalWidth;
                    if (oldElementSize != bounds.width)
                        needInvalidateSize = true;
                }
                elementSizeTable[i] = bounds.width;
                x = this.getStartPosition(i);
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
            }
            contentHeight += paddingT + paddingB;
            contentWidth = this.getStartPosition(numElements) - gap + paddingR;
            this.maxElementSize = maxElementHeight;
            target.setContentSize(contentWidth, contentHeight);
            if (needInvalidateSize || oldMaxH < this.maxElementSize) {
                target.invalidateSize();
            }
        };
        /**
         * 获取指定索引的起始位置
         */
        p.getStartPosition = function (index) {
            if (!this.$useVirtualLayout) {
                if (this.$target) {
                    var element = this.$target.getElementAt(index);
                    if (element) {
                        return element.x;
                    }
                }
            }
            var typicalWidth = this.$typicalWidth;
            var startPos = this.$paddingLeft;
            var gap = this.$gap;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < index; i++) {
                startPos += (elementSizeTable[i] || typicalWidth) + gap;
            }
            return startPos;
        };
        /**
         * 获取指定索引的元素尺寸
         */
        p.getElementSize = function (index) {
            if (this.$useVirtualLayout) {
                return this.elementSizeTable[index] || this.$typicalWidth;
            }
            if (this.$target) {
                return this.$target.getElementAt(index).width;
            }
            return 0;
        };
        /**
         * 获取缓存的子对象尺寸总和
         */
        p.getElementTotalSize = function () {
            var typicalWidth = this.$typicalWidth;
            var gap = this.$gap;
            var totalSize = 0;
            var length = this.$target.numElements;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < length; i++) {
                totalSize += (elementSizeTable[i] || typicalWidth) + gap;
            }
            totalSize -= gap;
            return totalSize;
        };
        p.elementAdded = function (index) {
            if (!this.useVirtualLayout)
                return;
            _super.prototype.elementAdded.call(this, index);
            this.elementSizeTable.splice(index, 0, this.$typicalWidth);
        };
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        p.getIndexInView = function () {
            var target = this.$target;
            if (!target || target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] <= 0 || values[11 /* height */] <= 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var numElements = target.numElements;
            var contentWidth = this.getStartPosition(numElements - 1) + this.elementSizeTable[numElements - 1] + this.$paddingRight;
            var minVisibleX = target.scrollH;
            if (minVisibleX > contentWidth - this.$paddingRight) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var maxVisibleX = target.scrollH + values[10 /* width */];
            if (maxVisibleX < this.$paddingLeft) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            this.startIndex = this.findIndexAt(minVisibleX, 0, numElements - 1);
            if (this.startIndex == -1)
                this.startIndex = 0;
            this.endIndex = this.findIndexAt(maxVisibleX, 0, numElements - 1);
            if (this.endIndex == -1)
                this.endIndex = numElements - 1;
            return oldStartIndex != this.startIndex || oldEndIndex != this.endIndex;
        };
        return HorizontalLayout;
    })(swan.LinearLayoutBase);
    swan.HorizontalLayout = HorizontalLayout;
    lark.registerClass(HorizontalLayout, 1022 /* HorizontalLayout */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 垂直布局
     */
    var VerticalLayout = (function (_super) {
        __extends(VerticalLayout, _super);
        function VerticalLayout() {
            _super.apply(this, arguments);
        }
        var d = __define,c=VerticalLayout;p=c.prototype;
        /**
         * 测量使用真实布局的尺寸
         */
        p.measureReal = function () {
            var target = this.$target;
            var count = target.numElements;
            var numElements = count;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var bounds = lark.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            measuredHeight += (numElements - 1) * this.$gap;
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * 测量使用虚拟布局的尺寸
         */
        p.measureVirtual = function () {
            var target = this.$target;
            var typicalHeight = this.$typicalHeight;
            var measuredHeight = this.getElementTotalSize();
            var measuredWidth = Math.max(this.maxElementSize, this.$typicalWidth);
            var bounds = lark.$TempRectangle;
            var endIndex = this.endIndex;
            var elementSizeTable = this.elementSizeTable;
            for (var index = this.startIndex; index < endIndex; index++) {
                var layoutElement = (target.getElementAt(index));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredHeight -= elementSizeTable[index] || typicalHeight;
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * 更新使用真实布局的显示列表
         */
        p.updateDisplayListReal = function (width, height) {
            var target = this.$target;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var vJustify = this.$verticalAlign == swan.JustifyAlign.JUSTIFY;
            var hJustify = this.$horizontalAlign == swan.JustifyAlign.JUSTIFY || this.$horizontalAlign == swan.JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!hJustify) {
                if (this.$horizontalAlign == lark.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == lark.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }
            var count = target.numElements;
            var numElements = count;
            var x = paddingL;
            var y = paddingT;
            var i;
            var layoutElement;
            var totalPreferredHeight = 0;
            var totalPercentHeight = 0;
            var childInfoArray = [];
            var childInfo;
            var heightToDistribute = targetHeight;
            var maxElementWidth = this.maxElementSize;
            var bounds = lark.$TempRectangle;
            for (i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                maxElementWidth = Math.max(maxElementWidth, bounds.width);
                if (vJustify) {
                    totalPreferredHeight += bounds.height;
                }
                else {
                    var values = layoutElement.$UIComponent;
                    if (!lark.isNone(values[7 /* percentHeight */])) {
                        totalPercentHeight += values[7 /* percentHeight */];
                        childInfo = new swan.sys.ChildInfo();
                        childInfo.layoutElement = layoutElement;
                        childInfo.percent = values[7 /* percentHeight */];
                        childInfo.min = values[14 /* minHeight */];
                        childInfo.max = values[15 /* maxHeight */];
                        childInfoArray.push(childInfo);
                    }
                    else {
                        heightToDistribute -= bounds.height;
                    }
                }
            }
            heightToDistribute -= gap * (numElements - 1);
            heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
            var excessSpace = targetHeight - totalPreferredHeight - gap * (numElements - 1);
            var averageHeight;
            var largeChildrenCount = numElements;
            var heightDic = {};
            if (vJustify) {
                if (excessSpace < 0) {
                    averageHeight = heightToDistribute / numElements;
                    for (i = 0; i < count; i++) {
                        layoutElement = (target.getElementAt(i));
                        if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                            continue;
                        }
                        layoutElement.getPreferredBounds(bounds);
                        if (bounds.height <= averageHeight) {
                            heightToDistribute -= bounds.height;
                            largeChildrenCount--;
                            continue;
                        }
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            else {
                if (totalPercentHeight > 0) {
                    this.flexChildrenProportionally(targetHeight, heightToDistribute, totalPercentHeight, childInfoArray);
                    var roundOff = 0;
                    var length = childInfoArray.length;
                    for (i = 0; i < length; i++) {
                        childInfo = childInfoArray[i];
                        var childSize = Math.round(childInfo.size + roundOff);
                        roundOff += childInfo.size - childSize;
                        heightDic[childInfo.layoutElement.$hashCode] = childSize;
                        heightToDistribute -= childSize;
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            if (this.$verticalAlign == lark.VerticalAlign.MIDDLE) {
                y = paddingT + heightToDistribute * 0.5;
            }
            else if (this.$verticalAlign == lark.VerticalAlign.BOTTOM) {
                y = paddingT + heightToDistribute;
            }
            var maxX = paddingL;
            var maxY = paddingT;
            var dx = 0;
            var dy = 0;
            var justifyWidth = Math.ceil(targetWidth);
            if (this.$horizontalAlign == swan.JustifyAlign.CONTENT_JUSTIFY)
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            roundOff = 0;
            var layoutElementHeight;
            var childHeight;
            for (i = 0; i < count; i++) {
                var exceesWidth = 0;
                layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                layoutElementHeight = lark.NONE;
                if (vJustify) {
                    childHeight = lark.NONE;
                    if (excessSpace > 0) {
                        childHeight = heightToDistribute * bounds.height / totalPreferredHeight;
                    }
                    else if (excessSpace < 0 && bounds.height > averageHeight) {
                        childHeight = heightToDistribute / largeChildrenCount;
                    }
                    if (!lark.isNone(childHeight)) {
                        layoutElementHeight = Math.round(childHeight + roundOff);
                        roundOff += childHeight - layoutElementHeight;
                    }
                }
                else {
                    layoutElementHeight = heightDic[layoutElement.$hashCode] || lark.NONE;
                }
                if (hJustify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    var layoutElementWidth = lark.NONE;
                    var values = layoutElement.$UIComponent;
                    if (!lark.isNone(values[6 /* percentWidth */])) {
                        var percent = Math.min(100, values[6 /* percentWidth */]);
                        layoutElementWidth = Math.round(targetWidth * percent * 0.01);
                    }
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
                dx = Math.ceil(bounds.width);
                dy = Math.ceil(bounds.height);
                maxX = Math.max(maxX, x + dx);
                maxY = Math.max(maxY, y + dy);
                y += dy + gap;
            }
            this.maxElementSize = maxElementWidth;
            target.setContentSize(maxX + paddingR, maxY + paddingB);
        };
        /**
         * 更新使用虚拟布局的显示列表
         */
        p.updateDisplayListVirtual = function (width, height) {
            var target = this.$target;
            if (this.indexInViewCalculated)
                this.indexInViewCalculated = false;
            else
                this.getIndexInView();
            var paddingB = this.$paddingBottom;
            var paddingL = this.$paddingTop;
            var paddingR = this.$paddingRight;
            var gap = this.$gap;
            var contentHeight;
            var numElements = target.numElements;
            if (this.startIndex == -1 || this.endIndex == -1) {
                contentHeight = this.getStartPosition(numElements) - gap + paddingB;
                target.setContentSize(target.contentWidth, contentHeight);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            //获取垂直布局参数
            var justify = this.$horizontalAlign == swan.JustifyAlign.JUSTIFY || this.$horizontalAlign == swan.JustifyAlign.CONTENT_JUSTIFY;
            var contentJustify = this.$horizontalAlign == swan.JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!justify) {
                if (this.$horizontalAlign == lark.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == lark.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }
            var bounds = lark.$TempRectangle;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var justifyWidth = Math.ceil(targetWidth);
            var layoutElement;
            var typicalHeight = this.$typicalHeight;
            var typicalWidth = this.$typicalWidth;
            var maxElementWidth = this.maxElementSize;
            var oldMaxW = Math.max(typicalWidth, this.maxElementSize);
            if (contentJustify) {
                for (var index = this.startIndex; index <= endIndex; index++) {
                    layoutElement = (target.getElementAt(index));
                    if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                        continue;
                    }
                    layoutElement.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            }
            var x = 0;
            var y = 0;
            var contentWidth = 0;
            var oldElementSize;
            var needInvalidateSize = false;
            var elementSizeTable = this.elementSizeTable;
            for (var i = this.startIndex; i <= endIndex; i++) {
                var exceesWidth = 0;
                layoutElement = (target.getElementAt(i));
                if (!lark.is(layoutElement, 1001 /* UIComponent */) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                if (!contentJustify) {
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                if (justify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, lark.NONE);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                contentWidth = Math.max(contentWidth, bounds.width);
                if (!needInvalidateSize) {
                    oldElementSize = elementSizeTable[i] || typicalHeight;
                    if (oldElementSize != bounds.height)
                        needInvalidateSize = true;
                }
                elementSizeTable[i] = bounds.height;
                y = this.getStartPosition(i);
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
            }
            contentWidth += paddingL + paddingR;
            contentHeight = this.getStartPosition(numElements) - gap + paddingB;
            this.maxElementSize = maxElementWidth;
            target.setContentSize(contentWidth, contentHeight);
            if (needInvalidateSize || oldMaxW < this.maxElementSize) {
                target.invalidateSize();
            }
        };
        /**
         * 获取指定索引的起始位置
         */
        p.getStartPosition = function (index) {
            if (!this.$useVirtualLayout) {
                if (this.$target) {
                    var element = this.$target.getElementAt(index);
                    if (element) {
                        return element.y;
                    }
                }
            }
            var typicalHeight = this.$typicalHeight;
            var startPos = this.$paddingTop;
            var gap = this.$gap;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < index; i++) {
                startPos += (elementSizeTable[i] || typicalHeight) + gap;
            }
            return startPos;
        };
        /**
         * 获取指定索引的元素尺寸
         */
        p.getElementSize = function (index) {
            if (this.$useVirtualLayout) {
                return this.elementSizeTable[index] || this.$typicalHeight;
            }
            if (this.$target) {
                return this.$target.getElementAt(index).height;
            }
            return 0;
        };
        /**
         * 获取缓存的子对象尺寸总和
         */
        p.getElementTotalSize = function () {
            var typicalHeight = this.$typicalHeight;
            var gap = this.$gap;
            var totalSize = 0;
            var length = this.$target.numElements;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < length; i++) {
                totalSize += (elementSizeTable[i] || typicalHeight) + gap;
            }
            totalSize -= gap;
            return totalSize;
        };
        p.elementAdded = function (index) {
            if (!this.$useVirtualLayout)
                return;
            _super.prototype.elementAdded.call(this, index);
            this.elementSizeTable.splice(index, 0, this.$typicalHeight);
        };
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        p.getIndexInView = function () {
            var target = this.$target;
            if (!target || target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] == 0 || values[11 /* height */] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var numElements = target.numElements;
            var contentHeight = this.getStartPosition(numElements - 1) + this.elementSizeTable[numElements - 1] + this.$paddingBottom;
            var minVisibleY = target.scrollV;
            if (minVisibleY > contentHeight - this.$paddingBottom) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var maxVisibleY = target.scrollV + values[11 /* height */];
            if (maxVisibleY < this.$paddingTop) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            this.startIndex = this.findIndexAt(minVisibleY, 0, numElements - 1);
            if (this.startIndex == -1)
                this.startIndex = 0;
            this.endIndex = this.findIndexAt(maxVisibleY, 0, numElements - 1);
            if (this.endIndex == -1)
                this.endIndex = numElements - 1;
            return oldStartIndex != this.startIndex || oldEndIndex != this.endIndex;
        };
        return VerticalLayout;
    })(swan.LinearLayoutBase);
    swan.VerticalLayout = VerticalLayout;
    lark.registerClass(VerticalLayout, 1023 /* VerticalLayout */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 项呈示器基类，通常作为List类的项目视图模板。
     */
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        function ItemRenderer() {
            _super.call(this);
            this._data = null;
            this._selected = false;
            /**
             * 项呈示器的数据提供程序中的项目索引。
             */
            this.itemIndex = -1;
            /**
             * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，是否按下鼠标以及触摸点是否在按钮上。
             */
            this.touchCaptured = false;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        var d = __define,c=ItemRenderer;p=c.prototype;
        d(p, "data",
            /**
             * 要呈示或编辑的数据。
             */
            function () {
                return this._data;
            },
            function (value) {
                this._data = value;
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "data");
                this.dataChanged();
            }
        );
        /**
         * 子类复写此方法以在 data 数据源发生改变时跟新显示列表。
         */
        p.dataChanged = function () {
        };
        d(p, "selected",
            /**
             * 如果项呈示器可以将其自身显示为已选中，则为 true。
             */
            function () {
                return this._selected;
            },
            function (value) {
                if (this._selected == value)
                    return;
                this._selected = value;
                this.invalidateState();
            }
        );
        /**
         * 鼠标事件处理
         */
        p.onTouchBegin = function (event) {
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        };
        /**
         * 舞台上触摸弹起事件
         */
        p.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * 返回要应用到外观的状态的名称
         */
        p.getCurrentState = function () {
            if (this._selected || this.touchCaptured)
                return "down";
            return "up";
        };
        return ItemRenderer;
    })(swan.Group);
    swan.ItemRenderer = ItemRenderer;
    swan.registerBindable(ItemRenderer.prototype, "data");
    lark.registerClass(ItemRenderer, 1008 /* ItemRenderer */, [1007 /* IItemRenderer */]);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @language en_US
     * The ScrollBarBase class helps to position
     * the portion of data that is displayed when there is too much data
     * to fit in a display area.
     * The ScrollBarBase class displays a pair of viewport and a thumb.
     * viewport is a instance that implements IViewport.
     *
     * @see swan.IViewport
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * <code>ScrollBarBase</code> 滚动条基类，该类帮助在因数据太多而不能在显示区域完全显示时定位显示的数据部分。
     * ScrollBarBase 类显示视区的一部分和一个指示滑块。
     * 视区是一个IViewport接口实现的实例。
     *
     * @see swan.IViewport
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var ScrollBarBase = (function (_super) {
        __extends(ScrollBarBase, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个ScrollBarBase实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        function ScrollBarBase() {
            _super.call(this);
            /**
             * @language en_US
             * [SkinPart] Thumb display object.
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart]滑块显示对象
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            this.thumb = null;
            /**
             * @private
             */
            this.$viewport = null;
        }
        var d = __define,c=ScrollBarBase;p=c.prototype;
        d(p, "viewport",
            /**
             * @language en_US
             * The viewport controlled by this scrollbar.
             *
             * If a viewport is specified, then changes to its actual size, content
             * size, and scroll position cause the corresponding ScrollBarBase methods to
             * run:
             * <ul>
             *     <li><code>onViewportResize()</code></li>
             *     <li><code>onPropertyChanged()</code></li>
             * </ul><p/>
             *
             * The VScrollBar and HScrollBar classes override these methods to keep their properties in
             * sync with the viewport.
             *
             * @default null
             * @see swan.VScrollBar
             * @see swan.HScrollBar
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 由该滚动条控制的视区。
             *
             * 如果指定了视区，则对其实际大小、内容大小和滚动位置的更改会导致运行相对应的 ScrollBarBase 方法：
             * <ul>
             *     <li><code>onViewportResize()</code></li>
             *     <li><code>onPropertyChanged()</code></li>
             * </ul><p/>
             *
             * VScrollBar 和 HScrollBar 类需要重写这些方法以保证属性与视区的同步。
             *
             * @default null
             * @see swan.VScrollBar
             * @see swan.HScrollBar
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$viewport;
            },
            function (value) {
                if (value == this.$viewport) {
                    return;
                }
                var viewport = this.$viewport;
                if (viewport) {
                    viewport.removeListener(swan.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged, this);
                    viewport.removeListener(lark.Event.RESIZE, this.onViewportResize, this);
                }
                this.$viewport = value;
                if (value) {
                    value.on(swan.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged, this);
                    value.on(lark.Event.RESIZE, this.onViewportResize, this);
                }
                this.invalidateDisplayList();
            }
        );
        /**
         * @private
         *
         * @param event
         */
        p.onViewportResize = function (event) {
            this.invalidateDisplayList();
        };
        /**
         * @language en_US
         * Properties of viewport changed.
         * @param event
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 视区属性发生改变。
         * @param event
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onPropertyChanged = function (event) {
        };
        return ScrollBarBase;
    })(swan.Component);
    swan.ScrollBarBase = ScrollBarBase;
    /**
     * @private
     */
    lark.registerClass(ScrollBarBase, 1038 /* ScrollBarBase */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 按钮组件
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
         * 创建一个按钮实例
         */
        function Button() {
            _super.call(this);
            /**
             * [SkinPart]按钮上的文本标签
             */
            this.labelDisplay = null;
            this._label = "";
            /**
             * [SkinPart]按钮上的图标显示对象。
             */
            this.iconDisplay = null;
            this._icon = null;
            /**
             * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，是否按下鼠标以及触摸点是否在按钮上。
             */
            this.touchCaptured = false;
            this.touchChildren = false;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        var d = __define,c=Button;p=c.prototype;
        d(p, "label",
            /**
             * 要在按钮上显示的文本
             */
            function () {
                return this._label;
            },
            function (value) {
                this._label = value;
                if (this.labelDisplay) {
                    this.labelDisplay.text = value;
                }
            }
        );
        d(p, "icon",
            /**
             * 要在按钮上显示的图标数据
             */
            function () {
                return this._icon;
            },
            function (value) {
                this._icon = value;
                if (this.iconDisplay) {
                    this.iconDisplay.source = value;
                }
            }
        );
        /**
         * 鼠标事件处理
         */
        p.onTouchBegin = function (event) {
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        };
        /**
         * 舞台上触摸弹起事件
         */
        p.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            if (this.contains(event.target)) {
                this.buttonReleased();
            }
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * 返回要应用到外观的状态的名称
         */
        p.getCurrentState = function () {
            if (!this.enabled)
                return "disabled";
            if (this.touchCaptured)
                return "down";
            return "up";
        };
        /**
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称
         * @param instance 要附加的皮肤部件实例
         */
        p.partAdded = function (partName, instance) {
            if (instance === this.labelDisplay) {
                this.labelDisplay.text = this._label;
            }
            else if (instance == this.iconDisplay) {
                this.iconDisplay.source = this._icon;
            }
        };
        /**
         * 按钮弹起事件
         */
        p.buttonReleased = function () {
        };
        return Button;
    })(swan.Component);
    swan.Button = Button;
    lark.registerClass(Button, 1025 /* Button */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * DataGroup 是数据容器基类,将数据项目转换为可视元素以进行显示
     */
    var DataGroup = (function (_super) {
        __extends(DataGroup, _super);
        function DataGroup() {
            _super.call(this);
            this.$dataProviderChanged = false;
            this.$dataProvider = null;
            /**
             * 索引到项呈示器的转换数组
             */
            this.$indexToRenderer = [];
            this.$DataGroup = {
                0: true,
                1: false,
                2: {},
                3: {},
                4: false,
                5: false,
                6: null,
                7: null,
                8: false,
                9: null,
                10: false,
                11: false,
                12: null,
            };
        }
        var d = __define,c=DataGroup;p=c.prototype;
        d(p, "useVirtualLayout",
            /**
             * 是否使用虚拟布局,默认true
             */
            function () {
                return this.$layout ? this.$layout.$useVirtualLayout : this.$DataGroup[0 /* useVirtualLayout */];
            },
            function (value) {
                value = !!value;
                var values = this.$DataGroup;
                if (value === values[0 /* useVirtualLayout */])
                    return;
                values[0 /* useVirtualLayout */] = value;
                if (this.$layout)
                    this.$layout.useVirtualLayout = value;
            }
        );
        p.$setLayout = function (value) {
            if (value == this.$layout)
                return;
            if (this.$layout) {
                this.$layout.setTypicalSize(0, 0);
                this.$layout.removeListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
            if (this.$layout && value && (this.$layout.$useVirtualLayout != value.$useVirtualLayout))
                this.onUseVirtualLayoutChanged();
            _super.prototype.$setLayout.call(this, value);
            if (value) {
                var rect = this.$DataGroup[9 /* typicalLayoutRect */];
                if (rect) {
                    value.setTypicalSize(rect.width, rect.height);
                }
                value.useVirtualLayout = this.$DataGroup[0 /* useVirtualLayout */];
                value.on("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
        };
        /**
         * 是否使用虚拟布局标记改变
         */
        p.onUseVirtualLayoutChanged = function (event) {
            var values = this.$DataGroup;
            values[1 /* useVirtualLayoutChanged */] = true;
            values[10 /* cleanFreeRenderer */] = true;
            this.removeDataProviderListener();
            this.invalidateProperties();
        };
        p.setVirtualElementIndicesInView = function (startIndex, endIndex) {
            if (!this.$layout || !this.$layout.$useVirtualLayout) {
                return;
            }
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = +keys[i];
                if (index < startIndex || index > endIndex) {
                    this.freeRendererByIndex(index);
                }
            }
        };
        p.getElementAt = function (index) {
            index = +index | 0;
            if (index < 0 || index >= this.$dataProvider.length)
                return null;
            var renderer = this.$indexToRenderer[index];
            if (!renderer) {
                var item = this.$dataProvider.getItemAt(index);
                renderer = this.createVirtualRenderer(item);
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                var values = this.$DataGroup;
                if (values[4 /* createNewRendererFlag */]) {
                    renderer.validateNow();
                    values[4 /* createNewRendererFlag */] = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
            return renderer;
        };
        /**
         * 释放指定索引处的项呈示器
         */
        p.freeRendererByIndex = function (index) {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                delete this.$indexToRenderer[index];
                this.doFreeRenderer(renderer);
            }
        };
        p.doFreeRenderer = function (renderer) {
            var values = this.$DataGroup;
            var rendererClass = values[2 /* rendererToClassMap */][renderer.$hashCode];
            var hashCode = rendererClass.$hashCode;
            if (!values[3 /* freeRenderers */][hashCode]) {
                values[3 /* freeRenderers */][hashCode] = [];
            }
            values[3 /* freeRenderers */][hashCode].push(renderer);
            renderer.visible = false;
        };
        /**
         * 标记组件，以便在稍后屏幕更新期间调用该组件的 measure() 方法
         */
        p.invalidateSize = function () {
            if (!this.$DataGroup[4 /* createNewRendererFlag */]) {
                _super.prototype.invalidateSize.call(this);
            }
        };
        /**
         * 为指定索引创建虚拟的项呈示器
         */
        p.createVirtualRenderer = function (item) {
            var renderer;
            var rendererClass = this.itemToRendererClass(item);
            var hashCode = rendererClass.$hashCode;
            var values = this.$DataGroup;
            var freeRenderers = values[3 /* freeRenderers */];
            if (freeRenderers[hashCode] && freeRenderers[hashCode].length > 0) {
                renderer = freeRenderers[hashCode].pop();
                renderer.visible = true;
                return renderer;
            }
            values[4 /* createNewRendererFlag */] = true;
            return this.createOneRenderer(rendererClass);
        };
        /**
         * 根据rendererClass创建一个Renderer,并添加到显示列表
         */
        p.createOneRenderer = function (rendererClass) {
            var renderer = (new rendererClass());
            this.$DataGroup[2 /* rendererToClassMap */][renderer.$hashCode] = rendererClass;
            if (!lark.is(renderer, 1007 /* IItemRenderer */)) {
                return null;
            }
            this.addChild(renderer);
            return renderer;
        };
        d(p, "dataProvider",
            /**
             * 列表数据源，请使用实现了ICollection接口的数据类型，例如 ArrayCollection
             */
            function () {
                return this.$dataProvider;
            },
            function (value) {
                this.$setDataProvider(value);
            }
        );
        p.$setDataProvider = function (value) {
            if (this.$dataProvider == value)
                return;
            this.removeDataProviderListener();
            this.$dataProvider = value;
            this.$dataProviderChanged = true;
            this.$DataGroup[10 /* cleanFreeRenderer */] = true;
            this.invalidateProperties();
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * 移除数据源监听
         */
        p.removeDataProviderListener = function () {
            if (this.$dataProvider)
                this.$dataProvider.removeListener(swan.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
        };
        /**
         * 数据源改变事件处理
         */
        p.onCollectionChange = function (event) {
            switch (event.kind) {
                case swan.CollectionEventKind.ADD:
                    this.itemAddedHandler(event.items, event.location);
                    break;
                case swan.CollectionEventKind.REMOVE:
                    this.itemRemovedHandler(event.items, event.location);
                    break;
                case swan.CollectionEventKind.UPDATE:
                case swan.CollectionEventKind.REPLACE:
                    this.itemUpdatedHandler(event.items[0], event.location);
                    break;
                case swan.CollectionEventKind.RESET:
                case swan.CollectionEventKind.REFRESH:
                    if (this.$layout && this.$layout.$useVirtualLayout) {
                        var indexToRenderer = this.$indexToRenderer;
                        var keys = Object.keys(indexToRenderer);
                        var length = keys.length;
                        for (var i = 0; i < length; i) {
                            var index = +keys[i];
                            this.freeRendererByIndex(index);
                        }
                    }
                    this.$dataProviderChanged = true;
                    this.invalidateProperties();
                    break;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * 数据源添加项目事件处理
         */
        p.itemAddedHandler = function (items, index) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.itemAdded(items[i], index + i);
            }
            this.resetRenderersIndices();
        };
        /**
         * 数据源移除项目事件处理
         */
        p.itemRemovedHandler = function (items, location) {
            var length = items.length;
            for (var i = length - 1; i >= 0; i--) {
                this.itemRemoved(items[i], location + i);
            }
            this.resetRenderersIndices();
        };
        /**
         * 添加一项
         */
        p.itemAdded = function (item, index) {
            if (this.$layout)
                this.$layout.elementAdded(index);
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.$indexToRenderer.splice(index, 0, null);
                return;
            }
            var renderer = this.createVirtualRenderer(item);
            this.$indexToRenderer.splice(index, 0, renderer);
            if (renderer) {
                this.updateRenderer(renderer, index, item);
                var values = this.$DataGroup;
                if (values[4 /* createNewRendererFlag */]) {
                    values[4 /* createNewRendererFlag */] = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
        };
        /**
         * 移除一项
         */
        p.itemRemoved = function (item, index) {
            if (this.$layout)
                this.$layout.elementRemoved(index);
            var oldRenderer = this.$indexToRenderer[index];
            if (this.$indexToRenderer.length > index)
                this.$indexToRenderer.splice(index, 1);
            if (oldRenderer) {
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.doFreeRenderer(oldRenderer);
                }
                else {
                    this.rendererRemoved(oldRenderer, index, item);
                    this.removeChild(oldRenderer);
                }
            }
        };
        /**
         * 更新当前所有项的索引
         */
        p.resetRenderersIndices = function () {
            var indexToRenderer = this.$indexToRenderer;
            if (indexToRenderer.length == 0)
                return;
            if (this.$layout && this.$layout.$useVirtualLayout) {
                var keys = Object.keys(indexToRenderer);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var index = +keys[i];
                    this.resetRendererItemIndex(index);
                }
            }
            else {
                var indexToRendererLength = indexToRenderer.length;
                for (index = 0; index < indexToRendererLength; index++) {
                    this.resetRendererItemIndex(index);
                }
            }
        };
        /**
         * 数据源更新或替换项目事件处理
         */
        p.itemUpdatedHandler = function (item, location) {
            if (this.$DataGroup[11 /* renderersBeingUpdated */]) {
                return; //防止无限循环
            }
            var renderer = this.$indexToRenderer[location];
            if (renderer)
                this.updateRenderer(renderer, location, item);
        };
        /**
         * 调整指定项呈示器的索引值
         */
        p.resetRendererItemIndex = function (index) {
            var renderer = this.$indexToRenderer[index];
            if (renderer)
                renderer.itemIndex = index;
        };
        d(p, "itemRenderer",
            /**
             * 用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口。<br/>
             * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
             */
            function () {
                return this.$DataGroup[6 /* itemRenderer */];
            },
            function (value) {
                var values = this.$DataGroup;
                if (values[6 /* itemRenderer */] == value)
                    return;
                values[6 /* itemRenderer */] = value;
                values[5 /* itemRendererChanged */] = true;
                values[8 /* typicalItemChanged */] = true;
                values[10 /* cleanFreeRenderer */] = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            }
        );
        d(p, "itemRendererFunction",
            /**
             * 为某个特定数据项返回一个项呈示器类定义的函数。
             * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
             */
            function () {
                return this.$DataGroup[7 /* itemRendererFunction */];
            },
            function (value) {
                var values = this.$DataGroup;
                if (values[7 /* itemRendererFunction */] == value)
                    return;
                values[7 /* itemRendererFunction */] = value;
                values[5 /* itemRendererChanged */] = true;
                values[8 /* typicalItemChanged */] = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            }
        );
        /**
         * 为特定的数据项返回项呈示器的工厂实例
         */
        p.itemToRendererClass = function (item) {
            var rendererClass;
            var values = this.$DataGroup;
            if (values[7 /* itemRendererFunction */]) {
                rendererClass = values[7 /* itemRendererFunction */](item);
            }
            if (!rendererClass) {
                rendererClass = values[6 /* itemRenderer */];
            }
            if (!rendererClass) {
                rendererClass = swan.ItemRenderer;
            }
            if (!rendererClass.$hashCode) {
                rendererClass.$hashCode = lark.$hashCount++;
            }
            return rendererClass;
        };
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        p.createChildren = function () {
            if (!this.$layout) {
                var layout = new swan.VerticalLayout();
                layout.gap = 0;
                layout.horizontalAlign = swan.JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            _super.prototype.createChildren.call(this);
        };
        /**
         * 处理对组件设置的属性
         */
        p.commitProperties = function () {
            var values = this.$DataGroup;
            if (values[5 /* itemRendererChanged */] || this.$dataProviderChanged || values[1 /* useVirtualLayoutChanged */]) {
                this.removeAllRenderers();
                if (this.$layout)
                    this.$layout.clearVirtualLayoutCache();
                this.setTypicalLayoutRect(null);
                values[1 /* useVirtualLayoutChanged */] = false;
                values[5 /* itemRendererChanged */] = false;
                if (this.$dataProvider)
                    this.$dataProvider.on(swan.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                }
                else {
                    this.createRenderers();
                }
                if (this.$dataProviderChanged) {
                    this.$dataProviderChanged = false;
                    this.scrollV = this.scrollH = 0;
                }
            }
            _super.prototype.commitProperties.call(this);
            if (values[8 /* typicalItemChanged */]) {
                values[8 /* typicalItemChanged */] = false;
                if (this.$dataProvider && this.$dataProvider.length > 0) {
                    values[12 /* typicalItem */] = this.$dataProvider.getItemAt(0);
                    this.measureRendererSize();
                }
            }
        };
        /**
         * 计算组件的默认大小和（可选）默认最小大小
         */
        p.measure = function () {
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            _super.prototype.measure.call(this);
        };
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            var useVirtualLayout = (this.$layout && this.$layout.$useVirtualLayout);
            if (useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var values = this.$DataGroup;
            if (useVirtualLayout) {
                //检查索引 0 处的项测量大小是否发生改变，若改变就重新计算 typicalLayoutRect
                var rect = values[9 /* typicalLayoutRect */];
                if (rect) {
                    var renderer = this.$indexToRenderer[0];
                    if (renderer) {
                        var bounds = lark.$TempRectangle;
                        renderer.getPreferredBounds(bounds);
                        if (bounds.width != rect.width || bounds.height != rect.height) {
                            values[9 /* typicalLayoutRect */] = null;
                        }
                    }
                }
            }
        };
        /**
         * 确保测量过默认条目大小。
         */
        p.ensureTypicalLayoutElement = function () {
            if (this.$DataGroup[9 /* typicalLayoutRect */])
                return;
            if (this.$dataProvider && this.$dataProvider.length > 0) {
                this.$DataGroup[12 /* typicalItem */] = this.$dataProvider.getItemAt(0);
                this.measureRendererSize();
            }
        };
        /**
         * 测量项呈示器默认尺寸
         */
        p.measureRendererSize = function () {
            var values = this.$DataGroup;
            if (!values[12 /* typicalItem */]) {
                this.setTypicalLayoutRect(null);
                return;
            }
            var typicalRenderer = this.createVirtualRenderer(values[12 /* typicalItem */]);
            if (!typicalRenderer) {
                this.setTypicalLayoutRect(null);
                return;
            }
            this.updateRenderer(typicalRenderer, 0, values[12 /* typicalItem */]);
            typicalRenderer.validateNow();
            var bounds = lark.$TempRectangle;
            typicalRenderer.getPreferredBounds(bounds);
            var rect = new lark.Rectangle(0, 0, bounds.width, bounds.height);
            if (this.$layout && this.$layout.$useVirtualLayout) {
                if (values[4 /* createNewRendererFlag */]) {
                    this.rendererAdded(typicalRenderer, 0, values[12 /* typicalItem */]);
                }
                this.doFreeRenderer(typicalRenderer);
            }
            else {
                this.removeChild(typicalRenderer);
            }
            this.setTypicalLayoutRect(rect);
            values[4 /* createNewRendererFlag */] = false;
        };
        /**
         * 设置项目默认大小
         */
        p.setTypicalLayoutRect = function (rect) {
            this.$DataGroup[9 /* typicalLayoutRect */] = rect;
            if (this.$layout) {
                if (rect) {
                    this.$layout.setTypicalSize(rect.width, rect.height);
                }
                else {
                    this.$layout.setTypicalSize(0, 0);
                }
            }
        };
        /**
         * 移除所有项呈示器
         */
        p.removeAllRenderers = function () {
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = keys[i];
                var renderer = indexToRenderer[index];
                if (renderer) {
                    this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                    this.removeChild(renderer);
                }
            }
            this.$indexToRenderer = [];
            var values = this.$DataGroup;
            if (values[10 /* cleanFreeRenderer */]) {
                var freeRenderers = values[3 /* freeRenderers */];
                var keys = Object.keys(freeRenderers);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var hashCode = keys[i];
                    var list = freeRenderers[hashCode];
                    var length = list.length;
                    for (var i = 0; i < length; i++) {
                        renderer = list[i];
                        this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                        this.removeChild(renderer);
                    }
                }
                values[3 /* freeRenderers */] = {};
                values[2 /* rendererToClassMap */] = {};
                values[10 /* cleanFreeRenderer */] = false;
            }
        };
        /**
         * 为数据项创建项呈示器
         */
        p.createRenderers = function () {
            if (!this.$dataProvider)
                return;
            var index = 0;
            var length = this.$dataProvider.length;
            for (var i = 0; i < length; i++) {
                var item = this.$dataProvider.getItemAt(i);
                var rendererClass = this.itemToRendererClass(item);
                var renderer = this.createOneRenderer(rendererClass);
                if (!renderer)
                    continue;
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                this.rendererAdded(renderer, index, item);
                index++;
            }
        };
        /**
         * 更新项呈示器
         */
        p.updateRenderer = function (renderer, itemIndex, data) {
            var values = this.$DataGroup;
            values[11 /* renderersBeingUpdated */] = true;
            renderer.itemIndex = itemIndex;
            renderer.data = data;
            values[11 /* renderersBeingUpdated */] = false;
            return renderer;
        };
        d(p, "numElements",
            /**
             * 获得对象容器的子对象总数
             */
            function () {
                if (!this.$dataProvider)
                    return 0;
                return this.$dataProvider.length;
            },undefined
        );
        /**
         * 项呈示器被添加
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        p.rendererAdded = function (renderer, index, item) {
        };
        /**
         * 项呈示器被移除
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        p.rendererRemoved = function (renderer, index, item) {
        };
        return DataGroup;
    })(swan.Group);
    swan.DataGroup = DataGroup;
    swan.registerProperty(DataGroup, "itemRenderer", "Class");
    swan.registerProperty(DataGroup, "dataProvider", "swan.ICollection", true);
    lark.registerClass(DataGroup, 1003 /* DataGroup */);
    if (DEBUG) {
        lark.$markReadOnly(DataGroup.prototype, "numElements");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 带有标题，关闭按钮，可移动区域的面板组件。注意：当第一次通过触摸交互操作移动面板时，面板的 includeInLayout 属性将会自动被设置为false，
     * 以确保移动不会受到自动布局属性的影响。若之后还需要启用面板在父级容器中的自动布局，需手动设置 includeInLayout 为 true。
     * @event swan.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，监听此事件并调用event.preventDefault()能够阻止面板被关闭。
     */
    var Panel = (function (_super) {
        __extends(Panel, _super);
        /**
         * 创建一个Panel实例
         */
        function Panel() {
            _super.call(this);
            /**
             * [SkinPart]关闭按钮
             */
            this.closeButton = null;
            /**
             * [SkinPart]可移动区域
             */
            this.moveArea = null;
            /**
             * [SkinPart]标题显示对象
             */
            this.titleDisplay = null;
            this._title = "";
            /**
             * 鼠标按下时的偏移量
             */
            this.offsetPointX = 0;
            this.offsetPointY = 0;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onWindowMouseDown, this, false, 100);
        }
        var d = __define,c=Panel;p=c.prototype;
        /**
         * 在窗体上按下时前置窗口
         */
        p.onWindowMouseDown = function (event) {
            this.$parent.addChild(this);
        };
        d(p, "title",
            /**
             * 标题文本内容
             */
            function () {
                return this._title;
            },
            function (value) {
                this._title = value;
                if (this.titleDisplay)
                    this.titleDisplay.text = this.title;
            }
        );
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.titleDisplay) {
                this.titleDisplay.text = this._title;
            }
            else if (instance == this.moveArea) {
                this.moveArea.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.on(lark.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.moveArea) {
                this.moveArea.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.removeListener(lark.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        /**
         * 关闭按钮被点击事件
         */
        p.onCloseButtonClick = function (event) {
            if (swan.UIEvent.emitUIEvent(this, swan.UIEvent.CLOSING)) {
                this.close();
            }
        };
        /**
         * 关闭面板，从父级容器移除自身。
         */
        p.close = function () {
            if (!this.$parent) {
                return;
            }
            this.$parent.removeChild(this);
        };
        /**
         * 在可移动区域按下
         */
        p.onTouchBegin = function (event) {
            this.$includeInLayout = false;
            this.offsetPointX = this.x - event.$stageX;
            this.offsetPointY = this.y - event.$stageY;
            this.$stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        /**
         * 触摸拖拽时的移动事件
         */
        p.onTouchMove = function (event) {
            this.x = event.$stageX + this.offsetPointX;
            this.y = event.$stageY + this.offsetPointY;
        };
        /**
         * 鼠标在舞台上弹起事件
         */
        p.onTouchEnd = function (event) {
            this.$stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        return Panel;
    })(swan.Component);
    swan.Panel = Panel;
    lark.registerClass(Panel, 1024 /* Panel */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @language en_US
     * The Range class holds a value and an allowed range for that
     * value, defined by <code>minimum</code> and <code>maximum</code> properties.
     *
     * The <code>value</code> property
     * is always constrained to be between the current <code>minimum</code> and
     * <code>maximum</code>, and the <code>minimum</code>,
     * and <code>maximum</code> are always constrained
     * to be in the proper numerical order, such that
     * <code>(minimum <= value <= maximum)</code> is <code>true</code>.
     *
     * If the value of the <code>snapInterval</code> property is not 0,
     * then the <code>value</code> property is also constrained to be a multiple of
     * <code>snapInterval</code>.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 范围选取组件,该组件包含一个值和这个值所允许的最大最小约束范围。
     *
     * <code>value</code>属性的值永远被限制于当前的<code>minimum</code>和
     * <code>maximum</code>之间，并且<code>minimum</code>和 <code>maximum</code>永远按照固定的书序排列，
     * 即<code>(minimum <= value <= maximum)</code> 为真。
     *
     * 如果<code>snapInterval</code>属性的值不是0，那么<code>value</code>的值也会被<code>snapInterval</code>所约束。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var Range = (function (_super) {
        __extends(Range, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Range 实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        function Range() {
            _super.call(this);
            this.$Range = {
                0: 100,
                1: false,
                2: 0,
                3: false,
                4: 0,
                5: 0,
                6: false,
                7: 1,
                8: false,
                9: false,
            };
        }
        var d = __define,c=Range;p=c.prototype;
        d(p, "maximum",
            /**
             * @language en_US
             * The maximum valid <code>value</code>.<p/>
             *
             * Changes to the value property are constrained
             * by <code>commitProperties()</code> to be less than or equal to
             * maximum with the <code>nearestValidValue()</code> method.
             *
             * @default 100
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 最大有效值。<p/>
             *
             * 规定<code>value<code/>属性的值不能够超过的最大值。该修正过程
             * 将在<code>nearestValidValue()</code>方法中进行。
             *
             * @default 100
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$Range[0 /* maximum */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$Range;
                if (value === values[0 /* maximum */])
                    return;
                values[0 /* maximum */] = value;
                values[1 /* maxChanged */] = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        d(p, "minimum",
            /**
             * @language en_US
             * The minimum valid <code>value</code>.<p/>
             *
             * Changes to the value property are constrained
             * by <code>commitProperties()</code> to be greater than or equal to
             * minimum with the <code>nearestValidValue()</code> method.
             *
             * @default 0
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 最小有效值<p/>
             *
             * 规定<code>value<code/>属性的值不能够低于的最小值。该修正过程
             * 将在<code>nearestValidValue()</code>方法中进行。
             *
             * @default 0
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$Range[2 /* minimum */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$Range;
                if (value === values[2 /* minimum */])
                    return;
                values[2 /* minimum */] = value;
                values[3 /* minChanged */] = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        d(p, "value",
            /**
             * @language en_US
             * The current value for this range.<p/>
             *
             * Changes to the value property are constrained
             * by <code>commitProperties()</code> to be greater than or equal to
             * the <code>minimum</code> property, less than or equal to the <code>maximum</code> property, and a
             * multiple of <code>snapInterval</code> with the <code>nearestValidValue()</code>
             * method.
             *
             * @default 0
             * @see #setValue()
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 此范围的当前值。<p/>
             *
             * 改变的<code>value</code>属性将在<code>commitProperties()</code>方法中被<code>minimum</code>属性
             * 和<code>minimum</code>属性所限制。此修正过程将在<code>nearestValidValue()</code>方法中进行。
             *
             * @default 0
             * @see #setValue()
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                var values = this.$Range;
                return values[6 /* valueChanged */] ? values[5 /* changedValue */] : values[4 /* value */];
            },
            function (newValue) {
                newValue = +newValue || 0;
                this.$setValue(newValue);
            }
        );
        /**
         * @private
         *
         * @param newValue
         */
        p.$setValue = function (newValue) {
            if (newValue === this.value)
                return;
            var values = this.$Range;
            values[5 /* changedValue */] = newValue;
            values[6 /* valueChanged */] = true;
            this.invalidateProperties();
        };
        d(p, "snapInterval",
            /**
             * @language en_US
             * The snapInterval property controls the valid values of the <code>value</code> property.
             *
             * If nonzero, valid values are the sum of the <code>minimum</code> and integer multiples
             * of this property, for all sums that are less than or equal to the <code>maximum</code>.<p/>
             *
             * For example, if <code>minimum</code> is 10, <code>maximum</code> is 20, and this property is 3, then the
             * valid values of this Range are 10, 13, 16, 19, and 20.<p/>
             *
             * If the value of this property is zero, then valid values are only constrained
             * to be between minimum and maximum inclusive.
             *
             * @default 1
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * snapInterval 属性定义 value 属性的有效值。
             * 如果为非零，则有效值为 minimum 与此属性的整数倍数之和，且小于或等于 maximum。</p>
             *
             * 例如，如果 minimum 为 10，maximum 为 20，而此属性为 3，则可能的有效值为 10、13、16、19 和 20.</p>
             *
             * 如果此属性的值为零，则仅会将有效值约束到介于 minimum 和 maximum 之间（包括两者）。
             *
             * @default 1
             * @see #nearestValidValue()
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$Range[7 /* snapInterval */];
            },
            function (value) {
                var values = this.$Range;
                values[9 /* explicitSnapInterval */] = true;
                value = +value || 0;
                if (value === values[7 /* snapInterval */])
                    return;
                if (lark.isNone(value)) {
                    values[7 /* snapInterval */] = 1;
                    values[9 /* explicitSnapInterval */] = false;
                }
                else {
                    values[7 /* snapInterval */] = value;
                }
                values[8 /* snapIntervalChanged */] = true;
                this.invalidateProperties();
            }
        );
        /**
         * @language en_US
         * Processes the properties set on the component.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            var values = this.$Range;
            if (values[2 /* minimum */] > values[0 /* maximum */]) {
                if (!values[1 /* maxChanged */])
                    values[2 /* minimum */] = values[0 /* maximum */];
                else
                    values[0 /* maximum */] = values[2 /* minimum */];
            }
            if (values[6 /* valueChanged */] || values[1 /* maxChanged */] || values[3 /* minChanged */] || values[8 /* snapIntervalChanged */]) {
                var currentValue = values[6 /* valueChanged */] ? values[5 /* changedValue */] : values[4 /* value */];
                values[6 /* valueChanged */] = false;
                values[1 /* maxChanged */] = false;
                values[3 /* minChanged */] = false;
                values[8 /* snapIntervalChanged */] = false;
                this.setValue(this.nearestValidValue(currentValue, values[7 /* snapInterval */]));
            }
        };
        /**
         * @private
         * 修正size到最接近snapInterval的整数倍
         */
        p.nearestValidSize = function (size) {
            var interval = this.snapInterval;
            if (interval == 0)
                return size;
            var validSize = Math.round(size / interval) * interval;
            return (Math.abs(validSize) < interval) ? interval : validSize;
        };
        /**
         * @language en_US
         * Returns the sum of the minimum with an integer multiple of <code>interval</code> that's
         * closest to <code>value</code>, unless <code>value</code> is closer to the maximum limit,
         * in which case the maximum is returned.<p/>
         *
         * If <code>interval</code> is equal to 0, the value is clipped to the minimum and maximum
         * limits.<p/>
         *
         * The valid values for a range are defined by the sum of the <code>minimum</code> property
         * with multiples of the <code>interval</code> and also defined to be less than or equal to the
         * <code>maximum</code> property.
         * The maximum need not be a multiple of <code>snapInterval</code>.<p/>
         *
         * For example, if <code>minimum</code> is equal to 1, <code>maximum</code> is equal to 6,
         * and <code>snapInterval</code> is equal to 2, the valid
         * values for the Range are 1, 3, 5, 6.
         *
         * Similarly, if <code>minimum</code> is equal to 2, <code>maximum</code> is equal to 9,
         * and <code>snapInterval</code> is equal to 1.5, the valid
         * values for the Range are 2, 3.5, 5, 6.5, 8, and 9.
         *
         * @param value The input value.
         * @param interval The value of snapInterval or an integer multiple of snapInterval.
         * @return The valid value that's closest to the input.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回 <code>minimum</code> 与最接近 <code>value</code> 的 <code>interval</code> 的整数倍数之和，
         * 除非 <code>value</code> 接近最大值限制的时候会返回 maximum。<p/>
         *
         * 如果 <code>interval</code> 等于 0，则会将该值剪裁到限制的最小值和最大值。<p/>
         *
         * 范围的有效值由 <code>minimum</code> 属性与 <code>interval</code> 的倍数之和决定，
         * 与此同时也要小于等于 <code>maximum</code> 属性。
         * 最大值不能是 <code>snapInterval</code> 属性的倍数。<p/>
         *
         * 例如，如果 <code>minimum</code> 等于 1，<code>maximum</code> 等于 6，且 <code>snapInterval</code> 等于 3，
         * 则 Range 的有效值有 1、2、5、6。
         *
         * 类似地，如果 <code>minimum</code> 等于 2，<code>maximum</code> 等于 9，
         * 且 <code>snapInterval</code> 等于 1.5，则 Range 的有效值有 2、3.5、5、6.5、8 和 9。
         *
         *
         * @param value 输入值。
         * @param interval snapInterval 的值，或 snapInterval 的整数倍数。
         * @return 最近接输入值的有效值。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.nearestValidValue = function (value, interval) {
            var values = this.$Range;
            if (interval == 0)
                return Math.max(values[2 /* minimum */], Math.min(values[0 /* maximum */], value));
            var maxValue = values[0 /* maximum */] - values[2 /* minimum */];
            var scale = 1;
            value -= values[2 /* minimum */];
            if (interval != Math.round(interval)) {
                var parts = ((1 + interval).toString()).split(".");
                scale = Math.pow(10, parts[1].length);
                maxValue *= scale;
                value = Math.round(value * scale);
                interval = Math.round(interval * scale);
            }
            var lower = Math.max(0, Math.floor(value / interval) * interval);
            var upper = Math.min(maxValue, Math.floor((value + interval) / interval) * interval);
            var validValue = ((value - lower) >= ((upper - lower) / 2)) ? upper : lower;
            return (validValue / scale) + values[2 /* minimum */];
        };
        /**
         * @language en_US
         * Sets the current value for the <code>value</code> property.<p/>
         *
         * This method assumes that the caller has already used the <code>nearestValidValue()</code> method
         * to constrain the value parameter
         *
         * @param value The new value of the <code>value</code> property.
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置当前值。<p/>
         *
         * 此方法假定调用者已经使用了 nearestValidValue() 方法来约束 value 参数。
         *
         * @param value value属性的新值
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.setValue = function (value) {
            var values = this.$Range;
            if (values[4 /* value */] === value)
                return;
            if (values[0 /* maximum */] > values[2 /* minimum */])
                values[4 /* value */] = Math.min(values[0 /* maximum */], Math.max(values[2 /* minimum */], value));
            else
                values[4 /* value */] = value;
            values[6 /* valueChanged */] = false;
            this.invalidateDisplayList();
            swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "value");
        };
        /**
         * @language en_US
         * Draws the object and/or sizes and positions its children.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制对象和/或设置其子项的大小和位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (w, h) {
            _super.prototype.updateDisplayList.call(this, w, h);
            this.updateSkinDisplayList();
        };
        /**
         * @language en_US
         * Update size and visible of skin parts.<p/>
         * Subclasses override this method to update skin parts display based on <code>minimum</code>, <code>maximum</code>
         * and <code>value</code> properties.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新皮肤部件（通常为滑块）的大小和可见性。<p/>
         * 子类覆盖此方法以基于 minimum、maximum 和 value 属性更新滑块的大小、位置和可见性。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.updateSkinDisplayList = function () {
        };
        return Range;
    })(swan.Component);
    swan.Range = Range;
    /**
     * @private
     */
    swan.registerBindable(Range.prototype, "value");
    /**
     * @private
     */
    lark.registerClass(Range, 1041 /* Range */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 层级堆叠容器,一次只显示一个子对象。
     */
    var ViewStack = (function (_super) {
        __extends(ViewStack, _super);
        /**
         * 创建一个ViewStack实例
         */
        function ViewStack() {
            _super.call(this);
            this._selectedChild = null;
            /**
             * 在属性提交前缓存选中项索引
             */
            this.proposedSelectedIndex = swan.ListBase.NO_PROPOSED_SELECTION;
            this._selectedIndex = -1;
        }
        var d = __define,c=ViewStack;p=c.prototype;
        d(p, "layout",
            /**
             * 此容器的布局对象为只读,默认限制为BasicLayout。
             */
            function () {
                return this.$layout;
            },undefined
        );
        d(p, "selectedChild",
            /**
             * 当前选中的子项
             */
            function () {
                var index = this.selectedIndex;
                if (index >= 0 && index < this.numChildren)
                    return this.getChildAt(index);
                return null;
            },
            function (value) {
                var index = this.getChildIndex(value);
                if (index >= 0 && index < this.numChildren)
                    this.setSelectedIndex(index);
            }
        );
        d(p, "selectedIndex",
            /**
             * 当前选中子项的索引
             */
            function () {
                return this.proposedSelectedIndex != swan.ListBase.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex;
            },
            function (value) {
                value = +value | 0;
                this.setSelectedIndex(value);
            }
        );
        /**
         * 设置选中项索引
         */
        p.setSelectedIndex = function (value) {
            if (value == this.selectedIndex) {
                return;
            }
            this.proposedSelectedIndex = value;
            this.invalidateProperties();
            swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
        };
        /**
         * 一个子项被添加到容器内，此方法不仅在操作addChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        p.$childAdded = function (child, index) {
            _super.prototype.$childAdded.call(this, child, index);
            this.showOrHide(child, false);
            var selectedIndex = this.selectedIndex;
            if (selectedIndex == -1) {
                this.setSelectedIndex(index);
            }
            else if (index <= this.selectedIndex && this.$stage) {
                this.setSelectedIndex(selectedIndex + 1);
            }
            swan.CollectionEvent.emitCollectionEvent(this, swan.CollectionEvent.COLLECTION_CHANGE, swan.CollectionEventKind.ADD, index, -1, [child.name]);
        };
        /**
         * 一个子项从容器内移除，此方法不仅在操作removeChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        p.$childRemoved = function (child, index) {
            _super.prototype.$childRemoved.call(this, child, index);
            this.showOrHide(child, true);
            var selectedIndex = this.selectedIndex;
            if (index == selectedIndex) {
                if (this.numChildren > 0) {
                    if (index == 0) {
                        this.proposedSelectedIndex = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0);
                }
                else
                    this.setSelectedIndex(-1);
            }
            else if (index < selectedIndex) {
                this.setSelectedIndex(selectedIndex - 1);
            }
            swan.CollectionEvent.emitCollectionEvent(this, swan.CollectionEvent.COLLECTION_CHANGE, swan.CollectionEventKind.REMOVE, index, -1, [child.name]);
        };
        /**
         * 处理对组件设置的属性
         */
        p.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.proposedSelectedIndex != swan.ListBase.NO_PROPOSED_SELECTION) {
                this.commitSelection(this.proposedSelectedIndex);
                this.proposedSelectedIndex = swan.ListBase.NO_PROPOSED_SELECTION;
            }
        };
        p.commitSelection = function (newIndex) {
            if (newIndex >= 0 && newIndex < this.numChildren) {
                this._selectedIndex = newIndex;
                if (this._selectedChild) {
                    this.showOrHide(this._selectedChild, false);
                }
                this._selectedChild = this.getElementAt(this._selectedIndex);
                this.showOrHide(this._selectedChild, true);
            }
            else {
                this._selectedChild = null;
                this._selectedIndex = -1;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        p.showOrHide = function (child, visible) {
            if (lark.is(child, 1001 /* UIComponent */)) {
                child.includeInLayout = visible;
            }
            child.visible = visible;
        };
        d(p, "length",
            /**
             * 子项数量
             */
            function () {
                return this.$children.length;
            },undefined
        );
        p.getItemAt = function (index) {
            var element = this.$children[index];
            return element ? element.name : "";
        };
        p.getItemIndex = function (item) {
            var list = this.$children;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                if (list[i].name == item) {
                    return i;
                }
            }
            return -1;
        };
        return ViewStack;
    })(swan.Group);
    swan.ViewStack = ViewStack;
    swan.registerBindable(ViewStack.prototype, "selectedIndex");
    lark.registerClass(ViewStack, 1036 /* ViewStack */);
    if (DEBUG) {
        lark.$markReadOnly(ViewStack.prototype, "length");
        lark.$markReadOnly(ViewStack.prototype, "layout");
    }
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 滚动条组件
     *
     * @event swan.UIEvent.CHANGE_START 滚动位置改变开始
     * @event swan.UIEvent.CHANGE_END 滚动位置改变结束
     */
    var Scroller = (function (_super) {
        __extends(Scroller, _super);
        /**
         * 创建一个 Scroller 实例
         */
        function Scroller() {
            _super.call(this);
            /**
             * [SkinPart] 水平滚动条
             */
            this.horizontalScrollBar = null;
            /**
             * [SkinPart] 垂直滚动条
             */
            this.verticalScrollBar = null;
            var touchScrollH = new swan.sys.TouchScroll(this.horizontalUpdateHandler, this.horizontalEndHandler, this);
            var touchScrollV = new swan.sys.TouchScroll(this.verticalUpdateHandler, this.verticalEndHanlder, this);
            this.$Scroller = {
                0: "auto",
                1: "auto",
                2: null,
                3: 0,
                4: 0,
                5: false,
                6: false,
                7: false,
                8: touchScrollH,
                9: touchScrollV,
                10: null,
                11: null,
                12: null,
            };
        }
        var d = __define,c=Scroller;p=c.prototype;
        d(p, "scrollPolicyV",
            /**
             * 垂直方向是否允许滚动的策略，参见 ScrollPolicy 类定义的常量。默认值：ScrollPolicy.AUTO
             */
            function () {
                return this.$Scroller[0 /* scrollPolicyV */];
            },
            function (value) {
                this.$Scroller[0 /* scrollPolicyV */] = value;
            }
        );
        d(p, "scrollPolicyH",
            /**
             * 水平方向是否允许滚动的策略，参见ScrollPolicy类定义的常量。默认值：ScrollPolicy.AUTO
             */
            function () {
                return this.$Scroller[1 /* scrollPolicyH */];
            },
            function (value) {
                this.$Scroller[1 /* scrollPolicyH */] = value;
            }
        );
        d(p, "viewport",
            /**
             * 要滚动的视域组件。
             */
            function () {
                return this.$Scroller[12 /* viewport */];
            },
            function (value) {
                var values = this.$Scroller;
                if (value == values[12 /* viewport */])
                    return;
                this.uninstallViewport();
                values[12 /* viewport */] = value;
                this.installViewport();
            }
        );
        /**
         * 安装并初始化视域组件
         */
        p.installViewport = function () {
            var viewport = this.viewport;
            if (viewport) {
                viewport.scrollEnabled = true;
                viewport.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.on(lark.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this.addChildAt(viewport, 0);
            }
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = viewport;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = viewport;
            }
        };
        /**
         * 卸载视域组件
         */
        p.uninstallViewport = function () {
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = null;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = null;
            }
            var viewport = this.viewport;
            if (viewport) {
                viewport.scrollEnabled = false;
                viewport.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this.removeChild(viewport);
            }
        };
        p.setSkin = function (skin) {
            _super.prototype.setSkin.call(this, skin);
            var viewport = this.viewport;
            if (viewport) {
                this.addChildAt(viewport, 0);
            }
        };
        p.onTouchEndCapture = function (event) {
            if (this.$Scroller[11 /* delayTouchEvent */]) {
                this.delayEmitEvent(event);
            }
        };
        /**
         * 若这个Scroller可以滚动，阻止当前事件，延迟100ms再抛出。
         */
        p.onTouchBeginCapture = function (event) {
            var canScroll = this.checkScrollPolicy();
            if (!canScroll) {
                return;
            }
            var target = event.target;
            while (target != this) {
                if (target instanceof Scroller) {
                    canScroll = target.checkScrollPolicy();
                    if (canScroll) {
                        return;
                    }
                }
                target = target.$parent;
            }
            this.delayEmitEvent(event);
            this.onTouchBegin(event);
        };
        p.delayEmitEvent = function (event) {
            var values = this.$Scroller;
            if (values[11 /* delayTouchEvent */]) {
                this.onDelayTouchEventTimer();
            }
            event.stopPropagation();
            var touchEvent = lark.Event.create(lark.TouchEvent, event.$type, event.$bubbles, event.$cancelable);
            touchEvent.$setTo(event.$stageX, event.$stageY, event.touchPointID);
            touchEvent.$target = event.$target;
            values[11 /* delayTouchEvent */] = touchEvent;
            if (!values[10 /* delayTouchTimer */]) {
                values[10 /* delayTouchTimer */] = new lark.Timer(100, 1);
                values[10 /* delayTouchTimer */].on(lark.TimerEvent.TIMER_COMPLETE, this.onDelayTouchEventTimer, this);
            }
            values[10 /* delayTouchTimer */].start();
        };
        p.onDelayTouchEventTimer = function (e) {
            var values = this.$Scroller;
            values[10 /* delayTouchTimer */].stop();
            var event = values[11 /* delayTouchEvent */];
            values[11 /* delayTouchEvent */] = null;
            var viewport = values[12 /* viewport */];
            if (!viewport) {
                return;
            }
            var target = event.$target;
            var list = this.$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === viewport) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, startIndex + 1);
            targetIndex -= startIndex + 1;
            this.$emitPropagationEvent(event, list, targetIndex);
            lark.Event.release(event);
        };
        /**
         * 检查当前滚动策略，若有一个方向可以滚动，返回true。
         */
        p.checkScrollPolicy = function () {
            var values = this.$Scroller;
            var viewport = values[12 /* viewport */];
            var hCanScroll;
            var uiValues = viewport.$UIComponent;
            switch (values[1 /* scrollPolicyH */]) {
                case "auto":
                    if (viewport.contentWidth > uiValues[10 /* width */]) {
                        hCanScroll = true;
                    }
                    else {
                        hCanScroll = false;
                    }
                    break;
                case "on":
                    hCanScroll = true;
                    break;
                case "off":
                    hCanScroll = false;
                    break;
            }
            values[6 /* horizontalCanScroll */] = hCanScroll;
            var vCanScroll;
            switch (values[0 /* scrollPolicyV */]) {
                case "auto":
                    if (viewport.contentHeight > uiValues[11 /* height */]) {
                        vCanScroll = true;
                    }
                    else {
                        vCanScroll = false;
                    }
                    break;
                case "on":
                    vCanScroll = true;
                    break;
                case "off":
                    vCanScroll = false;
                    break;
            }
            values[7 /* verticalCanScroll */] = vCanScroll;
            return hCanScroll || vCanScroll;
        };
        p.onTouchBegin = function (event) {
            if (event.isDefaultPrevented()) {
                return;
            }
            if (!this.checkScrollPolicy()) {
                return;
            }
            var values = this.$Scroller;
            values[9 /* touchScrollV */].stop();
            values[8 /* touchScrollH */].stop();
            var viewport = values[12 /* viewport */];
            values[3 /* touchStartX */] = event.$stageX;
            values[4 /* touchStartY */] = event.$stageY;
            var uiValues = viewport.$UIComponent;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].start(event.$stageX, viewport.scrollH, viewport.contentWidth - uiValues[10 /* width */]);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].start(event.$stageY, viewport.scrollV, viewport.contentHeight - uiValues[11 /* height */]);
            }
            var stage = this.$stage;
            stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            event.preventDefault();
        };
        p.onTouchMove = function (event) {
            var values = this.$Scroller;
            if (!values[5 /* touchMoved */]) {
                if (Math.abs(values[3 /* touchStartX */] - event.$stageX) < Scroller.scrollThreshold && Math.abs(values[4 /* touchStartY */] - event.$stageY) < Scroller.scrollThreshold) {
                    return;
                }
                values[5 /* touchMoved */] = true;
                var horizontalBar = this.horizontalScrollBar;
                var verticalBar = this.verticalScrollBar;
                if (horizontalBar && values[6 /* horizontalCanScroll */]) {
                    horizontalBar.visible = true;
                }
                if (verticalBar && values[7 /* verticalCanScroll */]) {
                    verticalBar.visible = true;
                }
                if (values[2 /* autoHideTimer */]) {
                    values[2 /* autoHideTimer */].reset();
                }
            }
            swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_START);
            if (values[11 /* delayTouchEvent */]) {
                values[11 /* delayTouchEvent */] = null;
                values[10 /* delayTouchTimer */].stop();
            }
            var viewport = values[12 /* viewport */];
            var uiValues = viewport.$UIComponent;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].update(event.$stageX, viewport.contentWidth - uiValues[10 /* width */]);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].update(event.$stageY, viewport.contentHeight - uiValues[11 /* height */]);
            }
        };
        p.onTouchEnd = function (event) {
            var values = this.$Scroller;
            values[5 /* touchMoved */] = false;
            var stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            var viewport = values[12 /* viewport */];
            var uiValues = viewport.$UIComponent;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].finish(viewport.scrollH, viewport.contentWidth - uiValues[10 /* width */]);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].finish(viewport.scrollV, viewport.contentHeight - uiValues[11 /* height */]);
            }
        };
        p.horizontalUpdateHandler = function (scrollPos) {
            this.$Scroller[12 /* viewport */].scrollH = scrollPos;
        };
        p.verticalUpdateHandler = function (scrollPos) {
            this.$Scroller[12 /* viewport */].scrollV = scrollPos;
        };
        p.horizontalEndHandler = function () {
            if (!this.$Scroller[9 /* touchScrollV */].isPlaying()) {
                this.onChangeEnd();
            }
        };
        p.verticalEndHanlder = function () {
            if (!this.$Scroller[8 /* touchScrollH */].isPlaying()) {
                this.onChangeEnd();
            }
        };
        p.onChangeEnd = function () {
            var values = this.$Scroller;
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar && horizontalBar.visible || verticalBar && verticalBar.visible) {
                if (!values[2 /* autoHideTimer */]) {
                    values[2 /* autoHideTimer */] = new lark.Timer(200, 1);
                    values[2 /* autoHideTimer */].on(lark.TimerEvent.TIMER_COMPLETE, this.onAutoHideTimer, this);
                }
                values[2 /* autoHideTimer */].reset();
                values[2 /* autoHideTimer */].start();
            }
            swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_END);
        };
        p.onAutoHideTimer = function (event) {
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar) {
                horizontalBar.visible = false;
            }
            if (verticalBar) {
                verticalBar.visible = false;
            }
        };
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var viewport = this.viewport;
            if (viewport) {
                viewport.setLayoutBoundsPosition(0, 0);
                viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
            }
        };
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.horizontalScrollBar) {
                this.horizontalScrollBar.touchChildren = false;
                this.horizontalScrollBar.touchEnabled = false;
                this.horizontalScrollBar.viewport = this.viewport;
                this.horizontalScrollBar.visible = false;
            }
            else if (instance == this.verticalScrollBar) {
                this.verticalScrollBar.touchChildren = false;
                this.verticalScrollBar.touchEnabled = false;
                this.verticalScrollBar.viewport = this.viewport;
                this.verticalScrollBar.visible = false;
            }
        };
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。默认值：5 。
         */
        Scroller.scrollThreshold = 5;
        return Scroller;
    })(swan.Component);
    swan.Scroller = Scroller;
    swan.registerProperty(Scroller, "viewport", "swan.IViewport", true);
    lark.registerClass(Scroller, 1037 /* Scroller */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 进度条控件。
     */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        /**
         * 实例化一个进度条控件
         */
        function ProgressBar() {
            _super.call(this);
            /**
             * [SkinPart]进度高亮显示对象。
             */
            this.thumb = null;
            /**
             * [SkinPart]进度条文本
             */
            this.labelDisplay = null;
            this._labelFunction = null;
            this._slideDuration = 500;
            this._direction = swan.Direction.LTR;
            /**
             * 动画播放结束时要到达的value。
             */
            this.slideToValue = 0;
            this.animationValue = 0;
            this.animation = new swan.sys.Animation(this.animationUpdateHandler, this);
        }
        var d = __define,c=ProgressBar;p=c.prototype;
        d(p, "labelFunction",
            /**
             * 进度条文本格式化回调函数。示例：labelFunction(value:Number,maximum:Number):String;
             */
            function () {
                return this._labelFunction;
            },
            function (value) {
                if (this._labelFunction == value)
                    return;
                this._labelFunction = value;
                this.invalidateDisplayList();
            }
        );
        /**
         * 将当前value转换成文本
         */
        p.valueToLabel = function (value, maximum) {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        };
        d(p, "slideDuration",
            /**
             * value改变时更新视图的缓动动画时间，单位毫秒。设置为0则不执行缓动。默认值500。
             */
            function () {
                return this._slideDuration;
            },
            function (value) {
                value = +value | 0;
                if (this._slideDuration === value)
                    return;
                this._slideDuration = value;
                if (this.animation.isPlaying) {
                    this.animation.stop();
                    this.setValue(this.slideToValue);
                }
            }
        );
        d(p, "direction",
            /**
             * 进度条增长方向。请使用 Direction 定义的常量。默认值：Direction.LTR（从左向右增长）。
             */
            function () {
                return this._direction;
            },
            function (value) {
                if (this._direction == value)
                    return;
                this._direction = value;
                this.invalidateDisplayList();
            }
        );
        p.$setValue = function (newValue) {
            if (this.value === newValue)
                return;
            var values = this.$Range;
            _super.prototype.$setValue.call(this, newValue);
            if (this._slideDuration > 0 && this.$stage) {
                this.validateProperties(); //最大值最小值发生改变时要立即应用，防止当前起始值不正确。
                var animation = this.animation;
                if (animation.isPlaying) {
                    this.animationValue = this.slideToValue;
                    this.invalidateDisplayList();
                    animation.stop();
                }
                this.slideToValue = this.nearestValidValue(newValue, values[7 /* snapInterval */]);
                if (this.slideToValue === this.animationValue)
                    return;
                var duration = this._slideDuration * (Math.abs(this.animationValue - this.slideToValue) / (values[0 /* maximum */] - values[2 /* minimum */]));
                animation.duration = duration === Infinity ? 0 : duration;
                animation.from = this.animationValue;
                animation.to = this.slideToValue;
                animation.play();
            }
            else {
                this.animationValue = this.value;
            }
        };
        /**
         * 动画播放更新数值
         */
        p.animationUpdateHandler = function (animation) {
            var values = this.$Range;
            var value = this.nearestValidValue(animation.currentValue, values[7 /* snapInterval */]);
            this.animationValue = Math.min(values[0 /* maximum */], Math.max(values[2 /* minimum */], value));
            this.invalidateDisplayList();
        };
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance === this.thumb) {
                this.thumb.on(lark.Event.RESIZE, this.onThumbResize, this);
            }
        };
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance === this.thumb) {
                this.thumb.removeListener(lark.Event.RESIZE, this.onThumbResize, this);
            }
        };
        /**
         * thumb的位置或尺寸发生改变
         */
        p.onThumbResize = function (event) {
            this.updateSkinDisplayList();
        };
        /**
         * 更新皮肤部件大小和可见性。
         */
        p.updateSkinDisplayList = function () {
            var currentValue = this.animation.isPlaying ? this.animationValue : this.value;
            var maxValue = this.maximum;
            var thumb = this.thumb;
            if (thumb) {
                var thumbWidth = thumb.width;
                var thumbHeight = thumb.height;
                var clipWidth = Math.round((currentValue / maxValue) * thumbWidth);
                if (clipWidth < 0 || clipWidth === Infinity)
                    clipWidth = 0;
                var clipHeight = Math.round((currentValue / maxValue) * thumbHeight);
                if (clipHeight < 0 || clipHeight === Infinity)
                    clipHeight = 0;
                var rect = thumb.$scrollRect;
                if (!rect) {
                    rect = lark.$TempRectangle;
                }
                rect.setTo(0, 0, thumbWidth, thumbHeight);
                var thumbPosX = thumb.x - rect.x;
                var thumbPosY = thumb.y - rect.y;
                switch (this._direction) {
                    case swan.Direction.LTR:
                        rect.width = clipWidth;
                        thumb.x = thumbPosX;
                        break;
                    case swan.Direction.RTL:
                        rect.width = clipWidth;
                        rect.x = thumbWidth - clipWidth;
                        thumb.x = thumbPosX + rect.x;
                        break;
                    case swan.Direction.TTB:
                        rect.height = clipHeight;
                        thumb.y = thumbPosY;
                        break;
                    case swan.Direction.BTT:
                        rect.height = clipHeight;
                        rect.y = thumbHeight - clipHeight;
                        thumb.y = thumbPosY + rect.y;
                        break;
                }
                thumb.scrollRect = rect;
            }
            if (this.labelDisplay) {
                this.labelDisplay.text = this.valueToLabel(currentValue, maxValue);
            }
        };
        return ProgressBar;
    })(swan.Range);
    swan.ProgressBar = ProgressBar;
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 垂直滚动条
     */
    var VScrollBar = (function (_super) {
        __extends(VScrollBar, _super);
        function VScrollBar() {
            _super.apply(this, arguments);
        }
        var d = __define,c=VScrollBar;p=c.prototype;
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = lark.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbHeight = bounds.height;
            var thumbX = bounds.x;
            var vsp = viewport.scrollV;
            var contentHeight = viewport.contentHeight;
            var height = viewport.height;
            if (vsp <= 0) {
                var scaleHeight = thumbHeight * (1 - (-vsp) / (height * 0.5));
                scaleHeight = Math.max(5, Math.round(scaleHeight));
                thumb.setLayoutBoundsSize(lark.NONE, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, 0);
            }
            else if (vsp >= contentHeight - height) {
                scaleHeight = thumbHeight * (1 - (vsp - contentHeight + height) / (height * 0.5));
                scaleHeight = Math.max(5, Math.round(scaleHeight));
                thumb.setLayoutBoundsSize(lark.NONE, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, unscaledHeight - scaleHeight);
            }
            else {
                var thumbY = (unscaledHeight - thumbHeight) * vsp / (contentHeight - height);
                thumb.setLayoutBoundsSize(lark.NONE, lark.NONE);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        };
        p.onPropertyChanged = function (event) {
            switch (event.property) {
                case "scrollV":
                case "contentHeight":
                    this.invalidateDisplayList();
                    break;
            }
        };
        return VScrollBar;
    })(swan.ScrollBarBase);
    swan.VScrollBar = VScrollBar;
    lark.registerClass(VScrollBar, 1039 /* VScrollBar */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 切换按钮
     * @event lark.Event.CHANGE 选中状态发生改变，仅当触摸操作引起的选中状态改变才会抛出此事件。
     */
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton() {
            _super.apply(this, arguments);
            this.$selected = false;
            /**
             * 是否根据鼠标事件自动变换选中状态,默认true。仅框架内使用。
             */
            this.$autoSelected = true;
        }
        var d = __define,c=ToggleButton;p=c.prototype;
        d(p, "selected",
            /**
             * 按钮处于按下状态时为 true，而按钮处于弹起状态时为 false。
             */
            function () {
                return this.$selected;
            },
            function (value) {
                this.$setSelected(value);
            }
        );
        p.$setSelected = function (value) {
            value = !!value;
            if (value === this.$selected)
                return;
            this.$selected = value;
            this.invalidateState();
            swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selected");
        };
        /**
         * 返回要应用到外观的状态的名称
         */
        p.getCurrentState = function () {
            var state = _super.prototype.getCurrentState.call(this);
            if (!this.$selected) {
                return state;
            }
            else {
                var selectedState = state + "AndSelected";
                var skin = this.skin;
                if (skin && skin.hasState(selectedState)) {
                    return selectedState;
                }
                return state == "disabled" ? "disabled" : "down";
            }
        };
        /**
         * 当在用户单击按钮之后处理 MouseEvent.MOUSE_UP 事件时，将调用此方法
         */
        p.buttonReleased = function () {
            if (!this.$autoSelected)
                return;
            this.selected = !this.$selected;
            this.emitWith(lark.Event.CHANGE);
        };
        return ToggleButton;
    })(swan.Button);
    swan.ToggleButton = ToggleButton;
    swan.registerBindable(ToggleButton.prototype, "selected");
    lark.registerClass(ToggleButton, 1026 /* ToggleButton */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @language en_US
     * The SliderBase class lets users select a value by moving a slider thumb between
     * the end points of the slider track.
     * The current value of the slider is determined by the relative location of
     * the thumb between the end points of the slider,
     * corresponding to the slider's minimum and maximum values.
     * The SliderBase class is a base class for HSlider and VSlider.
     *
     * @see swan.HSlider
     * @see swan.VSlider
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 滑块控件基类，通过使用 SliderBase 类，用户可以在滑块轨道的端点之间移动滑块来选择值。
     * 滑块的当前值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。
     * SliderBase 类是 HSlider 和 VSlider 的基类。
     *
     * @see swan.HSlider
     * @see swan.VSlider
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var SliderBase = (function (_super) {
        __extends(SliderBase, _super);
        /**
         * @language en_US
         * Constructor
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 SliderBase 实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        function SliderBase() {
            _super.call(this);
            /**
             * @language en_US
             * [SkinPart] Highlight of track
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart] 轨道高亮显示对象
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            this.trackHighlight = null;
            /**
             * @language en_US
             * [SkinPart] Thumb display object
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart]滑块显示对象
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            this.thumb = null;
            /**
             * @language en_US
             * [SkinPart] Track display object
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart]轨道显示对象
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            this.track = null;
            this.$SliderBase = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: null,
                5: null,
                6: 300,
                7: 0,
                8: 0,
                9: true,
            };
            this.maximum = 10;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        var d = __define,c=SliderBase;p=c.prototype;
        d(p, "slideDuration",
            /**
             * @language en_US
             * Duration in milliseconds for the sliding animation when you tap on the track to move a thumb.
             *
             * @default 300
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 在轨道上单击以移动滑块时，滑动动画持续的时间（以毫秒为单位）。设置为0将不执行缓动。
             *
             * @default 300
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$SliderBase[6 /* slideDuration */];
            },
            function (value) {
                this.$SliderBase[6 /* slideDuration */] = +value || 0;
            }
        );
        /**
         * @language en_US
         * Converts a track-relative x,y pixel location into a value between
         * the minimum and maximum, inclusive.
         *
         * @param x The x coordinate of the location relative to the track's origin.
         * @param y The y coordinate of the location relative to the track's origin.
         * @return A value between the minimum and maximum, inclusive.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值。
         *
         * @param x 相对于轨道原点的位置的x坐标。
         * @param y 相对于轨道原点的位置的y坐标。
         * @return 介于最小值和最大值（包括两者）之间的一个值。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.pointToValue = function (x, y) {
            return this.minimum;
        };
        d(p, "liveDragging",
            /**
             * @language en_US
             * Specifies whether live dragging is enabled for the slider. If true, sets the value
             * and values properties and dispatches the change event continuously as
             * the user moves the thumb.
             *
             * @default true
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 如果为 true，则将在沿着轨道拖动滑块时，而不是在释放滑块按钮时，提交此滑块的值。
             *
             * @default true
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$SliderBase[9 /* liveDragging */];
            },
            function (value) {
                this.$SliderBase[9 /* liveDragging */] = !!value;
            }
        );
        d(p, "pendingValue",
            /**
             * @language en_US
             * The value the slider will have when the mouse button is released.
             * This property is updated when the slider thumb moves, even if <code>liveDragging</code> is false.<p/>
             * If the <code>liveDragging</code> style is false, then the slider's value is only set
             * when the mouse button is released.
             *
             * @default 0
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 释放鼠标按键时滑块将具有的值。
             * 无论 liveDragging 是否为 true，在滑块拖动期间始终更新此属性。
             * 而 value 属性在当 liveDragging 为 false 时，只在鼠标释放时更新一次。
             *
             * @default 0
             *
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$SliderBase[7 /* pendingValue */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$SliderBase;
                if (value === values[7 /* pendingValue */])
                    return;
                values[7 /* pendingValue */] = value;
                this.invalidateDisplayList();
            }
        );
        /**
         * @language en_US
         * Sets the backing store for the <code>value</code> property and
         * dispatches a <code>valueCommit</code> event if the property changes.
         *
         * @param value The new value of the <code>value</code> property.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在 value 属性改变时为该属性设置后备存储，并调度 valueCommit 事件。
         *
         * @param value The new value of the <code>value</code> property.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.setValue = function (value) {
            this.$SliderBase[7 /* pendingValue */] = value;
            _super.prototype.setValue.call(this, value);
        };
        /**
         * @inheritDoc
         */
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.thumb) {
                this.thumb.on(lark.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.on(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.on(lark.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.on(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance === this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                if (lark.is(this.trackHighlight, 4 /* DisplayObjectContainer */)) {
                    this.trackHighlight.touchChildren = false;
                }
            }
        };
        /**
         * @inheritDoc
         */
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.thumb) {
                this.thumb.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.removeListener(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.removeListener(lark.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
        };
        /**
         * @private
         * 滑块或轨道尺寸改变事件
         */
        p.onTrackOrThumbResize = function (event) {
            this.updateSkinDisplayList();
        };
        /**
         * @language en_US
         * Handle touch-begin events on the scroll thumb. Records the touch begin point in clickOffset.
         *
         * @param The <code>lark.TouchEvent</code> object.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 滑块触摸开始事件，记录触碰开始的坐标偏移量。
         *
         * @param event 事件 <code>lark.TouchEvent</code> 的对象.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onThumbTouchBegin = function (event) {
            var values = this.$SliderBase;
            if (values[5 /* animation */] && values[5 /* animation */].isPlaying)
                this.stopAnimation();
            var stage = this.$stage;
            stage.on(lark.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.on(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            var clickOffset = this.thumb.globalToLocal(event.stageX, event.stageY, lark.$TempPoint);
            values[0 /* clickOffsetX */] = clickOffset.x;
            values[1 /* clickOffsetY */] = clickOffset.y;
            swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_START);
        };
        /**
         * @private
         * 舞台上触摸移动事件
         */
        p.onStageTouchMove = function (event) {
            var values = this.$SliderBase;
            values[2 /* moveStageX */] = event.$stageX;
            values[3 /* moveStageY */] = event.$stageY;
            var track = this.track;
            if (!track)
                return;
            var p = track.globalToLocal(values[2 /* moveStageX */], values[3 /* moveStageY */], lark.$TempPoint);
            var newValue = this.pointToValue(p.x - values[0 /* clickOffsetX */], p.y - values[1 /* clickOffsetY */]);
            newValue = this.nearestValidValue(newValue, this.snapInterval);
            this.updateWhenTouchMove(newValue);
            event.updateAfterEvent();
        };
        /**
         * @language en_US
         * Capture touch-move events anywhere on or off the stage.
         * @param newValue new value
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 监听舞台的触碰移动事件。
         * @param newValue 新的值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.updateWhenTouchMove = function (newValue) {
            if (newValue != this.$SliderBase[7 /* pendingValue */]) {
                if (this.liveDragging) {
                    this.setValue(newValue);
                    this.emitWith(lark.Event.CHANGE);
                }
                else {
                    this.pendingValue = newValue;
                }
            }
        };
        /**
         * @language en_US
         * Handle mouse-up events anywhere on or off the stage.
         *
         * @param The <code>lark.Event</code> object.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 触摸结束事件
         *
         * @param event 事件 <code>lark.Event</code> 的对象。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_END);
            var values = this.$SliderBase;
            if (!this.liveDragging && this.value != values[7 /* pendingValue */]) {
                this.setValue(values[7 /* pendingValue */]);
                this.emitWith(lark.Event.CHANGE);
            }
        };
        /**
         * @private
         * 当在组件上按下时记录被按下的子显示对象
         */
        p.onTouchBegin = function (event) {
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            this.$SliderBase[4 /* touchDownTarget */] = (event.$target);
        };
        /**
         * @private
         * 当结束时，若不是在 touchDownTarget 上弹起，而是另外的子显示对象上弹起时，额外抛出一个触摸单击事件。
         */
        p.stageTouchEndHandler = function (event) {
            var target = event.$target;
            var values = this.$SliderBase;
            event.$currentTarget.removeListener(lark.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            if (values[4 /* touchDownTarget */] != target && this.contains((target))) {
                lark.TouchEvent.emitTouchEvent(this, lark.TouchEvent.TOUCH_TAP, true, true, event.$stageX, event.$stageY, event.touchPointID);
            }
            values[4 /* touchDownTarget */] = null;
        };
        /**
         * @private
         * 动画播放更新数值
         */
        p.$animationUpdateHandler = function (animation) {
            this.pendingValue = animation.currentValue;
        };
        /**
         * @private
         * 动画播放完毕
         */
        p.animationEndHandler = function (animation) {
            this.setValue(this.$SliderBase[8 /* slideToValue */]);
            this.emitWith(lark.Event.CHANGE);
            swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_END);
        };
        /**
         * @private
         * 停止播放动画
         */
        p.stopAnimation = function () {
            this.$SliderBase[5 /* animation */].stop();
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
            this.emitWith(lark.Event.CHANGE);
            swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_END);
        };
        /**
         * @language en_US
         * Handle touch-begin events for the slider track. We
         * calculate the value based on the new position and then
         * move the thumb to the correct location as well as
         * commit the value.
         * @param The <code>lark.TouchEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 轨道的触碰开始事件。我们会在这里根据新的坐标位置计算value，然后移动滑块到当前位置。
         *
         * @param event 事件 <code>lark.TouchEvent</code> 的对象.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onTrackTouchBegin = function (event) {
            var thumbW = this.thumb ? this.thumb.width : 0;
            var thumbH = this.thumb ? this.thumb.height : 0;
            var offsetX = event.$stageX - (thumbW / 2);
            var offsetY = event.$stageY - (thumbH / 2);
            var p = this.track.globalToLocal(offsetX, offsetY, lark.$TempPoint);
            var rangeValues = this.$Range;
            var newValue = this.pointToValue(p.x, p.y);
            newValue = this.nearestValidValue(newValue, rangeValues[7 /* snapInterval */]);
            var values = this.$SliderBase;
            if (newValue != values[7 /* pendingValue */]) {
                if (values[6 /* slideDuration */] != 0) {
                    if (!values[5 /* animation */]) {
                        values[5 /* animation */] = new swan.sys.Animation(this.$animationUpdateHandler, this);
                        values[5 /* animation */].endFunction = this.animationEndHandler;
                    }
                    var animation = values[5 /* animation */];
                    if (animation.isPlaying)
                        this.stopAnimation();
                    values[8 /* slideToValue */] = newValue;
                    animation.duration = values[6 /* slideDuration */] * (Math.abs(values[7 /* pendingValue */] - values[8 /* slideToValue */]) / (rangeValues[0 /* maximum */] - rangeValues[2 /* minimum */]));
                    animation.from = values[7 /* pendingValue */];
                    animation.to = values[8 /* slideToValue */];
                    swan.UIEvent.emitUIEvent(this, swan.UIEvent.CHANGE_START);
                    animation.play();
                }
                else {
                    this.setValue(newValue);
                    this.emitWith(lark.Event.CHANGE);
                }
            }
        };
        return SliderBase;
    })(swan.Range);
    swan.SliderBase = SliderBase;
    /**
     * @private
     */
    lark.registerClass(SliderBase, 1042 /* SliderBase */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * @language en_US
     * The ListBase class is the base class for list component.
     * It can display items of list as vertical or horizontal such as SELECT of HTML.
     * @event lark.Event.CHANGE Dispatched after the selection has changed.
     * This event is dispatched when the user interacts with the control.
     * @event lark.Event.CHANGING Dispatched when the selection is going to change.
     * Calling the <code>preventDefault()</code> method
     * on the event prevents the selection from changing.<p/>
     * This event is dispatched when the user interacts with the control.
     * @event swan.ItemTapEvent.ITEM_TAP Dispatched when the user tap an item in the control.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ListBase 是列表控件基类。可显示垂直或水平的项目列表。其功能与 HTML 中的 SELECT 表单元素的功能相似。
     * @event lark.Event.CHANGE 选中的索引已经发生改变,注意：此事件仅在索引改变是由用户触摸操作引起时才抛出。
     * @event lark.Event.CHANGING 选中的索引即将发生改变，可以通过调用事件对象的 preventDefault() 方法来阻止改变。<p/>
     * 注意：此事件仅在索引改变是由用户触摸操作引起时才抛出。
     * @event swan.ItemTapEvent.ITEM_TAP 项呈示器单击事件。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    var ListBase = (function (_super) {
        __extends(ListBase, _super);
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        function ListBase() {
            _super.call(this);
            this.$ListBase = {
                0: false,
                1: false,
                2: -2,
                3: -1,
                4: false,
                5: undefined,
                6: false,
                7: null,
            };
        }
        var d = __define,c=ListBase;p=c.prototype;
        d(p, "requireSelection",
            /**
             * @language en_US
             * If <code>true</code>, a data item must always be selected in the control.
             * If the value is <code>true</code>, the <code>selectedIndex</code> property
             * is always set to a value between 0 and (<code>dataProvider.length</code> - 1).
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 如果为 true，则控件中必须含有选中的数据项目。
             * 如果该值为 true，则始终将 selectedIndex 属性设置为 0 和 (dataProvider.length - 1) 之间的一个值。
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$ListBase[0 /* requireSelection */];
            },
            function (value) {
                value = !!value;
                var values = this.$ListBase;
                if (value === values[0 /* requireSelection */]) {
                    return;
                }
                values[0 /* requireSelection */] = value;
                if (value) {
                    values[1 /* requireSelectionChanged */] = true;
                    this.invalidateProperties();
                }
            }
        );
        d(p, "selectedIndex",
            /**
             * @language en_US
             * he 0-based index of the selected item, or -1 if no item is selected.
             * Setting the <code>selectedIndex</code> property deselects the currently selected
             * item and selects the data item at the specified index.<p/>
             *
             * The value is always between -1 and (<code>dataProvider.length</code> - 1).
             * If items at a lower index than <code>selectedIndex</code> are
             * removed from the component, the selected index is adjusted downward
             * accordingly. <p/>
             *
             * If the selected item is removed, the selected index is set to:<p/>
             *
             * <ul>
             *   <li>-1 if <code>requireSelection == false</code> or there are no remaining items.</li>
             *   <li>0 if <code>requireSelection == true</code> and there is at least one item.</li>
             * </ul><p/>
             *
             * When the user changes the <code>selectedIndex</code> property by interacting with the control,
             * the control dispatches the <code>change</code> and <code>changing</code> events.
             * When you change the value of the <code>selectedIndex</code> property programmatically,
             * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
             *
             * @default -1
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 选中项目的基于 0 的索引。
             * 或者如果未选中项目，则为-1。设置 selectedIndex 属性会取消选择当前选定的项目并选择指定索引位置的数据项目。<p/>
             *
             * 这个值会之中在-1到<code>(dataProvider.length - 1)</code>之间。如果从该组件中删除一个低于
             * <code>selectedIndex</code>的值，则<code>selectedIndex</code>也会相应的调节选定的索引。<p/>
             *
             * 如果删除的项为当前选中项，则该值会变为：<p/>
             *
             * <ul>
             *    <li>-1: 如果 <code>requireSelection == false</code> 或者已经没有剩余项目。</li>
             *    <li> 0: 如果 <code>requireSelection == true</code> 并且当前至少还有一个剩余项目。</li>
             * </ul><p/>
             * 当用户通过与控件交互来更改 selectedIndex 属性时，此控件将分派 change 和 changing 事件。
             * 当以编程方式更改 selectedIndex 属性的值时，此控件不分派 change 和 changing 事件。
             *
             * @default -1
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                return this.$getSelectedIndex();
            },
            function (value) {
                value = +value | 0;
                this.setSelectedIndex(value, false);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getSelectedIndex = function () {
            var values = this.$ListBase;
            if (values[2 /* proposedSelectedIndex */] != ListBase.NO_PROPOSED_SELECTION)
                return values[2 /* proposedSelectedIndex */];
            return values[3 /* selectedIndex */];
        };
        /**
         * @language en_US
         * Used internally to specify whether the selectedIndex changed programmatically or due to
         * user interaction.
         * @param value the new index need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * value has changed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由程序或者用户设置选中项。
         * @param value 索引值。
         * @param dispatchChangeEvent 当索引值发生改变，且该参数为true的时候，组件派发出一个“change”事件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.setSelectedIndex = function (value, dispatchChangeEvent) {
            if (value == this.selectedIndex) {
                return;
            }
            var values = this.$ListBase;
            if (dispatchChangeEvent)
                values[4 /* dispatchChangeAfterSelection */] = (values[4 /* dispatchChangeAfterSelection */] || dispatchChangeEvent);
            values[2 /* proposedSelectedIndex */] = value;
            this.invalidateProperties();
        };
        d(p, "selectedItem",
            /**
             * @language en_US
             * The item that is currently selected.
             * Setting this property deselects the currently selected
             * item and selects the newly specified item.<p/>
             *
             * Setting <code>selectedItem</code> to an item that is not
             * in this component results in no selection,
             * and <code>selectedItem</code> being set to <code>undefined</code>.<p/>
             *
             * If the selected item is removed, the selected item is set to:<p/>
             * <ul>
             *   <li><code>undefined</code> if <code>requireSelection == false</code>
             *     or there are no remaining items.</li>
             *   <li>The first item if <code>requireSelection</code> = <code>true</code>
             *     and there is at least one item.</li>
             * </ul><p/>
             *
             * When the user changes the <code>selectedItem</code> property by interacting with the control,
             * the control dispatches the <code>change</code> and <code>changing</code> events.
             * When you change the value of the <code>selectedIndex</code> property programmatically,
             * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
             *
             * @default undefined
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 当前已选中的项目。设置此属性会取消选中当前选定的项目并选择新指定的项目。<p/>
             *
             * 如果设置的<code>selectedItem</code>不在当前列表里那么<code>selectedItem</code>将被设置
             * 为<code>undefined</code>。<p/>
             *
             * 如果选择项目被移除，那选择项会被设置为：<p/>
             * <ul>
             *   <li><code>undefined</code>: 如果 <code>requireSelection == false</code>
             *     或者已经没有剩余项。</li>
             *   <li>第一项: 当 <code>requireSelection == true</code>
             *     并且列表中还至少存有一项.</li>
             * </ul><p/>
             *
             * 当用户通过与控件交互来更改 selectedItem 属性时，此控件将分派 change 和 changing 事件。
             * 当以编程方式更改 selectedItem 属性的值时，此控件不分派 change 和 changing 事件。<p/>
             *
             * @default undefined
             * @version Lark 1.0
             * @version Swan 1.0
             * @platform Web,Native
             */
            function () {
                var values = this.$ListBase;
                if (values[5 /* pendingSelectedItem */] !== undefined)
                    return values[5 /* pendingSelectedItem */];
                var selectedIndex = this.$getSelectedIndex();
                if (selectedIndex == ListBase.NO_SELECTION || this.$dataProvider == null)
                    return undefined;
                return this.$dataProvider.length > selectedIndex ? this.$dataProvider.getItemAt(selectedIndex) : undefined;
            },
            function (value) {
                this.setSelectedItem(value, false);
            }
        );
        /**
         * @language en_US
         * Used internally to specify whether the selectedItem changed programmatically or due to
         * user interaction.
         * @param value the new item need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由程序或用户设置选中项数据源。
         * @param value 要选中的项。
         * @param dispatchChangeEvent 当索引值发生改变，且该参数为true的时候，组件派发出一个“change”事件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.setSelectedItem = function (value, dispatchChangeEvent) {
            if (dispatchChangeEvent === void 0) { dispatchChangeEvent = false; }
            if (this.selectedItem === value)
                return;
            var values = this.$ListBase;
            if (dispatchChangeEvent)
                values[4 /* dispatchChangeAfterSelection */] = (values[4 /* dispatchChangeAfterSelection */] || dispatchChangeEvent);
            values[5 /* pendingSelectedItem */] = value;
            this.invalidateProperties();
        };
        /**
         * @language en_US
         * Processes the properties set on the component.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            var dataProviderChanged = this.$dataProviderChanged;
            _super.prototype.commitProperties.call(this);
            var values = this.$ListBase;
            var selectedIndex = this.$getSelectedIndex();
            var dataProvider = this.$dataProvider;
            if (dataProviderChanged) {
                if (selectedIndex >= 0 && dataProvider && selectedIndex < dataProvider.length)
                    this.itemSelected(selectedIndex, true);
                else if (this.requireSelection)
                    values[2 /* proposedSelectedIndex */] = 0;
                else
                    this.setSelectedIndex(-1, false);
            }
            if (values[1 /* requireSelectionChanged */]) {
                values[1 /* requireSelectionChanged */] = false;
                if (values[0 /* requireSelection */] && selectedIndex == ListBase.NO_SELECTION && dataProvider && dataProvider.length > 0) {
                    values[2 /* proposedSelectedIndex */] = 0;
                }
            }
            if (values[5 /* pendingSelectedItem */] !== undefined) {
                if (dataProvider)
                    values[2 /* proposedSelectedIndex */] = dataProvider.getItemIndex(values[5 /* pendingSelectedItem */]);
                else
                    values[2 /* proposedSelectedIndex */] = ListBase.NO_SELECTION;
                values[5 /* pendingSelectedItem */] = undefined;
            }
            var changedSelection = false;
            if (values[2 /* proposedSelectedIndex */] != ListBase.NO_PROPOSED_SELECTION)
                changedSelection = this.commitSelection();
            if (values[6 /* selectedIndexAdjusted */]) {
                values[6 /* selectedIndexAdjusted */] = false;
                if (!changedSelection) {
                    swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                }
            }
        };
        /**
         * @language en_US
         * Updates an item renderer for use or reuse.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新项呈示器，以备使用或重用
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.updateRenderer = function (renderer, itemIndex, data) {
            this.itemSelected(itemIndex, this.$isItemIndexSelected(itemIndex));
            return _super.prototype.updateRenderer.call(this, renderer, itemIndex, data);
        };
        /**
         * @language en_US
         * Called when an item is selected or deselected.
         * Subclasses must override this method to display the selection.
         * @param index The item index that was selected.
         * @param selected <code>true</code> if the item is selected,
         * and <code>false</code> if it is deselected.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 选中或取消选中项目时调用。子类必须覆盖此方法才可设置选中项。
         * @param index 已选中的项目索引。
         * @param selected <code>true</code>为选中，<code>false</code>取消选中
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.itemSelected = function (index, selected) {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                renderer.selected = selected;
            }
        };
        /**
         * @private
         * 返回指定索引是否等于当前选中索引
         */
        p.$isItemIndexSelected = function (index) {
            return index == this.selectedIndex;
        };
        /**
         * @language en_US
         * The selection validation and commitment workhorse method.
         * Called to commit the pending selected index. This method dispatches
         * the "changing" event, and if the event is not cancelled,
         * commits the selection change and then dispatches the "change"
         * event.
         * @param dispatchChangedEvents if dispatch a "changed" event.
         * @return true if the selection was committed, or false if the selection
         * was cancelled.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 提交选中项属性。该方法会派发一个“changing”事件，如果该事件没有被阻止，
         * 该方法将会提交选择项病根据参数派发“change”事件。
         * @param dispatchChangedEvents 是否派发一个“changed”事件。
         * @return true 表示提交成功, false表示被取消
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.commitSelection = function (dispatchChangedEvents) {
            if (dispatchChangedEvents === void 0) { dispatchChangedEvents = true; }
            var dataProvider = this.$dataProvider;
            var values = this.$ListBase;
            var maxIndex = dataProvider ? dataProvider.length - 1 : -1;
            var oldSelectedIndex = values[3 /* selectedIndex */];
            var tmpProposedIndex = values[2 /* proposedSelectedIndex */];
            if (tmpProposedIndex < ListBase.NO_SELECTION)
                tmpProposedIndex = ListBase.NO_SELECTION;
            if (tmpProposedIndex > maxIndex)
                tmpProposedIndex = maxIndex;
            if (values[0 /* requireSelection */] && tmpProposedIndex == ListBase.NO_SELECTION && dataProvider && dataProvider.length > 0) {
                values[2 /* proposedSelectedIndex */] = ListBase.NO_PROPOSED_SELECTION;
                values[4 /* dispatchChangeAfterSelection */] = false;
                return false;
            }
            if (values[4 /* dispatchChangeAfterSelection */]) {
                var result = this.emitWith(lark.Event.CHANGING, false, true);
                if (!result) {
                    this.itemSelected(values[2 /* proposedSelectedIndex */], false);
                    values[2 /* proposedSelectedIndex */] = ListBase.NO_PROPOSED_SELECTION;
                    values[4 /* dispatchChangeAfterSelection */] = false;
                    return false;
                }
            }
            values[3 /* selectedIndex */] = tmpProposedIndex;
            values[2 /* proposedSelectedIndex */] = ListBase.NO_PROPOSED_SELECTION;
            if (oldSelectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(oldSelectedIndex, false);
            if (values[3 /* selectedIndex */] != ListBase.NO_SELECTION)
                this.itemSelected(values[3 /* selectedIndex */], true);
            //子类若需要自身抛出Change事件，而不是在此处抛出，可以设置dispatchChangedEvents为false
            if (dispatchChangedEvents) {
                if (values[4 /* dispatchChangeAfterSelection */]) {
                    this.emitWith(lark.Event.CHANGE);
                    values[4 /* dispatchChangeAfterSelection */] = false;
                }
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedItem");
            }
            return true;
        };
        /**
         * @language en_US
         * Adjusts the selected index to account for items being added to or
         * removed from this component.
         * It does not dispatch a <code>change</code> event because the change did not
         * occur as a direct result of user-interaction.  Moreover,
         * it does not dispatch a <code>changing</code> event
         * or allow the cancellation of the selection.
         * It also does not call the <code>itemSelected()</code> method,
         * since the same item is selected;
         * @param newIndex The new index.
         * @param add <code>true</code> if an item was added to the component,
         *  and <code>false</code> if an item was removed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 仅调整选中索引值而不更新选中项,即在提交属性阶段itemSelected方法不会被调用，也不会触发changing和change事件。
         * @param newIndex 新索引。
         * @param add 如果已将项目添加到组件，则为<code>true</code>；如果已删除项目，则为<code>false</code>。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.adjustSelection = function (newIndex, add) {
            if (add === void 0) { add = false; }
            var values = this.$ListBase;
            if (values[2 /* proposedSelectedIndex */] != ListBase.NO_PROPOSED_SELECTION)
                values[2 /* proposedSelectedIndex */] = newIndex;
            else
                values[3 /* selectedIndex */] = newIndex;
            values[6 /* selectedIndexAdjusted */] = true;
            this.invalidateProperties();
        };
        /**
         * @language en_US
         * Called when an item has been added to this component. Selection
         * and caret related properties are adjusted accordingly.
         * @param item The item being added.
         * @param index The index of the item being added.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据项添加
         * @param item 被添加的项。
         * @param index 被添加的项的索引。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.itemAdded = function (item, index) {
            _super.prototype.itemAdded.call(this, item, index);
            var selectedIndex = this.$getSelectedIndex();
            if (selectedIndex == ListBase.NO_SELECTION) {
                if (this.$ListBase[0 /* requireSelection */])
                    this.adjustSelection(index, true);
            }
            else if (index <= selectedIndex) {
                this.adjustSelection(selectedIndex + 1, true);
            }
        };
        /**
         * @language en_US
         * Called when an item has been removed from this component.
         * Selection and caret related properties are adjusted
         * accordingly.
         * @param item The item being removed.
         * @param index The index of the item being removed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据项移除
         * @param item 被移除的项。
         * @param index 被移除的项的索引。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.itemRemoved = function (item, index) {
            _super.prototype.itemRemoved.call(this, item, index);
            if (this.selectedIndex == ListBase.NO_SELECTION)
                return;
            var selectedIndex = this.$getSelectedIndex();
            if (index == selectedIndex) {
                if (this.requireSelection && this.$dataProvider && this.$dataProvider.length > 0) {
                    if (index == 0) {
                        this.$ListBase[2 /* proposedSelectedIndex */] = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0, false);
                }
                else
                    this.adjustSelection(-1, false);
            }
            else if (index < selectedIndex) {
                this.adjustSelection(selectedIndex - 1, false);
            }
        };
        /**
         * @language en_US
         * Event Listener of source data changed.
         * @param The <code>lark.CollectionEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据源改变事件处理。
         * @param event 事件 <code>lark.CollectionEvent</code> 的对象.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onCollectionChange = function (event) {
            _super.prototype.onCollectionChange.call(this, event);
            if (event.kind == swan.CollectionEventKind.RESET) {
                if (this.$dataProvider.length == 0) {
                    this.setSelectedIndex(ListBase.NO_SELECTION, false);
                }
            }
            else if (event.kind == swan.CollectionEventKind.REFRESH) {
                this.dataProviderRefreshed();
            }
        };
        /**
         * @language en_US
         * Default response to dataProvider refresh events: clear the selection and caret.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据源刷新
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.dataProviderRefreshed = function () {
            this.setSelectedIndex(ListBase.NO_SELECTION, false);
        };
        /**
         * @language en_US
         * Called when an item has been added to this component.
         * @param renderer the renderer being added.
         * @param index the index of renderer
         * @param item the data of renderer
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 项呈示器被添加
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.rendererAdded = function (renderer, index, item) {
            renderer.on(lark.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.on(lark.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
        };
        /**
         * @language en_US
         * Called when an item has been removed to this component.
         * @param renderer the renderer being removed.
         * @param index the index of renderer.
         * @param item the data of renderer.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 项呈示器被移除
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.rendererRemoved = function (renderer, index, item) {
            renderer.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.removeListener(lark.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
        };
        /**
         * @language en_US
         * Handles <code>lark.TouchEvent.TOUCH_BEGIN</code> events from any of the
         * item renderers. This method handles <code>lark.TouchEvent.TOUCH_END</code>.
         * @param event The <code>lark.TouchEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 侦听项呈示器<code>lark.TouchEvent.TOUCH_BEGIN</code>事件的方法。同时会添加对舞台<code>lark.TouchEvent.TOUCH_END</code>
         * 事件的侦听。
         * @param event 事件<code>lark.TouchEvent</code>的对象。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onRendererTouchBegin = function (event) {
            if (event.$isDefaultPrevented)
                return;
            this.$ListBase[7 /* mouseDownItemRenderer */] = (event.$currentTarget);
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
        };
        /**
         * @language en_US
         * Handles <code>lark.TouchEvent.TOUCH_END</code> events and dispatch <code>ItemTapEvent.ITEM_TAP</code> event.
         * @param event The <code>lark.TouchEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 鼠标在项呈示器上弹起，抛出<code>ItemTapEvent.ITEM_TAP</code>事件。
         * @param event 事件<code>lark.TouchEvent</code>的对象。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        p.onRendererTouchEnd = function (event) {
            var itemRenderer = (event.$currentTarget);
            var mouseDownItemRenderer = this.$ListBase[7 /* mouseDownItemRenderer */];
            if (itemRenderer != mouseDownItemRenderer)
                return;
            this.setSelectedIndex(itemRenderer.itemIndex, true);
            swan.ItemTapEvent.emitItemTapEvent(this, swan.ItemTapEvent.ITEM_TAP, itemRenderer);
        };
        /**
         * @private
         * 鼠标在舞台上弹起
         */
        p.stage_touchEndHandler = function (event) {
            var stage = event.$currentTarget;
            stage.removeListener(lark.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this.$ListBase[7 /* mouseDownItemRenderer */] = null;
        };
        /**
         * @language en_US
         * Static constant representing the value "no selection".
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 未选中任何项时的索引值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ListBase.NO_SELECTION = -1;
        /**
         * @language en_US
         * Static constant representing no proposed selection.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 未设置缓存选中项的值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ListBase.NO_PROPOSED_SELECTION = -2;
        return ListBase;
    })(swan.DataGroup);
    swan.ListBase = ListBase;
    /**
     * @private
     */
    swan.registerBindable(ListBase.prototype, "selectedIndex");
    /**
     * @private
     */
    swan.registerBindable(ListBase.prototype, "selectedItem");
    /**
     * @private
     */
    lark.registerClass(ListBase, 1004 /* ListBase */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 水平滚动条
     */
    var HScrollBar = (function (_super) {
        __extends(HScrollBar, _super);
        function HScrollBar() {
            _super.apply(this, arguments);
        }
        var d = __define,c=HScrollBar;p=c.prototype;
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = lark.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbWidth = bounds.width;
            var thumbY = bounds.y;
            var hsp = viewport.scrollH;
            var contentWidth = viewport.contentWidth;
            var width = viewport.width;
            if (hsp <= 0) {
                var scaleWidth = thumbWidth * (1 - (-hsp) / (width * 0.5));
                scaleWidth = Math.max(5, Math.round(scaleWidth));
                thumb.setLayoutBoundsSize(scaleWidth, lark.NONE);
                thumb.setLayoutBoundsPosition(0, thumbY);
            }
            else if (hsp >= contentWidth - width) {
                scaleWidth = thumbWidth * (1 - (hsp - contentWidth + width) / (width * 0.5));
                scaleWidth = Math.max(5, Math.round(scaleWidth));
                thumb.setLayoutBoundsSize(scaleWidth, lark.NONE);
                thumb.setLayoutBoundsPosition(unscaledWidth - scaleWidth, thumbY);
            }
            else {
                var thumbX = (unscaledWidth - thumbWidth) * hsp / (contentWidth - width);
                thumb.setLayoutBoundsSize(lark.NONE, lark.NONE);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        };
        p.onPropertyChanged = function (event) {
            switch (event.property) {
                case "scrollH":
                case "contentWidth":
                    this.invalidateDisplayList();
                    break;
            }
        };
        return HScrollBar;
    })(swan.ScrollBarBase);
    swan.HScrollBar = HScrollBar;
    lark.registerClass(HScrollBar, 1040 /* HScrollBar */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 复选框
     */
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        /**
         * 创建一个CheckBox
         */
        function CheckBox() {
            _super.call(this);
        }
        var d = __define,c=CheckBox;p=c.prototype;
        return CheckBox;
    })(swan.ToggleButton);
    swan.CheckBox = CheckBox;
    lark.registerClass(CheckBox, 1027 /* CheckBox */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 开关按钮
     */
    var ToggleSwitch = (function (_super) {
        __extends(ToggleSwitch, _super);
        /**
         * 创建一个ToggleSwitch
         */
        function ToggleSwitch() {
            _super.call(this);
        }
        var d = __define,c=ToggleSwitch;p=c.prototype;
        return ToggleSwitch;
    })(swan.ToggleButton);
    swan.ToggleSwitch = ToggleSwitch;
    lark.registerClass(ToggleSwitch, 1028 /* ToggleSwitch */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * List 控件可显示垂直或水平的项目列表。您可以通过设置 allowMultipleSelection 属性为true来允许同时选中多项。
     */
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var _this = this;
            _super.apply(this, arguments);
            /**
             * 是否允许同时选中多项,设置为true时，触摸按下未选中的项呈示器，将会设置该项选中，再次按下将会取消选中。可以设置多项为选中状态。
             */
            this.allowMultipleSelection = false;
            this._selectedIndices = [];
            /**
             * 是否是有效的索引
             */
            this.isValidIndex = function (item, index, v) {
                return _this.$dataProvider && (item >= 0) && (item < _this.$dataProvider.length) && item % 1 == 0;
            };
        }
        var d = __define,c=List;p=c.prototype;
        d(p, "selectedIndices",
            /**
             * 当前选中的一个或多个项目的索引列表
             */
            function () {
                if (this._proposedSelectedIndices)
                    return this._proposedSelectedIndices;
                return this._selectedIndices;
            },
            function (value) {
                this.setSelectedIndices(value, false);
            }
        );
        d(p, "selectedIndex",
            function () {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.length > 0)
                        return this._proposedSelectedIndices[0];
                    return -1;
                }
                return this.$getSelectedIndex();
            },
            function (value) {
                this.setSelectedIndex(value);
            }
        );
        d(p, "selectedItems",
            /**
             * 当前选中的一个或多个项目的数据源列表
             */
            function () {
                var result = [];
                var list = this.selectedIndices;
                if (list) {
                    var count = list.length;
                    for (var i = 0; i < count; i++) {
                        result[i] = this.$dataProvider.getItemAt(list[i]);
                    }
                }
                return result;
            },
            function (value) {
                var indices = [];
                if (value) {
                    var count = value.length;
                    for (var i = 0; i < count; i++) {
                        var index = this.$dataProvider.getItemIndex(value[i]);
                        if (index != -1) {
                            indices.splice(0, 0, index);
                        }
                        if (index == -1) {
                            indices = [];
                            break;
                        }
                    }
                }
                this.setSelectedIndices(indices, false);
            }
        );
        /**
         * 设置多个选中项
         */
        p.setSelectedIndices = function (value, dispatchChangeEvent) {
            var values = this.$ListBase;
            if (dispatchChangeEvent)
                values[4 /* dispatchChangeAfterSelection */] = (values[4 /* dispatchChangeAfterSelection */] || dispatchChangeEvent);
            if (value)
                this._proposedSelectedIndices = value;
            else
                this._proposedSelectedIndices = [];
            this.invalidateProperties();
        };
        /**
         * 处理对组件设置的属性
         */
        p.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this._proposedSelectedIndices) {
                this.commitSelection();
            }
        };
        p.commitSelection = function (dispatchChangedEvents) {
            if (dispatchChangedEvents === void 0) { dispatchChangedEvents = true; }
            var values = this.$ListBase;
            var oldSelectedIndex = values[3 /* selectedIndex */];
            if (this._proposedSelectedIndices) {
                this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex);
                if (!this.allowMultipleSelection && this._proposedSelectedIndices.length > 0) {
                    var temp = [];
                    temp.push(this._proposedSelectedIndices[0]);
                    this._proposedSelectedIndices = temp;
                }
                if (this._proposedSelectedIndices.length > 0) {
                    values[2 /* proposedSelectedIndex */] = this._proposedSelectedIndices[0];
                }
                else {
                    values[2 /* proposedSelectedIndex */] = -1;
                }
            }
            var retVal = _super.prototype.commitSelection.call(this, false);
            if (!retVal) {
                this._proposedSelectedIndices = null;
                return false;
            }
            var selectedIndex = this.$getSelectedIndex();
            if (selectedIndex > swan.ListBase.NO_SELECTION) {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.indexOf(selectedIndex) == -1)
                        this._proposedSelectedIndices.push(selectedIndex);
                }
                else {
                    this._proposedSelectedIndices = [selectedIndex];
                }
            }
            if (this._proposedSelectedIndices) {
                if (this._proposedSelectedIndices.indexOf(oldSelectedIndex) != -1)
                    this.itemSelected(oldSelectedIndex, true);
                this.commitMultipleSelection();
            }
            if (dispatchChangedEvents && retVal) {
                if (values[4 /* dispatchChangeAfterSelection */]) {
                    this.emitWith(lark.Event.CHANGE);
                    values[4 /* dispatchChangeAfterSelection */] = false;
                }
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                swan.PropertyEvent.emitPropertyEvent(this, swan.PropertyEvent.PROPERTY_CHANGE, "selectedItem");
            }
            return retVal;
        };
        /**
         * 提交多项选中项属性
         */
        p.commitMultipleSelection = function () {
            var removedItems = [];
            var addedItems = [];
            var i;
            var count;
            var selectedIndices = this._selectedIndices;
            var proposedSelectedIndices = this._proposedSelectedIndices;
            if (selectedIndices.length > 0 && proposedSelectedIndices.length > 0) {
                count = proposedSelectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (selectedIndices.indexOf(proposedSelectedIndices[i]) == -1)
                        addedItems.push(proposedSelectedIndices[i]);
                }
                count = selectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (proposedSelectedIndices.indexOf(selectedIndices[i]) == -1)
                        removedItems.push(selectedIndices[i]);
                }
            }
            else if (selectedIndices.length > 0) {
                removedItems = selectedIndices;
            }
            else if (proposedSelectedIndices.length > 0) {
                addedItems = proposedSelectedIndices;
            }
            this._selectedIndices = proposedSelectedIndices;
            if (removedItems.length > 0) {
                count = removedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(removedItems[i], false);
                }
            }
            if (addedItems.length > 0) {
                count = addedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(addedItems[i], true);
                }
            }
            this._proposedSelectedIndices = null;
        };
        p.$isItemIndexSelected = function (index) {
            if (this.allowMultipleSelection)
                return this._selectedIndices.indexOf(index) != -1;
            return _super.prototype.$isItemIndexSelected.call(this, index);
        };
        /**
         * 数据源发生刷新
         */
        p.dataProviderRefreshed = function () {
            if (this.allowMultipleSelection) {
                return;
            }
            _super.prototype.dataProviderRefreshed.call(this);
        };
        /**
         * 计算当前的选中项列表
         */
        p.calculateSelectedIndices = function (index) {
            var interval = [];
            var selectedIndices = this._selectedIndices;
            var length = selectedIndices.length;
            if (length > 0) {
                if (length == 1 && (selectedIndices[0] == index)) {
                    if (!this.$ListBase[0 /* requireSelection */]) {
                        return interval;
                    }
                    interval.splice(0, 0, selectedIndices[0]);
                    return interval;
                }
                else {
                    var found = false;
                    for (var i = 0; i < length; i++) {
                        if (selectedIndices[i] == index) {
                            found = true;
                        }
                        else if (selectedIndices[i] != index) {
                            interval.splice(0, 0, selectedIndices[i]);
                        }
                    }
                    if (!found) {
                        interval.splice(0, 0, index);
                    }
                    return interval;
                }
            }
            else {
                interval.splice(0, 0, index);
                return interval;
            }
        };
        /**
         * 鼠标在项呈示器上弹起，抛出ItemClick事件。
         */
        p.onRendererTouchEnd = function (event) {
            if (this.allowMultipleSelection) {
                var itemRenderer = (event.currentTarget);
                var mouseDownItemRenderer = this.$ListBase[7 /* mouseDownItemRenderer */];
                if (itemRenderer != mouseDownItemRenderer)
                    return;
                this.setSelectedIndices(this.calculateSelectedIndices(itemRenderer.itemIndex), true);
                swan.ItemTapEvent.emitItemTapEvent(this, swan.ItemTapEvent.ITEM_TAP, itemRenderer);
            }
            else {
                _super.prototype.onRendererTouchEnd.call(this, event);
            }
        };
        return List;
    })(swan.ListBase);
    swan.List = List;
    lark.registerClass(List, 1006 /* List */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 水平滑块控件
     */
    var HSlider = (function (_super) {
        __extends(HSlider, _super);
        /**
         * 创建一个水平滑块控件
         */
        function HSlider() {
            _super.call(this);
        }
        var d = __define,c=HSlider;p=c.prototype;
        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值
         */
        p.pointToValue = function (x, y) {
            if (!this.thumb || !this.track)
                return 0;
            var values = this.$Range;
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbRange = this.getThumbRange();
            return values[2 /* minimum */] + (thumbRange != 0 ? (x / thumbRange) * range : 0);
        };
        p.getThumbRange = function () {
            var bounds = lark.$TempRectangle;
            this.track.getLayoutBounds(bounds);
            var thumbRange = bounds.width;
            this.thumb.getLayoutBounds(bounds);
            return thumbRange - bounds.width;
        };
        /**
         * 设置外观部件的边界，这些外观部件的几何图形不是完全由外观的布局指定的
         */
        p.updateSkinDisplayList = function () {
            if (!this.thumb || !this.track)
                return;
            var values = this.$Range;
            var thumbRange = this.getThumbRange();
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbPosTrackX = (range > 0) ? ((this.pendingValue - values[2 /* minimum */]) / range) * thumbRange : 0;
            var thumbPos = this.track.localToGlobal(thumbPosTrackX, 0, lark.$TempPoint);
            var thumbPosX = thumbPos.x;
            var thumbPosY = thumbPos.y;
            var thumbPosParentX = this.thumb.$parent.globalToLocal(thumbPosX, thumbPosY, lark.$TempPoint).x;
            var bounds = lark.$TempRectangle;
            this.thumb.getLayoutBounds(bounds);
            this.thumb.setLayoutBoundsPosition(Math.round(thumbPosParentX), bounds.y);
            if (this.trackHighlight && this.trackHighlight.$parent) {
                var trackHighlightX = this.trackHighlight.$parent.globalToLocal(thumbPosX, thumbPosY, lark.$TempPoint).x - thumbPosTrackX;
                this.trackHighlight.x = Math.round(trackHighlightX);
                this.trackHighlight.width = Math.round(thumbPosTrackX);
            }
        };
        return HSlider;
    })(swan.SliderBase);
    swan.HSlider = HSlider;
    lark.registerClass(HSlider, 1043 /* HSlider */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 存储根据groupName自动创建的RadioButtonGroup列表
     */
    var automaticRadioButtonGroups = {};
    /**
     * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择
     */
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        /**
         * 创建一个RadioButton
         */
        function RadioButton() {
            _super.call(this);
            /**
             * 在RadioButtonGroup中的索引
             */
            this.$indexNumber = 0;
            /**
             * 所属的RadioButtonGroup
             */
            this.$radioButtonGroup = null;
            this._group = null;
            this.groupChanged = false;
            this._groupName = "radioGroup";
            this._value = null;
            this.groupName = "radioGroup";
        }
        var d = __define,c=RadioButton;p=c.prototype;
        d(p, "enabled",
            /**
             * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮
             */
            function () {
                if (!this.$Component[3 /* enabled */]) {
                    return false;
                }
                return !this.$radioButtonGroup || this.$radioButtonGroup.$enabled;
            },
            function (value) {
                this.$setEnabled(value);
            }
        );
        d(p, "group",
            /**
             * 此单选按钮所属的组。同一个组的多个单选按钮之间互斥。
             * 若不设置此属性，则根据groupName属性自动创建一个唯一的RadioButtonGroup。
             */
            function () {
                if (!this._group && this._groupName) {
                    var g = automaticRadioButtonGroups[this._groupName];
                    if (!g) {
                        g = new swan.RadioButtonGroup();
                        g.$name = this._groupName;
                        automaticRadioButtonGroups[this._groupName] = g;
                    }
                    this._group = g;
                }
                return this._group;
            },
            function (value) {
                if (this._group == value)
                    return;
                if (this.$radioButtonGroup)
                    this.$radioButtonGroup.$removeInstance(this, false);
                this._group = value;
                this._groupName = value ? this.group.$name : "radioGroup";
                this.groupChanged = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        d(p, "groupName",
            /**
             * 所属组的名称,具有相同组名的多个单选按钮之间互斥。默认值:"radioGroup"。
             * 可以把此属性当做设置组的一个简便方式，作用与设置group属性相同,。
             */
            function () {
                return this._groupName;
            },
            function (value) {
                if (!value || value == "")
                    return;
                this._groupName = value;
                if (this.$radioButtonGroup)
                    this.$radioButtonGroup.$removeInstance(this, false);
                this._group = null;
                this.groupChanged = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        p.$setSelected = function (value) {
            _super.prototype.$setSelected.call(this, value);
            this.invalidateDisplayList();
        };
        d(p, "value",
            /**
             * 与此单选按钮关联的自定义数据。
             */
            function () {
                return this._value;
            },
            function (value) {
                if (this._value == value)
                    return;
                this._value = value;
                if (this.$selected && this.group) {
                    swan.PropertyEvent.emitPropertyEvent(this.group, swan.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
                }
            }
        );
        p.commitProperties = function () {
            if (this.groupChanged) {
                this.addToGroup();
                this.groupChanged = false;
            }
            _super.prototype.commitProperties.call(this);
        };
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.group) {
                if (this.$selected)
                    this._group.$setSelection(this, false);
                else if (this.group.selection == this)
                    this._group.$setSelection(null, false);
            }
        };
        p.buttonReleased = function () {
            if (!this.enabled || this.selected)
                return;
            if (!this.$radioButtonGroup)
                this.addToGroup();
            _super.prototype.buttonReleased.call(this);
            this.group.$setSelection(this, true);
        };
        /**
         * 添此单选按钮加到组
         */
        p.addToGroup = function () {
            var g = this.group;
            if (g)
                g.$addInstance(this);
            return g;
        };
        return RadioButton;
    })(swan.ToggleButton);
    swan.RadioButton = RadioButton;
    lark.registerClass(RadioButton, 1029 /* RadioButton */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 垂直滑块控件
     */
    var VSlider = (function (_super) {
        __extends(VSlider, _super);
        /**
         * 创建一个垂直滑块控件
         */
        function VSlider() {
            _super.call(this);
        }
        var d = __define,c=VSlider;p=c.prototype;
        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值
         */
        p.pointToValue = function (x, y) {
            if (!this.thumb || !this.track)
                return 0;
            var values = this.$Range;
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbRange = this.getThumbRange();
            return values[2 /* minimum */] + ((thumbRange != 0) ? ((thumbRange - y) / thumbRange) * range : 0);
        };
        p.getThumbRange = function () {
            var bounds = lark.$TempRectangle;
            this.track.getLayoutBounds(bounds);
            var thumbRange = bounds.height;
            this.thumb.getLayoutBounds(bounds);
            return thumbRange - bounds.height;
        };
        /**
         * 设置外观部件（通常为滑块）的边界，这些外观部件的几何图形不是完全由外观的布局指定的
         */
        p.updateSkinDisplayList = function () {
            if (!this.thumb || !this.track)
                return;
            var values = this.$Range;
            var thumbRange = this.getThumbRange();
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbPosTrackY = (range > 0) ? thumbRange - (((this.pendingValue - values[2 /* minimum */]) / range) * thumbRange) : 0;
            var thumbPos = this.track.localToGlobal(0, thumbPosTrackY, lark.$TempPoint);
            var thumbPosX = thumbPos.x;
            var thumbPosY = thumbPos.y;
            var thumbPosParentY = this.thumb.$parent.globalToLocal(thumbPosX, thumbPosY, lark.$TempPoint).y;
            var bounds = lark.$TempRectangle;
            var thumbHeight = bounds.height;
            this.thumb.getLayoutBounds(bounds);
            this.thumb.setLayoutBoundsPosition(bounds.x, Math.round(thumbPosParentY));
            if (this.trackHighlight) {
                var trackHighlightY = this.trackHighlight.$parent.globalToLocal(thumbPosX, thumbPosY, lark.$TempPoint).y;
                this.trackHighlight.y = Math.round(trackHighlightY + thumbHeight);
                this.trackHighlight.height = Math.round(thumbRange - trackHighlightY);
            }
        };
        return VSlider;
    })(swan.SliderBase);
    swan.VSlider = VSlider;
    lark.registerClass(VSlider, 1044 /* VSlider */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var swan;
(function (swan) {
    /**
     * 选项卡组件
     */
    var TabBar = (function (_super) {
        __extends(TabBar, _super);
        function TabBar() {
            _super.call(this);
            this.indexBeingUpdated = false;
            this.requireSelection = true;
            this.useVirtualLayout = false;
        }
        var d = __define,c=TabBar;p=c.prototype;
        p.createChildren = function () {
            if (!this.$layout) {
                var layout = new swan.HorizontalLayout();
                layout.gap = 0;
                layout.horizontalAlign = swan.JustifyAlign.JUSTIFY;
                layout.verticalAlign = swan.JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            _super.prototype.createChildren.call(this);
        };
        p.$setDataProvider = function (value) {
            if (lark.is(this.$dataProvider, 1036 /* ViewStack */)) {
                this.$dataProvider.removeListener(swan.PropertyEvent.PROPERTY_CHANGE, this.onViewStackIndexChange, this);
                this.removeListener(lark.Event.CHANGE, this.onIndexChanged, this);
            }
            if (lark.is(value, 1036 /* ViewStack */)) {
                value.on(swan.PropertyEvent.PROPERTY_CHANGE, this.onViewStackIndexChange, this);
                this.on(lark.Event.CHANGE, this.onIndexChanged, this);
            }
            _super.prototype.$setDataProvider.call(this, value);
        };
        /**
         * 鼠标点击的选中项改变
         */
        p.onIndexChanged = function (event) {
            this.indexBeingUpdated = true;
            (this.$dataProvider).selectedIndex = this.selectedIndex;
            this.indexBeingUpdated = false;
        };
        /**
         * ViewStack选中项发生改变
         */
        p.onViewStackIndexChange = function (event) {
            if (event.property == "selectedIndex" && !this.indexBeingUpdated) {
                this.setSelectedIndex((this.$dataProvider).selectedIndex, false);
            }
        };
        return TabBar;
    })(swan.ListBase);
    swan.TabBar = TabBar;
    lark.registerClass(TabBar, 1005 /* TabBar */);
})(swan || (swan = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
