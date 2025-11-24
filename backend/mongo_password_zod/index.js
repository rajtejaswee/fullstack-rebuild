const express = require('express')
const { UserModel, TodoModel } = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {auth, JWT_SECRET} = require('./auth')
const mongoose = require('mongoose')
const  {signupSchema, loginSchema,todoSchema } = require('./validation')

const app = express();

app.use(express.json())
mongoose.connect("mongodb+srv://rajtejaswee02_db_user:kRm7MUYpbkWvfZr1@cluster0.oafpmuz.mongodb.net/?appName=Cluster0")

app.post("/signup", async function (req, res) {
    const parse = signupSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json(parse.error)
    }
    const {name, email, password} = parse.data

    const hashPassword = await bcrpyt.hash(password, 10);
    
    await UserModel.create({
        email: email,
        password: hashPassword,
        name: name
    })
    res.send({
        message:"You are signed in"
    })
})


app.post("/login", async function (req, res) {

    const parse = loginSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(403).json(parse.error)
    }
    const {email, password} = parse.data

    const user = await UserModel.findOne({
        email:email
    })
    if (!user) return res.status(403).json({ message: "Invalid Credentials" })
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(403).json({ message: "Invalid Credentials" })
    if (user && checkPassword) {
        const token = jwt.sign({
            id:user._id.toString()
        }, JWT_SECRET)
        res.send({
            token
        })
    }
    else {
        res.status(403).json({
            message:"Invalid Credentials"
        })
    }

})

app.post("/todo", auth, async function (req, res) {
    const { title } = req.body;
    if (!title) {
        res.send({
            message: "Title is missing"
        })
    }
    const todo = TodoModel.create({
        userId: req.user.id,
        title: title,
        done: false
    })
    res.json(todo)
})

app.get("/todos", auth, async function (req, res) {
    const todos = await TodoModel.find({
        userId: req.user.id
    })
    res.send(todos)
})

app.listen(3000);