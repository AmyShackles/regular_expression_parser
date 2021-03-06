const { getCaptures } = require('./components/getCaptures.js');
const { getQuantifiers } = require('./components/getQuantifiers.js');
const { splitRegex } = require('./components/splitRegex.js');
const { getUnicode } = require("./components/getUnicode.js");
const { getCharacterSets } = require("./components/getCharacterSets.js");
const { getCharacterClasses } = require("./components/getCharacterClasses.js");
const { getUnicodePropertyEscapes } = require('./components/getUnicodePropertyEscapes');
const { getLooks } = require("./components/getLooks.js");
const { getBoundaries } = require("./components/getBoundaries.js");
const { getGroupsAndRanges } = require("./components/getGroupsAndRanges.js");
const { getLiterals } = require("./components/getLiterals.js");
const { makeStatement } = require("./components/makeStatement.js")

function parse(regex) {
    const { expression, flags } = splitRegex(regex);
    const unicodeMode = flags.includes('u');
    const captures = getCaptures(expression);
    const quantifiers = getQuantifiers(expression, flags);
    const unicode = getUnicode(expression, flags);
    const characterSets = getCharacterSets(expression);
    const characterClasses = getCharacterClasses(expression, flags);
    const unicodePropertyEscapes = unicodeMode ? getUnicodePropertyEscapes(expression) : undefined;
    const looks = getLooks(expression);
    const boundaries = getBoundaries(expression, flags);
    const groupsAndRanges = getGroupsAndRanges(expression);
    const literals = getLiterals(expression);
    const regularExpression = createObject(
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
    );
    return { regularExpression, expression }
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
            ...(captures && { ...captures }),
            ...(quantifiers && { ...quantifiers }),
            ...(unicode && { ...unicode }),
            ...(characterSets && { ...characterSets }),
            ...(characterClasses && { ...characterClasses }),
            ...(unicodePropertyEscapes && { ...unicodePropertyEscapes }),
            ...(looks && { ...looks }),
            ...(boundaries && { ...boundaries }),
            ...(groupsAndRanges && { ...groupsAndRanges }),
      };;
  }

  function createTree(parsedRegex) {
    parsedRegex = Object.values(parsedRegex);
    console.log({ parsedRegex });
    let tree = [parsedRegex[0]];
    for (let index = 1; index < parsedRegex.length; index++) {
      let prev = tree.pop();
      let prevGroup = prev.group;
      console.log({ prevGroup });
      let current = parsedRegex[index];
      console.log({current, groups: prev.groups})
      if (current.startingIndex < prev.lastIndex) {
        if (prev.groups === undefined) {
          prev.groups = [current]
        } else {
            prev.groups.push(current);
        }
        tree.push(prev);
      } else {
        tree.push(prev, current);
      }
    }
    return tree

  }

  const exp = parse(/^(?<=Hello (a(ga)in))\b(ABC)[^ack].{2}?(\P{Script=Cyrillic} \p{General_Category=Letter}\xff \u{12345})(?<isas>[ai]s)\s[easy]{1,5} \p{Script=Latin}\k<isas>\s(123)\1\2{3}\u1234 [\b]sometimes\cM\B(?=Goodbye)$/giusm);
  const tree = createTree(exp.regularExpression);
  const made = makeStatement(tree)
  console.log(JSON.stringify(made, null, 4))
  module.exports = {
    parse,
    createObject
  }