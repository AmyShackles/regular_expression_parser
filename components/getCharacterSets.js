module.exports = {
    getCharacterSets: (string) => {
        const characterSetRegex = /(?:\[)(?<character_set>.*?)(?:\])/g;
        const characterSets = {};

        [...string.matchAll(characterSetRegex)].forEach((regex) => {
            let key = "character_set";
            const { groups } = regex;
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            const group = regex.groups.character_set;
            characterSets[startingIndex] = {
                "character_set": {
                    startingIndex,
                    endingIndex,
                    group
                }
            }
        });
        return characterSets;
    }
}