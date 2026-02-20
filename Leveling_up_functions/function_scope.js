// Scope - variable visibility - location where a variable is defined determines where we have access to that variable

function churchAttendanceCount() {
    let count = 40; 
}

churchAttendanceCount(); 
// console.log(count);   // -> The count won't be printed out in the console due to lack of availablity outside the function scope

function schoolAttendanceCount() {
    let count = 100;
    return count; 
}

console.log(schoolAttendanceCount())  


