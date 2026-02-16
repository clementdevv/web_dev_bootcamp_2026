
let input = prompt("What would you like to do?");
const todos = ['Collect Eggs', 'Clean Litter Box'];

while (input !== 'quit' && input !== 'q') {
    if (input === 'list') {
        console.log("*****************");
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log("*****************");
    } else if (input === 'new') {
        const newTodo = prompt("Ok, what is the new todo?");
        // PUSH adds to the end of the array
        todos.push(newTodo);
        console.log(`${newTodo} added to the list!`);
    } else if (input === 'delete') {
        // PARSEINT converts the string index to a number
        const index = parseInt(prompt("Ok, enter an index to delete:"));
        
        // Check if the input is a valid number and within range
        if (!Number.isNaN(index) && index < todos.length) {
            // SPLICE(startIndex, howManyToDelete)
            const deleted = todos.splice(index, 1);
            console.log(`Ok, deleted ${deleted[0]}`);
        } else {
            console.log("Unknown index");
        }
    }
    // Ask for input again or the loop becomes infinite!
    input = prompt("What would you like to do?");
}

console.log("OK QUIT THE APP!");