class Main extends swan.Component {

    btnBlue: swan.Button;
    btnGreen: swan.Button;

    constructor() {
        super();
        this.skinName = "skins/MainSkin.exml";
        this.on(lark.Event.COMPLETE, this.onCompleted, this);
    }

    protected onCompleted(): void {

        this.btnBlue.on(lark.TouchEvent.TOUCH_TAP, e=> this.loadTheme("blue"), this);
        this.btnGreen.on(lark.TouchEvent.TOUCH_TAP, e=> this.loadTheme("green"), this);

        this.resize();
        this.stage.on(lark.Event.RESIZE, this.resize, this);
    }

    private loadTheme(name: string): void {
        var theme = new swan.Theme(`resource/theme/${name}-theme.json`, this.stage);
        theme.on(lark.Event.COMPLETE, e=> this.addChild(new components.MainGroup()), this)
    }

    resize() {
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
    }
}

