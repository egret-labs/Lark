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

module lark.web {

    /**
     * XML节点基类
     */
    export class XMLNode {

        public constructor(nodeType:number, parentNode:XML) {
            this.nodeType = nodeType;
            this.parentNode = parentNode;
        }

        /**
         * 节点类型，1：XML，2：XMLAttribute，3：XMLText
         */
        public nodeType:number;
        /**
         * 节点所属的父级节点
         */
        public parentNode:XML;
    }

    /**
     * XML节点对象
     */
    export class XML extends XMLNode {

        public constructor(localName:string, parentNode:XML, prefix:string, namespaceURI:string, nodeName:string) {
            super(1, parentNode);
            this.localName = localName;
            this.prefix = prefix;
            this.namespaceURI = namespaceURI;
            this.nodeName = nodeName;
        }

        /**
         * 读取一个属性值
         * @param name 要读取的属性名称
         * @returns 返回属性对应的值，若属性不存在返回""。
         */
        public getAttribute(name:string):string {
            var node = this.findAttribute(name);
            return node?node.value:"";
        }

        /**
         * 设置一个属性值
         * @param name 要设置的属性名称
         * @param value 要设置的值
         */
        public setAttribute(name:string,value:string) {
            var node = this.findAttribute(name);
            if(node){
                node.value = value;
            }
            else{
                this.attributes.push(new XMLAttribute(name,value,this));
            }
        }

        private findAttribute(name:string):XMLAttribute{
            var list = this.attributes;
            var length = list.length;
            for(var i=0;i<length;i++){
                var node = list[i];
                if(node.name==name){
                    return node;
                }
            }
            return null;
        }

        /**
         * 当前节点上的属性列表
         */
        public attributes:XMLAttribute[] = [];
        /**
         * 当前节点的子节点列表
         */
        public childNodes:XMLNode[] = [];
        /**
         * 节点完整名称。例如节点 <e:Button/> 的 nodeName 为：e:Button
         */
        public nodeName:string;
        /**
         * 节点的命名空间前缀。例如节点 <e:Button/> 的 prefix 为：e
         */
        public prefix:string;
        /**
         * 节点的本地名称。例如节点 <e:Button/> 的 prefix 为：Button
         */
        public localName:string;
        /**
         * 节点的命名空间地址。例如节点 <e:Skin xmlns:e="http://ns.egret-labs.org/egret"/> 的 namespaceURI 为： http://ns.egret-labs.org/egret
         */
        public namespaceURI:string;
    }

    /**
     * XML文本节点
     */
    export class XMLText extends XMLNode {
        public  constructor(textContent:string, parentNode:XML) {
            super(3, parentNode);
            this.textContent = textContent;
        }

        /**
         * 文本内容
         */
        public textContent:string;
    }

    /**
     * XML属性节点
     */
    export class XMLAttribute extends XMLNode {

        public constructor(name:string, value:string, parentNode:XML) {
            super(2, parentNode);
            this.name = name;
            this.value = value;
        }

        /**
         * 属性名称
         */
        public name:string;
        /**
         * 属性值
         */
        public value:string;
    }


    var parser = new DOMParser();

    /**
     * 解析字符串为XML对象
     * @param text 要解析的字符串
     */
    function parse(text:string):XML {
        var xmlDoc = parser.parseFromString(text, "text/xml");
        var length = xmlDoc.childNodes.length;
        for (var i = 0; i < length; i++) {
            var node = xmlDoc.childNodes[i];
            if (node.nodeType === 1) {
                return parseNode(node, null);
            }
        }
        return null;
    }

    /**
     * 解析一个节点
     */
    function parseNode(node:Node, parentNode:XML):XML {
        var xml = new XML(node.localName, parentNode, node.prefix, node.namespaceURI, node.nodeName);
        var nodeAttributes = node.attributes;
        var attributes = xml.attributes;
        var length = nodeAttributes.length;
        for (var i = 0; i < length; i++) {
            var attributeNode = nodeAttributes[i];
            var name = attributeNode.name;
            if (name.indexOf("xmlns:") === 0) {
                continue;
            }
            attributes.push(new XMLAttribute(name, attributeNode.value, xml));
        }
        var childNodes = node.childNodes;
        length = childNodes.length;
        var children = xml.childNodes;
        for (i = 0; i < length; i++) {
            var childNode = childNodes[i];
            var nodeType = childNode.nodeType;
            var childXML:any;
            if (nodeType === 1) {
                childXML = parseNode(childNode, xml);
            }
            else if (nodeType === 3) {
                var text = childNode.textContent.trim();
                if (text) {
                    childXML = new XMLText(text, xml);
                }
            }
            if (childXML) {
                children.push(childXML);
            }
        }
        return xml;
    }


    player.XML = {parse: parse};
}