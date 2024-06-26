import React,{useState} from 'react'
import './verifyotp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'


export default function Verifyotp() {

const navigate = useNavigate();
const [otp, setOtp] = useState({
    email:'',
    otp:''
})

const handleKeyDown = (e)=>{
    if(e.key ===''){
        e.preventDefault()
    }
}

const InputEvent = (e)=>{
const {id, value } = e.target
setOtp((prevValue)=>({
   ...prevValue,
   [id]:value
}));
}

const SubmitForm = (event)=>{
console.log(otp,"body1")
event.preventDefault();

let body = {
    otp:otp.otp,
    email:sessionStorage.getItem('email')
}
console.log(body,"body")
axios.post('http://localhost:4000/user/v1/verify_otp_email',body)
.then((res)=>{
    console.log(res.data,"resposne")
    if(res.data.status){
        // alert(res.data.message)
        toast.success(res.data.message,{autoClose:1000})
        sessionStorage.removeItem('email')
        navigate('/login')
    }else{
        alert(res.data.message)
        navigate('/sentotp')
    }
})
.catch((error)=>{
    console.log("Error",error)
})
}


    return(
        <>
            <div className='form-container'>
                <form onSubmit={SubmitForm}>
                <h1>Otp Sent to your email</h1>
            <p>enter otp you recieved on email</p>
                    <div className='input-field'>
                        <input type="otp" id='otp' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter OTP' required />
                    </div>
                    <div className='button'>
                        <button>Verify</button>
                    </div>
                </form>
            </div>
        </>
    )
}