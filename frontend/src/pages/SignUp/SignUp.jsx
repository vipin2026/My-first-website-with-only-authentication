import React, { useState } from 'react'
import './signUp.css'
import  axios from "axios";
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
    const navigate = useNavigate()
    const [signup, setSignup] = useState({
        name: '',
        contact: '',
        email: '',
        password: ''
    })
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    const InputEvent = (e) => {
        const { id, value } = e.target;
        setSignup((prevValue) => ({
            ...prevValue,
            [id]: value
        }))
    }

    const submitForm = (event) => {
        console.log(signup, "inputvalue")
        event.preventDefault();
        axios.post('http://localhost:4000/user/v1/signup', signup)
            .then((res) => {
                console.log(res.data, "response")
                if (res.data.status) {
                    // alert('Sign Up!! successfully')
                    toast('signup successfully',{autoClose:1000})
                    navigate('/sentotp')
                } else {
                    toast.error('Wrong Credentials')
                    // alert(res.data.message)
                }
            }).catch((error) => {
                console.log('Error', error)
                toast.error('ENTER  Valid detials')
            })

        // navigate('/login')
    }

    return (
        <>
            <div className='form-container'>
                <form onSubmit={submitForm}>
                    <div className='input-field'>
                        <input type="text" id='name'  onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your name' required/>
                    </div>
                    <div className='input-field'>
                        <input type="text" id='contact' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your contact number' required/>
                    </div>
                    <div className='input-field'>
                        <input type="email" id='email' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your email' required/>
                    </div>
                    <div className='input-field'>
                        <input type="password" id='password' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your password' required/>
                    </div>
                    <div className="button">
                        <button>Sign Up</button>
                    </div>
                </form>
                <div className='login-button'>
                    <p>Already have a account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </>
    )
}