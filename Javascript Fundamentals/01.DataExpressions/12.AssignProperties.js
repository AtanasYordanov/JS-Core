function solve([k1, v1, k2, v2, k3, v3]) {
    let obj = {};
    obj[k1] = v1;
    obj[k2] = v2;
    obj[k3] = v3;
    return obj;
}

console.log(solve(['name', 'Pesho', 'age', '23', 'gender', 'male']));