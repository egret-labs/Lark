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
     * 布局管理器
     */
    class Validator extends EventEmitter {
        /**
         * 创建一个LayoutManager对象
         */
        public constructor() {
            super();
        }

        private targetLevel:number = Number.POSITIVE_INFINITY;

        private invalidatePropertiesFlag:boolean = false;

        private invalidateClientPropertiesFlag:boolean = false;

        private invalidatePropertiesQueue:DepthQueue = new DepthQueue();

        /**
         * 标记组件属性失效
         */
        public invalidateProperties(client:UIComponent):void {
            if (!this.invalidatePropertiesFlag) {
                this.invalidatePropertiesFlag = true;
                if (!this.listenersAttached)
                    this.attachListeners();
            }
            if (this.targetLevel <= client.$nestLevel)
                this.invalidateClientPropertiesFlag = true;
            this.invalidatePropertiesQueue.insert(client);
        }

        /**
         * 验证失效的属性
         */
        private validateProperties():void {
            var client:UIComponent = this.invalidatePropertiesQueue.shift();
            while (client) {
                if (client.parent) {
                    client.validateProperties();
                }
                client = this.invalidatePropertiesQueue.shift();
            }
            if (this.invalidatePropertiesQueue.isEmpty())
                this.invalidatePropertiesFlag = false;
        }

        private invalidateSizeFlag:boolean = false;

        private invalidateClientSizeFlag:boolean = false;

        private invalidateSizeQueue:DepthQueue = new DepthQueue();

        /**
         * 标记需要重新测量尺寸
         */
        public invalidateSize(client:UIComponent):void {
            if (!this.invalidateSizeFlag) {
                this.invalidateSizeFlag = true;
                if (!this.listenersAttached)
                    this.attachListeners();
            }
            if (this.targetLevel <= client.$nestLevel)
                this.invalidateClientSizeFlag = true;
            this.invalidateSizeQueue.insert(client);
        }

        /**
         * 测量尺寸
         */
        private validateSize():void {
            var client:UIComponent = this.invalidateSizeQueue.pop();
            while (client) {
                if (client.parent) {
                    client.validateSize();
                }
                client = this.invalidateSizeQueue.pop();
            }
            if (this.invalidateSizeQueue.isEmpty())
                this.invalidateSizeFlag = false;
        }


        private invalidateDisplayListFlag:boolean = false;

        private invalidateDisplayListQueue:DepthQueue = new DepthQueue();

        /**
         * 标记需要重新布局
         */
        public invalidateDisplayList(client:UIComponent):void {
            if (!this.invalidateDisplayListFlag) {
                this.invalidateDisplayListFlag = true;
                if (!this.listenersAttached)
                    this.attachListeners();
            }
            this.invalidateDisplayListQueue.insert(client);
        }

        /**
         * 重新布局
         */
        private validateDisplayList():void {
            var client:UIComponent = this.invalidateDisplayListQueue.shift();
            while (client) {
                if (client.parent) {
                    client.validateDisplayList();
                }
                client = this.invalidateDisplayListQueue.shift();
            }
            if (this.invalidateDisplayListQueue.isEmpty())
                this.invalidateDisplayListFlag = false;
        }

        private eventDisplay:Bitmap = new Bitmap();
        /**
         * 是否已经添加了事件监听
         */
        private listenersAttached:boolean = false;

        /**
         * 添加事件监听
         */
        private attachListeners():void {
            this.eventDisplay.on(Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
            this.eventDisplay.on(Event.RENDER, this.doPhasedInstantiationCallBack, this);
            player.Ticker.$invalidateRenderFlag = true;
            this.listenersAttached = true;
        }

        /**
         * 执行属性应用
         */
        private doPhasedInstantiationCallBack(event?:Event):void {
            this.eventDisplay.removeListener(Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
            this.eventDisplay.removeListener(Event.RENDER, this.doPhasedInstantiationCallBack, this);
            this.doPhasedInstantiation();
        }

        private doPhasedInstantiation():void {
            if (this.invalidatePropertiesFlag) {
                this.validateProperties();
            }
            if (this.invalidateSizeFlag) {
                this.validateSize();
            }

            if (this.invalidateDisplayListFlag) {
                this.validateDisplayList();
            }

            if (this.invalidatePropertiesFlag ||
                this.invalidateSizeFlag ||
                this.invalidateDisplayListFlag) {
                this.attachListeners();
            }
            else {
                this.listenersAttached = false;
            }
        }

        /**
         * 使大于等于指定组件层级的元素立即应用属性
         * @param target 要立即应用属性的组件
         */
        public validateClient(target:UIComponent):void {

            var obj:UIComponent;
            var done:boolean = false;
            var oldTargetLevel:number = this.targetLevel;

            if (this.targetLevel == Number.MAX_VALUE)
                this.targetLevel = target.$nestLevel;

            while (!done) {
                done = true;

                obj = <UIComponent> (this.invalidatePropertiesQueue.removeSmallestChild(target));
                while (obj) {
                    if (obj.parent) {
                        obj.validateProperties();
                    }
                    obj = <UIComponent> (this.invalidatePropertiesQueue.removeSmallestChild(target));
                }

                if (this.invalidatePropertiesQueue.isEmpty()) {
                    this.invalidatePropertiesFlag = false;
                }
                this.invalidateClientPropertiesFlag = false;

                obj = <UIComponent> (this.invalidateSizeQueue.removeLargestChild(target));
                while (obj) {
                    if (obj.parent) {
                        obj.validateSize();
                    }
                    if (this.invalidateClientPropertiesFlag) {
                        obj = <UIComponent> (this.invalidatePropertiesQueue.removeSmallestChild(target));
                        if (obj) {
                            this.invalidatePropertiesQueue.insert(obj);
                            done = false;
                            break;
                        }
                    }

                    obj = <UIComponent> (this.invalidateSizeQueue.removeLargestChild(target));
                }

                if (this.invalidateSizeQueue.isEmpty()) {
                    this.invalidateSizeFlag = false;
                }
                this.invalidateClientPropertiesFlag = false;
                this.invalidateClientSizeFlag = false;

                obj = <UIComponent> (this.invalidateDisplayListQueue.removeSmallestChild(target));
                while (obj) {
                    if (obj.parent) {
                        obj.validateDisplayList();
                    }
                    if (this.invalidateClientPropertiesFlag) {
                        obj = <UIComponent> (this.invalidatePropertiesQueue.removeSmallestChild(target));
                        if (obj) {
                            this.invalidatePropertiesQueue.insert(obj);
                            done = false;
                            break;
                        }
                    }

                    if (this.invalidateClientSizeFlag) {
                        obj = <UIComponent> (this.invalidateSizeQueue.removeLargestChild(target));
                        if (obj) {
                            this.invalidateSizeQueue.insert(obj);
                            done = false;
                            break;
                        }
                    }

                    obj = <UIComponent> (this.invalidateDisplayListQueue.removeSmallestChild(target));
                }


                if (this.invalidateDisplayListQueue.isEmpty()) {
                    this.invalidateDisplayListFlag = false;
                }
            }

            if (oldTargetLevel == Number.MAX_VALUE) {
                this.targetLevel = Number.MAX_VALUE;
            }
        }

    }


    /**
     * 显示列表嵌套深度排序队列
     */
    class DepthQueue {
        public constructor() {
        }

        /**
         * 深度队列
         */
        private depthBins:any = {};

        /**
         * 最小深度
         */
        private minDepth:number = 0;

        /**
         * 最大深度
         */
        private maxDepth:number = -1;

        /**
         * 插入一个元素
         */
        public insert(client:UIComponent):void {
            var depth:number = client.$nestLevel;
            var hashCode:number = client.$hashCode;
            if (this.maxDepth < this.minDepth) {
                this.minDepth = this.maxDepth = depth;
            }
            else {
                if (depth < this.minDepth)
                    this.minDepth = depth;
                if (depth > this.maxDepth)
                    this.maxDepth = depth;
            }

            var bin:DepthBin = this.depthBins[depth];

            if (!bin) {
                bin = this.depthBins[depth] = new DepthBin();;
                bin.items[hashCode] = client;
                bin.length++;
            }
            else {
                if (bin.items[hashCode] == null) {
                    bin.items[hashCode] = client;
                    bin.length++;
                }
            }
        }

        /**
         * 从队列尾弹出深度最大的一个对象
         */
        public pop():UIComponent {
            var client:UIComponent = null;

            if (this.minDepth <= this.maxDepth) {
                var bin:DepthBin = this.depthBins[this.maxDepth];
                while (!bin || bin.length == 0) {
                    this.maxDepth--;
                    if (this.maxDepth < this.minDepth)
                        return null;
                    bin = this.depthBins[this.maxDepth];
                }
                var items:Array<any> = bin.items;
                for (var key in items) {
                    client = <UIComponent> items[key];
                    this.remove(client, this.maxDepth);
                    break;
                }

                while (!bin || bin.length == 0) {
                    this.maxDepth--;
                    if (this.maxDepth < this.minDepth)
                        break;
                    bin = this.depthBins[this.maxDepth];
                }

            }

            return client;
        }

        /**
         * 从队列首弹出深度最小的一个对象
         */
        public shift():UIComponent {
            var client:UIComponent = null;

            if (this.minDepth <= this.maxDepth) {
                var bin:DepthBin = this.depthBins[this.minDepth];
                while (!bin || bin.length == 0) {
                    this.minDepth++;
                    if (this.minDepth > this.maxDepth)
                        return null;
                    bin = this.depthBins[this.minDepth];
                }

                var items:Array<any> = bin.items;
                for (var key in items) {
                    client = <UIComponent> items[key];
                    this.remove(client, this.minDepth);
                    break;
                }

                while (!bin || bin.length == 0) {
                    this.minDepth++;
                    if (this.minDepth > this.maxDepth)
                        break;
                    bin = this.depthBins[this.minDepth];
                }
            }

            return client;
        }

        /**
         * 移除大于等于指定组件层级的元素中最大的元素
         */
        public removeLargestChild(client:UIComponent):any {
            var max:number = this.maxDepth;
            var min:number = client.$nestLevel;
            var hashCode:number = client.$hashCode;
            while (min <= max) {
                var bin:DepthBin = this.depthBins[max];
                if (bin && bin.length > 0) {
                    if (max == client.$nestLevel) {
                        if (bin.items[hashCode]) {
                            this.remove(<UIComponent> client, max);
                            return client;
                        }
                    }
                    else {
                        var items:Array<any> = bin.items;
                        for (var key in items) {
                            var value:any = items[key];
                            if ((value instanceof DisplayObject) && (client.isType(lark.Types.DisplayObjectContainer))
                                && (<DisplayObjectContainer><any> client).contains(<DisplayObject><any> value)) {
                                this.remove(<UIComponent><any> value, max);
                                return value;
                            }
                        }
                    }

                    max--;
                }
                else {
                    if (max == this.maxDepth)
                        this.maxDepth--;
                    max--;
                    if (max < min)
                        break;
                }
            }

            return null;
        }

        /**
         * 移除大于等于指定组件层级的元素中最小的元素
         */
        public removeSmallestChild(client:UIComponent):any {
            var min:number = client.$nestLevel;
            var hashCode:number = client.$hashCode;
            while (min <= this.maxDepth) {
                var bin:DepthBin = this.depthBins[min];
                if (bin && bin.length > 0) {
                    if (min == client.$nestLevel) {
                        if (bin.items[hashCode]) {
                            this.remove(<UIComponent> client, min);
                            return client;
                        }
                    }
                    else {
                        var items:Array<any> = bin.items;
                        for (var key in items) {
                            var value = items[key];
                            if ((value instanceof DisplayObject) && (client.isType(lark.Types.DisplayObjectContainer))
                                && (<DisplayObjectContainer> <any>client).contains(<DisplayObject> <any>value)) {
                                this.remove(<UIComponent> <any>value, min);
                                return value;
                            }
                        }
                    }

                    min++;
                }
                else {
                    if (min == this.minDepth)
                        this.minDepth++;
                    min++;
                    if (min > this.maxDepth)
                        break;
                }
            }

            return null; 
        }

        /**
         * 移除一个元素
         */
        public remove(client:UIComponent, level:number = -1):UIComponent {
            var depth:number = (level >= 0) ? level : client.$nestLevel;
            var hashCode:number = client.$hashCode;
            var bin:DepthBin = this.depthBins[depth];
            if (bin && bin.items[hashCode] != null) {
                delete bin.items[hashCode];
                bin.length--;
                return client;
            }
            return null;
        }

        /**
         * 清空队列
         */
        public removeAll():void {
            this.depthBins.length = 0;
            this.minDepth = 0;
            this.maxDepth = -1;
        }

        /**
         * 队列是否为空
         */
        public isEmpty():boolean {
            return this.minDepth > this.maxDepth;
        }
    }
    /**
     * 列表项
     */
    class DepthBin {
        public length:number = 0;
        public items:any = [];
    }

    export var validator:Validator = new Validator();
}