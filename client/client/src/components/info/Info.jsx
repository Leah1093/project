import React, { useContext, useEffect } from "react";
import { UserContext } from '../../App'
import "./info.css"
const Info = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      <div className="info_item">
        <h1>info</h1>
        <p><span>id:</span> {currentUser.id}</p>
        <p><span>name:</span> {currentUser.name}</p>
        <p><span>username:</span> {currentUser.username}</p>
        <p><span>email:</span> {currentUser.email}</p>
        <label ><span>address:</span></label>
        <p><span>street:</span> {currentUser.street}</p>
        <p><span>suite:</span> {currentUser.suite}</p>
        <p><span>city: </span>{currentUser.city}</p>
        <p><span>zipcode:</span> {currentUser.zipcode}</p>
        <label ><span>geo</span></label>
        <p><span>lat:</span> {currentUser.lat}</p>
        <p><span>lng: </span>{currentUser.lng}</p>
        <p><span>phone: </span>{currentUser.phone}</p>
        <p><span>website:</span> {currentUser.website}</p>
        <label ><span>company</span></label>
        <p><span>name: </span>{currentUser.companyName}</p>
        <p><span>catchPhrase:</span> {currentUser.catchPhrase}</p>
        <p><span>bs: </span>{currentUser.bs}</p>
      </div>
    </>
  )
}
export default Info