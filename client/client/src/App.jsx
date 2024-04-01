import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/Login';
import Register from './components/register/Register';
import './App.css'
import Posts from './components/posts/Posts';
import Todos from './components/todos/Todos';
import Albums from './components/albums/Albums';
import Comments from './components/posts/comments/Comments';
import Layout from './components/Layout';
import Photos from './components/albums/photos/Photos';
import Error from './components/error';
import Info from './components/info/Info';

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const user=(data)=>{
    return{
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      street: data.address.street,
      suite: data.address.suite,
      city: data.address.city,
      zipcode: data.address.zipcode,
      lat: data.address.geo.lat,
      lng: data.address.geo.lng,
      phone: data.phone,
      website: data.website,
      companyName: data.company.name,
      catchPhrase: data.company.catchPhrase,
      bs: data.company.bs
    }
  }
  useEffect(() => {
   
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    currntUser && fetch(`http://localhost:3000/users/${currntUser.id}`)
      .then(async response => {
        const data = await response.json() ;
        response.ok && setCurrentUser( ()=>user( data ))
      })
  }, []);


  return (
    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Router>
          <Routes >
            <Route path='/' element={<Navigate to={'/login'} />} />
            <Route path='/home/users/:userId' element={<Home />}>
              <Route path='albums' element={<Layout />} >
                <Route index element={<Albums />} />
                <Route path=":albumId/photos" element={<Photos />} />
              </Route>
              <Route path="posts" element={<Layout />} >
                <Route index element={<Posts />} />
                <Route path=":postId/comments" element={<Comments />} />
              </Route>
              <Route path='todos' element={<Todos />} />
              <Route path='info' element={<Info/>} />
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

