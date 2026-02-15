

const user = {
    username: "dev_pro",
    points: 1500,
    "current status": "Active" // Keys with spaces must be in strings
};

// 1. Dot Notation (Clean and fast)
console.log(user.username); 

// 2. Bracket Notation (Required for keys with spaces or variables)
console.log(user["current status"]); 

let query = "points";
console.log(user[query]);