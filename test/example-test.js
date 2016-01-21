describe('example test suite', function () {
    it('first example test', function () {
        return browser
            .url('http://www.baidu.com').getTitle().should.eventually.be.equal('百度一下，你就知道')
            .getText('#index-bn').should.eventually.be.equal('百度一下');
    });
});
