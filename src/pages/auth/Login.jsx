import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import axios from "axios";
import apiUrl from "../../api/apiConfig.js";
import logoHRM from "../../assets/logo_hrm.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, formData);
      const { token } = response.data;
      // Save token to local storage
      localStorage.setItem("token", token);
      // Redirect to dashboard or another page
      navigate('/dashboard')
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-full flex-col gap-5">
      <img src={logoHRM} alt="logo-hrm" className="w-32"/>
      <h2 className="text-2xl font-bold">HRM POS SYSTEM</h2>
        <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg> 
          <input type="text" className="grow" placeholder="Username" name="username" value={formData.username} onChange={handleChange}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" className="grow" placeholder="********" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button className="btn btn-primary w-full">LOGIN</button>
      <Link to={'/register'}>
        <li className="btn btn-info">REGISTER</li>
      </Link>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default Login;
