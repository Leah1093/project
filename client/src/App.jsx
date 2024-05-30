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
import Error from "./components/Error";
import Info from './components/info/Info';
import Albums from './components/albums/Albums';
import Photos from './components/albums/photos/Photos';
import EditPassword from './components/editPassword/EditPassword';
export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const user = (data) => {
    return {
      userId: data.userId,
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone
    }
  }

  useEffect( () => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    currntUser && fetch(`http://localhost:8080/user?username=${currntUser.username}`, {
      headers: { Authorization: currntUser.token.token }
    })
      .then(async response => {
        const data = await response.json();
        response.ok && setCurrentUser(() => user(data[0]))
      })
  }, []);

  return (
    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Router>
          <Routes >
            <Route path='/' element={<Navigate to={'/login'} />} />
            <Route path='/home/user/:username' element={<Home />}>
              <Route path='album' element={<Layout />} >
                <Route index element={<Albums />} />
                <Route path=":albumId/photo" element={<Photos />} />
              </Route>
              <Route path="post" element={<Layout />} >
                <Route index element={<Posts />} />
                <Route path=":postId/comment" element={<Comments />} />
              </Route>
              <Route path='todo' element={<Todos />} />
              <Route path='editPassword' element={<EditPassword />} />
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

