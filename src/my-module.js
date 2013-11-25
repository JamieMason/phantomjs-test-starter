module.exports = {

  /**
   * Factory Method to create an instance of this made-up Module
   * @param  {Object} [webpage]
   * @return {Object}
   */
  create: function(webpage) {

    // optionally override webpage with another implementation
    webpage = webpage || require('webpage');

    return {

      /**
       * A fairly pointless method in the real world, but serves as an example of something
       * testable. Open a given web page and pass the loaded page object to the callback.
       * @param  {String}   url
       * @param  {Function} done [description]
       */
      goToUrl: function(url, done) {
        var page = webpage.create();
        page.open(url, function() {
          done(page);
        });
      }

    };

  }

};
