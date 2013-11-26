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
        buildOutput: 'spec/build',
        reports: '<%= meta.paths.buildOutput %>/reports',
        instrumented: 'instrumented'
      },
      files: {
        coverageReport: '<%= meta.paths.buildOutput %>/coverage.json',
        js: [
          '**/*.js',
          '!<%= meta.paths.buildOutput %>/**/*.js',
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
        command: instrument('src')
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('coverage', function() {

    var istanbul = require('istanbul');
    var pathToCoverageData = grunt.config.process('<%= meta.files.coverageReport %>');
    var collector = new istanbul.Collector();

    collector.add(grunt.file.readJSON(pathToCoverageData));

    istanbul.Report.create('html', {
      dir: grunt.config.process('<%= meta.paths.reports %>')
    }).writeReport(collector, true);

    istanbul.Report.create('cobertura', {
      dir: grunt.config.process('<%= meta.paths.buildOutput %>')
    }).writeReport(collector, true);

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
