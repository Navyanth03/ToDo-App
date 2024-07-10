export default function CreateTodo(props){
    return (
        <>
        <input type="text" placeholder="title" ref={props.titleRef}/>
        <input type="text" placeholder="description" ref={props.descriptionRef}/>
        <button id="create-btn" onClick={props.addTodo}>Add new ToDo</button>
        </>
    )
}