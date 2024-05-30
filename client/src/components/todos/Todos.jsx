import React, { useEffect, useState, useContext } from "react";
import AddTodo from './AddTodo'
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateTodo from "./UpdateTodo";
import SortTodos from "./SortTodos";
import SearchTodos from "./SearchTodos";
import { UserContext } from "../../App";
import Todo from "./Todo";
import Style from "../loader.module.css"
import { fetchGet, fetchDelete } from "../fetch.js";
import './todosStyle.css'
const Todos = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const [isAdd, setIsAdd] = useState(false);
  const [isData, setIsData] = useState(false);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getTodos()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser])

  const getTodos = () => {
    fetchGet(`todo?userId=${currentUser.userId}`, setTodos, setAllTodos, setIsData);
  }
  
  const remove = (todoId, i) => {
    fetchDelete(`todo/${todoId}`, setTodos, setAllTodos, i)
  }

  return (
    <>
      {
        < >
          {
            loading ? <div className={Style.loader}>
              <div className={Style.circle}></div>
              <div className={Style.circle}></div>
              <div className={Style.circle}></div>
              <div className={Style.circle}></div>
            </div> :
              < >
                <button onClick={() => setIsAdd(!isAdd)}>add todo</button>
                {isAdd && <AddTodo setIsAdd={setIsAdd} getTodos={getTodos} />}
                {isData ? <>
                  <div className="todos_container">
                    <SortTodos todos={todos} setTodos={setTodos} setAllTodos={setAllTodos} />
                    <SearchTodos setTodos={setTodos} allTodos={allTodos} />
                    {todos.map((todo, index) =>
                      <div className="todo_item" key={index}>
                        {isUpdate != index ? <>
                          <Todo todo={todo} />
                        </> :
                          <UpdateTodo setIsUpdate={setIsUpdate} index={index} todo={todo} setAllTodos={setAllTodos} setTodos={setTodos} />}
                        <button className='btnUpdate' onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                        <button className="btnRemove" disabled={isUpdate === index} onClick={() => remove(todo.id, index)}><MdDelete /></button>
                      </div>
                    )}
                  </div></> : <p>no todos</p>}
              </>}
        </>
      }
    </>
  )
}
export default Todos
