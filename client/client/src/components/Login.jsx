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
        setCurrentUser({ id: data.id,
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
            bs: data.company.bs})
        localStorage.setItem('currentUser', JSON.stringify({ username: data.username, id: data.id }));
        navigate(`/home/users/${data.id}`)
    }

    const isExist = (name, password) => {
        fetch(`http://localhost:3000/users?username=${name}&&website=${password}`)
            .then(async response => {
                const data = await response.json();
                (data===[]) ? setExist(false) : goToHome(data[0])
            })
    }

    const logIn = (data) => {
        if ((/^[a-zA-Z.]+$/.test(data.password) === false) || data.password.indexOf('.') === -1){
            setExist(false)
            return
        }
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
                    {errors.username ? <p>{errors.username.message}</p>:<br/>}
                <input type="password" name="password" id="" placeholder='password'
                  {...register("password", {
                    required: "password is required.",
                })} />
                {errors.password ? <p>{errors.password.message}</p>:<br/>}
                <input type="submit" value="Log In" />
            </form>
            <div>new here? <Link style={{ textDecoration: 'underline' }} to={'/register'}>please sign up</Link></div>
        </>
    )
}
export default Login