module.exports = {
    getCharacterSets: (string) => {
        const characterSetRegex = /(?:\[\^)(?<negated_character_set>.*?)(?:\])|(?:\[)(?<character_set>.*?)(?:\])/g;
        const characterSets = {};

        [...string.matchAll(characterSetRegex)].forEach((regex) => {
            let key = regex.groups.negated_character_set ? "negated_character_set" : "character_set";
            const { groups } = regex;
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            const group = regex.groups[key];
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