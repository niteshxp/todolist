const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");

app.use(serveStatic("public"));

app.use(bodyParser.json());
let todos = []; // In-memory storage for todos

app.get("/", (req, res) => {
    res.json("Welcome to do!!");
});


// GET endpoint to fetch all todo items
app.get("/todos", (req, res) => {
    res.json(todos);
});

// POST endpoint to create a new todo item
// provide `title` and optionally `completed` in the request body as JSON
app.post("/todos", (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false,
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// PUT endpiont to update an existing todo item with the specified `id`
// provide updated `title` and/or `completed` in the request body as JSON
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed || todo.completed;
    res.json(todo);
});

// DELETE endpoint to remove an existing todo item with the specified `id`
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})