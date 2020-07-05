const { UNICODE_REGEX_IN_UNICODE_MODE, UNICODE_REGEX_NOT_IN_UNICODE_MODE } = require('../utils/regexes.js');

module.exports = {
    getUnicode: (string, flags) => {
        const unicodeRegex = flags.includes('u') ? UNICODE_REGEX_IN_UNICODE_MODE : UNICODE_REGEX_NOT_IN_UNICODE_MODE;
        const unicode = {};
        
        [...string.matchAll(unicodeRegex)].forEach((regex) => {
            let key = "unicode";
            const { groups } = regex;
            const startingIndex = regex.index;
            // Subtract 1 from groups[key].length to get the last index of groups[key]
            const endingIndex = startingIndex + (groups[key].length - 1);
            // Get the hexadecimal values from unicode expression and parse them
            const group = groups.unicode.includes('{') ? groups.unicode.slice(3, -1) : groups.unicode.slice(2);
            const codepoint = parseInt(group, 16);
            const hex = String.fromCodePoint(codepoint);
            unicode[startingIndex] = {
                "unicode": {
                    startingIndex,
                    endingIndex,
                    group: hex
                }
            }
        });
        return unicode;
    }
}