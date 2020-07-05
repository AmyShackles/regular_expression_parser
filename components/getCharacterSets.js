const { NEGATED_CHARACTER_SET, CHARACTER_SET } = require('../utils/regexes.js');

module.exports = {
    getCharacterSets: (string) => {
        const characterSetString = NEGATED_CHARACTER_SET + "|" + CHARACTER_SET;
        const characterSetRegex = new RegExp(characterSetString, 'g');
        const characterSets = {};

        [...string.matchAll(characterSetRegex)].forEach((regex) => {
            const { groups } = regex;
            let key = groups.negated_character_set ? "negated_character_set" : "character_set";

            const startingIndex = regex.index;
            const group = groups[key]
            // Starting index is from start of character set, not content of character set
            // Subtract 1 from group[key].length to get last index of that range,
            // Add two to account for brackets
            // Add 1 more for negated character sets since the ^ character isn't included in group
            const endingIndex = startingIndex + (group.length - 1) + (key === "negated_character_set" ? 3 : 2);

            characterSets[startingIndex] = {
                [key]: {
                    startingIndex,
                    endingIndex,
                    group
                }
            }
        });
        return characterSets;
    }
}