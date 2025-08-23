module.exports = {
    splitRegex: (regex, inputFlags = "") => {
        console.log({  regex  });
        if (typeof regex === "string") {
            return { expression: regex, flags: inputFlags };
        }
        const regularExpressionString = regex.toString();
        const lastForwardSlash = regularExpressionString.lastIndexOf("/");
        const expression = regularExpressionString.slice(1, lastForwardSlash);
        const flags = regularExpressionString.slice(lastForwardSlash + 1);
        console.log({regularExpressionString, lastForwardSlash, expression, flags})
        return { expression, flags };
    },
};
