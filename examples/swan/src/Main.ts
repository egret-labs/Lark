declare module components{
    export class MainGroup extends swan.Group{

    }
}

class Main extends swan.Group {

    skins = [
        "components/List.exml",
        "components/TabBar.exml",
        "components/MainGroup.exml"
    ];

    constructor() {
        super();
        Loader.load(this.skins, () => this.loaded());
    }

    loaded() {
        new swan.Theme("resource/theme/green-theme.json",this.stage);

        var ui = new components.MainGroup();
        this.addChild(ui);
    }


    protected createChildren():void {
        super.createChildren();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
    }
}

class Loader {
    static load(urls: string[], callback: () => void) {

        var total = urls.length;
        var got = 0;
        var parser = new swan.sys.EXMLParser();
        urls.forEach(url => {
            var request = new lark.HttpRequest();
            request.once(lark.Event.COMPLETE, () => {
                got++;
                parser.parse(request.response);

                if (got == total)
                    callback();
            }, this);
            request.open(url);
            request.send();
        });
    }
}