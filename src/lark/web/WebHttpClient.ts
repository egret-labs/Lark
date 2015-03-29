

module lark.web {

    var ImageTextureCache: { [url: string]: Texture } = {};

    export class WebHttpClinet extends EventDispatcher implements HttpClient {

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

            if (url in ImageTextureCache) {
                var texture = ImageTextureCache[url];
                callback(texture);
                return;
            }

            var image = new Image();
            image.onload = () => {
                var texture = new Texture(image);
                callback(texture);
            };
            image.src = url;
        }
    }
}