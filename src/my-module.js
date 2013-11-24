module.exports = {
  create: function(webpage) {
    webpage = webpage || require('webpage');
    return {
      goToUrl: function(url, done) {
        var page = webpage.create();
        page.open(url, function() {
          done(page);
        });
      }
    };
  }
};
