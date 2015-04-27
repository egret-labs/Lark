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


module lark.gui {

	/**
	 * 移动事件
	 */
	export class MoveEvent extends Event{

		public static MOVE:string = "move";
		
		public constructor(type:string,bubbles?:boolean,cancelable?:boolean,oldX?:number, oldY?:number){
			super(type, bubbles, cancelable);
			
			this.oldX = oldX;
			this.oldY = oldY;
		}
		
		/**
		 * 旧的组件X
		 */
		public oldX:number;
		
		/**
		 * 旧的组件Y
		 */
		public oldY:number;

		/**
		 * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
		 * @param oldWidth 旧的宽度
		 * @param oldHeight 旧的高度
		 */
		public static emitMoveEvent(target:IEventEmitter, oldX?:number, oldY?:number):boolean {
			var event = Event.create(MoveEvent, ResizeEvent.RESIZE);
			event.oldX = oldX;
			event.oldY = oldY;
			var result = target.emit(event);
			Event.release(event);
			return result;
		}
	}
	registerType(MoveEvent,[Types.MoveEvent]);
}