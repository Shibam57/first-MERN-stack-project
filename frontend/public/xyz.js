import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility for delay animation on each field
const fadeInStagger = (i) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: 'spring' }
  }
});

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const bubble = (style) => (
    <div className={`absolute bg-white/10 rounded-full animate-ping ${style}`} />
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
      
      {/* Animated Background Bubbles */}
      {bubble("w-48 h-48 top-10 left-10")}
      {bubble("w-24 h-24 bottom-16 right-12")}
      {bubble("w-32 h-32 top-2/3 left-1/3")}

      {/* Swirling BG Light Overlay */}
      <div className="absolute w-[600px] h-[600px] bg-purple-700 rounded-full opacity-30 blur-[160px] animate-spin-slow -z-10" />

      <AnimatePresence>
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10 }}
            className="bg-white/10 border border-white/20 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full z-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-center mb-8"
            >
              🎇 Sign Up in Style
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {['name', 'email', 'password', 'confirmPassword'].map((field, i) => (
                <motion.div
                  key={field}
                  custom={i}
                  variants={fadeInStagger(i)}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative">
                    <input
                      type={field.includes('password') ? 'password' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer w-full px-4 pt-6 pb-2 text-white bg-white/10 border border-white/30 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-[1.03] focus:bg-white/20 backdrop-blur transition-all duration-300"
                    />
                    <label className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40">
                      {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 0px 20px 4px rgba(255,255,255,0.3)',
                }}
                whileTap={{ scale: 0.9 }}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 transition font-bold py-3 rounded-xl"
              >
                💥 Create Account
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="text-center p-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.5 }}
              transition={{ delay: 0.3 }}
              className="text-5xl mb-4"
            >
              🎉
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl font-bold"
            >
              Registration Successful!
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}