module.exports = {
    getUnicodePropertyEscapes: (string) => {
        const unicodePropertyEscapeRegex = /(?:\\\p\{)(?<unicode_property_escape>((?<unicode_name>.*?)(?:\=)(?<unicode_value>.*?))|(.*?))(?:\})|(?:\\\P\{)(?<negated_unicode_property_escape>((?<negated_unicode_name>.*?)(?:\=)(?<negated_unicode_value>.*?))|(.*?))(?:\})/g;
        const unicodePropertyEscapes = {};
        [...string.matchAll(unicodePropertyEscapeRegex)].forEach((regex) => {
            const { groups } = regex;
            const key = groups.unicode_property_escape ?  "unicode_property_escape" : "negated_unicode_property_escape";
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            let group;
            if (groups.unicode_property_escape) {
                if (groups.unicode_name) {
                    group = {
                        unicode_name: groups.unicode_name,
                        unicode_value: groups.unicode_value,
                        group: groups.unicode_property_escape
                    }
                } else {
                    group = {
                        group: groups.unicode_property_escape
                    }
                }
            } else {
                group = {
                    negated_unicode_name: groups.negated_unicode_name,
                    negated_unicode_value: groups.negated_unicode_value,
                    group: groups.negated_unicode_property_escape
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