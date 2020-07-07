const { START_OF_LINE, START_OF_STRING, END_OF_LINE, END_OF_STRING, WORD_BOUNDARY, NON_WORD_BOUNDARY } = require('../utils/regexes');
const { findKey } = require('../utils/findKey');

module.exports = {
    getBoundaries: (string, flags) => {
        const boundaryString = (flags.includes("m") ? START_OF_LINE + "|" + END_OF_LINE : START_OF_STRING + "|" + END_OF_STRING) + "|" + WORD_BOUNDARY + "|" + NON_WORD_BOUNDARY;
        const boundaryRegex = new RegExp(boundaryString, 'g');
        const boundaries = {};

        [...string.matchAll(boundaryRegex)].forEach(regex => {
            const { groups } = regex;
            const key = findKey(groups);
            const group = groups[key];
            const startingIndex = regex.index;
            const lastIndex = startingIndex + (group.length - 1);

            boundaries[startingIndex] = {
                [key]: {
                    startingIndex,
                    lastIndex,
                    group
                }
            }
        });
        return boundaries;
    }
}
