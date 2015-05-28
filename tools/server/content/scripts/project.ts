/// <reference path="../../../lib/types.d.ts" />
/// <reference path="libs/angular.d.ts" />
/// <reference path="utils.ts" />

module lark {
    export interface LarkModule{
        checked?: boolean;
    }
    export interface LarkPlatform{
        checked?: boolean;
    }
}

module lark.portal {

    export var project: lark.ILarkProject;

    export class Project implements lark.ILarkProject {
        larkManifest = lark.manifest;
        name = project.name;
        scaleModes = [{
            name: 'noScale',
            description: 'Keep the original resolution of the device, will hide the parts out of the screen.'
        }, {
            name: 'showAll',
            description: 'Scale to display all contents'
        }];

        larkVersion: string = project.larkVersion;
        version: string = project.version;
        entry: string = project.entry;
        modules: lark.LarkModule[] = project.modules || [];
        platforms: { name: string }[] = project.platforms || [];
        port: number = project.port; 
        host: string = project.host; 
        ip: string = project.ip;
        startupHtml: string = project.startupHtml;
        scaleMode: string = project.scaleMode; 
        contentWidth: number = project.contentWidth;
        contentHeight: number = project.contentHeight;
        showPaintRects: boolean = project.showPaintRects;
        template: string = "empty";

        constructor() {
            this.larkManifest.modules.forEach(lm=> {
                if (lm.name == 'lark')
                    lm.checked = true;
                this.modules.forEach(m=> {
                    if (lm.name == m.name)
                        lm.checked = true;
                });
            });
            this.larkManifest.platforms.forEach(lm=> {
                if (lm.name == 'html5')
                    lm.checked = true;
                this.platforms.forEach(m=> {
                    if (lm.name == m.name)
                        lm.checked = true;
                });
            });
        }

        finish() {
            var manifest = this.larkManifest;
            this.modules = manifest.modules.filter(m=> m.checked).map(m=> { return { name: m.name }; });
            this.platforms = manifest.platforms.filter(p=> p.checked).map(p=> { return { name: p.name }; });
            this.larkManifest = undefined;
            var json = JSON.stringify(this);
            console.log(json);
            $.get('', { proj: json }, function () {
                location.href = "/$/";
            });

            $('#console').addClass('active');

            this.larkManifest = manifest;
        }
    }
}


lark.app.controller('ProjectController', lark.portal.Project);
