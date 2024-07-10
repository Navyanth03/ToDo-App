import { useRef, useState } from "react";
import './App.css'

function App() {
  const [todos, setTodos]=useState([]);
  const titleRef=useRef(null);
  const descriptionRef=useRef(null);

  function addTodo(){
    const title=titleRef.current.value;
    const description=descriptionRef.current.value;
    if(title==='' || description==='')return;
    setTodos([...todos,{
      title,
      description
    }]);
    titleRef.current.value='';
    descriptionRef.current.value='';
  }

  return (
    <> 
      <input type="text" placeholder="Input" ref={titleRef}/>
      <input type="text" placeholder="Description" ref={descriptionRef}/>
      <button onClick={addTodo}>Add new Todo</button>
      <div>{todos.map((todo,index)=><Todo key={index} id={index} title={todo.title} description={todo.description}/>)}</div>
    </>
  )
}

function Todo(props){
  return(
    <div className="todo">
      <div className="todo-number">Todo {props.id+1}</div>
      <div className="title">Title: {props.title}</div>
      <div className="description">Description: {props.description}</div>
    </div>
  )
}

export default App
