var jasmineEnv;
var specPaths = require('system').args[1];
var pwd = require('system').env.PWD;
var jasmine = require('./lib/jasmine-phantom/jasmine-1.3.1.js').jasmine;
var jasmineNode = require('./lib/jasmine-phantom/reporter.js').jasmineNode;

// Load Additional Matchers
require(pwd + '/node_modules/jasmine-expect/dist/jasmine-matchers.js');

// Load specs
specPaths.split(',').forEach(function(specPath) {
  require(specPath);
});

// Launch tests
jasmineEnv = jasmine.getEnv();

// Add a ConsoleReporter to 1) print with colors on the console 2) exit when finished
jasmine.getEnv().addReporter(new jasmineNode.TerminalReporter({
  verbosity: 3,
  color: true,
  onComplete: function(runner) {
    if (typeof __coverage__ === 'object') {
      require('fs').write(pwd + '/spec/build/coverage.json', JSON.stringify(__coverage__), 'w');
    }
    phantom.exit(runner.results().failedCount > 0 ? 1 : 0);
  }
}));

// Launch tests
jasmineEnv.updateInterval = 1000;
jasmineEnv.execute();
