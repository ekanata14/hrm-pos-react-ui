import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import apiUrl from '../api/apiConfig';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({children}) => {
  const navigate = useNavigate();

  const checkAuth = () => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Check if token exists
    if (token) {
      // Set token as default header for all Axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <>  
    <Navbar></Navbar>
    <div className='container mx-auto w-full h-full pt-[75px] px-4'>{children}</div> 
    </>
  )
}

export default AdminLayout