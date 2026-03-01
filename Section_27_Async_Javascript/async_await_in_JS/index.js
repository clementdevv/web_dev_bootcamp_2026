
// 1. A custom promise to simulate a server delay
const fakeApiCall = (stepName) => {
    return new Promise((resolve, reject) => {
        const delay = 1000;
        setTimeout(() => {
            console.log(`Finished: ${stepName}`);
            resolve(`Data for ${stepName}`);
        }, delay);
    });
};

const statusEl = document.querySelector('#status');
const btn = document.querySelector('#loginBtn');

// 2. The Async Function
// The 'async' keyword allows the use of 'await' inside the function
async function loginFlow() {
    try {
        statusEl.innerText = "Status: Connecting to Server...";
        
        // 'await' tells the JS engine: 
        // "Pause this function, let the thread do other things, 
        // and come back when this Promise resolves."
        const user = await fakeApiCall("Verifying User"); 
        
        statusEl.innerText = "Status: Fetching Profile...";
        const profile = await fakeApiCall("Loading Profile Settings");

        statusEl.innerText = "Status: Checking Permissions...";
        const access = await fakeApiCall("Access Granted");

        // Once all awaits are done, we finish!
        statusEl.innerText = `Status: Welcome! ${user} loaded.`;
        statusEl.style.color = "green";

    } catch (error) {
        // This replaces .catch() - it handles any error in the whole block
        statusEl.innerText = "Status: Login Failed!";
        statusEl.style.color = "red";
    }
}

btn.addEventListener('click', () => {
    console.log("Button clicked! Starting async flow...");
    loginFlow();
    console.log("The main thread is still FREE! I ran immediately.");
}); 