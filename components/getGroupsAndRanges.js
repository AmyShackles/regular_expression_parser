const { ALTERNATION, NAMED_BACKREFERENCE, NUMERICAL_BACKREFERENCE, RANGE } = require("../utils/regexes.js");
const { findKey } = require("../utils/findKey.js");

module.exports = {
    getGroupsAndRanges: (string) => {
        const groupsAndRangesString = ALTERNATION + "|" + NAMED_BACKREFERENCE + "|" + NUMERICAL_BACKREFERENCE + "|" + RANGE;
        const groupsAndRangeRegex = new RegExp(groupsAndRangesString, 'g');
        const groupsAndRanges = {};

        [...string.matchAll(groupsAndRangeRegex)].forEach(regex => {
            const { groups } = regex;
            const key = groups.alternation ? "alternation" : groups.named_backreference ? "named_backreference" : groups.numerical_backreference ? "numerical_backreference" : groups.range ? "range" : "";
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;

            switch (key) {
                case "alternation":
                    groupsAndRanges[startingIndex] = {
                        "alternation": {
                            startingIndex,
                            endingIndex,
                            group: groups.alternation
                        }
                    };
                    break;
                case "named_backreference":
                    groupsAndRanges[startingIndex] = {
                        "named_backreference": {
                            startingIndex,
                            endingIndex,
                            group: groups.named_backreference,
                            name: groups.name
                        }
                    };
                    break;
                case "numerical_backreference":
                    groupsAndRanges[startingIndex] = {
                        "numerical_backreference": {
                            startingIndex,
                            endingIndex,
                            group: groups.numerical_backreference.slice(1) // We only care about the number
                        }
                    };
                    break;
                case "range":
                    // This is so we can separate the start and end of range
                    const group = groups.range.split('-');
                    groupsAndRanges[startingIndex] = {
                        "range": {
                            startingIndex,
                            endingIndex,
                            group: groups.range,
                            rangeStart: group[0],
                            rangeEnd: group[1]
                        }
                    };
                    break;
                default:
                    break;
            }
        });
        return groupsAndRanges;
    }
}