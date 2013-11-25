# phantomjs-test-starter

A boilerplate / starter template for testing [PhantomJS](http://phantomjs.org) ‘Applications’ with [Jasmine](http://pivotal.github.io/jasmine/), [Grunt](http://gruntjs.com) and [Istanbul](http://gotwarlost.github.io/istanbul/).

There are many resources on how to run tests in PhantomJS, but none on testing Applications written in PhantomJS _itself_. Non-Trivial Applications such as Data Mining Web Crawlers or Web Page Automation Tools for example.

Conceptually I find it helps to think of PhantomJS as having a server-side and a client-side. The client-side is what happens over in a remote page (inside calls to [WebPage.evaluate](http://phantomjs.org/api/webpage/method/evaluate.html) etc) and the server side is everything else.

This project is concerned with how you test the so-called server side of a PhantomJS Application.

## Installation

### NPM

```bash
npm install phantomjs-test-starter
```

### Git

```bash
git clone git@github.com:JamieMason/phantomjs-test-starter.git
cd phantomjs-test-starter
npm install
```

## Global dependencies

Local dependencies are installed by `npm install` but you will also need `$ phantomjs` (of course) and `npm install -g grunt-cli`.

## Running tests

Running `grunt test` will run the tests and generate a coverage report at **./spec/build/reports/index.html**.

## Writing tests

By optional convention, tests are located at **./spec/unit/** at the same relative path as the file being tested.

For example, tests for the following files:

+ ./src/modules/network/ajax.js
+ ./src/modules/events.js
+ ./src/modules/data/local-storage.js

Would be located at:

+ ./spec/unit/modules/network/ajax.test.js
+ ./spec/unit/modules/events.test.js
+ ./spec/unit/modules/data/local-storage.test.js

## Adding new tests

All test files added to **./spec/unit/unit.runner.js** will run, (I hope to generate this file to avoid this manual step).

## Modified Jasmine 1.3.1

A slightly modified version of [jasmine-standalone-1.3.1](https://github.com/pivotal/jasmine/blob/master/dist/jasmine-standalone-1.3.1.zip) is needed as that does not run in PhantomJS (outside of a page.evaluate that is, which is not relevant to our use case).

This is due to a perfectly reasonable assumption that any JavaScript environment will have either module.exports _or_ window and **not both** — which is the case in PhantomJS.

The core Jasmine library is identical, only how it's exposed has been modified.

## .gitignore

They've been left unignored for this example so can see what gets generated during tests, but in a real application you will want to ignore:

+ coverage-reporter.json
+ spec/build

## Contributing

Please [fork and pull request](https://github.com/JamieMason/phantomjs-test-starter/fork) or [raise an issue](https://github.com/JamieMason/phantomjs-test-starter/issues/new) if you can help improve this resource in any way.
