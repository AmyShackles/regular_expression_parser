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
                group: positiveLookahead['groups']['positive_lookahead'],
                startingIndex,
                lastIndex
            }
        } else if (positiveLookbehind) {
            positive_lookbehinds[startingIndex] = {
                group: positiveLookbehind['groups']['positive_lookbehind'],
                startingIndex,
                lastIndex
            }
        } else if (negativeLookahead) {
            negative_lookaheads[startingIndex] = {
                group: negativeLookahead['groups']['negative_lookahead'],
                startingIndex,
                lastIndex
            }
        } else if (negativeLookbehind) {
            negative_lookbehinds[startingIndex] = {
                group: negativeLookbehind['groups']['negative_lookbehind'],
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
        positive_lookaheads.forEach(({group, startingIndex, lastIndex}) => {
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookahead`);
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookahead.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookahead.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookahead.group`, group);
        });
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.positive_lookahead.startingIndex`, 33);
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.positive_lookahead.lastIndex`, 38);
        expect(looks).toHaveProperty(`${positive_lookaheads[0].startingIndex}.positive_lookahead.group`, '\\}');
    });
    it("should add negative lookaheads", () => {
        negative_lookaheads.forEach(({group, startingIndex, lastIndex}) => {
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookahead`);
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookahead.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookahead.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookahead.group`, group);
        });
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.negative_lookahead.startingIndex`, 39);
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.negative_lookahead.lastIndex`, 46);
        expect(looks).toHaveProperty(`${negative_lookaheads[0].startingIndex}.negative_lookahead.group`, '\\}\\?');
    });
    it("should add positive lookbehinds", () => {
        positive_lookbehinds.forEach(({group, startingIndex, lastIndex}) => {
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookbehind`);
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookbehind.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookbehind.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.positive_lookbehind.group`, group);
        });
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.positive_lookbehind.startingIndex`, 16);
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.positive_lookbehind.lastIndex`, 22);
        expect(looks).toHaveProperty(`${positive_lookbehinds[0].startingIndex}.positive_lookbehind.group`, '\\{');
    });
    it("should add negative lookbehinds", () => {
        negative_lookbehinds.forEach(({group, startingIndex, lastIndex}) => {
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookbehind`);
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookbehind.startingIndex`, startingIndex);
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookbehind.lastIndex`, lastIndex);
            expect(looks).toHaveProperty(`${startingIndex}.negative_lookbehind.group`, group);
        });
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.negative_lookbehind.startingIndex`, 0);
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.negative_lookbehind.lastIndex`, 15);
        expect(looks).toHaveProperty(`${negative_lookbehinds[0].startingIndex}.negative_lookbehind.group`, '\\\\u\\{(?:12)');
    });
})