const { POSITIVE_LOOKAHEAD, NEGATIVE_LOOKAHEAD, POSITIVE_LOOKBEHIND, NEGATIVE_LOOKBEHIND } = require("../utils/regexes.js");
const { getParenStack } = require("../utils/getParenStack.js");
const { findKey } = require("../utils/findKey.js");

module.exports = {
    getLooks: (string) => {
        const looks = {};
        getParenStack(string).forEach(({group, startingIndex, lastIndex}) => {
            const positive_lookbehind = group.match(POSITIVE_LOOKBEHIND);
            const positive_lookahead = group.match(POSITIVE_LOOKAHEAD);
            const negative_lookbehind = group.match(NEGATIVE_LOOKBEHIND);
            const negative_lookahead = group.match(NEGATIVE_LOOKAHEAD);
            
            if (positive_lookbehind || positive_lookahead || negative_lookbehind || negative_lookahead) {
                looks[startingIndex] = {
                    ...(positive_lookahead && { type: 'positive_lookahead', group: positive_lookahead['groups']['positive_lookahead'], match: positive_lookahead['groups']['pos_lookahead'], startingIndex, lastIndex }),
                    ...(positive_lookbehind && { type: 'positive_lookbehind', group: positive_lookbehind['groups']['positive_lookbehind'], match: positive_lookbehind['groups']['pos_lookbehind'], startingIndex, lastIndex }),
                    ...(negative_lookbehind && { type: 'negative_lookbehind', group: negative_lookbehind['groups']['negative_lookbehind'], match: negative_lookbehind['groups']['neg_lookbehind'], startingIndex, lastIndex }),
                    ...(negative_lookahead && { type: 'negative_lookahead', group: negative_lookahead['groups']['negative_lookahead'], match: negative_lookahead['groups']['neg_lookahead'], startingIndex, lastIndex })
                }
            }

        })
        return looks;
    }
}