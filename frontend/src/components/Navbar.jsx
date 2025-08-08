import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [username, setUsername]=useState('')
    const [avatar, setAvatar]=useState('')
    const navigate=useNavigate()
    // const location=useLocation()

    useEffect(()=>{
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!token)

      if(user && user !== "undefined"){
        try {
          const parsedUser=JSON.parse(user)
          setUsername(parsedUser.username)
          setAvatar(parsedUser.avatar)
        } catch (error) {
          console.error('Failed to parse user:', error)
        }
      }
      setLoading(false)
    },[])

    const handleLogout=async()=>{
      try {
        const token = localStorage.getItem('token')
        if(token && token !== "undefined"){
          await axios.post('http://localhost:4000/v1/users/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              withCredentials: true
            }
          )
        }
        else {
          console.warn("No token found, skipping logout API call.");
        }

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        setUsername('')
        setAvatar('')
        navigate('/Home')
      } catch (error) {
        console.log('Logout failed: ',error)
      }
    }

    if(loading) return null;


  return (
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <img
            src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
            alt="Logo"
            className="h-12 w-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Navigation Links */}
        {isLoggedIn && (
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link
              to="/Home"
              className="hover:text-blue-400 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link
              to="/PasswordGen"
              className="hover:text-blue-400 transition duration-200">
                Password
              </Link>
            </li>
            <li>
              <Link
              to="/MainCart"
              className="hover:text-blue-400 transition duration-200"
              >
                Color
              </Link>
            </li>
            <li>
              <Link
              to="/CurrencyInput"
              className="hover:text-blue-400 transition duration-200"
              >
                Currency
              </Link>
            </li>
          </ul>
        )}

        {/* Auth Buttons */}
        <div className="space-x-4 flex items-center">
          {isLoggedIn ? (
            <>
            <div className="flex items-center gap-2">
              <img src={avatar || 'https://ui-avatars.com/api/?name=User&background=random'} alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-white shadow" />
              <span className="text-black font-semibold">Hi, {username}</span>
            </div>
          
            <button onClick={handleLogout} className='px-4 py-2 bg-blue-500 rounded-lg hover:bg-red-600 transition duration-300'>Logout</button>
            </>
          ):(
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300">
                  Sign Up
                </button>
              </Link>
          </>
          )}
        </div>
      </div>
  )
}

export default Navbar
