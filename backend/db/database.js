const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
    title: String,
    description: String,
    completed:Boolean 
})

const Todos=mongoose.model('todos',todoSchema);

function connectDB(url){
    return mongoose.connect(url);
}

module.exports={
    Todos,
    connectDB
};