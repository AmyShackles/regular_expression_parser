const { ALTERNATION, NAMED_BACKREFERENCE, NUMERICAL_BACKREFERENCE, RANGE } = require("../utils/regexes.js");
const { findKey } = require("../utils/findKey.js");

module.exports = {
    getGroupsAndRanges: (string) => {
        const groupsAndRangesString = ALTERNATION + "|" + NAMED_BACKREFERENCE + "|" + NUMERICAL_BACKREFERENCE + "|" + RANGE;
        const groupsAndRangeRegex = new RegExp(groupsAndRangesString, 'g');
        const groupsAndRanges = {};

        [...string.matchAll(groupsAndRangeRegex)].forEach(regex => {
            const { groups } = regex;
            const key = groups.alternation ? "alternation" : groups.named_backreference ? "named_backreference" : groups.numerical_backreference ? "numerical_backreference" : "range";
            const startingIndex = regex.index;
            const lastIndex = startingIndex + (groups[key].length - 1);

            if (key === "alternation") {
                groupsAndRanges[startingIndex] = {
                        type:  "alternation",
                        startingIndex,
                        lastIndex,
                        group: groups.alternation
                };
            } else if (key === "named_backreference") {
                groupsAndRanges[startingIndex] = {
                        type: "named_backreference",
                        startingIndex,
                        lastIndex,
                        group: groups.named_backreference,
                        name: groups.name
                };
            } else if (key === "numerical_backreference") {
                groupsAndRanges[startingIndex] = {
                        type: 'numerical_backreference',
                        startingIndex,
                        lastIndex,
                        group: groups.numerical_backreference,
                        match: groups.numerical_backreference.slice(1) // We only care about the number
                }
            } else {
                // This is so we can separate the start and end of range
                const group = groups.range.split('-');
                groupsAndRanges[startingIndex] = {
                        type: 'range',
                        startingIndex,
                        lastIndex,
                        group: groups.range,
                        rangeStart: group[0],
                        rangeEnd: group[1]
                    }
                };
            }
        );
        return groupsAndRanges;
    }
}