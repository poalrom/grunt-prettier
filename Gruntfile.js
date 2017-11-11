/*
 * grunt-prettier
 * https://github.com/poalrom/grunt-prettier
 *
 * Copyright (c) 2017 Alex Popkov
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ["tmp"]
    },

    // Configuration to be run (and then tested).
    prettier: {
      default_options: {
        files: {
          "tmp/formatted_default_options.js":
            "test/fixtures/default_options/unformatted.js"
        }
      },
      concat_files: {
        files: {
          "tmp/formatted_concat_files.js": [
            "test/fixtures/concat_files/unformatted_1.js",
            "test/fixtures/concat_files/unformatted_2.js"
          ]
        }
      },
      concat_with_globe: {
        files: {
          "tmp/formatted_concat_with_globe.js": [
            "test/fixtures/concat_with_globe/*.js",
            "!test/fixtures/concat_with_globe/*skip.js"
          ]
        }
      },
      write_to_original_file: {
        src: ["tmp/formatted_write_to_original_file.js"]
      },
      write_to_original_file_with_globe: {
        src: [
          "tmp/write_to_original_file_with_globe/*.js",
          "!tmp/write_to_original_file_with_globe/*skip.js"
        ]
      },
      grunt_file: {
        src: ["Gruntfile.js", "tasks/**.*", "test/prettier_test.js"]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ["test/*_test.js"]
    },
    // Copy files for tests.
    copy: {
      write_to_original_file: {
        files: {
          "tmp/formatted_write_to_original_file.js":
            "test/fixtures/write_to_original_file/unformatted.js"
        }
      },
      write_to_original_file_with_globe: {
        files: [
          {
            expand: true,
            cwd: "test/fixtures/write_to_original_file_with_globe/",
            src: "*.js",
            dest: "tmp/write_to_original_file_with_globe/"
          }
        ]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");
  grunt.loadNpmTasks("grunt-contrib-copy");

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["clean", "copy", "prettier", "nodeunit"]);

  // By default, run all tests.
  grunt.registerTask("default", ["test"]);
};
