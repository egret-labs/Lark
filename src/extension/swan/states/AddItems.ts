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

module swan.sys {

    export const enum AddPosition {
        /**
         * 添加父级容器的底层
         */
        FIRST,
        /**
         * 添加在父级容器的顶层
         */
        LAST,
        /**
         * 添加在相对对象之前
         */
        BEFORE,
        /**
         * 添加在相对对象之后
         */
        AFTER
    }
}

module swan {

    /**
     * 视图添加状态显示元素操作
     */
    export class AddItems implements IOverride {
        /**
         * 创建一个AddItems实例
         */
        public constructor(target:string, propertyName:string, position:number, relativeTo:string) {
            this.target = target;
            this.propertyName = propertyName;
            this.position = position;
            this.relativeTo = relativeTo;
        }

        /**
         * 要添加到的属性
         */
        public propertyName:string;

        /**
         * 添加的位置，有效值为: "first","last","before","after"
         */
        public position:number;

        /**
         * 相对的显示元素的实例名
         */
        public relativeTo:string;

        /**
         * 目标实例名
         */
        public target:string;

        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        public apply(host:any, parent:lark.DisplayObjectContainer):void {
            var index:number;
            var relative:lark.DisplayObject = host[this.relativeTo];
            var target:lark.DisplayObject = host[this.target];
            var container:lark.DisplayObjectContainer = this.propertyName ? host[this.propertyName] : parent;
            if (!target || !container)
                return;
            switch (this.position) {
                case sys.AddPosition.FIRST:
                    index = 0;
                    break;
                case sys.AddPosition.LAST:
                    index = -1;
                    break;
                case sys.AddPosition.BEFORE:
                    index = container.getChildIndex(relative);
                    break;
                case sys.AddPosition.AFTER:
                    index = container.getChildIndex(relative) + 1;
                    break;
            }
            if (index == -1)
                index = container.numChildren;
            container.addChildAt(target, index);
        }

        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        public remove(host:any,parent:lark.DisplayObjectContainer):void {
            var container:lark.DisplayObjectContainer = this.propertyName ? host[this.propertyName] : parent;
            var target:lark.DisplayObject = host[this.target];
            if (!target || !container)
                return;
            if (target.$parent === container) {
                container.removeChild(target);
            }
        }
    }

    lark.registerClass(AddItems,Types.AddItems,[Types.IOverride]);

}

