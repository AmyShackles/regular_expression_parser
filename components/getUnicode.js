module.exports = {
    getUnicode: (string, flags) => {
        const bracesPossible = flags.includes('u');
        const unicodeRegex = bracesPossible ? /(?:\\\u\{)(?<unicode>[\da-fA-F]{4,5})(?:\})/g : /(?:\\\u)(?<unicode>[\da-fA-F]{4})/g;
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