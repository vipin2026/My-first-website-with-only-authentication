import React from 'react'
import './profile.css'
import { useNavigate } from 'react-router-dom'
import blank_pic from '../../photos/blank_pic.png'
import pic from '../../photos/Untitled.jpeg'
import {toast} from 'react-toastify'

export default function Profile(){
    const navigate = useNavigate();
let email = sessionStorage.getItem('email')
let name = sessionStorage.getItem('name')
let contact = sessionStorage.getItem('contact')
let profile_pic = sessionStorage.getItem('profile_pic')


if (profile_pic == null) {
    profile_pic = blank_pic; // Set default image
}
const OnclickLogout =()=>{
toast.success('Logout Successfully',{autoClose:1000})
navigate('/login');
sessionStorage.clear();
}

const onClickForgot = ()=>{
navigate('/forgotpass')
}
return(
    <>
<div className="profile-container">
<div className="detail">
    <div className="name-bar">Hii {name}, welcome to your Profile </div>
    <div className="profile_pic"><img src={profile_pic} onError={(e)=>{e.target.src=blank_pic}} alt='hii'/></div>
    <div className="user_detail">
        <div className="input-value">Email : {email}</div>
        <div className="input-value">Contact : {contact}</div>
        <div className="input-value" onClick={onClickForgot} style={{display:'flex' , justifyContent:'center'}}>Change Password</div>
        <div className="input-value" onClick={OnclickLogout} style={{ display: 'flex', justifyContent: 'center' }}>
        <button>Logout</button>  </div>
    </div>
    </div>
</div>
    </>
)

} 


