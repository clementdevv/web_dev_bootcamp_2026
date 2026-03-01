// A fake request function that returns a promise
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = 1000;
        setTimeout(() => {
            // Randomly fail 10% of the time to show error handling
            Math.random() > 0.1 
                ? resolve(`Data from ${url}`) 
                : reject(`Connection failed on ${url}`);
        }, delay);
    });
};

const log = document.querySelector('#log');
const btn = document.querySelector('#go');

btn.addEventListener('click', () => {
    log.innerHTML = "<b>Starting...</b><br>";

    // --- THE NESTED WAY (Promise Hell / Pyramid of Doom) ---
    // This is exactly like your image. It's hard to read and scale.
    fakeRequest('yelp.com/api/coffee/page1')
        .then((data) => {
            log.innerHTML += `${data} <br>`;
            fakeRequest('yelp.com/api/coffee/page2')
                .then((data) => {
                    log.innerHTML += `${data} <br>`;
                    fakeRequest('yelp.com/api/coffee/page3')
                        .then((data) => {
                            log.innerHTML += `${data} <br>`;
                            log.innerHTML += "<b>ALL PAGES LOADED (Nested)</b>";
                        })
                        .catch((err) => { log.innerHTML += `Page 3 ${err}`; });
                })
                .catch((err) => { log.innerHTML += `Page 2 ${err}`; });
        })
        .catch((err) => { log.innerHTML += `Page 1 ${err}`; });
});