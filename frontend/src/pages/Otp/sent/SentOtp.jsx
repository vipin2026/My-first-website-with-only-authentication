import React, { useState } from 'react'
import './sentotp.css'
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function Otp() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState({
        email: ''
    })
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    const InputEvent = (e) => {
        const { id, value } = e.target;
        setOtp((prevValue) => ({
            ...prevValue,
            [id]: value
        }))
    }

    const submitForm = (event) => {
        console.log(otp, "body")
        event.preventDefault();
        axios.post('', otp)
            .then((res) => {
                console.log(res.data, "response")
                if (res.data.status) {
                    alert(res.data.message)
                    navigate('/login')
                } else {
                    alert(res.data.message)
                }
            }).catch((error) => {
                console.log(error, "error")
            })


        // navigate('/login')
    }

    return (
        <>
            <div className='form-container'>
                <form onSubmit={submitForm}>
                    <h1>Verify your account</h1>
                    <p>enter your register email</p>
                    <div className='input-field'>
                        <input type="email" id='email' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='enter your registered email' required />
                    </div>
                    <div className="button">
                        <button>Sent Otp</button>
                    </div>
                </form>
            </div>
        </>
    )
}