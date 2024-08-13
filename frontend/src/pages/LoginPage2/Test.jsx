import React, { useState } from 'react'
import './test.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Test() {
    const navigate = useNavigate()

    const [signUp, setSignUp] = useState({
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

 const InputEvent = (e)=>{
const {id,value} = e.target
setSignUp((prevValue)=>({
...prevValue,
[id]:value
}))
 }
    //api =  'http://localhost:4000/user/v1/signup'

    const submitForm = () => {
        console.log(signUp, "body")

        axios.post('http://localhost:4000/user/v1/signup', signUp)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) {
                    navigate('/login')
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }
            }).catch((error) => {
                console.log(error, "ERROR")
                alert("ERROR")
            })

    }


    return (
        <>
            <div className='Test-Container'>
                <form onSubmit={submitForm}>
                    <div className="input-test">
                        <div className="input-field-test">
                            <input type="text" id="name"  onChange={InputEvent} placeholder='Enter Your Name' />
                        </div>
                        <div className="input-field-test">
                            <input type="tel" id="contact" inputMode='numeric' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter Your Contact' />
                        </div>
                        <div className="input-field-test">
                            <input type="email" id='email' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter Your Email' />
                        </div>
                        <div className="input-field-test">
                            <input type="password" id='password' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter Your Password' />
                        </div>
                    </div>
                    <div className="button-test">
                        <button>SignUp</button>
                    </div>
                </form>

            </div>
        </>
    )
}
