const { NON_GREEDY_RANGE_QUANTIFIER, GREEDY_RANGE_QUANTIFIER, GREEDY_OPTIONAL, NON_GREEDY_OPTIONAL, GREEDY_KLEENE_STAR, NON_GREEDY_KLEENE_STAR, GREEDY_KLEENE_PLUS, NON_GREEDY_KLEENE_PLUS } = require("../utils/regexes.js");
const { findKey } = require("../utils/findKey.js");

module.exports = {
    getQuantifiers: (string) => {
        const quantString = NON_GREEDY_RANGE_QUANTIFIER + "|" + GREEDY_RANGE_QUANTIFIER + "|" + GREEDY_OPTIONAL + "|" + NON_GREEDY_OPTIONAL + "|" + GREEDY_KLEENE_STAR + "|" + NON_GREEDY_KLEENE_STAR + "|" + GREEDY_KLEENE_PLUS + "|" + NON_GREEDY_KLEENE_PLUS;
        const quantRegex = new RegExp(quantString, 'g');
        let quantifiers = {};

        [...string.matchAll(quantRegex)].forEach((regex) => {
            const { groups } = regex;
            const key = findKey(groups);
            const nonGreedyRangeQuantifier = key.includes("non_greedy_range");
            let group = groups[key];
            const startingIndex = regex.index;
            const lastIndex = startingIndex + (group.length - 1)
            let min, max;
            // Logic for ranges to add min and max values to key
            if (key.includes("range")) {
                // The range capture includes the braces in order to get the right endIndex
                // We want to remove those (and the ? if it's a non-greedy range)
                // So that we can split by comma to get the min and max values
                let range = nonGreedyRangeQuantifier ? group.slice(1, -2) : group.slice(1, -1);
                if (range.includes(',')) {
                    range = range.split(',');
                    min = +range[0];
                    max = +range[1];
                } else {
                    min = +range;
                }
            }

            quantifiers[startingIndex] = {
                [key]: {
                    startingIndex,
                    lastIndex,
                    group,
                    min,
                    ...(max ? { max } : {})
                }
            };
        });
        return quantifiers;
    }
}