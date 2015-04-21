/// <reference path="../lib/types.d.ts" />


global.TotalJS = { Controller: {} };

import http = require('http');
var total: TotalJS.Framework = require('../lib/totaljs/');






export function startServer(options: lark.ICompileOptions) {

    options.projectDir = options.projectDir || '/public/';
    options.port = options.port || 3000;
    total.setRoot(__dirname);
    console.log('server root', __dirname);
    framework.config['directory-public'] = '~' + options.projectDir;
    framework.config['directory-views'] = '~' + __dirname + '/views/';
    framework.config['directory-controllers'] = '~' + __dirname + '/controllers/';

    total.http('debug', { port: options.port });
}
