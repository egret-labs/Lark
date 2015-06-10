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
	 * @language en_US
	 * 切换按钮
	 * @event lark.Event.CHANGE 选中状态发生改变，仅当触摸操作引起的选中状态改变才会抛出此事件。
	 * @version Lark 1.0
	 * @version Swan 1.0
	 * @platform Web,Native
	 */
	/**
	 * @language zh_CN
	 * 切换按钮
	 * @event lark.Event.CHANGE 选中状态发生改变，仅当触摸操作引起的选中状态改变才会抛出此事件。
	 * @version Lark 1.0
	 * @version Swan 1.0
	 * @platform Web,Native
	 */
	export class ToggleButton extends Button{

		/**
		 * @private
		 */
		$selected: boolean = false;
		/**
		 * @language en_US
		 * 按钮处于按下状态时为 true，而按钮处于弹起状态时为 false。
		 * @version Lark 1.0
		 * @version Swan 1.0
		 * @platform Web,Native
		 */
		/**
		 * @language zh_CN
		 * 按钮处于按下状态时为 true，而按钮处于弹起状态时为 false。
		 * @version Lark 1.0
		 * @version Swan 1.0
		 * @platform Web,Native
		 */
		public get selected():boolean{
			return this.$selected;
		}

		public set selected(value:boolean){
			this.$setSelected(value);
		}

		/**
		 * @private
		 * 
		 * @param value 
		 */
		$setSelected(value:boolean):void{
			value = !!value;
			if (value === this.$selected)
				return;
			this.$selected = value;
			this.invalidateState();
			PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"selected");
		}

		/**
		 * @language en_US
		 * 返回要应用到外观的状态的名称
		 * @version Lark 1.0
		 * @version Swan 1.0
		 * @platform Web,Native
		 */
		/**
		 * @language zh_CN
		 * 返回要应用到外观的状态的名称
		 * @version Lark 1.0
		 * @version Swan 1.0
		 * @platform Web,Native
		 */
		protected getCurrentState():string{
			var state = super.getCurrentState();
			if (!this.$selected){
				return state;
			}
			else{
				var selectedState = state + "AndSelected";
				var skin = this.skin;
				if(skin&&skin.hasState(selectedState)){
					return selectedState;
				}
				return state=="disabled"?"disabled":"down";
			}
		}
		/**
		 * @private
		 * 是否根据鼠标事件自动变换选中状态,默认true。仅框架内使用。
		 */
		$autoSelected:boolean = true;

		/**
		 * @language en_US
		 * 当在用户单击按钮之后处理 MouseEvent.MOUSE_UP 事件时，将调用此方法
		 * @version Lark 1.0
		 * @version Swan 1.0
		 * @platform Web,Native
		 */
		/**
		 * @language zh_CN
		 * 当在用户单击按钮之后处理 MouseEvent.MOUSE_UP 事件时，将调用此方法
		 * @version Lark 1.0
		 * @version Swan 1.0
		 * @platform Web,Native
		 */
		protected buttonReleased():void{
			if(!this.$autoSelected)
				return;
			this.selected = !this.$selected;
			this.emitWith(lark.Event.CHANGE);
		}
	}
	registerBindable(ToggleButton.prototype,"selected");
	lark.registerClass(ToggleButton, Types.ToggleButton);
}