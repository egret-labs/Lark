import url = require('url');
import http = require('http');
import Project = require('./project');



var LARK_SERVICE_PORT = 51598;
var projects = {};








http.createServer(function (req, res) {


    var uri = url.parse(req.url,true);
    var info: TaskInfo = uri.query;
    console.log(info);
    if (info.init) {
        var proj: Project = projects[info.path];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        proj.buildPort = res;
        setInterval(() => res.write("{}"), 15000);
    }
    else if (info.command) {
        var proj: Project = projects[info.path];
        proj.onBuildServiceMessage(info.command);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("");
    }
    else {
        handleBuildTask(info, res);
    }


}).listen(LARK_SERVICE_PORT, '127.0.0.1');


interface TaskInfo {
    path?: string;
    fileName?: string;
    changeType?: string;
    init: boolean;
    command: string;
}

function handleBuildTask(info:TaskInfo,currentRes:http.ServerResponse) {
    var project: Project;
    if (!projects[info.path]) {
        project = new Project();
        project.path = info.path;
        project.init();
        projects[info.path] = project;
    }
    project = projects[info.path];
    project.fileChanged(info.fileName, info.changeType);
    var res = project.penddingRequest;
    if (res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ command: "build", exitCode: 0 }));
    }
    project.penddingRequest = currentRes;
}

/// <reference path="../lib/types.d.ts" />