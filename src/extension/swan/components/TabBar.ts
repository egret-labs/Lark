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

module swan {

    /**
     * 选项卡组件
     */
    export class TabBar extends ListBase {

        public constructor(){
            super();
            this.requireSelection = true;
            this.useVirtualLayout = false;
        }

        protected createChildren():void{
            if (!this.$layout) {
                var layout = new HorizontalLayout();
                layout.gap = 0;
                layout.horizontalAlign = JustifyAlign.JUSTIFY;
                layout.verticalAlign = JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            super.createChildren();
        }

        $setDataProvider(value:ICollection){
            if(lark.is(this.$dataProvider, swan.Types.ViewStack)){
                this.$dataProvider.removeListener("IndexChanged",this.onViewStackIndexChange,this);
                this.removeListener(lark.Event.CHANGE,this.onIndexChanged,this);
            }

            if(lark.is(value, swan.Types.ViewStack)){
                value.on("IndexChanged",this.onViewStackIndexChange,this);
                this.on(lark.Event.CHANGE,this.onIndexChanged,this);
            }
            super.$setDataProvider(value);
        }

        /**
         * 鼠标点击的选中项改变
         */
        private onIndexChanged(event:lark.Event):void{
            (<ViewStack><any> (this.$dataProvider)).$setSelectedIndex(this.selectedIndex,false);
        }

        /**
         * ViewStack选中项发生改变
         */
        private onViewStackIndexChange(event:lark.Event):void{
            this.setSelectedIndex((<ViewStack><any> (this.$dataProvider)).selectedIndex, false);
        }
    }

    lark.registerClass(TabBar,Types.TabBar);
}