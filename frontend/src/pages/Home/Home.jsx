import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Topbar from '../../components/Topbar/Topbar';

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true });

  const handleCTAClick = () => {
    alert('Authentication system demo!');
  };

  return (
    <div className="homepage h-screen w-screen">
      <Topbar />
      <main className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-screen">
        <section 
          className="hero py-20 flex flex-col items-center justify-center text-center"
          ref={heroRef}
        >
          <motion.h1 
            className={`text-6xl font-extrabold mb-6 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            transition={{ duration: 0.6 }}
          >
            Secure Your Applications
          </motion.h1>
          <motion.p
            className={`text-xl mb-10 text-gray-300 max-w-2xl ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience state-of-the-art security with our comprehensive authentication solutions. Protect your users and their data with confidence.
          </motion.p>
          <motion.button
            className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition duration-300"
            onClick={handleCTAClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Discover More
          </motion.button>
        </section>

        <section 
          className="features py-20 from-gray-900 via-gray-800 to-black"
          ref={featuresRef}
        >
          <motion.h2 
            className={`text-5xl font-bold mb-12 text-center ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            transition={{ duration: 0.6 }}
          >
            Our Core Features
          </motion.h2>
          <ul className="flex flex-wrap justify-center gap-10">
            {['Multi-Factor Authentication', 'OAuth 2.0 Integration', 'Secure Password Storage', 'Role-Based Access Control', 'Biometric Authentication', 'Single Sign-On (SSO)'].map((feature, index) => (
              <motion.li 
                key={index}
                className="bg-gray-900 p-6 cursor-pointer rounded-lg text-lg text-gray-300 shadow-lg transform transition duration-300 hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </section>

        <section 
          className="testimonials py-20 from-gray-900 via-gray-800 to-black"
          ref={testimonialsRef}
        >
          <motion.h2 
            className={`text-5xl font-bold mb-12 text-center ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            transition={{ duration: 0.6 }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="testimonial mx-auto max-w-3xl text-center">
            <motion.p 
              className={`mb-6 text-xl text-gray-300 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              "This authentication system is a game-changer for our application security. The integration was seamless, and our users feel much safer."
            </motion.p>
            <motion.p 
              className={`text-xl text-gray-300 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              "The features and support provided have exceeded our expectations. Highly recommended!"
            </motion.p>
          </div>
        </section>
      </main>
      <footer className="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-center">
        <p className="text-lg">Contact us at <a href="mailto:contact@authsystem.com" className="text-blue-500 hover:text-blue-700">contact@authsystem.com</a></p>
      </footer>
    </div>
  );
}
