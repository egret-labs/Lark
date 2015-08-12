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

    var jsonAnalyzer = JsonAnalyzer;
    var binAnalyzer = BinAnalyzer;
    var soundAnalyzer = SoundAnalyzer;
    var textAnalyzer = TextAnalyzer;
    var xmlAnalyzer = XMLAnalyzer;
    var animationAnalyzer = AnimationAnalyzer;

    /**
     * @private
     */
    export class Resource extends lark.EventEmitter{
        /**
         * 构造函数
         */
        public constructor(){
            super();
            this.init();
        }

        /**
         * 解析器字典
         */
        private analyzerMap:any = {};

        private analyzerClassMap:any = {};
        /**
         * 注册一个自定义文件类型解析器
         * @param type 文件类型字符串，例如：bin,text,image,json等。
         * @param analyzerClass 自定义解析器的类定义
         */
        public registerAnalzer(type:string, analyzerClass:any):void{
            this.analyzerClassMap[type] = analyzerClass;
        }
        /**
         * 根据type获取对应的文件解析库
         */
        $getAnalyzerByType(type:string):AnalyzerBase{
            var analyzer:AnalyzerBase = this.analyzerMap[type];
            if(!analyzer){
                var clazz = this.analyzerClassMap[type];
                if(!clazz){
                    if(DEBUG){
                        lark.$error(4002,type);
                    }
                    return null;
                }
                analyzer = this.analyzerMap[type] = new clazz();
            }
            return analyzer;
        }

        /**
         * 多文件队列加载器
         */
        private resLoader:ResourceLoader;
        /**
         * 初始化
         */
        private init():void{
            var analyzerClassMap = this.analyzerClassMap;
            analyzerClassMap[ResourceItem.TYPE_ANIMATION] = AnimationAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_BIN] = BinAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_IMAGE] = ImageAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_TEXT] = TextAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_JSON] = JsonAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_SHEET] = SheetAnalyzer;
           // analyzerClassMap[ResourceItem.TYPE_FONT] = FontAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_SOUND] = SoundAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_XML] = XMLAnalyzer;

            this.resConfig = new ResourceConfig();
            this.resLoader = new ResourceLoader(this);
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.on(ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
            this.resLoader.on(ResourceEvent.GROUP_LOAD_ERROR,this.onGroupError,this);
        }

        /**
         * 配置文件组组名
         */
        private static GROUP_CONFIG:string = "RES__CONFIG";

        private configItemList:Array<any> = [];

        private loadingConfigList:Array<any>;

        private callLaterFlag:boolean = false;
        /**
         * 配置文件加载解析完成标志
         */
        private configComplete:boolean = false;
        /**
         * 开始加载配置
		 * @method RES.loadConfig
		 * @param url {string}
		 * @param resourceRoot {string}
		 * @param type {string}
         */
        public loadConfig(url:string,resourceRoot:string,type:string="json"):void{

            var configItem:any = {url:url,resourceRoot:resourceRoot,type:type};
            this.configItemList.push(configItem);
            if(!this.callLaterFlag){
                var self = this;
                setTimeout(function():void{
                    self.startLoadConfig();
                },0);
                this.callLaterFlag = true;
            }
        }

        private startLoadConfig():void{
            this.callLaterFlag = false;
            var configList:Array<any> = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = configList;
            var length:number = configList.length;
            var itemList:Array<ResourceItem> = [];
            for(var i:number=0;i<length;i++){
                var item:any = configList[i];
                var resItem:ResourceItem = new ResourceItem(item.url,item.url,item.type);
                itemList.push(resItem);
            }
            this.resLoader.loadGroup(itemList,Resource.GROUP_CONFIG,Number.MAX_VALUE);
        }
        /**
         * 已经加载过组名列表
         */
        private loadedGroups:Array<string> = [];
        /**
         * 检查某个资源组是否已经加载完成
		 * @method RES.isGroupLoaded
		 * @param name {string}
		 * @returns {boolean}
         */
        public isGroupLoaded(name:string):boolean{
            return this.loadedGroups.indexOf(name)!=-1;
        }
        /**
         * 根据组名获取组加载项列表
		 * @method RES.getGroupByName
		 * @param name {string}
		 * @returns {Array<egret.ResourceItem>}
         */
        public getGroupByName(name:string):Array<ResourceItem>{
            return this.resConfig.getGroupByName(name);
        }

        private groupNameList:Array<any> = [];
        /**
         * 根据组名加载一组资源
		 * @method RES.loadGroup
		 * @param name {string}
		 * @param priority {number}
         */
        public loadGroup(name:string,priority:number=0):void{
            if(this.loadedGroups.indexOf(name)!=-1){
                ResourceEvent.emitResourceEvent(this,ResourceEvent.GROUP_COMPLETE,name);
                return;
            }
            if(this.resLoader.isGroupInLoading(name))
                return;
            if(this.configComplete){
                var group:Array<ResourceItem> = this.resConfig.getGroupByName(name);
                this.resLoader.loadGroup(group,name,priority);
            }
            else{
                this.groupNameList.push({name:name,priority:priority});
            }
        }
        /**
         * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
         * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
         * @method RES.ResourceConfig#createGroup
         * @param name {string} 要创建的加载资源组的组名
         * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或一个资源组名。
         * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
         * @returns {boolean}
         */
        public createGroup(name:string,keys:Array<string>,override:boolean=false):boolean{
            if(override){
                var index:number = this.loadedGroups.indexOf(name);
                if(index!=-1){
                    this.loadedGroups.splice(index,1);
                }
            }
            return this.resConfig.createGroup(name,keys,override);
        }
        /**
         * res配置数据
         */
        private resConfig:ResourceConfig;
        /**
         * 队列加载完成事件
         */
        private onGroupComp(event:ResourceEvent):void{
            if(event.groupName==Resource.GROUP_CONFIG){
                var length:number = this.loadingConfigList.length;
                for(var i:number = 0;i < length;i++){
                    var config:any = this.loadingConfigList[i];
                    var resolver:AnalyzerBase = this.$getAnalyzerByType(config.type);
                    var data:any = resolver.getRes(config.url);
                    resolver.destroyRes(config.url);
                    this.resConfig.parseConfig(data,config.resourceRoot);
                }
                this.configComplete = true;
                this.loadingConfigList = null;
                ResourceEvent.emitResourceEvent(this,ResourceEvent.CONFIG_COMPLETE);
                this.loadDelayGroups();
            }
            else{
                this.loadedGroups.push(event.groupName);
                this.emit(event);
            }

        }
        /**
         * 启动延迟的组加载
         */
        private loadDelayGroups():void{
            var groupNameList:Array<any> = this.groupNameList;
            this.groupNameList = [];
            var length:number = groupNameList.length;
            for(var i:number=0;i<length;i++){
                var item:any = groupNameList[i];
                this.loadGroup(item.name,item.priority);
            }

        }
        /**
         * 队列加载失败事件
         */
        private onGroupError(event:ResourceEvent):void{
            if(event.groupName==Resource.GROUP_CONFIG){
                this.loadingConfigList = null;
                ResourceEvent.emitResourceEvent(this,ResourceEvent.CONFIG_LOAD_ERROR);
            }
            else{
                this.emit(event);
            }
        }
        /**
         * 检查配置文件里是否含有指定的资源
		 * @method RES.hasRes
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
		 * @returns {boolean}
         */
        public hasRes(key:string):boolean{
            var type:string = this.resConfig.getType(key);
            if(type==""){
                var prefix:string = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if(type==""){
                    return false;
                }
            }
            return true;
        }
        /**
         * 运行时动态解析一个配置文件,
         * @param data {any} 配置文件数据，请参考resource.json的配置文件格式。传入对应的json对象即可。
         * @param folder {string} 加载项的路径前缀。
         */
        public parseConfig(data:any, folder:string):void {
            this.resConfig.parseConfig(data,folder);
            if(!this.configComplete&&!this.loadingConfigList){
                this.configComplete = true;
                this.loadDelayGroups();
            }
        }
        /**
         * 通过key同步获取资源
		 * @method RES.getRes
		 * @param key {string}
		 * @returns {any}
         */
        public getRes(key:string):any{
            var type:string = this.resConfig.getType(key);
            if(type==""){
                var prefix:string = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if(type==""){
                    return null;
                }
            }

            var analyzer:AnalyzerBase = this.$getAnalyzerByType(type);
            return analyzer.getRes(key);
        }

        /**
         * 异步获取资源参数缓存字典
         */
        private asyncDic:any = {};
        /**
         * 通过key异步获取资源
         * @method RES.getResAsync
         * @param key {string}
         * @param callBack {Function} 回调函数。示例：compFunc(data,url):void。
         * @param thisObject {any}
         */
        public getResAsync(key:string,callBack:Function,thisObject:any):void{
            var type:string = this.resConfig.getType(key);
            var name:string = this.resConfig.getName(key);
            if(type==""){
                name = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(name);
                if(type==""){
                    setTimeout(function():void{
                        callBack.call(thisObject);
                    },0);
                    return;
                }
            }
            var analyzer:AnalyzerBase = this.$getAnalyzerByType(type);
            var res:any = analyzer.getRes(key);
            if(res){
                setTimeout(function():void{
                    callBack.call(thisObject, res, key);
                },0);
                return;
            }
            var args:any = {key:key,compFunc:callBack,thisObject:thisObject};
            if(this.asyncDic[name]){
                this.asyncDic[name].push(args);
            }
            else{
                this.asyncDic[name] = [args];
                var resItem:ResourceItem = this.resConfig.getResourceItem(name);
                this.resLoader.loadItem(resItem);
            }
        }
        /**
         * 通过url获取资源
		 * @method RES.getResByUrl
		 * @param url {string}
		 * @param callBack {Function}
		 * @param thisObject {any}
		 * @param type {string}
         */
        public getResByUrl(url:string,callBack:Function,thisObject:any,type:string=""):void{
            if(!url){
                setTimeout(function():void{
                    callBack.call(thisObject);
                },0);
                return;
            }
            if(!type)
                type = this.getTypeByUrl(url);
            var analyzer:AnalyzerBase = this.$getAnalyzerByType(type);

            var name:string = url;
            var res:any = analyzer.getRes(name);
            if(res){
                setTimeout(function():void{
                    callBack.call(thisObject, res, url);
                },0);
                return;
            }
            var args:any = {key:name,compFunc:callBack,thisObject:thisObject};
            if(this.asyncDic[name]){
                this.asyncDic[name].push(args);
            }
            else{
                this.asyncDic[name] = [args];
                var resItem:ResourceItem = new ResourceItem(name,url,type);
                this.resLoader.loadItem(resItem);
            }
        }

        /**
         * 通过url获取文件类型
         */
        private getTypeByUrl(url:string):string{
            var suffix:string = url.substr(url.lastIndexOf(".")+1);
            if(suffix){
                suffix = suffix.toLowerCase();
            }
            var type:string;
            switch(suffix){
                case ResourceItem.TYPE_XML:
                case ResourceItem.TYPE_JSON:
                case ResourceItem.TYPE_SHEET:
                    type = suffix;
                    break;
                case "png":
                case "jpg":
                case "gif":
                case "jpeg":
                case "bmp":
                    type = ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    type = ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = ResourceItem.TYPE_SOUND;
                    break;
                default:
                    type = ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        }
        /**
         * 一个加载项加载完成
         */
        private onResourceItemComp(item:ResourceItem):void{
            var argsList:Array<any> = this.asyncDic[item.name];
            delete this.asyncDic[item.name];
            var analyzer:AnalyzerBase = this.$getAnalyzerByType(item.type);
            var length:number = argsList.length;
            for(var i:number=0;i<length;i++){
                var args:any = argsList[i];
                var res:any = analyzer.getRes(args.key);
                args.compFunc.call(args.thisObject,res,args.key);
            }
        }
        /**
         * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
		 * @method RES.destroyRes
         * @param name {string} 配置文件中加载项的name属性或资源组名
         * @param force {boolean} 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值true
		 * @returns {boolean}
         */
        public destroyRes(name:string, force:boolean = true):boolean{
            var group:Array<any> = this.resConfig.getRawGroupByName(name);
            if(group && group.length > 0){
                var index:number = this.loadedGroups.indexOf(name);
                if(index!=-1){
                    this.loadedGroups.splice(index,1);
                }
                var length:number = group.length;
                for(var i:number=0;i<length;i++){
                    var item:any = group[i];
                    if(!force && this.isResInLoadedGroup(item.name)) {

                    }
                    else {
                        item.loaded = false;
                        var analyzer:AnalyzerBase = this.$getAnalyzerByType(item.type);
                        analyzer.destroyRes(item.name);
                        this.removeLoadedGroupsByItemName(item.name);
                    }
                }
                return true;
            }
            else{
                var type:string = this.resConfig.getType(name);
                if(type=="")
                    return false;
                item = this.resConfig.getRawResourceItem(name);
                item.loaded = false;
                analyzer = this.$getAnalyzerByType(type);
                var result = analyzer.destroyRes(name);
                this.removeLoadedGroupsByItemName(item.name);
                return result;
            }
        }
        private removeLoadedGroupsByItemName(name:string):void {
            var loadedGroups:Array<string> = this.loadedGroups;
            var loadedGroupLength:number = loadedGroups.length;
            for(var i:number = 0 ; i < loadedGroupLength ; i++) {
                var group:Array<any> = this.resConfig.getRawGroupByName(loadedGroups[i]);
                var length:number = group.length;
                for(var j:number = 0 ; j < length ; j++) {
                    var item:any = group[j];
                    if(item.name == name) {
                        loadedGroups.splice(i, 1);
                        i--;
                        loadedGroupLength = loadedGroups.length;
                        break;
                    }
                }
            }
        }
        private isResInLoadedGroup(name:string):boolean {
            var loadedGroups:Array<string> = this.loadedGroups;
            var loadedGroupLength:number = loadedGroups.length;
            for(var i:number = 0 ; i < loadedGroupLength ; i++) {
                var group:Array<any> = this.resConfig.getRawGroupByName(loadedGroups[i]);
                var length:number = group.length;
                for(var j:number = 0 ; j < length ; j++) {
                    var item:any = group[j];
                    if(item.name == name) {
                        return true;
                    }
                }
            }
            return false;
        }
        /**
         * 设置最大并发加载线程数量，默认值是2.
         * @method RES.setMaxLoadingThread
         * @param thread {number} 要设置的并发加载数。
         */
        public setMaxLoadingThread(thread:number):void{
            if(thread<1){
                thread = 1;
            }
            this.resLoader.thread = thread;
        }

        /**
         * 设置资源加载失败时的重试次数。
         * @param retry 要设置的重试次数。
         */
        public setMaxRetryTimes(retry:number):void{
            retry = Math.max(retry, 0);
            this.resLoader.maxRetryTimes = retry;
        }
    }
}

