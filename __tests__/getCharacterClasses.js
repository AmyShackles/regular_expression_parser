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
                expect(characterClasses).toHaveProperty(`${digit}.digit`);
                expect(characterClasses).toHaveProperty(`${digit}.digit.startingIndex`);
                expect(characterClasses).toHaveProperty(`${digit}.digit.endingIndex`);
                expect(characterClasses).toHaveProperty(`${digit}.digit.group`);
            });
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.digit.startingIndex`, 28);
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.digit.endingIndex`, 30);
            expect(characterClasses).toHaveProperty(`${digitIndexes[0]}.digit.group`, '\\d');
        });
        it("should add non-digits", () => {
            nonDigitIndexes.forEach(nonDigit => {
                expect(characterClasses).toHaveProperty(`${nonDigit}.non_digit`);
                expect(characterClasses).toHaveProperty(`${nonDigit}.non_digit.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nonDigit}.non_digit.endingIndex`);
                expect(characterClasses).toHaveProperty(`${nonDigit}.non_digit.group`);
            });
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.non_digit.startingIndex`, 8);
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.non_digit.endingIndex`, 10);
            expect(characterClasses).toHaveProperty(`${nonDigitIndexes[0]}.non_digit.group`, '\\D');
        });
        it("should add alphanumerics", () => {
            alphanumericIndexes.forEach(alpha => {
                expect(characterClasses).toHaveProperty(`${alpha}.alphanumeric`);
                expect(characterClasses).toHaveProperty(`${alpha}.alphanumeric.startingIndex`);
                expect(characterClasses).toHaveProperty(`${alpha}.alphanumeric.endingIndex`);
                expect(characterClasses).toHaveProperty(`${alpha}.alphanumeric.group`);
            });
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.alphanumeric.startingIndex`, 12);
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.alphanumeric.endingIndex`, 14);
            expect(characterClasses).toHaveProperty(`${alphanumericIndexes[0]}.alphanumeric.group`, '\\w');
        })
        it("should add non-alphanumerics", () => {
            nonAlphanumericIndexes.forEach(nonAlpha => {
                expect(characterClasses).toHaveProperty(`${nonAlpha}.non_alphanumeric`);
                expect(characterClasses).toHaveProperty(`${nonAlpha}.non_alphanumeric.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nonAlpha}.non_alphanumeric.endingIndex`);
                expect(characterClasses).toHaveProperty(`${nonAlpha}.non_alphanumeric.group`);
            });
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.non_alphanumeric.startingIndex`, 4);
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.non_alphanumeric.endingIndex`, 6);
            expect(characterClasses).toHaveProperty(`${nonAlphanumericIndexes[0]}.non_alphanumeric.group`, '\\W');
        });
        it("should add whitespaces", () => {
            whitespaceIndexes.forEach(whitespace => {
                expect(characterClasses).toHaveProperty(`${whitespace}.whitespace`);
                expect(characterClasses).toHaveProperty(`${whitespace}.whitespace.startingIndex`);
                expect(characterClasses).toHaveProperty(`${whitespace}.whitespace.endingIndex`);
                expect(characterClasses).toHaveProperty(`${whitespace}.whitespace.group`);
            });
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.whitespace.startingIndex`, 34);
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.whitespace.endingIndex`, 36);
            expect(characterClasses).toHaveProperty(`${whitespaceIndexes[0]}.whitespace.group`, '\\s');
        });
        it("should add non-whitespaces", () => {
            nonWhitespaceIndexes.forEach(nonWhitespace => {
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.non_whitespace`);
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.non_whitespace.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.non_whitespace.endingIndex`);
                expect(characterClasses).toHaveProperty(`${nonWhitespace}.non_whitespace.group`);
            });
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.non_whitespace.startingIndex`, 2);
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.non_whitespace.endingIndex`, 4);
            expect(characterClasses).toHaveProperty(`${nonWhitespaceIndexes[0]}.non_whitespace.group`, '\\S');
        });
        it("should add horizontal tabs", () => {
            horizontalTabIndexes.forEach(horizontalTab => {
                expect(characterClasses).toHaveProperty(`${horizontalTab}.horizontal_tab`);
                expect(characterClasses).toHaveProperty(`${horizontalTab}.horizontal_tab.startingIndex`);
                expect(characterClasses).toHaveProperty(`${horizontalTab}.horizontal_tab.endingIndex`);
                expect(characterClasses).toHaveProperty(`${horizontalTab}.horizontal_tab.group`);
            });
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.horizontal_tab.startingIndex`, 45);
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.horizontal_tab.endingIndex`, 47);
            expect(characterClasses).toHaveProperty(`${horizontalTabIndexes[0]}.horizontal_tab.group`, '\\t');
        });
        it("should add carriage returns", () => {
            carriageReturnIndexes.forEach(carriageReturn => {
                expect(characterClasses).toHaveProperty(`${carriageReturn}.carriage_return`);
                expect(characterClasses).toHaveProperty(`${carriageReturn}.carriage_return.startingIndex`);
                expect(characterClasses).toHaveProperty(`${carriageReturn}.carriage_return.endingIndex`);
                expect(characterClasses).toHaveProperty(`${carriageReturn}.carriage_return.group`);
            });
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.carriage_return.startingIndex`, 43);
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.carriage_return.endingIndex`, 45);
            expect(characterClasses).toHaveProperty(`${carriageReturnIndexes[0]}.carriage_return.group`, '\\r');
        });
        it("should add linefeeds", () => {
            lineFeedIndexes.forEach(lineFeed => {
                expect(characterClasses).toHaveProperty(`${lineFeed}.linefeed`);
                expect(characterClasses).toHaveProperty(`${lineFeed}.linefeed.startingIndex`);
                expect(characterClasses).toHaveProperty(`${lineFeed}.linefeed.endingIndex`);
                expect(characterClasses).toHaveProperty(`${lineFeed}.linefeed.group`);
            });
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.linefeed.startingIndex`, 15);
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.linefeed.endingIndex`, 17);
            expect(characterClasses).toHaveProperty(`${lineFeedIndexes[0]}.linefeed.group`, '\\n');
        });
        it("should add vertical tabs", () => {
            verticalTabIndexes.forEach(verticalTab => {
                expect(characterClasses).toHaveProperty(`${verticalTab}.vertical_tab`);
                expect(characterClasses).toHaveProperty(`${verticalTab}.vertical_tab.startingIndex`);
                expect(characterClasses).toHaveProperty(`${verticalTab}.vertical_tab.endingIndex`);
                expect(characterClasses).toHaveProperty(`${verticalTab}.vertical_tab.group`);
            });
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.vertical_tab.startingIndex`, 17);
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.vertical_tab.endingIndex`, 19);
            expect(characterClasses).toHaveProperty(`${verticalTabIndexes[0]}.vertical_tab.group`, '\\v');
        });
        it("should add form feeds", () => {
            formFeedIndexes.forEach((formFeed) => {
                expect(characterClasses).toHaveProperty(`${formFeed}.form_feed`);
                expect(characterClasses).toHaveProperty(`${formFeed}.form_feed.startingIndex`);
                expect(characterClasses).toHaveProperty(`${formFeed}.form_feed.endingIndex`);
                expect(characterClasses).toHaveProperty(`${formFeed}.form_feed.group`);
            });
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.form_feed.startingIndex`, 108);
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.form_feed.endingIndex`, 110);
            expect(characterClasses).toHaveProperty(`${formFeedIndexes[0]}.form_feed.group`, '\\f');
        });
        it("should add backspaces", () => {
            backspaceIndexes.forEach((backspace) => {
                expect(characterClasses).toHaveProperty(`${backspace}.backspace`);
                expect(characterClasses).toHaveProperty(`${backspace}.backspace.startingIndex`);
                expect(characterClasses).toHaveProperty(`${backspace}.backspace.endingIndex`);
                expect(characterClasses).toHaveProperty(`${backspace}.backspace.group`);
            });
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.backspace.startingIndex`, 105);
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.backspace.endingIndex`, 107);
            expect(characterClasses).toHaveProperty(`${backspaceIndexes[0]}.backspace.group`, '\\b');
        });
        it("should add NUL", () => {
            nulIndexes.forEach((nul) => {
                expect(characterClasses).toHaveProperty(`${nul}.NUL`);
                expect(characterClasses).toHaveProperty(`${nul}.NUL.startingIndex`);
                expect(characterClasses).toHaveProperty(`${nul}.NUL.endingIndex`);
                expect(characterClasses).toHaveProperty(`${nul}.NUL.group`);
            });
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.NUL.startingIndex`, 102);
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.NUL.endingIndex`, 104);
            expect(characterClasses).toHaveProperty(`${nulIndexes[0]}.NUL.group`, '\\0');
        });
        it("should add control characters", () => {
            controlCharacterIndexes.forEach((controlCharacter) => {
                expect(characterClasses).toHaveProperty(`${controlCharacter}.control_character`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.control_character.startingIndex`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.control_character.endingIndex`);
                expect(characterClasses).toHaveProperty(`${controlCharacter}.control_character.group`);
            });
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.control_character.startingIndex`, 99);
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.control_character.endingIndex`, 102);
            expect(characterClasses).toHaveProperty(`${controlCharacterIndexes[0]}.control_character.group`, '\r');
        });
        it("should add hexadecimals", () => {
            hexIndexes.forEach((hex) => {
                expect(characterClasses).toHaveProperty(`${hex}.hex`);
                expect(characterClasses).toHaveProperty(`${hex}.hex.startingIndex`);
                expect(characterClasses).toHaveProperty(`${hex}.hex.endingIndex`);
                expect(characterClasses).toHaveProperty(`${hex}.hex.group`);
            });
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.hex.startingIndex`, 111);
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.hex.endingIndex`, 113);
            expect(characterClasses).toHaveProperty(`${hexIndexes[0]}.hex.group`, 'E');
        });
        it("should add dots and not dotAlls if dotAll flag is not set", () => {
            const dotIndexes = getIndexes(expression, DOT);
            dotIndexes.forEach((dot) => {
                expect(characterClasses).toHaveProperty(`${dot}.dot`);
                expect(characterClasses).toHaveProperty(`${dot}.dot.startingIndex`);
                expect(characterClasses).toHaveProperty(`${dot}.dot.endingIndex`);
                expect(characterClasses).toHaveProperty(`${dot}.dot.group`);
            });
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.dot.startingIndex`, 110);
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.dot.endingIndex`, 111);
            expect(characterClasses).toHaveProperty(`${dotIndexes[0]}.dot.group`, '.');
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
                expect(characterClasses).toHaveProperty(`${dotAll}.dotAll`);
                expect(characterClasses).toHaveProperty(`${dotAll}.dotAll.startingIndex`);
                expect(characterClasses).toHaveProperty(`${dotAll}.dotAll.endingIndex`);
                expect(characterClasses).toHaveProperty(`${dotAll}.dotAll.group`);
            });
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.dotAll.startingIndex`, 110);
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.dotAll.endingIndex`, 111);
            expect(characterClasses).toHaveProperty(`${dotAllIndexes[0]}.dotAll.group`, '.');
            const groups = Object.values(characterClasses);
            groups.forEach(group => {
                expect(group['dot']).toBe(undefined);
            })
        });
})
