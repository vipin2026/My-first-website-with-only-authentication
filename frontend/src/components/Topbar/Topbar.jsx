import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <motion.nav 
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-4 shadow-lg"

    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <motion.div
          className="text-2xl font-bold"
          whileHover={{ scale: 1.1 }}
        >
          AuthSystem
        </motion.div>
        <ul className="flex space-x-6 text-lg">
          {['Home', 'About', 'SignUp', 'Login'].map((text, index) => (
            <motion.li 
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link   to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}  className="hover:text-blue-500 transition duration-300">
                {text}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
