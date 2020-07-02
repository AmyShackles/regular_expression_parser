const { POSITIVE_LOOKAHEAD, NEGATIVE_LOOKAHEAD, POSITIVE_LOOKBEHIND, NEGATIVE_LOOKBEHIND } = require("../utils/regexes.js");
const { getLooks } = require("../components/getLooks.js");
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getLooks", () => {
    const { expression } = splitRegex(/(?<!\\u\{)(?<=\{)(\d*,?\d*)(?=\})(?!\}\?)/g);
    const positiveLookaheadIndexes = getIndexes(expression, POSITIVE_LOOKAHEAD);
    const positiveLookbehindIndexes = getIndexes(expression, POSITIVE_LOOKBEHIND);
    const negativeLookaheadIndexes = getIndexes(expression, NEGATIVE_LOOKAHEAD);
    const negativeLookbehindIndexes = getIndexes(expression, NEGATIVE_LOOKBEHIND);
    const looks = getLooks(expression);

    it("should add positive lookaheads", () => {
        positiveLookaheadIndexes.forEach(look => {
            expect(looks).toHaveProperty(`${look}.positive_lookahead`);
            expect(looks).toHaveProperty(`${look}.positive_lookahead.startingIndex`);
            expect(looks).toHaveProperty(`${look}.positive_lookahead.endingIndex`);
            expect(looks).toHaveProperty(`${look}.positive_lookahead.group`);
        });
        expect(looks).toHaveProperty(`${positiveLookaheadIndexes[0]}.positive_lookahead.startingIndex`, 27);
        expect(looks).toHaveProperty(`${positiveLookaheadIndexes[0]}.positive_lookahead.endingIndex`, 29);
        expect(looks).toHaveProperty(`${positiveLookaheadIndexes[0]}.positive_lookahead.group`, '\\}');
    });
    it("should add negative lookaheads", () => {
        negativeLookaheadIndexes.forEach(look => {
            expect(looks).toHaveProperty(`${look}.negative_lookahead`);
            expect(looks).toHaveProperty(`${look}.negative_lookahead.startingIndex`);
            expect(looks).toHaveProperty(`${look}.negative_lookahead.endingIndex`);
            expect(looks).toHaveProperty(`${look}.negative_lookahead.group`);
        });
        expect(looks).toHaveProperty(`${negativeLookaheadIndexes[0]}.negative_lookahead.startingIndex`, 33);
        expect(looks).toHaveProperty(`${negativeLookaheadIndexes[0]}.negative_lookahead.endingIndex`, 37);
        expect(looks).toHaveProperty(`${negativeLookaheadIndexes[0]}.negative_lookahead.group`, '\\}\\?');
    });
    it("should add positive lookbehinds", () => {
        positiveLookbehindIndexes.forEach(look => {
            expect(looks).toHaveProperty(`${look}.positive_lookbehind`);
            expect(looks).toHaveProperty(`${look}.positive_lookbehind.startingIndex`);
            expect(looks).toHaveProperty(`${look}.positive_lookbehind.endingIndex`);
            expect(looks).toHaveProperty(`${look}.positive_lookbehind.group`);
        });
        expect(looks).toHaveProperty(`${positiveLookbehindIndexes[0]}.positive_lookbehind.startingIndex`, 10);
        expect(looks).toHaveProperty(`${positiveLookbehindIndexes[0]}.positive_lookbehind.endingIndex`, 12);
        expect(looks).toHaveProperty(`${positiveLookbehindIndexes[0]}.positive_lookbehind.group`, '\\{');
    });
    it("should add negative lookbehinds", () => {
        negativeLookbehindIndexes.forEach(look => {
            expect(looks).toHaveProperty(`${look}.negative_lookbehind`);
            expect(looks).toHaveProperty(`${look}.negative_lookbehind.startingIndex`);
            expect(looks).toHaveProperty(`${look}.negative_lookbehind.endingIndex`);
            expect(looks).toHaveProperty(`${look}.negative_lookbehind.group`);
        });
        expect(looks).toHaveProperty(`${negativeLookbehindIndexes[0]}.negative_lookbehind.startingIndex`, 0);
        expect(looks).toHaveProperty(`${negativeLookbehindIndexes[0]}.negative_lookbehind.endingIndex`, 5);
        expect(looks).toHaveProperty(`${negativeLookbehindIndexes[0]}.negative_lookbehind.group`, '\\\\u\\{');
    });
})