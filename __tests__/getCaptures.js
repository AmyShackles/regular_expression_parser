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
                group: namedCapture['groups']['named_capture_group'],
                startingIndex,
                lastIndex
            }
        } else if (nonCapture) {
            non_capture_groups[startingIndex] = {
                group: nonCapture['groups']['non_capture_group'], 
                startingIndex,
                lastIndex
            }
        } else if (capture) {
            capture_groups[startingIndex] = {
                group: capture['groups']['capture_group'], 
                startingIndex,
                lastIndex
            }
        }
    })
    capture_groups = Object.values(capture_groups);
    non_capture_groups = Object.values(non_capture_groups);
    named_capture_groups = Object.values(named_capture_groups);

    it("should add non-capture groups", () => {
        non_capture_groups.forEach(({group, startingIndex, lastIndex}) => {
            expect(captures).toHaveProperty(`${startingIndex}.non_capture_group.startingIndex`, startingIndex);
            expect(captures).toHaveProperty(`${startingIndex}.non_capture_group.lastIndex`, lastIndex);
            expect(captures).toHaveProperty(`${startingIndex}.non_capture_group.group`, group)
        })
        expect(captures).toHaveProperty(`0.non_capture_group`);
        expect(captures).toHaveProperty(`0.non_capture_group.startingIndex`, 0);
        expect(captures).toHaveProperty(`0.non_capture_group.lastIndex`, 9);
        expect(captures).toHaveProperty(`0.non_capture_group.group`, '(^|\\s)');
    });
    it("should add named capture groups", () => {
        named_capture_groups.forEach(({group, startingIndex, lastIndex}) => {
            expect(captures).toHaveProperty(`${startingIndex}.named_capture_group.startingIndex`, startingIndex);
            expect(captures).toHaveProperty(`${startingIndex}.named_capture_group.lastIndex`, lastIndex);
            expect(captures).toHaveProperty(`${startingIndex}.named_capture_group.group`, group)
        })
        expect(captures).toHaveProperty(`32.named_capture_group.startingIndex`, 32);
        expect(captures).toHaveProperty(`32.named_capture_group.lastIndex`, 61);
        expect(captures).toHaveProperty(`32.named_capture_group.group`, '12(?<another>nesting)3');
        expect(captures).toHaveProperty(`32.named_capture_group.name`, 'num');
    });
    it("should add unnamed capture groups", () => {
        capture_groups.forEach(({group, startingIndex, lastIndex}) => {
            expect(captures).toHaveProperty(`${startingIndex}.capture_group.startingIndex`, startingIndex);
            expect(captures).toHaveProperty(`${startingIndex}.capture_group.lastIndex`, lastIndex);
            expect(captures).toHaveProperty(`${startingIndex}.capture_group.group`, group);

        })
        expect(captures).toHaveProperty(`10.capture_group.startingIndex`, 10);
        expect(captures).toHaveProperty(`10.capture_group.lastIndex`, 14);
        expect(captures).toHaveProperty(`10.capture_group.group`, 'ABC');
    });
})