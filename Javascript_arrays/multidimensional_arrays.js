

let board = [
    ['X', 'O', 'X'], 
    ['O', 'X', 'O'], 
    ['X', 'O', 'X']  
];


console.log(board[0][0]); 
console.log(board[1][1]); 
console.log(board[2][1]); 


board[1][0] = 'Z';
console.log(board[1]); 


console.log(board[0]); 


console.log("Printing the board contents:");
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        console.log(`Row ${i}, Col ${j}: ${board[i][j]}`);
    }
}

let shoppingCart = [
    ["Apples", 5],
    ["Milk", 2],
    ["Bread", 1]
];

console.log(`You have ${shoppingCart[0][1]} ${shoppingCart[0][0]} in your cart.`);