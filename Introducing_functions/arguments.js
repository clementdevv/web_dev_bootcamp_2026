

// function signIn(password, username) {
//     console.log(`Hey there, ${username}`)
// }

// signIn(1234, 'King Von')

function repeat(str, numTimes) {
    let result = ''; 
    for(let i=0; i<numTimes; i++) {
        result += str;
    }
    console.log(result)
}

repeat('&', 4)