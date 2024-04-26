import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate ,Link } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })



    const inputEvent = (e) => {
        const { id, value } = e.target;
        setLogin((prevValue) => ({
            ...prevValue,
            [id]: value
        }))
    }

    const submitForm = (event) => {
        console.log(login, "inputvalue")
        event.preventDefault();
      
        axios.post('http://localhost:4000/user/v1/login', login)
            .then((res) => {
                console.log(res.data, "response")
                if (res.data.status) {
                    // alert('Login !! successfully')
                    toast.success('Login !! successfully', {autoClose:1000});
                    sessionStorage.setItem('token', res.data.result.token)
                    sessionStorage.setItem('email', res.data.result.email)
                    sessionStorage.setItem('name', res.data.result.name)
                    sessionStorage.setItem('contact', res.data.result.contact)
                    navigate('/profile')
                } else {
                    // alert(res.data.message)
                    toast.error(res.data.message,{autoClose:1000})
                }
            }).catch((error) => {
                console.log('Error', error)
            })
    }


    return (
        <>
            <div className="login-container">
                <form onSubmit={submitForm} >
                    <div className='login-input'>
                        <input type="email" id='email' onChange={inputEvent} placeholder='enter your email' required />
                    </div>
                    <div className='login-input'>
                        <input type="password" id='password' onChange={inputEvent} placeholder='enter your password' required />
                    </div>
                    <div className='button'><button>Login</button></div>
                </form>
                <div className='signup-button'>
                    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}