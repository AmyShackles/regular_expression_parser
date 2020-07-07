const { getBoundaries } = require("../components/getBoundaries.js");
const { WORD_BOUNDARY, NON_WORD_BOUNDARY } = require('../utils/regexes');
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");

describe("getBoundaries", () => {
    const { expression, flags } = splitRegex(/^[\S\W\B\D](\w+\n\v)((?:[\w,\d]+\b\s){5})\n\r\t((?:[\w,\d]+\s){7})\t((?:(?:[\w\d]+,?)[\s\b]?){5})\f.\x45$/gm)
    const boundaries = getBoundaries(expression, flags);
    const expressionLength = expression.length - 1;
    const wordBoundaryIndexes = getIndexes(expression, WORD_BOUNDARY);
    const nonWordBoundaryIndexes = getIndexes(expression, NON_WORD_BOUNDARY);
    describe("multiline flag set", () => {
        it("should add start of line if ^ at the start of regex", () => {
            expect(boundaries).toHaveProperty(`0.type`, 'start_of_line');
            expect(boundaries).toHaveProperty(`0.startingIndex`, 0);
            expect(boundaries).toHaveProperty(`0.lastIndex`, 0);
            expect(boundaries).toHaveProperty(`0.group`, '^');
        });
        it("should add end of line if $ at the end of regex", () => {
            expect(boundaries).toHaveProperty(`${expressionLength}.type`, 'end_of_line');
            expect(boundaries).toHaveProperty(`${expressionLength}.startingIndex`, expressionLength);
            expect(boundaries).toHaveProperty(`${expressionLength}.lastIndex`, expressionLength);
            expect(boundaries).toHaveProperty(`${expressionLength}.group`, "$");
        })
    })
    describe("multiline flag not set", () => {
        const { expression, flags } = splitRegex(/^[\S\W\B\D](\w+\n\v)((?:[\w,\d]+\b\s){5})\n\r\t((?:[\w,\d]+\b\s){7})\t((?:(?:[\w\d]+,?)[\s\b]?){5})\f.\x45$/g)
        const boundaries = getBoundaries(expression, flags);
        const expressionLength = expression.length - 1;
        it("should add start of string if ^ at the start of regex and multiline flag not set", () => {
            expect(boundaries).toHaveProperty(`0.type`, 'start_of_string');
            expect(boundaries).toHaveProperty(`0.startingIndex`, 0);
            expect(boundaries).toHaveProperty(`0.lastIndex`, 0);
            expect(boundaries).toHaveProperty(`0.group`, '^');
        })
        it("should add end of string if $ at the end of regex", () => {
            expect(boundaries).toHaveProperty(`${expressionLength}.type`, 'end_of_string');
            expect(boundaries).toHaveProperty(`${expressionLength}.startingIndex`, expressionLength);
            expect(boundaries).toHaveProperty(`${expressionLength}.lastIndex`, expressionLength);
            expect(boundaries).toHaveProperty(`${expressionLength}.group`, "$");
        })
    })
    it("should add word boundaries", () => {
        expect(boundaries).toHaveProperty(`${wordBoundaryIndexes[0]}.type`, 'word_boundary')
        expect(boundaries).toHaveProperty(`${wordBoundaryIndexes[0]}.startingIndex`, 32);
        expect(boundaries).toHaveProperty(`${wordBoundaryIndexes[0]}.lastIndex`, 33);
        expect(boundaries).toHaveProperty(`${wordBoundaryIndexes[0]}.group`, '\\b')
    })
    it("should add non-word boundaries", () => {
        expect(boundaries).toHaveProperty(`${nonWordBoundaryIndexes[0]}.type`, 'non_word_boundary')
        expect(boundaries).toHaveProperty(`${nonWordBoundaryIndexes[0]}.startingIndex`, 6);
        expect(boundaries).toHaveProperty(`${nonWordBoundaryIndexes[0]}.lastIndex`, 7);
        expect(boundaries).toHaveProperty(`${nonWordBoundaryIndexes[0]}.group`, '\\B')
    })

})