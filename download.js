var fs = require('fs'),
    https = require('https'),
    path = require('path'),
    ProgressBar = require('progress');

/**@param {{url, dest}} options*/
module.exports = function download(options, callback) {
    var url = options.url,
        dest = options.dest,
        name = path.basename(dest);

    var req = https.request(url),
        out = fs.createWriteStream(dest);

    req.on('response', function (res) {

        var len = parseInt(res.headers['content-length'], 10);

        console.log();
        var bar = new ProgressBar('downloading ' + name + ': [:bar] :percent :etas', {
            complete: '=',
            incomplete: '-',
            width: 30,
            total: len
        });

        res.on('data', function (chunk) {
            bar.tick(chunk.length);
        });

        res.on('end', function () {
            console.log('\n');
            callback && callback();
        });

        res.pipe(out);
    });

    req.end();
};
