(function () {
    return {
        add: (v1, v2) => {
            let result = [];
            result[0] = v1[0] + v2[0];
            result[1] = v1[1] + v2[1];
            return result
        },

        multiply: (v1, v2) => {
            let result = [];
            result[0] = v1[0] * v2;
            result[1] = v1[1] * v2;
            return result
        },

        length: (v1) => {
            return Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
        },

        dot: (v1, v2) => {
            return v1[0] * v2[0] + v1[1] * v2[1];
        },

        cross: (v1, v2) => {
            return v1[0] * v2[1] - v1[1] * v2[0];
        }
    }
})();