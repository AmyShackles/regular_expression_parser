const { getCharacterClasses } = require("../components/getCharacterClasses.js");
const { DIGIT, NON_DIGIT, ALPHANUMERIC, NON_ALPHANUMERIC, WHITESPACE, NON_WHITESPACE, 
    HORIZONTAL_TAB, CARRIAGE_RETURN, LINEFEED, 
    VERTICAL_TAB, FORM_FEED, BACKSPACE, 
    NUL, CONTROL_CHARACTER, HEX, DOTALL, DOT } = require('../utils/regexes.js');
const { splitRegex } = require("../components/splitRegex");
const { getIndexes } = require("../utils/getIndexes.js");


describe("getCharacterClasses", () => {
    const { expression, flags } = splitRegex(/^[\S\W\B\D](\w+\n\v)((?:[\w,\d]+\b\s){5})\n\r\t((?:[\w,\d]+\b\s){7})\t((?:(?:[\w\d]+,?)[\s\b]?){5})\cM\0[\b]\f.\x45/g)
    const digitIndexes = getIndexes(expression, DIGIT);
    const nonDigitIndexes = getIndexes(expression, NON_DIGIT);
    const alphanumericIndexes = getIndexes(expression, ALPHANUMERIC);
    const nonAlphanumericIndexes = getIndexes(expression, NON_ALPHANUMERIC);
    const whitespaceIndexes = getIndexes(expression, WHITESPACE);
    const nonWhitespaceIndexes = getIndexes(expression, NON_WHITESPACE);
    const horizontalTabIndexes = getIndexes(expression, HORIZONTAL_TAB);
    const carriageReturnIndexes = getIndexes(expression, CARRIAGE_RETURN);
    const lineFeedIndexes = getIndexes(expression, LINEFEED);
    const verticalTabIndexes = getIndexes(expression, VERTICAL_TAB);
    const formFeedIndexes = getIndexes(expression, FORM_FEED);
    const backspaceIndexes = getIndexes(expression, BACKSPACE);
    const nulIndexes = getIndexes(expression, NUL);
    const controlCharacterIndexes = getIndexes(expression, CONTROL_CHARACTER);
    const hexIndexes = getIndexes(expression, HEX);
    const characterClasses = getCharacterClasses(expression, flags);

        it("should add digits", () => {
            digitIndexes.forEach(digit => {
                expect(characterClasses).toHaveProperty(`${digit}.type`);
                expect(characterClasses).toHaveProperty(`${digit}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${digit}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${digit}.group`);
            });
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.type`, 'digit');
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.startingIndex`, 28);
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.lastIndex`, 29);
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.group`, '\\d');
        });
        it("should add non-digits", () => {
            nonDigitIndexes.forEach(nonDigit => {
                expect(characterClasses).toHaveProperty(`${nonDigit}.type`);
                expect(characterClasses).toHaveProperty(`${nonDigit}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nonDigit}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${nonDigit}.group`);
            });
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.type`, 'non_digit');
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.startingIndex`, 8);
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.lastIndex`, 9);
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.group`, '\\D');
        });
        it("should add alphanumerics", () => {
            alphanumericIndexes.forEach(alpha => {
                expect(characterClasses).toHaveProperty(`${alpha}.type`);
                expect(characterClasses).toHaveProperty(`${alpha}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${alpha}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${alpha}.group`);
            });
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.type`, 'alphanumeric');
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.startingIndex`, 12);
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.lastIndex`, 13);
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.group`, '\\w');
        })
        it("should add non-alphanumerics", () => {
            nonAlphanumericIndexes.forEach(nonAlpha => {
                expect(characterClasses).toHaveProperty(`${nonAlpha}.type`);
                expect(characterClasses).toHaveProperty(`${nonAlpha}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nonAlpha}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${nonAlpha}.group`);
            });
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.type`, 'non_alphanumeric');
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.startingIndex`, 4);
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.lastIndex`, 5);
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.group`, '\\W');
        });
        it("should add whitespaces", () => {
            whitespaceIndexes.forEach(whitespace => {
                expect(characterClasses).toHaveProperty(`${whitespace}.type`);
                expect(characterClasses).toHaveProperty(`${whitespace}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${whitespace}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${whitespace}.group`);
            });
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.type`, 'whitespace');
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.startingIndex`, 34);
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.lastIndex`, 35);
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.group`, '\\s');
        });
        it("should add non-whitespaces", () => {
            nonWhitespaceIndexes.forEach(nonWhitespace => {
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.type`);
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.group`);
            });
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.type`, 'non_whitespace');
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.startingIndex`, 2);
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.lastIndex`, 3);
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.group`, '\\S');
        });
        it("should add horizontal tabs", () => {
            horizontalTabIndexes.forEach(horizontalTab => {
                expect(characterClasses).toHaveProperty(`${horizontalTab}.type`);
                expect(characterClasses).toHaveProperty(`${horizontalTab}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${horizontalTab}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${horizontalTab}.group`);
            });
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.type`, 'horizontal_tab');
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.startingIndex`, 45);
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.lastIndex`, 46);
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.group`, '\\t');
        });
        it("should add carriage returns", () => {
            carriageReturnIndexes.forEach(carriageReturn => {
                expect(characterClasses).toHaveProperty(`${carriageReturn}.type`);
                expect(characterClasses).toHaveProperty(`${carriageReturn}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${carriageReturn}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${carriageReturn}.group`);
            });
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.type`, 'carriage_return');
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.startingIndex`, 43);
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.lastIndex`, 44);
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.group`, '\\r');
        });
        it("should add linefeeds", () => {
            lineFeedIndexes.forEach(lineFeed => {
                expect(characterClasses).toHaveProperty(`${lineFeed}.type`);
                expect(characterClasses).toHaveProperty(`${lineFeed}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${lineFeed}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${lineFeed}.group`);
            });
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.type`, 'linefeed');
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.startingIndex`, 15);
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.lastIndex`, 16);
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.group`, '\\n');
        });
        it("should add vertical tabs", () => {
            verticalTabIndexes.forEach(verticalTab => {
                expect(characterClasses).toHaveProperty(`${verticalTab}.type`);
                expect(characterClasses).toHaveProperty(`${verticalTab}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${verticalTab}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${verticalTab}.group`);
            });
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.type`, 'vertical_tab');
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.startingIndex`, 17);
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.lastIndex`, 18);
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.group`, '\\v');
        });
        it("should add form feeds", () => {
            formFeedIndexes.forEach((formFeed) => {
                expect(characterClasses).toHaveProperty(`${formFeed}.type`);
                expect(characterClasses).toHaveProperty(`${formFeed}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${formFeed}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${formFeed}.group`);
            });
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.type`, 'form_feed');
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.startingIndex`, 108);
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.lastIndex`, 109);
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.group`, '\\f');
        });
        it("should add backspaces", () => {
            backspaceIndexes.forEach((backspace) => {
                expect(characterClasses).toHaveProperty(`${backspace}.type`);
                expect(characterClasses).toHaveProperty(`${backspace}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${backspace}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${backspace}.group`);
            });
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.type`, 'backspace');
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.startingIndex`, 105);
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.lastIndex`, 106);
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.group`, '\\b');
        });
        it("should add NUL", () => {
            nulIndexes.forEach((nul) => {
                expect(characterClasses).toHaveProperty(`${nul}.type`);
                expect(characterClasses).toHaveProperty(`${nul}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nul}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${nul}.group`);
            });
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.type`, 'NUL');
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.startingIndex`, 102);
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.lastIndex`, 103);
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.group`, '\\0');
        });
        it("should add control characters", () => {
            controlCharacterIndexes.forEach((controlCharacter) => {
                expect(characterClasses).toHaveProperty(`${controlCharacter}.type`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.group`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.match`);
            });
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.type`, 'control_character');
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.startingIndex`, 99);
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.lastIndex`, 101);
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.group`, '\\cM');
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.match`, '\r');

        });
        it("should add hexadecimals", () => {
            hexIndexes.forEach((hex) => {
                expect(characterClasses).toHaveProperty(`${hex}.type`);
                expect(characterClasses).toHaveProperty(`${hex}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${hex}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${hex}.group`);
                expect(characterClasses).toHaveProperty(`${hex}.match`);
            });
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.type`, 'hex');
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.startingIndex`, 111);
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.lastIndex`, 114);
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.group`, '\\x45');
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.match`, 'E');

        });
        it("should add dots and not dotAlls if dotAll flag is not set", () => {
            const dotIndexes = getIndexes(expression, DOT);
            dotIndexes.forEach((dot) => {
                expect(characterClasses).toHaveProperty(`${dot}.type`);
                expect(characterClasses).toHaveProperty(`${dot}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${dot}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${dot}.group`);
            });
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.type`, 'dot');
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.startingIndex`, 110);
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.lastIndex`, 110);
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.group`, '.');
            const groups = Object.values(characterClasses);
            groups.forEach(group => {
                expect(group['dotAll']).toBe(undefined);
            })
        });
        it("should add dotAlls and not dots if dotAll flag is set ", () => {
            const { expression, flags } = splitRegex(/^[\S\W\B\D](\w+\n\v)((?:[\w,\d]+\b\s){5})\n\r\t((?:[\w,\d]+\b\s){7})\t((?:(?:[\w\d]+,?)[\s\b]?){5})\cM\0[\b]\f.\x45/gs)
            const dotAllIndexes = getIndexes(expression, DOTALL);
            const characterClasses = getCharacterClasses(expression, flags)
            dotAllIndexes.forEach((dotAll) => {
                expect(characterClasses).toHaveProperty(`${dotAll}.type`);
                expect(characterClasses).toHaveProperty(`${dotAll}.startingIndex`);
                expect(characterClasses).toHaveProperty(`${dotAll}.lastIndex`);
                expect(characterClasses).toHaveProperty(`${dotAll}.group`);
            });
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.type`, 'dotAll');
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.startingIndex`, 110);
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.lastIndex`, 110);
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.group`, '.');
        });
})
