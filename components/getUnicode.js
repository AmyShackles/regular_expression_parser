const { UNICODE_REGEX_IN_UNICODE_MODE, UNICODE_REGEX_NOT_IN_UNICODE_MODE } = require('../utils/regexes.js');

module.exports = {
    getUnicode: (string, flags) => {
        const unicodeRegex = flags.includes('u') ? UNICODE_REGEX_IN_UNICODE_MODE : UNICODE_REGEX_NOT_IN_UNICODE_MODE;
        const unicode = {};
        
        [...string.matchAll(unicodeRegex)].forEach((regex) => {
            let key = "unicode";
            const { groups } = regex;
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            const codepoint = parseInt(regex.groups.unicode, 16);
            const hex = String.fromCodePoint(codepoint);
            unicode[startingIndex] = {
                "unicode": {
                    startingIndex,
                    endingIndex,
                    hex
                }
            }
        });
        return unicode;
    }
}