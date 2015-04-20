

module lark.web {

    var ImageCache: { [url: string]: BitmapData } = {};

    export class WebHttpClinet extends EventEmitter implements HttpClient {

        public request(options: IHttpRequestOptions) {
            //todo: post
            var request = new XMLHttpRequest();
            request.open(options.method || "GET", options.url, true);
            request.responseType = options.contentType;
            var success = options.success;
            var error = options.error;
            if (success)
                request.onload = e=> success(request.response);
            if (error)
                request.onerror = e => error(e.error);
            request.send();
        }

        loadImage(options: IImageRequestOptions) {
            var url = options.url;
            var callback = options.success;

            if (url in ImageCache) {
                var bitmapData = ImageCache[url];
                callback(bitmapData);
                return;
            }

            var image = new Image();
            image.onload = () => {
                callback(image);
            };
            image.src = url;
        } 
    }
    HttpClient = WebHttpClinet;
}