const { getParenStack } = require("../utils/getParenStack");

describe("getParenStack", () => {
    const string = "(ABC), (123), \\(ABC\\)"
    const parsedString = getParenStack(string);
    it("should return an array of objects containing values between parens", () => {
        expect(parsedString).toEqual([{group: '(ABC)', startingIndex: 0, lastIndex: 4}, { group: '(123)', startingIndex: 7, lastIndex: 11}])
    });
    it("should not include objects made from escaped parens", () => {
        expect(parsedString).toHaveLength(2);
    })
})