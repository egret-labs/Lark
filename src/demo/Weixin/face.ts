declare var $;
module demo {
    export class Face {
        static detect(url: string,callback:(texture:lark.Texture)=>void) {
            var image = new Image();
            image.onload = () => {
                $(image).faceDetection({
                    complete: function (faces: any[]) {

                        if (faces.length) {
                            var face = faces[0];

                            var texture = new lark.Texture();
                            texture.$setBitmapData(image);
                            texture.$bitmapX = face.offsetX;
                            texture.$bitmapY = face.offsetY;
                            texture.$bitmapWidth = face.width;
                            texture.$bitmapHeight = face.height;
                            texture.$height = face.height;
                            texture.$width = face.width;
                            callback(texture);
                        }
                    }
                });
            }
            image.src = url;
        }
    }
}