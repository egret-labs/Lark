class Main extends swan.UILayer {

    protected createChildren(): void {
        super.createChildren();
        
        var theme = new swan.Theme(`resource/default.thm.json`, this.stage);
        
        var button = new swan.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.on(lark.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
    }
    
    private onButtonClick(e:lark.TouchEvent) { 
        var panel = new swan.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}

