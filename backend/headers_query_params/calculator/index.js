const express = require('express')
const app = express();

function getNumbers(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(404).send("Invalid Input");
        return null;
    }

    return { a, b };

}

app.get('/', (req, res) => {
    res.send("Welcome to the calculator")    
})
app.get('/sum', (req, res) => {
    const nums = getNumbers(req, res);
    if (!nums) {
        return
    }
    const sum = nums.a + nums.b;
    res.send({sum})
})
app.get('/difference', (req, res) => {
    const nums = getNumbers(req,res)
    if (!nums) return
    const diff = nums.a - nums.b
    res.send({diff})
})
app.get('/multiply', (req, res) => {
    const nums = getNumbers(req, res);
    if (!nums) return
    const product = nums.a * nums.b;
    res.send({product})
})
app.get('/divide', (req, res) => {
    const nums = getNumbers(req, res);
    if (!nums) return 
    if (nums.b == 0) {
        res.status(400).send("Please enter the valid denominator other than 0")  
    }
    const div = nums.a / nums.b;
    res.send({div})
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});