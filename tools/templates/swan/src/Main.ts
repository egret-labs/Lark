class Main extends swan.Group {

    constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        
        // Load a theme and related EXML,then display MainGroup
        // 加载一个主题和关联的 EXML 然后显示主场景 MainGroup
        var theme = new swan.Theme(`resource/theme/blue-theme.json`, this.stage);
        // components.MainGroup is defined in src/components/MainGroup.exml
        // components.MainGroup 是在 src/components/MainGroup.exml 中定义的
        theme.on(lark.Event.COMPLETE, e=> this.addChild(new components.MainGroup()), this)
        
        this.resize();
        this.stage.on(lark.Event.RESIZE, this.resize, this);
    }

    resize() {
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
    }
}

