const express = require('express')
const app = express()

let requestCount = 0;

// function to count how many time request is hit.
// function requestIncrease() {
//     requestCount = requestCount + 1;
//     console.log(`Total number of request count ${requestCount}`)
// }

//middlewares
function requestIncrease(req,res,next) {
    requestCount = requestCount + 1;
    console.log(`Total number of request count ${requestCount}`)
    next();
}

//First Route
app.get('/hello', requestIncrease, function (req, res) {
    // requestIncrease(); //could have done this
    res.send("Hello World")
})

// Second Route
app.get('/hi',requestIncrease, function (req, res) {
    //requestIncrease(); //could have done this
    res.send("Hi from the backend")
})

app.listen(3000)