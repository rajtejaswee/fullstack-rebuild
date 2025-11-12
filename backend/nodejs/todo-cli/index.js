#!/usr/bin/env node
const fs = require('fs')
const { program } = require('commander');
const FILE_PATH = './todos.json'

function loadtodos() {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, "utf8")
    return JSON.parse(data || "[]")
}

function saveTodos(todos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos,null,2))
}

program
    .name("TODO CLI")
    .description("A todo app for command line interface")
    .version("1.0.0")

//Adding
program
    .command("add <task>")
    .description("Add a todo")
    .action((task) => {
        const todos = loadtodos();
        todos.push({ task, done: false })
        saveTodos(todos)
        console.log(`Added ${task}`)
    })

//Deleting
program
    .command("delete <task>")
    .description("Delete the todo")
    .action((task) => {
        let todos = loadtodos();
        const intiallength = todos.length;
        todos = todos.filter((t) => t.task !== task);
        saveTodos(todos)
        if (todos.length === intiallength) console.log(`No todo found of ${task}`)
        else console.log(`Deleted: ${task}`)
    })

// Marking done
program
    .command("done <task>")
    .description("Marking done the tode")
    .action((task) => {
        const todos = loadtodos();
        let todo = todos.find((t) => t.task === task)
        if (!todo) {
            console.log(`No task found ${task}`)
            return
        }
        todo.done = true;
        saveTodos(todos)
        console.log(`Marked done to the task "${task}"`)
    })

// Listing todo 
program
    .command("list")
    .description("Listing all the todos")
    .action(() => {
        const todos = loadtodos();
        if (todos.length === 0) {
            console.log(`No task in the todo`)
        }
        else {
            todos.forEach((t, item) => {
                const status = t.done ? "✅" : "❌";
                console.log(`${item + 1}.${t.task} ${status}`);
            })
        }
    })

program.parse();