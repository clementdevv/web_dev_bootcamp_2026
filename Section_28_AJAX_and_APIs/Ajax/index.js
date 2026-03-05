//This is a Demo on XMLHttpRequest

const req = new XMLHttpRequest(); 

req.onload = function() {
    console.log("It Loaded!")
    const data = JSON.parse(this.responseText);
    console.log(data.name, data.height);
}

req.onerror = function() {
    console.log("ERROR!!!!")
    console.log(this);
}

req.open("GET", "https://swapi.dev/api/peopel/1")
req.send(); 
