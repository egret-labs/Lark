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
    export class TestInput extends Sprite{

        constructor(){
            super();

            var textarea = new TextInput();
            textarea.width = 300;
            textarea.height = 300;
            textarea.y = 100;
            textarea.x = 100;
            textarea.displayAsPassword=true;
            textarea.displayAsPassword=false;
            textarea.wordWrap = true;
            textarea.text = "Text Area !";
            textarea.selectRange(0,45);
            textarea.fontSize=40;
            textarea.bold = true;
            textarea.verticalAlign = VerticalAlign.TOP;
            textarea.italic = true;
            textarea.textColor = 0x000000;

            var bg = new Shape();
            bg.x = 100;
            bg.y = 100;
            bg.graphics.beginPath();
            bg.graphics.fillStyle = 'white';
            bg.graphics.fillRect(0, 0, 300, 300);
            this.addChild(bg);


            var input = new TextInput();
            input.width = 300;
            input.height = 50;
            input.y = 500;
            input.x = 100;
            input.text = "Text Input!";
            input.fontSize = 40;


            textarea.on(Event.CHANGE, e=> {
                console.log(textarea.selectionActivePosition,textarea.selectionAnchorPosition);
            }, this);
            textarea.on(Event.FOCUS_IN, e=> {

                textarea.selectRange(0,45);
            }, this);

            var inputbg = new Shape();
            inputbg.x = 100;
            inputbg.y = 500;
            inputbg.graphics.beginPath();
            inputbg.graphics.fillStyle = 'white';
            inputbg.graphics.fillRect(0, 0, 300, 50);
            this.addChild(inputbg);

            window['t'] = input;

            this.addChild(textarea);
            this.addChild(input);
        }
    }
}