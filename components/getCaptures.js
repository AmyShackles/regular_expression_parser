const { NON_CAPTURE, NAMED_CAPTURE, CAPTURE } = require('../utils/regexes');

module.exports = {
    getCaptures: (string) => {
        const captureString = "(?<non_capture_group>" + NON_CAPTURE + ")|(?<named_capture_group>" + NAMED_CAPTURE + ")|(?<capture_group>" + CAPTURE + ")";
        let captureRegex = new RegExp(captureString, 'g');
        let captures = {};

        [...string.matchAll(captureRegex)].forEach((regex) => {
            let key = regex.groups.capture_group
                ? "capture_group"
                : regex.groups.non_capture_group
                    ? "non_capture_group"
                    : regex.groups.named_capture_group
                        ? "named_capture_group"
                        : "";

            const { groups } = regex;
            const startingIndex = regex.index;
            const endingIndex = startingIndex + groups[key].length;

            switch (key) {
                case "non_capture_group":
                    captures[startingIndex] = {
                        "non_capture_group": {
                            startingIndex,
                            endingIndex,
                            group: groups.non_capture_group.slice(4, -1),
                        },
                    };
                    break;
                case "named_capture_group":
                    captures[startingIndex] = {
                        "named_capture_group": {
                            startingIndex,
                            endingIndex,
                            name: groups.name,
                            group: groups.named_capture_group.slice(
                                groups.name.length + 4,
                                -1
                            ),
                        },
                    };
                    break;
                case "capture_group":
                    captures[startingIndex] = {
                        "capture_group": {
                            startingIndex,
                            endingIndex,
                            group: groups.capture_group.slice(1, -1),
                        },
                    };
                    break;
                default:
                    break;
            }
        });
        return captures;
    }
}