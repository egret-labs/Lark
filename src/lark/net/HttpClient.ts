

module lark {

    export interface IHttpRequestOptions {
        method?: string;
        url: string;
        data?: any;
        success?: (response: any) => void;
        error?: (response: any) => void;
        contentType?: string;
    }

    export interface IImageRequestOptions extends IHttpRequestOptions {
        success: (texture: Texture) => void;
    }

    export interface HttpClient extends EventDispatcher {
        request(options: IHttpRequestOptions);
        loadImage(options: IImageRequestOptions);
    }

    export var HttpClient: { new (): HttpClient }
}