
// --- THE CLEAN WAY (Promise Chaining) ---
fakeRequest('yelp.com/api/coffee/page1')
    .then((data) => {
        log.innerHTML += `${data} <br>`;
        return fakeRequest('yelp.com/api/coffee/page2'); // Return the next promise!
    })
    .then((data) => {
        log.innerHTML += `${data} <br>`;
        return fakeRequest('yelp.com/api/coffee/page3'); // Return the next promise!
    })
    .then((data) => {
        log.innerHTML += `${data} <br>`;
        log.innerHTML += "<b>ALL PAGES LOADED (Chained)</b>";
    })
    .catch((err) => {
        // ONE catch to rule them all! 
        // If any request in the chain fails, it jumps straight here.
        log.innerHTML += `STOPPED: ${err}`;
    });