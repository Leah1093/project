import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/Login';
import Register from './components/register/Register';
import './App.css'
import Posts from './components/posts/Posts';
import Todos from './components/todos/Todos';
import Comments from './components/posts/comments/Comments';
import Layout from './components/Layout';
import Error from './components/error';
import Info from './components/info/Info';

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const user = (data) => {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone
    }
  }

  useEffect(() => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    currntUser && fetch(`http://localhost:8086/users/${currntUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok && setCurrentUser(() => user(data))
      })
  }, []);


  return (
    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Router>
          <Routes >
            <Route path='/' element={<Navigate to={'/login'} />} />
            <Route path='/home/user/:userId' element={<Home />}>
              <Route path="post" element={<Layout />} >
                <Route index element={<Posts />} />
                <Route path=":postId/comment" element={<Comments />} />
              </Route>
              <Route path='todo' element={<Todos />} />
              <Route path='info' element={<Info />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/error' element={<Error />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App

