import './App.css'
import Navbar from './components/navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
      <ToastContainer /> 
    </>
  )
}

export default App
