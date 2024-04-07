// import React, { useState, useEffect, useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { UserContext } from '../../App'

// const UserDetailes = ({ username, password }) => {
//     const navigate = useNavigate();
//     const [currentUser, setCurrentUser] = useContext(UserContext);

//        const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();

//     const goToHome = (data) => {
//         setCurrentUser({
//             userId:data.userId,
//             name: data.name,
//             username: data.username,
//             email: data.email,
//             phone: data.phone,
//             website: data.website
//         })
//         localStorage.setItem('currentUser', JSON.stringify({ username: username, id: id }));
//         navigate(`/home/users/${data.id}`)
//     }

//     const addDetailes = (data) => {
//         const user = {
//             name: data.name,
//             username: username,
//             email: data.email,
//             phone: data.phone,
//             website: password
//         };

//         fetch('http://localhost:8086/entrance/register', {
//             method: 'POST',
//             body: JSON.stringify(user),
            
//         })
//             .then(async response => {
//                 const data = await response.json();
//                 (!response.ok) ? alert("oops somthing went wrong... please try again!") : goToHome(data)
//             })
//     };

//     return (
//         <>
//             <h1>add some more detailes...</h1>

//             <form noValidate onSubmit={handleSubmit(addDetailes)}>
//                 <input type="text" name="name" placeholder='name'
//                     {...register("name", {
//                         required: "name is required.",
//                         pattern: {
//                             value: /^[a-zA-Z. ]+$/,
//                             message: "Name is not valid."
//                         }
//                     })} />
//                 {errors.name && <p>{errors.name.message}</p>}

//                 <input type="email" placeholder='email' name="email"
//                     {...register("email", {
//                         required: "Email is required.",
//                         pattern: {
//                             value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                             message: "Email is not valid."
//                         }
//                     })} />
//                 {errors.email && <p>{errors.email.message}</p>}

//                 <label>address</label>

//                 <input type='text' placeholder='street' name='street'
//                     {...register("street", {
//                         required: "street is required.",
//                         pattern: {
//                             value: /^[a-zA-Z.  - 0-9]+$/,
//                             message: "street is not valid."
//                         }
//                     })} />
//                 {errors.street && <p>{errors.street.message}</p>}

//                 <input type='text' name="suite" placeholder='suite'
//                     {...register("suite", {
//                         required: "suite is required.",
//                         pattern: {
//                             value: /^[a-zA-Z. - 0-9]+$/,
//                             message: "suite is not valid."
//                         }
//                     })} />
//                 {errors.suite && <p>{errors.suite.message}</p>}

//                 <input type='text' name="city" placeholder='city'
//                     {...register("city", {
//                         required: "city is required.",
//                         pattern: {
//                             value: /^[a-zA-Z -]+$/,
//                             message: "city is not valid."
//                         }
//                     })} />
//                 {errors.city && <p>{errors.city.message}</p>}

//                 <input type='text' name="zipcode" placeholder='zipcode'
//                     {...register("zipcode", {
//                         required: "zipcode is required.",
//                         pattern: {
//                             value: /^\d{5}[-\s]?(?:\d{4})?$/,
//                             message: "zipcode is not valid."
//                         }
//                     })} />
//                 {errors.zipcode && <p>{errors.zipcode.message}</p>}

//                 <label>geo</label>
//                 <input type='text' name="lat" placeholder='lat'
//                     {...register("lat", {
//                         required: "lat is required.",
//                         pattern: {
//                             value: /^[0-9 -]+$/,
//                             message: "lat is not valid."
//                         }
//                     })} />
//                 {errors.lat && <p>{errors.lat.message}</p>}

//                 <input type='text' name="lng" placeholder='lng'
//                     {...register("lng", {
//                         required: "lng is required.",
//                         pattern: {
//                             value: /^[0-9-.]+$/,
//                             message: "lng is not valid."
//                         }
//                     })} />
//                 {errors.lng && <p>{errors.lng.message}</p>}

//                 <input type="tel" name="phone" placeholder='phone'
//                     {...register("phone", {
//                         required: "phone is required.",
//                         pattern: {
//                             value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
//                             message: "phone is not valid."
//                         }
//                     })} />
//                 {errors.phone && <p>{errors.phone.message}</p>}

//                 <label >company</label>
//                 <input type='text' name='companyName' placeholder='company name'
//                     {...register("companyName", {
//                         required: "company name is required.",
//                         pattern: {
//                             value: /^[a-zA-Z. -]+$/,
//                             message: "company name is not valid."
//                         }
//                     })} />
//                 {errors.companyName && <p>{errors.companyName.message}</p>}

//                 <input type='text' name='catchPhrase' placeholder='catch phrase'
//                     {...register("catchPhrase", {
//                         required: "catch phrase is required.",
//                         pattern: {
//                             value: /^[a-zA-Z. -]+$/,
//                             message: "catch phrase is not valid."
//                         }
//                     })} />
//                 {errors.catchPhrase && <p>{errors.catchPhrase.message}</p>}

//                 <input type='text' name='bs' placeholder='bs'
//                     {...register("bs", {
//                         required: "bs is required.",
//                         pattern: {
//                             value: /^[a-zA-Z. -]+$/,
//                             message: "bs is not valid."
//                         }
//                     })} />
//                 {errors.bs && <p>{errors.email.bs}</p>}

//                 <input type="submit" value="add detailes" />
//             </form>
//         </>
//     );
// }
// export default UserDetailes