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

console.log(isAuthenticated(true))


function multiply(a, b) {
    return (a*b);
}

console.log(multiply(2,3))

function isShortsWeather(temp) {
    if(temp >=75) {
        return true;
    } else {
        return false;
    }
}

console.log(isShortsWeather(80))

function capitalize(word) {
    const firstLetterCaps = word[0].toUpperCase();
    const restOfString = word.slice(1);
    return firstLetterCaps + restOfString;    
}

console.log(capitalize('be cautius lest you pee on your pants'))


function sumArray(nums) {
     let total = 0;
     for (let num of nums) {
         total += num;
     }
     return total;
}

console.log(sumArray([1,2,3,4]))




function returnDay(num) {
    
 const daysOfTheWeek = ['Monday','Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday','Sunday']
    
    if (num < 1 || num > 7) {
    return null;
    } else {
    return daysOfTheWeek[num - 1];
}

}

console.log(returnDay(5))