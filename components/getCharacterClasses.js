module.exports = {
    getCharacterClasses: (string) => {
        const characterClassRegex = /(?<digit>\\d)|(?<non_digit>\\D)|(?<alphanumeric>\\w)|(?<non_alphanumeric>\\W)|(?<whitespace>\\s)|(?<non_whitespace>\\S)|(?<horizontal_tab>\\t)|(?<carriage_return>\\r)|(?<linefeed>\\n)|(?<vertical_tab>\\v)|(?<form_feed>\\f)|(?<backspace>\[\\b.*?\])|(?<NUL>\\0)|(?<control_character>\\c[A-Z])/g;
        const characterClasses = {};
        [...string.matchAll(characterClassRegex)].forEach((regex) => {
            let key;
            if (regex.groups.digit) {
                key = "digit";
            } else if (regex.groups.non_digit) {
                key = "non_digit";
            } else if (regex.groups.alphanumeric) {
                key = "alphanumeric";
            } else if (regex.groups.non_alphanumeric) {
                key = "non_alphanumeric";
            } else if (regex.groups.whitespace) {
                key = "whitespace";
            } else if (regex.groups.non_whitespace) {
                key = "non-whitespace";
            } else if (regex.groups.horizontal_tab) {
                key = "horizontal_tab";
            } else if (regex.groups.carriage_return) {
                key = "carriage_return";
            } else if (regex.groups.linefeed) {
                key = "linefeed";
            } else if (regex.groups.vertical_tab) {
                key = "vertical_tab";
            } else if (regex.groups.form_feed) {
                key = "form_feed";
            } else if (regex.groups.backspace) {
                key = "backspace";
            } else if (regex.groups.NUL) {
                key = "NUL";
            } else if (regex.groups.control_character) {
                key = "control_character";
            }

            const { groups } = regex;
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;
            let group = groups[key];
            if (key === "control_character") {
                // We need to calculate the value of the character relative to A
                let codepoint = group.slice(2).charCodeAt(0) - "A".charCodeAt(0);
                // A starts at 1, so 1 must be added to take offset into account
                group = String.fromCodePoint(codepoint + 1);
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
    }
}