

const player = {
    name: "Mario",
    health: 100
};

// Update an existing property
player.health = 90;

// Add a new property
player.lives = 3;

// Delete a property
delete player.health;

console.log(player);