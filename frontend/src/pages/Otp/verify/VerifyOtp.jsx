import React, { useState } from 'react';
import './verifyotp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    email: '',
    otp: ''
  });

  const handleKeyDown = (e) => {
    if (e.key === '') {
      e.preventDefault();
    }
  };

  const InputEvent = (e) => {
    const { id, value } = e.target;
    setOtp((prevValue) => ({
      ...prevValue,
      [id]: value
    }));
  };

  const SubmitForm = (event) => {
    event.preventDefault();
    const body = {
      otp: otp.otp,
      email: sessionStorage.getItem('email')
    };
    axios.post('http://localhost:4000/user/v1/verify_otp_email', body)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, { autoClose: 1000 });
          sessionStorage.removeItem('email');
          navigate('/login');
        } else {
          toast.error(res.data.message, { autoClose: 1000 });
          navigate('/sentotp');
        }
      }).catch((error) => {
        toast.error('Error during OTP verification', { autoClose: 1000 });
      });
  };

  return (
  <div className='h-screen w-screen justify-center flex bg-gradient-to-r from-gray-900 via-gray-800 to-black'>
    <div className="form-container mt-28">
      <form onSubmit={SubmitForm} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">OTP Sent to your email</h1>
        <p className="text-center text-gray-400 mb-4">Enter OTP you received on email</p>
        <div className="input-field mb-4">
          <input type="text" id="otp" onKeyDown={handleKeyDown} onChange={InputEvent} placeholder="Enter OTP" required className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="button">
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">Verify</button>
        </div>
      </form>
    </div>
    </div>
  );
}
