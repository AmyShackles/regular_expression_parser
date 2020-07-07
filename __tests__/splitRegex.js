const { splitRegex } = require('../components/splitRegex.js');

describe("splitRegex", () => {
    const reg = /(?:(^|\s))(ABC) as easy as (123), \1, \2/gm;

    it("should return a string representation of a regular expression", () => {
        expect(splitRegex(reg)).toEqual(expect.objectContaining({ expression: "(?:(^|\\s))(ABC) as easy as (123), \\1, \\2"}))
    })
    it("should return a string representation of flags set", () => {
        expect(splitRegex(reg)).toEqual(expect.objectContaining({flags: "gm"}))
    })
})