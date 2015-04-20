


module lark {
    

    export function get(url: string, data: any, success ?: (response: any) => void, error ?: (error: string) => void, contentType ?: string) {
        new HttpClient().request({
            url: url,
            method: "GET",
            data:data,
            success: success,
            error: error,
            contentType: contentType
        });
    }
        
    export function post(url: string, data: any, success ?: (response: any) => void, error ?: (error: string) => void, contentType ?: string) {

    }

    export function loadImage(url: string, success: (bitmapData: BitmapData) => void) {
        new HttpClient().loadImage({
            url: url,
            success: success
        });
    }
}