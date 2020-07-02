const { getCaptures } = require('../components/getCaptures.js');
const { NON_CAPTURE, NAMED_CAPTURE, CAPTURE } = require("../utils/regexes.js");
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getCaptures", () => {
    const { expression } = splitRegex(/(?:(^|\s))(ABC), as easy as (?<num>123)/g);
    const nonCaptureIndexes = getIndexes(expression, NON_CAPTURE);
    const namedCaptureIndexes = getIndexes(expression, NAMED_CAPTURE);
    const captureIndexes = getIndexes(expression, CAPTURE);
    const captures = getCaptures(expression);

    it("should add non-capture groups", () => {
        nonCaptureIndexes.forEach(cap => {
            expect(captures).toHaveProperty(`${cap}.non_capture_group`);
            expect(captures).toHaveProperty(`${cap}.non_capture_group.startingIndex`);
            expect(captures).toHaveProperty(`${cap}.non_capture_group.endingIndex`);
            expect(captures).toHaveProperty(`${cap}.non_capture_group.group`);
        });
        expect(captures).toHaveProperty(`${nonCaptureIndexes[0]}.non_capture_group.startingIndex`, 0);
        expect(captures).toHaveProperty(`${nonCaptureIndexes[0]}.non_capture_group.endingIndex`, 9);
        expect(captures).toHaveProperty(`${nonCaptureIndexes[0]}.non_capture_group.group`, '^|\\s');
    });
    it("should add named capture groups", () => {
        namedCaptureIndexes.forEach(cap => {
            expect(captures).toHaveProperty(`${cap}.named_capture_group`);
            expect(captures).toHaveProperty(`${cap}.named_capture_group.startingIndex`);
            expect(captures).toHaveProperty(`${cap}.named_capture_group.endingIndex`);
            expect(captures).toHaveProperty(`${cap}.named_capture_group.group`);
            expect(captures).toHaveProperty(`${cap}.named_capture_group.name`);
        });
        
        expect(captures).toHaveProperty(`${namedCaptureIndexes[0]}.named_capture_group.startingIndex`, 28);
        expect(captures).toHaveProperty(`${namedCaptureIndexes[0]}.named_capture_group.endingIndex`, 39);
        expect(captures).toHaveProperty(`${namedCaptureIndexes[0]}.named_capture_group.group`, '123');
        expect(captures).toHaveProperty(`${namedCaptureIndexes[0]}.named_capture_group.name`, 'num');
    });
    it("should add unnamed capture groups", () => {
        captureIndexes.forEach(cap => {
            expect(captures).toHaveProperty(`${cap}.capture_group`);
            expect(captures).toHaveProperty(`${cap}.capture_group.startingIndex`);
            expect(captures).toHaveProperty(`${cap}.capture_group.endingIndex`);
            expect(captures).toHaveProperty(`${cap}.capture_group.group`);
        });
        expect(captures).toHaveProperty(`${captureIndexes[0]}.capture_group.startingIndex`, 10);
        expect(captures).toHaveProperty(`${captureIndexes[0]}.capture_group.endingIndex`, 15);
        expect(captures).toHaveProperty(`${captureIndexes[0]}.capture_group.group`, 'ABC');
    });
})