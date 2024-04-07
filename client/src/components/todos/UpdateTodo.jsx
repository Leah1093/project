import React from "react";
const UpdateTodo = ({ todo, getTodos, setIsUpdate }) => {

    const updateTodo = (element) => {
        element.preventDefault()
        fetch(`http://localhost:8086/todo/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({title: element.target[1].value, completed: element.target[0].checked }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then(response => {
            response.ok ? (getTodos(), setIsUpdate(-1)) : alert("oops somthing went wrong... please try again!")
        });
    }
    return (
        <>
            <form onSubmit={updateTodo}>
                <label>completed</label>
                <input type="checkbox" defaultChecked={todo.completed} />
                <label>title: </label>
                <input type="text" defaultValue={todo.title} />
                <input type="submit" value='update todo' />
            </form>
        </>
    )
}
export default UpdateTodo;