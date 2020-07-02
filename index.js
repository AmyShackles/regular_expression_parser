const { getCaptures } = require('./components/getCaptures.js');
const { getQuantifiers } = require('./components/getQuantifiers.js');
const { splitRegex } = require('./components/splitRegex.js');
const { getUnicode } = require("./components/getUnicode.js");
const { getCharacterSets } = require("./components/getCharacterSets.js");
const { getCharacterClasses } = require("./components/getCharacterClasses.js");
const { getUnicodePropertyEscapes } = require('./components/getUnicodePropertyEscapes');
const { getLooks } = require("./components/getLooks.js");

function parse(regex) {
    const { expression, flags } = splitRegex(regex);
    console.log('expression', expression);
    const unicodeMode = flags.includes('u');
    const captures = getCaptures(expression);
    const quantifiers = getQuantifiers(expression, flags);
    const unicode = getUnicode(expression, flags);
    const characterSets = getCharacterSets(expression);
    const characterClasses = getCharacterClasses(expression, flags);
    const unicodePropertyEscapes = unicodeMode ? getUnicodePropertyEscapes(expression) : undefined;
    const looks = getLooks(expression);
    const regularExpression = {
      ...(captures ? { ...captures } : {}),
      ...(quantifiers ? { ...quantifiers } : {}),
      ...(unicode ? { ...unicode } : {}),
      ...(characterSets ? { ...characterSets } : {}),
      ...(characterClasses ? { ...characterClasses } : {}),
      ...(unicodePropertyEscapes ? { ...unicodePropertyEscapes } : {}),
      ...(looks ? { ...looks } : {})
    }
    return { regularExpression, expression, what: JSON.stringify(characterClasses) }
  }
  
  

  

  

  const exp = parse(/(ABC)[^ack].{2}?\P{Script=Cyrillic} \p{General_Category=Letter}\xff \u{12345}(?<isas>[ai]s)\s[easy]{1,5} \p{Script=Latin}\k<isas>\s(123)\1\2{3}\u1234 [\b]sometimes\cM/gius);
  console.log(JSON.stringify(exp, null, '\t'));