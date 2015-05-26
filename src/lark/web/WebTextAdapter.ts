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

    var tempPoint = new Point();

    /**
     * HTML5 环境下的输入文本
     */
    export class WebTextAdapter extends LarkObject implements sys.ITextAdapter{
        constructor(container:HTMLDivElement,stage:Stage,canvas:HTMLCanvasElement){
            super();
            this.$stage = stage;
            this.canvas = canvas;
            this.container = container;
            sys.$cacheTextAdapter(this);
            this.createHtmlInputs();
        }

        public $stage:Stage;
        private scaleX:number = 1;
        private scaleY:number = 1;
        private offsetX:number = 1;
        private offsetY:number = 1;
        private canvas:HTMLCanvasElement;
        private container:HTMLDivElement;
        private textContainer:HTMLDivElement;
        private pendingToShowHtmlInput = false;
        private currentTextInput:TextInput = null;
        private currentHtmlInput:HTMLInputElement|HTMLTextAreaElement;
        private singleLineTextInput:HTMLInputElement = null;
        private multiLineTextInput:HTMLTextAreaElement = null;

        /**
         * 当用户点击TextInput时，将它设置为正在输入的TextInput对象，HTML text input 会显示出来并获得焦点
         * @param currentTextInput 要输入的TextInput对象
         */
        public $setCurrentTextInput(currentTextInput: TextInput) {
            if (this.currentTextInput != null)
                this.$removeCurrentTextInput();
            this.currentTextInput = currentTextInput;
            this.currentHtmlInput = currentTextInput.wordWrap ? this.multiLineTextInput : this.singleLineTextInput;
            this.currentHtmlInput.value = this.currentTextInput.text;
            this.pendingToShowHtmlInput = true;
            this.canvas['userTyping'] = true;
        }

        /**
         * 清空正在输入的TextInput，隐藏HTML text input。
         */
        public $removeCurrentTextInput(){
            window.scrollTo(0, 0);
            var currentTextInput = this.currentTextInput;
            var currentHtmlInput = this.currentHtmlInput;

            currentHtmlInput.onblur = null;
            currentHtmlInput.oninput = null;
            this.resetHtmlInputStyle(currentHtmlInput);
            this.resetTextContainerStyle();

            currentTextInput.$setUserInputText(currentHtmlInput.value);
            currentTextInput.$endInput();

            this.currentHtmlInput = null;
            this.currentTextInput = null;
            this.pendingToShowHtmlInput = false;

            this.canvas['userTyping'] = false;
        }


        /**
         * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
         * @param scaleX 水平方向的缩放比例。
         * @param scaleY 垂直方向的缩放比例。
         * @param offsetX canvas 相对 container 的横向偏移位置
         * @param offsetY canvas 相对 container 的纵向偏移位置
         */
        public updateScaleMode(scaleX:number, scaleY:number, offsetX:number, offsetY:number):void {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.offsetX = offsetX;
            this.offsetY = offsetY;
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
                this.pendingToShowHtmlInput = false;
                e.stopImmediatePropagation();
                this.$initializeInput();
                var currentHtmlInput = this.currentHtmlInput;
                currentHtmlInput.onblur = this.handleHtmlInputBlur;
                currentHtmlInput.oninput = this.handleHtmlInputInputEvent;
                currentHtmlInput.selectionStart = currentHtmlInput.value.length;
                currentHtmlInput.selectionEnd = currentHtmlInput.value.length;
                currentHtmlInput.focus();

                this.currentTextInput.$startInput();
            }
            else if(this.currentTextInput != null){
                this.$removeCurrentTextInput();
            }
        };

        private handleHtmlInputInputEvent = (e)=>{
            this.currentTextInput.$setUserInputText(this.currentHtmlInput.value);
        };

        private handleHtmlInputBlur = (e) => {
            this.$removeCurrentTextInput();
        };

        private resetHtmlElementStyle(element:HTMLElement){
            element.style.position = "absolute";
            element.style.left = "0px";
            element.style.top = "0px";
            element.style.border = "none";
            element.style.padding = "0";
            element.style[getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
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


        /**
         * 更新HTML5 text input 的属性值
         */
        public $initializeInput(){
            this.singleLineTextInput.style.display="none";
            this.multiLineTextInput.style.display="none";
            var textInput = this.currentTextInput;

            var scaleX = this.scaleX;
            var scaleY = this.scaleY;
            var matrix = textInput.$getConcatenatedMatrix().clone();
            matrix.scale(scaleX,scaleY);

            var p = textInput.localToGlobal(0,0,tempPoint);
            this.textContainer.style.left = this.offsetX + p.x *scaleX +"px";
            this.textContainer.style.top = this.offsetY + p.y *scaleY +"px";

            scaleX = matrix.$getScaleX();
            scaleY = matrix.$getScaleY();
            var width = textInput.width * scaleX + "px";
            var height = textInput.height * scaleY + "px";
            this.textContainer.style.width=width;
            this.textContainer.style.height=height;


            var setElementStyle = this.setElementStyle.bind(this);


            setElementStyle("fontFamily", textInput.fontFamily);
            setElementStyle("fontStyle", textInput.italic ? "italic" : "normal");
            setElementStyle("fontWeight", textInput.bold ? "bold" : "normal");
            setElementStyle("textAlign", textInput.textAlign);
            setElementStyle("fontSize", textInput.fontSize + "px");
            setElementStyle("lineHeight", textInput.fontSize + "px");
            setElementStyle("color", sys.toColorString(textInput.textColor));
            setElementStyle("verticalAlign", textInput.verticalAlign);
            setElementStyle("display", "block");
            setElementStyle("width", textInput.width + "px");
            setElementStyle("height", textInput.height + "px");
            setElementStyle(getPrefixStyleName('transform'), 'matrix(' + [matrix.a,matrix.b,matrix.c,matrix.d,0,0].join(",") + ')');

            setTimeout(()=>{
                this.currentHtmlInput.style.opacity='1';
            },0);

            if(textInput.wordWrap == false && textInput.verticalAlign != VerticalAlign.MIDDLE){
                var padding = textInput.height - textInput.fontSize;
                var styleName = textInput.verticalAlign == VerticalAlign.TOP?'paddingBottom':'paddingTop';
                setElementStyle(styleName,padding + "px");
                setElementStyle("height", textInput.fontSize + "px");
            }
        }

        private setElementStyle(style:string, value:any):void {
            if (this.currentHtmlInput) {
                this.currentHtmlInput.style[style] = value;
            }
        }
    }


    var $CurrentPrefix:string = null;

    function getPrefixStyleName(name:string):string{
        if($CurrentPrefix==null)
            $CurrentPrefix = getPrefix();
        return $CurrentPrefix + name.charAt(0).toUpperCase()+name.substr(1);
    }

    function getPrefix():string {
        var tempStyle = document.createElement('div').style;
        var prefix = "";
        var transArr:Array<string> = ["t", "webkitT", "msT", "MozT", "OT"];

        for (var i:number = 0; i < transArr.length; i++) {
            var transform:string = transArr[i] + 'ransform';

            if (transform in tempStyle){
                prefix = transArr[i]
            }
        }

        return prefix.substr(0,prefix.length-1);
    }

}