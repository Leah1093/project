import React, { useEffect, useState, useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddTodo from './AddTodo'
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateTodo from "./UpdateTodo";
import SortTodos from "./SortTodos";
import SearchTodos from "./SearchTodos";
import { UserContext } from "../../App";
import Todo from "./Todo";
import './todosStyle.css'
import Style from "../loader.module.css"
const Todos = () => {

  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(false);
  const [todos, setTodos] = useState([]);
  let [allTodos, setAllTodos] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const [isAdd, setIsAdd] = useState(false);
  const [loading, setLoading] = useState(true)

  const getTodos = () => {
    fetch(`http://localhost:3000/todos?userId=${currentUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok &&(
        setTodos(data),
        setAllTodos(data))
      })
  }

  useEffect(() => {
    getTodos()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser])

  const remove = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.ok ? getTodos() : alert("oops somthing went wrong... please try again!");
      })
  }

  return (
    <>
      {!exist ? <AiOutlineLoading3Quarters /> : < >
      {loading ? <div className={Style.loader}>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
        </div> : < >
        <button onClick={() => setIsAdd(!isAdd)}>add todo</button>
        {isAdd && <AddTodo setIsAdd={setIsAdd} getTodos={getTodos} />}
        <div className="todos_container">
          <SortTodos todos={todos} setTodos={setTodos} setAllTodos={setAllTodos} />
          <SearchTodos setTodos={setTodos} allTodos={allTodos} />
          {todos.map((todo, index) =>
            <div className="todo_item" key={index}>
              {isUpdate != index ? <>
                <Todo todo={todo} />
              </> :
                <UpdateTodo setIsUpdate={setIsUpdate} todo={todo} getTodos={getTodos} />}
              <button className='btnUpdate' onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
              <button className="btnRemove" disabled={isUpdate === index} onClick={() => remove(todo.id)}><MdDelete /></button>
            </div>
          )}
        </div>
        </>}
      </>
      }
    </>
  )
}
export default Todos
