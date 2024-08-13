import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function File() {
  const navigate = useNavigate();
  const [imageName, setImageName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      sessionStorage.setItem('uploadedFileName', file.name); // Store the file name in session storage
    }
  };

  const handleClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    navigate('/getfile');
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-100">Upload Your File</h1>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-300 mb-1">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-1">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        
        <div className="mb-6">
          <label 
            className="block cursor-pointer text-center text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg"
            onClick={handleClick}
          >
            {imageName || 'Upload file'}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </div>
        
        <motion.button
          type="submit"
          className="w-full bg-red-500 hover:to-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
