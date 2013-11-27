describe('myModule', function() {

  beforeEach(function() {
    this.myModule = require('../../src/my-module');
    this.factoryApi = Object.keys(this.myModule).sort().join(',');
  });

  describe('factory', function() {

    it('should expose the expected api', function() {
      expect(this.factoryApi).toEqual('create');
    });

  });

  describe('create', function() {

    describe('when invoked with no arguments', function() {

      beforeEach(function() {
        this.instance = this.myModule.create();
      });

      it('should return an instance of our module', function() {
        expect(this.instance).toBeObject();
      });

    });

    describe('when invoked with a mock WebPage', function() {

      beforeEach(function() {
        this.mockWebPage = {};
        this.instance = this.myModule.create(this.mockWebPage);
      });

      it('should return an instance of our module', function() {
        expect(this.instance).toBeObject();
      });

    });

    describe('instances', function() {

      beforeEach(function() {
        this.instance = this.myModule.create();
        this.instanceApi = Object.keys(this.instance).sort().join(',');
      });

      it('should expose the expected api', function() {
        expect(this.instanceApi).toEqual('goToUrl');
      });

      describe('goToUrl', function() {

        beforeEach(function() {
          var suite = this;
          suite.mockWebPage = {
            create: function() {}
          };
          suite.mockPage = {
            open: function() {}
          };
          spyOn(suite.mockWebPage, 'create').andReturn(suite.mockPage);
          spyOn(suite.mockPage, 'open').andCallFake(function(url, done) {
            done(suite.mockPage);
          });
          suite.instance = suite.myModule.create(suite.mockWebPage);
        });

        describe('when invoked with a url and callback', function() {

          beforeEach(function() {

            runs(function() {

              var suite = this;

              suite.page = 'foo';
              suite.onLoad = function() {};

              spyOn(suite, 'onLoad').andCallFake(function(page) {
                suite.page = page;
              });

              suite.instance.goToUrl('https://github.com/JamieMason/phantomjs-test-starter', suite.onLoad);

            });

            waitsFor(function(argument) {
              return this.page !== 'foo';
            });

          });

          it('should open the url and passes the PhantomJS page object to the callback', function() {
            expect(this.onLoad).toHaveBeenCalled();
          });

        });

      });

    });

  });

});
