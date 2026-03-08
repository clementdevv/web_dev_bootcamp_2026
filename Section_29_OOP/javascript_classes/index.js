// We're now going to add syntactic sugar: The class syntax
// This will be some cleaner way of writing things so that we have less clunky code
// we'll have a class 'Color' (notice the capital C)
// we shall add the constructor function concept where args are passed


// Define a class (note the capital letter by convention)
class Color {

    // constructor runs automatically when we create a new object with 'new'
    constructor(r, g, b) {

        // assign values to the object being created
        this.r = r;
        this.g = g;
        this.b = b;
    }

    // Methods defined inside a class automatically live on the prototype
    // meaning all instances SHARE these methods

    rgb() {

        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    }

    hex() {

        const { r, g, b } = this;

        // same bit-shifting trick used earlier
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1);
    }

    rgba(a = 1.0) {

        const { r, g, b } = this;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}


// Creating instances of the class


const colorOne = new Color(255, 100, 25);
const colorTwo = new Color(40, 50, 60);

console.log(colorOne.rgb());
console.log(colorOne.hex());
console.log(colorOne.rgba(0.7));

console.log(colorTwo.rgb());
console.log(colorTwo.hex());
console.log(colorTwo.rgba());