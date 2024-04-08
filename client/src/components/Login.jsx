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

    const goToHome = (data) => {
        console.log("fdsf  " + data)
        setCurrentUser({
            userId: data.userId,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone
        })
        localStorage.setItem('currentUser', JSON.stringify({ username: data.username, userId: data.userId }));
        navigate(`/home/user/${data.username}`)
    }
    //צריך לשנות לבקשה אחת
    const isExist = (name, password) => {
        // fetch(`http://localhost:8086/user?username=${name}`)
        //     .then(async response => {
        //         const data = await response.json();
        //         (data.length==0) ? alert(`${name} does not exist`) :
        //          fetch(`http://localhost:8086/entrance/login`, {
        //             method: 'POST',
        //             body: JSON.stringify({username:name,password:password}),
        //             headers: { 'Content-type': 'application/json; charset=UTF-8' }
        //         })
        //             .then(response => {
        //                 (response.status!=200) ? alert("oops somthing went wrong... please try again!") : (goToHome(data[0]))
        //             })
        //     })

        fetch(`http://localhost:8086/entrance/login`, {
            method: 'POST',
            body: JSON.stringify({ username: name, password: password }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(async response => {
                const data = await response.json();
                if (response.ok)
                    (goToHome(data.data))
                else
                    throw (response);
            }).catch(response => {
                if (response.status == 500)
                    alert("oops somthing went wrong... please try again!")
                else
                    alert("You are not allowed to enter!")

            })
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