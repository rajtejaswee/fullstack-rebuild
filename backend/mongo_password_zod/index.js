const express = require('express')
const { UserModel, TodoModel } = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {auth, JWT_SECRET} = require('./auth')
const mongoose = require('mongoose')
const  {signupSchema, loginSchema,todoSchema } = require('./validation')

const app = express();

app.use(express.json())
mongoose.connect("")

app.post("/signup", async function (req, res) {
    const parse = signupSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json(parse.error)
    }
    const {name, email, password} = parse.data

    const hashPassword = await bcrypt.hash(password, 10);
    
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
        return res.status(400).json(parse.error)
    }
    const {email, password} = parse.data
    const user = await UserModel.findOne({
        email:email
    })
    if (!user) return res.status(403).json({ message: "Invalid Credentials" })
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(403).json({ message: "Invalid Credentials" })
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET)
    return res.json({ token })

})

app.post("/todo", auth, async function (req, res) {
    const parse = todoSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json(parse.error)
    }
    const { title } = parse.data
    const todo = await TodoModel.create({
        userId: req.user.id,
        title,
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

app.put("/todo/:id", auth, async function (req, res) {
    const parse = todoSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json(parse.error)

    const { title } = parse.data
    const { id } = req.params

    const todo = await TodoModel.findById(id);
    if (!todo) {
       return res.status(404).send("Todo not found")
    }
    if (todo.userId.toString() !== req.user.id) {
        return res.status(403).send("Unauthorized")
    }
    todo.title = title
    await todo.save()

    res.json(todo)
})

app.put("/todo/:id/done", auth, async function (req, res) {
    const { id } = req.params
    
    const todo = await TodoModel.findById(id)
    if (!todo) {
        return res.status(404).send("Todo not found")
    }
    if (todo.userId.toString() !== req.user.id) {
        return res.status(403).send("Unauthorized")
    }
    todo.done = true
    await todo.save()
    res.send(todo)
})

app.delete("/todo/:id", auth, async function (req, res) {
    const { id } = req.params;
    const todo = await TodoModel.findById(id)
    if (!todo) {
        return res.status(404).send("Todo not found")
    }
    if (todo.userId.toString() !== req.user.id) {
        return res.status(403).send("Unauthorized")
    }
    await TodoModel.deleteOne({ _id: id })
    res.json({
        message: "Todo deleted"
    })

})

app.listen(3000);