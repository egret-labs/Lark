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

    var stageToTextLayerMap:any = {};
    var tempPoint = new Point();
    export class WebTextLayer extends LarkObject{
        constructor(container:HTMLDivElement,stage:Stage,canvas:HTMLCanvasElement){
            super();
            this.canvas = canvas;
            this.container = container;
            stageToTextLayerMap[stage.hashCode] = this;
            this.createHtmlInputs();
        }

        static getTextLayer(textInput:TextInput):WebTextLayer{
            var hashCode = textInput.stage.hashCode;
            return stageToTextLayerMap[hashCode];
        }

        public scaleX:number = 1;
        public scaleY:number = 1;
        public canvas:HTMLCanvasElement;
        public container:HTMLDivElement;
        public textContainer:HTMLDivElement;
        public pendingToShowHtmlInput = false;
        public currentTextInput:TextInput = null;
        public currentHtmlInput:HTMLInputElement|HTMLTextAreaElement;

        private singleLineTextInput:HTMLInputElement = null;
        private multiLineTextInput:HTMLTextAreaElement = null;


        public setCurrentTextInput(currentTextInput:TextInput){
            this.currentTextInput = currentTextInput;
            this.currentHtmlInput = currentTextInput.multiLine ? this.multiLineTextInput : this.singleLineTextInput;
            this.currentHtmlInput.value = this.currentTextInput.text;
            this.pendingToShowHtmlInput = true;
            console.log('set true');
        }

        public removeCurrentTextInput(){
            console.log('remove html');
            var currentTextInput = this.currentTextInput;
            var currentHtmlInput = this.currentHtmlInput;

            if(currentHtmlInput) {
                currentHtmlInput.onblur = null;
                currentHtmlInput.oninput = null;
                this.resetHtmlInputStyle(currentHtmlInput);
                this.resetTextContainerStyle();
            }
            if(currentTextInput && currentHtmlInput){
                currentTextInput.$setUserInputText(currentHtmlInput.value);
                currentTextInput.$endInput();
            }

            this.currentHtmlInput = null;
            this.currentTextInput = null;
        }


        /**
         * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
         * @param scaleX 水平方向的缩放比例。
         * @param scaleY 垂直方向的缩放比例。
         */
        public updateScaleMode(scaleX:number, scaleY:number):void {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        }

        private createHtmlInputs(){
            var div = document.createElement("div");
            this.textContainer = div;
            div.id="text-container-"+this.hashCode;
            this.resetTextContainerStyle();

            var singleHtmlInput = document.createElement("input");
            singleHtmlInput.type="text";
            var multiLineHtmlInput = document.createElement("textarea");
            multiLineHtmlInput.style['resize']='none';
            this.resetHtmlInputStyle(singleHtmlInput);
            this.resetHtmlInputStyle(multiLineHtmlInput);
            div.appendChild(singleHtmlInput);
            div.appendChild(multiLineHtmlInput);
            this.container.appendChild(div);
            this.singleLineTextInput = singleHtmlInput;
            this.multiLineTextInput = multiLineHtmlInput;
            this.canvas.addEventListener("click",this.handleContainerClick)
        }

        private handleContainerClick = (e) => {
            if(this.pendingToShowHtmlInput){
                console.log('set false');
                this.pendingToShowHtmlInput = false;
                e.stopImmediatePropagation();
                this.formatHtmlInputStyle();
                this.currentHtmlInput.onblur = this.handleHtmlInputBlur;
                this.currentHtmlInput.oninput = this.handleHtmlInputInputEvent;
                this.currentHtmlInput.selectionStart = this.currentHtmlInput.value.length;
                this.currentHtmlInput.selectionEnd = this.currentHtmlInput.value.length;
                this.currentHtmlInput.focus();
                setTimeout(()=>this.currentHtmlInput.style.opacity='1',0);
                this.currentTextInput.emitWith('focus');
            }
            else{
                this.removeCurrentTextInput();
            }
        };

        private handleHtmlInputInputEvent = (e)=>{
            this.currentTextInput.text = this.currentHtmlInput.value;
        };

        private handleHtmlInputBlur = (e) => {
            this.removeCurrentTextInput();
        };

        private resetHtmlElementStyle(element:HTMLElement){
            element.style.position = "absolute";
            element.style.left = "0px";
            element.style.top = "0px";
            element.style.border = "none";
            element.style.padding = "0";
        }

        private resetHtmlInputStyle(element:HTMLElement){
            element.setAttribute("tabindex", "-1");
            element.style.width = "1px";
            element.style.height = "12px";
            element.style.outline = "thin";
            element.style.background = "none";
            element.style.overflow = "hidden";
            element.style.wordBreak = "break-all";
            element.style.opacity = '0';

            this.resetHtmlElementStyle(element);
        }

        private resetTextContainerStyle(){
            var style = this.textContainer.style;
            style.height="0px";
            style.width="0px";
            style.top="-100px";
            this.resetHtmlElementStyle(this.textContainer);
        }

        private formatHtmlInputStyle(){
            this.singleLineTextInput.style.display="none";
            this.multiLineTextInput.style.display="none";
            var textInput = this.currentTextInput;
            var scalex = this.scaleX;
            var scaley = this.scaleY;

            var p = this.currentTextInput.localToGlobal(0,0,tempPoint);

            this.textContainer.style.left = p.x *scalex +"px";
            this.textContainer.style.top = p.y *scaley +"px";

            scalex = textInput.scaleX * this.scaleX;
            scaley = textInput.scaleY * this.scaleY;
            var setElementStyle = this.setElementStyle.bind(this);
            setElementStyle("fontFamily", textInput.fontFamily);
            setElementStyle("fontStyle", textInput.italic ? "italic" : "normal");
            setElementStyle("fontWeight", textInput.bold ? "bold" : "normal");
            setElementStyle("textAlign", textInput.horizontalAlign);
            setElementStyle("fontSize", textInput.fontSize * scalex + "px");
            setElementStyle("lineHeight", textInput.fontSize * scaley + "px");
            setElementStyle("color", player.toColorString(textInput.textColor));
            setElementStyle("verticalAlign", textInput.verticalAlign);
            setElementStyle("display", "block");
            var width = textInput.width * scalex + "px";
            var height = textInput.height * scaley + "px";
            setElementStyle("width", width);
            setElementStyle("height", height);
            this.textContainer.style.width=width;
            this.textContainer.style.height=height;

        }

        private setElementStyle(style:string, value:any):void {
            if (this.currentHtmlInput) {
                this.currentHtmlInput.style[style] = value;
            }
        }
    }

}