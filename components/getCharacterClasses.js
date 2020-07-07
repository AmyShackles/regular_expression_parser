const { DIGIT, NON_DIGIT, ALPHANUMERIC, NON_ALPHANUMERIC, WHITESPACE, NON_WHITESPACE, HORIZONTAL_TAB, CARRIAGE_RETURN, LINEFEED, VERTICAL_TAB, FORM_FEED, BACKSPACE, NUL, CONTROL_CHARACTER, HEX, DOTALL, DOT } = require('../utils/regexes.js');
const { findKey } = require("../utils/findKey.js");

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
            const lastIndex = startingIndex + (group.length - 1);
            let control;
            let hex;
            if (groups.control_character) {
                // We need to calculate the value of the character relative to A
                let codepoint = groups.control_character.slice(2).charCodeAt(0) - "A".charCodeAt(0);
                // A starts at 1, so 1 must be added to take offset into account
                control = String.fromCodePoint(codepoint + 1);
            } else if (groups.hex) {
                // Convert string hex to hex number to eval
                hex = groups.hex.slice(2)
                const codepoint = parseInt(hex, 16);
                hex = String.fromCodePoint(codepoint)
            }
            const match = groups.control_character ? control : groups.hex ? hex : ''
            characterClasses[startingIndex] = {
                    type: key,
                    startingIndex,
                    lastIndex,
                    group,
                    ...(match && { match })
                }
            }
        )
        return characterClasses;
    }
}

