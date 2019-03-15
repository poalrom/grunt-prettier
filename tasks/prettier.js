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
  fs = require('fs'),
  ProgressBar = require('progress');

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
  grunt.registerMultiTask('prettier', 'Prettier plugin for Grunt', function(
    api
  ) {
    if (!api) {
      // default to format API if not specified
      api = 'format';
    }

    var supportedApis = ['check', 'format', 'formatWithCursor'];

    if (supportedApis.indexOf(api) < 0) {
      grunt.log.warn('unsupported API');
      return false;
    }

    let apiCall = prettier[api];

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
      semi: true,
      progress: false,
      cursorOffset: 1 // only for formatWithCursor
    });

    const progress = options.progress;
    delete options.progress;

    // If .prettierrc file exists, load it and override existing options
    let prettierrcPath = path.resolve() + path.sep + options.configFile;
    if (fs.existsSync(prettierrcPath)) {
      grunt.verbose.writeln(`Using options from ${options.configFile}`);
      const prettierrcOptions = options.configFile.endsWith('.js')
        ? require(options.configFile)
        : grunt.file.readYAML(options.configFile);
      options = Object.assign({}, options, prettierrcOptions);
    }
    delete options.configFile;

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

      let bar;
      if (progress) {
        bar = new ProgressBar(':bar / :percent complete, ETA: :eta second(s)', {
          total: codeFiles.length,
          width: 30
        });
      }

      let formattedCode, unformattedCode;

      if (typeof f.dest === 'undefined') {
        let checkStatus = true;
        // If f.dest is undefined, then write formatted code to original files.
        codeFiles.map(function(filepath) {
          unformattedCode = grunt.file.read(filepath);
          formattedCode = apiCall(
            unformattedCode,
            Object.assign({}, options, {
              parser: getParser(filepath, options.parser)
            })
          );
          if (api === 'check') {
            // if we're just checking, output results to stdout, not the file
            grunt.log.writeln(filepath, formattedCode);
            if (formattedCode == false) {
              checkStatus = false;
            }
          } else {
            grunt.file.write(filepath, formattedCode);
          }

          if (progress) {
            bar.tick();
          } else {
            grunt.log.writeln('Prettify file "' + filepath + '".');
          }
        });

        if (!checkStatus) {
          grunt.fail.warn('Some files are not pretty');
        }
      } else {
        // Else concat files and write to destination file.
        unformattedCode = codeFiles.map(function(filepath) {
          return grunt.file.read(filepath);
        });

        formattedCode = apiCall(
          unformattedCode.join(''),
          Object.assign({}, options, {
            parser: getParser(codeFiles[0], options.parser)
          })
        );
        grunt.file.write(f.dest, formattedCode);
        if (progress) {
          bar.tick();
        } else {
          grunt.log.writeln('Prettify file "' + f.dest + '".');
        }
      }
    });
  });
}

module.exports = prettierTask;
