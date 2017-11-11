/*
 * grunt-prettier
 * https://github.com/poalrom/grunt-prettier
 *
 * Copyright (c) 2017 Alex Popkov
 * Licensed under the MIT license.
 */

'use strict';

var prettier = require('prettier'),
  path = require('path'),
  fs = require('fs');

module.exports = function(grunt) {
  grunt.registerMultiTask('prettier', 'Prettier plugin for Grunt', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      useTabs: false,
      printWidth: 80,
      tabWidth: 2,
      singleQuote: false,
      trailingComma: 'none',
      bracketSpacing: true,
      jsxBracketSameLine: false,
      parser: 'babylon',
      semi: true
    });

    // If .prettierrc file exists, load it and override existing options
    var prettierrcPath = path.resolve() + path.sep + '.prettierrc';
    if (fs.existsSync(prettierrcPath)) {
      var prettierrcOptions = grunt.file.readJSON('.prettierrc');
      options = Object.assign({}, options, prettierrcOptions);
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Check specified files.
      var codeFiles = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var formattedCode, unformattedCode;

      if (typeof f.dest === 'undefined') {
        // If f.dest is undefined, then write formatted code to original files.
        codeFiles.map(function(filepath) {
          unformattedCode = grunt.file.read(filepath);
          formattedCode = prettier.format(unformattedCode, options);
          grunt.file.write(filepath, formattedCode);
          grunt.log.writeln('Prettify file "' + filepath + '".');
        });
      } else {
        // Else concat files and write to destination file.
        unformattedCode = codeFiles.map(function(filepath) {
          return grunt.file.read(filepath);
        });

        formattedCode = prettier.format(unformattedCode.join(''), options);
        grunt.file.write(f.dest, formattedCode);
        grunt.log.writeln('Prettify file "' + f.dest + '".');
      }
    });
  });
};
