// Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

const express = require('express')
const app = express()

let countRequest = 0;
function numberOfrequests(req, res, next) {
    countRequest = countRequest + 1;
    console.log(`Total request are ${countRequest}`);
    res.send({
        "Total number of request are": countRequest
    })
    next();
}

app.get('/user', numberOfrequests, function (req, res) {
    res.send(
        "Hii this is user route"
    )
})
app.get('/dashboard', numberOfrequests, function (req, res) {
    res.send(
        "Hii this is dashboard route"
    )
})
app.get('/profile', numberOfrequests, function (req, res) {
    res.send(
        "Hii this is profile route"
    )
})
app.get('/login', numberOfrequests, function (req, res) {
    res.send(
        "Hii this is user route"
    )
})

app.listen(3000)