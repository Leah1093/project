import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import UserDetailes from './UserDetailes';
import { useForm } from "react-hook-form";

const Register = () => {

    const [exist, setExist] = useState("");
    // const [input, setInput] = useState({ name: "", password: "" })
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const goToHome = (data) => {
        setCurrentUser({
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone
        })
        localStorage.setItem('currentUser', JSON.stringify({ username: username, userId: userId }));
        navigate(`/home/user/${data.username}`)
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const addDetailes = (data) => {
        if (data.password != data.passwordVerification) {
            setExist("notValid");
            return
        }
        const user = [{
            userId: data.userId,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone
        }, { password: data.password }];

        fetch('http://localhost:8086/entrance/register', {
            method: 'POST',
            body: JSON.stringify(user),
        })
            .then(async response => {
                const data = await response.json();
                (!response.ok) ? alert("oops somthing went wrong... please try again!") : goToHome(data)
            })
    };




    const isExist = (name) => {
        fetch(`http://localhost:8086/users?username=${name}`)
            .then(response => response.json())
            .then(response => (response.length) ? setExist("exist") : setExist("notExist"))
    }

    const signUp = (data) => {
        if (data.password != data.passwordVerification) {
            setExist("notValid");
            return
        }
        // addDetailes()
        setInput({ name: data.username, password: data.password })
        isExist(data.username)
    }

    return (
        <>
            <h1>sign up</h1>
            {exist === "notValid" && <div>not valid input</div>}
            {exist === "exist" && <div>you are an existing user please log in!</div>}
            {/* {exist === "notExist" ? <UserDetailes username={input.name} password={input.password} /> : */}
            <div>
                <form noValidate onSubmit={handleSubmit(addDetailes)}>
                    <input type="text" name="name" placeholder='name'
                        {...register("name", {
                            required: "name is required.",
                            pattern: {
                                value: /^[a-zA-Z. ]+$/,
                                message: "Name is not valid."
                            }
                        })} />
                    {errors.name && <p>{errors.name.message}</p>}

                    <input type='text' name='username' placeholder='username'
                        {...register("username", {
                            required: "username is required.",
                        })} />
                    {errors.username ? <p>{errors.username.message}</p> : <br />}

                    <input type="password" name="password" placeholder='password'
                        {...register("password", {
                            required: "password is required.",
                            pattern: {
                                value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                                message: "password is not valid."
                            }
                        })} />
                    {errors.password ? <p>{errors.password.message}</p> : <br />}

                    <input type="password" name="passwordVerification" placeholder='password verification'
                        {...register("passwordVerification", {
                            required: "password verification is required.",
                            pattern: {
                                value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                                message: "password verification is not valid."
                            }
                        })} />
                    {errors.passwordVerification ? <p>{errors.passwordVerification.message}</p> : <br />}

                    <input type="number" name="userId" placeholder='id'
                        {...register("userId", {
                            required: "id is required.",
                            pattern: {
                                value: /\(?([0-9]{9})\)/,
                                message: "id is not valid."
                            }
                        })} />
                    {errors.userId && <p>{errors.userId.message}</p>}

                    <input type="email" placeholder='email' name="email"
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email is not valid."
                            }
                        })} />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input type="tel" name="phone" placeholder='phone'
                        {...register("phone", {
                            required: "phone is required.",
                            pattern: {
                                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                message: "phone is not valid."
                            }
                        })} />
                    {errors.phone && <p>{errors.phone.message}</p>}

                    <input type="submit" value="Sign Up" />
                </form>
            </div>
            {/* } */}
            <div>Are you an existing user? <Link style={{ textDecoration: 'underline' }} to={'/login'}>please login</Link></div>
        </>
    );
}
export default Register
