const { NON_CAPTURE, NAMED_CAPTURE, CAPTURE } = require("../utils/regexes");
const { getParenStack } = require("../utils/getParenStack.js");
module.exports = {
    getCaptures: (string, offset = 0, parse) => {
        let captures = {};
        getParenStack(string).forEach(({ group, startingIndex, lastIndex }) => {
            startingIndex += offset;
            lastIndex += offset;
            const named_capture = group.match(NAMED_CAPTURE);
            const non_capture = group.match(NON_CAPTURE);
            const capture = group.match(CAPTURE);

            if (named_capture || non_capture || capture) {
                captures[startingIndex] = {
                    ...(named_capture
                        ? {
                              type: "named_capture_group",
                              group: named_capture["groups"][
                                  "named_capture_group"
                              ],
                              match: named_capture["groups"]["named_capture"],
                              startingIndex,
                              lastIndex,
                              children: parse(
                                  named_capture["groups"]["named_capture"],
                                  string.indexOf(named_capture["groups"]["named_capture"], startingIndex)
                              ).regularExpression,
                              name: named_capture["groups"]["name"],
                          }
                        : {}),
                    ...(non_capture
                        ? {
                              type: "non_capture_group",
                              group: non_capture["groups"]["non_capture_group"],
                              match: non_capture["groups"]["non_capture"],
                              startingIndex,
                              lastIndex,
                              children: parse(
                                  non_capture["groups"]["non-capture"],
                                  string.indexOf(non_capture["groups"]["non-capture"], startingIndex)
                              ).regularExpression,
                          }
                        : {}),
                    ...(capture
                        ? {
                              type: "capture_group",
                              group: capture["groups"]["capture_group"],
                              match: capture["groups"]["capture"],
                              startingIndex,
                              lastIndex,
                              children: parse(
                                  capture["groups"]["capture"],
                                  string.indexOf(capture["groups"]["capture"], startingIndex)
                                ).regularExpression,
                          }
                        : {}),
                };
            }
        });
        return captures;
    },
};
