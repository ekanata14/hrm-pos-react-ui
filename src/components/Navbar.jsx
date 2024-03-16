import React, { useEffect, useState } from 'react'
import logoHRM from "../assets/logo_hrm.png"; 
import axios from 'axios';
import apiUrl from '../api/apiConfig';
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const navButton = '';
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
  const [profile, setProfile] = useState([]);
    const logout = (e) => {
        e.preventDefault()
        axios.get(`${apiUrl}/logout`).then(response => {
            localStorage.removeItem('token');
            navigate('/');
        }).catch(error => {
            console.error("Error logout", error);
        })
    }
const getProfile = () => {
    axios
      .get(`${apiUrl}/me`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error get profile", error);
      });
  };

  useEffect(() => {
    checkAuth();
    getProfile();
  }, []);

  const isAdmin = profile.id_role;

  return (
    <div className="fixed navbar bg-base-100 z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <Link to={'/dashboard'}>
        <li className='p-2 border-b-2'>
          Dashboard
        </li>
      </Link>
      <Link to={'/profile'}>
        <li className='p-2 border-b-2'>Profile</li>
      </Link>
      <Link to={'/history'}>
        <li className='p-2 border-b-2'>History</li>
      </Link>
      <Link to={'/leaderboard'}>
        <li className='p-2 border-b-2'>Leaderboard</li>
      </Link>
      {isAdmin == 1 && (
        <React.Fragment>
      <Link to={'/users'}>
        <li className='p-2 border-b-2'>Users</li>
      </Link>
      <Link to={'/items'}>
        <li className='p-2 border-b-2'>Items</li>
      </Link>
        </React.Fragment>
      )}
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">
        <img src={logoHRM} alt="logo-hrm" className='w-16' />
    </a>
  </div>
  <div className="navbar-end">
        <button onClick={logout} className='btn btn-error'>Logout</button>
  </div>
</div>
  )
}

export default Navbar