module.exports = {
    getQuantifiers: (string, flags) => {
        const unicodeMode = flags.includes('u');
        let quantRegex = unicodeMode ? /(?:[^u]\{)(?<quantifier>\d*,?\d*)(?:\})/g : /(?:\{)(?<quantifier>\d*,?\d*)(?:\})/g;
        let quantifiers = {};

        const quant = [...string.matchAll(quantRegex)].forEach((regex) => {
            let key = "quantifier";
            const { groups } = regex;
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            let group = regex.groups.quantifier;
            group = group.split(",");
            const min = group[0];
            const max = group[1];
            console.log(group)
            quantifiers[startingIndex] = {
                "quantifier": {
                    startingIndex,
                    endingIndex,
                    group,
                    min,
                    ...(max ? { max } : {})
                }
            };
        });

        return quantifiers;
    }
}