import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../Util.jsx"

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate=useNavigate()

  const handleChange=(e)=>{
    const {name, value}=e.target
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      const res=await axios.post('/v1/users/login', formData, {
        headers: {
          'Content-type': 'application/json'
        }
      })

      
      localStorage.setItem('token', res.data.data.accessToken)
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      handleSuccess("Login Successful")
      alert('Login Successful')
      navigate('/Home')
      
    } catch (error) {
      console.error("Login error", error)
      handleError('Invalid credentials')
    }
  }

  return (
    <>
      <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url('https://files.123freevectors.com/wp-content/original/119307-colorful-abstract-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-blue/50">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Login Logo"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-white">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-800 underline hover:text-white">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}

export default Login
