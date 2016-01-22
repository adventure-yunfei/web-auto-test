# web-auto-test

Set up a automate-testing framework for web.

# What it has?

- Auto-download selenium test server
- Auto-download chromedriver specific to current os
- Set up webdriverio js binding with basic config
- Set up mocha test framework
- Set up chai as promised as test assertion library

# How to use it?

1. First `npm install` to install package (and it'll start downloading binaries: selenium standalone and chromedriver).
If want to use customized binaries and avoid downloading, just copy to following path before run `npm install`:
    - `lib/selenium-server-standalone.jar` for selenium server standalone
    - `lib/chromedriver` for chromedriver

2. `npm start` to start selenium server
3. (On another terminal) `npm test` to run all test cases defined under `test/`

# Write test

- Refer to [webdriverio](http://webdriver.io/api.html) docs for manipulating browser
- Refer to [chai-as-promised](http://chaijs.com/plugins/chai-as-promised) and [usage in webdriverio](http://webdriver.io/guide/testrunner/frameworks.html) for test result assertion
