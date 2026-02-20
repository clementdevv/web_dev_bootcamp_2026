// Lexical Scope- an inner function defined within another has access to the variables defined inside the outer function


function bankRobbery() {
    const heroes = ['Spiderman', 'Batman', 'Wonder'] 
    function cryForHelp() {
        for (let hero of heroes) {
            console.log(`SOS!, ${hero.toUpperCase()}`)
        }
    }
    cryForHelp();
}

console.log(bankRobbery())