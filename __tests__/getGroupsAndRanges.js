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
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.type`)
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.startingIndex`, 50);
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.lastIndex`, 50);
        expect(groupsAndRanges).toHaveProperty(`${alternationIndexes[0]}.group`, '|')
    });
    it("should add named backreferences", () => {
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.type`, 'named_backreference')
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.startingIndex`, 35);
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.lastIndex`, 45);
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes[0]}.group`, '\\k<letters>');
        expect(groupsAndRanges).toHaveProperty(`${namedBackreferenceIndexes}.name`, 'letters')
    });
    it("should add numerical backreferences", () => {
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.type`, `numerical_backreference`)
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.startingIndex`, 48);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.lastIndex`, 49);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.group`, '\\2');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[0]}.match`, '2');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.type`, 'numerical_backreference')
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.startingIndex`, 86);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.lastIndex`, 87);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.group`, '\\1');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[1]}.match`, '1');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.type`, 'numerical_backreference')
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.startingIndex`, 90);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.lastIndex`, 91);
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.group`, '\\2');
        expect(groupsAndRanges).toHaveProperty(`${numericalBackreferenceIndexes[2]}.match`, '2');
    });
    it("should add ranges", () => {
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.type`, 'range')
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.startingIndex`, 53);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.lastIndex`, 55);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.group`, 'A-C');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.rangeStart`, 'A');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[0]}.rangeEnd`, 'C');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.type`, 'range')
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.startingIndex`, 76);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.lastIndex`, 78);
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.group`, '1-3');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.rangeStart`, '1');
        expect(groupsAndRanges).toHaveProperty(`${rangeIndexes[1]}.rangeEnd`, '3');
    })
})