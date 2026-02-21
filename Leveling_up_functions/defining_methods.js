


const mathOperations = {
    // 1. The "Classic" Way
    // Property name: function definition
    multiply: function(x, y) {
        return x * y;
    },

    // 2. The ES6 Shorthand (Preferred)
    // No colon, no 'function' keyword
    divide(x, y) {
        return x / y;
    },

    square(x) {
        return x * x;
    }
};

console.log("Multiply Method:", mathOperations.multiply(5, 5)); // 25
console.log("Divide Method:", mathOperations.divide(10, 2));    // 5


const user = {
    firstName: "Spongebob",
    lastName: "Squarepants",
    nickName: "The Goofy Goober",
    
    // Using 'this' to access internal properties
    fullName() {
        // 'this' refers to the current object (user)
        return `${this.firstName} ${this.lastName}`;
    },

    introduce() {
        console.log(`Hi, I'm ${this.fullName()}, but you can call me ${this.nickName}.`);
    }
};

user.introduce();



const cat = {
    name: "Bluey",
    breed: "Russian Blue"
};

// You can attach a function to an object later
cat.meow = function() {
    console.log(`${this.name} says: MEOW!`);
};

cat.meow();