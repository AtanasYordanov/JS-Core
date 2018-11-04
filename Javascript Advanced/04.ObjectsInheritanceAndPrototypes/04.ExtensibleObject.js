function solve() {
    let obj = {};
    obj.extend = function extend(props) {
        Object.keys(props).forEach(key => {
            const property = props[key];
            if (typeof(property) === 'function') {
                Object.getPrototypeOf(obj)[key] = props[key];
            } else {
                obj[key] = props[key]
            }
        });
    };
    return obj;
}
