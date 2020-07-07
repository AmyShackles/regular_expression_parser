const { POSITIVE_LOOKAHEAD, NEGATIVE_LOOKAHEAD, POSITIVE_LOOKBEHIND, NEGATIVE_LOOKBEHIND } = require("../utils/regexes.js");
const { getLooks } = require("../components/getLooks.js");
const { splitRegex } = require("../components/splitRegex");
const { getParenStack } = require("../utils/getParenStack.js");


describe("getLooks", () => {
    const { expression } = splitRegex(/(?<!\\u\{(?:12))(?<=\{)(\d*,?\d*)(?=\})(?!\}\?)/g);
    const looks = getLooks(expression);
    const parenStack = getParenStack(expression);
    let positive_lookaheads = {}, negative_lookaheads = {}, positive_lookbehinds = {}, negative_lookbehinds = {};
    parenStack.forEach(({group, startingIndex, lastIndex}) => {
        const positiveLookahead = group.match(POSITIVE_LOOKAHEAD);
        const positiveLookbehind = group.match(POSITIVE_LOOKBEHIND);
        const negativeLookahead = group.match(NEGATIVE_LOOKAHEAD);
        const negativeLookbehind = group.match(NEGATIVE_LOOKBEHIND);
        if (positiveLookahead) {
            positive_lookaheads[startingIndex] = {
                type: 'positive_lookahead',
                group: positiveLookahead['groups']['positive_lookahead'],
                match: positiveLookahead['groups']['pos_lookahead'],
                startingIndex,
                lastIndex
            }
        } else if (positiveLookbehind) {
            positive_lookbehinds[startingIndex] = {
                type: 'positive_lookbehind',
                group: positiveLookbehind['groups']['positive_lookbehind'],
                match: positiveLookbehind['groups']['pos_lookbehind'],
                startingIndex,
                lastIndex
            }
        } else if (negativeLookahead) {
            negative_lookaheads[startingIndex] = {
                type: 'negative_lookahead',
                group: negativeLookahead['groups']['negative_lookahead'],
                match: negativeLookahead['groups']['neg_lookahead'],
                startingIndex,
                lastIndex
            }
        } else if (negativeLookbehind) {
            negative_lookbehinds[startingIndex] = {
                type: 'negative_lookbheind',
                group: negativeLookbehind['groups']['negative_lookbehind'],
                match: negativeLookbehind['groups']['neg_lookbehind'],
                startingIndex,
                lastIndex
            }
        }
    })
    positive_lookaheads = Object.values(positive_lookaheads);
    positive_lookbehinds = Object.values(positive_lookbehinds);
    negative_lookaheads = Object.values(negative_lookaheads);
    negative_lookbehinds = Object.values(negative_lookbehinds);

    it("should add positive lookaheads", () => {
        positive_lookaheads.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(looks).toHaveProperty(`${startingIndex}.type`, type);
            expect(looks).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.group`, group);
            expect(looks).toHaveProperty(`${startingIndex}.match`, match);
        });
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.type`, 'positive_lookahead');
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.startingIndex`, 33);
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.lastIndex`, 38);
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.group`, '(?=\\})');
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.match`, '\\}');
    });
    it("should add negative lookaheads", () => {
        negative_lookaheads.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(looks).toHaveProperty(`${startingIndex}.type`, type);
            expect(looks).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.group`, group);
            expect(looks).toHaveProperty(`${startingIndex}.match`, match);
        });
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.type`, 'negative_lookahead');
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.startingIndex`, 39);
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.lastIndex`, 46);
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.group`, '(?!\\}\\?)');
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.match`, '\\}\\?');
    });
    it("should add positive lookbehinds", () => {
        positive_lookbehinds.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(looks).toHaveProperty(`${startingIndex}.type`, type);
            expect(looks).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.group`, group);
            expect(looks).toHaveProperty(`${startingIndex}.match`, match);
        });
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.type`, 'positive_lookbehind');
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.startingIndex`, 16);
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.lastIndex`, 22);
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.group`, '(?<=\\{)');
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.match`, '\\{');
    });
    it("should add negative lookbehinds", () => {
        negative_lookbehinds.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(looks).toHaveProperty(`${startingIndex}.type`, 'negative_lookbehind');
            expect(looks).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.group`, group);
            expect(looks).toHaveProperty(`${startingIndex}.match`, match);
        });
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.type`, 'negative_lookbehind');
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.startingIndex`, 0);
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.lastIndex`, 15);
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.group`, '(?<!\\\\u\\{(?:12))');
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.match`, '\\\\u\\{(?:12)');
    });
})