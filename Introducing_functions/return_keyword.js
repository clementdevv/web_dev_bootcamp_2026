// The return keyword:
// - stops the execution of a function
// - specifies the value to be returned by that function (upon execution)

function isAuthenticated(token) {
    if(token === true) {
        return token;
    }
    else {
        return 'Invalid token provided'
    }
}

isAuthenticated()

isAuthenticated(true)