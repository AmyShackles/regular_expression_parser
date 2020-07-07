const { getUnicode } = require("../components/getUnicode.js");
const { UNICODE_REGEX_IN_UNICODE_MODE, UNICODE_REGEX_NOT_IN_UNICODE_MODE } = require('../utils/regexes.js');
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getBoundaries", () => {
    it("should add unicode when unicode flag is set", () => {
        const { expression, flags } = splitRegex(/^\u1234\u{1234}\u{12345}/gmu);
        const unicode = getUnicode(expression, flags);
        const unicodeRegexInUnicodeModeIndexes = getIndexes(expression, UNICODE_REGEX_IN_UNICODE_MODE);

        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.unicode`)
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.unicode.startingIndex`, 1);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.unicode.lastIndex`, 6);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[0]}.unicode.group`, 'ሴ');
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.unicode`)
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.unicode.startingIndex`, 7);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.unicode.lastIndex`, 14);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[1]}.unicode.group`, 'ሴ');
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.unicode`)
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.unicode.startingIndex`, 15);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.unicode.lastIndex`, 23);
        expect(unicode).toHaveProperty(`${unicodeRegexInUnicodeModeIndexes[2]}.unicode.group`, '𒍅' );
    });
    it("should add unicode when unicode flag is not set", () => {
        const { expression, flags } = splitRegex(/^\u1234\u{1234}/gm);
        const unicode = getUnicode(expression, flags);
        const unicodeRegexNotInUnicodeModeIndexes = getIndexes(expression, UNICODE_REGEX_NOT_IN_UNICODE_MODE);

        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.unicode`)
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.unicode.startingIndex`, 1);
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.unicode.lastIndex`, 6);
        expect(unicode).toHaveProperty(`${unicodeRegexNotInUnicodeModeIndexes[0]}.unicode.group`, 'ሴ')
        
    });
    it("should not add unicode values only available when unicode flag is set when unicode flag is not set", () => {
        const { expression, flags } = splitRegex(/\u{1234}/gm);
        const unicode = getUnicode(expression, flags);

        expect(unicode).not.toHaveProperty('0.unicode');

    })
})