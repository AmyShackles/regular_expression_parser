const { NON_GREEDY_QUANTIFIER, GREEDY_QUANTIFIER } = require("../utils/regexes.js");


module.exports = {
    getQuantifiers: (string, flags) => {
        const quantString = NON_GREEDY_QUANTIFIER + "|" + GREEDY_QUANTIFIER;
        const quantRegex = new RegExp(quantString, 'g');
        let quantifiers = {};

        [...string.matchAll(quantRegex)].forEach((regex) => {
            const { groups } = regex;
            let key = groups.nongreedy_quantifier ? "nongreedy_quantifier" : "greedy_quantifier";
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            let group = groups[key];
            group = group.split(",");
            const min = group[0];
            const max = group[1];
            quantifiers[startingIndex] = {
                [key]: {
                    startingIndex,
                    endingIndex,
                    group,
                    min,
                    ...(max ? { max } : {})
                }
            };
        });

        return quantifiers;
    }
}