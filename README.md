# web-auto-test

Set up a automate-testing framework for web.

# What it has?

- Auto-download selenium test server
- Auto-download chromedriver specific to current os
- Set up webdriverio js binding with basic config
- Set up mocha test framework
- Set up chai as promised as test assertion library

# How to use it?

- First `npm install` to install package (and it'll start downloading binaries (by gulp task "prepare-binaries"): selenium standalone and chromedriver).
If want to use customized binaries and avoid downloading, just copy to following path before run `npm install`:
    - `lib/selenium-server-standalone.jar` for selenium server standalone
    - `lib/chromedriver` for chromedriver

- `npm start` to start selenium server
- `npm test` to run all test cases defined under `test/`

### Use it as a npm package:

Much similar as using it directly:

- `npm install web-auto-test -g` to install and download binaries (or manually download it like mentioned before)
- Create your own webdriverio config file:

```
// your.wdio.config.js
exports.config = Object.assign(
    require('web-auto-test').config, // base config
    {
        // ... put your config here
    }
);
```

- `web-auto-test start` to start selenium server
- `web-auto-test test <webdriverio config file>` to run tests using specified config file

You may also install it as local package and config npm script to run it:

```
// package.json
{
    "scripts": {
        "start": "web-auto-test start",
        "test": "web-auto-test test"
    }
}
```

# Write test

- Refer to [webdriverio](http://webdriver.io/api.html) docs for manipulating browser
- Refer to [chai-as-promised](http://chaijs.com/plugins/chai-as-promised) and [usage in webdriverio](http://webdriver.io/guide/testrunner/frameworks.html) for test result assertion
