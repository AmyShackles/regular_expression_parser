const { NON_CAPTURE, NAMED_CAPTURE, CAPTURE } = require('../utils/regexes');
const { getParenStack } = require("../utils/getParenStack.js");

module.exports = {
    getCaptures: (string) => {
        let captures = {};
        getParenStack(string).forEach(({group, startingIndex, endingIndex}) => {
            const named_capture = group.match(NAMED_CAPTURE);
            const non_capture = group.match(NON_CAPTURE);
            const capture = group.match(CAPTURE);
    
            if (named_capture || non_capture || capture) {
                captures[startingIndex] = {
                    ...(named_capture ? { named_capture_group: { group: named_capture['groups']['named_capture_group'], startingIndex, endingIndex, name: named_capture['groups']['name'] }} : {}),
                    ...(non_capture ? { non_capture_group: { group: non_capture['groups']['non_capture_group'], startingIndex, endingIndex}} : {}),
                    ...(capture ? { capture_group: { group: capture['groups']['capture_group'], startingIndex, endingIndex }} : {})
                }
            }
        });
        return captures;
    },

}