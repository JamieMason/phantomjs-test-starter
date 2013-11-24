module.exports = function(grunt) {

  'use strict';

  function instrument(dir) {
    return [
      './node_modules/istanbul/lib/cli.js instrument ',
      dir,
      ' -o <%= meta.paths.instrumented %>/',
      dir
    ].join('');
  }

  grunt.initConfig({

    meta: {
      paths: {
        reports: 'spec/build/reports',
        instrumented: 'instrumented'
      },
      files: {
        coverageReport: 'coverage-reporter.json',
        js: [
          '**/*.js',
          '!spec/build/**/*.js',
          '!node_modules/**/*.js'
        ]
      }
    },

    jshint: {
      src: '<%= meta.files.js %>',
      options: {
        jshintrc: '.jshintrc'
      }
    },

    copy: {
      test: {
        files: [{
          src: [
            'environment/**',
            'lib/**',
            'spec/**',
            'src/**'
          ],
          dest: '<%= meta.paths.instrumented %>/'
        }]
      }
    },

    clean: {
      test: ['<%= meta.paths.instrumented %>']
    },

    shell: {
      options: {
        stdout: true
      },
      test: {
        command: 'phantomjs <%= meta.paths.instrumented %>/spec/unit.runner.js'
      },
      instrument: {
        command: [
          instrument('src'),
          instrument('spec'),
          instrument('lib'),
          instrument('environment')
        ].join(' && ')
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('coverage', function() {
    var istanbul = require('istanbul');
    var reportFile = grunt.config.process('<%= meta.files.coverageReport %>');
    var __coverage__ = grunt.file.readJSON(reportFile);
    var collector = new istanbul.Collector();
    var reporter = istanbul.Report.create('html', {
      dir: grunt.config.process('<%= meta.paths.reports %>')
    });
    collector.add(__coverage__);
    grunt.file.write(reportFile, JSON.stringify(collector.getFinalCoverage()));
    reporter.writeReport(collector, true);
  });

  grunt.registerTask('test', [
    'clean:test',
    'copy:test',
    'shell:instrument',
    'shell:test',
    'coverage',
    'clean:test'
  ]);

};
