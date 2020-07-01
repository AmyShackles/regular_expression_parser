module.exports = {
    getCaptures: (string) => {
        let captureRegex = /(?<non_capture_group>\(\?:.+?\))|(?<named_capture_group>\(\?<(?<name>.+?)>.+?\))|(?<capture_group>\([^\?].*?\))/g;
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
                case "capture_group":
                    captures[startingIndex] = {
                        "capture group": {
                            startingIndex,
                            endingIndex,
                            group: groups.capture_group.slice(1, -1),
                        },
                    };
                    break;
                case "non_capture_group":
                    captures[startingIndex] = {
                        "non-capture group": {
                            startingIndex,
                            endingIndex,
                            group: groups.non_capture_group.slice(3, -1),
                        },
                    };
                    break;
                case "named_capture_group":
                    captures[startingIndex] = {
                        "named capture group": {
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
                default:
                    break;
            }
        });
        return captures;
    }
}