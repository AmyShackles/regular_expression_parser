module.exports = {
    findKey: (reg) => {
        // Since only one group will match at a time
        // We just need to find the group with a value
        let groupKey;
        Object.entries(reg).forEach(([key, value]) => {
            if (!!value) {
                groupKey = key;
            }
        })
        return groupKey;
    }
}