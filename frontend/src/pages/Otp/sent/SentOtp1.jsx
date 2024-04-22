import React, { useState } from 'react'
import './sentotp1.css'
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function SentOtp1() {
    const navigate = useNavigate()
    const [contact, setContact] = useState({
        contact: ''
    })
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    const InputEvent = (e) => {
        const { id, value } = e.target;
        setContact((prevValue) => ({
            ...prevValue,
            [id]: value
        }))
    }

    const submitForm = (event) => {
        console.log(contact, "body")
        event.preventDefault();
        axios.post('http://localhost:4000/user/v1/sendOtp_Contact', contact)
            .then((res) => {
                console.log(res.data, "response")
                if (res.data.status) {
                    // alert(res.data.message)
                    toast.success(res.data.message,{autoClose:1000})
                    sessionStorage.setItem('contact',contact.contact)
                    navigate('/verifyotp1')
                } else {
                    alert(res.data.message)
                }
            }).catch((error) => {
                console.log(error, "error")
            })
    }

    const onClickEmail =()=>{
        navigate('/sentotp')
    }
    return (
        <>
            <div className='form-container'>
                <form onSubmit={submitForm}>
                    <h1>Verify your account</h1>
                    <p>Enter your Registered Contact</p>
                    <div className='input-field'>
                        <input type="email" id='email' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your registered Contact' required />
                    </div>
                    <div className="button">
                        <button>Sent Otp</button>
                    </div>
                </form>
                <div className='email-link'>
                    <p>Verify using <a onClick={onClickEmail}>Email</a></p>
                </div>
            </div>
        </>
    )
}