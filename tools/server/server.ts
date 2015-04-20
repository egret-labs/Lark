/// <reference path="../lib/types.d.ts" />


// predefine classes, else errors will occure
global.TotalJS = { Controller: {} };

var total:TotalJS.Framework = require('../lib/totaljs/');

export function start(options: { projectDir: string; port: number }) {
    options.projectDir = options.projectDir || '/public/';
    options.port = options.port || 3000;
    total.setRoot(__dirname);

    framework.config['directory-public'] = '~' + options.projectDir;
    framework.config['directory-views'] = '~' + __dirname + '/views/';
    framework.config['directory-controllers'] = '~' + __dirname + '/controllers/';

    total.http('debug', { port: options.port});

}