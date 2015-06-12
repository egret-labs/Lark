
class Tween<T extends lark.DisplayObject> {
    static get<T extends lark.DisplayObject>(displayObject:T):Tween<T>{

        return new Tween(displayObject);
    }
    private displayObject:T;
    private steps:TweenStep[] = [];
    private currentStep:TweenStep;
    private ease:Function;
    private propsFrom:any;
    private propsTo:any;
    private startTime:number;
    private timer:lark.Timer;
    private duration:number;
    private callback:Function;
    constructor(displayObject:T){
        this.displayObject = displayObject;
        this.timer = new lark.Timer(15);
        this.timer.on(lark.TimerEvent.TIMER,this.onStep,this);
    }

    to(props:any,duration:number,ease:Function):Tween<T>{
        var step = {
            props:props,
            duration:duration,
            ease:ease
        };
        this.steps.push(step);
        this.timer.start();
        return this;
    }

    call(callback:Function){
        this.callback = callback;
    }

    private startStep(){
        var step = this.steps.shift();
        if(!step) {
            this.timer.stop();
            this.callback && this.callback();
            return;
        }
        this.currentStep = step;
        this.ease=step.ease;
        this.propsTo = step.props;
        this.duration = step.duration;
        this.startTime = Date.now();
        var propsFrom = {};
        for(var p in step.props){
            propsFrom[p] = this.displayObject[p];
        }
        this.propsFrom = propsFrom;
    }

    private onStep(){
        if(this.currentStep==null)
            this.startStep();
        var time = Date.now();
        var escaped = time - this.startTime;
        if(escaped>this.duration){
            this.startStep();
            return;
        }
        var rate = escaped / this.duration;
        rate = this.ease(rate);

        for(var p in this.propsTo){
            var value = (this.propsTo[p] - this.propsFrom[p]) * rate + this.propsFrom[p];
            this.displayObject[p] = value;
        }
    }
}

interface TweenStep {
    props:any;
    duration:number;
    ease:Function;
}