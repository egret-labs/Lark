/**
 * @language en_US
 * The following example uses lark.HttpRequest class network communications.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.HttpRequest 类进行网络通信。
 */
class HttpRequestExample extends lark.Sprite {

    private statusGetLabel:lark.TextField;
    private statusPostLabel:lark.TextField;

    public constructor() {
        super();
        this.sendGetRequest();
        this.sendPostRequest();
    }

    private sendGetRequest():void {
        var statusGetLabel = new lark.TextField();
        this.statusGetLabel = statusGetLabel;
        statusGetLabel.fontSize = 18;
        statusGetLabel.text = "GET request being sent to httpbin.org";
        this.addChild(statusGetLabel);
        statusGetLabel.x = 50;
        statusGetLabel.y = 40;

        var request = new lark.HttpRequest();
        request.responseType = lark.HttpResponseType.TEXT;
        request.open("http://httpbin.org/get",lark.HttpMethod.GET);
        request.send();
        request.on(lark.Event.COMPLETE,this.onGetComplete,this);
        request.on(lark.Event.IO_ERROR,this.onGetIOError,this);
        request.on(lark.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:lark.Event):void {
        var request = <lark.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
        var responseLabel = new lark.TextField();
        responseLabel.fontSize = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        this.statusGetLabel.text = "Get GET response!";
    }

    private onGetIOError(event:lark.Event):void {
        console.log("get error : " + event);
    }

    private onGetProgress(event:lark.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

    private sendPostRequest() {
        var statusPostLabel = new lark.TextField();
        this.statusPostLabel = statusPostLabel;
        this.addChild(statusPostLabel);
        statusPostLabel.fontSize = 18;
        statusPostLabel.x = 300;
        statusPostLabel.y = 40;
        statusPostLabel.text = "Sending POST request to httpbin.org";

        var request = new lark.HttpRequest();
        request.responseType = lark.HttpResponseType.TEXT;
        request.open("http://httpbin.org/post",lark.HttpMethod.POST);
        request.send();
        request.on(lark.Event.COMPLETE,this.onPostComplete,this);
        request.on(lark.Event.IO_ERROR,this.onPostIOError,this);
        request.on(lark.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }

    private onPostComplete(event:lark.Event):void {
        var request = <lark.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var responseLabel = new lark.TextField();
        responseLabel.fontSize = 18;
        responseLabel.text = "POST response:\n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 300;
        responseLabel.y = 70;
        this.statusPostLabel.text = "Get POST response!";
    }

    private onPostIOError(event:lark.Event):void {
        console.log("post error : " + event);
    }

    private onPostProgress(event:lark.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}