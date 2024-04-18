import React,{useState} from 'react'
import './verifyotp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
console.log(otp,"body")
event.preventDefault();

axios('',otp)
.then((res)=>{
    console.log(res.data,"resposne")
    if(res.data.status){
        alert(res.data.message)
        navigate('login')
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
                        <input type="text" id='text' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter OTP' required />
                    </div>
                    <div className='button'>
                        <button>Verify</button>
                    </div>
                </form>
            </div>
        </>
    )
}