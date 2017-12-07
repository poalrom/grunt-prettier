/*
 * grunt-prettier
 * https://github.com/poalrom/grunt-prettier
 *
 * Copyright (c) 2017 Alex Popkov
 * Licensed under the MIT license.
 */

'use strict';

function tasks(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    prettier: {
      override_with_prettierrc: {
        files: {
          'tmp/formatted_override_with_prettierrc.js':
            'test/fixtures/override_with_prettierrc/unformatted.js'
        }
      },
      tests: {
        files: {
          'tmp/different_extensions/.arcconfig':
            'test/fixtures/different_extensions/.arcconfig',
          'tmp/different_extensions/.babelrc':
            'test/fixtures/different_extensions/.babelrc',
          'tmp/different_extensions/.eslintrc':
            'test/fixtures/different_extensions/.eslintrc',
          'tmp/different_extensions/.jshintrc':
            'test/fixtures/different_extensions/.jshintrc',
          'tmp/different_extensions/.prettierrc':
            'test/fixtures/different_extensions/.prettierrc',
          'tmp/different_extensions/composer.lock':
            'test/fixtures/different_extensions/composer.lock',
          'tmp/different_extensions/Jakefile':
            'test/fixtures/different_extensions/Jakefile',
          'tmp/different_extensions/mcmod.info':
            'test/fixtures/different_extensions/mcmod.info',
          'tmp/different_extensions/README':
            'test/fixtures/different_extensions/README',
          'tmp/different_extensions/unformatted.gql':
            'test/fixtures/different_extensions/unformatted.gql',
          'tmp/different_extensions/unformatted.graphql':
            'test/fixtures/different_extensions/unformatted.graphql',
          'tmp/different_extensions/unformatted.json':
            'test/fixtures/different_extensions/unformatted.json',
          'tmp/different_extensions/unformatted.less':
            'test/fixtures/different_extensions/unformatted.less',
          'tmp/different_extensions/unformatted.markdown':
            'test/fixtures/different_extensions/unformatted.markdown',
          'tmp/different_extensions/unformatted.md':
            'test/fixtures/different_extensions/unformatted.md',
          'tmp/different_extensions/unformatted.mdown':
            'test/fixtures/different_extensions/unformatted.mdown',
          'tmp/different_extensions/unformatted.mdwn':
            'test/fixtures/different_extensions/unformatted.mdwn',
          'tmp/different_extensions/unformatted.mkd':
            'test/fixtures/different_extensions/unformatted.mkd',
          'tmp/different_extensions/unformatted.mkdn':
            'test/fixtures/different_extensions/unformatted.mkdn',
          'tmp/different_extensions/unformatted.mkdown':
            'test/fixtures/different_extensions/unformatted.mkdown',
          'tmp/different_extensions/unformatted.scss':
            'test/fixtures/different_extensions/unformatted.scss',
          'tmp/different_extensions/unformatted.ts':
            'test/fixtures/different_extensions/unformatted.ts',
          'tmp/different_extensions/unformatted.tsx':
            'test/fixtures/different_extensions/unformatted.tsx',
          'tmp/different_extensions/unformatted.jsx':
            'test/fixtures/different_extensions/unformatted.jsx',
          'tmp/different_extensions/unformatted.js':
            'test/fixtures/different_extensions/unformatted.js',
          'tmp/different_extensions/unformatted.css':
            'test/fixtures/different_extensions/unformatted.css'
        }
      },
      concat_files: {
        files: {
          'tmp/formatted_concat_files.js': [
            'test/fixtures/concat_files/unformatted_1.js',
            'test/fixtures/concat_files/unformatted_2.js'
          ]
        }
      },
      concat_with_globe: {
        files: {
          'tmp/formatted_concat_with_globe.js': [
            'test/fixtures/concat_with_globe/*.js',
            '!test/fixtures/concat_with_globe/*skip.js'
          ]
        }
      },
      write_to_original_file: {
        src: ['tmp/formatted_write_to_original_file.js']
      },
      write_to_original_file_with_globe: {
        src: [
          'tmp/write_to_original_file_with_globe/*.js',
          '!tmp/write_to_original_file_with_globe/*skip.js'
        ]
      },
      grunt_file: {
        src: ['Gruntfile.js', 'tasks/**.*', 'test/prettier_test.js']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    // Copy files for tests.
    copy: {
      write_to_original_file: {
        files: {
          'tmp/formatted_write_to_original_file.js':
            'test/fixtures/write_to_original_file/unformatted.js'
        }
      },
      write_to_original_file_with_globe: {
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/write_to_original_file_with_globe/',
            src: '*.js',
            dest: 'tmp/write_to_original_file_with_globe/'
          }
        ]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'prettier', 'nodeunit']);

  // By default, run all tests.
  grunt.registerTask('default', ['test']);
}

module.exports = tasks;
