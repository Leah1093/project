import React, { useContext, useState, useEffect } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { FaArrowCircleUp } from 'react-icons/fa';
import { FaUserEdit } from "react-icons/fa";

import './Home.css'
const Home = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
    }

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true)
        }
        else if (scrolled <= 150) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);

    if (username != currentUser.username)
        navigate('/error')

    return (
        <>
            <header className={'sticky'}>
                <nav >
                    <NavLink className='editPassword' to='./editPassword' ><FaUserEdit /> </NavLink>
                    <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout </NavLink>
                    <NavLink to="./album" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Albums </NavLink>
                    <NavLink to="./post" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Posts </NavLink>
                    <NavLink to="./todo" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Todos </NavLink>
                    <NavLink to="./info" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info </NavLink>
                </nav>
            </header>
            <h1>Hi {currentUser.name}</h1>
            <footer>
                <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
                    <FaArrowCircleUp onClick={scrollToTop} />
                </button>
            </footer>
            <Outlet />
        </>
    )
}
export default Home
