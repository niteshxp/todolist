const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const todolist = [];

app.get("/", (req, res) => {
    res.status(200).send("Welcomr to do list!")
})

app.get('/todos', (req, res) => {
    res.json(todolist)
})


app.post('/todos', (req, res) => {
    const todos = {
        id: todolist.length + 1,
        title: req.body.title
    }
    if (!req.body.title) {
        res.status(401).send("Enter todo!")
    } else {
        todolist.push(todos);
        res.status(200).json(todos)
    }
})

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todolist.find((t) => t.id === id)
    todo.title = req.body.title || todo.title;
    res.status(200).json(todo);
})

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todolist.findIndex((t) => t.id === id)
    todolist.splice(index, 1)
    res.send()
})


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})
