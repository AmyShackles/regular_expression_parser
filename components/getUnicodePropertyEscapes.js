module.exports = {
    getUnicodePropertyEscapes: (string) => {
        const unicodePropertyEscapeRegex = /(?:\\\p\{)(?<unicode_name_and_value>(?<unicode_name>.*?)(?:\=)(?<unicode_value>.*?))(?:\})|(?:\\\p\{)(?<unicode_name_or_value>.*?)(?:\})|(?:\\\P\{)(?<negated_unicode_name_or_value>.*?)(?:\})/g;
        const unicodePropertyEscapes = {};
        [...string.matchAll(unicodePropertyEscapeRegex)].forEach((regex) => {
            const { groups } = regex;
            const key = groups.unicode_name_and_value? "unicode_name_and_value" : groups.unicode_name_or_value ? "unicode_name_or_value" : "negated_unicode_name_or_value"
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            let group;
            if (groups.unicode_name_and_value) {
                group = {
                    unicode_name: groups.unicode_name,
                    unicode_value: groups.unicode_value,
                    group: groups.unicode_name_and_value
                }
            } else if (groups.unicode_name_or_value) {
                group = {
                    group: groups.unicode_name_or_alue
                }
            } else {
                group = {
                    group: groups.negated_unicode_name_or_value
                }
            }
            unicodePropertyEscapes[startingIndex] = {
                [key]: {
                    startingIndex,
                    endingIndex,
                    group
                }
            }
        });
        return unicodePropertyEscapes;
    }
}