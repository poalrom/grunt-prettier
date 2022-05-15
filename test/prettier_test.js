'use strict';

const grunt = require('grunt'),
  fs = require('fs');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.prettier = {
  setUp: function (done) {
    done();
  },
  override_with_prettierrc: function (test) {
    test.expect(1);

    let actual = grunt.file.read('tmp/formatted_override_with_prettierrc.js');
    let expected = grunt.file.read(
      'test/expected/override_with_prettierrc/formatted.js'
    );
    test.equal(actual, expected, 'Formatting should be equal expected!');

    test.done();
  },
  concat_files: function (test) {
    test.expect(1);

    let actual = grunt.file.read('tmp/formatted_concat_files.js');
    let expected = grunt.file.read('test/expected/concat_files/formatted.js');
    test.equal(actual, expected, 'Formatting should be equal expected!');

    test.done();
  },
  concat_with_globe: function (test) {
    test.expect(1);

    let actual = grunt.file.read('tmp/formatted_concat_with_globe.js');
    let expected = grunt.file.read(
      'test/expected/concat_with_globe/formatted.js'
    );
    test.equal(actual, expected, 'Formatting should be equal expected!');

    test.done();
  },
  different_extensions: function (test) {
    let filesWithDifferentExtension = fs.readdirSync(
      './test/fixtures/different_extensions'
    );
    test.expect(filesWithDifferentExtension.length);

    filesWithDifferentExtension.forEach((file) => {
      console.log(`File ${file}`);
      let actual = grunt.file.read(`tmp/different_extensions/${file}`);
      let expected = grunt.file.read(
        `test/expected/different_extensions/${file}`
      );
      test.equal(actual, expected, 'Formatting should be equal expected!');
    });

    test.done();
  },
  write_to_original_file: function (test) {
    test.expect(2);

    let actual = grunt.file.read(
      'test/fixtures/write_to_original_file/unformatted.js'
    );
    let tmp = grunt.file.read('tmp/formatted_write_to_original_file.js');
    let expected = grunt.file.read(
      'test/expected/write_to_original_file/formatted.js'
    );
    test.notEqual(actual, tmp, 'File should be formatted!');
    test.equal(tmp, expected, 'Formatting should be equal expected!');

    test.done();
  },
  write_to_original_file_with_globe: function (test) {
    test.expect(7);

    let actual_formatted_1 = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_match_1.js'
    );
    let actual_formatted_2 = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_match_2.js'
    );
    let actual_unformatted = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_skip.js'
    );

    let formatted_1 = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_match_1.js'
    );
    let formatted_2 = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_match_2.js'
    );
    let unformatted = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_skip.js'
    );

    let expected_formatted_1 = grunt.file.read(
      'test/expected/write_to_original_file_with_globe/formatted_1.js'
    );
    let expected_formatted_2 = grunt.file.read(
      'test/expected/write_to_original_file_with_globe/formatted_2.js'
    );

    test.notEqual(
      actual_formatted_1,
      formatted_1,
      'File #1 should be formatted!'
    );
    test.equal(
      formatted_1,
      expected_formatted_1,
      'Formatting should be equal expected in file #1!'
    );

    test.notEqual(
      actual_formatted_2,
      formatted_2,
      'File #2 should be formatted!'
    );
    test.equal(
      formatted_2,
      expected_formatted_2,
      'Formatting should be equal expected in file #2!'
    );

    test.notEqual(
      actual_formatted_2,
      formatted_2,
      'File #2 should be formatted!'
    );
    test.equal(
      formatted_2,
      expected_formatted_2,
      'Formatting should be equal expected in file #2!'
    );

    test.equal(
      actual_unformatted,
      unformatted,
      'Skipped file should not be formatted!'
    );

    test.done();
  },

  check_unformatted_files: function (test) {
    test.expect(1);

    let check_results_actual = grunt.file.read(
      'tmp/check_unformatted_file/results'
    );
    let check_results_expected = grunt.file.read(
      'test/expected/check_unformatted_file/results'
    );

    test.equal(
      check_results_actual,
      check_results_expected,
      'Check results are not the same!'
    );

    test.done();
  },

  parser_overrides: function (test) {
    let filesForParserOverride = fs.readdirSync(
      './test/fixtures/parser_overrides'
    );
    test.expect(filesForParserOverride.length);

    filesForParserOverride.forEach((file) => {
      console.log(`File ${file}`);
      let actual = grunt.file.read(`tmp/parser_overrides/${file}`);
      let expected = grunt.file.read(`test/expected/parser_overrides/${file}`);
      test.equal(actual, expected, 'Formatting should be equal expected!');
    });

    test.done();
  }
};
