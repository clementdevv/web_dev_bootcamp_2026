
const fetchBtn = document.querySelector('#fetchBtn');
const errDiv = document.querySelector('#error');
const successDiv = document.querySelector('#success');

// 1. A request that fails if the "username" is empty
const fakeFetchUser = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin') {
                resolve({ id: 1, name: 'Admin User', role: 'Superuser' });
            } else {
                reject('User not found in database! ⚠️');
            }
        }, 1000);
    });
};

// 2. Handling the error inside an async function
async function getUserData() {
    // Reset UI
    errDiv.style.display = 'none';
    successDiv.style.display = 'none';

    try {
        console.log("Attempting to fetch...");
        
        // If this promise rejects, JS immediately jumps to the 'catch' block
        const data = await fakeFetchUser('guest'); // This will fail
        
        // This line will NEVER run if the line above fails
        successDiv.innerText = `Success! Welcome ${data.name}`;
        successDiv.style.display = 'block';

    } catch (e) {
        // 'e' is the error message passed from the reject()
        console.log("An error occurred:", e);
        errDiv.innerText = e;
        errDiv.style.display = 'block';
    } finally {
        // This runs regardless of success or failure
        console.log("Fetch attempt finished.");
    }
}

fetchBtn.addEventListener('click', getUserData);