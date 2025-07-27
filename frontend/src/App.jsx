import './App.css'
import Navbar from './components/navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  )
}

export default App
