import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';

export default function SignUp() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: '',
    contact: '',
    email: '',
    password: ''
  });

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const InputEvent = (e) => {
    const { id, value } = e.target;
    setSignup((prevValue) => ({
      ...prevValue,
      [id]: value
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/user/v1/signup', signup)
      .then((res) => {
        if (res.data.status) {
          toast.success('Sign Up successfully', { autoClose: 1000 });
          navigate('/sentotp');
        } else {
          toast.error(res.data.message, { autoClose: 1000 });
        }
      }).catch((error) => {
        toast.error('Error during sign up', { autoClose: 1000 });
      });
  };

  return (
    <div className="w-screen h-screen">
      <Topbar />
      <div className="signup-container bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col items-center justify-center">
        <form onSubmit={submitForm} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <div className="mb-4">
            <input type="text" id='name' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your name' required className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <input type="text" id='contact' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your contact number' required className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <input type="email" id='email' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your email' required className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-6">
            <input type="password" id='password' onKeyDown={handleKeyDown} onChange={InputEvent} placeholder='Enter your password' required className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">Sign Up</button>
        </form>
        <div className="mt-4">
          <p>Already have an account? <Link to='/login' className="text-blue-500">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
