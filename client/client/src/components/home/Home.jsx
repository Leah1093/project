import React, { useContext } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

import './Home.css'
const Home = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
    }
    if (userId != currentUser.id)
        navigate('/error')
    return (
        <>

            <header>
                <nav>
                    <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout </NavLink>
                    <NavLink to="./albums" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Albums </NavLink>
                    <NavLink to="./posts" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Posts </NavLink>
                    <NavLink to="./todos" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Todos </NavLink>
                    <NavLink to="./info" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info </NavLink>
                </nav>
            </header>
            <h1>Hi {currentUser.name}</h1>
            <Outlet />
        </>
    )
}
export default Home
