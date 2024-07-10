export default function Todo(props){
    return (
      <div className="todo">
        <div className="todo-number">Todo {props.index+1}</div>
        <div className="title">{props.title}</div>
        <div className="description">{props.description}</div>
        <button className="todo-btn" id={props._id} onClick={()=>props.done(props._id)}>{props.completed?'Done':'Mark as Done'}</button>
      </div>
    )
}