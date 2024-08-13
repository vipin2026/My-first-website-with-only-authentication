import React from 'react';
import Topbar from '../../components/Topbar/Topbar';

export default function About() {
  return (
    <div className="w-screen h-screen">
      <Topbar />
      <div className="about-container bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-500">About Us</h1>
        <p className="text-xl max-w-2xl text-gray-300 text-center">
          Welcome to our authentication system. We provide state-of-the-art security solutions to protect your applications and data. Our team is dedicated to delivering secure, reliable, and user-friendly authentication services.
        </p>
      </div>
    </div>
  );
}
