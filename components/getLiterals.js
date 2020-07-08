const { LITERAL } = require("../utils/regexes");

module.exports = {
    getLiterals: (string, parsedObject) => {
        const literalRegex = new RegExp(LITERAL, 'g');
        const seen = [];
        const seenArray = Object.values(parsedObject);
        seenArray.forEach(({startingIndex, lastIndex}) => {
            for (startingIndex; startingIndex <= lastIndex; startingIndex++) {
                seen[startingIndex] = true;
            }
        });
        [...string.matchAll(literalRegex)].forEach(regex => {
            const { groups } = regex;
            const key = "literal"
            const group = groups[key];
            const startingIndex = regex.index;
            const lastIndex = startingIndex + (group.length - 1);
            if (seen[startingIndex] === undefined) {
                parsedObject[startingIndex] = {
                    type: key,
                    startingIndex,
                    lastIndex,
                    group
                }
            }
        });
        return parsedObject;
    }
}
