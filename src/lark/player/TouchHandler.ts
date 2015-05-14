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

module lark.player{

    var ENTER_LIST:DisplayObject[] = [],LEAVE_LIST:DisplayObject[] = [];
    /**
     * 用户交互操作管理器
     */
    export class TouchHandler extends LarkObject {

        public constructor(stage:Stage){
            super();
            this.stage = stage;
        }

        private stage:Stage;

        private touchDownTarget:{[key:number]:number} = {};

        private touchMoveTarget:{[key:number]:DisplayObject} = {};
        /**
         * 触摸开始（按下）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public onTouchBegin(x:number,y:number,touchPointID:number):void {
            var target = this.findTarget(x,y);
            this.touchDownTarget[touchPointID] = target.$hashCode;
            TouchEvent.emitTouchEvent(target,TouchEvent.TOUCH_BEGIN,true,true,x,y,touchPointID,true);
        }

        private lastTouchX:number = -1;
        private lastTouchY:number = -1;

        /**
         * 触摸移动
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public onTouchMove(x:number,y:number,touchPointID:number):void {
            if(this.lastTouchX===x&&this.lastTouchY===y){
                return;
            }
            this.lastTouchX = x;
            this.lastTouchY = y;
            var target = this.findTarget(x,y);
            var touchDown = this.touchDownTarget[touchPointID]>0;
            var oldTarget = this.touchMoveTarget[touchPointID];
            this.touchMoveTarget[touchPointID] = target;
            TouchEvent.emitTouchEvent(target,TouchEvent.TOUCH_MOVE,true,true,x,y,touchPointID,touchDown);
            if(oldTarget!==target){
                var enterList = this.getParentList(target,ENTER_LIST);
                var leaveList = this.getParentList(oldTarget,LEAVE_LIST);
                while(enterList[enterList.length-1]===leaveList[leaveList.length-1]){
                    enterList.pop();
                    leaveList.pop();
                }
                while(leaveList.length){
                    TouchEvent.emitTouchEvent(leaveList.shift(),TouchEvent.TOUCH_LEAVE,false,true,x,y,touchPointID,touchDown);
                }
                while(enterList.length){
                    TouchEvent.emitTouchEvent(enterList.shift(),TouchEvent.TOUCH_ENTER,false,true,x,y,touchPointID,touchDown);
                }
            }
        }

        private getParentList(target:DisplayObject,list):DisplayObject[]{
            while(target){
                list.push(target);
                target = target.$parent;
            }
            return list;
        }

        /**
         * 触摸结束（弹起）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public onTouchEnd(x:number,y:number,touchPointID:number):void {
            var target = this.findTarget(x,y);
            var oldTargetCode = this.touchDownTarget[touchPointID];
            this.touchDownTarget[touchPointID] = -1;
            TouchEvent.emitTouchEvent(target,TouchEvent.TOUCH_END,true,true,x,y,touchPointID,false);
            if(oldTargetCode===target.$hashCode){
                TouchEvent.emitTouchEvent(target,TouchEvent.TOUCH_TAP,true,true,x,y,touchPointID,false);
            }
            else{
                TouchEvent.emitTouchEvent(target,TouchEvent.TOUCH_RELEASE_OUTSIDE,true,true,x,y,touchPointID,false);
            }
        }

        /**
         * 获取舞台坐标下的触摸对象
         */
        private findTarget(stageX:number,stageY:number):DisplayObject{
            var target = this.stage.$hitTest(stageX,stageY);
            if(!target){
                target = this.stage;
            }
            return target;
        }
    }
}