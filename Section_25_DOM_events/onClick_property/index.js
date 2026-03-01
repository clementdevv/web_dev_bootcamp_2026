const btn = document.querySelector('#v2')

btn.onclick = function() {
    console.log("Clicked successfully")
}

function scream() {
    console.log("Good, you made a click")
}

btn.onmouseenter = scream; 


document.querySelector('h1').onclick = function  () {
    alert('Clicked!')
}