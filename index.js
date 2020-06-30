const { getCaptures } = require('./components/getCaptures.js');
const { getQuantifiers } = require('./components/getQuantifiers.js');
const { splitRegex } = require('./components/splitRegex.js');
const { getUnicode } = require("./components/getUnicode.js");
const { getCharacterSets } = require("./components/getCharacterSets.js");


function parse(regex) {
    const { expression, flags } = splitRegex(regex);
    const captures = getCaptures(expression);
    const quantifiers = getQuantifiers(expression, flags);
    const unicode = getUnicode(expression, flags);
    const characterSets = getCharacterSets(expression);
    const regularExpression = {
      ...(captures ? { ...captures } : {}),
      ...(quantifiers ? { ...quantifiers } : {}),
      ...(unicode ? { ...unicode } : {}),
      ...(characterSets ? { ...characterSets } : {})
    }
    return regularExpression;
  }
  
  

  

  

  
  console.log(parse(/(ABC) \u{1234}(?<isas>[ai]s)\s[easy]{1,5} \k<isas>\s(123)\1\2{3}\u1234/gim));