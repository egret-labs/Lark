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

    /**
     * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
     * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
     * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
     * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
     * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
     * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
     */
    export class TouchEvent extends Event {

        /**
         * 移动
         */
        public static TOUCH_MOVE:string = "touchMove";

        /**
         * 开始触摸
         */
        public static TOUCH_BEGIN:string = "touchBegin";

        /**
         * 结束触摸
         */
        public static TOUCH_END:string = "touchEnd";

        /**
         * 轻拍，开始和结束触摸都在同一对象上
         */
        public static TOUCH_TAP:string = "touchTap";
        /**
         * 在开始触摸的对象的外部结束触摸
         */
        public static TOUCH_RELEASE_OUTSIDE:string = "touchReleaseOutside";
        /**
         * 从外部移动进入一个新的显示对象
         */
        public static TOUCH_ENTER:string = "touchEnter";
        /**
         * 从当前显示对象移出到外部
         */
        public static TOUCH_LEAVE:string = "touchLeave";


        /**
         * 创建一个 TouchEvent 对象，其中包含有关Touch事件的信息
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public constructor(type:string, bubbles?:boolean, cancelable?:boolean, stageX?:number,
                           stageY?:number, touchPointID?:number) {
            super(type, bubbles, cancelable);
            this.$setTo(stageX, stageY, touchPointID);
        }

        $setTo(stageX:number, stageY:number, touchPointID:number):void {
            this.touchPointID = +touchPointID || 0;
            this._stageX = +stageX || 0;
            this._stageY = +stageY || 0;
        }

        public _stageX:number;
        /**
         * 事件发生点在全局舞台坐标中的水平坐标。
         */
        public get stageX():number {
            return this._stageX;
        }

        public _stageY:number;
        /**
         * 事件发生点在全局舞台坐标中的垂直坐标。
         */
        public get stageY():number {
            return this._stageY;
        }

        private localPoint:Point;

        private getLocalXY():Point {
            if (!this.localPoint) {
                this.localPoint = new Point();
                var m = (<DisplayObject>this.target).$getInvertedConcatenatedMatrix();
                m.transformPoint(this.stageX, this.stageY, this.localPoint);
            }
            return this.localPoint;
        }

        /**
         * 事件发生点相对于currentTarget的水平坐标。
         */
        public get localX():number {
            return this.getLocalXY().x;
        }

        /**
         * 事件发生点相对于currentTarget的垂直坐标。
         */
        public get localY():number {
            return this.getLocalXY().y;
        }

        /**
         * 分配给触摸点的唯一标识号
         */
        public touchPointID:number;

        /**
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         */
        public updateAfterEvent():void {
            lark.player.Ticker.$requestRenderingFlag = true;
        }

        /**
         * 使用指定的EventEmitter对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 派发事件目标
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public static emitTouchEvent(target:IEventEmitter, type:string, bubbles?:boolean, cancelable?:boolean,
                                         stageX?:number, stageY?:number, touchPointID?:number):boolean {
            if(!bubbles&&!target.hasListener(type)){
                return;
            }
            var event = Event.create(TouchEvent, type, bubbles, cancelable);
            event.$setTo(stageX, stageY, touchPointID);
            var result = target.emit(event);
            Event.release(event);
            return result;
        }
    }

    player.registerType(TouchEvent,[Types.TouchEvent]);
}