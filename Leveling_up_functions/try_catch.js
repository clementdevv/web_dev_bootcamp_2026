


function getUsername(user) {
    try {
        // If 'user' is null or undefined, accessing .name will crash the app
        console.log("Attempting to read name...");
        console.log(user.name.toUpperCase());
    } catch (error) {
        // Instead of a red error in the console, we handle it here
        console.warn("Error caught!");
        console.error("Message:", error.message);
    } finally {
        // This runs no matter what (success or failure)
        console.log("Cleanup: Closing connection/spinner.");
    }
}

getUsername({ name: "Sandy" }); // Works fine
getUsername(null);




const rawData = '{"id": 101, "status": "active"}';
const badData = 'This is not JSON';

function parseData(str) {
    try {
        const data = JSON.parse(str);
        console.log("Success:", data.id);
    } catch (e) {
        console.log("Failed to parse string. Using default object instead.");
    }
}

parseData(rawData);
parseData(badData);

console.log("The script is still alive!");