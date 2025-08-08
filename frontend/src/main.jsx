import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PasswordGen from './components/PasswordGen';
import CurrencyInput from './components/CurrencyInput';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import { MainCart } from './components/MainCart';
import {RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/Home" />,
  },
  {
    path: '/',
    element: <App />, // shared layout for all authenticated routes
    children: [
      { path: 'PasswordGen', element: <PasswordGen /> },
      { path: 'MainCart', element: <MainCart /> },
      { path: 'CurrencyInput', element: <CurrencyInput /> },
      { path: 'Home', element: <Home /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
