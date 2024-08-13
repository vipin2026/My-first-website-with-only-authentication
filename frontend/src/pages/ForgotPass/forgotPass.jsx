import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ email: '' });

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const InputEvent = (e) => {
    const { id, value } = e.target;
    setEmail((prevValue) => ({
      ...prevValue,
      [id]: value
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/user/v1/forgotpassword', email)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, { autoClose: 1000 });
          sessionStorage.setItem('email', email.email);
          navigate('/resetpassword');
        } else {
          toast.error(res.data.message, { autoClose: 1000 });
        }
      }).catch(() => {
        toast.error('Error during password reset request', { autoClose: 1000 });
      });
  };

  const onClickContact = () => {
    navigate('/about');
  };

  return (
    <div className='h-screen w-screen justify-center flex bg-gradient-to-r from-gray-900 via-gray-800 to-black'>
      <motion.div 
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.form 
          onSubmit={submitForm} 
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mt-28"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Forgot Password</h1>
          <p className="text-center text-gray-400 mb-4">Enter your registered email</p>
          <div className="input-field mb-4">
            <input 
              type="email" 
              id="email" 
              onKeyDown={handleKeyDown} 
              onChange={InputEvent} 
              placeholder="Enter your registered email" 
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
              Send Reset Link
            </motion.button>
          </div>
        </motion.form>
        <div className="contact-link mt-4">
          <p className="text-center text-gray-400">Need help? <span onClick={onClickContact} className="text-blue-500 cursor-pointer">Contact Support</span></p>
        </div>
      </motion.div>
    </div>
  );
}
