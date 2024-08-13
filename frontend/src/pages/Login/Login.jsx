import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import backgroundImage from "../../photos/Lottie Lego.gif"; 

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevValue) => ({
      ...prevValue,
      [id]: value
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true while request is in progress

    try {
      const res = await axios.post('http://localhost:4000/user/v1/login', login);
      if (res.data.status) {
        toast.success('Login successfully', { autoClose: 1000 });
        sessionStorage.setItem('token', res.data.result.token);
        sessionStorage.setItem('email', res.data.result.email);
        sessionStorage.setItem('name', res.data.result.name);
        sessionStorage.setItem('contact', res.data.result.contact);
        navigate('/profile');
      } else {
        toast.error(res.data.message, { autoClose: 1000 });
      }
    } catch (error) {
      toast.error('Error during login', { autoClose: 1000 });
    } finally {
      setLoading(false); // Always set loading to false after request completes
    }
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Topbar />
      <div className="login-container bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col items-center justify-center p-6">
        <form onSubmit={submitForm} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <input
              type="email"
              id='email'
              onChange={handleInputChange}
              placeholder='Enter your email'
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id='password'
              onChange={handleInputChange}
              placeholder='Enter your password'
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-center">
            <Link to='/forgotpassword' className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
        </form>
        <div className="mt-4">
          <p>Don't have an account? <Link to='/signup' className="text-blue-500 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
