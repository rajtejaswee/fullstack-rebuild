const express = require('express')
const app = express()

app.use(express.json())

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


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
        const token = generateRandomString(10)
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
    const user = users.find(user => user.token === token)
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
