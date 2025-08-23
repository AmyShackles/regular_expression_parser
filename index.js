const { getCaptures } = require("./components/getCaptures.js");
const { getQuantifiers } = require("./components/getQuantifiers.js");
const { splitRegex } = require("./components/splitRegex.js");
const { getUnicode } = require("./components/getUnicode.js");
const { getCharacterSets } = require("./components/getCharacterSets.js");
const { getCharacterClasses } = require("./components/getCharacterClasses.js");
const {
    getUnicodePropertyEscapes,
} = require("./components/getUnicodePropertyEscapes");
const { getLooks } = require("./components/getLooks.js");
const { getBoundaries } = require("./components/getBoundaries.js");
const { getGroupsAndRanges } = require("./components/getGroupsAndRanges.js");
const { getLiterals } = require("./components/getLiterals.js");
const { makeStatement } = require("./components/makeStatement.js");

function parse(regex, offset = 0, inputFlags = "") {
    let expression, flags;
    if (offset === 0) {
        ({ expression, flags } = splitRegex(regex, inputFlags));
    } else {
        expression = regex;
        flags = inputFlags;
    }
    const unicodeMode = flags.includes("u");
    let index = 0;
    while (index < expression.length) {
        switch (expression[index]) {
            case '\'
        }
    }
    const captures = getCaptures(expression, offset, parse);
    const quantifiers =  getQuantifiers(expression, flags, offset);
    const unicode = getUnicode(expression, flags, offset);
    const characterSets = getCharacterSets(expression, offset);
    const characterClasses = getCharacterClasses(expression, flags, offset);
    const unicodePropertyEscapes = unicodeMode
        ? getUnicodePropertyEscapes(expression, offset)
        : undefined;
    const looks = getLooks(expression, offset);
    const boundaries = getBoundaries(expression, flags, offset);
    const groupsAndRanges = getGroupsAndRanges(expression, offset);
    const literals = getLiterals(expression, offset);
    const regularExpression = createObject(   literals,
        captures,
        quantifiers,
        unicode,
        characterSets,
        characterClasses,
        unicodePropertyEscapes,
        looks,
        boundaries,
        groupsAndRanges);
    return { regularExpression, expression };
}

function createObject(
    literals,
    captures,
    quantifiers,
    unicode,
    characterSets,
    characterClasses,
    unicodePropertyEscapes,
    looks,
    boundaries,
    groupsAndRanges
) {
    return {
        ...(literals && { ...literals }),
        ...(quantifiers && { ...quantifiers }),
        ...(unicode && { ...unicode }),
        ...(characterSets && { ...characterSets }),
        ...(characterClasses && { ...characterClasses }),
        ...(unicodePropertyEscapes && { ...unicodePropertyEscapes }),
        ...(looks && { ...looks }),
        ...(boundaries && { ...boundaries }),
        ...(groupsAndRanges && { ...groupsAndRanges }),
        ...(captures && { ...captures }),

    };
}

function createTree(parsedRegex) {
    parsedRegex = Object.entries(parsedRegex);
    let tree = [parsedRegex[0][1]];
    for (let index = 1; index < parsedRegex.length; index++) {
        let prev = tree.pop();
        let prevGroup = prev.group;
        let current = parsedRegex[index][1];
        if (current.startingIndex < prev.lastIndex) {
            if (prev.groups === undefined) {
                prev.groups = createTree({
                    [current.startingIndex]: current,
                });
            } else {
                prev.groups = [
                    ...prev.groups,
                    ...createTree({ [current.startingIndex]: current }),
                ];
            }
            tree.push(prev);
        } else {
            tree.push(prev, current);
        }
    }
    return tree;
}

const exp = parse(
    /^(?<=Hello (a(ga)in))\b(ABC)[^ack].{2}?(\P{Script=Cyrillic} \p{General_Category=Letter}\xff \u{12345})(?<isas>[ai]s)\s[easy]{1,5} \p{Script=Latin}\k<isas>\s(123)\1\2{3}\u1234 [\b]sometimes\cM\B(?=Goodbye)$/gimsu
);
console.log(JSON.stringify(exp.regularExpression, undefined, 4));
// const tree = createTree(exp.regularExpression);
// console.log("TREE", JSON.stringify(tree, null, 4));
//   const made = makeStatement(tree)
//   console.log(JSON.stringify(made, null, 4))
module.exports = {
    parse,
    createObject,
};
