var OPTIONS = [
  'printWidth',
  'tabWidth',
  'singleQuote',
  'trailingComma',
  'bracketSpacing',
  'jsxBracketSameLine',
  'parser',
  'semi',
  'useTabs',
  'doc'
];
function setOptions(options) {
  OPTIONS.forEach(function (option) {
    var elem = document.getElementById(option);
    if (elem.tagName === 'SELECT') {
      elem.value = options[option];
    } else if (elem.type === 'number') {
      elem.value = options[option];
    } else {
      elem.checked = options[option];
    }
  });
}

function getOptions() {
  var options = {};
  OPTIONS.forEach(function (option) {
    var elem = document.getElementById(option);
    if (elem.tagName === 'SELECT') {
      options[option] = elem.value;
    } else if (elem.type === 'number') {
      options[option] = Number(elem.value);
    } else {
      options[option] = elem.checked;
    }
  });
  return options;
}

function omitNonFormatterOptions(options) {
  var optionsClone = Object.assign({}, options);
  delete optionsClone.doc;
  return optionsClone;
}

function replaceHash(hash) {
  if (
    typeof URL === 'function' &&
    typeof history === 'object' &&
    typeof history.replaceState === 'function'
  ) {
    var url = new URL(location);
    url.hash = hash;
    history.replaceState(null, null, url);
  } else {
    location.hash = hash;
  }
}

function format() {
  var options = getOptions();
  [docEditor, outputEditor].forEach(function (editor) {
    editor.setOption('rulers', [
      { column: options.printWidth, color: '#444444' }
    ]);
  });
  document.getElementsByClassName('doc')[0].style.display = options.doc
    ? 'flex'
    : 'none';

  var value = encodeURIComponent(
    JSON.stringify(
      Object.assign({ content: inputEditor.getValue(), options: options })
    )
  );
  replaceHash(value);
  var formatterOptions = omitNonFormatterOptions(options);
  var res;
  try {
    res = prettier.format(inputEditor.getValue(), formatterOptions);
  } catch (e) {
    res = e.toString();
  }
  outputEditor.setValue(res);

  if (options.doc) {
    var debug;
    try {
      var doc = prettier.__debug.printToDoc(
        inputEditor.getValue(),
        formatterOptions
      );
      debug = prettier.__debug.formatDoc(doc, formatterOptions);
    } catch (e) {
      debug = e.toString();
    }
    docEditor.setValue(debug);
  }
}

document.getElementsByClassName('options')[0].onchange = format;

var editorOptions = {
  lineNumbers: true,
  keyMap: 'sublime',
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  theme: 'base16-dark',
  tabWidth: 2
};
var inputEditor = CodeMirror.fromTextArea(
  document.getElementById('input-editor'),
  editorOptions
);
inputEditor.on('change', format);

var docEditor = CodeMirror.fromTextArea(document.getElementById('doc-editor'), {
  readOnly: true,
  lineNumbers: true,
  theme: 'base16-dark'
});

var outputEditor = CodeMirror.fromTextArea(
  document.getElementById('output-editor'),
  { readOnly: true, lineNumbers: true, theme: 'base16-dark' }
);

document.getElementsByClassName('version')[0].innerText = prettier.version;
var OPTIONS = [
  'printWidth',
  'tabWidth',
  'singleQuote',
  'trailingComma',
  'bracketSpacing',
  'jsxBracketSameLine',
  'parser',
  'semi',
  'useTabs',
  'doc'
];
function setOptions(options) {
  OPTIONS.forEach(function (option) {
    var elem = document.getElementById(option);
    if (elem.tagName === 'SELECT') {
      elem.value = options[option];
    } else if (elem.type === 'number') {
      elem.value = options[option];
    } else {
      elem.checked = options[option];
    }
  });
}

function getOptions() {
  var options = {};
  OPTIONS.forEach(function (option) {
    var elem = document.getElementById(option);
    if (elem.tagName === 'SELECT') {
      options[option] = elem.value;
    } else if (elem.type === 'number') {
      options[option] = Number(elem.value);
    } else {
      options[option] = elem.checked;
    }
  });
  return options;
}

function omitNonFormatterOptions(options) {
  var optionsClone = Object.assign({}, options);
  delete optionsClone.doc;
  return optionsClone;
}

function replaceHash(hash) {
  if (
    typeof URL === 'function' &&
    typeof history === 'object' &&
    typeof history.replaceState === 'function'
  ) {
    var url = new URL(location);
    url.hash = hash;
    history.replaceState(null, null, url);
  } else {
    location.hash = hash;
  }
}

function format() {
  var options = getOptions();
  [docEditor, outputEditor].forEach(function (editor) {
    editor.setOption('rulers', [
      { column: options.printWidth, color: '#444444' }
    ]);
  });
  document.getElementsByClassName('doc')[0].style.display = options.doc
    ? 'flex'
    : 'none';

  var value = encodeURIComponent(
    JSON.stringify(
      Object.assign({ content: inputEditor.getValue(), options: options })
    )
  );
  replaceHash(value);
  var formatterOptions = omitNonFormatterOptions(options);
  var res;
  try {
    res = prettier.format(inputEditor.getValue(), formatterOptions);
  } catch (e) {
    res = e.toString();
  }
  outputEditor.setValue(res);

  if (options.doc) {
    var debug;
    try {
      var doc = prettier.__debug.printToDoc(
        inputEditor.getValue(),
        formatterOptions
      );
      debug = prettier.__debug.formatDoc(doc, formatterOptions);
    } catch (e) {
      debug = e.toString();
    }
    docEditor.setValue(debug);
  }
}

document.getElementsByClassName('options')[0].onchange = format;

var editorOptions = {
  lineNumbers: true,
  keyMap: 'sublime',
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  theme: 'base16-dark',
  tabWidth: 2
};
var inputEditor = CodeMirror.fromTextArea(
  document.getElementById('input-editor'),
  editorOptions
);
inputEditor.on('change', format);

var docEditor = CodeMirror.fromTextArea(document.getElementById('doc-editor'), {
  readOnly: true,
  lineNumbers: true,
  theme: 'base16-dark'
});

var outputEditor = CodeMirror.fromTextArea(
  document.getElementById('output-editor'),
  { readOnly: true, lineNumbers: true, theme: 'base16-dark' }
);

document.getElementsByClassName('version')[0].innerText = prettier.version;
