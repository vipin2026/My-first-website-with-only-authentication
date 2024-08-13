import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
// import './Verifyotp1.css';

export default function Verifyotp1() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    contact: '',
    otp: ''
  });

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
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
    let body = {
      otp: otp.otp,
      contact: sessionStorage.getItem('contact')
    };
    axios.post('http://localhost:4000/user/v1/verify_otp_contact', body)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, { autoClose: 1000 });
          sessionStorage.removeItem('contact');
          navigate('/login');
        } else {
          toast.error(res.data.message, { autoClose: 1000 });
          navigate('/sentotp1');
        }
      }).catch((error) => {
        toast.error('Error during OTP verification', { autoClose: 1000 });
      });
  };

  return (
    <motion.div 
      className="form-container flex items-center justify-center h-screen w-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form 
        onSubmit={SubmitForm} 
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">OTP Sent to your contact</h1>
        <p className="text-center text-gray-400 mb-4">Enter the OTP you received on your registered mobile number</p>
        <div className="input-field mb-4">
          <input 
            type="text" 
            id="otp" 
            onKeyDown={handleKeyDown} 
            onChange={InputEvent} 
            placeholder="Enter OTP" 
            required 
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div className="button">
          <motion.button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Verify
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
