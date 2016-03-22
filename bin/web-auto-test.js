#!/usr/bin/env node

/*
 * 使用方式参照 gulpfile (除了 "test" 命令)
 */

var child_process = require('child_process'),
    path = require('path');

var gulpfilePath = path.join(__dirname, '..', 'gulpfile.js');

if (process.argv[2] === 'test') {
    // gulp task and webdriverio test conficts with "cwd" setting, we should manually handle this case
    var wdioConfigFile = process.argv[3];
    if (wdioConfigFile) {
        var wdio_cli_path = path.join(__dirname, '..', 'node_modules', '.bin', 'wdio')
        child_process.spawn('node', [wdio_cli_path, wdioConfigFile], {stdio: "inherit"});
    } else {
        console.log('Usage: web-auto-test test <wdioConfigFile>');
    }
} else {
    child_process.spawn('gulp', ['--gulpfile', gulpfilePath].concat(process.argv.slice(2)), {stdio: "inherit"});
}
