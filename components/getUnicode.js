const { UNICODE_REGEX_IN_UNICODE_MODE, UNICODE_REGEX_NOT_IN_UNICODE_MODE } = require('../utils/regexes.js');

module.exports = {
    getUnicode: (string, flags) => {
        const unicodeRegex = flags.includes('u') ? new RegExp(UNICODE_REGEX_IN_UNICODE_MODE, 'g') : UNICODE_REGEX_NOT_IN_UNICODE_MODE;
        const unicode = {};
        
        [...string.matchAll(unicodeRegex)].forEach((regex) => {
            let key = "unicode";
            const { groups } = regex;
            const startingIndex = regex.index;
            // Subtract 1 from groups[key].length to get the last index of groups[key]
            const lastIndex = startingIndex + (groups[key].length - 1);
            // Get the hexadecimal values from unicode expression and parse them
            const group = groups.unicode;
            let hex = flags.includes('u') ? groups.hexadecimal : groups.hex;
            const codepoint = parseInt(hex, 16);
            hex = String.fromCodePoint(codepoint);
            unicode[startingIndex] = {
                    type: 'unicode',
                    startingIndex,
                    lastIndex,
                    group,
                    match: hex
                }
            }
        );
        return unicode;
    }
}