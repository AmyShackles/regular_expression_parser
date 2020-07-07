const { UNICODE_PROPERTY_ESCAPE, NEGATED_UNICODE_PROPERTY_ESCAPE } = require("../utils/regexes.js");

module.exports = {
    getUnicodePropertyEscapes: (string) => {
        const unicodePropertyEscapeString = UNICODE_PROPERTY_ESCAPE + "|" + NEGATED_UNICODE_PROPERTY_ESCAPE;
        const unicodePropertyEscapeRegex = new RegExp(unicodePropertyEscapeString, 'g');
        const unicodePropertyEscapes = {};
        
        [...string.matchAll(unicodePropertyEscapeRegex)].forEach((regex) => {
            const { groups } = regex;
            const key = groups.unicode_property_escape ?  "unicode_property_escape" : "negated_unicode_property_escape";
            const startingIndex = regex.index;
            const lastIndex = startingIndex + groups[key].length - 1;
            let group;

            if (groups.unicode_property_escape) {
                    group = {
                        unicode_name: groups.unicode_name,
                        ...(groups.unicode_value ? { unicode_value: groups.unicode_value } : {}),
                        group: groups.unicode_property_escape
                    }; 
            } else {
                group = {
                    negated_unicode_name: groups.negated_unicode_name,
                    ...(groups.negated_unicode_value ? { negated_unicode_value: groups.negated_unicode_value } : {}),
                    group: groups.negated_unicode_property_escape
                }
            }
            unicodePropertyEscapes[startingIndex] = {
                [key]: {
                    startingIndex,
                    lastIndex,
                    ...group
                }
            }
        });
        return unicodePropertyEscapes;
    }
}