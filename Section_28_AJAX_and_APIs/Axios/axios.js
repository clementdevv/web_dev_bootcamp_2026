
// axios.get("https://swapi.dev/api/peopel/1")
// .then(res => {
//     console.log("RESPONSE:", res);
// })
// .catch((e) => {
//     console.log("ERROR! ", e); 
// })

// Refactored version using async...await, with an id parameter:

const getStarsWarsPerson = async (id) => {
    try {
        const res = await axios.get(`https://swapi.dev/api/peopel/${id}`);
    console.log(res.data); 
    } catch(e) {
        console.log("ERROR! ", e);
    }
};

getStarsWarsPerson(5);

const jokes = document.querySelector('#jokes'); 
const button = document.querySelector('button'); 

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    // console.log(jokeText);
    const newList = document.createElement("LI");
    newList.append(jokeText); 
    jokes.append(newList); 
}

const getDadJoke = async () => {
    try {
        const config = {headers: {Accept: 'application/json'}}
        const res = await axios.get('https://icanhazdadjoke.com/', config);   
        return res.data.joke;
    } catch(e) {        
        return "No Jokes are available, we're sorry."
    }
    
}

button.addEventListener('click', addNewJoke);
