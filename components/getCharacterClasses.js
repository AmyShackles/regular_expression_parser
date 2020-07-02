const { DIGIT, NON_DIGIT, ALPHANUMERIC, NON_ALPHANUMERIC, WHITESPACE, NON_WHITESPACE, HORIZONTAL_TAB, CARRIAGE_RETURN, LINEFEED, VERTICAL_TAB, FORM_FEED, BACKSPACE, NUL, CONTROL_CHARACTER, HEX, DOTALL, DOT } = require('../utils/regexes.js');

module.exports = {
    getCharacterClasses: (string, flags) => {
        const characterClassString = DIGIT + "|" + NON_DIGIT+ "|" + ALPHANUMERIC + "|" + NON_ALPHANUMERIC + "|" + WHITESPACE + "|" + NON_WHITESPACE+ "|" + HORIZONTAL_TAB + "|" + CARRIAGE_RETURN + "|" + LINEFEED + "|" + VERTICAL_TAB + "|" + FORM_FEED + "|" + BACKSPACE + "|" + NUL + "|" + CONTROL_CHARACTER + "|" + HEX + "|" + (flags.includes("s") ? DOTALL : DOT);
        const characterClassRegex = new RegExp(characterClassString, 'g');
        const characterClasses = {};
        
        [...string.matchAll(characterClassRegex)].forEach((regex) => {
            const { groups } = regex;
            const key = findKey(groups);
            let group = groups[key];
            const startingIndex = regex.index;
            const endingIndex = startingIndex + group.length;
            if (groups.control_character) {
                // We need to calculate the value of the character relative to A
                let codepoint = groups.control_character.slice(2).charCodeAt(0) - "A".charCodeAt(0);
                // A starts at 1, so 1 must be added to take offset into account
                group = String.fromCodePoint(codepoint + 1);
            } else if (groups.hex) {
                // Convert string hex to hex number to eval
                const codepoint = parseInt(groups.hex, 16);
                group = String.fromCodePoint(codepoint)
            }
            characterClasses[startingIndex] = {
                [key]: {
                    startingIndex,
                    endingIndex,
                    group
                }
            };
        })
        return characterClasses;
    },
    findKey: (reg) => {
        let groupKey;
        Object.entries(reg).forEach(([key, value]) => {
            if (!!value) {
                groupKey = key;
            }
        });
        return groupKey;
    }
}

function findKey(reg) {
    // Since only one group will match at a time
    // We just need to find the group with a value
    let groupKey;
    Object.entries(reg).forEach(([key, value]) => {
        if (!!value) {
            groupKey = key;
        }
    })
    return groupKey;
}