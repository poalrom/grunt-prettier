function DONT_FORMAT_AND_CONCAT_THIS() {
  var options = getOptions();
  [docEditor, outputEditor].forEach(function(editor) {
    editor.setOption(
        'rulers',
        [{column: options.printWidth, color: '#444444'}]
    );
  });
  document.getElementsByClassName('doc')[0].style.display = options.doc ? 'flex' : 'none';

  var value = encodeURIComponent(
      JSON.stringify(
          Object.assign({content: inputEditor.getValue(), options: options})
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
      var doc = prettier.__debug.printToDoc(inputEditor.getValue(), formatterOptions);
      debug = prettier.__debug.formatDoc(doc, formatterOptions);
    } catch (e) {
      debug = e.toString();
    }
    docEditor.setValue(debug);
  }
}