

class Loader extends lark.EventEmitter{
    images:{ [url:string]:lark.BitmapData } = {};
    private resCount = 0;
    loadImages(urls:string[]){
        this.resCount = urls.length;
        urls.forEach(url=>{
            var loader = new lark.ImageLoader();
            var finishHandler = e=>{
                this.images[url] = loader.data;
                if(this.resCount == Object.keys(this.images).length)
                    this.emitWith(lark.Event.COMPLETE);
            };
            loader.once(lark.Event.COMPLETE,finishHandler,this);
            loader.once(lark.Event.IO_ERROR,finishHandler,this);
            loader.load(url);
        });
    }
}