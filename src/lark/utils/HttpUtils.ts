


module lark {
    

    export function get(url: string, data: any, success ?: (response: any) => void, error ?: (error: string) => void, contentType ?: string) {

    }
        
    export function post(url: string, data: any, success ?: (response: any) => void, error ?: (error: string) => void, contentType ?: string) {

    }

    export function loadImage(url: string, success: (texture: Texture) => void) {
        new HttpClient().loadImage({
            url: url,
            success: success
        });
    }
}