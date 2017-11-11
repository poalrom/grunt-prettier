# grunt-prettier

> Prettier plugin for Grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prettier --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prettier');
```

## The "prettier" task

### Overview
In your project's Gruntfile, add a section named `prettier` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prettier: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

All options you can see in [official Prettier repo](https://github.com/prettier/prettier#options).

You can put `.prettierrc` near Gruntfile.js.
Options from `.prettierrc` merge with task config and default options in next order:
`[default config] < [task config] < [.prettierrc]`.

**You dont need to add path to config file to task definition!**

### Usage Examples

#### Default Options
In this example, the default options are specified like prettier-cli.

```js
grunt.initConfig({
  prettier: {
    files: {
      'dest/default_options': ['src/unformatted.js', 'src/another_unformatted.js']
    }
  }
});
```

#### Custom Options
In this example, custom options are used to transform indentation into tabs and use single quotes instead of double quotes.

```js
grunt.initConfig({
  prettier: {
    options: {
      singleQuote: true,
      useTabs: true
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    }
  }
});
```

#### Supported and tested "files" params
You can use following formats:

+ File to file - format source file and put formatted code to destination file.
```
files: {
  "dest/formatted.js": "src/unformatted.js"
}
```

+ Concat and format - concat all source files, **then** format and put to destination file. This format can be used with globe patterns.
```
files: {
  "dest/formatted.js": [
    "src/unformatted_1.js",
    "src/unformatted_2.js"
  ]
}
```

+ Hot formatting - overwrite src files with it formatted copy. Set `src` option instead of `files`. This format can be used with globe patterns.
```
files: {
  src: [
    "my-awesome-project/**.js",
    "!my-awesome-project/**.config.js"
  ]
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
