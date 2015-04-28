//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

/// <reference path="../lib/types.d.ts" />

import Action = require('./Action');
import Properties = require('./Properties');
import FileUtil = require("../lib/FileUtil");

class Build extends Action {

    public run() {
        var exitCode = 0;
        console.log('Build Start');
        this.clean(this.options.debugDir);

        if (this.options.includeLark)
            exitCode = this.buildLark();

        this.copyDirectory(this.options.templateDir, this.options.debugDir);

        var compileResult = this.buildProject();

        this.compileTemplates(compileResult.files);

        exitCode = compileResult.exitCode;
        console.log('Build End');
        return exitCode;
    }

    public compileTemplates(projectFiles:string[]) {
        var larkFilesJson = FileUtil.joinPath(this.options.srcDir, 'lark/lark.json');
        var json = FileUtil.read(larkFilesJson);
        var lark = JSON.parse(json);
        var files: string[] = lark.files;

        var templateFile = FileUtil.joinPath(this.options.templateDir, this.options.projectProperties.startupHtml);
        var content = FileUtil.read(templateFile);
        var larkScripts = files.map(f=> ['<script src="', f, '"></script>'].join('')).join('\r\n');
        var projectScripts = projectFiles.map(f=> ['<script src="', f, '"></script>'].join('')).join('\r\n');

        content = content.replace('<script id="lark"></script>', larkScripts);
        content = content.replace('<script id="project"></script>', projectScripts);
        var outputFile = FileUtil.joinPath(this.options.debugDir, this.options.projectProperties.startupHtml);
        FileUtil.save(outputFile, content);
    }
}

export = Build;