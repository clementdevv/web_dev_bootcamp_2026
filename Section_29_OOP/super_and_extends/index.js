

class Animal {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    eat() {
        return `${this.name} is eating`;
    }

    sleep() {
        return `${this.name} is sleeping`;
    }
}


// "extends" means Cat inherits from Animal

class Cat extends Animal {

    // constructor for the subclass
    constructor(name, age, livesLeft) {

        // the super() method calls the parent constructor
        // This must happen BEFORE using "this"
        super(name, age);

        // subclass-specific property
        this.livesLeft = livesLeft;
    }

    // subclass-specific method
    meow() {
        return `${this.name} says MEOWWW`;
    }
}




// Creating an object:


const catOne = new Cat("Whiskers", 3, 9);


console.log(catOne.eat());      // inherited from Animal
console.log(catOne.sleep());    // inherited from Animal



// Using a subclass method:

console.log(catOne.meow());


// Accessing a subclass property:


console.log(catOne.livesLeft);

