


const person = {
    name: "Patrick",
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

person.greet(); // 'this' is 'person'. Output: "Hi, I'm Patrick"


const speak = person.greet;


const box = {
    collection: ["Top", "Bottom"],
    showRegular() {
        this.collection.forEach(function(item) {
            // Regular functions create their own 'this' context.
            // Inside here, 'this' is actually undefined or the window!
            console.log("Regular:", this); 
        });
    },
    showArrow() {
        this.collection.forEach((item) => {
            // Arrow functions INHERIT 'this' from their parent scope.
            // Inside here, 'this' is still the 'box' object.
            console.log("Arrow sees:", this.collection);
        });
    }
};

box.showArrow();