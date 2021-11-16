#!/usr/bin/env node
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.thread = exports.prettyConsole = exports.colorize = exports.THE_COMMAND = exports.ROOT_PATH = exports.theParams = void 0;
/// <reference path="../global.d.ts" />
var child_process_1 = require("child_process");
var cleanProject_1 = require("../src/cleanProject");
var connectDevice_1 = require("../src/connectDevice");
var envManager_1 = require("../src/envManager");
var gradleUpdate_1 = require("../src/gradleUpdate");
var incrementVersion_1 = require("../src/incrementVersion");
var installApp_1 = require("../src/installApp");
var moveApp_1 = require("../src/moveApp");
var buildRun_1 = require("../src/buildRun");
var init_1 = require("../src/init");
var emulator_1 = require("../src/emulator");
var switchGit_1 = require("../src/switchGit");
var _a = __read(process.argv), _command = _a[2], params = _a.slice(3);
var command = _command;
// else if (command === 'connect') connectDevice()
// else if (command === 'emu') runEmulator()
// else if (command === 'env') envManager()
// else if (command === 'git-switch') switchGit()
// else if (command === 'move') moveApp()
// else if (command === 'install') installApp()
// else if (command === 'gradle-update') gradleUpdate()
// else if (command === 'increment-version') incrementVersion()
// else if (command === 'build') buildRun(true)
// else if (command === 'run') buildRun()
// else if (command === 'init') init()
var defaultCommandLog = "No command '" + (command !== null && command !== void 0 ? command : '') + "' found\n\nAvailable commands: \n\n- init: generate env folder structure\n- emu: run avd with select option\n- git-switch: switch git user with select option\n- clean\n\t--platform, -p\t\t: ios | android\n- connect\n\t--target, -t\t\t: i.e. wlan0\n- env\n- move\n\t--filename, -f\t\t: i.e. new-app.apk\n- install\n\tnot maintained\n- gradle-update\n\t--type, -t\t\t: dev | prod\n- increment-version\n\t--type, -t\t\t: dev | prod\n\t--platform, -p\t\t: ios | android\n\t[configkey]\t: x | + | 0-9\n\t\te.g. VERSION_NAME: x.x.+";
exports.theParams = params.reduce(function (ret, data) {
    var _a = __read(data.split('=')), key = _a[0], value = _a.slice(1);
    ret[key] = value.join('=');
    return ret;
}, {});
exports.ROOT_PATH = process.env.PWD;
exports.THE_COMMAND = 'r-native';
var COLORS = {
    _Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
};
function colorize(color) {
    var selectedColor = COLORS[color !== null && color !== void 0 ? color : 'FgWhite'];
    return selectedColor + "%s" + COLORS._Reset;
}
exports.colorize = colorize;
function prettyConsole() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    objects.map(function (d) { return console.log(JSON.stringify(d, null, 4)); });
}
exports.prettyConsole = prettyConsole;
function thread(command) {
    return new Promise(function (resolve) {
        console.log(colorize('BgGreen'), command);
        console.log(colorize('FgCyan'), "=== Child process started command `" + command + "` ===");
        var execCommand = (0, child_process_1.spawn)(command, [], { shell: true, stdio: 'inherit' });
        execCommand.on('error', resolve);
        execCommand.on('close', function () { return resolve(true); });
    });
}
exports.thread = thread;
function execCommand() {
    return new Promise(function (resolve) {
        if (command === 'clean')
            (0, cleanProject_1["default"])();
        else if (command === 'connect')
            (0, connectDevice_1["default"])();
        else if (command === 'emu')
            (0, emulator_1["default"])();
        else if (command === 'env')
            (0, envManager_1["default"])();
        else if (command === 'git-switch')
            (0, switchGit_1["default"])();
        else if (command === 'move')
            (0, moveApp_1["default"])();
        else if (command === 'install')
            (0, installApp_1["default"])();
        else if (command === 'gradle-update')
            (0, gradleUpdate_1["default"])();
        else if (command === 'increment-version')
            (0, incrementVersion_1["default"])();
        else if (command === 'build')
            (0, buildRun_1["default"])(true);
        else if (command === 'run')
            (0, buildRun_1["default"])();
        else if (command === 'init')
            (0, init_1["default"])();
        else
            resolve(defaultCommandLog);
    });
}
execCommand().then(function (response) {
    if (typeof response === 'string') {
        console.error(response);
    }
});
