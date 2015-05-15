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

module lark.player {

    /**
     * EXML配置管理器实例
     */
    export var exmlConfig:EXMLConfig;

    var exmlParserPool:EXMLParser[] = [];
    var innerClassCount = 1;

    var DECLARATIONS = "Declarations";
    var RECTANGLE = "lark.Rectangle";
    var IFACTORY = "lark.gui.IFactory";
    var CLASS_FACTORY = "lark.gui.ClassFactory";
    var ELEMENTS_CONTENT = "elementsContent";
    var basicTypes:string[] = ["Array", "boolean", "string", "number"];
    var wingKeys:string[] = ["id", "locked", "includeIn", "excludeFrom"];
    var htmlEntities:string[][] = [["<", "&lt;"], [">", "&gt;"], ["&", "&amp;"], ["\"", "&quot;"], ["'", "&apos;"]];

    export class EXMLParser {

        public constructor() {

            if (DEBUG) {
                this.repeatedIdMap = {};
                this.getRepeatedIds = getRepeatedIds;
                this.getIds = getIds;
                this.checkDeclarations = checkDeclarations;
            }
        }

        /**
         * 获取重复的ID名
         */
        public getRepeatedIds:(xml:XML)=>string[];
        private getIds:(xml:any, result:string[])=>void;
        private repeatedIdMap:any;
        private checkDeclarations:(declarations:XML, list:string[])=>void;

        /**
         * 当前类
         */
        private currentClass:CpClass;
        /**
         * 当前编译的类名
         */
        private currentClassName:string;
        /**
         * 当前要编译的EXML文件
         */
        private currentXML:XML;
        /**
         * id缓存字典
         */
        private idDic:any;
        /**
         * 状态代码列表
         */
        private stateCode:CpState[];

        private stateNames:string[];
        /**
         * 需要单独创建的实例id列表
         */
        private stateIds:string[];

        private idToNode:any;

        private skinParts:string[];

        private declarations:any;
        /**
         * 延迟赋值字典
         */
        private delayAssignmentDic:any = {};

        /**
         * 编译指定的XML对象为JavaScript代码。
         * @param xmlData 要编译的EXML文件内容
         * @param className 要编译成的完整类名，包括模块名。
         */
        public parse(xmlData:XML, className:string):string {
            var clazz = this.parseClass(xmlData, className);
            return clazz.toCode();
        }

        /**
         * 编译指定的XML对象为CpClass对象。
         */
        private parseClass(xmlData:XML, className:string):CpClass {
            if (!exmlConfig) {
                exmlConfig = new EXMLConfig();
            }
            this.currentXML = xmlData;
            this.currentClassName = className;
            this.delayAssignmentDic = {};
            this.idDic = {};
            this.idToNode = {};
            this.stateCode = [];
            this.stateNames = [];
            this.skinParts = [];
            this.declarations = null;
            this.currentClass = new CpClass();
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
        }

        /**
         * 开始编译
         */
        private startCompile():void {
            if (DEBUG) {
                var result = this.getRepeatedIds(this.currentXML);
                if (result.length > 0) {
                    $error(2004, this.currentClassName, result.join("\n"));
                }
            }
            this.currentClass.superClass = this.getClassNameOfNode(this.currentXML);

            this.getStateNames();

            var children = this.currentXML.children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var node:any = children[i];
                    if (node.nodeType === 1 && node.namespace == NS_W &&
                        node.localName == DECLARATIONS) {
                        this.declarations = node;
                        break;
                    }
                }
            }

            if (DEBUG) {
                var list:string[] = [];
                this.checkDeclarations(this.declarations, list);

                if (list.length > 0) {
                    $error(2020, this.currentClassName, list.join("\n"));
                }
            }


