import { useEffect, useRef, useState } from 'react'
import CreateTodo from './components/CreateTodo';
import Todo from './components/Todo';
import './App.css'

async function fetchFromDB(){
  const data= await fetch('http://localhost:5000/todos');
  const  dataJson= await data.json();
  return dataJson.todos;
}

function App() {
  const [todos,setTodos]=useState([]);
  const titleRef=useRef(null);
  const descriptionRef=useRef(null);

  useEffect(()=>{
    async function use(){
      const fromDb=await fetchFromDB();
      setTodos(fromDb);
    }
    use();
  },[])

  async function addTodo(){
    let title=titleRef.current.value;
    let description=descriptionRef.current.value;
    if(title==='' || description==='')return;
    const newTodo=await fetch('http://localhost:5000/todo',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({title,description})
    })
    const newTodoJson=await newTodo.json();
    console.log(newTodoJson);
    ({title,description}=newTodoJson.newTodo);
    const {_id}=newTodoJson;
    setTodos([...todos,{_id,title,description}]);
    titleRef.current.value='';
    descriptionRef.current.value='';
  }

  async function done(id){
    await fetch('http://localhost:5000/completed',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({id})
    })
    setTodos((todos)=>{
      return todos.map((todo)=>{
        if(todo._id===id)return {...todo,completed:!todo.completed};
        else return todo;
      })
    })
  }

  return (
    <>
      <CreateTodo titleRef={titleRef} descriptionRef={descriptionRef} addTodo={addTodo} />
      {todos.map((todo,index)=>{
        const {title,description,_id,completed}=todo;
        return (
          <Todo key={index} index={index} title={title} description={description} _id={_id} completed={completed} done={done}/>
        )
      })}
    </>
  )
}

export default App
