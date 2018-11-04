function solve(request) {

    validateMethod(request.method);
    validateURI(request.uri);
    validateVersion(request.version);
    validateMessage(request.message);

    return request;

    function validateMethod(method) {
        const isValid = method && (method === 'GET'
            || method === 'POST'
            || method === 'DELETE'
            || method === 'CONNECT');
        if (!isValid) {
            throw new Error('Invalid request header: Invalid Method');
        }
    }

    function validateURI(uri) {
        const regex = /^[\w\d.]+$/;

        const isValid = uri && (regex.test(uri) || uri === '*');

        if (!isValid) {
            throw new Error('Invalid request header: Invalid URI');
        }
    }

    function validateVersion(version) {
        const isValid = version &&
            (version === 'HTTP/0.9'
                || version === 'HTTP/1.0'
                || version === 'HTTP/1.1'
                || version === 'HTTP/2.0');
        if (!isValid) {
            throw new Error('Invalid request header: Invalid Version');
        }
    }

    function validateMessage(message = '&') {
        const regex = /^[^<>\\&'"]*$/;

        const isValid = regex.test(message);

        if (!isValid) {
            throw new Error('Invalid request header: Invalid Message');
        }
    }
}

console.log(solve({
    method: 'POST',
    uri: 'home.bash',
    version: 'HTTP/2.0',
    message: '',
}));
