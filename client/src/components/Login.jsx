import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'
import { useForm } from 'react-hook-form';


const Login = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [exist, setExist] = useState(true);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const goToHome = (data, token_) => {
        setCurrentUser({
            userId: data.userId,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone
        })
        localStorage.setItem('currentUser', JSON.stringify({ username: data.username, userId: data.userId, token: token_ }));
        navigate(`/home/user/${data.username}`)
    }
    const isExist = async (name, password) => {
        try {
            const response = await fetch(`http://localhost:8080/entrance/login`, {
                method: 'POST',
                body: JSON.stringify({ username: name, password: password }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (response.ok) {
                const data = await response.json();
                goToHome(data.data, data.token)
            }
            else {
                if (response.status == 500)
                    alert("oops somthing went wrong... please try again!")
                else
                    alert("You are not allowed to enter!")
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }


    const logIn = (data) => {
        // if ((/^[a-zA-Z.]+$/.test(data.password) === false) || data.password.indexOf('.') === -1) {
        //לבדוק מה זה
        // setExist(false)
        // return
        // }
        isExist(data.username, data.password)
    }

    return (
        <>
            <h1>login</h1>
            {!exist && <div>Incorrect username or password</div>}
            <form noValidate onSubmit={handleSubmit(logIn)}>
                <input type='text' name='username' placeholder='username'
                    {...register("username", {
                        required: "username is required.",
                    })} />
                {errors.username ? <p>{errors.username.message}</p> : <br />}
                <input type="password" name="password" id="" placeholder='password'
                    {...register("password", {
                        required: "password is required.",
                    })} />
                {errors.password ? <p>{errors.password.message}</p> : <br />}
                <input type="submit" value="Log In" />
            </form>
            <div>new here? <Link style={{ textDecoration: 'underline' }} to={'/register'}>please sign up</Link></div>
        </>
    )
}
export default Login