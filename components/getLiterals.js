const { LITERAL } = require("../utils/regexes");
const { getParenStack } = require("../utils/getParenStack.js");

module.exports = {
    getLiterals: (string) => {
        const validNumericalBackreferences = getParenStack(string);
        let numericalReferences = [];
        validNumericalBackreferences.forEach((_, index) => {
            numericalReferences.push(index + 1);
        });
        numericalReferences = "(" + numericalReferences.join("|") + ")";
        const literalRegex = new RegExp(
            `(?<nonLiteral>\\\\(?:[wWbBdDsStrnvf0]|x[a-f0-9]{2}|u[a-f0-9]{4}|u\\{[a-f0-9]{1,5}\\})|\\[(?<set>.*?)\\]|(?<unicode_property_escape>\\\\[pP]\\{(?<unicode_name>\\w*)(?:\\=?)(?<negated_unicode_value>\\w*?)?\\})|(?<!\\\\u)(?<range_quantifier>\\{\\d*,?\\d*\\}\\??)|\\\\c[a-zA-Z]|\\\\${numericalReferences}|(\\\\k)?<\\w+>)|(?<literal>[\\w\\s.]+)`,
            "g"
        );
        const literals = {};
        [...string.matchAll(literalRegex)].forEach((regex) => {
            const { groups } = regex;
            const group = groups['literal'] || groups['nonLiteral'];
            const startingIndex = regex.index;
            const lastIndex = startingIndex + (group.length - 1);
            console.log({nonLiteral: groups['nonLiteral']})
            if (groups['literal']) {
                literals[startingIndex] = {
                type: 'literal',
                startingIndex,
                lastIndex,
                group,
            };
        }
        });
        return literals;
    },
};
