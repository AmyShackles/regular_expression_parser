const { parse } = require("../index.js");

describe("parse", () => {
    it("should handle captures if captures are present", () => {
        const regex = /(ABC)/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression')
        expect(parsedExpression).toHaveProperty('regularExpression.0.capture_group', { group: 'ABC', startingIndex: 0, lastIndex: 4})
    })
    it("should handle named captures if named captures are present", () => {
        const regex = /(?<test>testing)/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression');
        expect(parsedExpression).toHaveProperty('regularExpression.0.named_capture_group', { group: 'testing', startingIndex: 0, lastIndex: 15, name: 'test'})
    })
    it("should handle non-captures if non-captures are present", () => {
        const regex = /(?:nope)/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression');
        expect(parsedExpression).toHaveProperty('regularExpression.0.non_capture_group', { group: 'nope', startingIndex: 0, lastIndex: 7})
    })
    it("should handle greedy quantifier ranges", () => {
        const regex = /a{2,9}b{9}3{2,}/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression');
        expect(parsedExpression).toHaveProperty('regularExpression.1.greedy_range_quantifier', { group: '{2,9}', startingIndex: 1, lastIndex: 5, min: 2, max: 9});
        expect(parsedExpression).toHaveProperty('regularExpression.7.greedy_range_quantifier', { group: '{9}', startingIndex: 7, lastIndex: 9, min: 9});
    });
    it("should handle non-greedy quantifier ranges", () => {
        const regex = /b{2,4}?c{9}?d{0,}?/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression');
        expect(parsedExpression).toHaveProperty('regularExpression.1.non_greedy_range_quantifier', { group: '{2,4}?', startingIndex: 1, lastIndex: 6, min: 2, max: 4});
        expect(parsedExpression).toHaveProperty('regularExpression.8.non_greedy_range_quantifier', { group: '{9}?', startingIndex: 8, lastIndex: 11, min: 9});
        expect(parsedExpression).toHaveProperty('regularExpression.13.non_greedy_range_quantifier', { group: '{0,}?', startingIndex: 13, lastIndex: 17, min: 0});
    });
    it("should handle character classes", () => {
        const regex = /\d\D\w\W\s\S\t\r\n\v\f\0\cM..[\b][A-Z]/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.digit', { group: '\\d', startingIndex: 0, lastIndex: 1});
        expect(parsedExpression).toHaveProperty('regularExpression.2.non_digit', { group: '\\D', startingIndex: 2, lastIndex: 3});
        expect(parsedExpression).toHaveProperty('regularExpression.4.alphanumeric', { group: '\\w', startingIndex: 4, lastIndex: 5});
        expect(parsedExpression).toHaveProperty('regularExpression.6.non_alphanumeric', {group: '\\W', startingIndex: 6, lastIndex: 7});
        expect(parsedExpression).toHaveProperty('regularExpression.8.whitespace', { group: '\\s', startingIndex: 8, lastIndex: 9});
        expect(parsedExpression).toHaveProperty('regularExpression.10.non_whitespace', { group: '\\S', startingIndex: 10, lastIndex: 11});
        expect(parsedExpression).toHaveProperty('regularExpression.12.horizontal_tab', { group: '\\t', startingIndex: 12, lastIndex: 13 });
        expect(parsedExpression).toHaveProperty('regularExpression.14.carriage_return', { group: '\\r', startingIndex: 14, lastIndex: 15});
        expect(parsedExpression).toHaveProperty('regularExpression.16.linefeed', { group: '\\n', startingIndex: 16, lastIndex: 17});
        expect(parsedExpression).toHaveProperty('regularExpression.18.vertical_tab', { group: '\\v', startingIndex: 18, lastIndex: 19});
        expect(parsedExpression).toHaveProperty('regularExpression.20.form_feed', { group: '\\f', startingIndex: 20, lastIndex: 21});
        expect(parsedExpression).toHaveProperty('regularExpression.22.NUL', { group: '\\0', startingIndex: 22, lastIndex: 23});
        expect(parsedExpression).toHaveProperty('regularExpression.24.control_character', { group: '\r', startingIndex: 24, lastIndex: 26});
        expect(parsedExpression).toHaveProperty('regularExpression.27.dot', { group: '.', startingIndex: 27, lastIndex: 27 });
        expect(parsedExpression).toHaveProperty('regularExpression.29.character_set', { group: '\\b', startingIndex: 29, lastIndex: 32});
        expect(parsedExpression).toHaveProperty('regularExpression.30.backspace', { group: '\\b', startingIndex: 30, lastIndex: 31});
        expect(parsedExpression).toHaveProperty('regularExpression.33.character_set', { group: 'A-Z', startingIndex: 33, lastIndex: 37});
        expect(parsedExpression).toHaveProperty('regularExpression.34.range', { group: 'A-Z', rangeStart: 'A', rangeEnd: 'Z', startingIndex: 34, lastIndex: 36})
    });
    it("should handle note wildcard differently if dotAll flag set", () => {
        const regex = /./s;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.dotAll', { group: '.', startingIndex: 0, lastIndex: 0});
    })
    it("should handle hexadecimal values", () => {
        const regex = /\xff/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.hex', { group: 'ÿ', startingIndex: 0, lastIndex: 3})
    });
    it("should handle unicode values with unicode flag not set", () => {
        const regex = /\u1234/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.unicode', { group: 'ሴ', startingIndex: 0, lastIndex: 5})
    });
    it("should handle unicode values with unicode flags set", () => {
        const regex = /\u{1234}\u{12345}/gu;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.unicode', { group: 'ሴ', startingIndex: 0, lastIndex: 7});
        expect(parsedExpression).toHaveProperty('regularExpression.8.unicode', { group: '𒍅', startingIndex: 8, lastIndex: 16})
    });
    it("should handle lookaheads", () => {
        const regex = /a(?=ab)b(?!c)/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.1.positive_lookahead', { group: 'ab', startingIndex: 1, lastIndex: 6});
        expect(parsedExpression).toHaveProperty('regularExpression.8.negative_lookahead', { group: 'c', startingIndex: 8, lastIndex: 12})
    });
    it("should handle lookbehinds", () => {
        const regex = /(?<=3)\.(?<![02-9])4/g;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.positive_lookbehind', { group: '3', startingIndex: 0, lastIndex: 5});
        expect(parsedExpression).toHaveProperty('regularExpression.8.negative_lookbehind', { group: '[02-9]', startingIndex: 8, lastIndex: 18})
    });
    it("should handle unicode property escapes", () => {
        const regex = /\p{Letter}\p{General_Category=Number}\P{Uppercase_Letter}\P{Script=Cyrillic}/gu;
        const parsedExpression = parse(regex);
        expect(parsedExpression).toHaveProperty('regularExpression.0.unicode_property_escape', { group: '\\p{Letter}', unicode_name: 'Letter', startingIndex: 0, lastIndex: 9});
        expect(parsedExpression).toHaveProperty('regularExpression.10.unicode_property_escape', { group: "\\p{General_Category=Number}", startingIndex: 10, lastIndex: 36, unicode_name: 'General_Category', unicode_value: 'Number'});
        expect(parsedExpression).toHaveProperty('regularExpression.37.negated_unicode_property_escape', { group: '\\P{Uppercase_Letter}', startingIndex: 37, lastIndex: 56, negated_unicode_name: 'Uppercase_Letter'});
        expect(parsedExpression).toHaveProperty('regularExpression.57.negated_unicode_property_escape', { group: '\\P{Script=Cyrillic}', startingIndex: 57, lastIndex: 75, negated_unicode_name: 'Script', negated_unicode_value: 'Cyrillic'})
    })
})