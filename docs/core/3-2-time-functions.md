#Lark Core 编程指南 - 使用计时函数

| 函数              | 描述                                   |
| -----------------|-------------------------------------- |
| lark.getTimer()  | 返回自 Lark 框架初始化以来经过的毫秒数      |
| lark.startTick() | 在设备刷新屏幕前运行函数，每秒大约触发60次   |
| lark.stopTick()  | 取消指定的 lark.startTick() 调用。       |
| setInterval()    | 以指定的间隔（以毫秒为单位）运行函数。       |
| clearInterval()  | 取消指定的 setInterval() 调用。          |
| setTimeout()     | 在指定的延迟（以毫秒为单位）后运行指定的函数。|
| clearTimeout()   | 取消指定的 setTimeout() 调用。           |

##获取准确时间戳

使用lark.getTimer()可以获得一个当前绝对时间戳，表示从Lark框架初始化以来经过的毫秒数，通常我们使用两个时间戳的差值来计算代码的执行时间。

下列代码展示了如何计算一段循环代码的执行时间：

```
// 记录起始的时间戳
var time = lark.getTimer();
for(var i=0;i<1000000;i++){
    if(isNaN(5)){
        
    }
}
lark.log((lark.getTimer()-time)+"ms");
```
以上代码最终会在控制台输出具体执行时间长度，若输出为：16ms，表示指定的for循环代码块共执行了16毫秒。

另外，通常 lark.getTimer() 还用于解决计时器回调时间间隔不准确的问题。要注意：任何计时器的回调时间都不是绝对准确的，因为有可能受到逻辑代码执行的影响而延后，尤其是当您将时间间隔设置的非常短时。为了避免时间不准确，通常可以在每次回调触发时，使用 lark.getTimer() 来记录下当前准确的时间戳，从而根据两次时间戳计算出准确的时间间隔。

##循环多次运行函数

lark.startTick() 与 setInterval() 都能够以一定时间间隔循环触发指定的函数，区别是前者的时间间隔无法指定，它通常以每秒60次的固定频率运行指定函数，且运行函数的时刻是在设备即将刷新屏幕前。此函数通常用于编写缓动动画，能够获得更加流畅的缓动效果。而 setInterval() 函数能够以您指定的时间间隔去运行回调函数，理论上您可以设置时间间隔为16.6ms也能达到lark.startTick()相同的回调频率，但是setInterval()并不能保证回调时刻正好是在设备刷新屏幕前，因此 setInterval() 函数更合适执行纯逻辑代码。这两个函数一旦被调用，回调函数将会不间断持续运行，您可以分别使用lark.stopTick()和clearInterval() 函数来停止回调触发。

下列代码演示了调用 setInterval() 函数来设置每隔1秒执行一次回调函数，并在5秒后停止回调：

```
var intervalID = setInterval(onTick,1000);

var count = 0;
function onTick(){
    count++;
    if(count>5){
    	// 停止触发回调
        clearInterval(intervalID);
    }
    else{
        lark.log("每隔1秒执行");
    }    
}

```

##延迟一次运行函数

setTimeout()函数能够根据您指定的时间长度延迟执行回调函数。与setInterval()有区别的是它只回调一次。以下代码演示了如何延迟执行一个函数：

```
setTimeout(delayCall,5000);

function delayCall():void{
    lark.log("延迟5秒执行");
}
```
执行以上代码，您将会在5秒后才看到控制台输出：延迟5秒执行