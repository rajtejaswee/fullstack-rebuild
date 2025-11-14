// Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

const express = require('express')
const app = express();

function logger(req, res, next) {
    let timestamp = new Date().toISOString();
    console.log(`Incoming resquest method ${req.method} and the request URL is ${req.url} and timestamp being ${timestamp}`);
    next();
}
app.use(logger);

app.get('/route1', function (req, res) {
    res.send(
        "Route 1 is being hit"
    )
})
app.get('/route1', function (req, res) {
    res.send(
        "Route 1 is being hit"
    )
})
app.get('/route2', function (req, res) {
    res.send(
        "Route 2 is being hit"
    )
})
app.get('/route3', function (req, res) {
    res.send(
        "Route 3 is being hit"
    )
})
app.post('/route4', function (req, res) {
    res.send(
        "Route 4 is being hit"
    )
})

app.listen(3000)