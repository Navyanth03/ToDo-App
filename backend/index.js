const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
const {createTodo,updateTodo}=require('./types');
const {Todos,connectDB}=require('./db/database.js');

app.use(cors());
app.use(express.json());

app.get('/todos',async(req,res)=>{
    const todos= await Todos.find({});
    res.status(200).json({todos});
})

app.post('/todo',async(req,res)=>{
    const parsedInput=createTodo.safeParse(req.body);
    if(!parsedInput.success)return res.status(411).json({msg:'Send valid input'});
    const {title,description}=parsedInput.data;
    try {
        const newTodo=await Todos.create({title,description,completed:false});
        res.status(201).json({newTodo});
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post('/completed',async(req,res)=>{
    const parsedInput=updateTodo.safeParse(req.body);
    if(!parsedInput.success)return res.status(411).json({msg:'Send valid inputs'});
    const updatedTodo=await Todos.updateOne({
        _id:parsedInput.data.id
    },{
        completed:true
    });
    res.status(201).json({todo:updatedTodo});
})

async function start(){
    try {
        await connectDB(process.env.DATABASE_URI);
        console.log('Connected to database. Starting express server.....');
        app.listen(5000,()=>console.log('Listening on port 5000.....'));
    } catch (error) {
        console.log('Connection to DB failed',error);
    }
}

start();
