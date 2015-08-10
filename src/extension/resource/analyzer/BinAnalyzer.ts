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


module RES {

    /**
     * @private
     */
    export class BinAnalyzer extends AnalyzerBase {
        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        /**
         * 字节流数据缓存字典
         */
        protected fileDic:any = {};
        /**
         * 加载项字典
         */
        protected resItemDic:Array<any> = [];

        /**
         * @inheritDoc
         */
        public loadFile(resItem:ResourceItem, compFunc:Function, thisObject:any):void {
            if (this.fileDic[resItem.name]) {
                compFunc.call(thisObject, resItem);
                return;
            }
            var request = this.getRequest();
            this.resItemDic[request.$hashCode] = {item: resItem, func: compFunc, thisObject: thisObject};
            request.open(resItem.url);
            request.send();
        }

        protected responseType:string = lark.HttpResponseType.ARRAY_BUFFER;
        /**
         * Loader对象池
         */
        protected recycler:lark.HttpRequest[] = [];

        /**
         * 获取一个Loader对象
         */
        private getRequest():lark.HttpRequest {
            var request = this.recycler.pop();
            if (!request) {
                request = new lark.HttpRequest();
                request.on(lark.Event.COMPLETE, this.onLoadFinish, this);
                request.on(lark.Event.IO_ERROR, this.onLoadFinish, this);
            }
            request.responseType = this.responseType;
            return request;
        }

        /**
         * 一项加载结束
         */
        protected onLoadFinish(event:lark.Event):void {
            var request = <lark.HttpRequest> (event.target);
            var data:any = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.$hashCode];
            var resItem:ResourceItem = data.item;
            var compFunc:Function = data.func;
            resItem.loaded = (event.type == lark.Event.COMPLETE);
            if (resItem.loaded) {
                this.analyzeData(resItem, request.response)
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, resItem);
        }

        /**
         * 解析并缓存加载成功的数据
         */
        protected analyzeData(resItem:ResourceItem, data:any):void {
            var name:string = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            this.fileDic[name] = data;
        }

        /**
         * @inheritDoc
         */
        public getRes(name:string):any {
            return this.fileDic[name];
        }

        /**
         * @inheritDoc
         */
        public hasRes(name:string):boolean {
            var res:any = this.getRes(name);
            return res != null;
        }

        /**
         * @inheritDoc
         */
        public destroyRes(name:string):boolean {
            if (this.fileDic[name]) {
                delete this.fileDic[name];
                return true;
            }
            return false;
        }

    }
}