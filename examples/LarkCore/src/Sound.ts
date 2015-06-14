
class Sound extends lark.Sprite{
    sound: lark.Sound;
    channel: lark.SoundChannel;
    constructor() {
        super();
        var title = new lark.TextField("Sound");
        title.y = 50;
        title.x = 50;
        this.addChild(title);
        
        var sound = new lark.Sound("resources/sound_go.mp3");
        sound.on(lark.Event.COMPLETE,this.onLoaded,this);
        sound.load();
        this.sound = sound;
    }
    
    private onLoaded(){
        
        var play = new Button("Play");
        play.x = 50;
        play.y = 100;
        play.on(lark.TouchEvent.TOUCH_END,()=>{
            var r = this.play();
            console.log(r);
            return r;
        },this);
        this.addChild(play);
        
        var stop = new Button("Stop");
        stop.x = 300;
        stop.y = 100;
        stop.on(lark.TouchEvent.TOUCH_END,this.stop,this);
        this.addChild(stop);
        
    }
    
    private play(){
        this.stop();
        this.channel = this.sound.play();
        return false;
    }
    private stop(){
        if(this.channel){
            this.channel.stop();
            this.channel = null;
        }
    }
}

class Button extends lark.Sprite {
    private label:lark.TextField = new lark.TextField();
	constructor(text?:string){
        super();
        this.label.text = text;
        var imageLoader = new lark.ImageLoader();
        imageLoader.once(lark.Event.COMPLETE,e=>this.onLoaded(imageLoader.data),this);
        imageLoader.load( "resources/button.png");
    }
    
    
    public get text(){
        return  this.label.text;
    }
    public set text(value:string){
        this.label.text = value;
    }
    
    private onLoaded(image:lark.BitmapData){
        var btnBackground = new lark.Bitmap(image);
        btnBackground.scaleX = 0.5;
        btnBackground.scaleY = 0.5;
        this.label.width = btnBackground.width;
        this.label.height = btnBackground.height;
        this.label.textAlign = lark.HorizontalAlign.CENTER;
        this.label.verticalAlign = lark.VerticalAlign.MIDDLE;
        this.addChild(btnBackground);
        this.addChild(this.label);
        this.on(lark.TouchEvent.TOUCH_BEGIN,()=>{
            btnBackground.alpha = 0.7;
            console.log("TOUCH_BEGIN",btnBackground.alpha);
        },this);
        this.on(lark.TouchEvent.TOUCH_END,()=>{
            btnBackground.alpha = 1;
            console.log("TOUCH_END",btnBackground.alpha);
        },this);
    }
}