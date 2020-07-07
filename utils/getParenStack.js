module.exports = {
    getParenStack: (string) => {
        let openParen = [];
        let captures = [];
        [...string].forEach((char, index) => {
            if (char === "(") {
                if ((index > 0 && string[index - 1] !== "\\") | index == 0) {
                    openParen.push(index);
                }
            } else if (char === ")") {
                if (index > 0 && string[index - 1] !== "\\") {
                    const match = openParen.pop();
                    const group = string.slice(match, index + 1);
                    captures.push({group,
                        startingIndex: match,
                        lastIndex: index
                    })
                }
            }
        })
        return captures;
    }
}