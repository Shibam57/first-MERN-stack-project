import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from "react-toastify";

function SignUp() {

  const [loginInfo, setLoginInfo] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  })
  const [avatar, setAvatar] = useState(null)
  const navigate= useNavigate()

  const handleChange=(e)=>{
    const {name, value}=e.target 
    setLoginInfo((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarChange=(e)=>{
    const file=e.target.files[0]

    if(file){
      setAvatar(file)
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    const data = new FormData()
    data.append('fullName',loginInfo.fullName)
    data.append('email',loginInfo.email)
    data.append('username',loginInfo.username)
    data.append('password', loginInfo.password)
    if(avatar){
      data.append('avatar',avatar)
    }

    try {
      const res=await axios.post('/v1/users/register', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(res.data.message || "Signup successful!");
      setAvatar(null);
      setLoginInfo({ fullName: '', email: '', username: '', password: '' });
      navigate('/login')
      
    } catch (error) {
      console.error('Error registering user: ',error)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url('https://files.123freevectors.com/wp-content/original/119307-colorful-abstract-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-white/5">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Sign Up Logo"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block mb-1 text-white">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              autoFocus
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 text-white">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              autoFocus
              onChange={handleChange}
              placeholder="Your Username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block mb-1 text-white">Avatar</label>
            <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            autoFocus
            onChange={handleAvatarChange}
            className="w-full text-white file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:cursor-pointer"/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoFocus
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 underline hover:text-white">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp