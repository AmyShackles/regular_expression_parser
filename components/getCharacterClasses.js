module.exports = {
    getCharacterClasses: (string, flags) => {
        const dotAllMode = flags.includes("s");
        const characterClassRegex = dotAllMode ? /(?<digit>\\d)|(?<non_digit>\\D)|(?<alphanumeric>\\w)|(?<non_alphanumeric>\\W)|(?<whitespace>\\s)|(?<non_whitespace>\\S)|(?<horizontal_tab>\\t)|(?<carriage_return>\\r)|(?<linefeed>\\n)|(?<vertical_tab>\\v)|(?<form_feed>\\f)|(?<backspace>\[\\b.*?\])|(?<NUL>\\0)|(?<control_character>\\c[A-Z])|(?:\\x)(?<hex>[\dA-Fa-f]{2})|(?<!\\)(?<dotAll>\.)/g : /(?<digit>\\d)|(?<non_digit>\\D)|(?<alphanumeric>\\w)|(?<non_alphanumeric>\\W)|(?<whitespace>\\s)|(?<non_whitespace>\\S)|(?<horizontal_tab>\\t)|(?<carriage_return>\\r)|(?<linefeed>\\n)|(?<vertical_tab>\\v)|(?<form_feed>\\f)|(?<backspace>\[\\b.*?\])|(?<NUL>\\0)|(?<control_character>\\c[A-Z])|(?:\\x)(?<hex>[\dA-Fa-f]{2})|(?<!\\)(?<dot>\.)/g;
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