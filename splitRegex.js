module.exports = { splitRegex: (regex) => {
    const regularExpressionString = regex.toString();
    const lastForwardSlash = regularExpressionString.lastIndexOf("/");
    const expression = regularExpressionString.slice(1, lastForwardSlash);
    const flags = regularExpressionString.slice(lastForwardSlash + 1)
    return { expression, flags }
} };