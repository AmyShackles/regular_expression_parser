const { getQuantifiers } = require('../components/getQuantifiers.js');
const { GREEDY_RANGE_QUANTIFIER, NON_GREEDY_RANGE_QUANTIFIER, GREEDY_OPTIONAL, NON_GREEDY_OPTIONAL, GREEDY_KLEENE_STAR, NON_GREEDY_KLEENE_STAR, GREEDY_KLEENE_PLUS, NON_GREEDY_KLEENE_PLUS } = require("../utils/regexes.js");
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getQuantifiers", () => {
    const { expression } = splitRegex(/(.+?)((?:[\\w,\\d]+\\b\\s){5}?)\\n\\r\\t((?:[\\w,\\d]*\\b\\s){7})\\t((?:(?:[\\w\\d]+,?)[\\s\\b]??){5,12}).*?.{0,3}?/g);
    const greedyRangeQuantifierIndexes = getIndexes(expression, GREEDY_RANGE_QUANTIFIER);
    const nonGreedyRangeQuantifierIndexes = getIndexes(expression, NON_GREEDY_RANGE_QUANTIFIER);
    const greedyOptionalIndexes = getIndexes(expression, GREEDY_OPTIONAL);
    const nonGreedyOptionalIndexes = getIndexes(expression, NON_GREEDY_OPTIONAL);
    const greedyKleeneStarIndexes = getIndexes(expression, GREEDY_KLEENE_STAR);
    const nonGreedyKleeneStarIndexes = getIndexes(expression, NON_GREEDY_KLEENE_STAR);
    const greedyKleenePlusIndexes = getIndexes(expression, GREEDY_KLEENE_PLUS);
    const nonGreedyKleenePlusIndexes = getIndexes(expression, NON_GREEDY_KLEENE_PLUS);
    const quantifiers = getQuantifiers(expression);
    it("should add greedy range quantifiers", () => {
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[0]}.greedy_range_quantifier`);
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[0]}.greedy_range_quantifier.startingIndex`, 61);
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[0]}.greedy_range_quantifier.endingIndex`, 64);
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[0]}.greedy_range_quantifier.group`, '{7}');
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[0]}.greedy_range_quantifier.min`, '7');
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[1]}.greedy_range_quantifier`);
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[1]}.greedy_range_quantifier.startingIndex`, 98);
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[1]}.greedy_range_quantifier.endingIndex`, 104);
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[1]}.greedy_range_quantifier.group`, '{5,12}');
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[1]}.greedy_range_quantifier.min`, '5');
        expect(quantifiers).toHaveProperty(`${greedyRangeQuantifierIndexes[1]}.greedy_range_quantifier.max`, '12');
    });
    it("should add non-greedy range quantifiers", () => {
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[0]}.non_greedy_range_quantifier`);
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[0]}.non_greedy_range_quantifier.startingIndex`, 26);
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[0]}.non_greedy_range_quantifier.endingIndex`, 30);
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[0]}.non_greedy_range_quantifier.group`, '{5}?');
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[0]}.non_greedy_range_quantifier.min`, '5');
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[1]}.non_greedy_range_quantifier`);
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[1]}.non_greedy_range_quantifier.startingIndex`, 109);
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[1]}.non_greedy_range_quantifier.endingIndex`, 115);
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[1]}.non_greedy_range_quantifier.group`, '{0,3}?');
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[1]}.non_greedy_range_quantifier.min`, '0');
        expect(quantifiers).toHaveProperty(`${nonGreedyRangeQuantifierIndexes[1]}.non_greedy_range_quantifier.max`, '3');
    });
    it("should add greedy optionals", () => {
        expect(quantifiers).toHaveProperty(`${greedyOptionalIndexes[0]}.greedy_optional`);
        expect(quantifiers).toHaveProperty(`${greedyOptionalIndexes[0]}.greedy_optional.startingIndex`, 85);
        expect(quantifiers).toHaveProperty(`${greedyOptionalIndexes[0]}.greedy_optional.endingIndex`, 86);
        expect(quantifiers).toHaveProperty(`${greedyOptionalIndexes[0]}.greedy_optional.group`, '?');
    });
    it("should add non-greedy optionals", () => {
        expect(quantifiers).toHaveProperty(`${nonGreedyOptionalIndexes[0]}.non_greedy_optional`);
        expect(quantifiers).toHaveProperty(`${nonGreedyOptionalIndexes[0]}.non_greedy_optional.startingIndex`, 95);
        expect(quantifiers).toHaveProperty(`${nonGreedyOptionalIndexes[0]}.non_greedy_optional.endingIndex`, 97);
        expect(quantifiers).toHaveProperty(`${nonGreedyOptionalIndexes[0]}.non_greedy_optional.group`, '??');
    });
    it("should add greedy Kleene stars", () => {
        expect(quantifiers).toHaveProperty(`${greedyKleeneStarIndexes[0]}.greedy_kleene_star`);
        expect(quantifiers).toHaveProperty(`${greedyKleeneStarIndexes[0]}.greedy_kleene_star.startingIndex`, 53);
        expect(quantifiers).toHaveProperty(`${greedyKleeneStarIndexes[0]}.greedy_kleene_star.endingIndex`, 54);
        expect(quantifiers).toHaveProperty(`${greedyKleeneStarIndexes[0]}.greedy_kleene_star.group`, '*');
    });
    it("should add non-greedy Kleene stars", () => {
        expect(quantifiers).toHaveProperty(`${nonGreedyKleeneStarIndexes[0]}.non_greedy_kleene_star`);
        expect(quantifiers).toHaveProperty(`${nonGreedyKleeneStarIndexes[0]}.non_greedy_kleene_star.startingIndex`, 106);
        expect(quantifiers).toHaveProperty(`${nonGreedyKleeneStarIndexes[0]}.non_greedy_kleene_star.endingIndex`, 108);
        expect(quantifiers).toHaveProperty(`${nonGreedyKleeneStarIndexes[0]}.non_greedy_kleene_star.group`, '*?');
    });
    it("should add greedy Kleene pluses", () => {
        expect(quantifiers).toHaveProperty(`${greedyKleenePlusIndexes[0]}.greedy_kleene_plus`);
        expect(quantifiers).toHaveProperty(`${greedyKleenePlusIndexes[0]}.greedy_kleene_plus.startingIndex`, 18);
        expect(quantifiers).toHaveProperty(`${greedyKleenePlusIndexes[0]}.greedy_kleene_plus.endingIndex`, 19);
        expect(quantifiers).toHaveProperty(`${greedyKleenePlusIndexes[0]}.greedy_kleene_plus.group`, '+');
    });
    it("should add non-greedy Kleene pluses", () => {
        expect(quantifiers).toHaveProperty(`${nonGreedyKleenePlusIndexes[0]}.non_greedy_kleene_plus`);
        expect(quantifiers).toHaveProperty(`${nonGreedyKleenePlusIndexes[0]}.non_greedy_kleene_plus.startingIndex`, 2);
        expect(quantifiers).toHaveProperty(`${nonGreedyKleenePlusIndexes[0]}.non_greedy_kleene_plus.endingIndex`, 4);
        expect(quantifiers).toHaveProperty(`${nonGreedyKleenePlusIndexes[0]}.non_greedy_kleene_plus.group`, '+?');
    });
})