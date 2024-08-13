import React from 'react';
import { useNavigate } from 'react-router-dom';
import blank_pic from '../../photos/blank_pic.png';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function Profile() {
  const navigate = useNavigate();
  let email = sessionStorage.getItem('email');
  let name = sessionStorage.getItem('name');
  let contact = sessionStorage.getItem('contact');
  let profile_pic = sessionStorage.getItem('profile_pic') || blank_pic;

  const onClickLogout = () => {
    toast.success('Logout Successfully', { autoClose: 1000 });
    navigate('/login');
    sessionStorage.clear();
  };

  const onClickForgot = () => {
    navigate('/forgotpass');
  };

  return (
    <motion.div
      className="flex flex-col items-center w-screen justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold mb-4 text-gray-100">Hi {name},</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Welcome to Your Profile</h2>
        <motion.img
          src={profile_pic}
          onError={(e) => { e.target.src = blank_pic }}
          alt="Profile"
          className="rounded-full w-32 h-32 mx-auto mb-6 border-4 border-gray-200 shadow-2xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="space-y-4 text-gray-300">
          <div className="text-lg">Email: {email}</div>
          <div className="text-lg">Contact: {contact}</div>
          <div
            className="cursor-pointer text-blue-300 hover:text-blue-500 transition-colors duration-300"
            onClick={onClickForgot}
          >
            Change Password
          </div>
          <motion.div
            className="mt-6"
            onClick={onClickLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-6 rounded-full shadow-lg transition-colors duration-300">
              Logout
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
