//处理屏幕大小改变
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
    img.src = "test.png";
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
