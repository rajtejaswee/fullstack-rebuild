const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const JWT_SECRET = "USER_APP"

// function generateRandomString(length) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }


const users = []

app.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password
    
  users.push({ username, password})       
  res.status(200).send("Signed up Successfully")
})


app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = users.find(user => user.username === username && user.password === password)
    if (user) {
        const token = jwt.sign({
            username:user.username
        }, JWT_SECRET)
        user.token = token
        res.send({
            token
        })
        console.log(users)
    }
    else {
        res.status(403).send({
            message:"Invalid username and password"
        })
    }

})

app.get('/me', (req, res) => {
    const token = req.headers.authorization;
    const userDetails = jwt.verify(token, JWT_SECRET)
    const username = userDetails.username
    const user = users.find(user => user.username === username)
    if (user) {
        res.send({
            username: user.username
        })
    }
    else {
        res.status(403).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000)
