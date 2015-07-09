#Lark Core 编程指南 - 发送HTTP请求

发送HTTP请求主要是指服务器动态数据交互。
其特点是请求时可以加入 GET 和 POST 数据，发送给服务器，根据这些请求数据，服务器动态计算返回相应的结果。
```
var url = "http://httpbin.org/post";
var  request:lark.HttpRequest = new lark.HttpRequest();

var respHandler = function( evt:lark.Event ):void {
   switch ( evt.type ){
       case lark.Event.COMPLETE:
           var request:lark.HttpRequest = evt.currentTarget;
           console.log( "respHandler:\n", request.response );
           break;
       case lark.Event.IO_ERROR:
           console.log( "respHandler io error" );
           break;
   }
}

request.once( lark.Event.COMPLETE, respHandler, null);
request.once( lark.Event.IO_ERROR, respHandler, null);
request.open( url, lark.HttpMethod.POST );
request.send( "a=1" );
```