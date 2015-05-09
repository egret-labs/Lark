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

    var parser = new DOMParser();
    /**
     * 解析字符串为XML对象
     * @param text 要解析的字符串
     */
    function parse(text:string):XML {
        var xmlDoc = parser.parseFromString(text,"text/xml");
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
        var xml = new XML(node.localName,parentNode,node.prefix,node.namespaceURI,node.nodeName);
        var nodeAttributes = node.attributes;
        var attributes = xml.attributes;
        var length = nodeAttributes.length;
        for (var i = 0; i < length; i++) {
            var attributeNode = nodeAttributes[i];
            var name = attributeNode.name;
            if (name.indexOf("xmlns:") === 0) {
                continue;
            }
            attributes.push(new XMLAttribute(name,attributeNode.value,xml));
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
                if(text){
                    childXML = new XMLText(text,xml);
                }
            }
            if (childXML) {
                children.push(childXML);
            }
        }
        return xml;
    }

    lark.XML.parse = parse;
}