import React, { useState } from 'react'
import './sentotp.css'
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function Otp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState({
        email: ''
    })
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    const InputEvent = (e) => {
        const { id, value } = e.target;
        setEmail((prevValue) => ({
            ...prevValue,
            [id]: value
        }))
    }

    const submitForm = (event) => {
        console.log(email, "body")
        event.preventDefault();
        axios.post('http://localhost:4000/user/v1/sentOtp', email)
            .then((res) => {
                console.log(res.data, "response")
                if (res.data.status) {
                    // alert(res.data.message)
                    toast.success(res.data.message,{autoClose:1000})
                    sessionStorage.setItem('email', email.email)
                    navigate('/verifyotp')
                } else {
                    alert(res.data.message)
                }
            }).catch((error) => {
                console.log(error, "error")
            })


        // navigate('/login')
    }

    const onClickContact = () => {
        navigate('/sentotp1')
    }

    return (
        <>
            <div className='form-container'>
                <form onSubmit={submitForm}>
                    <h1>Verify your account</h1>
                    <p>Enter your Registered email</p>
                    <div className='input-field'>
                        <input type="email" id='email' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='enter your registered email' required />
                    </div>
                    <div className="button">
                        <button>Sent Otp</button>
                    </div>
                </form>
                <div className='contact-link'>
                    <p>Verify using <a onClick={onClickContact}>Contact</a></p>
                </div>
            </div>
        </>
    )
}