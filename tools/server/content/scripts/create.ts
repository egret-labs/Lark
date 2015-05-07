/// <reference path="../../../lib/types.d.ts" />
/// <reference path="utils.ts" />

module lark {
    export interface ILarkModule{
        checked: boolean;
    }
}

module lark.portal {


    export class Create implements lark.ILarkProperties {
        larkManifest = larkManifest;
        scaleModes = ['noScale', 'showAll'];

        larkVersion: string = larkManifest.version;
        version: string = '1.0.0';
        entry: string = 'Main';
        modules: lark.ILarkModule[] = [];
        port: number = Math.ceil(Math.random() * 50000 + 3000);
        host: string = 'localhost';
        ip: string = '0.0.0.0';
        startupHtml: string = 'index.html';
        scaleMode: string = 'noScale';
        contentWidth: number = 480;
        contentHeight: number = 800;
        showPaintRects: boolean = false;
        keepLarkInSeparatedFiles: boolean = false;


        template: string;

        selectTemplate(name:string) {
            this.template = name;
        }

        selectScaleMode() {

        }

        finish() {
            console.log(this);
        }
    }
}

angular.module('larkPortal', [])
    .controller('CreateController', lark.portal.Create);



var larkManifest = {
    "version": "0.0.1.0",
    "modules": [
        {
            "name": "core",
            "description": "Lark Framework Core",
            "files": [
                "src/Defines.ts",
                "src/lark/utils/LarkObject.ts",
                "src/lark/utils/registerType.ts",
                "src/lark/i18n/zh_CN.ts",
                "src/lark/utils/getDefinitionByName.ts",
                "src/lark/utils/getTimer.ts",
                "src/lark/utils/tr.ts",
                "src/lark/utils/NONE.ts",
                "src/lark/geom/Matrix.ts",
                "src/lark/geom/Point.ts",
                "src/lark/geom/Rectangle.ts",
                "src/lark/events/EventPhase.ts",
                "src/lark/events/Event.ts",
                "src/lark/events/EventEmitter.ts",
                "src/lark/utils/Timer.ts",
                "src/lark/events/ProgressEvent.ts",
                "src/lark/events/TimerEvent.ts",
                "src/lark/events/TouchEvent.ts",
                "src/lark/system/Capabilities.ts",
                "src/lark/web/WebCapability.ts",
                "src/lark/display/BlendMode.ts",
                "src/lark/display/DisplayObject.ts",
                "src/lark/display/Sprite.ts",
                "src/lark/display/Bitmap.ts",
                "src/lark/display/Stage.ts",
                "src/lark/display/Graphics.ts",
                "src/lark/display/Shape.ts",
                "src/lark/player/Region.ts",
                "src/lark/player/DirtyRegion.ts",
                "src/lark/player/ScaleMode.ts",
                "src/lark/player/ScreenAdapter.ts",
                "src/lark/player/DisplayList.ts",
                "src/lark/player/Ticker.ts",
                "src/lark/player/Player.ts",
                "src/lark/player/TouchHandler.ts",
                "src/lark/text/TextMeasurer.ts",
                "src/lark/web/WebHttpRequest.ts",
                "src/lark/web/WebImageLoader.ts",
                "src/lark/web/WebScreen.ts",
                "src/lark/web/WebTouchHandler.ts",
                "src/lark/web/CanvasFactory.ts",
                "src/lark/web/LarkWeb.ts",
                "src/lark/text/TextField.ts",
                "src/lark/text/HorizontalAlign.ts",
                "src/lark/text/VerticalAlign.ts"
            ],
            "dependencies": []
        },
        {
            "name": "gui",
            "description": "Lark GUI Framework",
            "files": [
                "src/extension/gui/Types.ts",
                "src/extension/gui/i18n/zh_CN.ts",
                "src/extension/gui/utils/MatrixUtil.ts",
                "src/extension/gui/core/UIComponent.ts",
                "src/extension/gui/core/validator.ts",
                "src/extension/gui/components/Label.ts",
                "src/extension/gui/components/Group.ts",
                "src/extension/gui/components/SkinnableComponent.ts",
                "src/extension/gui/events/UIEvent.ts",
                "src/extension/gui/layouts/supportClasses/LayoutBase.ts",
                "src/extension/gui/layouts/BasicLayout.ts"
            ],
            "dependencies": [
                "core"
            ]
        },
        {
            "name": "texture",
            "description": "Texture for Lark",
            "files": [
                "src/extension/image/Texture.ts"
            ],
            "dependencies": [
                "core"
            ]
        },
        {
            "name": "video",
            "description": "Play Video in Lark Projects",
            "files": [
                "src/extension/media/Media.ts",
                "src/extension/media/WebMedia.ts",
                "src/extension/media/Video.ts",
                "src/extension/media/web/Video.ts"
            ],
            "dependencies": [
                "core"
            ]
        }
    ],
    "templates": [
        {
            "name": "Empty",
            "description": "Empty Lark Project",
            "dir":"templates/empty/"
        },
        {
            "name": "Example",
            "description": "Lark Project Examples",
            "dir": "templates/example/"
        }
    ],
    "platforms": [
        {
            "name": "HTML5",
            "description": "Run in browser and render with Canvas."
        },
        {
            "name": "iOS",
            "description": "Include tools to create iOS apps"
        },
        {
            "name": "Android",
            "description": "Include tools to create Android apps"
        },
        {
            "name": "Windows",
            "description": "Include tools to create Windows apps"
        }
    ]
};