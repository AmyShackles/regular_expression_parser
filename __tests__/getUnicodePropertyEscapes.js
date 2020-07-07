const { getUnicodePropertyEscapes } = require('../components/getUnicodePropertyEscapes');
const { UNICODE_PROPERTY_ESCAPE, NEGATED_UNICODE_PROPERTY_ESCAPE } = require("../utils/regexes.js");
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getUnicodePropertyEscapes", () => {
    const { expression, flags } = splitRegex(/\p{Letter}\p{General_Category=Letter}\P{Script=Cyrillic}\P{Hex}/gmu)
    const unicodePropertyEscapes = getUnicodePropertyEscapes(expression, flags);
    const unicodePropertyEscapeIndexes = getIndexes(expression, UNICODE_PROPERTY_ESCAPE);
    const negatedUnicodePropertyEscapeIndexes = getIndexes(expression, NEGATED_UNICODE_PROPERTY_ESCAPE);

    it("adds unicode property escapes", () => {
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[0]}.unicode_property_escape`)
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[0]}.unicode_property_escape.startingIndex`, 0);
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[0]}.unicode_property_escape.lastIndex`, 9);
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[0]}.unicode_property_escape.group`, '\\p{Letter}')
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[1]}.unicode_property_escape`)
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[1]}.unicode_property_escape.startingIndex`, 10);
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[1]}.unicode_property_escape.lastIndex`, 36);
        expect(unicodePropertyEscapes).toHaveProperty(`${unicodePropertyEscapeIndexes[1]}.unicode_property_escape.group`, '\\p{General_Category=Letter}')
    });
    it("adds negated unicode property escapes", () => {
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[0]}.negated_unicode_property_escape`)
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[0]}.negated_unicode_property_escape.startingIndex`, 37);
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[0]}.negated_unicode_property_escape.lastIndex`, 55);
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[0]}.negated_unicode_property_escape.group`, '\\P{Script=Cyrillic}')
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[1]}.negated_unicode_property_escape`)
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[1]}.negated_unicode_property_escape.startingIndex`, 56);
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[1]}.negated_unicode_property_escape.lastIndex`, 62);
        expect(unicodePropertyEscapes).toHaveProperty(`${negatedUnicodePropertyEscapeIndexes[1]}.negated_unicode_property_escape.group`, '\\P{Hex}')
    })
})