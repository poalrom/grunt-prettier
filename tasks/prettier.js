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
  ProgressBar = require('progress');

function getApiCall(api) {
  if (!api) {
    // default to format API if not specified
    api = 'format';
  }

  var supportedApis = ['check', 'format', 'formatWithCursor'];

  if (supportedApis.indexOf(api) < 0) {
    throw new Error('unsupported API');
  }

  return prettier[api];
}

function getFileConfig(file, configPath) {
  return {
    parser: prettier.getFileInfo.sync(file, { resolveConfig: true })
      .inferredParser,
    ...prettier.resolveConfig.sync(file, {
      config: configPath
    })
  };
}

function formatFilesInplace(
  codeFiles,
  options,
  { bar, grunt, apiCall, api, configPath }
) {
  let checkStatus = true;

  codeFiles.forEach(function (filepath) {
    const unformattedCode = grunt.file.read(filepath);

    // const parser = getParser(filepath, options);

    const formattedCode = apiCall(unformattedCode, {
      ...options,
      ...getFileConfig(filepath, configPath)
    });
    if (api === 'check') {
      // if we're just checking, output results to stdout, not the file
      grunt.log.writeln(filepath, formattedCode);
      if (formattedCode == false) {
        checkStatus = false;
      }
    } else {
      grunt.file.write(filepath, formattedCode);
    }

    if (bar) {
      bar.tick();
    } else {
      grunt.log.writeln('Prettify file "' + filepath + '".');
    }
  });

  if (!checkStatus) {
    grunt.fail.warn('Some files are not pretty');
  }
}

function formatFilesAndWriteToDest(
  codeFiles,
  options,
  { bar, grunt, apiCall, dest, configPath }
) {
  const unformattedCode = codeFiles.map(function (filepath) {
    return grunt.file.read(filepath);
  });

  const formattedCode = apiCall(unformattedCode.join(''), {
    ...options,
    ...getFileConfig(codeFiles[0], configPath)
  });

  grunt.file.write(dest, formattedCode);

  if (bar) {
    bar.tick();
  } else {
    grunt.log.writeln('Prettify file "' + dest + '".');
  }
}

function prettierTask(grunt) {
  grunt.registerMultiTask('prettier', 'Prettier plugin for Grunt', function (
    api
  ) {
    let apiCall;

    try {
      apiCall = getApiCall(api);
    } catch (e) {
      grunt.log.warn(e.message);
      return false;
    }

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
      semi: true,
      progress: false,
      cursorOffset: 1 // only for formatWithCursor
    });

    const progress = options.progress;
    delete options.progress;

    // If .prettierrc file exists, load it and override existing options
    const configPath = options.configFile
      ? path.resolve() + path.sep + options.configFile
      : undefined;
    delete options.configFile;

    // Iterate over all specified file groups.
    this.files.forEach((f) => {
      // Check specified files.
      let codeFiles = f.src.filter(function (filepath) {
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

      if (typeof f.dest === 'undefined') {
        // If f.dest is undefined, then write formatted code to original files.
        formatFilesInplace(codeFiles, options, {
          bar,
          grunt,
          apiCall,
          api,
          configPath
        });
      } else {
        // Else concat files and write to destination file.
        formatFilesAndWriteToDest(codeFiles, options, {
          bar,
          grunt,
          apiCall,
          dest: f.dest,
          configPath
        });
      }
    });
  });
}

module.exports = prettierTask;
