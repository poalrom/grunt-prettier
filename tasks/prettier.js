/*
 * grunt-prettier
 * https://github.com/poalrom/grunt-prettier
 *
 * Copyright (c) 2017 Alex Popkov
 * Licensed under the MIT license.
 */

'use strict';

const prettier = require('prettier'),
  path = require('path'),
  fs = require('fs');

let fileExtToParser = {};
let fileNameToParser = {};
prettier.getSupportInfo().languages.forEach(lang => {
  lang.extensions.forEach(extension => {
    fileExtToParser[extension] = lang.parsers;
  });
  if (lang.filenames) {
    lang.filenames.forEach(filename => {
      fileNameToParser[filename] = lang.parsers;
    });
  }
});

function getParser(file, defaultParser) {
  let fileExt = path.extname(file);
  let fileName = path.basename(file);
  if (fileExtToParser.hasOwnProperty(fileExt)) {
    let parser =
      defaultParser in fileExtToParser[fileExt]
        ? defaultParser
        : fileExtToParser[fileExt][0];
    return parser;
  }
  if (fileNameToParser.hasOwnProperty(fileName)) {
    let parser =
      defaultParser in fileNameToParser[fileName]
        ? defaultParser
        : fileNameToParser[fileName][0];
    return parser;
  }
  return defaultParser;
}

function prettierTask(grunt) {
  grunt.registerMultiTask('prettier', 'Prettier plugin for Grunt', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    let options = this.options({
      configFile: '.prettierrc',
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
    let prettierrcPath = path.resolve() + path.sep + options.configFile;
    if (fs.existsSync(prettierrcPath)) {
      grunt.log.writeln(`Using options from ${options.configFile}`);
      const prettierrcOptions = options.configFile.endsWith('.js')
        ? require(options.configFile)
        : grunt.file.readYAML(options.configFile);
      delete options.configFile;
      options = Object.assign({}, options, prettierrcOptions);
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Check specified files.
      let codeFiles = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      let formattedCode, unformattedCode;

      if (typeof f.dest === 'undefined') {
        // If f.dest is undefined, then write formatted code to original files.
        codeFiles.map(function(filepath) {
          unformattedCode = grunt.file.read(filepath);
          formattedCode = prettier.format(
            unformattedCode,
            Object.assign({}, options, {
              parser: getParser(filepath, options.parser)
            })
          );
          grunt.file.write(filepath, formattedCode);
          grunt.log.writeln('Prettify file "' + filepath + '".');
        });
      } else {
        // Else concat files and write to destination file.
        unformattedCode = codeFiles.map(function(filepath) {
          return grunt.file.read(filepath);
        });

        formattedCode = prettier.format(
          unformattedCode.join(''),
          Object.assign({}, options, {
            parser: getParser(codeFiles[0], options.parser)
          })
        );
        grunt.file.write(f.dest, formattedCode);
        grunt.log.writeln('Prettify file "' + f.dest + '".');
      }
    });
  });
}

module.exports = prettierTask;
