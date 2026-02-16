
for (let i = 1; i<=10; i++) {
    console.log(i)
}

for (let i = 0; i<=20; i += 2) {
    console.log(i)
}


// The Perils of Infinite Loops - when creating a for loop, always consider the condition specified for making the for loop stop
// An example of an infinite for loop is as below:

// for (let i = 20; i>=0; i++) {
//     console.log(i)
// }

// The above code will run 'forever' if executed since there's no condition specifying when the loop should close