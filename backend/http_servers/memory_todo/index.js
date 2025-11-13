const express = require('express')
const app = express()
app.use(express.json());


let todos = [
    {
        "task": "Do the homework",
        "done": true
    }
];


//get the todo list
app.get('/list', function (req, res) {
    res.send(todos);
})


//create a todo
app.post('/create', function (req, res) {
    const data = req.body
    todos.push(data);
    res.send("Created the todo")
})

//delete
app.delete('/delete', function (req, res) {
    const { task } = req.body; 
    const initialLength = todos.length;
    todos = todos.filter(t => t.task !== task);
    if (todos.length === initialLength) {
        return res.send("Todo not found");
    }
    res.send("Deleted the todo");
});


app.listen(3000)