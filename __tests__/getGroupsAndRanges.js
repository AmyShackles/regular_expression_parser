const { getGroupsAndRanges } = require("../components/getGroupsAndRanges.js");
const { ALTERNATION, NAMED_BACKREFERENCE, NUMERICAL_BACKREFERENCE, RANGE } = require("../utils/regexes");
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");

describe("getGroupsAndRanges", () => {
    const { expression } = splitRegex(/(?<letters>ABC), as easy as (123), \k<letters>, \2|([A-C]{3}), as easy as ([1-3]{3}), \1, \2/g);
    const alternationIndexes = getIndexes(expression, ALTERNATION);
    const namedBackreferenceIndexes = getIndexes(expression, NAMED_BACKREFERENCE);
    const numericalBackreferenceIndexes = getIndexes(expression, NUMERICAL_BACKREFERENCE);
    const rangeIndexes = getIndexes(expression, RANGE);
    const groupsAndRanges = getGroupsAndRanges(expression);

    it("should add alternations", () => {
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.alternation`)
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.alternation.startingIndex`, 50);
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.alternation.endingIndex`, 51);
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.alternation.group`, '|')
    });
    it("should add named backreferences", () => {
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.named_backreference`)
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.named_backreference.startingIndex`, 35);
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.named_backreference.endingIndex`, 46);
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.named_backreference.group`, '\\k<letters>');
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes}.named_backreference.name`, 'letters')
    });
    it("should add numerical backreferences", () => {
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.numerical_backreference`)
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.numerical_backreference.startingIndex`, 48);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.numerical_backreference.endingIndex`, 50);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.numerical_backreference.group`, '2');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.numerical_backreference`)
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.numerical_backreference.startingIndex`, 86);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.numerical_backreference.endingIndex`, 88);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.numerical_backreference.group`, '1');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.numerical_backreference`)
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.numerical_backreference.startingIndex`, 90);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.numerical_backreference.endingIndex`, 92);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.numerical_backreference.group`, '2');
    });
    it("should add ranges", () => {
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.range`)
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.range.startingIndex`, 53);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.range.endingIndex`, 56);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.range.group`, 'A-C');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.range.rangeStart`, 'A');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.range.rangeEnd`, 'C');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.range`)
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.range.startingIndex`, 76);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.range.endingIndex`, 79);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.range.group`, '1-3');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.range.rangeStart`, '1');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.range.rangeEnd`, '3');
    })
})