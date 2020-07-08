const { getBoundaries,
    getCaptures,
    getCharacterClasses,
    getCharacterSets,
    getGroupsAndRanges,
    getLiterals,
    getLooks,
    getQuantifiers,
    getUnicode,
    getUnicodePropertyEscapes,
    splitRegex
} = require("../components");
const { createObject } = require("../index.js");

describe("getLiterals", () => {
    const regex = /Never gonna (give you up), never gonna (let you down)/g;
    const { expression, flags } = splitRegex(regex);
    const unicodeMode = flags.includes('u');
    const captures = getCaptures(expression);
    const quantifiers = getQuantifiers(expression, flags);
    const unicode = getUnicode(expression, flags);
    const characterSets = getCharacterSets(expression);
    const characterClasses = getCharacterClasses(expression, flags);
    const unicodePropertyEscapes = unicodeMode ? getUnicodePropertyEscapes(expression) : undefined;
    const looks = getLooks(expression);
    const boundaries = getBoundaries(expression, flags);
    const groupsAndRanges = getGroupsAndRanges(expression);
    const regularExpressionSansLiterals = createObject(captures, quantifiers, unicode, characterSets, characterClasses, unicodePropertyEscapes, looks, boundaries, groupsAndRanges);
    const regularExpression = getLiterals(expression, regularExpressionSansLiterals);
    it("should add literals to the object", () => {
        expect(regularExpression).toHaveProperty('0', { type: 'literal', startingIndex: 0, lastIndex: 0, group: 'N'});
        expect(regularExpression).toHaveProperty('1', { type: 'literal', startingIndex: 1, lastIndex: 1, group: 'e'});
        expect(regularExpression).toHaveProperty('2', { type: 'literal', startingIndex: 2, lastIndex: 2, group: 'v'});
        expect(regularExpression).toHaveProperty('3', { type: 'literal', startingIndex: 3, lastIndex: 3, group: 'e'});
        expect(regularExpression).toHaveProperty('4', { type: 'literal', startingIndex: 4, lastIndex: 4, group: 'r'});
        expect(regularExpression).toHaveProperty('5', { type: 'literal', startingIndex: 5, lastIndex: 5, group: ' '});
        expect(regularExpression).toHaveProperty('6', { type: 'literal', startingIndex: 6, lastIndex: 6, group: 'g'});
        expect(regularExpression).toHaveProperty('7', { type: 'literal', startingIndex: 7, lastIndex: 7, group: 'o'});
        expect(regularExpression).toHaveProperty('8', { type: 'literal', startingIndex: 8, lastIndex: 8, group: 'n'});
        expect(regularExpression).toHaveProperty('9', { type: 'literal', startingIndex: 9, lastIndex: 9, group: 'n'});
        expect(regularExpression).toHaveProperty('10', { type: 'literal', startingIndex: 10, lastIndex: 10, group: 'a'});
        expect(regularExpression).toHaveProperty('11', { type: 'literal', startingIndex: 11, lastIndex: 11, group: ' '});
        expect(regularExpression).toHaveProperty('12', { type: 'capture_group', startingIndex: 12, lastIndex: 24, group: '(give you up)', match: 'give you up'});
    })
    it("should not add literals for indexes already spoken for", () => {
        expect(regularExpression).not.toHaveProperty('13', { type: 'literal', startingIndex: 13, lastIndex: 13, group: 'g'});
    })
})