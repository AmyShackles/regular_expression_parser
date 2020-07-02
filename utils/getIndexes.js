module.exports = {
    getIndexes: (regex, pattern) => {
        let indexes = [];
        [...regex.matchAll(pattern)].forEach(reg => {
            indexes.push(reg.index);
        });
        return indexes;
    }
}