            if (!this.currentXML.namespace) {
                if (DEBUG) {
                    $error(2017, this.currentClassName, toXMLString(this.currentXML));
                }
                return;
            }
            this.addIds(this.currentXML.children, this.currentClass.superClass);
            this.createConstructFunc();
        }

        /**
         * 添加必须的id
         */
        private addIds(items:any, className:string):void {
            if (!items) {
                return;
            }
            var length = items.length;
            for (var i = 0; i < length; i++) {
                var node:XML = items[i];
                if (node.nodeType != 1) {
                    continue;
                }
                if (!node.namespace) {
                    if (DEBUG) {
                        $error(2017, this.currentClassName, toXMLString(node));
                    }
                    continue;
                }
                if (node.localName == "Skin" && node.namespace == NS_E) {
                    continue;
                }
                var nodeClassName = this.getClassNameOfNode(node);
                this.addIds(node.children, nodeClassName);
                var id = node.attributes["id"];
                if (node.namespace == NS_W) {
                }
                else if (id) {
                    this.idToNode[id] = node;
                    if (this.skinParts.indexOf(id) == -1) {
                        this.skinParts.push(id);
                    }
                    this.createVarForNode(node);
                    if (this.isStateNode(node))//检查节点是否只存在于一个状态里，需要单独实例化
                        this.stateIds.push(id);
                }
                else if (node.localName) {
                    if (this.isProperty(node, className)) {
                        var prop = node.localName;
                        var index = prop.indexOf(".");
                        var children:Array<any> = node.children;
                        if (index == -1 || !children || children.length == 0) {
                            continue;
                        }
                        var firstChild:XML = children[0];
                        this.stateIds.push(firstChild.attributes.id);
                    }
                    else {
                        this.createIdForNode(node);
                        this.idToNode[node.attributes.id] = node;
                        if (this.isStateNode(node))
                            this.stateIds.push(node.attributes.id);
                    }
                }

            }
        }

        /**
         * 检测指定节点的属性是否含有视图状态
         */
        private containsState(node:XML):boolean {
            var attributes = node.attributes;
            if (attributes["includeIn"] || attributes["$excludeFrom"]) {
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
        }

        /**
         * 为指定节点创建id属性
         */
        private createIdForNode(node:XML):void {
            var idName = this.getNodeId(node);
            if (!this.idDic[idName])
                this.idDic[idName] = 1;
            else
                this.idDic[idName]++;
            idName += this.idDic[idName];
            node.attributes.id = idName;
        }

        /**
         * 获取节点ID
         */
        private getNodeId(node:XML):string {
            if (node.attributes["id"])
                return node.attributes.id;
            return "_" + node.localName;
        }

        /**
         * 为指定节点创建变量
         */
        private createVarForNode(node:XML):void {
            var moduleName = this.getClassNameOfNode(node);
            if (moduleName == "")
                return;
            if (!this.currentClass.getVariableByName(node.attributes.id))
                this.currentClass.addVariable(new CpVariable(node.attributes.id));
        }

        /**
         * 为指定节点创建初始化函数,返回函数名引用
         */
        private createFuncForNode(node:XML):string {
            var className = node.localName;
            var isBasicType = this.isBasicTypeData(className);
            if (isBasicType)
                return this.createBasicTypeForNode(node);
            var moduleName = this.getClassNameOfNode(node);
            var func = new CpFunction();
            var tailName = "_i";
            var id = node.attributes.id;
            func.name = id + tailName;
            var cb = new CpCodeBlock();
            var varName:string = "t";
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
                    var codeBlock:CpCodeBlock = delayAssignments[i];
                    cb.concat(codeBlock);
                }
            }
            cb.addReturn(varName);
            func.codeBlock = cb;
            this.currentClass.addFunction(func);
            return "this." + func.name + "()";
        }

        /**
         * 检查目标类名是否是基本数据类型
         */
        private isBasicTypeData(className:string):boolean {
            return basicTypes.indexOf(className) != -1;
        }

        /**
         * 为指定基本数据类型节点实例化,返回实例化后的值。
         */
        private createBasicTypeForNode(node:XML):string {
            var className = node.localName;
            var returnValue = "";
            var varItem = this.currentClass.getVariableByName(node.attributes.id);
            var children:any[] = node.children;
            var text = "";
            if (children && children.length > 0) {
                var firstChild:XMLText = children[0];
                if (firstChild.nodeType == 3) {
                    text = firstChild.text.trim();
                }
            }
            switch (className) {
                case "Array":
                    var values = [];
                    if (children) {
                        var length = children.length;
                        for (var i = 0; i < length; i++) {
                            var child:XML = children[i];
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
        }

        /**
         * 将节点属性赋值语句添加到代码块
         */
        private addAttributesToCodeBlock(cb:CpCodeBlock, varName:string, node:XML):void {
            var key:string;
            var value:string;
            var attributes = node.attributes;
            var keyList:string[] = Object.keys(attributes);
            keyList.sort();//排序一下防止出现随机顺序
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
                if (this.currentClass.getVariableByName(value)) {//赋的值对象是一个id
                    var id = attributes.id;
                    var codeLine = "this." + id + " = t;";
                    if (!this.currentClass.getVariableByName(id))
                        this.createVarForNode(node);
                    if (!cb.containsCodeLine(codeLine)) {
                        cb.addCodeLineAt(codeLine, 1);
                    }
                    var delayCb = new CpCodeBlock();
                    if (varName == "this") {
                        delayCb.addAssignment(varName, "this." + value, key);
                    }
                    else {
                        delayCb.startIf("this." + id);
                        delayCb.addAssignment("this." + id, "this." + value, key);
                        delayCb.endBlock();
                    }

                    if (!this.delayAssignmentDic[value]) {
                        this.delayAssignmentDic[value] = [];
                    }
                    this.delayAssignmentDic[value].push(delayCb);
                    value = "this." + value;
                }
                cb.addAssignment(varName, value, key);
            }
        }

        /**
         * 初始化子项
         */
        private initlizeChildNode(node:XML, cb:CpCodeBlock, varName:string):void {
            var children:Array<any> = node.children;
            if (!children || children.length == 0)
                return;
            var className = exmlConfig.getClassNameById(node.localName, node.namespace);
            var directChild:XML[] = [];
            var length = children.length;
            var propList:string[] = [];
            for (var i = 0; i < length; i++) {
                var child:XML = children[i];
                if (child.nodeType != 1 || child.namespace == NS_W) {
                    continue;
                }
                if (child.localName == "Skin" && child.namespace == NS_E) {
                    var parser = exmlParserPool.pop();
                    if (!parser) {
                        parser = new EXMLParser();
                    }
                    var innerClassName = this.currentClass.className + "$inner" + innerClassCount++;
                    var innerClass = parser.parseClass(child, innerClassName);
                    this.currentClass.addInnerClass(innerClass);
                    exmlParserPool.push(parser);
                    var type = exmlConfig.getPropertyType("skinName", className);
                    if (type) {
                        cb.addAssignment(varName, innerClassName, "skinName");
                    }
                    continue;
                }
                var prop = child.localName;
                if (this.isProperty(child, className)) {
                    if (!this.isNormalKey(prop)) {
                        continue;
                    }
                    var type = exmlConfig.getPropertyType(child.localName, className);
                    if (!type) {
                        if (DEBUG) {
                            $error(2005, this.currentClassName, child.localName, getPropertyStr(child));
                        }
                        continue;
                    }
                    if (!child.children || child.children.length == 0) {
                        if (DEBUG) {
                            $warn(2102, this.currentClassName, getPropertyStr(child));
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
            var defaultProp = exmlConfig.getDefaultPropById(node.localName, node.namespace);
            var defaultType = exmlConfig.getPropertyType(defaultProp, className);
            var errorInfo = getPropertyStr(directChild[0]);
            if (!defaultProp || !defaultType) {
                if (DEBUG) {
                    $error(2012, this.currentClassName, errorInfo);
                }
                return;
            }
            this.addChildrenToProp(directChild, defaultType, defaultProp, cb, varName, errorInfo, propList, node);
        }

        /**
         * 添加多个子节点到指定的属性
         */
        private addChildrenToProp(children:Array<any>, type:string, prop:string,
                                  cb:CpCodeBlock, varName:string, errorInfo:string,
                                  propList:string[], node:XML):void {
            var childFunc = "";
            var childLength = children.length;
            if (childLength > 1) {
                if (type != "Array") {
                    if (DEBUG) {
                        $error(2011, this.currentClassName, prop, errorInfo);
                    }
                    return;
                }
                var values:string[] = [];
                for (var j = 0; j < childLength; j++) {
                    var item:XML = children[j];
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
                var firstChild:XML = children[0];
                if (type == "Array") {
                    if (firstChild.localName == "Array") {
                        values = [];
                        if (firstChild.children) {
                            var len = firstChild.children.length;
                            for (var k = 0; k < len; k++) {
                                item = <any>firstChild.children[k];
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
                    var targetClass = this.getClassNameOfNode(firstChild);
                    childFunc = this.createFuncForNode(firstChild);
                }
                else {
                    childFunc = this.formatValue(prop, (<XMLText><any>firstChild).text, node);
                }
            }
            if (childFunc != "") {
                if (childFunc.indexOf("()") == -1)
                    prop = this.formatKey(prop, childFunc);
                if (propList.indexOf(prop) == -1) {
                    propList.push(prop);
                }
                else if (DEBUG) {
                    $warn(2103, this.currentClassName, prop, errorInfo);
                }
                cb.addAssignment(varName, childFunc, prop);
            }
        }

        /**
         * 指定节点是否是属性节点
         */
        private isProperty(node:any, className:string):boolean {
            var name = node.localName;
            if (name == null)
                return true;
            if (this.isBasicTypeData(name))
                return false;
            var index = name.indexOf(".")
            if (index != -1) {
                name = name.substr(0, index);
            }
            return !!exmlConfig.getPropertyType(name, className);
        }


        /**
         * 是否是普通赋值的key
         */
        private isNormalKey(key:string):boolean {
            if (!key || key.indexOf(".") != -1 || wingKeys.indexOf(key) != -1)
                return false;
            return true;
        }

        /**
         * 格式化key
         */
        private formatKey(key:string, value:string):string {
            if (value.indexOf("%") != -1) {
                if (key == "height")
                    key = "percentHeight";
                else if (key == "width")
                    key = "percentWidth";
            }
            return key;
        }

        /**
         * 格式化值
         */
        private formatValue(key:string, value:string, node:any):string {
            if (!value) {
                value = "";
            }
            var stringValue = value;//除了字符串，其他类型都去除两端多余空格。
            value = value.trim();
            var className = this.getClassNameOfNode(node);
            var type:string = exmlConfig.getPropertyType(key, className);
            if (DEBUG && !type) {
                $error(2005, this.currentClassName, key, toXMLString(node));
            }
            if (type != "string" && value.charAt(0) == "{" && value.charAt(value.length - 1) == "}") {
                value = value.substr(1, value.length - 2);
                value = value.trim();
                if (value.indexOf("this.") == 0) {
                    value = value.substring(5);
                }
                var targetNode:any = this.idToNode[value];
                if (DEBUG && !targetNode) {
                    $error(2010, this.currentClassName, key, value, toXMLString(node));
                }
                var targetClass = this.getClassNameOfNode(targetNode);
            }
            else if (key == "scale9Grid" && type == RECTANGLE) {
                if (DEBUG) {
                    var rect = value.split(",");
                    if (rect.length != 4 || isNaN(parseInt(rect[0])) || isNaN(parseInt(rect[1])) ||
                        isNaN(parseInt(rect[2])) || isNaN(parseInt(rect[3]))) {
                        $error(2016, this.currentClassName, toXMLString(node));
                    }
                }
                value = "new " + RECTANGLE + "(" + value + ")";
            }
            else {
                var orgValue:string = value;
                switch (type) {
                    case IFACTORY:
                        value = "new " + CLASS_FACTORY + "(" + orgValue + ")";
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
                            $error(2008, this.currentClassName, "string", key + ":" + type, toXMLString(node));
                        }
                        break;
                }
            }
            return value;
        }

        /**
         * 格式化字符串
         */
        private formatString(value:string):string {
            value = this.unescapeHTMLEntity(value);
            value = value.split("\n").join("\\n");
            value = value.split("\r").join("\\n");
            value = value.split("\"").join("\\\"");
            value = "\"" + value + "\"";
            return value;
        }

        /**
         /**
         * 转换HTML实体字符为普通字符
         */
        private unescapeHTMLEntity(str:string):string {
            if (!str)
                return "";
            var length = htmlEntities.length;
            for (var i:number = 0; i < length; i++) {
                var arr = htmlEntities[i];
                var key:string = arr[0];
                var value:string = arr[1];
                str = str.split(value).join(key);
            }
            return str;
        }

        /**
         * 创建构造函数
         */
        private createConstructFunc():void {
            var cb:CpCodeBlock = new CpCodeBlock;
            cb.addEmptyLine();
            var varName:string = "this";
            this.addAttributesToCodeBlock(cb, varName, this.currentXML);

            if (this.declarations) {
                var children:Array<any> = this.declarations.children;
                if (children && children.length > 0) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var decl:XML = children[i];
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
            var id:string;
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
            var skinPartStr:string = "[]";
            length = skinParts.length;
            if (length > 0) {
                for (i = 0; i < length; i++) {
                    skinParts[i] = "\"" + skinParts[i] + "\"";
                }
                skinPartStr = "[" + skinParts.join(",") + "]";
            }
            var skinPartFunc:CpFunction = new CpFunction();
            skinPartFunc.name = "skinParts";
            skinPartFunc.isGet = true;
            var skinPartCB:CpCodeBlock = new CpCodeBlock();
            skinPartCB.addReturn(skinPartStr);
            skinPartFunc.codeBlock = skinPartCB;
            this.currentClass.addFunction(skinPartFunc);


            this.currentXML.attributes.id = "";
            //生成视图状态代码
            this.createStates(this.currentXML);
            var states:CpState[];
            var node = this.currentXML;
            var nodeClassName = this.getClassNameOfNode(node);
            var attributes = node.attributes;
            var keys = Object.keys(attributes);
            var keysLength = keys.length;
            for (var m = 0; m < keysLength; m++) {
                var itemName = keys[m];
                var value:string = attributes[itemName];
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
                        for (var i = 0; i < stateLength; i++) {
                            var state = states[i];
                            state.addOverride(new CpSetProperty("", key, itemValue));
                        }
                    }
                }
            }

            //打印视图状态初始化代码
            var stateCode = this.stateCode;
            if (stateCode.length > 0) {
                cb.addCodeLine("this.states = [");
                var first = true;
                var indentStr = "	";
                var length = stateCode.length;
                for (var i = 0; i < length; i++) {
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

            this.currentClass.constructCode = cb;
        }

        /**
         * 是否含有includeIn和excludeFrom属性
         */
        private isStateNode(node:XML):boolean {
            var attributes = node.attributes;
            return attributes.hasOwnProperty("includeIn") || attributes.hasOwnProperty("excludeFrom");
        }

        /**
         * 获取视图状态名称列表
         */
        private getStateNames():void {
            var stateNames = this.stateNames;
            var states:any[];
            var children:any[] = this.currentXML.children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var item:XML = children[i];
                    if (item.nodeType == 1 &&
                        item.localName == "states") {
                        item.namespace = NS_W;
                        states = item.children;
                        break;
                    }
                }
            }

            if (!states)
                return;
            if (states.length == 0) {
                if (DEBUG) {
                    $warn(2102, this.currentClassName, getPropertyStr(item));
                }
                return;
            }
            length = states.length;
            for (i = 0; i < length; i++) {
                var state:XML = states[i];
                if (state.nodeType != 1) {
                    continue;
                }
                var stateGroups:Array<any> = [];
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
                var stateName:string = attributes.name;
                if (stateNames.indexOf(stateName) == -1) {
                    stateNames.push(stateName);
                }
                this.stateCode.push(new CpState(stateName, stateGroups));
            }
        }

        /**
         * 解析视图状态代码
         */
        private createStates(parentNode:XML):void {
            var items:Array<any> = parentNode.children;
            if (!items) {
                return;
            }
            var className = this.getClassNameOfNode(parentNode);
            var length = items.length;
            for (var i = 0; i < length; i++) {
                var node:XML = items[i];
                if (node.nodeType != 1 || (node.localName == "Skin" && node.namespace == NS_E)) {
                    continue;
                }
                this.createStates(node);
                if (node.namespace == NS_W || !node.localName) {
                    continue;
                }
                if (this.isProperty(node, className)) {
                    var prop = node.localName;
                    var index = prop.indexOf(".");
                    var children:Array<any> = node.children;
                    if (index == -1 || !children || children.length == 0) {
                        continue;
                    }
                    var stateName = prop.substring(index + 1);
                    prop = prop.substring(0, index);

                    var type = exmlConfig.getPropertyType(prop, className);
                    if (DEBUG) {
                        if (type == "Array") {
                            $error(2013, this.currentClassName, getPropertyStr(node));
                        }
                        if (children.length > 1) {
                            $error(2011, this.currentClassName, prop, getPropertyStr(node));
                        }
                    }

                    var firstChild:XML = children[0];
                    var value:string;
                    if (firstChild.nodeType == 1) {
                        this.createFuncForNode(firstChild);
                        this.checkIdForState(firstChild);
                        value = "this." + firstChild.attributes.id;
                    }
                    else {
                        value = this.formatValue(prop, (<XMLText><any>firstChild).text, parentNode);
                    }

                    states = this.getStateByName(stateName, node);
                    var l = states.length;
                    if (l > 0) {
                        for (var j:number = 0; j < l; j++) {
                            state = states[j];
                            state.addOverride(new CpSetProperty(parentNode.attributes.id, prop, value));
                        }
                    }
                }
                else if (this.containsState(node)) {
                    var attributes = node.attributes;
                    var id = attributes.id;
                    var nodeClassName = this.getClassNameOfNode(node);
                    this.checkIdForState(node);
                    var stateName:string;
                    var states:Array<CpState>;
                    var state:CpState;
                    if (this.isStateNode(node)) {
                        var propertyName = "";
                        var parent:XML = node.parent;
                        if (parent.localName == "Array")
                            parent = parent.parent;
                        if (parent && parent.parent) {
                            var parentClassName = this.getClassNameOfNode(parent.parent);
                            if (this.isProperty(parent, parentClassName))
                                parent = parent.parent;
                        }

                        if (parent && parent != this.currentXML) {
                            propertyName = parent.attributes.id;
                            this.checkIdForState(parent);
                        }
                        var positionObj = this.findNearNodeId(node);
                        var stateNames:string[] = [];
                        if (attributes.includeIn) {
                            stateNames = attributes.includeIn.split(",");
                        }
                        else {
                            var excludeNames = attributes.excludeFrom.split(",");

                            var stateLength = excludeNames.length;
                            for (var j = 0; j < stateLength; j++) {
                                var name:string = excludeNames[j];
                                this.getStateByName(name, node);//检查exlcudeFrom是否含有未定义的视图状态名
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
                                    state.addOverride(new CpAddItems(id, propertyName,
                                        positionObj.position, positionObj.relativeTo));
                                }
                            }
                        }
                    }

                    var names = Object.keys(attributes);
                    var namesLength = names.length;
                    for (var m = 0; m < namesLength; m++) {
                        name = names[m];
                        var value:string = attributes[name];
                        var index:number = name.indexOf(".");
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
                                    state.addOverride(new CpSetProperty(id, key, value));
                                }
                            }
                        }
                    }
                }
            }

        }

        /**
         * 检查指定的ID是否创建了类成员变量，若没创建则为其创建。
         */
        private checkIdForState(node:XML):void {
            if (!node || this.currentClass.getVariableByName(node.attributes.id)) {
                return;
            }
            this.createVarForNode(node);
            var id:string = node.attributes.id;
            var funcName = id + "_i";
            var func = this.currentClass.getFuncByName(funcName);
            if (!func)
                return;
            var codeLine = "this." + id + " = t;";
            var cb:CpCodeBlock = func.codeBlock;
            if (!cb)
                return;
            if (!cb.containsCodeLine(codeLine)) {
                cb.addCodeLineAt(codeLine, 1);
            }
        }

        /**
         * 通过视图状态名称获取对应的视图状态
         */
        private getStateByName(name:string, node:XML):CpState[] {
            var states:CpState[] = [];
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
                    for (var j:number = 0; j < len; j++) {
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
                $error(2006, this.currentClassName, name, toXMLString(node));
            }
            return states;
        }

        /**
         * 寻找节点的临近节点ID和位置
         */
        private findNearNodeId(node:XML):any {
            var parentNode:XML = node.parent;
            var targetId = "";
            var position:string;
            var index = -1;
            var preItem:XML;
            var afterItem:XML;
            var found = false;
            var className = this.getClassNameOfNode(node);
            var children:Array<any> = parentNode.children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var item = children[i];
                if (this.isProperty(item, className))
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
                position = "first";
                return {position: position, relativeTo: targetId};
            }
            if (index == length - 1) {
                position = "last";
                return {position: position, relativeTo: targetId};
            }
            if (afterItem) {
                position = "before";
                targetId = afterItem.attributes.id;
                if (targetId) {
                    this.checkIdForState(afterItem);
                    return {position: position, relativeTo: targetId};
                }

            }
            return {position: "last", relativeTo: targetId};
        }


        /**
         * 获取节点的完整类名，包括模块名
         */
        private getClassNameOfNode(node:XML):string {
            if (node.namespace == NS_W) {
                return "";
            }
            var className = exmlConfig.getClassNameById(node.localName, node.namespace);
            if (DEBUG && !className) {
                $error(2003, this.currentClassName, toXMLString(node));
            }
            return className;
        }

    }

    if (DEBUG) {
        /**
         * 获取重复的ID名
         */
        function getRepeatedIds(xml:XML):string[] {
            var result:string[] = [];
            this.getIds(xml, result);
            this.repeatedIdMap = {};
            return result;
        }

        function getIds(xml:any, result:Array<any>):void {
            if (xml.namespace != NS_W && xml["$id"]) {
                var id:string = xml.$id;
                if (this.repeatedIdMap[id]) {
                    result.push(toXMLString(xml));
                }
                else {
                    this.repeatedIdMap[id] = true;
                }
            }
            var children:Array<any> = xml.children;
            if (children) {
                var length:number = children.length;
                for (var i:number = 0; i < length; i++) {
                    var node:any = children[i];
                    getIds(node, result);
                }
            }
        }

        function toXMLString(node:XML):string {
            if (!node) {
                return "";
            }
            var str:string = "  at <" + node.name;
            var attributes = node.attributes;
            var keys = Object.keys(attributes);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                var value:string = attributes[key];
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
        function checkDeclarations(declarations:XML, list:string[]):void {
            if (!declarations) {
                return;
            }
            var children = declarations.children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var node:any = children[i];
                    if (node.nodeType != 1) {
                        continue;
                    }
                    if (node.attributes.includeIn) {
                        list.push(toXMLString(node));
                    }
                    if (node.attributes.excludeFrom) {
                        list.push(toXMLString(node))
                    }
                    checkDeclarations(node, list);
                }
            }
        }

        function getPropertyStr(child:any):string {
            var parentStr = toXMLString(child.parent);
            var childStr = toXMLString(child).substring(5);
            return parentStr + "\n      \t" + childStr;
        }

    }
}