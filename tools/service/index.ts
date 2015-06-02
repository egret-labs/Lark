import url = require('url');
import http = require('http');
import Project = require('./project');
import file = require('../lib/FileUtil');
import childProcess = require('child_process');



var LARK_SERVICE_PORT = 51598;
//Lark version, use to shutdown if the version is different to the value passed by the build command
var version = process.argv[2];
var projects = {};
var serviceCreated = false;








/**
* Start Lark Service
*/
export function run() {
    http.createServer(function (req, res) {
        console.log(req.url);
        var task = parseRequest(req);
        if (task.command == 'shutdown' || task.version && task.version != version) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("{}");
            process.exit(0);
        }
        console.log("req:",task);

        if (task.command == 'init') {
            var proj: Project = projects[task.path];
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            proj.buildPort = res;
            setInterval(() => res.write("{}"), 15000);
        }
        else if (task.command == 'buildResult') {
            var proj: Project = projects[task.path];
            proj.onBuildServiceMessage(<lark.ServiceCommandResult>task);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("");
        }
        else {
            handleBuildTask(task, res);
        }


    }).listen(LARK_SERVICE_PORT, '127.0.0.1');
}


/**
*  Send command to Lark Service
*/
export function execCommand(command :lark.ServiceCommand, callback?: Function,startServer = true):http.ClientRequest {
    var options = lark.options;
    var requestUrl = getServiceURL(command);
    var commandRequest = http.get(requestUrl, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (text) {
            try {
                var cmd: lark.ServiceCommandResult = JSON.parse(text);
            }
            catch (e) {
                cmd = { exitCode: 0, messages: [], command: "build" };
            }
            callback && callback(cmd);
        });
    });
    commandRequest.once('error', function (e) {
        if (!startServer)
            return;
        if (!serviceCreated) {
            startBackgroundService();
        }
        setTimeout(() => execCommand(command, callback), 200);
    });
    commandRequest.setTimeout(100);
    return commandRequest;
}


function handleBuildTask(info:lark.ServiceCommand,currentRes:http.ServerResponse) {
    var project: Project;
    if (!projects[info.path]) {
        project = new Project();
        project.path = info.path;
        project.init();
        projects[info.path] = project;
    }
    project = projects[info.path];
    project.fileChanged();
    var res = project.penddingRequest;
    if (res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ command: "build", exitCode: 0 }));
    }
    project.penddingRequest = currentRes;
}



function startBackgroundService() {
    serviceCreated = true;
    var options = lark.options;
    var nodePath = process.execPath,
        service = file.joinPath(options.larkRoot, 'tools/bin/lark');
    var startupParams = ['--expose-gc', service, 'service'];
    var server = childProcess.spawn(nodePath, startupParams, {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
        cwd: process.cwd(),
        silent: true
    });

    server.on("exit", () => serviceCreated = false);
}

function parseRequest(req: http.ServerRequest):lark.ServiceCommand {
    var uri = url.parse(req.url, true);
    var command = uri.query.q;
    return JSON.parse(command) || {};
}

function getServiceURL(params: any) {
    var json = JSON.stringify(params);
    return "http://127.0.0.1:" + LARK_SERVICE_PORT + "/?q=" + encodeURIComponent(json);
}
/// <reference path="../lib/types.d.ts" />