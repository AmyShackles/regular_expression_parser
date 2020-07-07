const { getUnicode } = require("../components/getUnicode.js");
const { UNICODE_REGEX_IN_UNICODE_MODE, UNICODE_REGEX_NOT_IN_UNICODE_MODE } = require('../utils/regexes.js');
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getUnicode", () => {
    it("should add unicode when unicode flag is set", () => {
        const { expression, flags } = splitRegex(/^\u1234\u{1234}\u{12345}/gmu);
        const unicode = getUnicode(expression, flags);
        const unicodeRegexInUnicodeModeIndexes = getIndexes(expression, UNICODE_REGEX_IN_UNICODE_MODE);

        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.type`, 'unicode')
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.startingIndex`, 1);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.lastIndex`, 6);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.group`, '\\u1234');
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.match`, 'ሴ');

        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.type`, 'unicode')
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.startingIndex`, 7);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.lastIndex`, 14);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.group`, '\\u{1234}');
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.match`, 'ሴ');
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.type`, 'unicode')
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.startingIndex`, 15);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.lastIndex`, 23);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.group`, '\\u{12345}' );
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.match`, '𒍅' );
    });
    it("should add unicode when unicode flag is not set", () => {
        const { expression, flags } = splitRegex(/^\u1234\u{1234}/gm);
        const unicode = getUnicode(expression, flags);
        const unicodeRegexNotInUnicodeModeIndexes = getIndexes(expression, UNICODE_REGEX_NOT_IN_UNICODE_MODE);

        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.type`, 'unicode')
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.startingIndex`, 1);
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.lastIndex`, 6);
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.group`, '\\u1234')
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.match`, 'ሴ')
    });
    it("should not add unicode values only available when unicode flag is set when unicode flag is not set", () => {
        const { expression, flags } = splitRegex(/\u{1234}/gm);
        const unicode = getUnicode(expression, flags);

        expect(unicode).not.toHaveProperty('0');
    })
})