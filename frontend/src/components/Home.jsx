import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const navigate=useNavigate();
  const token=localStorage.getItem('token')
  const isLoggedIn=!!token

  const handleProtectedClick=(e, path)=>{
    if(!isLoggedIn){
      e.preventDefault();
      alert('You must be logged in to access this page.')
      navigate('/login')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white flex items-center justify-between h-100 rounded-xl shadow-lg w-200'>
        <div className="w-1/3 h-100 bg-gray-900 flex items-center justify-center rounded-bl-xl rounded-tl-xl">
            <h1 className="text-2xl font-bold text-white">Home Page</h1>
        </div>
        
        
          <div className="w-2/3 flex items-center justify-center space-x-10 shadow-2xl">
            <Link
            to='/passwordgen'
            onClick={(e)=>handleProtectedClick(e, '/passwordgen')}
            className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition outline-2 outline-blue-900'
            >
                Password
            </Link>

            <Link
            to='/maincart'
            onClick={(e)=>handleProtectedClick(e, '/maincart')}
            className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition outline-2 outline-blue-900'
            >
                Color
            </Link>

            <Link
            to='/currencyinput'
            onClick={(e)=>handleProtectedClick(e, '/currencyinput')}
            className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition outline-2 outline-blue-900'
            >
              Currency
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Home;
