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

module lark{

    /**
     * TextInput 用于创建显示对象来输入文本. 默认为单行文本，当需要使用多行文本时，请设置 multiLine 为 true
     */
    export class TextInput extends TextField{
        constructor(){
            super();
            this.$textFieldValues[sys.TextKeys.wordWrap] = false;
            this.on(TouchEvent.TOUCH_BEGIN,this.handleTouchBegin,this);

        }

        private _isTyping:boolean = false;
        private _isFocus:boolean = false;


        private handleTouchBegin(e:TouchEvent){
            if(this._isFocus)
                return;
            this._isFocus = true;
            this.setAsCurrent();
        }

        private setAsCurrent(){
            var layer = sys.$getTextAdapter(this);
            layer.$setCurrentTextInput(this);
        }

        /**
         * Call by TextAdapter set text
         * @param text
         */
        $setUserInputText(text:string){
            if(text==this.text)
                return;
            this.text = text;
            this.emitWith(TextInputEvent.INPUT);
        }

        $startInput(){
            this._isTyping = true;
            this.$invalidateContentBounds();
            this.emitWith(TextInputEvent.FOCUS);
        }

        $endInput(){
            this._isTyping = false;
            this._isFocus = false;
            this.$invalidateContentBounds();
            this.emitWith(TextInputEvent.BLUR);
            this.emitWith(TextInputEvent.CHANGE);
        }

        $setX(value:number):boolean {
            this.updateTextAdapter();
            return super.$setX(value);
        }
        $setY(value:number):boolean {
            this.updateTextAdapter();
            return super.$setY(value);
        }

        $measureContentBounds(bounds:Rectangle):void {
            super.$measureContentBounds(bounds);
            this.updateTextAdapter();
        }
        $render(context:sys.RenderContext):void {
            if(this._isTyping){
                return;
            }
            super.$render(context);
        }

        private timeoutId:number = -1;
        private updateTextAdapter(){
            if(!this._isFocus){
                return;
            }

            if(this.timeoutId != -1)
                clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(()=>{
                var layer = sys.$getTextAdapter(this);
                layer.$initializeInput();
                this.timeoutId = -1;
            },0);
        }
    }

    registerClass(TextInput, Types.TextInput);
}