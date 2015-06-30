declare module components{
    export class MainGroup extends swan.Group{

    }
}

class Main extends swan.Group {

    green_skins = [
        "components/green/ListGroup.exml",
        "components/green/TabBar.exml",
        "components/MainGroup.exml"
    ];

    blue_skins = [
        "components/blue/ListGroup.exml",
        "components/blue/TabBar.exml",
        "components/MainGroup.exml"
    ];

    constructor() {
        super();
    }

    protected createChildren():void {
        super.createChildren();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;

        var bg:swan.Image = new swan.Image();
        bg.source = "resource/assets/blackBg.png";
        bg.percentHeight = 100;
        bg.percentWidth = 100;
        this.addChild(bg);

        var label:swan.Label = new swan.Label();
        label.horizontalCenter = 0;
        label.verticalCenter = -40;
        label.text = "选择一个主题";
        label.textColor=0xFFFFFF;
        this.addChild(label);

        var themeGroup:swan.Group = new swan.Group();
        themeGroup.horizontalCenter = 0;
        themeGroup.verticalCenter = 0;
        themeGroup.layout = new swan.HorizontalLayout();
        themeGroup.on(lark.TouchEvent.TOUCH_TAP , this.touchTheme , this);
        this.addChild(themeGroup);

        var image:swan.Image = new swan.Image();
        image.name = "blue";
        image.width = 100;
        image.height = 40;
        image.source = "resource/assets/blue/Panel/header.png";
        themeGroup.addChild(image);

        var image2:swan.Image = new swan.Image();
        image2.name = "green";
        image2.width = 100;
        image2.height = 40;
        image2.source = "resource/assets/green/Panel/header.png";
        themeGroup.addChild(image2);

    }

    private themeName:string;
    private touchTheme(event:lark.TouchEvent):void
    {
        if(event.target.name)
        {
            var name = event.target.name;
            this.themeName = name;
            var skins = [
                "components/"+name+"/ListGroup.exml",
                "components/"+name+"/TabBar.exml",
                "components/CloseButton.exml",
                "components/CancelButton.exml"
            ];


            Loader.load(skins, () => {
                Loader.load(["components/MainGroup.exml"], () => this.loaded());
            });
        }
    }

    loaded() {
        new swan.Theme("resource/theme/"+this.themeName+"-theme.json",this.stage);
        this.removeChildren();
        var ui = new components.MainGroup();
        this.addChild(ui);
    }
}

class Loader {
    static load(urls: string[], callback: () => void) {

        var total = urls.length;
        var got = 0;
        urls.forEach(url => {
            EXML.load(url,()=>{
                got++;
                if (got == total)
                    callback();
            },this)
        });
    }
}