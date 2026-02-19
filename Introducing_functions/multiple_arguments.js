/* 
- In some dice games like Craps, a roll of two 1's is called "Snake Eyes". 
- It's generally not a good roll.  
- Please write a function called isSnakeEyes, which accepts two numbers as inputs, representing two dice. 
- If the two numbers are both 1's, please print "Snake Eyes!" otherwise print "Not Snake Eyes!"
*/

function isSnakeEyes(firstRoll, secondRoll) {
    if(firstRoll == 1 && secondRoll == 1) {
        console.log('Snake Eyes!')
    }
    else {
        console.log('Not Snake Eyes')
    }

}

isSnakeEyes(3,1)