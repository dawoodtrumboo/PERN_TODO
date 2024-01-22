const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config();;
const pool = require('./db')

app.use(cors())
app.use(express.json()) // allows us to access req.body

// ROUTES

// get all todos

app.get('/todos',async(req,res)=>{

    try{
        const todoList = await pool.query("SELECT * FROM todo;")
        res.json(todoList.rows)
    }catch(e){
        console.error(e)
    }
})
// get a todo
app.get('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const selectedTodo = await pool.query(`SELECT * FROM todo WHERE todoId = $1;`,[id])
        res.json(selectedTodo.rows)
    } catch (e) {
        console.error(e.message)
        
    }
})
// create a todo

app.post('/todos',async (req,res)=>{

    try{
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description])

        res.json(newTodo.rows)
    }catch(e){
        console.error(e.message)
    }
})

//update a todo

app.put('/todos/:id',async (req,res)=>{
    try {

        const {id}=req.params
        const {description,iscompleted} = req.body
        console.log(description,iscompleted,req.body,req.params)
        let query;
        let values;

        if (description != undefined) {
            query = 'UPDATE todo SET description = $1 WHERE todoId = $2';
            values = [description, id];
        } else if (iscompleted != undefined) {
            query = 'UPDATE todo SET isCompleted = $1 WHERE todoId = $2';
            // Ensure iscompleted is a boolean (true/false)
            values = [iscompleted, id];
            console.log(values)
        }

     
        
        await pool.query(query,values)
        res.json({message:'Todo was updated successfully'})
    } catch (e) {
        res.status(500).send('Internal Server Error')
        console.error(e)
        
    }
})

app.delete('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const query = `DELETE FROM todo WHERE todoId = $1`
        await pool.query(query,[id])
        res.json({message:'Todo was deleted successfully'})
    } catch (e) {
        res.status(500).send("Internal Server Error")
        console.error(e.message)
        
    }
})

//delete a toodo
app.listen(8000,()=>{
    console.log("Server is running on 8000")
})