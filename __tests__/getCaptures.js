const { getCaptures } = require('../components/getCaptures.js');
const { NON_CAPTURE, NAMED_CAPTURE, CAPTURE } = require("../utils/regexes.js");
const { splitRegex } = require("../components/splitRegex");
const { getParenStack } = require("../utils/getParenStack.js");


describe("getCaptures", () => {
    const { expression } = splitRegex(/(?:(^|\s))(ABC), (as (easy)) as (?<num>12(?<another>nesting)3)/g);
    const captures = getCaptures(expression);
    const parenStack = getParenStack(expression);
    let non_capture_groups = {}, capture_groups = {}, named_capture_groups = {};
    parenStack.forEach(({group, startingIndex, lastIndex}) => {
        const namedCapture = group.match(NAMED_CAPTURE)
        const nonCapture = group.match(NON_CAPTURE);
        const capture = group.match(CAPTURE);
        if (namedCapture) {
            named_capture_groups[startingIndex] = {
                type: 'named_capture_group',
                group: namedCapture['groups']['named_capture_group'],
                match: namedCapture['groups']['named_capture'],
                startingIndex,
                lastIndex
            }
        } else if (nonCapture) {
            non_capture_groups[startingIndex] = {
                type: 'non_capture_group',
                group: nonCapture['groups']['non_capture_group'],
                match: nonCapture['groups']['non_capture'],
                startingIndex,
                lastIndex
            }
        } else if (capture) {
            capture_groups[startingIndex] = {
                type: 'capture_group',
                group: capture['groups']['capture_group'],
                match: capture['groups']['capture'],
                startingIndex,
                lastIndex
            }
        }
    })
    capture_groups = Object.values(capture_groups);
    non_capture_groups = Object.values(non_capture_groups);
    named_capture_groups = Object.values(named_capture_groups);

    it("should add non-capture groups", () => {
        non_capture_groups.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(captures).toHaveProperty(`${startingIndex}.type`, type);
            expect(captures).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(captures).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(captures).toHaveProperty(`${startingIndex}.group`, group)
            expect(captures).toHaveProperty(`${startingIndex}.match`, match)
        })
        expect(captures).toHaveProperty(`0.type`, 'non_capture_group');
        expect(captures).toHaveProperty(`0.startingIndex`, 0);
        expect(captures).toHaveProperty(`0.lastIndex`, 9);
        expect(captures).toHaveProperty(`0.group`, '(?:(^|\\s))');
        expect(captures).toHaveProperty('0.match', '(^|\\s)');
    });
    it("should add named capture groups", () => {
        named_capture_groups.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(captures).toHaveProperty(`${startingIndex}.type`, type);
            expect(captures).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(captures).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(captures).toHaveProperty(`${startingIndex}.group`, group)
            expect(captures).toHaveProperty(`${startingIndex}.match`, match)
        })
        expect(captures).toHaveProperty(`32.type`, 'named_capture_group');
        expect(captures).toHaveProperty(`32.startingIndex`, 32);
        expect(captures).toHaveProperty(`32.lastIndex`, 61);
        expect(captures).toHaveProperty(`32.group`, '(?<num>12(?<another>nesting)3)');
        expect(captures).toHaveProperty(`32.name`, 'num');
        expect(captures).toHaveProperty(`32.match`, '12(?<another>nesting)3');
    });
    it("should add unnamed capture groups", () => {
        capture_groups.forEach(({group, startingIndex, lastIndex, match, type}) => {
            expect(captures).toHaveProperty(`${startingIndex}.type`, type);
            expect(captures).toHaveProperty(`${startingIndex}.startingIndex`, startingIndex);
            expect(captures).toHaveProperty(`${startingIndex}.lastIndex`, lastIndex);
            expect(captures).toHaveProperty(`${startingIndex}.group`, group);
            expect(captures).toHaveProperty(`${startingIndex}.match`, match)
        })
        expect(captures).toHaveProperty(`10.type`, 'capture_group');
        expect(captures).toHaveProperty(`10.startingIndex`, 10);
        expect(captures).toHaveProperty(`10.lastIndex`, 14);
        expect(captures).toHaveProperty(`10.group`, '(ABC)');
        expect(captures).toHaveProperty(`10.match`, 'ABC');

    });
})