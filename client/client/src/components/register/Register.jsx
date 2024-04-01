import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import UserDetailes from './UserDetailes';
import { useForm } from "react-hook-form";

const Register = () => {

    const [exist, setExist] = useState("");
    const [input, setInput] = useState({ name: "", password: "" })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const isExist = (name) => {
        fetch(`http://localhost:3000/users?username=${name}`)
            .then(response => response.json())
            .then(response => (response.length) ? setExist("exist") : setExist("notExist"))
    }

    const signUp = (data) => {
        if (data.password != data.passwordVerification) {
            setExist("notValid");
            return
        }
        setInput({ name: data.username, password: data.password })
        isExist(data.username)
    }

    return (
        <>
        <h1>sign up</h1>
            {exist === "notValid" && <div>not valid input</div>}
            {exist === "exist" && <div>you are an existing user please log in!</div>}
            {exist === "notExist" ? <UserDetailes username={input.name} password={input.password} /> :
                <div>
                    <form noValidate onSubmit={handleSubmit(signUp)}>
                        <input type='text' name='username' placeholder='username'
                            {...register("username", {
                                required: "username is required.",
                            })} />
                            {errors.username ? <p>{errors.username.message}</p>:<br/>}

                        <input type="password" name="password" placeholder='password'
                            {...register("password", {
                                required: "password is required.",
                                pattern: {
                                    value:/^[a-zA-Z]+[.]+[a-zA-Z ]+$/ ,
                                    message: "password is not valid."
                                }
                            })} />
                        {errors.password ? <p>{errors.password.message}</p>:<br/>}

                        <input type="password" name="passwordVerification" placeholder='password verification'
                            {...register("passwordVerification", {
                                required: "password verification is required.",
                                pattern: {
                                    value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/ ,
                                    message: "password verification is not valid."
                                }
                            })} />
                        {errors.passwordVerification ? <p>{errors.passwordVerification.message}</p>:<br/>}

                        <input type="submit" value="Sign Up" />
                    </form>
                </div>
            }
            <div>Are you an existing user? <Link style={{textDecoration:'underline'}}to={'/login'}>please login</Link></div>
        </>
    );
}
export default Register
