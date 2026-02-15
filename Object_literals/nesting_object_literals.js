// Just like multidimensional arrays, objects can contain other objects. This is how most data (like JSON from an API) is structured.

const university = {
    name: "Tech Institute",
    address: {
        street: "123 Innovation Way",
        city: "San Francisco",
        zip: 94105
    },
    departments: {
        cs: {
            head: "Dr. Smith",
            students: 500
        },
        math: {
            head: "Dr. Euler",
            students: 200
        }
    }
};

// Accessing nested data (chaining dots)
console.log(university.address.city); 
console.log(university.departments.cs.head); 