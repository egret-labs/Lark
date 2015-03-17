lark_web = {};

lark_web.prefix = "";

lark_web.loadScript = function (list, callBack) {
    var loaded = 0;
    var loadNext = function () {
        lark_web.loadSingleScript(lark_web.prefix + list[loaded], function () {
            loaded++;
            if (loaded >= list.length) {
                callBack();
            }
            else {
                loadNext();
            }
        })
    };
    loadNext();
};

lark_web.loadSingleScript = function (src, callBack) {
    var s = document.createElement('script');
    if (s.hasOwnProperty("async")) {
        s.async = false;
    }
    s.src = src;
    s.addEventListener('load', function () {
        this.removeEventListener('load', arguments.callee, false);
        callBack();
    }, false);
    document.body.appendChild(s);
};

lark_web.preloadScript = function (list, prefix) {
    if (!lark_web.preloadList) {
        lark_web.preloadList = [];
    }
    lark_web.preloadList = lark_web.preloadList.concat(list.map(function (item) {
        return prefix + item;
    }))
};

lark_web.startLoading = function () {
    var list = lark_web.preloadList;
    lark_web.loadScript(list, lark_web.start);
};

lark_web.start = function(){
    var canvas=document.getElementById("lark_canvas");
    var canvasContext = new lark.player.CanvasContext(canvas);
    var player = new lark.player.Player(canvasContext,lark_entry_class_name);
    player.start();
}

var support = [].map && document.createElement("canvas").getContext;
if (support) {
    lark_web.preloadScript(lark_file_list, "");
    lark_web.startLoading();
}
else {
    alert("Lark 不支持您当前的浏览器!")
}
