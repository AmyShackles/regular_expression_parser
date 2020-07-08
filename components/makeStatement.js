module.exports = {
    makeStatement: tree => {
        let after = [];
        for (let i = 0; i < tree.length; i++) {
            let expression = tree[i];
            if (expression.type === 'literal') {
                let start = i;
                let string = [expression.group];
                while (tree[++i].type === 'literal' && i < tree.length) {
                    expression = tree[i]
                    string.push(expression.group);
                };
                tree[start].group = string;
                tree[start].lastIndex = tree[i].startingIndex - 1;
                after.push(tree[start]);
                // We overshot the string, so need to go back an index
                i--;
            } else {
                after.push(expression);
            }
        }
        return after;
    }
}