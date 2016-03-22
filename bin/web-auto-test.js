#!/usr/bin/env node

var child_process = require('child_process');
child_process.spawn('gulp', process.argv.slice(2), {stdio: "inherit"});
