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
      // options: {
      //   progress: true
      // },
      override_with_prettierrc: {
        files: {
          'tmp/formatted_override_with_prettierrc.js':
            'test/fixtures/override_with_prettierrc/unformatted.js'
        }
      },
      different_extensions: {
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
          'tmp/different_extensions/gql.gql':
            'test/fixtures/different_extensions/gql.gql',
          'tmp/different_extensions/graphql.graphql':
            'test/fixtures/different_extensions/graphql.graphql',
          'tmp/different_extensions/json.json':
            'test/fixtures/different_extensions/json.json',
          'tmp/different_extensions/less.less':
            'test/fixtures/different_extensions/less.less',
          'tmp/different_extensions/scss.scss':
            'test/fixtures/different_extensions/scss.scss',
          'tmp/different_extensions/ts.ts':
            'test/fixtures/different_extensions/ts.ts',
          'tmp/different_extensions/tsx.tsx':
            'test/fixtures/different_extensions/tsx.tsx',
          'tmp/different_extensions/jsx.jsx':
            'test/fixtures/different_extensions/jsx.jsx',
          'tmp/different_extensions/js.js':
            'test/fixtures/different_extensions/js.js',
          'tmp/different_extensions/css.css':
            'test/fixtures/different_extensions/css.css'
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
      write_to_original_file_to_check: {
        src: ['tmp/formatted_write_to_original_file_to_check.js']
      },
      check_unformatted_file: {
        src: [
          'tmp/unformatted_write_to_original_file_to_check.js',
          'tmp/formatted_write_to_original_file_to_check.js'
        ]
      },
      parser_overrides: {
        files: {
          'tmp/parser_overrides/.firebaserc':
            'test/fixtures/parser_overrides/.firebaserc'
        }
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
      },
      write_to_original_file_to_check: {
        files: {
          'tmp/unformatted_write_to_original_file_to_check.js':
            'test/fixtures/write_to_original_file/unformatted.js',
          'tmp/formatted_write_to_original_file_to_check.js':
            'test/expected/write_to_original_file/formatted.js'
        }
      },
      check_unformatted_file: {
        files: {
          // just creating the folder and the empty file. Will be filled in once exec:quiet_prettier_check is run
          'tmp/check_unformatted_file/results':
            'test/fixtures/check_unformatted_file/results'
        }
      }
    },
    exec: {
      quiet_prettier_check: {
        command:
          'grunt prettier:check_unformatted_file:check --force > tmp/check_unformatted_file/results',
        stdout: true,
        stderr: true
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'copy',
    'exec:quiet_prettier_check',
    'prettier',
    'nodeunit'
  ]);

  // By default, run all tests.
  grunt.registerTask('default', ['test']);
}

module.exports = tasks;
