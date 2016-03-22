var path = require('path'),
    fs = require('fs-extra'),
    child_process = require('child_process'),
    gulp = require('gulp'),
    taskListing = require('gulp-task-listing'),
    confirm = require('confirm-simple'),
    download = require('./download');

var ROOT = __dirname,
    SeleniumJarPath = path.join(ROOT, 'lib', 'selenium-server-standalone.jar'),
    ChromeDriverPath = path.join(ROOT, 'lib', 'chromedriver');

function getChromeDriverUrl() {
    var platform;
    if (process.platform === 'linux') {
        platform = 'linux' + process.arch === 'x64' ? '64' : '32';
    } else if (process.platform === 'darwin') {
        platform = 'mac32';
    } else {
        platform = 'win32';
    }

    return 'https://raw.githubusercontent.com/adventure-yunfei/web-auto-test-binaries/master/chromedriver_'
        + platform
        + '/chromedriver' + (platform === 'win32' ? '.exe' : '');
}

gulp.task('prepare-binaries', function (done) {
    confirm('Download binaries will take time, do you want to continue? (You can manually download them and put into "lib" folder)', ['y', 'n'], function (ok) {
        if (!ok) {
            console.log('\nFor manually download, ensure following file names: '
                + path.basename(SeleniumJarPath) + ', '
                + path.basename(ChromeDriverPath) + '\n');
            done();
        } else {
            var seleniumOpts = {
                    url: 'https://raw.githubusercontent.com/adventure-yunfei/web-auto-test-binaries/master/selenium-server-standalone-2.49.0.jar',
                    dest: SeleniumJarPath
                },
                chromedriverOpts = {
                    url: getChromeDriverUrl(),
                    dest: ChromeDriverPath
                },
                downloadIfNotExisted = function (opts, callback) {
                    fs.access(opts.dest, function (err) {
                        if (err) {
                            download(opts, callback);
                        } else {
                            console.log(path.basename(opts.dest) + ' is already downloaded.');
                            callback && callback();
                        }
                    });
                };

            fs.ensureDirSync(path.dirname(seleniumOpts.dest));
            fs.ensureDirSync(path.dirname(chromedriverOpts.dest));
            downloadIfNotExisted(seleniumOpts, function () {
                downloadIfNotExisted(chromedriverOpts, done);
            });
        }
    });
});

gulp.task('start', function () {
    child_process.spawn('npm', ['start'], {stdio: "inherit"});
});

gulp.task('test', function () {
    child_process.spawn('npm', ['test'], {stdio: "inherit"});
});

gulp.task('help', taskListing.withFilters(function () { return false}, /default/));
gulp.task('default', ['help']);
