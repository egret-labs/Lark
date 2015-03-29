

module lark.web {

    var ImageTextureCache: { [url: string]: Texture } = {};

    export class WebHttpClinet extends EventDispatcher implements HttpClient {

        public request(options: IHttpRequestOptions) {

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