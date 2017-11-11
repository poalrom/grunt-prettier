'use strict';

var grunt = require('grunt');

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
  setUp: function(done) {
    done();
  },
  override_with_prettierrc: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/formatted_override_with_prettierrc.js');
    var expected = grunt.file.read(
      'test/expected/override_with_prettierrc/formatted.js'
    );
    test.equal(actual, expected, 'Formatting should be equal expected!');

    test.done();
  },
  concat_files: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/formatted_concat_files.js');
    var expected = grunt.file.read('test/expected/concat_files/formatted.js');
    test.equal(actual, expected, 'Formatting should be equal expected!');

    test.done();
  },
  concat_with_globe: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/formatted_concat_with_globe.js');
    var expected = grunt.file.read(
      'test/expected/concat_with_globe/formatted.js'
    );
    test.equal(actual, expected, 'Formatting should be equal expected!');

    test.done();
  },
  write_to_original_file: function(test) {
    test.expect(2);

    var actual = grunt.file.read(
      'test/fixtures/write_to_original_file/unformatted.js'
    );
    var tmp = grunt.file.read('tmp/formatted_write_to_original_file.js');
    var expected = grunt.file.read(
      'test/expected/write_to_original_file/formatted.js'
    );
    test.notEqual(actual, tmp, 'File should be formatted!');
    test.equal(tmp, expected, 'Formatting should be equal expected!');

    test.done();
  },
  write_to_original_file_with_globe: function(test) {
    test.expect(7);

    var actual_formatted_1 = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_match_1.js'
    );
    var actual_formatted_2 = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_match_2.js'
    );
    var actual_unformatted = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_skip.js'
    );

    var formatted_1 = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_match_1.js'
    );
    var formatted_2 = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_match_2.js'
    );
    var unformatted = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_skip.js'
    );

    var expected_formatted_1 = grunt.file.read(
      'test/expected/write_to_original_file_with_globe/formatted_1.js'
    );
    var expected_formatted_2 = grunt.file.read(
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
  }
};
