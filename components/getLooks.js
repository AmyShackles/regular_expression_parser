const { POSITIVE_LOOKAHEAD, NEGATIVE_LOOKAHEAD, POSITIVE_LOOKBEHIND, NEGATIVE_LOOKBEHIND } = require("../utils/regexes.js");
const { findKey } = require("../utils/findKey.js");

module.exports = {
    getLooks: (string) => {
        const lookString = POSITIVE_LOOKAHEAD + "|" + NEGATIVE_LOOKAHEAD + "|" + POSITIVE_LOOKBEHIND + "|" + NEGATIVE_LOOKBEHIND;
        const lookRegex = new RegExp(lookString, 'g');
        const looks = {};

        [...string.matchAll(lookRegex)].forEach((regex) => {
            const { groups } = regex;
            const key = findKey(groups);
            const group = groups[key];
            const startingIndex = regex.index;
            const endingIndex = startingIndex + group.length;

            looks[startingIndex] = {
                [key]: {
                    startingIndex,
                    endingIndex,
                    group
                }
            }
        });
        return looks;
    }
}