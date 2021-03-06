const { getCharacterSets } = require("../components/getCharacterSets.js");
const { NEGATED_CHARACTER_SET, CHARACTER_SET } = require('../utils/regexes.js');
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getCharacterSets", () => {
    const { expression, flags } = splitRegex(/[123]|[^7]]/gm)
    const characterSets = getCharacterSets(expression, flags);
    const negatedCharacterSetIndexes = getIndexes(expression, NEGATED_CHARACTER_SET);
    const characterSetIndexes = getIndexes(expression, CHARACTER_SET);

    it("adds negated character sets", () => {
        expect(characterSets).toHaveProperty(`${negatedCharacterSetIndexes[0]}.type`, 'negated_character_set')
        expect(characterSets).toHaveProperty(`${negatedCharacterSetIndexes[0]}.startingIndex`, 6);
        expect(characterSets).toHaveProperty(`${negatedCharacterSetIndexes[0]}.lastIndex`, 9);
        expect(characterSets).toHaveProperty(`${negatedCharacterSetIndexes[0]}.group`, '[^7]')
        expect(characterSets).toHaveProperty(`${negatedCharacterSetIndexes[0]}.match`, '7')
    });
    it("adds character sets", () => {
        expect(characterSets).toHaveProperty(`${characterSetIndexes[0]}.type`, 'character_set');
        expect(characterSets).toHaveProperty(`${characterSetIndexes[0]}.startingIndex`, 0);
        expect(characterSets).toHaveProperty(`${characterSetIndexes[0]}.lastIndex`, 4);
        expect(characterSets).toHaveProperty(`${characterSetIndexes[0]}.group`, '[123]');
        expect(characterSets).toHaveProperty(`${characterSetIndexes[0]}.match`, '123')
    })
})