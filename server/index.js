const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // gives access to request.body

/**
 * ROUTES
 */

// create todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;

        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error);
    }
})

// get all todos

// get a todo

// update a todo

// delete a todo

app.listen(5000, () => {
    console.log("Server has started on port 5000");
})