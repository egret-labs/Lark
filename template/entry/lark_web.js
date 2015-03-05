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
    var resizeTimer = null;
    var doResize = function () {
        var canvas=document.getElementById("lark_canvas");
        canvas.width = window.innerWidth;
        canvas.height =  window.innerHeight;
        resizeTimer = null;
        var cxt=canvas.getContext("2d");
        cxt.fillStyle="#009aff";
        cxt.fillRect(0,0, canvas.width, canvas.height);
        var img = new Image();
        img.src = "image/test.png";
        img.onload = function(){
            cxt.drawImage(img,(canvas.width-img.width)*0.5,(canvas.height-img.height)*0.5);
        }
    };
    window.onresize = function () {
        if (resizeTimer == null) {
            resizeTimer = setTimeout(doResize, 300);
        }
    };
    doResize();
}

var support = [].map && document.createElement("canvas").getContext;
if (support) {
    //lark_web.preloadScript(egret_file_list, "libs/");
    //lark_web.preloadScript(game_file_list, "bin-debug/src/");
    //lark_web.startLoading();
    lark_web.loadSingleScript("launcher/manifest.json",function(){
        
    });
    lark_web.start();
}
else {
    alert("Lark 不支持您当前的浏览器!")
}
