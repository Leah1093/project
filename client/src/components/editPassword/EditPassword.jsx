import React, { useContext, useState } from "react";
import { UserContext } from '../../App'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


const EditPassword = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [exist, setExist] = useState("");
    // const MessageBox = require('windowsmessagebox');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const deleteAccount = () => {
        // let buttons = [
        //     ["Yes"],
        //     ["No"]
        // ]
        
        // let clicked  = windowsMessageBox.show("attntion!!", "This is my message!", "info", buttons);
        
        // console.log(clicked); // "Yes" if the user clicked on the "Yes" button, "No" if the user clicked on the "No" button
        fetch(`http://localhost:8086/user?username=${currentUser.username}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
          })
            .then(response => {
              response.ok ?(localStorage.removeItem("currentUser"),window.history.replaceState(null, null, '/'),location.reload()) : alert("oops somthing went wrong... please try again!");
            })


    }

    const editPassword = (data) => {
        if (data.newPassword != data.passwordVerification) {
            setExist("notValid");
            return
        }
        const password = [{
            username: currentUser.username,
            password: data.password
        }, { password: data.newPassword }];
        console.log("pass" + password)
        fetch('http://localhost:8086/user', {
            method: 'PUT',
            body: JSON.stringify(password),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(async response => {
                const data = await response.json();
                (!response.ok) ? alert("oops somthing went wrong... please try again!")
                    : (response.status == 409) ? setExist("fail") : (alert("Your password has been successfully changed"), navigate(`/home/user/${currentUser.username}`))
            })
    };
    //לשנות ל user

    return (
        <>
            {exist === "notValid" && <div>not valid input</div>}
            {exist === "fail" && <div>incorrect password!</div>}
            <form onSubmit={handleSubmit(editPassword)}>
                <input type="password" name="password" placeholder='password'
                    {...register("password", {
                        required: "password is required.",
                        pattern: {
                            value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                            message: "password is not valid."
                        }
                    })} />
                {errors.password ? <p>{errors.password.message}</p> : <br />}

                <input type="password" name="newPassword" placeholder='new password'
                    {...register("newPassword", {
                        required: "new password is required.",
                        pattern: {
                            value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                            message: "password is not valid."
                        }
                    })} />
                {errors.newPassword ? <p>{errors.newPassword.message}</p> : <br />}

                <input type="password" name="passwordVerification" placeholder='password verification'
                    {...register("passwordVerification", {
                        required: "password verification is required.",
                        pattern: {
                            value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                            message: "password verification is not valid."
                        }
                    })} />
                {errors.passwordVerification ? <p>{errors.passwordVerification.message}</p> : <br />}

                <input type="submit" value="edit" />
            </form>

            <button onClick={deleteAccount}>Delete your account</button>
        </>
    )
}
export default EditPassword