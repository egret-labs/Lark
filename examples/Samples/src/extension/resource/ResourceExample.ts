/**
 * @language en_US
 * The following example uses the ResourceExample class to load the resource process using the RES module.
 */
/**
 * @language zh_CN
 * 下面的示例使用 ResourceExample 类展示使用RES模块加载资源过程。
 */
class ResourceExample extends lark.Sprite {

    public constructor() {
        super();

        this.initStateText();

        //添加资源配置加载完成事件
        RES.on(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载配置
        this.trace("Star loading config");
        RES.loadConfig("resources/resource.json", "resources/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        this.trace("Load config success.");
        RES.removeListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //添加资源组加载完成事件
        RES.on(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载失败事件
        RES.on(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        //添加资源加载失败事件
        RES.on(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
        //添加资源组加载进度事件
        RES.on(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //开始加载 preload 资源组
        this.trace("Star loading preload group");
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            RES.removeListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.trace("preload group loads complete");

            this.trace("Start loading a group not exist.");
            RES.getResAsync("nothing", function (){}, this);
        }
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.trace("preload loading progress : " + event.itemsLoaded + " / " + event.itemsTotal);
        }
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        this.trace("preload group loads fail");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    private onResourceItemLoadError(event:RES.ResourceEvent):void {
        this.trace("Load resource term fail,url : " + event.resItem.url);
    }

    private stateText:lark.TextField;
    private text:string = "TestResource";

    private initStateText():void {
        this.stateText = new lark.TextField();
        this.stateText.fontSize = 22;
        this.stateText.text = this.text;
        this.stateText.width = 480;
        this.addChild(this.stateText);
    }

    private trace(msg:any):void {
        this.text = this.text + "\n" + msg;
        this.stateText.text = this.text;
        console.log(msg);
    }
}