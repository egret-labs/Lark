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

module lark {

    export class GUI extends gui.Group {

        public constructor() {
            super();
            this.initUI();
            var request = new HttpRequest();
            request.once(Event.COMPLETE, this.onExmlLoaded, this);
            request.open("tests/AlertSkin.exml");
            request.send();
        }

        private onExmlLoaded(event:Event):void {
            var request:HttpRequest = event.target;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(request.response, "text/xml");
            var xml = this.parse(xmlDoc);
            var dom = new XMLSerializer();
            var str = dom.serializeToString(xml);
            this.label.text = str;
        }

        private label:gui.Label;

        private initUI():void {
            var label = new gui.Label();
            this.label = label;
            this.addChild(label);
        }

        private parse(xmlDoc:any):any {
            var length:number = xmlDoc.childNodes.length;
            var found:boolean = false;
            for (var i:number = 0; i < length; i++) {
                var node:any = xmlDoc.childNodes[i];
                if (node.nodeType == 1) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return null;
            }
            var xml:any = this.parseNode(node);
            return xml;
        }

        private parseNode(node:any):any {
            if (!node || node.nodeType != 1) {
                return null;
            }
            var xml:any = {};
            xml.localName = node.localName;
            xml.namespaceURI = node.namespaceURI;
            xml.nodeName = node.nodeName;
            xml.prefix = node.prefix;
            var nodeAttributes:any = node.attributes;
            var attributes = xml.attributes = [];
            var length:number = nodeAttributes.length;
            for (var i:number = 0; i < length; i++) {
                var attributeNode:any = nodeAttributes[i];
                var key:string = attributeNode.name;
                if (key.indexOf("xmlns:") == 0) {
                    continue;
                }
                attributes.push({name:attributeNode.name,value:attributeNode.value});
            }
            var childNodes:any = node.childNodes;
            length = childNodes.length;
            for (i = 0; i < length; i++) {
                var childNode:any = childNodes[i];
                var childXML:any = this.parseNode(childNode);
                if (childXML) {
                    if (!xml.childNodes) {
                        xml.childNodes = [];
                    }
                    childXML.parent = xml;
                    xml.childNodes.push(childXML);
                }
            }
            if (!xml.childNodes) {
                var text:string = node.textContent.trim();
                if (text) {
                    xml.textContent = text;
                }
            }
            return xml;
        }

    }
}